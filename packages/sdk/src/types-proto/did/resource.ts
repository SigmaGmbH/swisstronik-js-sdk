/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "swisstronik.did";

/** Resource stores the contents of a DID-Linked Resource */
export interface Resource {
  /** bytes is the raw data of the Resource */
  data: Uint8Array;
}

/** ResourceMetadata stores the metadata of a DID-Linked Resource */
export interface ResourceMetadata {
  /**
   * collection_id is the ID of the collection that the Resource belongs to. Defined client-side.
   * This field is the unique identifier of the DID linked to this Resource
   * Format: <unique-identifier>
   *
   * Examples:
   * - c82f2b02-bdab-4dd7-b833-3e143745d612
   * - wGHEXrZvJxR8vw5P3UWH1j
   */
  collectionId: string;
  /**
   * id is the ID of the Resource. Defined client-side.
   * This field is a unique identifier for this specific version of the Resource.
   * Format: <uuid>
   */
  id: string;
  /**
   * name is a human-readable name for the Resource. Defined client-side.
   * Does not change between different versions.
   * Example: PassportSchema, EducationTrustRegistry
   */
  name: string;
  /**
   * version is a human-readable semantic version for the Resource. Defined client-side.
   * Stored as a string. OPTIONAL.
   * Example: 1.0.0, v2.1.0
   */
  version: string;
  /**
   * resource_type is a Resource type that identifies what the Resource is. Defined client-side.
   * This is NOT the same as the resource's media type.
   * Example: AnonCredsSchema, StatusList2021
   */
  resourceType: string;
  /** List of alternative URIs for the SAME Resource. */
  alsoKnownAs: AlternativeUri[];
  /**
   * media_type is IANA media type of the Resource. Defined ledger-side.
   * Example: application/json, image/png
   */
  mediaType: string;
  /**
   * created is the time at which the Resource was created. Defined ledger-side.
   * Format: RFC3339
   * Example: 2021-01-01T00:00:00Z
   */
  created:
    | Date
    | undefined;
  /**
   * checksum is a SHA-256 checksum hash of the Resource. Defined ledger-side.
   * Example: d14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f
   */
  checksum: string;
  /**
   * previous_version_id is the ID of the previous version of the Resource. Defined ledger-side.
   * This is based on the Resource's name and Resource type to determine whether it's the same Resource.
   * Format: <uuid>
   */
  previousVersionId: string;
  /**
   * next_version_id is the ID of the next version of the Resource. Defined ledger-side.
   * This is based on the Resource's name and Resource type to determine whether it's the same Resource.
   * Format: <uuid>
   */
  nextVersionId: string;
}

/**
 * AlternativeUri are alternative URIs that can be used to access the Resource.
 * By default, at least the DID URI equivalent of the Resource is populated.
 */
export interface AlternativeUri {
  /**
   * uri is the URI of the Resource.
   * Examples:
   * - did:swtr:MjYxNzYKMjYxNzYK/resources/4600ea35-8916-4ac4-b412-55b8f49dd94e
   * - https://example.com/example.json
   * - ipfs://bafybeihetj2ng3d74k7t754atv2s5dk76pcqtvxls6dntef3xa6rax25xe
   */
  uri: string;
  /**
   * description is a human-readable description of the URI. Defined client-side.
   * Examples:
   * - did-uri
   * - http-uri
   * - ipfs-uri
   */
  description: string;
}

/** ResourceWithMetadata describes the overall structure of a DID-Linked Resource */
export interface ResourceWithMetadata {
  resource: Resource | undefined;
  metadata: ResourceMetadata | undefined;
}

function createBaseResource(): Resource {
  return { data: new Uint8Array() };
}

export const Resource = {
  encode(message: Resource, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Resource {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Resource {
    return { data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array() };
  },

  toJSON(message: Resource): unknown {
    const obj: any = {};
    message.data !== undefined
      && (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Resource>, I>>(object: I): Resource {
    const message = createBaseResource();
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseResourceMetadata(): ResourceMetadata {
  return {
    collectionId: "",
    id: "",
    name: "",
    version: "",
    resourceType: "",
    alsoKnownAs: [],
    mediaType: "",
    created: undefined,
    checksum: "",
    previousVersionId: "",
    nextVersionId: "",
  };
}

export const ResourceMetadata = {
  encode(message: ResourceMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.collectionId !== "") {
      writer.uint32(10).string(message.collectionId);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.version !== "") {
      writer.uint32(34).string(message.version);
    }
    if (message.resourceType !== "") {
      writer.uint32(42).string(message.resourceType);
    }
    for (const v of message.alsoKnownAs) {
      AlternativeUri.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.mediaType !== "") {
      writer.uint32(58).string(message.mediaType);
    }
    if (message.created !== undefined) {
      Timestamp.encode(toTimestamp(message.created), writer.uint32(66).fork()).ldelim();
    }
    if (message.checksum !== "") {
      writer.uint32(74).string(message.checksum);
    }
    if (message.previousVersionId !== "") {
      writer.uint32(82).string(message.previousVersionId);
    }
    if (message.nextVersionId !== "") {
      writer.uint32(90).string(message.nextVersionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResourceMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResourceMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collectionId = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.version = reader.string();
          break;
        case 5:
          message.resourceType = reader.string();
          break;
        case 6:
          message.alsoKnownAs.push(AlternativeUri.decode(reader, reader.uint32()));
          break;
        case 7:
          message.mediaType = reader.string();
          break;
        case 8:
          message.created = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 9:
          message.checksum = reader.string();
          break;
        case 10:
          message.previousVersionId = reader.string();
          break;
        case 11:
          message.nextVersionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResourceMetadata {
    return {
      collectionId: isSet(object.collectionId) ? String(object.collectionId) : "",
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      version: isSet(object.version) ? String(object.version) : "",
      resourceType: isSet(object.resourceType) ? String(object.resourceType) : "",
      alsoKnownAs: Array.isArray(object?.alsoKnownAs)
        ? object.alsoKnownAs.map((e: any) => AlternativeUri.fromJSON(e))
        : [],
      mediaType: isSet(object.mediaType) ? String(object.mediaType) : "",
      created: isSet(object.created) ? fromJsonTimestamp(object.created) : undefined,
      checksum: isSet(object.checksum) ? String(object.checksum) : "",
      previousVersionId: isSet(object.previousVersionId) ? String(object.previousVersionId) : "",
      nextVersionId: isSet(object.nextVersionId) ? String(object.nextVersionId) : "",
    };
  },

  toJSON(message: ResourceMetadata): unknown {
    const obj: any = {};
    message.collectionId !== undefined && (obj.collectionId = message.collectionId);
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.version !== undefined && (obj.version = message.version);
    message.resourceType !== undefined && (obj.resourceType = message.resourceType);
    if (message.alsoKnownAs) {
      obj.alsoKnownAs = message.alsoKnownAs.map((e) => e ? AlternativeUri.toJSON(e) : undefined);
    } else {
      obj.alsoKnownAs = [];
    }
    message.mediaType !== undefined && (obj.mediaType = message.mediaType);
    message.created !== undefined && (obj.created = message.created.toISOString());
    message.checksum !== undefined && (obj.checksum = message.checksum);
    message.previousVersionId !== undefined && (obj.previousVersionId = message.previousVersionId);
    message.nextVersionId !== undefined && (obj.nextVersionId = message.nextVersionId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResourceMetadata>, I>>(object: I): ResourceMetadata {
    const message = createBaseResourceMetadata();
    message.collectionId = object.collectionId ?? "";
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.version = object.version ?? "";
    message.resourceType = object.resourceType ?? "";
    message.alsoKnownAs = object.alsoKnownAs?.map((e) => AlternativeUri.fromPartial(e)) || [];
    message.mediaType = object.mediaType ?? "";
    message.created = object.created ?? undefined;
    message.checksum = object.checksum ?? "";
    message.previousVersionId = object.previousVersionId ?? "";
    message.nextVersionId = object.nextVersionId ?? "";
    return message;
  },
};

function createBaseAlternativeUri(): AlternativeUri {
  return { uri: "", description: "" };
}

export const AlternativeUri = {
  encode(message: AlternativeUri, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uri !== "") {
      writer.uint32(10).string(message.uri);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AlternativeUri {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlternativeUri();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uri = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AlternativeUri {
    return {
      uri: isSet(object.uri) ? String(object.uri) : "",
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: AlternativeUri): unknown {
    const obj: any = {};
    message.uri !== undefined && (obj.uri = message.uri);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AlternativeUri>, I>>(object: I): AlternativeUri {
    const message = createBaseAlternativeUri();
    message.uri = object.uri ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseResourceWithMetadata(): ResourceWithMetadata {
  return { resource: undefined, metadata: undefined };
}

export const ResourceWithMetadata = {
  encode(message: ResourceWithMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resource !== undefined) {
      Resource.encode(message.resource, writer.uint32(10).fork()).ldelim();
    }
    if (message.metadata !== undefined) {
      ResourceMetadata.encode(message.metadata, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResourceWithMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResourceWithMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resource = Resource.decode(reader, reader.uint32());
          break;
        case 2:
          message.metadata = ResourceMetadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResourceWithMetadata {
    return {
      resource: isSet(object.resource) ? Resource.fromJSON(object.resource) : undefined,
      metadata: isSet(object.metadata) ? ResourceMetadata.fromJSON(object.metadata) : undefined,
    };
  },

  toJSON(message: ResourceWithMetadata): unknown {
    const obj: any = {};
    message.resource !== undefined && (obj.resource = message.resource ? Resource.toJSON(message.resource) : undefined);
    message.metadata !== undefined
      && (obj.metadata = message.metadata ? ResourceMetadata.toJSON(message.metadata) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResourceWithMetadata>, I>>(object: I): ResourceWithMetadata {
    const message = createBaseResourceWithMetadata();
    message.resource = (object.resource !== undefined && object.resource !== null)
      ? Resource.fromPartial(object.resource)
      : undefined;
    message.metadata = (object.metadata !== undefined && object.metadata !== null)
      ? ResourceMetadata.fromPartial(object.metadata)
      : undefined;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
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
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
