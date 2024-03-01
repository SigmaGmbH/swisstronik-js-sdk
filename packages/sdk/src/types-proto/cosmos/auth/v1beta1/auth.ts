// import { Any } from "cosmjs-types/google/protobuf/any";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";

function createBaseAuthAccount() {
  return {
      address: "",
      pubKey: undefined as Any | undefined,
      accountNumber: Long.UZERO,
      sequence: Long.UZERO,
  };
};

export function decodeBaseAccount(input: Uint8Array | _m0.Reader, length?: number) {
  const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
  let end = length === undefined ? reader.len : reader.pos + length;
  const message = createBaseAuthAccount();

  while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
          case 1:
              message.address = reader.string();
              break;
          case 2:
              message.pubKey = Any.decode(reader, reader.uint32());
              break;
          case 3:
              message.accountNumber = reader.uint64() as Long;
              break;
          case 4:
              message.sequence = reader.uint64() as Long;
              break;
          default:
              reader.skipType(tag & 7);
              break;
      }
  }
  return message;
};
