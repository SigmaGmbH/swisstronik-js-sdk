import _m0 from "protobufjs/minimal.js";

export const verificationTypes = [
  "VT_KYC",
  "VT_KYB",
  "VT_KYW",
  "VT_HUMANITY",
  "VT_AML",
  "VT_ADDRESS",
  "VT_CUSTOM",
  "VT_CREDIT_SCORE",
] as const;

export type VerificationResponse = {
  type?: (typeof verificationTypes)[number];
  verificationId?: string;
  issuerAddress?: string;
};

export type AddressDetailsResponse = {
  isRevoked?: boolean;
  isVerified?: boolean;
  verifications: VerificationResponse[];
};

export const QueryVerificationResponse = {
  decode(input: _m0.Reader | Uint8Array, length?: number) {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;

    const message: VerificationResponse = {
      type: undefined,
      verificationId: undefined,
      issuerAddress: undefined,
    };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = verificationTypes[reader.uint32()];
          break;
        case 2:
          message.verificationId = Buffer.from(reader.bytes()).toString(
            "base64"
          );
          break;
        case 3:
          message.issuerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

export const QueryAddressDetailsRequest = {
  encode(message: { address: string }, writer = _m0.Writer.create()) {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
};

export const QueryAddressDetailsResponse = {
  decode(input: _m0.Reader | Uint8Array, length?: number) {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;

    const message: AddressDetailsResponse = {
      isRevoked: undefined,
      isVerified: undefined,
      verifications: [],
    };
    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.isRevoked = reader.bool();
          break;
        case 2:
          message.isVerified = reader.bool();
          break;
        case 3:
          message.verifications.push(
            QueryVerificationResponse.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};
