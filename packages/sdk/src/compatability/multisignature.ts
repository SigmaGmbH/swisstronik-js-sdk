import { pubkeyToAddress } from "./address";
import {
  StdFee,
  isSecp256k1Pubkey,
  isMultisigThresholdPubkey,
  MultisigThresholdPubkey,
  isEd25519Pubkey,
} from "@cosmjs/amino";
import { PubKey as Secp256k1PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys.js";
import { PubKey as Ed25519PubKey } from "cosmjs-types/cosmos/crypto/ed25519/keys.js";
import { fromBase64 } from "@cosmjs/encoding";
import { LegacyAminoPubKey } from "cosmjs-types/cosmos/crypto/multisig/keys";
import { Uint53 } from "@cosmjs/math";
import { Any } from "../types-proto/google/protobuf/any.js";
import { makeCompactBitArray } from "@cosmjs/stargate/build/multisignature.js";
import { SignMode } from "cosmjs-types/cosmos/tx/signing/v1beta1/signing.js";
import Long from "long";
import { AuthInfo, TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx.js";
import { MultiSignature } from "cosmjs-types/cosmos/crypto/multisig/v1beta1/multisig.js";

export function makeMultisignedTxBytes(
  multisigPubkey: MultisigThresholdPubkey,
  sequence: number,
  fee: StdFee,
  bodyBytes: Uint8Array,
  signatures: Map<string, Uint8Array>
): Uint8Array {
  const signedTx = makeMultisignedTx(
    multisigPubkey,
    sequence,
    fee,
    bodyBytes,
    signatures
  );
  return TxRaw.encode(signedTx).finish();
}

export function makeMultisignedTx(
  multisigPubkey: MultisigThresholdPubkey,
  sequence: number,
  fee: StdFee,
  bodyBytes: Uint8Array,
  signatures: Map<string, Uint8Array>
) {
  const signers = Array(multisigPubkey.value.pubkeys.length).fill(false);
  const signaturesList = new Array();
  for (let i = 0; i < multisigPubkey.value.pubkeys.length; i++) {
    const signerAddress = pubkeyToAddress(multisigPubkey.value.pubkeys[i]);
    const signature = signatures.get(signerAddress);
    if (signature) {
      signers[i] = true;
      signaturesList.push(signature);
    }
  }
  const signerInfo = {
    publicKey: encodePubkey(multisigPubkey),
    modeInfo: {
      multi: {
        bitarray: makeCompactBitArray(signers),
        modeInfos: signaturesList.map((_) => ({
          single: { mode: SignMode.SIGN_MODE_LEGACY_AMINO_JSON },
        })),
      },
    },
    sequence: Long.fromNumber(sequence),
  } as any;

  const authInfo = AuthInfo.fromPartial({
    signerInfos: [signerInfo],
    fee: {
      amount: [...fee.amount],
      gasLimit: Long.fromNumber(+fee.gas) as any,
    },
  });

  const authInfoBytes = AuthInfo.encode(authInfo).finish();
  const signedTx = TxRaw.fromPartial({
    bodyBytes: bodyBytes,
    authInfoBytes: authInfoBytes,
    signatures: [
      MultiSignature.encode(
        MultiSignature.fromPartial({ signatures: signaturesList })
      ).finish(),
    ],
  });
  return signedTx;
}

function encodePubkey(pubkey: any) {
  if (isSecp256k1Pubkey(pubkey)) {
    const pubkeyProto = Secp256k1PubKey.fromPartial({
      key: fromBase64(pubkey.value),
    });

    const anyPubkey = Any.fromPartial({
      typeUrl: "/ethermint.crypto.v1.ethsecp256k1.PubKey",
      value: Secp256k1PubKey.encode(pubkeyProto).finish(),
    });

    return anyPubkey;
  } else if (isEd25519Pubkey(pubkey)) {
    const pubkeyProto = Ed25519PubKey.fromPartial({
      key: fromBase64(pubkey.value),
    });
    return Any.fromPartial({
      typeUrl: "/cosmos.crypto.ed25519.PubKey",
      value: Uint8Array.from(Ed25519PubKey.encode(pubkeyProto).finish()),
    });
  } else if (isMultisigThresholdPubkey(pubkey)) {
    const pubkeyProto = LegacyAminoPubKey.fromPartial({
      threshold: Uint53.fromString(pubkey.value.threshold).toNumber(),
      publicKeys: pubkey.value.pubkeys.map(encodePubkey),
    }) as any;

    return Any.fromPartial({
      typeUrl: "/cosmos.crypto.multisig.LegacyAminoPubKey",
      value: Uint8Array.from(LegacyAminoPubKey.encode(pubkeyProto).finish()),
    });
  } else {
    throw new Error(`Pubkey type ${pubkey.type} not recognized`);
  }
}
