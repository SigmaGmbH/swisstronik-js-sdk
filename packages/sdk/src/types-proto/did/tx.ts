/* eslint-disable */
import _m0 from "protobufjs/minimal.js";
import { DIDDocumentWithMetadata, Service, VerificationMethod } from "./document.js";
import { AlternativeUri, ResourceMetadata } from "./resource.js";

export const protobufPackage = "swisstronik.did";

export interface MsgCreateDIDDocument {
  /** Payload containing the DID Document to be created */
  payload:
    | MsgCreateDIDDocumentPayload
    | undefined;
  /** Signatures of the DID Document's controller(s) */
  signatures: SignInfo[];
}

export interface MsgUpdateDIDDocument {
  /**
   * Payload containing the DID Document to be updated. This should be updated
   * the DID Document.
   */
  payload:
    | MsgUpdateDIDDocumentPayload
    | undefined;
  /** Signatures of the DID Document's controller(s) */
  signatures: SignInfo[];
}

export interface MsgDeactivateDIDDocument {
  /** Payload containing the DID Document to be deactivated */
  payload:
    | MsgDeactivateDIDDocumentPayload
    | undefined;
  /** Signatures of the DID Document's controller(s) */
  signatures: SignInfo[];
}

/**
 * MsgCreateResource defines the MsgCreateResource request type.
 * It describes the parameters of a request for creating a resource.
 */
export interface MsgCreateResource {
  /** Payload containing the resource to be created. */
  payload:
    | MsgCreateResourcePayload
    | undefined;
  /** Signatures of the corresponding DID Document's controller(s). */
  signatures: SignInfo[];
}

/** SignInfo defines the structure of a DID Document controller's signature */
export interface SignInfo {
  /** Verification method ID of the DID Controller */
  verificationMethodId: string;
  /** Signature of the DID Document controller */
  signature: Uint8Array;
}

/**
 * MsgCreateDIDDocumentPayload defines the structure of the payload for creating
 * a new DID document
 */
export interface MsgCreateDIDDocumentPayload {
  /**
   * context is a list of URIs used to identify the context of the DID document.
   * Default: https://www.w3.org/ns/did/v1
   */
  context: string[];
  /**
   * id is the DID of the DID document.
   * Format: did:swtr:<unique-identifier>
   */
  id: string;
  /** controller is a list of DIDs that are allowed to control the DID document. */
  controller: string[];
  /**
   * verificationMethod is a list of verification methods that can be used to
   * verify a digital signature or cryptographic proof.
   * Documentation: https://www.w3.org/TR/did-core/#verification-methods
   *
   * Required fields:
   * - id: A unique identifier for the verification method
   * - type: A supported verification method type (supported:
   * Ed25519VerificationKey2018, Ed25519VerificationKey2020, JsonWebKey2020)
   * - controller: DID of the controller of the verification method
   * - verification_material: Public key of the verification method (supported:
   * publicJwk, publicKeyBase58, publicKeyMultibase)
   */
  verificationMethod: VerificationMethod[];
  /**
   * authentication is a list of verification methods that can be used to
   * authenticate as the DID subject.
   */
  authentication: string[];
  /**
   * assertionMethod is a list of verification methods that can be used to
   * assert statements as the DID subject.
   */
  assertionMethod: string[];
  /**
   * capabilityInvocation is a list of verification methods that can be used to
   * invoke capabilities as the DID subject.
   */
  capabilityInvocation: string[];
  /**
   * capabilityDelegation is a list of verification methods that can be used to
   * delegate capabilities as the DID subject.
   */
  capabilityDelegation: string[];
  /**
   * keyAgreement is a list of verification methods that can be used to perform
   * key agreement as the DID subject.
   */
  keyAgreement: string[];
  /**
   * service is a list of services that can be used to interact with the DID
   * subject. Documentation: https://www.w3.org/TR/did-core/#services
   *
   * Required fields:
   * - id: A unique identifier for the service
   * - type: A service type defined in DID Specification Registries
   * - service_endpoint: Service endpoint(s), provided as a URI or set of URIs
   */
  service: Service[];
  /**
   * alsoKnownAs is a list of DIDs that are known to refer to the same DID
   * subject.
   */
  alsoKnownAs: string[];
  /**
   * Version ID of the DID Document to be created
   *
   * Format: <uuid>
   */
  versionId: string;
}

/** MsgCreateDIDDocumentResponse defines response type for Msg/CreateDIDDocument. */
export interface MsgCreateDIDDocumentResponse {
  /** Return the created DID Document with metadata */
  value: DIDDocumentWithMetadata | undefined;
}

/**
 * MsgUpdateDIDDocumentPayload defines the structure of the payload for updating
 * an existing DID document
 */
export interface MsgUpdateDIDDocumentPayload {
  /**
   * context is a list of URIs used to identify the context of the DID document.
   * Default: https://www.w3.org/ns/did/v1
   */
  context: string[];
  /**
   * id is the DID of the DID document.
   * Format: did:swtr:<unique-identifier>
   */
  id: string;
  /** controller is a list of DIDs that are allowed to control the DID document. */
  controller: string[];
  /**
   * verificationMethod is a list of verification methods that can be used to
   * verify a digital signature or cryptographic proof.
   * Documentation: https://www.w3.org/TR/did-core/#verification-methods
   *
   * Required fields:
   * - id: A unique identifier for the verification method
   * - type: A supported verification method type (supported:
   * Ed25519VerificationKey2018, Ed25519VerificationKey2020, JsonWebKey2020)
   * - controller: DID of the controller of the verification method
   * - verification_material: Public key of the verification method (supported:
   * publicJwk, publicKeyBase58, publicKeyMultibase)
   */
  verificationMethod: VerificationMethod[];
  /**
   * authentication is a list of verification methods that can be used to
   * authenticate as the DID subject.
   */
  authentication: string[];
  /**
   * assertionMethod is a list of verification methods that can be used to
   * assert statements as the DID subject.
   */
  assertionMethod: string[];
  /**
   * capabilityInvocation is a list of verification methods that can be used to
   * invoke capabilities as the DID subject.
   */
  capabilityInvocation: string[];
  /**
   * capabilityDelegation is a list of verification methods that can be used to
   * delegate capabilities as the DID subject.
   */
  capabilityDelegation: string[];
  /**
   * keyAgreement is a list of verification methods that can be used to perform
   * key agreement as the DID subject.
   */
  keyAgreement: string[];
  /**
   * service is a list of services that can be used to interact with the DID
   * subject. Documentation: https://www.w3.org/TR/did-core/#services
   *
   * Required fields:
   * - id: A unique identifier for the service
   * - type: A service type defined in DID Specification Registries
   * - service_endpoint: Service endpoint(s), provided as a URI or set of URIs
   */
  service: Service[];
  /**
   * alsoKnownAs is a list of DIDs that are known to refer to the same DID
   * subject.
   */
  alsoKnownAs: string[];
  /**
   * Updated version ID of the DID Document.
   * Links to next/previous versions of the DID Document will be automatically
   * updated.
   *
   * Format: <uuid>
   */
  versionId: string;
}

export interface MsgUpdateDIDDocumentResponse {
  /** Return the updated DID Document with metadata */
  value: DIDDocumentWithMetadata | undefined;
}

/**
 * MsgDeactivateDIDDocumentPayload defines the structure of the payload for
 * deactivating an existing DID document
 */
export interface MsgDeactivateDIDDocumentPayload {
  /** Unique identifier of the DID Document to be deactivated */
  id: string;
  /**
   * Version ID of the DID Document to be deactivated
   * This is primarily used as a sanity check to ensure that the correct DID
   * Document is being deactivated.
   */
  versionId: string;
}

/**
 * MsgDeactivateDIDDocumentResponse defines response type for
 * MsgDeactivateDIDDocument.
 */
export interface MsgDeactivateDIDDocumentResponse {
  /** Return the deactivated DID Document with metadata */
  value: DIDDocumentWithMetadata | undefined;
}

/** MsgCreateResourcePayload defines the structure of the payload for creating a resource. */
export interface MsgCreateResourcePayload {
  /** data is a byte-representation of the actual Data the user wants to store. */
  data: Uint8Array;
  /**
   * collection_id is an identifier of the DidDocument the resource belongs to.
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
  /**
   * name is a human-readable name of the resource.
   * Format: <string>
   *
   * Does not change between different versions.
   * Example: PassportSchema, EducationTrustRegistry
   */
  name: string;
  /**
   * version is a version of the resource.
   * Format: <string>
   * Stored as a string. OPTIONAL.
   *
   * Example: 1.0.0, v2.1.0
   */
  version: string;
  /**
   * resource_type is a type of the resource.
   * Format: <string>
   *
   * This is NOT the same as the resource's media type.
   * Example: AnonCredsSchema, StatusList2021
   */
  resourceType: string;
  /** also_known_as is a list of URIs that can be used to get the resource. */
  alsoKnownAs: AlternativeUri[];
}

export interface MsgCreateResourceResponse {
  /** Return the created resource metadata. */
  resource: ResourceMetadata | undefined;
}

function createBaseMsgCreateDIDDocument(): MsgCreateDIDDocument {
  return { payload: undefined, signatures: [] };
}

export const MsgCreateDIDDocument = {
  encode(message: MsgCreateDIDDocument, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.payload !== undefined) {
      MsgCreateDIDDocumentPayload.encode(message.payload, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.signatures) {
      SignInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateDIDDocument {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDIDDocument();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.payload = MsgCreateDIDDocumentPayload.decode(reader, reader.uint32());
          break;
        case 2:
          message.signatures.push(SignInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateDIDDocument {
    return {
      payload: isSet(object.payload) ? MsgCreateDIDDocumentPayload.fromJSON(object.payload) : undefined,
      signatures: Array.isArray(object?.signatures) ? object.signatures.map((e: any) => SignInfo.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgCreateDIDDocument): unknown {
    const obj: any = {};
    message.payload !== undefined
      && (obj.payload = message.payload ? MsgCreateDIDDocumentPayload.toJSON(message.payload) : undefined);
    if (message.signatures) {
      obj.signatures = message.signatures.map((e) => e ? SignInfo.toJSON(e) : undefined);
    } else {
      obj.signatures = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateDIDDocument>, I>>(object: I): MsgCreateDIDDocument {
    const message = createBaseMsgCreateDIDDocument();
    message.payload = (object.payload !== undefined && object.payload !== null)
      ? MsgCreateDIDDocumentPayload.fromPartial(object.payload)
      : undefined;
    message.signatures = object.signatures?.map((e) => SignInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgUpdateDIDDocument(): MsgUpdateDIDDocument {
  return { payload: undefined, signatures: [] };
}

export const MsgUpdateDIDDocument = {
  encode(message: MsgUpdateDIDDocument, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.payload !== undefined) {
      MsgUpdateDIDDocumentPayload.encode(message.payload, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.signatures) {
      SignInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDIDDocument {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDIDDocument();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.payload = MsgUpdateDIDDocumentPayload.decode(reader, reader.uint32());
          break;
        case 2:
          message.signatures.push(SignInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateDIDDocument {
    return {
      payload: isSet(object.payload) ? MsgUpdateDIDDocumentPayload.fromJSON(object.payload) : undefined,
      signatures: Array.isArray(object?.signatures) ? object.signatures.map((e: any) => SignInfo.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgUpdateDIDDocument): unknown {
    const obj: any = {};
    message.payload !== undefined
      && (obj.payload = message.payload ? MsgUpdateDIDDocumentPayload.toJSON(message.payload) : undefined);
    if (message.signatures) {
      obj.signatures = message.signatures.map((e) => e ? SignInfo.toJSON(e) : undefined);
    } else {
      obj.signatures = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateDIDDocument>, I>>(object: I): MsgUpdateDIDDocument {
    const message = createBaseMsgUpdateDIDDocument();
    message.payload = (object.payload !== undefined && object.payload !== null)
      ? MsgUpdateDIDDocumentPayload.fromPartial(object.payload)
      : undefined;
    message.signatures = object.signatures?.map((e) => SignInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgDeactivateDIDDocument(): MsgDeactivateDIDDocument {
  return { payload: undefined, signatures: [] };
}

export const MsgDeactivateDIDDocument = {
  encode(message: MsgDeactivateDIDDocument, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.payload !== undefined) {
      MsgDeactivateDIDDocumentPayload.encode(message.payload, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.signatures) {
      SignInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeactivateDIDDocument {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeactivateDIDDocument();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.payload = MsgDeactivateDIDDocumentPayload.decode(reader, reader.uint32());
          break;
        case 2:
          message.signatures.push(SignInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeactivateDIDDocument {
    return {
      payload: isSet(object.payload) ? MsgDeactivateDIDDocumentPayload.fromJSON(object.payload) : undefined,
      signatures: Array.isArray(object?.signatures) ? object.signatures.map((e: any) => SignInfo.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgDeactivateDIDDocument): unknown {
    const obj: any = {};
    message.payload !== undefined
      && (obj.payload = message.payload ? MsgDeactivateDIDDocumentPayload.toJSON(message.payload) : undefined);
    if (message.signatures) {
      obj.signatures = message.signatures.map((e) => e ? SignInfo.toJSON(e) : undefined);
    } else {
      obj.signatures = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeactivateDIDDocument>, I>>(object: I): MsgDeactivateDIDDocument {
    const message = createBaseMsgDeactivateDIDDocument();
    message.payload = (object.payload !== undefined && object.payload !== null)
      ? MsgDeactivateDIDDocumentPayload.fromPartial(object.payload)
      : undefined;
    message.signatures = object.signatures?.map((e) => SignInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgCreateResource(): MsgCreateResource {
  return { payload: undefined, signatures: [] };
}

export const MsgCreateResource = {
  encode(message: MsgCreateResource, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.payload !== undefined) {
      MsgCreateResourcePayload.encode(message.payload, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.signatures) {
      SignInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateResource {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateResource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.payload = MsgCreateResourcePayload.decode(reader, reader.uint32());
          break;
        case 2:
          message.signatures.push(SignInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateResource {
    return {
      payload: isSet(object.payload) ? MsgCreateResourcePayload.fromJSON(object.payload) : undefined,
      signatures: Array.isArray(object?.signatures) ? object.signatures.map((e: any) => SignInfo.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgCreateResource): unknown {
    const obj: any = {};
    message.payload !== undefined
      && (obj.payload = message.payload ? MsgCreateResourcePayload.toJSON(message.payload) : undefined);
    if (message.signatures) {
      obj.signatures = message.signatures.map((e) => e ? SignInfo.toJSON(e) : undefined);
    } else {
      obj.signatures = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateResource>, I>>(object: I): MsgCreateResource {
    const message = createBaseMsgCreateResource();
    message.payload = (object.payload !== undefined && object.payload !== null)
      ? MsgCreateResourcePayload.fromPartial(object.payload)
      : undefined;
    message.signatures = object.signatures?.map((e) => SignInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSignInfo(): SignInfo {
  return { verificationMethodId: "", signature: new Uint8Array() };
}

export const SignInfo = {
  encode(message: SignInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.verificationMethodId !== "") {
      writer.uint32(10).string(message.verificationMethodId);
    }
    if (message.signature.length !== 0) {
      writer.uint32(18).bytes(message.signature);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.verificationMethodId = reader.string();
          break;
        case 2:
          message.signature = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SignInfo {
    return {
      verificationMethodId: isSet(object.verificationMethodId) ? String(object.verificationMethodId) : "",
      signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(),
    };
  },

  toJSON(message: SignInfo): unknown {
    const obj: any = {};
    message.verificationMethodId !== undefined && (obj.verificationMethodId = message.verificationMethodId);
    message.signature !== undefined
      && (obj.signature = base64FromBytes(message.signature !== undefined ? message.signature : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SignInfo>, I>>(object: I): SignInfo {
    const message = createBaseSignInfo();
    message.verificationMethodId = object.verificationMethodId ?? "";
    message.signature = object.signature ?? new Uint8Array();
    return message;
  },
};

function createBaseMsgCreateDIDDocumentPayload(): MsgCreateDIDDocumentPayload {
  return {
    context: [],
    id: "",
    controller: [],
    verificationMethod: [],
    authentication: [],
    assertionMethod: [],
    capabilityInvocation: [],
    capabilityDelegation: [],
    keyAgreement: [],
    service: [],
    alsoKnownAs: [],
    versionId: "",
  };
}

export const MsgCreateDIDDocumentPayload = {
  encode(message: MsgCreateDIDDocumentPayload, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.context) {
      writer.uint32(10).string(v!);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    for (const v of message.controller) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.verificationMethod) {
      VerificationMethod.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.authentication) {
      writer.uint32(42).string(v!);
    }
    for (const v of message.assertionMethod) {
      writer.uint32(50).string(v!);
    }
    for (const v of message.capabilityInvocation) {
      writer.uint32(58).string(v!);
    }
    for (const v of message.capabilityDelegation) {
      writer.uint32(66).string(v!);
    }
    for (const v of message.keyAgreement) {
      writer.uint32(74).string(v!);
    }
    for (const v of message.service) {
      Service.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.alsoKnownAs) {
      writer.uint32(90).string(v!);
    }
    if (message.versionId !== "") {
      writer.uint32(98).string(message.versionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateDIDDocumentPayload {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDIDDocumentPayload();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.context.push(reader.string());
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.controller.push(reader.string());
          break;
        case 4:
          message.verificationMethod.push(VerificationMethod.decode(reader, reader.uint32()));
          break;
        case 5:
          message.authentication.push(reader.string());
          break;
        case 6:
          message.assertionMethod.push(reader.string());
          break;
        case 7:
          message.capabilityInvocation.push(reader.string());
          break;
        case 8:
          message.capabilityDelegation.push(reader.string());
          break;
        case 9:
          message.keyAgreement.push(reader.string());
          break;
        case 10:
          message.service.push(Service.decode(reader, reader.uint32()));
          break;
        case 11:
          message.alsoKnownAs.push(reader.string());
          break;
        case 12:
          message.versionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateDIDDocumentPayload {
    return {
      context: Array.isArray(object?.context) ? object.context.map((e: any) => String(e)) : [],
      id: isSet(object.id) ? String(object.id) : "",
      controller: Array.isArray(object?.controller) ? object.controller.map((e: any) => String(e)) : [],
      verificationMethod: Array.isArray(object?.verificationMethod)
        ? object.verificationMethod.map((e: any) => VerificationMethod.fromJSON(e))
        : [],
      authentication: Array.isArray(object?.authentication) ? object.authentication.map((e: any) => String(e)) : [],
      assertionMethod: Array.isArray(object?.assertionMethod) ? object.assertionMethod.map((e: any) => String(e)) : [],
      capabilityInvocation: Array.isArray(object?.capabilityInvocation)
        ? object.capabilityInvocation.map((e: any) => String(e))
        : [],
      capabilityDelegation: Array.isArray(object?.capabilityDelegation)
        ? object.capabilityDelegation.map((e: any) => String(e))
        : [],
      keyAgreement: Array.isArray(object?.keyAgreement) ? object.keyAgreement.map((e: any) => String(e)) : [],
      service: Array.isArray(object?.service) ? object.service.map((e: any) => Service.fromJSON(e)) : [],
      alsoKnownAs: Array.isArray(object?.alsoKnownAs) ? object.alsoKnownAs.map((e: any) => String(e)) : [],
      versionId: isSet(object.versionId) ? String(object.versionId) : "",
    };
  },

  toJSON(message: MsgCreateDIDDocumentPayload): unknown {
    const obj: any = {};
    if (message.context) {
      obj.context = message.context.map((e) => e);
    } else {
      obj.context = [];
    }
    message.id !== undefined && (obj.id = message.id);
    if (message.controller) {
      obj.controller = message.controller.map((e) => e);
    } else {
      obj.controller = [];
    }
    if (message.verificationMethod) {
      obj.verificationMethod = message.verificationMethod.map((e) => e ? VerificationMethod.toJSON(e) : undefined);
    } else {
      obj.verificationMethod = [];
    }
    if (message.authentication) {
      obj.authentication = message.authentication.map((e) => e);
    } else {
      obj.authentication = [];
    }
    if (message.assertionMethod) {
      obj.assertionMethod = message.assertionMethod.map((e) => e);
    } else {
      obj.assertionMethod = [];
    }
    if (message.capabilityInvocation) {
      obj.capabilityInvocation = message.capabilityInvocation.map((e) => e);
    } else {
      obj.capabilityInvocation = [];
    }
    if (message.capabilityDelegation) {
      obj.capabilityDelegation = message.capabilityDelegation.map((e) => e);
    } else {
      obj.capabilityDelegation = [];
    }
    if (message.keyAgreement) {
      obj.keyAgreement = message.keyAgreement.map((e) => e);
    } else {
      obj.keyAgreement = [];
    }
    if (message.service) {
      obj.service = message.service.map((e) => e ? Service.toJSON(e) : undefined);
    } else {
      obj.service = [];
    }
    if (message.alsoKnownAs) {
      obj.alsoKnownAs = message.alsoKnownAs.map((e) => e);
    } else {
      obj.alsoKnownAs = [];
    }
    message.versionId !== undefined && (obj.versionId = message.versionId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateDIDDocumentPayload>, I>>(object: I): MsgCreateDIDDocumentPayload {
    const message = createBaseMsgCreateDIDDocumentPayload();
    message.context = object.context?.map((e) => e) || [];
    message.id = object.id ?? "";
    message.controller = object.controller?.map((e) => e) || [];
    message.verificationMethod = object.verificationMethod?.map((e) => VerificationMethod.fromPartial(e)) || [];
    message.authentication = object.authentication?.map((e) => e) || [];
    message.assertionMethod = object.assertionMethod?.map((e) => e) || [];
    message.capabilityInvocation = object.capabilityInvocation?.map((e) => e) || [];
    message.capabilityDelegation = object.capabilityDelegation?.map((e) => e) || [];
    message.keyAgreement = object.keyAgreement?.map((e) => e) || [];
    message.service = object.service?.map((e) => Service.fromPartial(e)) || [];
    message.alsoKnownAs = object.alsoKnownAs?.map((e) => e) || [];
    message.versionId = object.versionId ?? "";
    return message;
  },
};

function createBaseMsgCreateDIDDocumentResponse(): MsgCreateDIDDocumentResponse {
  return { value: undefined };
}

export const MsgCreateDIDDocumentResponse = {
  encode(message: MsgCreateDIDDocumentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== undefined) {
      DIDDocumentWithMetadata.encode(message.value, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateDIDDocumentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDIDDocumentResponse();
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

  fromJSON(object: any): MsgCreateDIDDocumentResponse {
    return { value: isSet(object.value) ? DIDDocumentWithMetadata.fromJSON(object.value) : undefined };
  },

  toJSON(message: MsgCreateDIDDocumentResponse): unknown {
    const obj: any = {};
    message.value !== undefined
      && (obj.value = message.value ? DIDDocumentWithMetadata.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateDIDDocumentResponse>, I>>(object: I): MsgCreateDIDDocumentResponse {
    const message = createBaseMsgCreateDIDDocumentResponse();
    message.value = (object.value !== undefined && object.value !== null)
      ? DIDDocumentWithMetadata.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseMsgUpdateDIDDocumentPayload(): MsgUpdateDIDDocumentPayload {
  return {
    context: [],
    id: "",
    controller: [],
    verificationMethod: [],
    authentication: [],
    assertionMethod: [],
    capabilityInvocation: [],
    capabilityDelegation: [],
    keyAgreement: [],
    service: [],
    alsoKnownAs: [],
    versionId: "",
  };
}

export const MsgUpdateDIDDocumentPayload = {
  encode(message: MsgUpdateDIDDocumentPayload, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.context) {
      writer.uint32(10).string(v!);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    for (const v of message.controller) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.verificationMethod) {
      VerificationMethod.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.authentication) {
      writer.uint32(42).string(v!);
    }
    for (const v of message.assertionMethod) {
      writer.uint32(50).string(v!);
    }
    for (const v of message.capabilityInvocation) {
      writer.uint32(58).string(v!);
    }
    for (const v of message.capabilityDelegation) {
      writer.uint32(66).string(v!);
    }
    for (const v of message.keyAgreement) {
      writer.uint32(74).string(v!);
    }
    for (const v of message.service) {
      Service.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.alsoKnownAs) {
      writer.uint32(90).string(v!);
    }
    if (message.versionId !== "") {
      writer.uint32(98).string(message.versionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDIDDocumentPayload {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDIDDocumentPayload();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.context.push(reader.string());
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.controller.push(reader.string());
          break;
        case 4:
          message.verificationMethod.push(VerificationMethod.decode(reader, reader.uint32()));
          break;
        case 5:
          message.authentication.push(reader.string());
          break;
        case 6:
          message.assertionMethod.push(reader.string());
          break;
        case 7:
          message.capabilityInvocation.push(reader.string());
          break;
        case 8:
          message.capabilityDelegation.push(reader.string());
          break;
        case 9:
          message.keyAgreement.push(reader.string());
          break;
        case 10:
          message.service.push(Service.decode(reader, reader.uint32()));
          break;
        case 11:
          message.alsoKnownAs.push(reader.string());
          break;
        case 12:
          message.versionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateDIDDocumentPayload {
    return {
      context: Array.isArray(object?.context) ? object.context.map((e: any) => String(e)) : [],
      id: isSet(object.id) ? String(object.id) : "",
      controller: Array.isArray(object?.controller) ? object.controller.map((e: any) => String(e)) : [],
      verificationMethod: Array.isArray(object?.verificationMethod)
        ? object.verificationMethod.map((e: any) => VerificationMethod.fromJSON(e))
        : [],
      authentication: Array.isArray(object?.authentication) ? object.authentication.map((e: any) => String(e)) : [],
      assertionMethod: Array.isArray(object?.assertionMethod) ? object.assertionMethod.map((e: any) => String(e)) : [],
      capabilityInvocation: Array.isArray(object?.capabilityInvocation)
        ? object.capabilityInvocation.map((e: any) => String(e))
        : [],
      capabilityDelegation: Array.isArray(object?.capabilityDelegation)
        ? object.capabilityDelegation.map((e: any) => String(e))
        : [],
      keyAgreement: Array.isArray(object?.keyAgreement) ? object.keyAgreement.map((e: any) => String(e)) : [],
      service: Array.isArray(object?.service) ? object.service.map((e: any) => Service.fromJSON(e)) : [],
      alsoKnownAs: Array.isArray(object?.alsoKnownAs) ? object.alsoKnownAs.map((e: any) => String(e)) : [],
      versionId: isSet(object.versionId) ? String(object.versionId) : "",
    };
  },

  toJSON(message: MsgUpdateDIDDocumentPayload): unknown {
    const obj: any = {};
    if (message.context) {
      obj.context = message.context.map((e) => e);
    } else {
      obj.context = [];
    }
    message.id !== undefined && (obj.id = message.id);
    if (message.controller) {
      obj.controller = message.controller.map((e) => e);
    } else {
      obj.controller = [];
    }
    if (message.verificationMethod) {
      obj.verificationMethod = message.verificationMethod.map((e) => e ? VerificationMethod.toJSON(e) : undefined);
    } else {
      obj.verificationMethod = [];
    }
    if (message.authentication) {
      obj.authentication = message.authentication.map((e) => e);
    } else {
      obj.authentication = [];
    }
    if (message.assertionMethod) {
      obj.assertionMethod = message.assertionMethod.map((e) => e);
    } else {
      obj.assertionMethod = [];
    }
    if (message.capabilityInvocation) {
      obj.capabilityInvocation = message.capabilityInvocation.map((e) => e);
    } else {
      obj.capabilityInvocation = [];
    }
    if (message.capabilityDelegation) {
      obj.capabilityDelegation = message.capabilityDelegation.map((e) => e);
    } else {
      obj.capabilityDelegation = [];
    }
    if (message.keyAgreement) {
      obj.keyAgreement = message.keyAgreement.map((e) => e);
    } else {
      obj.keyAgreement = [];
    }
    if (message.service) {
      obj.service = message.service.map((e) => e ? Service.toJSON(e) : undefined);
    } else {
      obj.service = [];
    }
    if (message.alsoKnownAs) {
      obj.alsoKnownAs = message.alsoKnownAs.map((e) => e);
    } else {
      obj.alsoKnownAs = [];
    }
    message.versionId !== undefined && (obj.versionId = message.versionId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateDIDDocumentPayload>, I>>(object: I): MsgUpdateDIDDocumentPayload {
    const message = createBaseMsgUpdateDIDDocumentPayload();
    message.context = object.context?.map((e) => e) || [];
    message.id = object.id ?? "";
    message.controller = object.controller?.map((e) => e) || [];
    message.verificationMethod = object.verificationMethod?.map((e) => VerificationMethod.fromPartial(e)) || [];
    message.authentication = object.authentication?.map((e) => e) || [];
    message.assertionMethod = object.assertionMethod?.map((e) => e) || [];
    message.capabilityInvocation = object.capabilityInvocation?.map((e) => e) || [];
    message.capabilityDelegation = object.capabilityDelegation?.map((e) => e) || [];
    message.keyAgreement = object.keyAgreement?.map((e) => e) || [];
    message.service = object.service?.map((e) => Service.fromPartial(e)) || [];
    message.alsoKnownAs = object.alsoKnownAs?.map((e) => e) || [];
    message.versionId = object.versionId ?? "";
    return message;
  },
};

function createBaseMsgUpdateDIDDocumentResponse(): MsgUpdateDIDDocumentResponse {
  return { value: undefined };
}

export const MsgUpdateDIDDocumentResponse = {
  encode(message: MsgUpdateDIDDocumentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== undefined) {
      DIDDocumentWithMetadata.encode(message.value, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDIDDocumentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDIDDocumentResponse();
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

  fromJSON(object: any): MsgUpdateDIDDocumentResponse {
    return { value: isSet(object.value) ? DIDDocumentWithMetadata.fromJSON(object.value) : undefined };
  },

  toJSON(message: MsgUpdateDIDDocumentResponse): unknown {
    const obj: any = {};
    message.value !== undefined
      && (obj.value = message.value ? DIDDocumentWithMetadata.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateDIDDocumentResponse>, I>>(object: I): MsgUpdateDIDDocumentResponse {
    const message = createBaseMsgUpdateDIDDocumentResponse();
    message.value = (object.value !== undefined && object.value !== null)
      ? DIDDocumentWithMetadata.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseMsgDeactivateDIDDocumentPayload(): MsgDeactivateDIDDocumentPayload {
  return { id: "", versionId: "" };
}

export const MsgDeactivateDIDDocumentPayload = {
  encode(message: MsgDeactivateDIDDocumentPayload, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.versionId !== "") {
      writer.uint32(18).string(message.versionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeactivateDIDDocumentPayload {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeactivateDIDDocumentPayload();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.versionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeactivateDIDDocumentPayload {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      versionId: isSet(object.versionId) ? String(object.versionId) : "",
    };
  },

  toJSON(message: MsgDeactivateDIDDocumentPayload): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.versionId !== undefined && (obj.versionId = message.versionId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeactivateDIDDocumentPayload>, I>>(
    object: I,
  ): MsgDeactivateDIDDocumentPayload {
    const message = createBaseMsgDeactivateDIDDocumentPayload();
    message.id = object.id ?? "";
    message.versionId = object.versionId ?? "";
    return message;
  },
};

function createBaseMsgDeactivateDIDDocumentResponse(): MsgDeactivateDIDDocumentResponse {
  return { value: undefined };
}

export const MsgDeactivateDIDDocumentResponse = {
  encode(message: MsgDeactivateDIDDocumentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== undefined) {
      DIDDocumentWithMetadata.encode(message.value, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeactivateDIDDocumentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeactivateDIDDocumentResponse();
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

  fromJSON(object: any): MsgDeactivateDIDDocumentResponse {
    return { value: isSet(object.value) ? DIDDocumentWithMetadata.fromJSON(object.value) : undefined };
  },

  toJSON(message: MsgDeactivateDIDDocumentResponse): unknown {
    const obj: any = {};
    message.value !== undefined
      && (obj.value = message.value ? DIDDocumentWithMetadata.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeactivateDIDDocumentResponse>, I>>(
    object: I,
  ): MsgDeactivateDIDDocumentResponse {
    const message = createBaseMsgDeactivateDIDDocumentResponse();
    message.value = (object.value !== undefined && object.value !== null)
      ? DIDDocumentWithMetadata.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseMsgCreateResourcePayload(): MsgCreateResourcePayload {
  return { data: new Uint8Array(), collectionId: "", id: "", name: "", version: "", resourceType: "", alsoKnownAs: [] };
}

export const MsgCreateResourcePayload = {
  encode(message: MsgCreateResourcePayload, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    if (message.collectionId !== "") {
      writer.uint32(18).string(message.collectionId);
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(34).string(message.name);
    }
    if (message.version !== "") {
      writer.uint32(42).string(message.version);
    }
    if (message.resourceType !== "") {
      writer.uint32(50).string(message.resourceType);
    }
    for (const v of message.alsoKnownAs) {
      AlternativeUri.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateResourcePayload {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateResourcePayload();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        case 2:
          message.collectionId = reader.string();
          break;
        case 3:
          message.id = reader.string();
          break;
        case 4:
          message.name = reader.string();
          break;
        case 5:
          message.version = reader.string();
          break;
        case 6:
          message.resourceType = reader.string();
          break;
        case 7:
          message.alsoKnownAs.push(AlternativeUri.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateResourcePayload {
    return {
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
      collectionId: isSet(object.collectionId) ? String(object.collectionId) : "",
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      version: isSet(object.version) ? String(object.version) : "",
      resourceType: isSet(object.resourceType) ? String(object.resourceType) : "",
      alsoKnownAs: Array.isArray(object?.alsoKnownAs)
        ? object.alsoKnownAs.map((e: any) => AlternativeUri.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgCreateResourcePayload): unknown {
    const obj: any = {};
    message.data !== undefined
      && (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
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
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateResourcePayload>, I>>(object: I): MsgCreateResourcePayload {
    const message = createBaseMsgCreateResourcePayload();
    message.data = object.data ?? new Uint8Array();
    message.collectionId = object.collectionId ?? "";
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.version = object.version ?? "";
    message.resourceType = object.resourceType ?? "";
    message.alsoKnownAs = object.alsoKnownAs?.map((e) => AlternativeUri.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgCreateResourceResponse(): MsgCreateResourceResponse {
  return { resource: undefined };
}

export const MsgCreateResourceResponse = {
  encode(message: MsgCreateResourceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resource !== undefined) {
      ResourceMetadata.encode(message.resource, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateResourceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateResourceResponse();
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

  fromJSON(object: any): MsgCreateResourceResponse {
    return { resource: isSet(object.resource) ? ResourceMetadata.fromJSON(object.resource) : undefined };
  },

  toJSON(message: MsgCreateResourceResponse): unknown {
    const obj: any = {};
    message.resource !== undefined
      && (obj.resource = message.resource ? ResourceMetadata.toJSON(message.resource) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateResourceResponse>, I>>(object: I): MsgCreateResourceResponse {
    const message = createBaseMsgCreateResourceResponse();
    message.resource = (object.resource !== undefined && object.resource !== null)
      ? ResourceMetadata.fromPartial(object.resource)
      : undefined;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreateDIDDocument(request: MsgCreateDIDDocument): Promise<MsgCreateDIDDocumentResponse>;
  UpdateDIDDocument(request: MsgUpdateDIDDocument): Promise<MsgUpdateDIDDocumentResponse>;
  DeactivateDIDDocument(request: MsgDeactivateDIDDocument): Promise<MsgDeactivateDIDDocumentResponse>;
  CreateResource(request: MsgCreateResource): Promise<MsgCreateResourceResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateDIDDocument = this.CreateDIDDocument.bind(this);
    this.UpdateDIDDocument = this.UpdateDIDDocument.bind(this);
    this.DeactivateDIDDocument = this.DeactivateDIDDocument.bind(this);
    this.CreateResource = this.CreateResource.bind(this);
  }
  CreateDIDDocument(request: MsgCreateDIDDocument): Promise<MsgCreateDIDDocumentResponse> {
    const data = MsgCreateDIDDocument.encode(request).finish();
    const promise = this.rpc.request("swisstronik.did.Msg", "CreateDIDDocument", data);
    return promise.then((data) => MsgCreateDIDDocumentResponse.decode(new _m0.Reader(data)));
  }

  UpdateDIDDocument(request: MsgUpdateDIDDocument): Promise<MsgUpdateDIDDocumentResponse> {
    const data = MsgUpdateDIDDocument.encode(request).finish();
    const promise = this.rpc.request("swisstronik.did.Msg", "UpdateDIDDocument", data);
    return promise.then((data) => MsgUpdateDIDDocumentResponse.decode(new _m0.Reader(data)));
  }

  DeactivateDIDDocument(request: MsgDeactivateDIDDocument): Promise<MsgDeactivateDIDDocumentResponse> {
    const data = MsgDeactivateDIDDocument.encode(request).finish();
    const promise = this.rpc.request("swisstronik.did.Msg", "DeactivateDIDDocument", data);
    return promise.then((data) => MsgDeactivateDIDDocumentResponse.decode(new _m0.Reader(data)));
  }

  CreateResource(request: MsgCreateResource): Promise<MsgCreateResourceResponse> {
    const data = MsgCreateResource.encode(request).finish();
    const promise = this.rpc.request("swisstronik.did.Msg", "CreateResource", data);
    return promise.then((data) => MsgCreateResourceResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
