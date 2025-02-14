import {
  PageRequest,
  PageResponse,
} from "cosmjs-types/cosmos/base/query/v1beta1/pagination.js";
import _m0 from "protobufjs/minimal.js";
import { IssuerDetails, MergedIssuerDetails } from "../types.js";
import { encodeInputQueryWithPagination, encodeInputQueryWithParam, getQueryInputLimits } from '../compatability/queryHelper.js';


export const QueryIssuerListRequest = {
  encode(message: { pagination?: PageRequest }, writer = _m0.Writer.create()) {
    return encodeInputQueryWithPagination(message, writer);
  },
};

export const QueryIssuerListResponse = {
  decode(input: _m0.Reader | Uint8Array, length?: number) {

    const { reader, end } = getQueryInputLimits(input, length);
    const message = {
      issuers: [] as MergedIssuerDetails[],
      pagination: undefined as any as PageResponse,
    };

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.issuers.push(
            QueryMergedIssuerDetails.decode(reader, reader.uint32())
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

export const QueryMergedIssuerDetails = {
  decode(input: _m0.Reader | Uint8Array, length?: number) {

    const { reader, end } = getQueryInputLimits(input, length);
    const message = {} as MergedIssuerDetails;

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.issuerAddress = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.url = reader.string();
          break;
        case 5:
          message.logo = reader.string();
          break;
        case 6:
          message.legalEntity = reader.string();
          break;
        case 7:
          message.creator = reader.string();
          break;  
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

export const QueryIssuerDetailsRequest = {
  encode(message: { issuerAddress: string }, writer = _m0.Writer.create()) {
    return encodeInputQueryWithParam(message, 'issuerAddress', writer);
  },
};

export const QueryIssuerDetailsResponse = {
  decode(input: _m0.Reader | Uint8Array, length?: number) {
    
    const { reader, end } = getQueryInputLimits(input, length);
    const message: IssuerDetails = {
      name: undefined,
      description: undefined,
      url: undefined,
      logo: undefined,
      legalEntity: undefined,
    };

    if (length === undefined) {
      reader.uint32();
      reader.uint32();
    }

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.url = reader.string();
          break;
        case 4:
          message.logo = reader.string();
          break;
        case 5:
          message.legalEntity = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};
