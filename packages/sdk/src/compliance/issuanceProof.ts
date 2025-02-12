import {
  PageRequest,
  PageResponse,
} from "cosmjs-types/cosmos/base/query/v1beta1/pagination.js";
import _m0 from "protobufjs/minimal.js";
import { IQueryCredentialHashRequest, IQueryCredentialHashResponse, IQueryIssuanceProofRequest, IQueryIssuanceProofResponse } from '../types.js';

export const QueryCredentialHashRequest = {
  encode(message: IQueryCredentialHashRequest, writer = _m0.Writer.create()): _m0.Writer {
    if (message.verificationId.length !== 0) {
      console.log('verificationId!', message.verificationId)
      writer.uint32(10).bytes(message.verificationId);
    }
    return writer;
  },
}

export const QueryCredentialHashResponse = {
  decode(input: _m0.Reader | Uint8Array, length?: number): IQueryCredentialHashResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;

    const message = {
      credentialHash: new Uint8Array(0)
    };
    
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.credentialHash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  }
}


export const QueryIssuanceProofRequest = {
  encode(message: IQueryIssuanceProofRequest, writer = _m0.Writer.create()) {
    if (message.credentialHash !== "") {
      writer.uint32(10).string(message.credentialHash);
    }
    return writer;
  },
};

export const QueryIssuanceProofResponse = {
  decode(input: _m0.Reader | Uint8Array, length?: number): IQueryIssuanceProofResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { 
      encodedProof: new Uint8Array(0) 
    };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.encodedProof = reader.bytes();
          break;
          default:
            reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  }
}