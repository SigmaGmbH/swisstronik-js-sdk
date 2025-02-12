
import { encodeInputQueryWithParam, getQueryInputLimits } from '../compatability/queryHelper.js';
import { IQueryHolderByVerificationIdRequest, IQueryHolderByVerificationIdResponse } from "../types.js"
import _m0 from "protobufjs/minimal.js";

export const QueryHolderByVerificationIdRequest = {
  encode(message: IQueryHolderByVerificationIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return encodeInputQueryWithParam(message, 'verificationId', writer);
  }
}

export const QueryHolderByVerificationIdResponse = {
  decode(input: _m0.Reader | Uint8Array, length?: number): IQueryHolderByVerificationIdResponse {
    const { reader, end } = getQueryInputLimits( input, length )
    const message = {
      address: "" 
    };

    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);  
          break;
      }
    }
    return message;
  }
};
