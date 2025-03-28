import {
	EncodeObject,
	isOfflineDirectSigner,
	OfflineSigner,
	makeSignDoc,
	makeAuthInfoBytes,
} from "@cosmjs/proto-signing"
import {
	DeliverTxResponse,
	GasPrice,
	HttpEndpoint,
	SigningStargateClient,
	SigningStargateClientOptions,
	calculateFee,
	Account,
	AccountParser,
	SequenceResponse,
	SignerData,
	AminoTypes,
	createDefaultAminoConverters,
} from "@cosmjs/stargate"
import { Tendermint34Client, Tendermint37Client } from "@cosmjs/tendermint-rpc"
import { createDefaultIdentityRegistry } from "./registry.js"
import {
	MsgCreateDIDDocumentPayload,
	SignInfo,
	MsgUpdateDIDDocumentPayload,
	MsgDeactivateDIDDocumentPayload,
	VerificationMethod
} from './types-proto/index.js';
import {
	DidStdFee,
	ISignInputs,
	TSignerAlgo,
	VerificationMethods
} from './types.js';
import {
	base64ToBytes,
	EdDSASigner,
	hexToBytes,
	Signer,
	ES256Signer,
	ES256KSigner
} from 'did-jwt';
import {
	assert,
	assertDefined
} from '@cosmjs/utils'
import { StdFee, makeSignDoc as makeSignDocAmino } from '@cosmjs/amino'
import { Int53 } from '@cosmjs/math'
import { fromBase64 } from '@cosmjs/encoding'
import {
	AuthInfo,
	SignerInfo,
	TxRaw
} from 'cosmjs-types/cosmos/tx/v1beta1/tx.js'
import { SignMode } from 'cosmjs-types/cosmos/tx/signing/v1beta1/signing.js'
import {Any } from './types-proto/google/protobuf/any.js'
import { Coin } from 'cosmjs-types/cosmos/base/v1beta1/coin.js'
import Long from 'long'
import { PubKey as CommonPubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys.js";
import {
  QueryAddressDetailsRequest,
  QueryAddressDetailsResponse,
  QueryAddressListRequest,
  QueryAddressListResponse,
} from "./compliance/addressDetails.js";
import {
  QueryIssuerDetailsRequest,
  QueryIssuerDetailsResponse,
  QueryIssuerListRequest,
  QueryIssuerListResponse,
} from "./compliance/issuerDetails.js";
import {
  QueryVerificationDetailsRequest,
  QueryVerificationDetailsResponse,
  QueryVerificationListRequest,
  QueryVerificationListResponse,
} from "./compliance/verificationDetails.js";
import { PageRequest } from "cosmjs-types/cosmos/base/query/v1beta1/pagination.js";
import { accountFromAny } from "./utils.js";

export function calculateDidFee(gasLimit: number, gasPrice: string | GasPrice): DidStdFee {
	return calculateFee(gasLimit, gasPrice)
}

export function makeSignerInfos(
	signers: ReadonlyArray<{ readonly pubkey: Any; readonly sequence: number }>,
	signMode: SignMode,
): SignerInfo[] {
	return signers.map(
		({ pubkey, sequence }): SignerInfo => ({
			publicKey: pubkey,
			modeInfo: {
				single: { mode: signMode },
			},
			sequence: Long.fromNumber(sequence),
		}),
	);
}

export function makeDidAuthInfoBytes(
	signers: ReadonlyArray<{ readonly pubkey: Any; readonly sequence: number }>,
	feeAmount: readonly Coin[],
	gasLimit: number,
	feePayer: string,
	signMode = SignMode.SIGN_MODE_DIRECT,
): Uint8Array {
	const authInfo = {
		signerInfos: makeSignerInfos(signers, signMode),
		fee: {
			amount: [...feeAmount],
			gasLimit: Long.fromNumber(gasLimit),
			payer: feePayer
		}
	}
	return AuthInfo.encode(AuthInfo.fromPartial(authInfo)).finish()
}

export class SwisstronikSigningStargateClient extends SigningStargateClient {
	private didSigners: TSignerAlgo = {}
	private readonly _gasPrice: GasPrice | undefined
	private readonly _signer: OfflineSigner
	private readonly _aminoTypes: AminoTypes;

	private readonly overridenAccountParser: AccountParser;

	public static async connectWithSigner(endpoint: string | HttpEndpoint, signer: OfflineSigner, options?: SigningStargateClientOptions | undefined): Promise<SwisstronikSigningStargateClient> {
		// Tendermint/CometBFT 0.34/0.37 auto-detection. Starting with 0.37 we seem to get reliable versions again 🎉
		// Using 0.34 as the fallback.
		let tmClient: Tendermint37Client | Tendermint34Client;
		const tm37Client = await Tendermint37Client.connect(endpoint);
		const version = (await tm37Client.status()).nodeInfo.version;
		console.log(`[sdk::signer.ts] Tendermint version: `, version);

		if (version.startsWith("0.37.")) {
			tmClient = tm37Client;
		}
		else {
			tm37Client.disconnect();
			tmClient = await Tendermint34Client.connect(endpoint);
		}

		return new SwisstronikSigningStargateClient(tmClient, signer, {
			registry: options?.registry ? options.registry : createDefaultIdentityRegistry(),
			...options
		})
	}

	static async offline(signer: OfflineSigner, options: SigningStargateClientOptions | undefined = {}) {
		console.log(`[sdk::signer.ts] Creating offline signer`);
		return new SwisstronikSigningStargateClient(undefined, signer, {
			registry: options?.registry ? options.registry : createDefaultIdentityRegistry(),
			...options
		})
	}

	constructor(
		tmClient: Tendermint37Client | Tendermint34Client | undefined,
		signer: OfflineSigner,
		options: SigningStargateClientOptions = {}
	) {
		super(tmClient, signer, options)
		this._signer = signer
		if (options.gasPrice) this._gasPrice = options.gasPrice

		const { accountParser = accountFromAny, aminoTypes = new AminoTypes(createDefaultAminoConverters()), } = options;
		this.overridenAccountParser = accountParser;
		this._aminoTypes = aminoTypes;
	}

	public async signAndBroadcast(
		signerAddress: string,
		messages: readonly EncodeObject[],
		fee: StdFee | "auto" | number,
		memo = "",
	): Promise<DeliverTxResponse> {
		let usedFee: StdFee;
		if (fee == "auto" || typeof fee === "number") {
			assertDefined(this._gasPrice, "Gas price must be set in the client options when auto gas is used.");
			const gasEstimation = await this.simulate(signerAddress, messages, memo);
			// Starting with Cosmos SDK 0.47, we see many cases in which 1.3 is not enough anymore
			// E.g. https://github.com/cosmos/cosmos-sdk/issues/16020
			const multiplier = typeof fee === "number" ? fee : 1.4;
			usedFee = calculateFee(Math.round(gasEstimation * multiplier), this._gasPrice);
		} else {
			usedFee = fee;
		}
		const txRaw = await this.sign(signerAddress, messages, usedFee, memo);
		const txBytes = TxRaw.encode(txRaw).finish();
		console.log(`[sdk::signer.ts] Trying to broadcast tx`)
		return this.broadcastTx(txBytes, this.broadcastTimeoutMs, this.broadcastPollIntervalMs);
	}

	public async sign(
		signerAddress: string,
		messages: readonly EncodeObject[],
		fee: DidStdFee,
		memo: string,
		explicitSignerData?: SignerData,
	): Promise<TxRaw> {
		let signerData: SignerData
		if (explicitSignerData) {
			signerData = explicitSignerData
		} else {
			const { accountNumber, sequence } = await this.getSequence(signerAddress)
			const chainId = await this.getChainId()
			signerData = {
				accountNumber: accountNumber,
				sequence: sequence,
				chainId: chainId,
			}
		}
		return isOfflineDirectSigner(this._signer)? this._signDirect(signerAddress, messages, fee, memo, signerData) : this._signAmino(signerAddress, messages, fee, memo, signerData);
	}

	public async getAccount(searchAddress: string): Promise<Account | null> {
		try {
			console.log(`[sdk::signer.ts] Requesting account data for ${searchAddress}`)
			const account = await this.forceGetQueryClient().auth.account(searchAddress);
			console.log(`[sdk::signer.ts] Obtained data: `, account)
			return account ? this.overridenAccountParser(account) : null;
		} catch (error: any) {
			console.log(`[sdk::signer.ts] Cannot obtain data. Reason: ${error}`)
			if (/rpc error: code = NotFound/i.test(error.toString())) {
				return null;
			}
			throw error;
		}
	}

	public async getSequence(address: string): Promise<SequenceResponse> {
		const account = await this.getAccount(address);
		if (!account) {
			throw new Error(
				`Account '${address}' does not exist on chain. Send some tokens there before trying to query sequence.`,
			);
		}
		return {
			accountNumber: account.accountNumber,
			sequence: account.sequence,
		};
	}

	private async _signDirect(
		signerAddress: string,
		messages: readonly EncodeObject[],
		fee: DidStdFee,
		memo: string,
		{ accountNumber, sequence, chainId }: SignerData,
	): Promise<TxRaw> {
		assert(isOfflineDirectSigner(this._signer))
		const accountFromSigner = (await this._signer.getAccounts()).find(
			(account) => account.address === signerAddress,
		)
		if (!accountFromSigner) {
			throw new Error("Failed to retrieve account from signer")
		}
		const txBodyEncodeObject = {
			typeUrl: "/cosmos.tx.v1beta1.TxBody",
			value: {
				messages: messages,
				memo: memo,
			},
		}
		const pubkey = Any.fromPartial({
			typeUrl: "/ethermint.crypto.v1.ethsecp256k1.PubKey",
			value: CommonPubKey.encode({
				key: accountFromSigner.pubkey
			}).finish(),
		})

		const txBodyBytes = this.registry.encode(txBodyEncodeObject)
		const gasLimit = Int53.fromString(fee.gas).toNumber()
		const authInfoBytes = makeDidAuthInfoBytes([{ pubkey, sequence }], fee.amount, gasLimit, fee.payer!)
		const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, accountNumber)
		const { signature, signed } = await this._signer.signDirect(signerAddress, signDoc)
		return TxRaw.fromPartial({
			bodyBytes: signed.bodyBytes,
			authInfoBytes: signed.authInfoBytes,
			signatures: [fromBase64(signature.signature)],
		})
	}

	private async _signAmino(
		signerAddress: string,
		messages: readonly EncodeObject[],
		fee: DidStdFee,
		memo: string,
		{ accountNumber, sequence, chainId }: SignerData,
	) {
		assert(!isOfflineDirectSigner(this._signer))

		const accountFromSigner = (await this._signer.getAccounts()).find((account) => account.address === signerAddress);
		if (!accountFromSigner) {
				throw new Error("Failed to retrieve account from signer");
		}

		const pubkey = Any.fromPartial({
			typeUrl: "/ethermint.crypto.v1.ethsecp256k1.PubKey",
			value: CommonPubKey.encode({
				key: accountFromSigner.pubkey
			}).finish(),
		})

		const signMode = SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
		const msgs = messages.map((msg) => this._aminoTypes.toAmino(msg));
		const signDoc = makeSignDocAmino(msgs, fee, chainId, memo, accountNumber, sequence);
		const { signature, signed } = await this._signer.signAmino(signerAddress, signDoc);
		const signedTxBody = {
				messages: signed.msgs.map((msg) => this._aminoTypes.fromAmino(msg)),
				memo: signed.memo,
		};
		const signedTxBodyEncodeObject = {
				typeUrl: "/cosmos.tx.v1beta1.TxBody",
				value: signedTxBody,
		};
		const signedTxBodyBytes = this.registry.encode(signedTxBodyEncodeObject);
		const signedGasLimit = Int53.fromString(signed.fee.gas).toNumber();
		const signedSequence = Int53.fromString(signed.sequence).toNumber();
		const signedAuthInfoBytes = makeAuthInfoBytes([{ pubkey, sequence: signedSequence }], signed.fee.amount, signedGasLimit, signed.fee.granter, signed.fee.payer, signMode);
		return TxRaw.fromPartial({
				bodyBytes: signedTxBodyBytes,
				authInfoBytes: signedAuthInfoBytes,
				signatures: [fromBase64(signature.signature)],
		});
	}

	async checkDidSigners(verificationMethods: Partial<VerificationMethod>[] = []): Promise<TSignerAlgo> {
		if (verificationMethods.length === 0) {
			throw new Error('No verification methods provided')
		}

		verificationMethods.forEach((verificationMethod) => {
			if (!(Object.values(VerificationMethods) as string[]).includes(verificationMethod.verificationMethodType ?? '')) {
				throw new Error(`Unsupported verification method type: ${verificationMethod.verificationMethodType}`)
			}
			if (!this.didSigners[verificationMethod.verificationMethodType ?? '']) {
				this.didSigners[verificationMethod.verificationMethodType ?? ''] = EdDSASigner
			}
		})

		return this.didSigners
	}

	async getDidSigner(verificationMethodId: string, verificationMethods: Partial<VerificationMethod>[]): Promise<(secretKey: Uint8Array) => Signer> {
		await this.checkDidSigners(verificationMethods)
		const verificationMethod = verificationMethods.find(method => method.id === verificationMethodId)?.verificationMethodType
		if (!verificationMethod) {
			throw new Error(`Verification method for ${verificationMethodId} not found`)
		}
		return this.didSigners[verificationMethod]!
	}

	async signCreateDIDDocumentTx(signInputs: ISignInputs[], payload: MsgCreateDIDDocumentPayload): Promise<SignInfo[]> {
		await this.checkDidSigners(payload?.verificationMethod)

		const signBytes = MsgCreateDIDDocumentPayload.encode(payload).finish()
		const signInfos: SignInfo[] = await Promise.all(signInputs.map(async (signInput) => {
			return {
				verificationMethodId: signInput.verificationMethodId,
				signature: base64ToBytes((await (await this.getDidSigner(signInput.verificationMethodId, payload.verificationMethod))(hexToBytes(signInput.privateKeyHex))(signBytes)) as string)
			}
		}))

		return signInfos
	}

	async signUpdateDIDDocumentTx(signInputs: ISignInputs[], payload: MsgUpdateDIDDocumentPayload): Promise<SignInfo[]> {
		await this.checkDidSigners(payload?.verificationMethod)

		const signBytes = MsgUpdateDIDDocumentPayload.encode(payload).finish()
		const signInfos: SignInfo[] = await Promise.all(signInputs.map(async (signInput) => {
			return {
				verificationMethodId: signInput.verificationMethodId,
				signature: base64ToBytes((await (await this.getDidSigner(signInput.verificationMethodId, payload.verificationMethod))(hexToBytes(signInput.privateKeyHex))(signBytes)) as string)
			}
		}))

		return signInfos
	}

	async signDeactivateDIDDocumentTx(signInputs: ISignInputs[], payload: MsgDeactivateDIDDocumentPayload, verificationMethod: VerificationMethod[]): Promise<SignInfo[]> {
		await this.checkDidSigners(verificationMethod)

		const signBytes = MsgDeactivateDIDDocumentPayload.encode(payload).finish()
		const signInfos: SignInfo[] = await Promise.all(signInputs.map(async (signInput) => {
			return {
				verificationMethodId: signInput.verificationMethodId,
				signature: base64ToBytes((await (await this.getDidSigner(signInput.verificationMethodId, verificationMethod))(hexToBytes(signInput.privateKeyHex))(signBytes)) as string)
			}
		}))

		return signInfos
	}

	static async signIdentityTx(signBytes: Uint8Array, signInputs: ISignInputs[]): Promise<SignInfo[]> {
		let signInfos: SignInfo[] = [];

		for (let signInput of signInputs) {
			if (typeof (signInput.keyType) === undefined) {
				throw new Error('Key type is not defined')
			}

			let signature: string;

			switch (signInput.keyType) {
				case 'Ed25519':
					signature = (await EdDSASigner(hexToBytes(signInput.privateKeyHex))(signBytes)) as string;
					break;
				case 'Secp256k1':
					signature = (await ES256KSigner(hexToBytes(signInput.privateKeyHex))(signBytes)) as string;
					break;
				case 'P256':
					signature = (await ES256Signer(hexToBytes(signInput.privateKeyHex))(signBytes)) as string;
					break;
				default:
					throw new Error(`Unsupported signature type: ${signInput.keyType}`);
			}

			signInfos.push({
				verificationMethodId: signInput.verificationMethodId,
				signature: base64ToBytes(signature)
			});
		}

		return signInfos
	}

	public async queryAddressDetails(address: string,onlyWithExistingIssuer: boolean) {
    const response = await this.forceGetTmClient().abciQuery({
      path: `/swisstronik.compliance.Query/AddressDetails`,
      data: QueryAddressDetailsRequest.encode({ address, onlyWithExistingIssuer }).finish(),
    });

    return QueryAddressDetailsResponse.decode(response.value);
  }

  public async queryAddressList(pagination?: PageRequest) {
    const response = await this.forceGetTmClient().abciQuery({
      path: `/swisstronik.compliance.Query/AddressesDetails`,
      data: QueryAddressListRequest.encode({ pagination }).finish(),
    });

    return QueryAddressListResponse.decode(response.value);
  }

  public async queryIssuerDetails(issuerAddress: string) {
    const response = await this.forceGetTmClient().abciQuery({
      path: `/swisstronik.compliance.Query/IssuerDetails`,
      data: QueryIssuerDetailsRequest.encode({ issuerAddress }).finish(),
    });

    return QueryIssuerDetailsResponse.decode(response.value);
  }

  public async queryIssuerList(pagination?: PageRequest) {
    const response = await this.forceGetTmClient().abciQuery({
      path: `/swisstronik.compliance.Query/IssuersDetails`,
      data: QueryIssuerListRequest.encode({ pagination }).finish(),
    });

    return QueryIssuerListResponse.decode(response.value);
  }

  public async queryVerificationDetails(verificationID: string) {
    const response = await this.forceGetTmClient().abciQuery({
      path: `/swisstronik.compliance.Query/VerificationDetails`,
      data: QueryVerificationDetailsRequest.encode({ verificationID }).finish(),
    });

    return QueryVerificationDetailsResponse.decode(response.value);
  }

  public async queryVerificationList(pagination?: PageRequest) {
    const response = await this.forceGetTmClient().abciQuery({
      path: `/swisstronik.compliance.Query/VerificationsDetails`,
      data: QueryVerificationListRequest.encode({ pagination }).finish(),
    });

    return QueryVerificationListResponse.decode(response.value);
  }
}
