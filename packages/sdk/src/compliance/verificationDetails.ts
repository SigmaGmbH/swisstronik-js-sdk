import {
  PageRequest,
  PageResponse,
} from "cosmjs-types/cosmos/base/query/v1beta1/pagination.js";
import _m0 from "protobufjs/minimal.js";

export const verificationTypes = [
  /** VT_UNSPECIFIED - VT_UNSPECIFIED defines an invalid/undefined verification type. */
  "VT_UNSPECIFIED",
  /** VT_KYC - Know Your Customer */
  "VT_KYC",
  /** VT_KYB - Know Your Business */
  "VT_KYB",
  /** VT_KYW - Know Your Wallet */
  "VT_KYW",
  "VT_HUMANITY",
  /** VT_AML - Anti Money Laundering (check transactions) */
  "VT_AML",
  "VT_ADDRESS",
  "VT_CUSTOM",
  "VT_CREDIT_SCORE",
  /** VT_BIOMETRIC - Biometric Passports and other types of biometric verification */
  "VT_BIOMETRIC",

] as const;

export type VerificationDetails = {
  type: (typeof verificationTypes)[number];
  issuerAddress?: string;
  originChain?: string;
  issuanceTimestamp?: number;
  expirationTimestamp?: number;
  originalData?: string;
  schema?: string;
  issuerVerificationId?: string;
  version?: number;
  /** Is revoked */
  isRevoked: boolean;
};

/** ZKCredential contains basic information, which can be used to construct proof-of-ownership of some credential */
export interface ZKCredential {
  type: (typeof verificationTypes)[number];
  issuerAddress: Uint8Array;
  holderPublicKey: Uint8Array;
  expirationTimestamp: number;
  issuanceTimestamp: number;
}

export type MergedVerificationDetails = {
  verificationID: string;
} & VerificationDetails;

export const QueryVerificationListRequest = {
  encode(message: { pagination?: PageRequest }, writer = _m0.Writer.create()) {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
};

export const QueryVerificationListResponse = {
  decode(input: _m0.Reader | Uint8Array, length?: number) {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    const end = length === undefined ? reader.len : reader.pos + length;

    const message = {
      verifications: [] as MergedVerificationDetails[],
      pagination: undefined as any as PageResponse,
    };

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.verifications.push(
            QueryMergedVerificationDetails.decode(reader, reader.uint32())
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

export const QueryMergedVerificationDetails = {
  decode(input: _m0.Reader | Uint8Array, length?: number) {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    const end = length === undefined ? reader.len : reader.pos + length;

    const message = {} as MergedVerificationDetails;

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.type = verificationTypes[reader.uint32()];
          break;
        case 2:
          message.verificationID = Buffer.from(reader.bytes()).toString(
            "base64"
          );
          break;
        case 3:
          message.issuerAddress = reader.string();
          break;
        case 4:
          message.originChain = reader.string();
          break;
        case 5:
          message.issuanceTimestamp = reader.uint32();
          break;
        case 6:
          message.expirationTimestamp = reader.uint32();
          break;
        case 7:
          message.originalData = Buffer.from(reader.bytes()).toString("base64");
          break;
        case 8:
          message.schema = reader.string();
          break;
        case 9:
          message.issuerVerificationId = reader.string();
          break;
        case 10:
          message.version = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

export const QueryVerificationDetailsRequest = {
  encode(message: { verificationID: string }, writer = _m0.Writer.create()) {
    if (message.verificationID !== "") {
      writer.uint32(10).string(message.verificationID);
    }
    return writer;
  },
};

export const QueryVerificationDetailsResponse = {
  decode(input: _m0.Reader | Uint8Array, length?: number) {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    const end = length === undefined ? reader.len : reader.pos + length;

    const message = {} as VerificationDetails;

    if (length === undefined) {
      reader.uint32();
      reader.uint32();
    }

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.type = verificationTypes[reader.uint32()];
          break;
        case 2:
          message.issuerAddress = reader.string();
          break;
        case 3:
          message.originChain = reader.string();
          break;
        case 4:
          message.issuanceTimestamp = reader.uint32();
          break;
        case 5:
          message.expirationTimestamp = reader.uint32();
          break;
        case 6:
          message.originalData = Buffer.from(reader.bytes()).toString("base64");
          break;
        case 7:
          message.schema = reader.string();
          break;
        case 8:
          message.issuerVerificationId = reader.string();
          break;
        case 9:
          message.version = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};
