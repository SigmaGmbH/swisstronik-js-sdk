export {
    DIDDocument,
    DIDDocumentWithMetadata,
    Metadata,
    VerificationMethod,
    Service,
} from './document'

export {
    QueryAllDIDDocumentVersionsMetadataRequest,
    QueryAllDIDDocumentVersionsMetadataResponse,
    QueryDIDDocumentRequest,
    QueryDIDDocumentResponse,
    QueryDIDDocumentVersionRequest,
    QueryDIDDocumentVersionResponse,
    QueryClientImpl,
    QueryCollectionResourcesRequest,
    QueryCollectionResourcesResponse,
    QueryResourceMetadataRequest,
    QueryResourceMetadataResponse,
    QueryResourceRequest,
    QueryResourceResponse,
} from './query'

export {
    MsgCreateDIDDocument,
    MsgCreateDIDDocumentPayload,
    MsgCreateDIDDocumentResponse,
    MsgDeactivateDIDDocument,
    MsgDeactivateDIDDocumentPayload,
    MsgDeactivateDIDDocumentResponse,
    MsgUpdateDIDDocument,
    MsgUpdateDIDDocumentPayload,
    MsgUpdateDIDDocumentResponse,
    MsgCreateResource,
    MsgCreateResourcePayload,
    MsgCreateResourceResponse,
    SignInfo,
    protobufPackage,
} from './tx'

export {
    Resource,
    ResourceMetadata,
    ResourceWithMetadata,
    AlternativeUri,
} from './resource'
