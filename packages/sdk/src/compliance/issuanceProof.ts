import _m0 from "protobufjs/minimal.js";
import { IQueryCredentialHashRequest, IQueryCredentialHashResponse, IQueryIssuanceProofRequest, IQueryIssuanceProofResponse } from '../types.js';
import { encodeInputQueryWithParam, getQueryInputLimits } from '../compatability/queryHelper.js';

export const QueryCredentialHashRequest = {
  encode(message: IQueryCredentialHashRequest, writer = _m0.Writer.create()): _m0.Writer {
    return encodeInputQueryWithParam(message, 'verificationId', writer);
  },
}

export const QueryCredentialHashResponse = {
  decode(input: _m0.Reader | Uint8Array, length?: number): IQueryCredentialHashResponse {
    const { reader, end } = getQueryInputLimits(input, length);
    const message = {
      credentialHash: ""
    };
    
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.credentialHash = Buffer.from(reader.bytes()).toString("base64");
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
    return encodeInputQueryWithParam(message, 'credentialHash', writer);
  },
};

export const QueryIssuanceProofResponse = {
  decode(input: _m0.Reader | Uint8Array, length?: number): IQueryIssuanceProofResponse {
    const { reader, end } = getQueryInputLimits(input, length);
    const message = { 
      encodedProof: ''
    };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.encodedProof = Buffer.from(reader.bytes()).toString("base64");
          break;
          default:
            reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  }
}