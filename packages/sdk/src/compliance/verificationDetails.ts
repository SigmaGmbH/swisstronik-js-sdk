import {
  PageRequest,
  PageResponse,
} from "cosmjs-types/cosmos/base/query/v1beta1/pagination.js";
import _m0 from "protobufjs/minimal.js";
import { MergedVerificationDetails, VerificationDetails, VerificationType } from "../types.js";
import { encodeInputQueryWithPagination, encodeInputQueryWithParam, getQueryInputLimits } from '../compatability/queryHelper.js';

/** ZKCredential contains basic information, which can be used to construct proof-of-ownership of some credential */

export const QueryVerificationListRequest = {
  encode(message: { pagination?: PageRequest }, writer = _m0.Writer.create()) {
    return encodeInputQueryWithPagination(message, writer);
  },
};

export const QueryVerificationListResponse = {
  decode(input: _m0.Reader | Uint8Array, length?: number) {

    const { reader, end } = getQueryInputLimits(input, length);
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

    const { reader, end } = getQueryInputLimits(input, length);
    const message = {} as MergedVerificationDetails;

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.type = VerificationType[reader.uint32()];
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
        case 11:
          message.isRevoked = reader.bool();
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
    return encodeInputQueryWithParam(message, 'verificationID', writer);;
  },
};

export const QueryVerificationDetailsResponse = {
  decode(input: _m0.Reader | Uint8Array, length?: number) {

    const { reader, end } = getQueryInputLimits(input, length);
    const message = {} as VerificationDetails;

    if (length === undefined) {
      reader.uint32();
      reader.uint32();
    }

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.type = VerificationType[reader.uint32()];
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
        case 10:
          message.isRevoked = reader.bool();
          break;  
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};
