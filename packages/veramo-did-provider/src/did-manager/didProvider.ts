/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, @typescript-eslint/no-non-null-assertion */
// any is used for extensibility
// unused vars are kept by convention
// non-null assertion is used when we know better than the compiler that the value is not null or undefined
import {
	IdentitySDK,
	createIdentitySDK,
	createSignInputsFromImportableEd25519Key,
	DIDModule,
	IIdentitySDKOptions,
	AbstractIdentitySDKModule,
	ResourceModule,
	VerificationMethodExternal as VerificationMethod,
	DidStdFee,
	ISignInputs,
	IContext as ISDKContext,
	MsgCreateResourcePayload,
	DirectSecp256k1HdWallet,
	DirectSecp256k1Wallet,
	MsgCreateDIDDocumentPayload,
	MsgDeactivateDIDDocumentPayload,
	SignInfo
} from '@swisstronik/sdk'
import {
	AccountData,
	Coin,
} from '@cosmjs/proto-signing'
import { GasPrice, DeliverTxResponse } from '@cosmjs/stargate'
import { assert } from '@cosmjs/utils'
import { DIDDocument } from 'did-resolver'
import {
	IIdentifier,
	IKey,
	IService,
	IAgentContext,
	IKeyManager,
	ManagedKeyInfo,
	MinimalImportableKey,
	TKeyType,
} from '@veramo/core'
import { AbstractIdentifierProvider } from '@veramo/did-manager'
import { base64ToBytes, extractPublicKeyHex } from '@veramo/utils'
import {
	EnglishMnemonic as _,
	Ed25519
} from '@cosmjs/crypto'
import {
	fromString,
	toString
} from 'uint8arrays'
import { v4 } from 'uuid'
import {
	LitCompatibleCosmosChain,
	LitCompatibleCosmosChains,
	LitNetwork,
	LitNetworks
} from '../dkg-threshold'
import { IContext } from '../types'

export const DefaultRPCUrls = {
	[0]: 'http://127.0.0.1:26657'
} as const

export const DefaultRESTUrls = {
	[0]: 'https://api.example.net',
} as const

export const DefaultDkgSupportedChains = {
	[0]: LitCompatibleCosmosChains.swisstronik,
} as const

export const DefaultStatusList2021StatusPurposeTypes = {
	revocation: 'revocation',
	suspension: 'suspension'
} as const

export const DefaultStatusList2021ResourceTypes = {
	default: 'StatusList2021',
	revocation: 'StatusList2021Revocation',
	suspension: 'StatusList2021Suspension'
} as const

export const DefaultStatusList2021Encodings = {
	'base64': 'base64',
	'base64url': 'base64url',
	'hex': 'hex'
} as const

export type DefaultRPCUrl = typeof DefaultRPCUrls[keyof typeof DefaultRPCUrls]

export type DefaultRESTUrl = typeof DefaultRESTUrls[keyof typeof DefaultRESTUrls]

export type DefaultStatusList2021ResourceType = typeof DefaultStatusList2021ResourceTypes[keyof typeof DefaultStatusList2021ResourceTypes]

export type DefaultStatusList2021StatusPurposeType = typeof DefaultStatusList2021StatusPurposeTypes[keyof typeof DefaultStatusList2021StatusPurposeTypes]

export type DefaultStatusList2021Encoding = typeof DefaultStatusList2021Encodings[keyof typeof DefaultStatusList2021Encodings]

export type LinkedResource = Omit<MsgCreateResourcePayload, 'data'> & { data?: string }

export type ResourcePayload = Partial<MsgCreateResourcePayload>

export type StatusList2021ResourcePayload = ResourcePayload & { resourceType: DefaultStatusList2021ResourceType }

export type TImportableEd25519Key = Required<Pick<IKey, 'publicKeyHex' | 'privateKeyHex'>> & { kid: TImportableEd25519Key['publicKeyHex'], type: 'Ed25519' }

declare const TImportableEd25519Key: {
	isTImportableEd25519Key(object: object[]): object is TImportableEd25519Key[];
}

export type TSupportedKeyType = 'Ed25519' | 'Secp256k1'

export class EnglishMnemonic extends _ {
	static readonly _mnemonicMatcher = /^[a-z]+( [a-z]+)*$/;
}

/**
 * {@link @veramo/did-manager#DIDManager} identifier provider for `did:swtr`identifiers.
 * @public
*/
export class SwisstronikDIDProvider extends AbstractIdentifierProvider {
	private defaultKms: string
	public readonly rpcUrl: string
	private readonly cosmosPayerWallet: Promise<DirectSecp256k1HdWallet | DirectSecp256k1Wallet>
	public readonly dkgOptions: { chain: Extract<LitCompatibleCosmosChain, 'swisstronik'>, network: LitNetwork }
	private sdk?: IdentitySDK
	private fee?: DidStdFee

	static readonly defaultGasPrice = GasPrice.fromString('50uswtr')

	constructor(options: { defaultKms: string, cosmosPayerSeed: string, rpcUrl?: string, dkgOptions?: { chain?: Extract<LitCompatibleCosmosChain, 'swisstronik'>, network?: LitNetwork } }) {
		super()
		this.defaultKms = options.defaultKms
		this.rpcUrl = options.rpcUrl ? options.rpcUrl : DefaultRPCUrls[0]
		this.dkgOptions = options.dkgOptions
			? { chain: options.dkgOptions.chain ? options.dkgOptions.chain : DefaultDkgSupportedChains[0], network: options.dkgOptions.network ? options.dkgOptions.network : LitNetworks.serrano }
			: { chain: DefaultDkgSupportedChains[0], network: LitNetworks.serrano }

		if (!options?.cosmosPayerSeed || options.cosmosPayerSeed === '') {
			this.cosmosPayerWallet = DirectSecp256k1HdWallet.generate()
			return
		}
		this.cosmosPayerWallet = EnglishMnemonic._mnemonicMatcher.test(options.cosmosPayerSeed)
			? DirectSecp256k1HdWallet.fromMnemonic(options.cosmosPayerSeed)
			: DirectSecp256k1Wallet.fromKey(
				fromString(
					options.cosmosPayerSeed.replace(/^0x/, ''),
					'hex'
				),
			)
	}

	async getWalletAccounts(): Promise<readonly AccountData[]> {
		return await (await this.cosmosPayerWallet).getAccounts()
	}

	private async getIdentitySDK(fee?: DidStdFee, gasPrice?: GasPrice): Promise<IdentitySDK> {
		if (!this.sdk) {
			const wallet = await this.cosmosPayerWallet.catch(() => {
				throw new Error(`[swtr-veramo-plugin]: valid cosmosPayerSeed is required`)
			})
			const sdkOptions: IIdentitySDKOptions = {
				modules: [DIDModule as unknown as AbstractIdentitySDKModule, ResourceModule as unknown as AbstractIdentitySDKModule],
				rpcUrl: this.rpcUrl,
				wallet: wallet,
				gasPrice
			}

			this.sdk = await createIdentitySDK(sdkOptions)
			this.fee = fee

			if (this?.fee && !this?.fee?.payer) {
				const feePayer = (await (await this.cosmosPayerWallet).getAccounts())[0].address
				this.fee.payer = feePayer
			}
		}
		return this.sdk!
	}

	async createIdentifier(
		{ kms, options }: { kms?: string; alias?: string, options: { document: DIDDocument, keys?: TImportableEd25519Key[], versionId?: string, fee?: DidStdFee } },
		context: IContext,
	): Promise<Omit<IIdentifier, 'provider'>> {
		const sdk = await this.getIdentitySDK(options?.fee)
		const versionId = options.versionId || v4()
		const signInputs: ISignInputs[] | SignInfo[] = options.keys
			? function () {
				return options.keys.map(key => createSignInputsFromImportableEd25519Key(key, options.document.verificationMethod || []))
			}()
			: await (async function (that: SwisstronikDIDProvider) {
				const data = await createMsgCreateDidDocPayloadToSign(options.document, versionId)
				return await that.signPayload(context, data, options.document.verificationMethod)
			}(this))

		const tx = await sdk.createDidDocTx(
			signInputs,
			options.document,
			'',
			this?.fee,
			undefined,
			versionId,
			{ sdk: sdk } satisfies ISDKContext,
		)

		assert(tx.code === 0, `cosmos_transaction: Failed to create DID. Reason: ${tx.rawLog}`)

		//* Currently, only one controller key is supported.
		//* We assume that the first key in the list is the controller key.
		//* This is subject to change in the near future.
		const keys: ManagedKeyInfo[] = options.keys
			? await (async function (that: SwisstronikDIDProvider) {
				const scopedKeys: ManagedKeyInfo[] = []
				for (const key of options.keys!) {
					let managedKey: ManagedKeyInfo | undefined
					try {
						managedKey = await context.agent.keyManagerImport({
							...key,
							kms: kms || that.defaultKms,
						} satisfies MinimalImportableKey)
					} catch (e) {
						console.warn(`Failed to import key ${key.kid}. Reason: ${e}`)

						// construct key, if it failed to import
						managedKey = { ...key, kms: kms || that.defaultKms }
					}
					if (managedKey) {
						scopedKeys.push(managedKey)
					}
				}
				return scopedKeys
			}(this))
			: await this.getKeysFromVerificationMethod(context, options.document.verificationMethod)

		const controllerKey: IKey = keys[0]
		const identifier: IIdentifier = {
			did: <string>options.document.id,
			controllerKeyId: controllerKey.kid,
			keys,
			services: options.document.service || [],
			provider: options.document.id.split(':').splice(0, 3).join(':'),
		}

		console.warn('Created DID', identifier.did)

		return identifier
	}

	async updateIdentifier(
		{ did, document, options }: { did: string, document: DIDDocument, options: { kms: string, keys?: TImportableEd25519Key[], versionId?: string, fee?: DidStdFee } },
		context: IContext,
	): Promise<IIdentifier> {
		const sdk = await this.getIdentitySDK(options?.fee)
		const versionId = options.versionId || v4()
		const signInputs: ISignInputs[] | SignInfo[] = options.keys
			? function () {
				return options.keys.map(key => createSignInputsFromImportableEd25519Key(key, document.verificationMethod || []))
			}()
			: await (async function (that: SwisstronikDIDProvider) {
				const data = await createMsgCreateDidDocPayloadToSign(document, versionId)
				return await that.signPayload(context, data, document.verificationMethod)
			}(this))

		const tx = await sdk.updateDidDocTx(
			signInputs,
			document satisfies DIDDocument,
			'',
			this?.fee,
			undefined,
			versionId,
			{ sdk: sdk } satisfies ISDKContext,
		)

		assert(tx.code === 0, `cosmos_transaction: Failed to update DID. Reason: ${tx.rawLog}`)

		//* Currently, only one controller key is supported.
		//* We assume that the first key in the list is the controller key.
		//* This is subject to change in the near future.
		const keys: ManagedKeyInfo[] = options.keys
			? await (async function (that: SwisstronikDIDProvider) {
				const scopedKeys: ManagedKeyInfo[] = []
				for (const key of options.keys!) {
					let managedKey: ManagedKeyInfo | undefined
					try {
						managedKey = await context.agent.keyManagerImport({
							...key,
							kms: options.kms || that.defaultKms,
						} satisfies MinimalImportableKey)
					} catch (e) {
						console.warn(`Failed to import key ${key.kid}. Reason: ${e}`)

						// construct key, if it failed to import
						managedKey = { ...key, kms: options.kms || that.defaultKms }
					}
					if (managedKey) {
						scopedKeys.push(managedKey)
					}
				}

				return scopedKeys
			}(this))
			: await this.getKeysFromVerificationMethod(context, document.verificationMethod)

		const controllerKey = keys[0]

		const identifier: IIdentifier = {
			did: <string>document.id,
			controllerKeyId: controllerKey.kid,
			keys,
			services: document.service || [],
			provider: document.id.split(':').splice(0, 3).join(':'),
		}

		console.warn('Updated DID', did)

		return identifier
	}

	async deactivateIdentifier(
		{ did, document, options }: { did: string, document: DIDDocument, options: { keys?: TImportableEd25519Key[], fee?: DidStdFee, versionId?: string } },
		context: IContext,
	): Promise<boolean> {
		const sdk = await this.getIdentitySDK(options?.fee)
		const versionId = options.versionId || v4()
		const signInputs: ISignInputs[] | SignInfo[] = options.keys
			? function () {
				return options.keys.map(key => createSignInputsFromImportableEd25519Key(key, document.verificationMethod || []))
			}()
			: await (async function (that: SwisstronikDIDProvider) {
				const data = await createMsgDeactivateDidDocPayloadToSign(document, versionId)
				return await that.signPayload(context, data, document.verificationMethod)
			}(this))

		const tx = await sdk.deactivateDidDocTx(
			signInputs,
			document satisfies DIDDocument,
			'',
			this?.fee,
			undefined,
			versionId,
			{ sdk: sdk } satisfies ISDKContext,
		)

		assert(tx.code === 0, `cosmos_transaction: Failed to update DID. Reason: ${tx.rawLog}`)

		console.warn('Deactivated DID', did)

		return true
	}

	async createResource(
		{ options }: { options: { payload: ResourcePayload, signInputs?: ISignInputs[], kms?: string, fee?: DidStdFee } },
		context: IContext,
	): Promise<boolean> {
		const sdk = await this.getIdentitySDK(options?.fee)

		const signInputs: ISignInputs[] | SignInfo[] = options.signInputs
			? options.signInputs
			: await (async function (that: SwisstronikDIDProvider) {
				const did = `did:swtr:${options.payload.collectionId}`
				const { didDocument } = await sdk.queryDidDoc(
					did,
					{ sdk: sdk }
				)

				return await that.signPayload(
					context,
					MsgCreateResourcePayload.encode(MsgCreateResourcePayload.fromPartial(options.payload)).finish(),
					didDocument?.verificationMethod
				)
			}(this))

		const tx = await sdk.createLinkedResourceTx(
			signInputs,
			options.payload,
			'',
			this?.fee,
			undefined,
			{ sdk: sdk }
		)

		assert(tx.code === 0, `cosmos_transaction: Failed to create Resource. Reason: ${tx.rawLog}`)

		const mapKeyType = (keyType: "Ed25519" | "Secp256k1" | "P256" | undefined): TKeyType | undefined => {
			switch (keyType) {
				case "Ed25519": return "Ed25519"
				case "Secp256k1": return "Secp256k1"
				default: return undefined
			}
		}

		if (options.signInputs) {
			const signInput = options.signInputs.filter(input => mapKeyType(input.keyType) !== undefined)

			const keys: ManagedKeyInfo[] = []
			for (const input of signInput) {
				let managedKey: ManagedKeyInfo | undefined
				try {
					// get public key from private key in hex
					const publicKey = toString((await Ed25519.makeKeypair(fromString(input.privateKeyHex, 'hex'))).pubkey, 'hex')
					managedKey = await context.agent.keyManagerImport({
						kid: publicKey,
						publicKeyHex: publicKey,
						privateKeyHex: input.privateKeyHex,
						type: mapKeyType(input.keyType) as TSupportedKeyType,
						kms: options.kms || this.defaultKms,
					} satisfies MinimalImportableKey)
				} catch (e) {
					console.warn(`Failed to import key ${input.verificationMethodId}. Reason: ${e}`)
				}
				if (managedKey) {
					keys.push(managedKey)
				}
			}
		}

		console.warn('Created Resource', options.payload)

		return true
	}

	async deleteIdentifier(
		identity: IIdentifier,
		context: IContext,
	): Promise<boolean> {
		for (const { kid } of identity.keys) {
			await context.agent.keyManagerDelete({ kid })
		}
		return true
	}

	async addKey(
		{
			identifier,
			key,
			options,
		}: { identifier: IIdentifier; key: IKey; options?: any },
		context: IContext,
	): Promise<any> {
		throw Error('SwisstronikDIDProvider addKey is not supported.')
	}

	async addService(
		{
			identifier,
			service,
			options,
		}: { identifier: IIdentifier; service: IService; options?: any },
		context: IContext,
	): Promise<any> {
		throw Error('SwisstronikDIDProvider addService is not supported.')
	}

	async removeKey(
		args: {
			identifier: IIdentifier;
			kid: string;
			options?: any
		},
		context: IContext,
	): Promise<any> {
		throw Error('SwisstronikDIDProvider removeKey is not supported.')
	}

	async removeService(
		args: {
			identifier: IIdentifier;
			id: string;
			options?: any
		},
		context: IContext,
	): Promise<any> {
		throw Error('SwisstronikDIDProvider removeService is not supported.')
	}

	async transactSendTokens(args: { recipientAddress: string, amount: Coin, memo?: string, txBytes?: Uint8Array, timeoutMs?: number, pollIntervalMs?: number }): Promise<DeliverTxResponse> {
		const sdk = await this.getIdentitySDK(undefined, SwisstronikDIDProvider.defaultGasPrice)

		if (args?.txBytes) {
			// broadcast txBytes
			const tx = await sdk.signer.broadcastTx(args.txBytes, args?.timeoutMs, args?.pollIntervalMs)

			// assert tx code is 0, in other words, tx succeeded
			assert(tx.code === 0, `cosmos_transaction: Failed to send tokens. Reason: ${tx.rawLog}`)

			// keep log
			console.warn('Sent tokens', 'txBytes', toString(args.txBytes, 'hex'))

			return tx
		}

		const tx = await sdk.signer.sendTokens(
			(await (await this.cosmosPayerWallet).getAccounts())[0].address,
			args.recipientAddress,
			[args.amount],
			'auto',
			args.memo,
		)

		assert(tx.code === 0, `cosmos_transaction: Failed to send tokens. Reason: ${tx.rawLog}`)

		console.warn('Sent tokens', args.amount.amount, args.amount.denom, 'to', args.recipientAddress)

		return tx
	}

	private async signPayload(context: IAgentContext<IKeyManager>, data: Uint8Array, verificationMethod: VerificationMethod[] = []): Promise<SignInfo[]> {
		return Promise.all(
			verificationMethod.map(async (method) => {
				const keyRef = extractPublicKeyHex(method)
				return {
					verificationMethodId: method.id,
					signature: base64ToBytes(await context.agent.keyManagerSign({
						keyRef,
						data: toString(data, 'hex'),
						encoding: 'hex'
					}))
				} satisfies SignInfo
			})
		)
	}

	private async getKeysFromVerificationMethod(context: IAgentContext<IKeyManager>, verificationMethod: VerificationMethod[] = []): Promise<ManagedKeyInfo[]> {
		return Promise.all(
			verificationMethod.map(async (method) => {
				const kid = extractPublicKeyHex(method)
				return await context.agent.keyManagerGet({ kid })
			})
		).catch((error) => {
			throw new Error(`Failed to sign payload: ${error}`)
		})
	}
}

export async function createMsgCreateDidDocPayloadToSign(didPayload: DIDDocument, versionId: string): Promise<Uint8Array> {
	const { protobufVerificationMethod, protobufService } = await DIDModule.validateSpecCompliantPayload(didPayload)
	return MsgCreateDIDDocumentPayload.encode(
		MsgCreateDIDDocumentPayload.fromPartial({
			context: <string[]>didPayload?.['@context'],
			id: didPayload.id,
			controller: <string[]>didPayload.controller,
			verificationMethod: protobufVerificationMethod,
			authentication: <string[]>didPayload.authentication,
			assertionMethod: <string[]>didPayload.assertionMethod,
			capabilityInvocation: <string[]>didPayload.capabilityInvocation,
			capabilityDelegation: <string[]>didPayload.capabilityDelegation,
			keyAgreement: <string[]>didPayload.keyAgreement,
			service: protobufService,
			alsoKnownAs: <string[]>didPayload.alsoKnownAs,
			versionId,
		})
	).finish()
}

export async function createMsgDeactivateDidDocPayloadToSign(didPayload: DIDDocument, versionId?: string): Promise<Uint8Array> {
	return MsgDeactivateDIDDocumentPayload.encode(
		MsgDeactivateDIDDocumentPayload.fromPartial({
			id: didPayload.id,
			versionId,
		})
	).finish()
}