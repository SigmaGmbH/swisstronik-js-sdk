/* eslint-disable */
import _m0 from "protobufjs/minimal.js";
import { Timestamp } from "../google/protobuf/timestamp.js";

export const protobufPackage = "swisstronik.did";

/**
 * DIDDocument defines a DID Document, as defined in the DID Core specification.
 * Documentation: https://www.w3.org/TR/did-core/
 */
export interface DIDDocument {
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
   * alsoKnownAs is a list of DIDs that are known to refer to the same DID
   * subject.
   */
  alsoKnownAs: string[];
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
   * subject.
   */
  service: Service[];
  /**
   * verificationMethod is a list of verification methods that can be used to
   * verify a digital signature or cryptographic proof.
   */
  verificationMethod: VerificationMethod[];
}

/**
 * VerificationMethod defines a verification method, as defined in the DID Core
 * specification. Documentation:
 * https://www.w3.org/TR/did-core/#verification-methods
 */
export interface VerificationMethod {
  /**
   * id is the unique identifier of the verification method.
   * Format: did:swtr:<unique-identifier>#<key-id>
   */
  id: string;
  /**
   * type is the type of the verification method.
   * Example: Ed25519VerificationKey2020
   */
  verificationMethodType: string;
  /**
   * controller is the DID of the controller of the verification method.
   * Format: did:swtr:<unique-identifier>
   */
  controller: string;
  /**
   * verification_material is the public key of the verification method.
   * Commonly used verification material types: publicJwk, publicKeyBase58,
   * publicKeyMultibase
   */
  verificationMaterial: string;
}

/**
 * Service defines a service, as defined in the DID Core specification.
 * Documentation: https://www.w3.org/TR/did-core/#services
 */
export interface Service {
  /**
   * id is the unique identifier of the service.
   * Format: did:swtr:<unique-identifier>#<service-id>
   */
  id: string;
  /**
   * type is the type of the service.
   * Example: LinkedResource
   */
  serviceType: string;
  /**
   * serviceEndpoint is the endpoint of the service.
   * Example: https://example.com/endpoint
   */
  serviceEndpoint: string[];
}

/**
 * DIDDocumentWithMetadata defines a DID Document with metadata, as defined in
 * the DID Core specification. Contains the DID Document, as well as DID
 * Document metadata.
 */
export interface DIDDocumentWithMetadata {
  /** didDocument is the DID Document. */
  didDoc:
    | DIDDocument
    | undefined;
  /** didDocumentMetadata is the DID Document metadata. */
  metadata: Metadata | undefined;
}

/**
 * Metadata defines DID Document metadata, as defined in the DID Core
 * specification. Documentation:
 * https://www.w3.org/TR/did-core/#did-document-metadata-properties
 */
export interface Metadata {
  /**
   * created is the timestamp of the creation of the DID Document.
   * Format: RFC3339
   * Example: 2021-03-10T15:16:17Z
   */
  created:
    | Date
    | undefined;
  /**
   * updated is the timestamp of the last update of the DID Document.
   * Format: RFC3339
   * Example: 2021-03-10T15:16:17Z
   */
  updated:
    | Date
    | undefined;
  /**
   * deactivated is a flag that indicates whether the DID Document is
   * deactivated. Default: false
   */
  deactivated: boolean;
  /**
   * version_id is the version identifier of the DID Document.
   * Format: UUID
   * Example: 123e4567-e89b-12d3-a456-426655440000
   */
  versionId: string;
  /**
   * next_version_id is the version identifier of the next version of the DID
   * Document. Format: UUID Example: 123e4567-e89b-12d3-a456-426655440000
   */
  nextVersionId: string;
  /**
   * previous_version_id is the version identifier of the previous version of
   * the DID Document. Format: UUID Example:
   * 123e4567-e89b-12d3-a456-426655440000
   */
  previousVersionId: string;
}

function createBaseDIDDocument(): DIDDocument {
  return {
    context: [],
    id: "",
    controller: [],
    alsoKnownAs: [],
    authentication: [],
    assertionMethod: [],
    capabilityInvocation: [],
    capabilityDelegation: [],
    keyAgreement: [],
    service: [],
    verificationMethod: [],
  };
}

export const DIDDocument = {
  encode(message: DIDDocument, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.context) {
      writer.uint32(10).string(v!);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    for (const v of message.controller) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.alsoKnownAs) {
      writer.uint32(34).string(v!);
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
    for (const v of message.verificationMethod) {
      VerificationMethod.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DIDDocument {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDIDDocument();
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
          message.alsoKnownAs.push(reader.string());
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
          message.verificationMethod.push(VerificationMethod.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DIDDocument {
    return {
      context: Array.isArray(object?.context) ? object.context.map((e: any) => String(e)) : [],
      id: isSet(object.id) ? String(object.id) : "",
      controller: Array.isArray(object?.controller) ? object.controller.map((e: any) => String(e)) : [],
      alsoKnownAs: Array.isArray(object?.alsoKnownAs) ? object.alsoKnownAs.map((e: any) => String(e)) : [],
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
      verificationMethod: Array.isArray(object?.verificationMethod)
        ? object.verificationMethod.map((e: any) => VerificationMethod.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DIDDocument): unknown {
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
    if (message.alsoKnownAs) {
      obj.alsoKnownAs = message.alsoKnownAs.map((e) => e);
    } else {
      obj.alsoKnownAs = [];
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
    if (message.verificationMethod) {
      obj.verificationMethod = message.verificationMethod.map((e) => e ? VerificationMethod.toJSON(e) : undefined);
    } else {
      obj.verificationMethod = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DIDDocument>, I>>(object: I): DIDDocument {
    const message = createBaseDIDDocument();
    message.context = object.context?.map((e) => e) || [];
    message.id = object.id ?? "";
    message.controller = object.controller?.map((e) => e) || [];
    message.alsoKnownAs = object.alsoKnownAs?.map((e) => e) || [];
    message.authentication = object.authentication?.map((e) => e) || [];
    message.assertionMethod = object.assertionMethod?.map((e) => e) || [];
    message.capabilityInvocation = object.capabilityInvocation?.map((e) => e) || [];
    message.capabilityDelegation = object.capabilityDelegation?.map((e) => e) || [];
    message.keyAgreement = object.keyAgreement?.map((e) => e) || [];
    message.service = object.service?.map((e) => Service.fromPartial(e)) || [];
    message.verificationMethod = object.verificationMethod?.map((e) => VerificationMethod.fromPartial(e)) || [];
    return message;
  },
};

function createBaseVerificationMethod(): VerificationMethod {
  return { id: "", verificationMethodType: "", controller: "", verificationMaterial: "" };
}

export const VerificationMethod = {
  encode(message: VerificationMethod, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.verificationMethodType !== "") {
      writer.uint32(18).string(message.verificationMethodType);
    }
    if (message.controller !== "") {
      writer.uint32(26).string(message.controller);
    }
    if (message.verificationMaterial !== "") {
      writer.uint32(34).string(message.verificationMaterial);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerificationMethod {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerificationMethod();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.verificationMethodType = reader.string();
          break;
        case 3:
          message.controller = reader.string();
          break;
        case 4:
          message.verificationMaterial = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VerificationMethod {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      verificationMethodType: isSet(object.verificationMethodType) ? String(object.verificationMethodType) : "",
      controller: isSet(object.controller) ? String(object.controller) : "",
      verificationMaterial: isSet(object.verificationMaterial) ? String(object.verificationMaterial) : "",
    };
  },

  toJSON(message: VerificationMethod): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.verificationMethodType !== undefined && (obj.verificationMethodType = message.verificationMethodType);
    message.controller !== undefined && (obj.controller = message.controller);
    message.verificationMaterial !== undefined && (obj.verificationMaterial = message.verificationMaterial);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VerificationMethod>, I>>(object: I): VerificationMethod {
    const message = createBaseVerificationMethod();
    message.id = object.id ?? "";
    message.verificationMethodType = object.verificationMethodType ?? "";
    message.controller = object.controller ?? "";
    message.verificationMaterial = object.verificationMaterial ?? "";
    return message;
  },
};

function createBaseService(): Service {
  return { id: "", serviceType: "", serviceEndpoint: [] };
}

export const Service = {
  encode(message: Service, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.serviceType !== "") {
      writer.uint32(18).string(message.serviceType);
    }
    for (const v of message.serviceEndpoint) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Service {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseService();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.serviceType = reader.string();
          break;
        case 3:
          message.serviceEndpoint.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Service {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      serviceType: isSet(object.serviceType) ? String(object.serviceType) : "",
      serviceEndpoint: Array.isArray(object?.serviceEndpoint) ? object.serviceEndpoint.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: Service): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.serviceType !== undefined && (obj.serviceType = message.serviceType);
    if (message.serviceEndpoint) {
      obj.serviceEndpoint = message.serviceEndpoint.map((e) => e);
    } else {
      obj.serviceEndpoint = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Service>, I>>(object: I): Service {
    const message = createBaseService();
    message.id = object.id ?? "";
    message.serviceType = object.serviceType ?? "";
    message.serviceEndpoint = object.serviceEndpoint?.map((e) => e) || [];
    return message;
  },
};

function createBaseDIDDocumentWithMetadata(): DIDDocumentWithMetadata {
  return { didDoc: undefined, metadata: undefined };
}

export const DIDDocumentWithMetadata = {
  encode(message: DIDDocumentWithMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.didDoc !== undefined) {
      DIDDocument.encode(message.didDoc, writer.uint32(10).fork()).ldelim();
    }
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DIDDocumentWithMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDIDDocumentWithMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.didDoc = DIDDocument.decode(reader, reader.uint32());
          break;
        case 2:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DIDDocumentWithMetadata {
    return {
      didDoc: isSet(object.didDoc) ? DIDDocument.fromJSON(object.didDoc) : undefined,
      metadata: isSet(object.metadata) ? Metadata.fromJSON(object.metadata) : undefined,
    };
  },

  toJSON(message: DIDDocumentWithMetadata): unknown {
    const obj: any = {};
    message.didDoc !== undefined && (obj.didDoc = message.didDoc ? DIDDocument.toJSON(message.didDoc) : undefined);
    message.metadata !== undefined && (obj.metadata = message.metadata ? Metadata.toJSON(message.metadata) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DIDDocumentWithMetadata>, I>>(object: I): DIDDocumentWithMetadata {
    const message = createBaseDIDDocumentWithMetadata();
    message.didDoc = (object.didDoc !== undefined && object.didDoc !== null)
      ? DIDDocument.fromPartial(object.didDoc)
      : undefined;
    message.metadata = (object.metadata !== undefined && object.metadata !== null)
      ? Metadata.fromPartial(object.metadata)
      : undefined;
    return message;
  },
};

function createBaseMetadata(): Metadata {
  return {
    created: undefined,
    updated: undefined,
    deactivated: false,
    versionId: "",
    nextVersionId: "",
    previousVersionId: "",
  };
}

export const Metadata = {
  encode(message: Metadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.created !== undefined) {
      Timestamp.encode(toTimestamp(message.created), writer.uint32(10).fork()).ldelim();
    }
    if (message.updated !== undefined) {
      Timestamp.encode(toTimestamp(message.updated), writer.uint32(18).fork()).ldelim();
    }
    if (message.deactivated === true) {
      writer.uint32(24).bool(message.deactivated);
    }
    if (message.versionId !== "") {
      writer.uint32(34).string(message.versionId);
    }
    if (message.nextVersionId !== "") {
      writer.uint32(42).string(message.nextVersionId);
    }
    if (message.previousVersionId !== "") {
      writer.uint32(50).string(message.previousVersionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Metadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.created = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.updated = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.deactivated = reader.bool();
          break;
        case 4:
          message.versionId = reader.string();
          break;
        case 5:
          message.nextVersionId = reader.string();
          break;
        case 6:
          message.previousVersionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Metadata {
    return {
      created: isSet(object.created) ? fromJsonTimestamp(object.created) : undefined,
      updated: isSet(object.updated) ? fromJsonTimestamp(object.updated) : undefined,
      deactivated: isSet(object.deactivated) ? Boolean(object.deactivated) : false,
      versionId: isSet(object.versionId) ? String(object.versionId) : "",
      nextVersionId: isSet(object.nextVersionId) ? String(object.nextVersionId) : "",
      previousVersionId: isSet(object.previousVersionId) ? String(object.previousVersionId) : "",
    };
  },

  toJSON(message: Metadata): unknown {
    const obj: any = {};
    message.created !== undefined && (obj.created = message.created.toISOString());
    message.updated !== undefined && (obj.updated = message.updated.toISOString());
    message.deactivated !== undefined && (obj.deactivated = message.deactivated);
    message.versionId !== undefined && (obj.versionId = message.versionId);
    message.nextVersionId !== undefined && (obj.nextVersionId = message.nextVersionId);
    message.previousVersionId !== undefined && (obj.previousVersionId = message.previousVersionId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Metadata>, I>>(object: I): Metadata {
    const message = createBaseMetadata();
    message.created = object.created ?? undefined;
    message.updated = object.updated ?? undefined;
    message.deactivated = object.deactivated ?? false;
    message.versionId = object.versionId ?? "";
    message.nextVersionId = object.nextVersionId ?? "";
    message.previousVersionId = object.previousVersionId ?? "";
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
