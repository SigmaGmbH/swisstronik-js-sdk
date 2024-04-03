import { Uint64 } from "@cosmjs/math";
import {
  Account,
  AccountParser,
  StargateClient,
  StargateClientOptions,
} from "@cosmjs/stargate";
import { EthAccount } from "./types-proto/ethermint/types/v1/account.js";
import { Tendermint34Client, Tendermint37Client } from "@cosmjs/tendermint-rpc";
import {
  encodeSecp256k1Pubkey,
  Pubkey,
  SinglePubkey,
  encodeEd25519Pubkey,
  MultisigThresholdPubkey,
} from "@cosmjs/amino";
import { Any } from "./types-proto/google/protobuf/any.js";
import Long from "long";
import { PubKey as CosmosCryptoEd25519Pubkey } from "cosmjs-types/cosmos/crypto/ed25519/keys.js";
import { PubKey as CosmosCryptoSecp256k1Pubkey } from "cosmjs-types/cosmos/crypto/secp256k1/keys.js";
import { PubKey as CommonPubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys.js";
import { Secp256k1 } from "./compatability/secp256k1.js";
import { LegacyAminoPubKey } from "cosmjs-types/cosmos/crypto/multisig/keys.js";

export class SwisstronikStargateClient extends StargateClient {
  private readonly overridenAccountParser: AccountParser;

  constructor(
    tmClient: Tendermint37Client | Tendermint34Client | undefined,
    options: StargateClientOptions = {}
  ) {
    super(tmClient, options);

    const { accountParser = this.accountFromAny } = options;
    this.overridenAccountParser = accountParser;
  }

  public static async connect(
    endpoint: string,
    options: StargateClientOptions = {}
  ) {
    // Tendermint/CometBFT 0.34/0.37 auto-detection. Starting with 0.37 we seem to get reliable versions again 🎉
    // Using 0.34 as the fallback.
    let tmClient;
    const tm37Client = await Tendermint37Client.connect(endpoint);
    const version = (await tm37Client.status()).nodeInfo.version;
    console.log(`[sdk::client.ts] Detected Tendermint version: ${version}`);
    if (version.startsWith("0.37.")) {
      tmClient = tm37Client;
    } else {
      tm37Client.disconnect();
      tmClient = await Tendermint34Client.connect(endpoint);
    }
    return new SwisstronikStargateClient(tmClient, options);
  }

  public async getAccount(searchAddress: string): Promise<Account | null> {
    try {
      console.log(
        `[sdk::client.ts] Requesting account data for ${searchAddress}`
      );
      const account = await this.forceGetQueryClient().auth.account(
        searchAddress
      );
      console.log(`[sdk::client.ts] Obtained data: `, account);
      return account ? this.overridenAccountParser(account) : null;
    } catch (error: any) {
      console.log(`[sdk::client.ts] Cannot obtain data. Reason: ${error}`);
      if (/rpc error: code = NotFound/i.test(error.toString())) {
        return null;
      }
      throw error;
    }
  }

  private accountFromAny(input: Any): Account {
    console.log("[DEBUG] Using overriden account parser");
    console.log("[DEBUG] Input - ", input);
    const { value } = input;
    console.log("DEBUG: value to decode", Buffer.from(value).toString("hex"));
    const account = EthAccount.decode(value);
    console.log("[DEBUG] account", account);
    const { address, pubKey, accountNumber, sequence } = account.baseAccount!;
    const pubkey = pubKey ? this.decodePubkey(pubKey) : null;
    return {
      address: address,
      pubkey: pubkey,
      accountNumber: this.uint64FromProto(accountNumber).toNumber(),
      sequence: this.uint64FromProto(sequence).toNumber(),
    };
  }

  private uint64FromProto(input: number | Long): Uint64 {
    return Uint64.fromString(input.toString());
  }

	private decodePubkey(pubkey: Any): Pubkey {
		switch (pubkey.typeUrl) {
			case "/ethermint.crypto.v1.ethsecp256k1.PubKey":
			case "/cosmos.crypto.secp256k1.PubKey":
			case "/cosmos.crypto.ed25519.PubKey": {
				return this.anyToSinglePubkey(pubkey);
			}
			case "/cosmos.crypto.multisig.LegacyAminoPubKey": {
				return this.anyToMultiPubkey(pubkey);
			}
			default:
				throw new Error(`Pubkey type_url ${pubkey.typeUrl} not recognized`);
		}
	}

  private anyToMultiPubkey(pubkey: Any): MultisigThresholdPubkey {
		const { publicKeys, threshold } = LegacyAminoPubKey.decode(pubkey.value);
		const keys = publicKeys.map((key) => this.anyToSinglePubkey(key));
		return {
			type: "tendermint/PubKeyMultisigThreshold",
			value: {
				pubkeys: keys,
				threshold: String(threshold)
			},
		};
	}

  private anyToSinglePubkey(pubkey: Any): SinglePubkey {
    switch (pubkey.typeUrl) {
      case "/ethermint.crypto.v1.ethsecp256k1.PubKey":
        const { key } = CommonPubKey.decode(pubkey.value);
        const compressedKey = Secp256k1.compressPubkey(key);
        return encodeSecp256k1Pubkey(compressedKey);
      case "/cosmos.crypto.secp256k1.PubKey": {
        const { key } = CosmosCryptoSecp256k1Pubkey.decode(pubkey.value);
        return encodeSecp256k1Pubkey(key);
      }
      case "/cosmos.crypto.ed25519.PubKey": {
        const { key } = CosmosCryptoEd25519Pubkey.decode(pubkey.value);
        return encodeEd25519Pubkey(key);
      }
      default:
        throw new Error(
          `Pubkey type_url ${pubkey.typeUrl} not recognized as single public key type`
        );
    }
  }
}
