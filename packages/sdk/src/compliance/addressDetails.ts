import {
  PageRequest,
  PageResponse,
} from "cosmjs-types/cosmos/base/query/v1beta1/pagination.js";
import _m0 from "protobufjs/minimal.js";

export const verificationTypes = [
  "VT_UNSPECIFIED",
  "VT_KYC",
  "VT_KYB",
  "VT_KYW",
  "VT_HUMANITY",
  "VT_AML",
  "VT_ADDRESS",
  "VT_CUSTOM",
  "VT_CREDIT_SCORE",
] as const;

export type Verification = {
  type: (typeof verificationTypes)[number];
  verificationId: string;
  issuerAddress: string;
};

export type AddressDetails = {
  isRevoked?: boolean;
  isVerified?: boolean;
  verifications: Verification[];
};

export type AddressDetailsWithKey = {
  address: string;
  addressDetails: AddressDetails;
};

export const QueryAddressListRequest = {
  encode(message: { pagination?: PageRequest }, writer = _m0.Writer.create()) {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
};

export const QueryAddressListResponse = {
  decode(input: _m0.Reader | Uint8Array, length?: number) {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    const end = length === undefined ? reader.len : reader.pos + length;

    const message = {
      addresses: [] as AddressDetailsWithKey[],
      pagination: undefined as any as PageResponse,
    };

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.addresses.push(
            queryAddressDetailsWithKey.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const queryAddressDetailsWithKey = {
  decode(input: _m0.Reader | Uint8Array, length?: number) {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    const end = length === undefined ? reader.len : reader.pos + length;

    const message = {} as AddressDetailsWithKey;

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.addressDetails = QueryAddressDetailsResponse.decode(
            reader,
            reader.uint32()
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

    const message: AddressDetails = {
      isRevoked: undefined,
      isVerified: undefined,
      verifications: [],
    };

    if (length === undefined) {
      reader.uint32();
      reader.uint32();
    }
    
    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.isVerified = reader.bool();
          break;
        case 2:
          message.isRevoked = reader.bool();
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

export const QueryVerificationResponse = {
  decode(input: _m0.Reader | Uint8Array, length?: number) {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;

    const message = {} as Verification;
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
