/* eslint-disable */
import _m0 from "protobufjs/minimal.js";
import { DIDDocumentWithMetadata } from "./document.js";
import { Params } from "./params.js";
import { ResourceWithMetadata } from "./resource.js";

export const protobufPackage = "swisstronik.did";

/**
 * DIDDocumentVersionSet contains all versions of DID Documents and their
 * metadata for a given DID. The latest version of the DID Document set is
 * stored in the latest_version field.
 */
export interface DIDDocumentVersionSet {
  /** Latest version of the DID Document set */
  latestVersion: string;
  /** All versions of the DID Document set */
  didDocs: DIDDocumentWithMetadata[];
}

/** GenesisState defines the did module's genesis state. */
export interface GenesisState {
  /** All DID Document version sets (contains all versions of all DID Documents) */
  versionSets: DIDDocumentVersionSet[];
  /** All Resources with metadata */
  resources: ResourceWithMetadata[];
  params: Params | undefined;
}

function createBaseDIDDocumentVersionSet(): DIDDocumentVersionSet {
  return { latestVersion: "", didDocs: [] };
}

export const DIDDocumentVersionSet = {
  encode(message: DIDDocumentVersionSet, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.latestVersion !== "") {
      writer.uint32(10).string(message.latestVersion);
    }
    for (const v of message.didDocs) {
      DIDDocumentWithMetadata.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DIDDocumentVersionSet {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDIDDocumentVersionSet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.latestVersion = reader.string();
          break;
        case 2:
          message.didDocs.push(DIDDocumentWithMetadata.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DIDDocumentVersionSet {
    return {
      latestVersion: isSet(object.latestVersion) ? String(object.latestVersion) : "",
      didDocs: Array.isArray(object?.didDocs)
        ? object.didDocs.map((e: any) => DIDDocumentWithMetadata.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DIDDocumentVersionSet): unknown {
    const obj: any = {};
    message.latestVersion !== undefined && (obj.latestVersion = message.latestVersion);
    if (message.didDocs) {
      obj.didDocs = message.didDocs.map((e) => e ? DIDDocumentWithMetadata.toJSON(e) : undefined);
    } else {
      obj.didDocs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DIDDocumentVersionSet>, I>>(object: I): DIDDocumentVersionSet {
    const message = createBaseDIDDocumentVersionSet();
    message.latestVersion = object.latestVersion ?? "";
    message.didDocs = object.didDocs?.map((e) => DIDDocumentWithMetadata.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGenesisState(): GenesisState {
  return { versionSets: [], resources: [], params: undefined };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.versionSets) {
      DIDDocumentVersionSet.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.resources) {
      ResourceWithMetadata.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.versionSets.push(DIDDocumentVersionSet.decode(reader, reader.uint32()));
          break;
        case 2:
          message.resources.push(ResourceWithMetadata.decode(reader, reader.uint32()));
          break;
        case 3:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      versionSets: Array.isArray(object?.versionSets)
        ? object.versionSets.map((e: any) => DIDDocumentVersionSet.fromJSON(e))
        : [],
      resources: Array.isArray(object?.resources)
        ? object.resources.map((e: any) => ResourceWithMetadata.fromJSON(e))
        : [],
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.versionSets) {
      obj.versionSets = message.versionSets.map((e) => e ? DIDDocumentVersionSet.toJSON(e) : undefined);
    } else {
      obj.versionSets = [];
    }
    if (message.resources) {
      obj.resources = message.resources.map((e) => e ? ResourceWithMetadata.toJSON(e) : undefined);
    } else {
      obj.resources = [];
    }
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.versionSets = object.versionSets?.map((e) => DIDDocumentVersionSet.fromPartial(e)) || [];
    message.resources = object.resources?.map((e) => ResourceWithMetadata.fromPartial(e)) || [];
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
