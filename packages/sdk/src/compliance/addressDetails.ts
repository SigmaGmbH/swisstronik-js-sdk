import {
  PageRequest,
  PageResponse,
} from "cosmjs-types/cosmos/base/query/v1beta1/pagination.js";
import _m0 from "protobufjs/minimal.js";
import { AddressDetails, VerificationType, VerificationFrontend, MergedAddressDetails } from "../types.js"


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
      addresses: [] as MergedAddressDetails[],
      pagination: undefined as any as PageResponse,
    };

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.addresses.push(
            queryMergedAddressDetails.decode(reader, reader.uint32())
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

const queryMergedAddressDetails = {
  decode(input: _m0.Reader | Uint8Array, length?: number) {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    const end = length === undefined ? reader.len : reader.pos + length;

    const message = {
      verifications: [] as VerificationFrontend[],
    } as unknown as MergedAddressDetails;

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.isVerified = reader.bool();
          break;
        case 3:
          message.isRevoked = reader.bool();
          break;
        case 4:
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
      verifications: [],
      isVerified: false,
      isRevoked: false
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

    const message = {} as VerificationFrontend;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = VerificationType[reader.uint32()];
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
