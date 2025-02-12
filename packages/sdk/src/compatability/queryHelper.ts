import _m0 from "protobufjs/minimal.js";

export function encodeInputQueryWithParam<T extends Record<string, any>>(
  message: T,
  field: keyof T,
  writer: _m0.Writer = _m0.Writer.create()
): _m0.Writer {
  if (message[field] !== "" && message[field] !== undefined) {
    writer.uint32(10).string(String(message[field]));
  }
  return writer;
}

export function getQueryInputLimits(input: _m0.Reader | Uint8Array, length?: number) {
  const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
  const end = length === undefined ? reader.len : reader.pos + length;
  return {
    reader,
    end
  };
}