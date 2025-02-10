// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.2
//   protoc               v5.28.0
// source: swisstronik/compliance/genesis.proto

/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { AddressDetails, IssuerDetails, OperatorDetails, VerificationDetails } from "./entities";
import { Params } from "./params";

export const protobufPackage = "swisstronik.compliance";

/** GenesisState defines the compliance module's genesis state. */
export interface GenesisState {
  params?: Params | undefined;
  issuerDetails: GenesisIssuerDetails[];
  addressDetails: GenesisAddressDetails[];
  verificationDetails: GenesisVerificationDetails[];
  operators: OperatorDetails[];
  publicKeys: GenesisHolderPublicKeys[];
  linksToPublicKey: GenesisLinkVerificationIdToPublicKey[];
}

export interface GenesisIssuerDetails {
  address: string;
  details?: IssuerDetails | undefined;
}

export interface GenesisAddressDetails {
  address: string;
  details?: AddressDetails | undefined;
}

export interface GenesisVerificationDetails {
  id: Uint8Array;
  details?: VerificationDetails | undefined;
}

export interface GenesisHolderPublicKeys {
  address: string;
  publicKey: Uint8Array;
}

export interface GenesisLinkVerificationIdToPublicKey {
  id: Uint8Array;
  publicKey: Uint8Array;
}

function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    issuerDetails: [],
    addressDetails: [],
    verificationDetails: [],
    operators: [],
    publicKeys: [],
    linksToPublicKey: [],
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.issuerDetails) {
      GenesisIssuerDetails.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.addressDetails) {
      GenesisAddressDetails.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.verificationDetails) {
      GenesisVerificationDetails.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.operators) {
      OperatorDetails.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.publicKeys) {
      GenesisHolderPublicKeys.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.linksToPublicKey) {
      GenesisLinkVerificationIdToPublicKey.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.issuerDetails.push(GenesisIssuerDetails.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.addressDetails.push(GenesisAddressDetails.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.verificationDetails.push(GenesisVerificationDetails.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.operators.push(OperatorDetails.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.publicKeys.push(GenesisHolderPublicKeys.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.linksToPublicKey.push(GenesisLinkVerificationIdToPublicKey.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      issuerDetails: globalThis.Array.isArray(object?.issuerDetails)
        ? object.issuerDetails.map((e: any) => GenesisIssuerDetails.fromJSON(e))
        : [],
      addressDetails: globalThis.Array.isArray(object?.addressDetails)
        ? object.addressDetails.map((e: any) => GenesisAddressDetails.fromJSON(e))
        : [],
      verificationDetails: globalThis.Array.isArray(object?.verificationDetails)
        ? object.verificationDetails.map((e: any) => GenesisVerificationDetails.fromJSON(e))
        : [],
      operators: globalThis.Array.isArray(object?.operators)
        ? object.operators.map((e: any) => OperatorDetails.fromJSON(e))
        : [],
      publicKeys: globalThis.Array.isArray(object?.publicKeys)
        ? object.publicKeys.map((e: any) => GenesisHolderPublicKeys.fromJSON(e))
        : [],
      linksToPublicKey: globalThis.Array.isArray(object?.linksToPublicKey)
        ? object.linksToPublicKey.map((e: any) => GenesisLinkVerificationIdToPublicKey.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    if (message.issuerDetails?.length) {
      obj.issuerDetails = message.issuerDetails.map((e) => GenesisIssuerDetails.toJSON(e));
    }
    if (message.addressDetails?.length) {
      obj.addressDetails = message.addressDetails.map((e) => GenesisAddressDetails.toJSON(e));
    }
    if (message.verificationDetails?.length) {
      obj.verificationDetails = message.verificationDetails.map((e) => GenesisVerificationDetails.toJSON(e));
    }
    if (message.operators?.length) {
      obj.operators = message.operators.map((e) => OperatorDetails.toJSON(e));
    }
    if (message.publicKeys?.length) {
      obj.publicKeys = message.publicKeys.map((e) => GenesisHolderPublicKeys.toJSON(e));
    }
    if (message.linksToPublicKey?.length) {
      obj.linksToPublicKey = message.linksToPublicKey.map((e) => GenesisLinkVerificationIdToPublicKey.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.issuerDetails = object.issuerDetails?.map((e) => GenesisIssuerDetails.fromPartial(e)) || [];
    message.addressDetails = object.addressDetails?.map((e) => GenesisAddressDetails.fromPartial(e)) || [];
    message.verificationDetails = object.verificationDetails?.map((e) => GenesisVerificationDetails.fromPartial(e)) ||
      [];
    message.operators = object.operators?.map((e) => OperatorDetails.fromPartial(e)) || [];
    message.publicKeys = object.publicKeys?.map((e) => GenesisHolderPublicKeys.fromPartial(e)) || [];
    message.linksToPublicKey =
      object.linksToPublicKey?.map((e) => GenesisLinkVerificationIdToPublicKey.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGenesisIssuerDetails(): GenesisIssuerDetails {
  return { address: "", details: undefined };
}

export const GenesisIssuerDetails = {
  encode(message: GenesisIssuerDetails, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.details !== undefined) {
      IssuerDetails.encode(message.details, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisIssuerDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisIssuerDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.details = IssuerDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisIssuerDetails {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      details: isSet(object.details) ? IssuerDetails.fromJSON(object.details) : undefined,
    };
  },

  toJSON(message: GenesisIssuerDetails): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.details !== undefined) {
      obj.details = IssuerDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisIssuerDetails>, I>>(base?: I): GenesisIssuerDetails {
    return GenesisIssuerDetails.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisIssuerDetails>, I>>(object: I): GenesisIssuerDetails {
    const message = createBaseGenesisIssuerDetails();
    message.address = object.address ?? "";
    message.details = (object.details !== undefined && object.details !== null)
      ? IssuerDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseGenesisAddressDetails(): GenesisAddressDetails {
  return { address: "", details: undefined };
}

export const GenesisAddressDetails = {
  encode(message: GenesisAddressDetails, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.details !== undefined) {
      AddressDetails.encode(message.details, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisAddressDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisAddressDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.details = AddressDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisAddressDetails {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      details: isSet(object.details) ? AddressDetails.fromJSON(object.details) : undefined,
    };
  },

  toJSON(message: GenesisAddressDetails): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.details !== undefined) {
      obj.details = AddressDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisAddressDetails>, I>>(base?: I): GenesisAddressDetails {
    return GenesisAddressDetails.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisAddressDetails>, I>>(object: I): GenesisAddressDetails {
    const message = createBaseGenesisAddressDetails();
    message.address = object.address ?? "";
    message.details = (object.details !== undefined && object.details !== null)
      ? AddressDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseGenesisVerificationDetails(): GenesisVerificationDetails {
  return { id: new Uint8Array(0), details: undefined };
}

export const GenesisVerificationDetails = {
  encode(message: GenesisVerificationDetails, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id.length !== 0) {
      writer.uint32(10).bytes(message.id);
    }
    if (message.details !== undefined) {
      VerificationDetails.encode(message.details, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisVerificationDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisVerificationDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.details = VerificationDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisVerificationDetails {
    return {
      id: isSet(object.id) ? bytesFromBase64(object.id) : new Uint8Array(0),
      details: isSet(object.details) ? VerificationDetails.fromJSON(object.details) : undefined,
    };
  },

  toJSON(message: GenesisVerificationDetails): unknown {
    const obj: any = {};
    if (message.id.length !== 0) {
      obj.id = base64FromBytes(message.id);
    }
    if (message.details !== undefined) {
      obj.details = VerificationDetails.toJSON(message.details);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisVerificationDetails>, I>>(base?: I): GenesisVerificationDetails {
    return GenesisVerificationDetails.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisVerificationDetails>, I>>(object: I): GenesisVerificationDetails {
    const message = createBaseGenesisVerificationDetails();
    message.id = object.id ?? new Uint8Array(0);
    message.details = (object.details !== undefined && object.details !== null)
      ? VerificationDetails.fromPartial(object.details)
      : undefined;
    return message;
  },
};

function createBaseGenesisHolderPublicKeys(): GenesisHolderPublicKeys {
  return { address: "", publicKey: new Uint8Array(0) };
}

export const GenesisHolderPublicKeys = {
  encode(message: GenesisHolderPublicKeys, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.publicKey.length !== 0) {
      writer.uint32(18).bytes(message.publicKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisHolderPublicKeys {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisHolderPublicKeys();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.publicKey = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisHolderPublicKeys {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      publicKey: isSet(object.publicKey) ? bytesFromBase64(object.publicKey) : new Uint8Array(0),
    };
  },

  toJSON(message: GenesisHolderPublicKeys): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.publicKey.length !== 0) {
      obj.publicKey = base64FromBytes(message.publicKey);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisHolderPublicKeys>, I>>(base?: I): GenesisHolderPublicKeys {
    return GenesisHolderPublicKeys.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisHolderPublicKeys>, I>>(object: I): GenesisHolderPublicKeys {
    const message = createBaseGenesisHolderPublicKeys();
    message.address = object.address ?? "";
    message.publicKey = object.publicKey ?? new Uint8Array(0);
    return message;
  },
};

function createBaseGenesisLinkVerificationIdToPublicKey(): GenesisLinkVerificationIdToPublicKey {
  return { id: new Uint8Array(0), publicKey: new Uint8Array(0) };
}

export const GenesisLinkVerificationIdToPublicKey = {
  encode(message: GenesisLinkVerificationIdToPublicKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id.length !== 0) {
      writer.uint32(10).bytes(message.id);
    }
    if (message.publicKey.length !== 0) {
      writer.uint32(18).bytes(message.publicKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisLinkVerificationIdToPublicKey {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisLinkVerificationIdToPublicKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.publicKey = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisLinkVerificationIdToPublicKey {
    return {
      id: isSet(object.id) ? bytesFromBase64(object.id) : new Uint8Array(0),
      publicKey: isSet(object.publicKey) ? bytesFromBase64(object.publicKey) : new Uint8Array(0),
    };
  },

  toJSON(message: GenesisLinkVerificationIdToPublicKey): unknown {
    const obj: any = {};
    if (message.id.length !== 0) {
      obj.id = base64FromBytes(message.id);
    }
    if (message.publicKey.length !== 0) {
      obj.publicKey = base64FromBytes(message.publicKey);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisLinkVerificationIdToPublicKey>, I>>(
    base?: I,
  ): GenesisLinkVerificationIdToPublicKey {
    return GenesisLinkVerificationIdToPublicKey.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisLinkVerificationIdToPublicKey>, I>>(
    object: I,
  ): GenesisLinkVerificationIdToPublicKey {
    const message = createBaseGenesisLinkVerificationIdToPublicKey();
    message.id = object.id ?? new Uint8Array(0);
    message.publicKey = object.publicKey ?? new Uint8Array(0);
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  if ((globalThis as any).Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if ((globalThis as any).Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
