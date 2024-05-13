import {
  PageRequest,
  PageResponse,
} from "cosmjs-types/cosmos/base/query/v1beta1/pagination.js";
import _m0 from "protobufjs/minimal.js";

export type VerificationDetails = {
  issuerAddress?: string;
  originChain?: string;
  issuanceTimestamp?: number;
  expirationTimestamp?: number;
  originalData?: string;
  proofSchema?: string;
  issuerVerificationId?: string;
};

export type VerificationDetailsWithKey = {
  verificationID: string;
  verificationDetails: VerificationDetails;
};

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
      verifications: [] as VerificationDetailsWithKey[],
      pagination: undefined as any as PageResponse,
    };

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.verifications.push(
            QueryVerificationDetailsWithKey.decode(reader, reader.uint32())
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

export const QueryVerificationDetailsWithKey = {
  decode(input: _m0.Reader | Uint8Array, length?: number) {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    const end = length === undefined ? reader.len : reader.pos + length;

    const message = {} as VerificationDetailsWithKey;

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.verificationID = Buffer.from(reader.bytes()).toString("base64");
          break;
        case 2:
          message.verificationDetails = QueryVerificationDetailsResponse.decode(
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

    const message: VerificationDetails = {
      issuerAddress: undefined,
      originChain: undefined,
      issuanceTimestamp: undefined,
      expirationTimestamp: undefined,
      originalData: undefined,
      proofSchema: undefined,
      issuerVerificationId: undefined,
    };

    if (length === undefined) {
      reader.uint32();
      reader.uint32();
    }

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.issuerAddress = reader.string();
          break;
        case 2:
          message.originChain = reader.string();
          break;
        case 3:
          message.issuanceTimestamp = reader.uint32();
          break;
        case 4:
          message.expirationTimestamp = reader.uint32();
          break;
        case 5:
          message.originalData = Buffer.from(reader.bytes()).toString("base64");
          break;
        case 6:
          message.proofSchema = reader.string();
          break;
        case 7:
          message.issuerVerificationId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};
