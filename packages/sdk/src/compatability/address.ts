import { fromBase64, fromHex, toBech32 } from "@cosmjs/encoding"
import { Pubkey, isEd25519Pubkey, isMultisigThresholdPubkey, isSecp256k1Pubkey } from "@cosmjs/amino"
import { Uint53 } from "@cosmjs/math"
import { rawSecp256k1PubkeyToRawAddress } from "./secp256k1.js";
import { sha256 } from '@cosmjs/crypto'

export function encodeAminoPubkey(pubkey: Pubkey) {
  const pubkeyAminoPrefixMultisigThreshold = fromHex("22c1f7e2" /* variable length not included */);
  const pubkeyAminoPrefixSecp256k1 = fromHex("21" /* fixed length */);
  const pubkeyAminoPrefixEd25519 = fromHex("1624de64" + "20" /* fixed length */);


  function encodeUvarint(value: number | string) {
    const checked = Uint53.fromString(value.toString()).toNumber();
    if (checked > 127) {
        throw new Error("Encoding numbers > 127 is not supported here. Please tell those lazy CosmJS maintainers to port the binary.PutUvarint implementation from the Go standard library and write some tests.");
    }
    return [checked];
  }

  if (isMultisigThresholdPubkey(pubkey)) {
      const out = Array.from(pubkeyAminoPrefixMultisigThreshold);
      out.push(0x08); // https://github.com/cosmos/cosmjs/blob/v0.31.1/packages/amino/src/encoding.ts#L198
      out.push(...encodeUvarint(pubkey.value.threshold));
      for (const pubkeyData of pubkey.value.pubkeys.map((p) => encodeAminoPubkey(p))) {
          out.push(0x12); // https://github.com/cosmos/cosmjs/blob/v0.31.1/packages/amino/src/encoding.ts#L201
          out.push(...encodeUvarint(pubkeyData.length));
          out.push(...pubkeyData);
      }
      return new Uint8Array(out);
  }
  else if (isEd25519Pubkey(pubkey)) {
      return new Uint8Array([...pubkeyAminoPrefixEd25519, ...fromBase64(pubkey.value)]);
  }
  else if (isSecp256k1Pubkey(pubkey)) {
      return new Uint8Array([...pubkeyAminoPrefixSecp256k1, ...fromBase64(pubkey.value)]);
  }
  else {
      throw new Error("Unsupported pubkey type");
  }
}

export function pubkeyToAddress(pubkey: Pubkey) {
  if(isSecp256k1Pubkey(pubkey)) {
      const buf = Buffer.from(pubkey.value, "base64");
      const bytes = Uint8Array.from(buf);
      return toBech32('swtr', rawSecp256k1PubkeyToRawAddress(bytes));
  } else if(isMultisigThresholdPubkey(pubkey)) {
      const pubkeyData = encodeAminoPubkey(pubkey);
      return toBech32('swtr', sha256(pubkeyData).slice(0, 20));
  }
  else {
      throw new Error("Unsupported public key type");
  }
}