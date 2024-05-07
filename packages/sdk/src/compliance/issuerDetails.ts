import _m0 from "protobufjs/minimal.js";

export type IssuerDetails = {
  name?: string;
  description?: string;
  url?: string;
  logo?: string;
  legalEntity?: string;
};

export const QueryIssuerDetailsRequest = {
  encode(message: { issuerAddress: string }, writer = _m0.Writer.create()) {
    if (message.issuerAddress !== "") {
      writer.uint32(10).string(message.issuerAddress);
    }
    return writer;
  },
};

export const QueryIssuerDetailsResponse = {
  decode(input: _m0.Reader | Uint8Array, length?: number) {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;

    const message: IssuerDetails = {
      name: undefined,
      description: undefined,
      url: undefined,
      logo: undefined,
      legalEntity: undefined,
    };

    reader.uint32();
    reader.uint32();

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
