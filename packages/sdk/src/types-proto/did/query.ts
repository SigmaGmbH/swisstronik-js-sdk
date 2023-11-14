/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../cosmos/base/query/v1beta1/pagination";
import { DIDDocumentWithMetadata, Metadata } from "./document";
import { ResourceMetadata, ResourceWithMetadata } from "./resource";

export const protobufPackage = "swisstronik.did";

/** QueryDIDDocumentRequest is the request type for the Query/DIDDocument method */
export interface QueryDIDDocumentRequest {
  /**
   * DID unique identifier of the DID Document to fetch.
   * UUID-style DIDs as well as Indy-style DID are supported.
   *
   * Format: did:swtr:<unique-identifier>
   *
   * Examples:
   * - did:swtr:c82f2b02-bdab-4dd7-b833-3e143745d612
   * - did:swtr:wGHEXrZvJxR8vw5P3UWH1j
   */
  id: string;
}

/**
 * QueryDIDDocumentResponse is the response type for the Query/DIDDocument
 * method
 */
export interface QueryDIDDocumentResponse {
  /**
   * Successful resolution of the DID Document returns the following:
   * - did_doc is the latest version of the DID Document
   * - metadata is is the DID Document metadata associated with the latest
   * version of the DID Document
   */
  value: DIDDocumentWithMetadata | undefined;
}

/**
 * QueryDIDDocumentVersionRequest is the request type for the
 * QueryDIDDocumentVersion method
 */
export interface QueryDIDDocumentVersionRequest {
  /**
   * DID unique identifier of the DID Document to fetch.
   * UUID-style DIDs as well as Indy-style DID are supported.
   *
   * Format: did:swtr:<unique-identifier>
   *
   * Examples:
   * - did:swtr:c82f2b02-bdab-4dd7-b833-3e143745d612
   * - did:swtr:wGHEXrZvJxR8vw5P3UWH1j
   */
  id: string;
  /**
   * Unique version identifier of the DID Document to fetch.
   * Returns the specified version of the DID Document.
   *
   * Format: <uuid>
   *
   * Example: 93f2573c-eca9-4098-96cb-a1ec676a29ed
   */
  version: string;
}

/**
 * QueryDIDDocumentVersionResponse is the response type for the
 * QueryDIDDocumentVersion method
 */
export interface QueryDIDDocumentVersionResponse {
  /**
   * Successful resolution of the DID Document returns the following:
   * - did_doc is the requested version of the DID Document
   * - metadata is DID Document metadata associated with the requested version
   * of the DID Document
   */
  value: DIDDocumentWithMetadata | undefined;
}

/**
 * QueryAllDIDDocumentVersionsMetadataRequest is the request type for the
 * QueryAllDIDDocumentVersionsMetadata method
 */
export interface QueryAllDIDDocumentVersionsMetadataRequest {
  /**
   * DID unique identifier of the DID Document to fetch version metadata.
   * UUID-style DIDs as well as Indy-style DID are supported.
   *
   * Format: did:swtr:<unique-identifier>
   *
   * Examples:
   * - did:swtr:c82f2b02-bdab-4dd7-b833-3e143745d612
   * - did:swtr:wGHEXrZvJxR8vw5P3UWH1j
   */
  id: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * QueryAllDIDDocumentVersionsMetadataResponse is the response type for the
 * QueryAllDIDDocumentVersionsMetadata method
 */
export interface QueryAllDIDDocumentVersionsMetadataResponse {
  /** versions is the list of all versions of the requested DID Document */
  versions: Metadata[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryResourceRequest is the request type for the Query/Resource RPC method */
export interface QueryResourceRequest {
  /**
   * collection_id is an identifier of the DID Document the resource belongs to.
   * Format: <unique-identifier>
   *
   * Examples:
   * - c82f2b02-bdab-4dd7-b833-3e143745d612
   * - wGHEXrZvJxR8vw5P3UWH1j
   */
  collectionId: string;
  /**
   * id is a unique id of the resource.
   * Format: <uuid>
   */
  id: string;
}

/** QueryResourceResponse is the response type for the Query/Resource RPC method */
export interface QueryResourceResponse {
  /**
   * Successful resolution of the resource returns the following:
   * - resource is the requested resource
   * - metadata is the resource metadata associated with the requested resource
   */
  resource: ResourceWithMetadata | undefined;
}

/** QueryResourceMetadataRequest is the request type for the QueryResourceMetadata RPC method */
export interface QueryResourceMetadataRequest {
  /**
   * collection_id is an identifier of the DID Document the resource belongs to.
   * Format: <unique-identifier>
   *
   * Examples:
   * - c82f2b02-bdab-4dd7-b833-3e143745d612
   * - wGHEXrZvJxR8vw5P3UWH1j
   */
  collectionId: string;
  /**
   * id is a unique id of the resource.
   * Format: <uuid>
   */
  id: string;
}

/** QueryResourceMetadataResponse is the response type for the QueryResourceMetadata RPC method */
export interface QueryResourceMetadataResponse {
  /** resource is the requested resource metadata */
  resource: ResourceMetadata | undefined;
}

/** QueryCollectionResourcesRequest is the request type for the QueryCollectionResources RPC method */
export interface QueryCollectionResourcesRequest {
  /**
   * collection_id is an identifier of the DID Document the resource belongs to.
   * Format: <unique-identifier>
   *
   * Examples:
   * - c82f2b02-bdab-4dd7-b833-3e143745d612
   * - wGHEXrZvJxR8vw5P3UWH1j
   */
  collectionId: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/** QueryCollectionResourcesResponse is the response type for the QueryCollectionResources RPC method */
export interface QueryCollectionResourcesResponse {
  /** resources is the requested collection of resource metadata */
  resources: ResourceMetadata[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

function createBaseQueryDIDDocumentRequest(): QueryDIDDocumentRequest {
  return { id: "" };
}

export const QueryDIDDocumentRequest = {
  encode(message: QueryDIDDocumentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDIDDocumentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDIDDocumentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDIDDocumentRequest {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: QueryDIDDocumentRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDIDDocumentRequest>, I>>(object: I): QueryDIDDocumentRequest {
    const message = createBaseQueryDIDDocumentRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseQueryDIDDocumentResponse(): QueryDIDDocumentResponse {
  return { value: undefined };
}

export const QueryDIDDocumentResponse = {
  encode(message: QueryDIDDocumentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== undefined) {
      DIDDocumentWithMetadata.encode(message.value, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDIDDocumentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDIDDocumentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = DIDDocumentWithMetadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDIDDocumentResponse {
    return { value: isSet(object.value) ? DIDDocumentWithMetadata.fromJSON(object.value) : undefined };
  },

  toJSON(message: QueryDIDDocumentResponse): unknown {
    const obj: any = {};
    message.value !== undefined
      && (obj.value = message.value ? DIDDocumentWithMetadata.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDIDDocumentResponse>, I>>(object: I): QueryDIDDocumentResponse {
    const message = createBaseQueryDIDDocumentResponse();
    message.value = (object.value !== undefined && object.value !== null)
      ? DIDDocumentWithMetadata.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseQueryDIDDocumentVersionRequest(): QueryDIDDocumentVersionRequest {
  return { id: "", version: "" };
}

export const QueryDIDDocumentVersionRequest = {
  encode(message: QueryDIDDocumentVersionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDIDDocumentVersionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDIDDocumentVersionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDIDDocumentVersionRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      version: isSet(object.version) ? String(object.version) : "",
    };
  },

  toJSON(message: QueryDIDDocumentVersionRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDIDDocumentVersionRequest>, I>>(
    object: I,
  ): QueryDIDDocumentVersionRequest {
    const message = createBaseQueryDIDDocumentVersionRequest();
    message.id = object.id ?? "";
    message.version = object.version ?? "";
    return message;
  },
};

function createBaseQueryDIDDocumentVersionResponse(): QueryDIDDocumentVersionResponse {
  return { value: undefined };
}

export const QueryDIDDocumentVersionResponse = {
  encode(message: QueryDIDDocumentVersionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== undefined) {
      DIDDocumentWithMetadata.encode(message.value, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDIDDocumentVersionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDIDDocumentVersionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = DIDDocumentWithMetadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDIDDocumentVersionResponse {
    return { value: isSet(object.value) ? DIDDocumentWithMetadata.fromJSON(object.value) : undefined };
  },

  toJSON(message: QueryDIDDocumentVersionResponse): unknown {
    const obj: any = {};
    message.value !== undefined
      && (obj.value = message.value ? DIDDocumentWithMetadata.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDIDDocumentVersionResponse>, I>>(
    object: I,
  ): QueryDIDDocumentVersionResponse {
    const message = createBaseQueryDIDDocumentVersionResponse();
    message.value = (object.value !== undefined && object.value !== null)
      ? DIDDocumentWithMetadata.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseQueryAllDIDDocumentVersionsMetadataRequest(): QueryAllDIDDocumentVersionsMetadataRequest {
  return { id: "", pagination: undefined };
}

export const QueryAllDIDDocumentVersionsMetadataRequest = {
  encode(message: QueryAllDIDDocumentVersionsMetadataRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllDIDDocumentVersionsMetadataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDIDDocumentVersionsMetadataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllDIDDocumentVersionsMetadataRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllDIDDocumentVersionsMetadataRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllDIDDocumentVersionsMetadataRequest>, I>>(
    object: I,
  ): QueryAllDIDDocumentVersionsMetadataRequest {
    const message = createBaseQueryAllDIDDocumentVersionsMetadataRequest();
    message.id = object.id ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllDIDDocumentVersionsMetadataResponse(): QueryAllDIDDocumentVersionsMetadataResponse {
  return { versions: [], pagination: undefined };
}

export const QueryAllDIDDocumentVersionsMetadataResponse = {
  encode(message: QueryAllDIDDocumentVersionsMetadataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.versions) {
      Metadata.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllDIDDocumentVersionsMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDIDDocumentVersionsMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.versions.push(Metadata.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllDIDDocumentVersionsMetadataResponse {
    return {
      versions: Array.isArray(object?.versions) ? object.versions.map((e: any) => Metadata.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllDIDDocumentVersionsMetadataResponse): unknown {
    const obj: any = {};
    if (message.versions) {
      obj.versions = message.versions.map((e) => e ? Metadata.toJSON(e) : undefined);
    } else {
      obj.versions = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllDIDDocumentVersionsMetadataResponse>, I>>(
    object: I,
  ): QueryAllDIDDocumentVersionsMetadataResponse {
    const message = createBaseQueryAllDIDDocumentVersionsMetadataResponse();
    message.versions = object.versions?.map((e) => Metadata.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryResourceRequest(): QueryResourceRequest {
  return { collectionId: "", id: "" };
}

export const QueryResourceRequest = {
  encode(message: QueryResourceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.collectionId !== "") {
      writer.uint32(10).string(message.collectionId);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryResourceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryResourceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collectionId = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryResourceRequest {
    return {
      collectionId: isSet(object.collectionId) ? String(object.collectionId) : "",
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: QueryResourceRequest): unknown {
    const obj: any = {};
    message.collectionId !== undefined && (obj.collectionId = message.collectionId);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryResourceRequest>, I>>(object: I): QueryResourceRequest {
    const message = createBaseQueryResourceRequest();
    message.collectionId = object.collectionId ?? "";
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseQueryResourceResponse(): QueryResourceResponse {
  return { resource: undefined };
}

export const QueryResourceResponse = {
  encode(message: QueryResourceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resource !== undefined) {
      ResourceWithMetadata.encode(message.resource, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryResourceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryResourceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resource = ResourceWithMetadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryResourceResponse {
    return { resource: isSet(object.resource) ? ResourceWithMetadata.fromJSON(object.resource) : undefined };
  },

  toJSON(message: QueryResourceResponse): unknown {
    const obj: any = {};
    message.resource !== undefined
      && (obj.resource = message.resource ? ResourceWithMetadata.toJSON(message.resource) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryResourceResponse>, I>>(object: I): QueryResourceResponse {
    const message = createBaseQueryResourceResponse();
    message.resource = (object.resource !== undefined && object.resource !== null)
      ? ResourceWithMetadata.fromPartial(object.resource)
      : undefined;
    return message;
  },
};

function createBaseQueryResourceMetadataRequest(): QueryResourceMetadataRequest {
  return { collectionId: "", id: "" };
}

export const QueryResourceMetadataRequest = {
  encode(message: QueryResourceMetadataRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.collectionId !== "") {
      writer.uint32(10).string(message.collectionId);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryResourceMetadataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryResourceMetadataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collectionId = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryResourceMetadataRequest {
    return {
      collectionId: isSet(object.collectionId) ? String(object.collectionId) : "",
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: QueryResourceMetadataRequest): unknown {
    const obj: any = {};
    message.collectionId !== undefined && (obj.collectionId = message.collectionId);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryResourceMetadataRequest>, I>>(object: I): QueryResourceMetadataRequest {
    const message = createBaseQueryResourceMetadataRequest();
    message.collectionId = object.collectionId ?? "";
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseQueryResourceMetadataResponse(): QueryResourceMetadataResponse {
  return { resource: undefined };
}

export const QueryResourceMetadataResponse = {
  encode(message: QueryResourceMetadataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resource !== undefined) {
      ResourceMetadata.encode(message.resource, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryResourceMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryResourceMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resource = ResourceMetadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryResourceMetadataResponse {
    return { resource: isSet(object.resource) ? ResourceMetadata.fromJSON(object.resource) : undefined };
  },

  toJSON(message: QueryResourceMetadataResponse): unknown {
    const obj: any = {};
    message.resource !== undefined
      && (obj.resource = message.resource ? ResourceMetadata.toJSON(message.resource) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryResourceMetadataResponse>, I>>(
    object: I,
  ): QueryResourceMetadataResponse {
    const message = createBaseQueryResourceMetadataResponse();
    message.resource = (object.resource !== undefined && object.resource !== null)
      ? ResourceMetadata.fromPartial(object.resource)
      : undefined;
    return message;
  },
};

function createBaseQueryCollectionResourcesRequest(): QueryCollectionResourcesRequest {
  return { collectionId: "", pagination: undefined };
}

export const QueryCollectionResourcesRequest = {
  encode(message: QueryCollectionResourcesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.collectionId !== "") {
      writer.uint32(10).string(message.collectionId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCollectionResourcesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCollectionResourcesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collectionId = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCollectionResourcesRequest {
    return {
      collectionId: isSet(object.collectionId) ? String(object.collectionId) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryCollectionResourcesRequest): unknown {
    const obj: any = {};
    message.collectionId !== undefined && (obj.collectionId = message.collectionId);
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCollectionResourcesRequest>, I>>(
    object: I,
  ): QueryCollectionResourcesRequest {
    const message = createBaseQueryCollectionResourcesRequest();
    message.collectionId = object.collectionId ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryCollectionResourcesResponse(): QueryCollectionResourcesResponse {
  return { resources: [], pagination: undefined };
}

export const QueryCollectionResourcesResponse = {
  encode(message: QueryCollectionResourcesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.resources) {
      ResourceMetadata.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCollectionResourcesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCollectionResourcesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resources.push(ResourceMetadata.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryCollectionResourcesResponse {
    return {
      resources: Array.isArray(object?.resources) ? object.resources.map((e: any) => ResourceMetadata.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryCollectionResourcesResponse): unknown {
    const obj: any = {};
    if (message.resources) {
      obj.resources = message.resources.map((e) => e ? ResourceMetadata.toJSON(e) : undefined);
    } else {
      obj.resources = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCollectionResourcesResponse>, I>>(
    object: I,
  ): QueryCollectionResourcesResponse {
    const message = createBaseQueryCollectionResourcesResponse();
    message.resources = object.resources?.map((e) => ResourceMetadata.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

export interface Query {
  /** Fetch latest version of a DID Document for a given DID */
  DIDDocument(request: QueryDIDDocumentRequest): Promise<QueryDIDDocumentResponse>;
  /** Fetch specific version of a DID Document for a given DID */
  DIDDocumentVersion(request: QueryDIDDocumentVersionRequest): Promise<QueryDIDDocumentVersionResponse>;
  /** Fetch list of all versions of DID Documents for a given DID */
  AllDIDDocumentVersionsMetadata(
    request: QueryAllDIDDocumentVersionsMetadataRequest,
  ): Promise<QueryAllDIDDocumentVersionsMetadataResponse>;
  /** Fetch data/payload for a specific resource (without metadata) */
  Resource(request: QueryResourceRequest): Promise<QueryResourceResponse>;
  /** Fetch only metadata for a specific resource */
  ResourceMetadata(request: QueryResourceMetadataRequest): Promise<QueryResourceMetadataResponse>;
  /** Fetch metadata for all resources in a collection */
  CollectionResources(request: QueryCollectionResourcesRequest): Promise<QueryCollectionResourcesResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.DIDDocument = this.DIDDocument.bind(this);
    this.DIDDocumentVersion = this.DIDDocumentVersion.bind(this);
    this.AllDIDDocumentVersionsMetadata = this.AllDIDDocumentVersionsMetadata.bind(this);
    this.Resource = this.Resource.bind(this);
    this.ResourceMetadata = this.ResourceMetadata.bind(this);
    this.CollectionResources = this.CollectionResources.bind(this);
  }
  DIDDocument(request: QueryDIDDocumentRequest): Promise<QueryDIDDocumentResponse> {
    const data = QueryDIDDocumentRequest.encode(request).finish();
    const promise = this.rpc.request("swisstronik.did.Query", "DIDDocument", data);
    return promise.then((data) => QueryDIDDocumentResponse.decode(new _m0.Reader(data)));
  }

  DIDDocumentVersion(request: QueryDIDDocumentVersionRequest): Promise<QueryDIDDocumentVersionResponse> {
    const data = QueryDIDDocumentVersionRequest.encode(request).finish();
    const promise = this.rpc.request("swisstronik.did.Query", "DIDDocumentVersion", data);
    return promise.then((data) => QueryDIDDocumentVersionResponse.decode(new _m0.Reader(data)));
  }

  AllDIDDocumentVersionsMetadata(
    request: QueryAllDIDDocumentVersionsMetadataRequest,
  ): Promise<QueryAllDIDDocumentVersionsMetadataResponse> {
    const data = QueryAllDIDDocumentVersionsMetadataRequest.encode(request).finish();
    const promise = this.rpc.request("swisstronik.did.Query", "AllDIDDocumentVersionsMetadata", data);
    return promise.then((data) => QueryAllDIDDocumentVersionsMetadataResponse.decode(new _m0.Reader(data)));
  }

  Resource(request: QueryResourceRequest): Promise<QueryResourceResponse> {
    const data = QueryResourceRequest.encode(request).finish();
    const promise = this.rpc.request("swisstronik.did.Query", "Resource", data);
    return promise.then((data) => QueryResourceResponse.decode(new _m0.Reader(data)));
  }

  ResourceMetadata(request: QueryResourceMetadataRequest): Promise<QueryResourceMetadataResponse> {
    const data = QueryResourceMetadataRequest.encode(request).finish();
    const promise = this.rpc.request("swisstronik.did.Query", "ResourceMetadata", data);
    return promise.then((data) => QueryResourceMetadataResponse.decode(new _m0.Reader(data)));
  }

  CollectionResources(request: QueryCollectionResourcesRequest): Promise<QueryCollectionResourcesResponse> {
    const data = QueryCollectionResourcesRequest.encode(request).finish();
    const promise = this.rpc.request("swisstronik.did.Query", "CollectionResources", data);
    return promise.then((data) => QueryCollectionResourcesResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
