/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, @typescript-eslint/no-non-null-assertion */
// any is used for extensibility
// unused vars are kept by convention
// non-null assertion is used when we know better than the compiler that the value is not null or undefined
import {
  DidStdFee,
  IKeyPair,
  ISignInputs,
  ResourceModule,
  createDidPayload,
  createDidVerificationMethod,
  createKeyPairBase64,
  createKeyPairHex,
  createVerificationKeys,
  AlternativeUri,
} from '@swisstronik/sdk'
import {
  IAgentPlugin,
  IAgentPluginSchema,
  IIdentifier,
  VerifiableCredential,
  IVerifyCredentialArgs,
  IVerifyPresentationArgs,
  IError,
} from '@veramo/core'
import {
  SwisstronikDIDProvider,
  TImportableEd25519Key,
  StatusList2021ResourcePayload,
  DefaultRESTUrls,
  DefaultStatusList2021Encodings,
  DefaultStatusList2021ResourceTypes,
  DefaultStatusList2021StatusPurposeTypes,
  DefaultStatusList2021Encoding,
  DefaultStatusList2021ResourceType,
    DefaultResolverUrl
} from '../did-manager'
import {
  fromString,
  toString
} from 'uint8arrays'
import { decodeJWT } from 'did-jwt'
// @ts-ignore
import { StatusList } from '@digitalbazaar/vc-status-list'
import { v4 } from 'uuid'
import fs from 'fs'
import {
  CosmosAccessControlCondition,
  LitCompatibleCosmosChain,
  LitCompatibleCosmosChains,
  LitProtocol,
} from '../dkg-threshold';
import {
  blobToHexString,
  randomFromRange,
  toBlob,
} from '../helpers'
import {
    IContext,
    ISwisstronikPlugin,
    ISwisstronikCreateIdentifierArgs,
    CreateIdentifierMethodName,
    UpdateIdentifierMethodName,
    DeactivateIdentifierMethodName,
    CreateResourceMethodName,
    CreateStatusList2021MethodName,
    CreateStatusList2021Result,
    BroadcastStatusList2021MethodName,
    GenerateDidDocMethodName,
    GenerateDidDocWithLinkedResourceMethodName,
    GenerateKeyPairMethodName,
    GenerateStatusList2021MethodName,
    GenerateVersionIdMethodName,
    IssueRevocableCredentialWithStatusList2021MethodName,
    IssueSuspendableCredentialWithStatusList2021MethodName,
    VerifyCredentialMethodName,
    VerifyPresentationMethodName,
    CheckCredentialStatusMethodName,
    RevokeCredentialMethodName,
    RevokeCredentialsMethodName,
    SuspendCredentialMethodName,
    SuspendCredentialsMethodName,
    UnsuspendCredentialMethodName,
    UnsuspendCredentialsMethodName,
    TransactSendTokensMethodName,
    ObservePaymentConditionMethodName,
    ISwisstronikUpdateIdentifierArgs,
    ISwisstronikDeactivateIdentifierArgs,
    ISwisstronikCreateLinkedResourceArgs,
    ISwisstronikCreateStatusList2021Args,
    AccessControlConditionTypes,
    StatusList2021Revocation,
    StatusList2021Suspension,
    ISwisstronikBroadcastStatusList2021Args,
    ISwisstronikTransactSendTokensArgs,
    TransactionResult,
    BlockResponse,
    ShallowTypedTxsResponse,
    ISwisstronikRevokeCredentialWithStatusList2021Args,
    Bitstring,
    ISwisstronikIssueRevocableCredentialWithStatusList2021Args,
    ISwisstronikGenerateDIDDocumentArgs,
    TExportedDIDDocWithKeys,
    TExportedDIDDocWithLinkedResourceWithKeys,
    ISwisstronikGenerateStatusList2021Args,
    ISwisstronikIssueSuspendableCredentialWithStatusList2021Args,
    ISwisstronikVerifyCredentialWithStatusList2021Args,
    ISwisstronikVerifyPresentationWithStatusList2021Args,
    PaymentCondition,
    VerificationResult,
    ISwisstronikStatusList2021Options,
    BulkRevocationResult,
    BulkSuspensionResult,
    BulkUnsuspensionResult,
    ISwisstronikCheckCredentialStatusWithStatusList2021Args,
    RevocationResult,
    ObservationResult,
    ISwisstronikObservePaymentConditionArgs,
    SuspensionResult,
    RemoteListPattern,
    StatusCheckResult,
    ISwisstronikRevokeBulkCredentialsWithStatusList2021Args,
    ISwisstronikSuspendCredentialWithStatusList2021Args,
    UnsuspensionResult,
    ISwisstronikSuspendBulkCredentialsWithStatusList2021Args,
    ISwisstronikUnsuspendCredentialWithStatusList2021Args,
    ISwisstronikUnsuspendBulkCredentialsWithStatusList2021Args,
    LinkedResourceMetadataResolutionResult,
    DIDMetadataDereferencingResult,
    DIDPrefix,
    SwisstronikDIDMethod
} from '../types'

export class SwisstronikPlugin implements IAgentPlugin {
  readonly methods?: ISwisstronikPlugin
  readonly schema?: IAgentPluginSchema = {
      "components": {
          "schemas": {},
          "methods": {
              "swisstronikCreateIdentifier": {
                  "description": "Create a new identifier",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikCreateIdentifierArgs object as any for extensibility"
                          }
                      },
                      "required": [
                          "args"
                      ]
                  },
                  "returnType": {
                      "type": "object"
                  }
              },
              "swisstronikUpdateIdentifier": {
                  "description": "Update an identifier",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikUpdateIdentifierArgs object as any for extensibility"
                          }
                      },
                      "required": [
                          "args"
                      ]
                  },
                  "returnType": {
                      "type": "object"
                  }
              },
              "swisstronikDeactivateIdentifier": {
                  "description": "Deactivate an identifier",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikDeactivateIdentifierArgs object as any for extensibility"
                          }
                      },
                      "required": [
                          "args"
                      ]
                  },
                  "returnType": {
                      "type": "object"
                  }
              },
              "swisstronikCreateLinkedResource": {
                  "description": "Create a new resource",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikCreateLinkedResource object as any for extensibility"
                          }
                      },
                      "required": [
                          "args"
                      ]
                  },
                  "returnType": {
                      "type": "boolean"
                  }
              },
              "swisstronikCreateStatusList2021": {
                  "description": "Create a new Status List 2021",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikCreateStatusList2021Args object as any for extensibility"
                          }
                      },
                      "required": [
                          "args"
                      ]
                  },
                  "returnType": {
                      "type": "object"
                  }
              },
              "swisstronikBroadcastStatusList2021": {
                  "description": "Broadcast a Status List 2021 to swisstronik ledger",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikBroadcastStatusList2021Args object as any for extensibility"
                          }
                      },
                      "required": [
                          "args"
                      ]
                  },
                  "returnType": {
                      "type": "object"
                  }
              },
              "swisstronikGenerateDidDoc": {
                  "description": "Generate a new DID document to use with `createIdentifier`",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikGenerateDidDocArgs object as any for extensibility"
                          }
                      },
                      "required": [
                          "args"
                      ]
                  },
                  "returnType": {
                      "type": "object"
                  }
              },
              "swisstronikGenerateDidDocWithLinkedResource": {
                  "description": "Generate a new DID document to use with `createIdentifier` and / or `createResource`",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikGenerateDidDocWithLinkedResourceArgs object as any for extensibility"
                          }
                      },
                      "required": [
                          "args"
                      ]
                  },
                  "returnType": {
                      "type": "object"
                  }
              },
              "swisstronikGenerateIdentityKeys": {
                  "description": "Generate a new key pair in hex to use with `createIdentifier`",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikGenerateIdentityKeysArgs object as any for extensibility"
                          }
                      }
                  },
                  "returnType": {
                      "type": "object"
                  }
              },
              "swisstronikGenerateVersionId": {
                  "description": "Generate a random uuid",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikGenerateVersionIdArgs object as any for extensibility"
                          }
                      },
                  },
                  "returnType": {
                      "type": "object"
                  }
              },
              "swisstronikGenerateStatusList2021": {
                  "description": "Generate a new Status List 2021",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikGenerateStatusList2021Args object as any for extensibility"
                          }
                      },
                  },
                  "returnType": {
                      "type": "string"
                  }
              },
              "swisstronikIssueRevocableCredentialWithStatusList2021": {
                  "description": "Issue a revocable credential with a Status List 2021 as credential status registry",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikIssueCredentialWithStatusList2021Args object as any for extensibility"
                          }
                      },
                      "required": [
                          "args"
                      ]
                  },
                  "returnType": {
                      "type": "object"
                  }
              },
              "swisstronikIssueSuspendableCredentialWithStatusList2021": {
                  "description": "Issue a suspendable credential with a Status List 2021 as credential status registry",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikIssueCredentialWithStatusList2021Args object as any for extensibility"
                          }
                      },
                      "required": [
                          "args"
                      ]
                  },
                  "returnType": {
                      "type": "object"
                  }
              },
              "swisstronikVerifyCredential": {
                  "description": "Verify a credential, enhanced by revocation / suspension check with a Status List 2021 as credential status registry",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikVerifyCredentialWithStatusList2021Args object as any for extensibility"
                          }
                      },
                      "required": [
                          "args"
                      ]
                  },
                  "returnType": {
                      "type": "object"
                  }
              },
              "swisstronikVerifyPresentation": {
                  "description": "Verify a presentation, enhanced by revocation / suspension check with a Status List 2021 as credential status registry",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikVerifyPresentationWithStatusList2021Args object as any for extensibility"
                          }
                      },
                      "required": [
                          "args"
                      ]
                  },
                  "returnType": {
                      "type": "object"
                  }
              },
              "swisstronikCheckCredentialStatus": {
                  "description": "Check the revocation / suspension status of a credential with a Status List 2021 as credential status registry",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikCheckCredentialStatusWithStatusList2021Args object as any for extensibility"
                          }
                      },
                      "required": [
                          "args"
                      ]
                  },
                  "returnType": {
                      "type": "object"
                  }
              },
              "swisstronikRevokeCredential": {
                  "description": "Revoke a credential against a Status List 2021 as credential status registry",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikRevokeCredentialWithStatusList2021Args object as any for extensibility"
                          }
                      },
                      "required": [
                          "args"
                      ]
                  },
                  "returnType": {
                      "type": "object"
                  }
              },
              "swisstronikRevokeCredentials": {
                  "description": "Revoke multiple credentials against a Status List 2021 as credential status registry",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikRevokeBulkCredentialsWithStatusList2021Args object as any for extensibility"
                          }
                      },
                      "required": [
                          "args"
                      ]
                  },
                  "returnType": {
                      "type": "array"
                  }
              },
              "swisstronikSuspendCredential": {
                  "description": "Suspend a credential against a Status List 2021 as credential status registry",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikSuspendCredentialWithStatusList2021Args object as any for extensibility"
                          }
                      },
                      "required": [
                          "args"
                      ]
                  },
                  "returnType": {
                      "type": "object"
                  }
              },
              "swisstronikSuspendCredentials": {
                  "description": "Suspend multiple credentials against a Status List 2021 as credential status registry",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikSuspendBulkCredentialsWithStatusList2021Args object as any for extensibility"
                          }
                      },
                      "required": [
                          "args"
                      ]
                  },
                  "returnType": {
                      "type": "array"
                  }
              },
              "swisstronikUnsuspendCredential": {
                  "description": "Unsuspend a credential against a Status List 2021 as credential status registry",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "swisstronikUnsuspendCredentialWithStatusList2021Args object as any for extensibility"
                          }
                      },
                      "required": [
                          "args"
                      ]
                  },
                  "returnType": {
                      "type": "object"
                  }
              },
              "swisstronikUnsuspendCredentials": {
                  "description": "Unsuspend multiple credentials against a Status List 2021 as credential status registry",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikUnsuspendBulkCredentialsWithStatusList2021Args object as any for extensibility"
                          }
                      },
                      "required": [
                          "args"
                      ]
                  },
                  "returnType": {
                      "type": "array"
                  }
              },
              "swisstronikTransactSendTokens": {
                  "description": "Send tokens from one account to another",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "A swisstronikTransactSendTokensArgs object as any for extensibility"
                          }
                      },
                      "required": [
                          "args"
                      ]
                  },
                  "returnType": {
                      "type": "object"
                  }
              },
              "swisstronikObservePaymentCondition": {
                  "description": "Observe payment conditions for a given set of payment conditions",
                  "arguments": {
                      "type": "object",
                      "properties": {
                          "args": {
                              "type": "object",
                              "description": "swisstronikObservePaymentConditionArgs object as any for extensibility"
                          }
                      },
                      "required": [
                          "args"
                      ]
                  },
                  "returnType": {
                      "type": "object"
                  }
              }
          }
      }
  }
  private readonly supportedDidProviders: SwisstronikDIDProvider[]
  private didProvider: SwisstronikDIDProvider;
  private providerId: string;
  static readonly defaultStatusList2021Length: number = 16 * 1024 * 8 // 16KB in bits or 131072 bits / entries
  static readonly defaultContextV1 = 'https://www.w3.org/2018/credentials/v1'
  static readonly statusList2021Context = 'https://w3id.org/vc-status-list-2021/v1'


  constructor(args: { providers: SwisstronikDIDProvider[] }) {
      if (typeof args.providers !== 'object') {
          throw new Error('[swtr-veramo-plugin]: at least one did provider is required')
      }

      this.supportedDidProviders = args.providers
      this.didProvider = args.providers[0]
      this.providerId = SwisstronikPlugin.generateProviderId()

      this.methods = {
          [CreateIdentifierMethodName]: this.CreateIdentifier.bind(this),
          [UpdateIdentifierMethodName]: this.UpdateIdentifier.bind(this),
          [DeactivateIdentifierMethodName]: this.DeactivateIdentifier.bind(this),
          [CreateResourceMethodName]: this.CreateResource.bind(this),
          [CreateStatusList2021MethodName]: this.CreateStatusList2021.bind(this),
          [BroadcastStatusList2021MethodName]: this.BroadcastStatusList2021.bind(this),
          [GenerateDidDocMethodName]: this.GenerateDidDoc.bind(this),
          [GenerateDidDocWithLinkedResourceMethodName]: this.GenerateDidDocWithLinkedResource.bind(this),
          [GenerateKeyPairMethodName]: this.GenerateIdentityKeys.bind(this),
          [GenerateVersionIdMethodName]: this.GenerateVersionId.bind(this),
          [GenerateStatusList2021MethodName]: this.GenerateStatusList2021.bind(this),
          [IssueRevocableCredentialWithStatusList2021MethodName]: this.IssueRevocableCredentialWithStatusList2021.bind(this),
          [IssueSuspendableCredentialWithStatusList2021MethodName]: this.IssueSuspendableCredentialWithStatusList2021.bind(this),
          [VerifyCredentialMethodName]: this.VerifyCredentialWithStatusList2021.bind(this),
          [VerifyPresentationMethodName]: this.VerifyPresentationWithStatusList2021.bind(this),
          [CheckCredentialStatusMethodName]: this.CheckCredentialStatusWithStatusList2021.bind(this),
          [RevokeCredentialMethodName]: this.RevokeCredentialWithStatusList2021.bind(this),
          [RevokeCredentialsMethodName]: this.RevokeBulkCredentialsWithStatusList2021.bind(this),
          [SuspendCredentialMethodName]: this.SuspendCredentialWithStatusList2021.bind(this),
          [SuspendCredentialsMethodName]: this.SuspendBulkCredentialsWithStatusList2021.bind(this),
          [UnsuspendCredentialMethodName]: this.UnsuspendCredentialWithStatusList2021.bind(this),
          [UnsuspendCredentialsMethodName]: this.UnsuspendBulkCredentialsWithStatusList2021.bind(this),
          [TransactSendTokensMethodName]: this.TransactSendTokens.bind(this),
          [ObservePaymentConditionMethodName]: this.ObservePaymentCondition.bind(this),
      }
  }

  private async CreateIdentifier(args: ISwisstronikCreateIdentifierArgs, context: IContext): Promise<Omit<IIdentifier, 'provider'>> {
      if (typeof args.kms !== 'string') {
          throw new Error('[swtr-veramo-plugin]: kms is required')
      }

      if (typeof args.alias !== 'string') {
          throw new Error('[swtr-veramo-plugin]: alias is required')
      }

      if (typeof args.document !== 'object') {
          throw new Error('[swtr-veramo-plugin]: document object is required')
      }

      const provider = await SwisstronikPlugin.loadProvider(args.document.id, this.supportedDidProviders)

      this.didProvider = provider
      this.providerId = SwisstronikPlugin.generateProviderId()

      return await context.agent.didManagerCreate({
          kms: args.kms,
          alias: args.alias,
          provider: this.providerId,
          options: {
              document: args.document,
              keys: args.keys,
              versionId: args?.versionId,
              fee: args?.fee
          }
      })
  }

  private async UpdateIdentifier(args: ISwisstronikUpdateIdentifierArgs, context: IContext): Promise<Omit<IIdentifier, 'provider'>> {
      if (typeof args.kms !== 'string') {
          throw new Error('[swtr-veramo-plugin]: kms is required')
      }

      if (typeof args.document !== 'object') {
          throw new Error('[swtr-veramo-plugin]: document object is required')
      }

      const provider = await SwisstronikPlugin.loadProvider(args.document.id, this.supportedDidProviders)

      this.didProvider = provider
      this.providerId = SwisstronikPlugin.generateProviderId()

      return await context.agent.didManagerUpdate({
          did: args.document.id,
          document: args.document,
          options: {
              kms: args.kms,
              keys: args.keys,
              versionId: args?.versionId,
              fee: args?.fee
          }
      })
  }

  private async DeactivateIdentifier(args: ISwisstronikDeactivateIdentifierArgs, context: IContext) {
      if (typeof args.kms !== 'string') {
          throw new Error('[swtr-veramo-plugin]: kms is required')
      }

      if (typeof args.document !== 'object') {
          throw new Error('[swtr-veramo-plugin]: document object is required')
      }

      const provider = await SwisstronikPlugin.loadProvider(args.document.id, this.supportedDidProviders)

      this.didProvider = provider
      this.providerId = SwisstronikPlugin.generateProviderId()

      return await this.didProvider.deactivateIdentifier({
          did: args.document.id,
          document: args.document,
          options: {
              keys: args.keys,
              fee: args?.fee
          }
      }, context)
  }

  private async CreateResource(args: ISwisstronikCreateLinkedResourceArgs, context: IContext) {
      if (typeof args.kms !== 'string') {
          throw new Error('[swtr-veramo-plugin]: kms is required')
      }

      if (typeof args.payload !== 'object') {
          throw new Error('[swtr-veramo-plugin]: payload object is required')
      }

      if (args?.file) {
          args.payload.data = await SwisstronikPlugin.getFile(args.file)
      }

      if (typeof args?.payload?.data === 'string') {
          args.payload.data = fromString(args.payload.data, 'base64')
      }

      this.providerId = SwisstronikPlugin.generateProviderId()
      this.didProvider = await SwisstronikPlugin.loadProvider(this.providerId, this.supportedDidProviders)

      return await this.didProvider.createResource({
          options: {
              kms: args.kms,
              payload: args.payload,
              signInputs: args.signInputs,
              fee: args?.fee
          }
      }, context)
  }

  private async CreateStatusList2021(args: ISwisstronikCreateStatusList2021Args, context: IContext) {
      if (typeof args.kms !== 'string') {
          throw new Error('[swtr-veramo-plugin]: kms is required')
      }

      if (typeof args.issuerDid !== 'string' || !args.issuerDid) {
          throw new Error('[swtr-veramo-plugin]: issuerDid is required')
      }

      if (typeof args.statusListName !== 'string' || !args.statusListName) {
          throw new Error('[swtr-veramo-plugin]: statusListName is required')
      }

      if (typeof args.statusPurpose !== 'string' || !args.statusPurpose) {
          throw new Error('[swtr-veramo-plugin]: statusPurpose is required')
      }

      if (typeof args.encrypted === 'undefined') {
          throw new Error('[swtr-veramo-plugin]: encrypted is required')
      }

      // validate statusPurpose
      if (!Object.values(DefaultStatusList2021StatusPurposeTypes).includes(args.statusPurpose)) {
          throw new Error(`[swtr-veramo-plugin]: statusPurpose must be one of ${Object.values(DefaultStatusList2021StatusPurposeTypes).join(', ')}`)
      }

      // validate statusListLength
      if (args?.statusListLength) {
          if (typeof args.statusListLength !== 'number') {
              throw new Error('[swtr-veramo-plugin]: statusListLength must be number')
          }

          if (args.statusListLength < SwisstronikPlugin.defaultStatusList2021Length) {
              throw new Error(`[swtr-veramo-plugin]: statusListLength must be greater than or equal to ${SwisstronikPlugin.defaultStatusList2021Length} number of entries`)
          }
      }

      // validate statusListEncoding
      if (args?.statusListEncoding) {
          if (typeof args.statusListEncoding !== 'string') {
              throw new Error('[swtr-veramo-plugin]: statusListEncoding must be string')
          }

          if (!Object.values(DefaultStatusList2021Encodings).includes(args.statusListEncoding)) {
              throw new Error(`[swtr-veramo-plugin]: statusListEncoding must be one of ${Object.values(DefaultStatusList2021Encodings).join(', ')}`)
          }
      }

      // validate validUntil
      if (args?.validUntil) {
          if (typeof args.validUntil !== 'string') {
              throw new Error('[swtr-veramo-plugin]: validUntil must be string')
          }

          if (new Date() <= new Date(args.validUntil)) {
              throw new Error('[swtr-veramo-plugin]: validUntil must be greater than current date')
          }
      }

      // validate args in pairs - case: encrypted
      if (args.encrypted) {
          // validate paymentConditions
          if (!args?.paymentConditions || !args?.paymentConditions?.length || !Array.isArray(args?.paymentConditions) || args?.paymentConditions.length === 0) { 
              throw new Error('[swtr-veramo-plugin]: paymentConditions is required')
          }

          if (!args?.paymentConditions?.every((condition) => condition.feePaymentAddress && condition.feePaymentAmount && condition.intervalInSeconds)) {
              throw new Error('[swtr-veramo-plugin]: paymentConditions must contain feePaymentAddress and feeAmount and intervalInSeconds')
          }

          if (!args?.paymentConditions?.every((condition) => typeof condition.feePaymentAddress === 'string' && typeof condition.feePaymentAmount === 'string' && typeof condition.intervalInSeconds === 'number')) {
              throw new Error('[swtr-veramo-plugin]: feePaymentAddress and feePaymentAmount must be string and intervalInSeconds must be number')
          }

          if (!args?.paymentConditions?.every((condition) => condition.type === AccessControlConditionTypes.timelockPayment)) {
              throw new Error('[swtr-veramo-plugin]: paymentConditions must be of type timelockPayment')
          }
      }

      // get network
      const network = args.issuerDid.split(':')[2]

      // generate bitstring
      const bitstring = await context.agent[GenerateStatusList2021MethodName]({ length: args?.statusListLength || SwisstronikPlugin.defaultStatusList2021Length, bitstringEncoding: args?.statusListEncoding || DefaultStatusList2021Encodings.base64url })

      // construct data and metadata tuple
      const data = args.encrypted
          ? (await (async function (that: SwisstronikPlugin) {
              // instantiate dkg-threshold client, in which case lit-protocol is used
              const lit = await LitProtocol.create({
                  chain: args?.dkgOptions?.chain || that.didProvider.dkgOptions.chain,
                  litNetwork: args?.dkgOptions?.network || that.didProvider.dkgOptions.network,
              })

              // construct access control conditions
              const unifiedAccessControlConditions = await Promise.all(args.paymentConditions!.map(async (condition) => {
                  switch (condition.type) {
                      case AccessControlConditionTypes.timelockPayment:
                          return await LitProtocol.generateCosmosAccessControlConditionInverseTimelock({
                                  key: '$.tx_responses.*.timestamp',
                                  comparator: '<=',
                                  value: `${condition.intervalInSeconds}`,
                              },
                              condition.feePaymentAmount,
                              condition.feePaymentAddress,
                              condition?.blockHeight,
                              args?.dkgOptions?.chain || that.didProvider.dkgOptions.chain
                          )
                      default:
                          throw new Error(`[swtr-veramo-plugin]: unsupported access control condition type ${condition.type}`)
                  }
              }))

              // encrypt bitstring
              const { encryptedString, encryptedSymmetricKey, symmetricKey } = await lit.encrypt(bitstring, unifiedAccessControlConditions, true)

              // return result tuple
              switch (args.statusPurpose) {
                  case DefaultStatusList2021StatusPurposeTypes.revocation:
                      return [{
                          StatusList2021: {
                              statusPurpose: args.statusPurpose,
                              encodedList: await blobToHexString(encryptedString),
                              validFrom: new Date().toISOString(),
                              validUntil: args?.validUntil
                          },
                          metadata: {
                              type: DefaultStatusList2021ResourceTypes.revocation,
                              encrypted: true,
                              encoding: args?.statusListEncoding || DefaultStatusList2021Encodings.base64url,
                              encryptedSymmetricKey,
                              paymentConditions: args.paymentConditions
                          }
                      } satisfies StatusList2021Revocation,
                      {
                          symmetricKey: toString(symmetricKey!, 'hex'),
                          encryptedSymmetricKey,
                          encryptedString: await blobToHexString(encryptedString),
                      }
                  ] satisfies [StatusList2021Revocation, { symmetricKey: string, encryptedSymmetricKey: string, encryptedString: string }]
                  case DefaultStatusList2021StatusPurposeTypes.suspension:
                      return [{
                          StatusList2021: {
                              statusPurpose: args.statusPurpose,
                              encodedList: await blobToHexString(encryptedString),
                              validFrom: new Date().toISOString(),
                              validUntil: args?.validUntil
                          },
                          metadata: {
                              type: DefaultStatusList2021ResourceTypes.suspension,
                              encrypted: true,
                              encoding: args?.statusListEncoding || DefaultStatusList2021Encodings.base64url,
                              encryptedSymmetricKey,
                              paymentConditions: args.paymentConditions
                          }
                      } satisfies StatusList2021Suspension,
                      {
                          symmetricKey: toString(symmetricKey!, 'hex'),
                          encryptedSymmetricKey,
                          encryptedString: await blobToHexString(encryptedString),
                      }
                  ] satisfies [StatusList2021Suspension, { symmetricKey: string, encryptedSymmetricKey: string, encryptedString: string }]
                  default:
                      throw new Error(`[swtr-veramo-plugin]: status purpose is not valid ${args.statusPurpose}`)
              }
          }(this)))
          : (await (async function () {
              switch (args.statusPurpose) {
                  case DefaultStatusList2021StatusPurposeTypes.revocation:
                      return [{
                          StatusList2021: {
                              statusPurpose: args.statusPurpose,
                              encodedList: bitstring,
                              validFrom: new Date().toISOString(),
                              validUntil: args?.validUntil
                          },
                          metadata: {
                              type: DefaultStatusList2021ResourceTypes.revocation,
                              encrypted: false,
                              encoding: args?.statusListEncoding || DefaultStatusList2021Encodings.base64url,
                          }
                      } satisfies StatusList2021Revocation,
                      undefined
                  ] satisfies [StatusList2021Revocation, undefined]
                  case DefaultStatusList2021StatusPurposeTypes.suspension:
                      return [{
                          StatusList2021: {
                              statusPurpose: args.statusPurpose,
                              encodedList: bitstring,
                              validFrom: new Date().toISOString(),
                              validUntil: args?.validUntil
                          },
                          metadata: {
                              type: DefaultStatusList2021ResourceTypes.suspension,
                              encrypted: false,
                              encoding: args?.statusListEncoding || DefaultStatusList2021Encodings.base64url,
                          }
                      } satisfies StatusList2021Suspension,
                      undefined
                  ] satisfies [StatusList2021Suspension, undefined]
                  default:
                      throw new Error('[swtr-veramo-plugin]: statusPurpose is not valid')
              }
          }()))

      // construct payload
      const payload = {
          id: v4(),
          collectionId: args.issuerDid.split(':').reverse()[0],
          name: args.statusListName,
          resourceType: DefaultStatusList2021ResourceTypes[args.statusPurpose],
          version: args?.resourceVersion || new Date().toISOString(),
          alsoKnownAs: args?.alsoKnownAs || [],
          data: fromString(JSON.stringify(data[0]), 'utf-8'),
      } satisfies StatusList2021ResourcePayload

      // return result
      return {
          created: await context.agent[BroadcastStatusList2021MethodName]({ kms: args.kms, payload }),
          resource: data[0],
          resourceMetadata: await SwisstronikPlugin.fetchStatusList2021Metadata({ credentialStatus: { id: `${DefaultResolverUrl}${args.issuerDid}?resourceName=${args.statusListName}&resourceType=${DefaultStatusList2021ResourceTypes[args.statusPurpose]}`, type: 'StatusList2021Entry' } } as VerifiableCredential),
          encrypted: args.encrypted,
          symmetricKey: args?.returnSymmetricKey ? data[1]?.symmetricKey : undefined,
      } satisfies CreateStatusList2021Result
  }

  private async BroadcastStatusList2021(args: ISwisstronikBroadcastStatusList2021Args, context: IContext) {
      if (typeof args.kms !== 'string') {
          throw new Error('[swtr-veramo-plugin]: kms is required')
      }

      if (typeof args.payload !== 'object') {
          throw new Error('[swtr-veramo-plugin]: payload object is required')
      }

      if (args?.file) {
          args.payload.data = await SwisstronikPlugin.getFile(args.file)
      }

      if (typeof args?.payload?.data === 'string') {
          args.payload.data = fromString(args.payload.data, 'base64')
      }

      // validate resource type
      if (!Object.values(DefaultStatusList2021ResourceTypes).includes(args?.payload?.resourceType)) {
          throw new Error(`[swtr-veramo-plugin]: resourceType must be one of ${Object.values(DefaultStatusList2021ResourceTypes).join(', ')}`)
      }

      this.providerId = SwisstronikPlugin.generateProviderId()
      this.didProvider = await SwisstronikPlugin.loadProvider(this.providerId, this.supportedDidProviders)

      return await this.didProvider.createResource({
          options: {
              kms: args.kms,
              payload: args.payload,
              signInputs: args.signInputs,
              fee: args?.fee || await ResourceModule.generateCreateResourceJsonFees((await this.didProvider.getWalletAccounts())[0].address)
          }
      }, context)
  }

  private async GenerateDidDoc(
      args: ISwisstronikGenerateDIDDocumentArgs, 
      context: IContext
  ): Promise<TExportedDIDDocWithKeys> {
      if (typeof args.verificationMethod !== 'string') {
          throw new Error('[swtr-veramo-plugin]: verificationMethod is required')
      }

      if (typeof args.methodSpecificIdAlgo !== 'string') {
          throw new Error('[swtr-veramo-plugin]: methodSpecificIdAlgo is required')
      }

      const keyPair = createKeyPairBase64()
      const keyPairHex: IKeyPair = { publicKey: toString(fromString(keyPair.publicKey, 'base64'), 'hex'), privateKey: toString(fromString(keyPair.privateKey, 'base64'), 'hex') }
      const verificationKeys = createVerificationKeys(keyPair.publicKey, args.methodSpecificIdAlgo, 'key-1')
      const verificationMethods = createDidVerificationMethod([args.verificationMethod], [verificationKeys])

      return {
          didDoc: createDidPayload(verificationMethods, [verificationKeys]),
          versionId: v4(),
          keys: [
              {
                  publicKeyHex: keyPairHex.publicKey,
                  privateKeyHex: keyPairHex.privateKey,
                  kid: keyPairHex.publicKey,
                  type: 'Ed25519'
              }
          ]
      }
  }

  private async GenerateDidDocWithLinkedResource(args: any, context: IContext): Promise<TExportedDIDDocWithLinkedResourceWithKeys> {
      if (typeof args.verificationMethod !== 'string') {
          throw new Error('[swtr-veramo-plugin]: verificationMethod is required')
      }

      if (typeof args.methodSpecificIdAlgo !== 'string') {
          throw new Error('[swtr-veramo-plugin]: methodSpecificIdAlgo is required')
      }

      const keyPair = createKeyPairBase64()
      const keyPairHex: IKeyPair = { publicKey: toString(fromString(keyPair.publicKey, 'base64'), 'hex'), privateKey: toString(fromString(keyPair.privateKey, 'base64'), 'hex') }
      const verificationKeys = createVerificationKeys(keyPair.publicKey, args.methodSpecificIdAlgo, 'key-1')
      const verificationMethods = createDidVerificationMethod([args.verificationMethod], [verificationKeys])
      const payload = createDidPayload(verificationMethods, [verificationKeys])

      return {
          didDoc: payload,
          versionId: v4(),
          keys: [
              {
                  publicKeyHex: keyPairHex.publicKey,
                  privateKeyHex: keyPairHex.privateKey,
                  kid: keyPairHex.publicKey,
                  type: 'Ed25519'
              }
          ],
          linkedResource: {
              id: v4(),
              collectionId: payload.id.split(':').reverse()[0],
              name: 'sample json resource',
              version: '1.0.0',
              resourceType: 'SampleResource',
              alsoKnownAs: [],
              data: toString(new TextEncoder().encode(
                  JSON.stringify({ sample: 'json' })
              ), 'base64'),
          }
      }
  }

  private async GenerateIdentityKeys(args: any, context: IContext): Promise<TImportableEd25519Key> {
      const keyPair = createKeyPairHex()
      return {
          publicKeyHex: keyPair.publicKey,
          privateKeyHex: keyPair.privateKey,
          kid: keyPair.publicKey,
          type: 'Ed25519'
      }
  }

  private async GenerateVersionId(args: any, context: IContext): Promise<string> {
      return v4()
  }

  private async GenerateStatusList2021(args: ISwisstronikGenerateStatusList2021Args, context: IContext): Promise<Bitstring> {
      const statusList = args?.buffer
          ? new StatusList({ buffer: args.buffer })
          : new StatusList({ length: args?.length || SwisstronikPlugin.defaultStatusList2021Length })

      const encoded = await statusList.encode() as Bitstring

      switch (args?.bitstringEncoding) {
          case 'base64url':
              return encoded
          case 'base64':
              return toString(fromString(encoded, 'base64url'), 'base64')
          case 'hex':
              return toString(fromString(encoded, 'base64url'), 'hex')
          default:
              return encoded
      }
  }

  private async IssueRevocableCredentialWithStatusList2021(args: ISwisstronikIssueRevocableCredentialWithStatusList2021Args, context: IContext): Promise<VerifiableCredential> {
      // generate index
      const statusListIndex = args.statusOptions.statusListIndex || await randomFromRange(args.statusOptions.statusListRangeStart || 0, (args.statusOptions.statusListRangeEnd || SwisstronikPlugin.defaultStatusList2021Length) - 1, args.statusOptions.indexNotIn || []) 

      // construct issuer
      const issuer = ((args.issuanceOptions.credential.issuer as { id: string }).id)
          ? (args.issuanceOptions.credential.issuer as { id: string }).id
          : args.issuanceOptions.credential.issuer as string

      // generate status list credential
      const statusListCredential = `${DefaultResolverUrl}${issuer}?resourceName=${args.statusOptions.statusListName}&resourceType=StatusList2021Revocation`

      // construct credential status
      const credentialStatus = {
          id: `${statusListCredential}#${statusListIndex}`,
          type: 'StatusList2021Entry',
          statusPurpose: 'revocation',
          statusListIndex: `${statusListIndex}`,
      }

      // add credential status to credential
      args.issuanceOptions.credential.credentialStatus = credentialStatus

      // add relevant context
      args.issuanceOptions.credential['@context'] = function() {
          // if no context is provided, add default context
          if (!args.issuanceOptions.credential['@context']) {
              return [SwisstronikPlugin.defaultContextV1, SwisstronikPlugin.statusList2021Context]
          }

          // if context is provided as an array, add default context if it is not already present
          if (Array.isArray(args.issuanceOptions.credential['@context'])) {
              if (args.issuanceOptions.credential['@context'].length === 0) {
                  return [SwisstronikPlugin.defaultContextV1, SwisstronikPlugin.statusList2021Context]
              }

              if (!args.issuanceOptions.credential['@context'].includes(SwisstronikPlugin.statusList2021Context)) {
                  return [...args.issuanceOptions.credential['@context'], SwisstronikPlugin.statusList2021Context]
              }
          }

          // if context is provided as a string, add default context if it is not already present
          if (typeof args.issuanceOptions.credential['@context'] === 'string') return [SwisstronikPlugin.defaultContextV1, SwisstronikPlugin.statusList2021Context]
      }()

      // create a credential
      const credential = await context.agent.createVerifiableCredential(args.issuanceOptions)

      return credential
  }

  private async IssueSuspendableCredentialWithStatusList2021(args: ISwisstronikIssueSuspendableCredentialWithStatusList2021Args, context: IContext): Promise<VerifiableCredential> {
      // generate index
      const statusListIndex = args.statusOptions.statusListIndex || await randomFromRange(args.statusOptions.statusListRangeStart || 0, (args.statusOptions.statusListRangeEnd || SwisstronikPlugin.defaultStatusList2021Length) - 1, args.statusOptions.indexNotIn || []) 

      // construct issuer
      const issuer = ((args.issuanceOptions.credential.issuer as { id: string }).id)
          ? (args.issuanceOptions.credential.issuer as { id: string }).id
          : args.issuanceOptions.credential.issuer as string

      // generate status list credential
      const statusListCredential = `${DefaultResolverUrl}${issuer}?resourceName=${args.statusOptions.statusListName}&resourceType=StatusList2021Suspension`

      // construct credential status
      const credentialStatus = {
          id: `${statusListCredential}#${statusListIndex}`,
          type: 'StatusList2021Entry',
          statusPurpose: 'suspension',
          statusListIndex: `${statusListIndex}`,
      }

      // add credential status to credential
      args.issuanceOptions.credential.credentialStatus = credentialStatus

      // add relevant context
      args.issuanceOptions.credential['@context'] = function() {
          // if no context is provided, add default context
          if (!args.issuanceOptions.credential['@context']) {
              return [SwisstronikPlugin.defaultContextV1, SwisstronikPlugin.statusList2021Context]
          }

          // if context is provided as an array, add default context if it is not already present
          if (Array.isArray(args.issuanceOptions.credential['@context'])) {
              if (args.issuanceOptions.credential['@context'].length === 0) {
                  return [SwisstronikPlugin.defaultContextV1, SwisstronikPlugin.statusList2021Context]
              }

              if (!args.issuanceOptions.credential['@context'].includes(SwisstronikPlugin.statusList2021Context)) {
                  return [...args.issuanceOptions.credential['@context'], SwisstronikPlugin.statusList2021Context]
              }
          }

          // if context is provided as a string, add default context if it is not already present
          if (typeof args.issuanceOptions.credential['@context'] === 'string') return [SwisstronikPlugin.defaultContextV1, SwisstronikPlugin.statusList2021Context]
      }()

      // create a credential
      const credential = await context.agent.createVerifiableCredential(args.issuanceOptions)

      return credential
  }

  private async VerifyCredentialWithStatusList2021(args: ISwisstronikVerifyCredentialWithStatusList2021Args, context: IContext): Promise<VerificationResult> {
      // verify default policies
      const verificationResult = await context.agent.verifyCredential({
          ...args?.verificationArgs,
          credential: args.credential,
          policies: {
              ...args?.verificationArgs?.policies,
              credentialStatus: false
          },
      } satisfies IVerifyCredentialArgs)

      // early return if verification failed
      if (!verificationResult.verified) {
          return { verified: false, error: verificationResult.error }
      }

      // if jwt credential, decode it
      const credential = typeof args.credential === 'string' ? await SwisstronikPlugin.decodeCredentialJWT(args.credential) : args.credential

      // define issuer
      const issuer = typeof credential.issuer === 'string'
      ? credential.issuer
      : (credential.issuer as { id: string }).id

      // define provider, if applicable
      this.didProvider = await SwisstronikPlugin.loadProvider(issuer, this.supportedDidProviders)

      // define provider id, if applicable
      this.providerId = SwisstronikPlugin.generateProviderId()

      // define dkg options, if provided
      args.dkgOptions ||= this.didProvider.dkgOptions

      // verify credential status
      switch (credential.credentialStatus?.statusPurpose) {
          case 'revocation':
              if (await SwisstronikPlugin.checkRevoked(credential, { ...args.options, topArgs: args })) return { ...verificationResult, revoked: true }
              return { ...verificationResult, revoked: false }
          case 'suspension':
              if (await SwisstronikPlugin.checkSuspended(credential, { ...args.options, topArgs: args })) return { ...verificationResult, suspended: true }
              return { ...verificationResult, suspended: false }
          default:
              throw new Error(`[swtr-veramo-plugin]: verify credential: Unsupported status purpose: ${credential.credentialStatus?.statusPurpose}`)
      }
  }

  private async VerifyPresentationWithStatusList2021(args: ISwisstronikVerifyPresentationWithStatusList2021Args, context: IContext): Promise<VerificationResult> {
      // verify default policies
      const verificationResult = await context.agent.verifyPresentation({
          ...args?.verificationArgs,
          presentation: args.presentation,
          policies: {
              ...args?.verificationArgs?.policies,
              credentialStatus: false
          },
      } satisfies IVerifyPresentationArgs)

      // early return if verification failed
      if (!verificationResult.verified) {
          return { verified: false, error: verificationResult.error }
      }

      // early return if no verifiable credentials are provided
      if (!args.presentation.verifiableCredential) throw new Error('[swtr-veramo-plugin]: verify presentation: presentation.verifiableCredential is required')

      // verify credential(s) status(es)
      for (let credential of args.presentation.verifiableCredential) {
          // if jwt credential, decode it
          if (typeof credential === 'string') credential = await SwisstronikPlugin.decodeCredentialJWT(credential)

          // define issuer
          const issuer = typeof credential.issuer === 'string'
              ? credential.issuer
              : (credential.issuer as { id: string }).id

          // define provider, if applicable
          this.didProvider = await SwisstronikPlugin.loadProvider(issuer, this.supportedDidProviders)

          // define provider id, if applicable
          this.providerId = SwisstronikPlugin.generateProviderId()

          // define dkg options, if provided
          args.dkgOptions ||= this.didProvider.dkgOptions

          switch (credential.credentialStatus?.statusPurpose) {
              case 'revocation':
                  if (await SwisstronikPlugin.checkRevoked(credential, { ...args.options, topArgs: args })) return { ...verificationResult, revoked: true }
                  break
              case 'suspension':
                  if (await SwisstronikPlugin.checkSuspended(credential, { ...args.options, topArgs: args })) return { ...verificationResult, suspended: true }
                  break
              default:
                  throw new Error(`[swtr-veramo-plugin]: verify presentation: Unsupported status purpose: ${credential.credentialStatus?.statusPurpose}`)
          }
      }

      return { ...verificationResult, verified: true }
  }

  private async CheckCredentialStatusWithStatusList2021(args: ISwisstronikCheckCredentialStatusWithStatusList2021Args, context: IContext): Promise<StatusCheckResult> {
      // verify credential, if provided and status options are not
      if (args?.credential && !args?.statusOptions) {
          const verificationResult = await context.agent.verifyCredential({
              credential: args.credential,
              policies: {
                  credentialStatus: false
              }
          } satisfies IVerifyCredentialArgs)

          // early return if verification failed
          if (!verificationResult.verified) {
              return { revoked: false, error: verificationResult.error }
          }
      }

      // if status options are provided, give precedence
      if (args?.statusOptions) {
          // validate status options - case: statusOptions.issuerDid
          if (!args.statusOptions.issuerDid) throw new Error('[swtr-veramo-plugin]: check status: statusOptions.issuerDid is required')

          // validate status options - case: statusOptions.statusListName
          if (!args.statusOptions.statusListName) throw new Error('[swtr-veramo-plugin]: check status: statusOptions.statusListName is required')

          // validate status options - case: statusOptions.statusListIndex
          if (!args.statusOptions.statusPurpose) throw new Error('[swtr-veramo-plugin]: check status: statusOptions.statusListIndex is required')

          // validate status options - case: statusOptions.statusListIndex
          if (!args.statusOptions.statusListIndex) throw new Error('[swtr-veramo-plugin]: check status: statusOptions.statusListIndex is required')

          // generate resource type
          const resourceType = args.statusOptions.statusPurpose === 'revocation' ? 'StatusList2021Revocation' : 'StatusList2021Suspension'

          // construct status list credential
          const statusListCredential = `${DefaultResolverUrl}${args.statusOptions.issuerDid}?resourceName=${args.statusOptions.statusListName}&resourceType=${resourceType}`

          // construct credential status
          args.credential = {
              '@context': [],
              issuer: args.statusOptions.issuerDid,
              credentialSubject: {},
              credentialStatus: {
                  id: `${statusListCredential}#${args.statusOptions.statusListIndex}`,
                  type: 'StatusList2021Entry',
                  statusPurpose: `${args.statusOptions.statusPurpose}`,
                  statusListIndex: `${args.statusOptions.statusListIndex}`,
              },
              issuanceDate: '',
              proof: {}
          }
      }

      // validate args - case: credential
      if (!args.credential) throw new Error('[swtr-veramo-plugin]: revocation: credential is required')

      // if jwt credential, decode it
      const credential = typeof args.credential === 'string' ? await SwisstronikPlugin.decodeCredentialJWT(args.credential) : args.credential

      // define issuer
      const issuer = typeof credential.issuer === 'string'
          ? credential.issuer
          : (credential.issuer as { id: string }).id

      // define provider, if applicable
      this.didProvider = await SwisstronikPlugin.loadProvider(issuer, this.supportedDidProviders)

      // define provider id, if applicable
      this.providerId = SwisstronikPlugin.generateProviderId()

      // define dkg options, if provided
      args.dkgOptions ||= this.didProvider.dkgOptions

      switch (credential.credentialStatus?.statusPurpose) {
          case 'revocation':
              if (await SwisstronikPlugin.checkRevoked(credential, { ...args.options, topArgs: args })) return { revoked: true }
              return { revoked: false }
          case 'suspension':
              if (await SwisstronikPlugin.checkSuspended(credential, { ...args.options, topArgs: args })) return { suspended: true }
              return { suspended: false }
          default:
              throw new Error(`[swtr-veramo-plugin]: check status: Unsupported status purpose: ${credential.credentialStatus?.statusPurpose}`)
      }
  }

  private async RevokeCredentialWithStatusList2021(args: ISwisstronikRevokeCredentialWithStatusList2021Args, context: IContext): Promise<RevocationResult> {
      // verify credential, if provided and revocation options are not
      if (args?.credential && !args?.revocationOptions) {
          const verificationResult = await context.agent.verifyCredential({
              credential: args.credential,
              policies: {
                  credentialStatus: false
              }
          } satisfies IVerifyCredentialArgs)

          // early return if verification failed
          if (!verificationResult.verified) {
              return { revoked: false, error: verificationResult.error }
          }
      }

      // if revocation options are provided, give precedence
      if (args?.revocationOptions) {
          // validate revocation options - case: revocationOptions.issuerDid
          if (!args.revocationOptions.issuerDid) throw new Error('[swtr-veramo-plugin]: revocation: revocationOptions.issuerDid is required')

          // validate revocation options - case: revocationOptions.statusListName
          if (!args.revocationOptions.statusListName) throw new Error('[swtr-veramo-plugin]: revocation: revocationOptions.statusListName is required')

          // validate revocation options - case: revocationOptions.statusListIndex
          if (!args.revocationOptions.statusListIndex) throw new Error('[swtr-veramo-plugin]: revocation: revocationOptions.statusListIndex is required')

          // construct status list credential
          const statusListCredential = `${DefaultResolverUrl}${args.revocationOptions.issuerDid}?resourceName=${args.revocationOptions.statusListName}&resourceType=StatusList2021Revocation`

          // construct credential status
          args.credential = {
              '@context': [],
              issuer: args.revocationOptions.issuerDid,
              credentialSubject: {},
              credentialStatus: {
                  id: `${statusListCredential}#${args.revocationOptions.statusListIndex}`,
                  type: 'StatusList2021Entry',
                  statusPurpose: 'revocation',
                  statusListIndex: `${args.revocationOptions.statusListIndex}`,
              },
              issuanceDate: '',
              proof: {}
          }
      }

      // validate args - case: credential
      if (!args.credential) throw new Error('[swtr-veramo-plugin]: revocation: credential is required')

      // if jwt credential, decode it
      const credential = typeof args.credential === 'string' ? await SwisstronikPlugin.decodeCredentialJWT(args.credential) : args.credential

      // validate status purpose
      if (credential.credentialStatus?.statusPurpose !== 'revocation') {
          throw new Error(`[swtr-veramo-plugin]: revocation: Unsupported status purpose: ${credential.credentialStatus?.statusPurpose}`)
      }

      // validate args in pairs - case: statusListFile and statusList
      if (args.options?.statusListFile && args.options?.statusList) {
          throw new Error('[swtr-veramo-plugin]: revocation: statusListFile and statusList are mutually exclusive')
      }

      // validate args in pairs - case: statusListFile and fetchList
      if (args.options?.statusListFile && args.options?.fetchList) {
          throw new Error('[swtr-veramo-plugin]: revocation: statusListFile and fetchList are mutually exclusive')
      }

      // validate args in pairs - case: statusList and fetchList
      if (args.options?.statusList && args.options?.fetchList) {
          throw new Error('[swtr-veramo-plugin]: revocation: statusList and fetchList are mutually exclusive')
      }

      // validate args in pairs - case: publish
      if (args.options?.publish && !args.fetchList && !(args.options?.statusListFile || args.options?.statusList)) {
          throw new Error('[swtr-veramo-plugin]: revocation: publish requires statusListFile or statusList, if fetchList is disabled')
      }

      // define issuer
      const issuer = typeof credential.issuer === 'string'
          ? credential.issuer
          : (credential.issuer as { id: string }).id

      // define provider, if applicable
      this.didProvider = await SwisstronikPlugin.loadProvider(issuer, this.supportedDidProviders)

      // define provider id, if applicable
      this.providerId = SwisstronikPlugin.generateProviderId()

      // define dkg options, if provided
      args.dkgOptions ||= this.didProvider.dkgOptions

      // revoke credential
      return await SwisstronikPlugin.revokeCredential(credential, {
          ...args.options,
          topArgs: args,
          publishOptions: {
              context,
              statusListEncoding: args?.options?.statusListEncoding,
              statusListValidUntil: args?.options?.statusListValidUntil,
              resourceId: args?.options?.resourceId,
              resourceVersion: args?.options?.resourceVersion,
              resourceAlsoKnownAs: args?.options?.alsoKnownAs,
              signInputs: args?.options?.signInputs,
              fee: args?.options?.fee
          }
      })
  }

  private async RevokeBulkCredentialsWithStatusList2021(args: ISwisstronikRevokeBulkCredentialsWithStatusList2021Args, context: IContext): Promise<BulkRevocationResult> {
      // verify credential, if provided and revocation options are not
      if (args?.credentials && !args?.revocationOptions) {
          
          const verificationResult = await Promise.all(args.credentials.map(async (credential) => {
              return await context.agent.verifyCredential({
                  credential,
                  policies: {
                      credentialStatus: false
                  }
              } satisfies IVerifyCredentialArgs)
          }))

          // early return if verification failed for any credential
          if (verificationResult.some(result => !result.verified)) {
              // define verified
              return { revoked: Array(args.credentials.length).fill(false), error: verificationResult.find(result => !result.verified)!.error || { message: 'verification: could not verify credential' }  }
          }
      }

      // if revocation options are provided, give precedence
      if (args?.revocationOptions) {
          // validate revocation options - case: revocationOptions.issuerDid
          if (!args.revocationOptions.issuerDid) throw new Error('[swtr-veramo-plugin]: revocation: revocationOptions.issuerDid is required')

          // validate revocation options - case: revocationOptions.statusListName
          if (!args.revocationOptions.statusListName) throw new Error('[swtr-veramo-plugin]: revocation: revocationOptions.statusListName is required')

          // validate revocation options - case: revocationOptions.statusListIndices
          if (!args.revocationOptions.statusListIndices || !args.revocationOptions.statusListIndices.length || args.revocationOptions.statusListIndices.length === 0 || !args.revocationOptions.statusListIndices.every(index => !isNaN(+index))) throw new Error('[swtr-veramo-plugin]: revocation: revocationOptions.statusListIndex is required and must be an array of indices')

          // construct status list credential
          const statusListCredential = `${DefaultResolverUrl}${args.revocationOptions.issuerDid}?resourceName=${args.revocationOptions.statusListName}&resourceType=StatusList2021Revocation`

          // construct credential status
          args.credentials = args.revocationOptions.statusListIndices.map(index => ({
              '@context': [],
              issuer: args.revocationOptions!.issuerDid,
              credentialSubject: {},
              credentialStatus: {
                  id: `${statusListCredential}#${index}`,
                  type: 'StatusList2021Entry',
                  statusPurpose: 'revocation',
                  statusListIndex: `${index}`,
              },
              issuanceDate: '',
              proof: {}
          }))
      }

      // validate args - case: credentials
      if (!args.credentials || !args.credentials.length || args.credentials.length === 0) throw new Error('[swtr-veramo-plugin]: revocation: credentials is required and must be an array of credentials')

      // if jwt credentials, decode them
      const credentials = await Promise.all(args.credentials.map(async credential => typeof credential === 'string' ? await SwisstronikPlugin.decodeCredentialJWT(credential) : credential))

      // validate args in pairs - case: statusListFile and statusList
      if (args.options?.statusListFile && args.options?.statusList) {
          throw new Error('[swtr-veramo-plugin]: revocation: statusListFile and statusList are mutually exclusive')
      }

      // validate args in pairs - case: statusListFile and fetchList
      if (args.options?.statusListFile && args.options?.fetchList) {
          throw new Error('[swtr-veramo-plugin]: revocation: statusListFile and fetchList are mutually exclusive')
      }

      // validate args in pairs - case: statusList and fetchList
      if (args.options?.statusList && args.options?.fetchList) {
          throw new Error('[swtr-veramo-plugin]: revocation: statusList and fetchList are mutually exclusive')
      }

      // validate args in pairs - case: publish
      if (args.options?.publish && !args.fetchList && !(args.options?.statusListFile || args.options?.statusList)) {
          throw new Error('[swtr-veramo-plugin]: revocation: publish requires statusListFile or statusList, if fetchList is disabled')
      }

      // define issuer
      const issuer = typeof credentials[0].issuer === 'string'
          ? credentials[0].issuer
          : (credentials[0].issuer as { id: string }).id

      // define provider, if applicable
      this.didProvider = await SwisstronikPlugin.loadProvider(issuer, this.supportedDidProviders)

      // define provider id, if applicable
      this.providerId = SwisstronikPlugin.generateProviderId()

      // define dkg options, if provided
      args.dkgOptions ||= this.didProvider.dkgOptions

      // revoke credentials
      return await SwisstronikPlugin.revokeCredentials(credentials, {
          ...args.options,
          topArgs: args,
          publishOptions: {
              context,
              resourceId: args?.options?.resourceId,
              resourceVersion: args?.options?.resourceVersion,
              resourceAlsoKnownAs: args?.options?.alsoKnownAs,
              signInputs: args?.options?.signInputs,
              fee: args?.options?.fee
          }
      })
  }

  private async SuspendCredentialWithStatusList2021(args: ISwisstronikSuspendCredentialWithStatusList2021Args, context: IContext): Promise<SuspensionResult> {
      // verify credential, if provided and suspension options are not
      if (args?.credential && !args?.suspensionOptions) {
          const verificationResult = await context.agent.verifyCredential({
              credential: args.credential,
              policies: {
                  credentialStatus: false
              }
          } satisfies IVerifyCredentialArgs)

          // early return if verification failed
          if (!verificationResult.verified) {
              return { suspended: false, error: verificationResult.error }
          }
      }

      // if suspension options are provided, give precedence
      if (args?.suspensionOptions) {
          // validate suspension options - case: suspensionOptions.issuerDid
          if (!args.suspensionOptions.issuerDid) throw new Error('[swtr-veramo-plugin]: suspension: suspensionOptions.issuerDid is required')

          // validate suspension options - case: suspensionOptions.statusListName
          if (!args.suspensionOptions.statusListName) throw new Error('[swtr-veramo-plugin]: suspension: suspensionOptions.statusListName is required')

          // validate suspension options - case: suspensionOptions.statusListIndex
          if (!args.suspensionOptions.statusListIndex) throw new Error('[swtr-veramo-plugin]: suspension: suspensionOptions.statusListIndex is required')

          // construct status list credential
          const statusListCredential = `${DefaultResolverUrl}${args.suspensionOptions.issuerDid}?resourceName=${args.suspensionOptions.statusListName}&resourceType=StatusList2021Suspension`

          // construct credential status
          args.credential = {
              '@context': [],
              issuer: args.suspensionOptions.issuerDid,
              credentialSubject: {},
              credentialStatus: {
                  id: `${statusListCredential}#${args.suspensionOptions.statusListIndex}`,
                  type: 'StatusList2021Entry',
                  statusPurpose: 'suspension',
                  statusListIndex: `${args.suspensionOptions.statusListIndex}`,
              },
              issuanceDate: '',
              proof: {}
          }
      }

      // validate args - case: credential
      if (!args.credential) throw new Error('[swtr-veramo-plugin]: suspension: credential is required')

      // if jwt credential, decode it
      const credential = typeof args.credential === 'string' ? await SwisstronikPlugin.decodeCredentialJWT(args.credential) : args.credential

      // validate status purpose
      if (credential.credentialStatus?.statusPurpose !== 'suspension') {
          throw new Error(`[swtr-veramo-plugin]: suspension: Unsupported status purpose: ${credential.credentialStatus?.statusPurpose}`)
      }

      // validate args in pairs - case: statusListFile and statusList
      if (args.options?.statusListFile && args.options?.statusList) {
          throw new Error('[swtr-veramo-plugin]: suspension: statusListFile and statusList are mutually exclusive')
      }

      // validate args in pairs - case: statusListFile and fetchList
      if (args.options?.statusListFile && args.options?.fetchList) {
          throw new Error('[swtr-veramo-plugin]: suspension: statusListFile and fetchList are mutually exclusive')
      }

      // validate args in pairs - case: statusList and fetchList
      if (args.options?.statusList && args.options?.fetchList) {
          throw new Error('[swtr-veramo-plugin]: suspension: statusList and fetchList are mutually exclusive')
      }

      // validate args in pairs - case: publish
      if (args.options?.publish && !args.fetchList && !(args.options?.statusListFile || args.options?.statusList)) {
          throw new Error('[swtr-veramo-plugin]: suspension: publish requires statusListFile or statusList, if fetchList is disabled')
      }

      // define issuer
      const issuer = typeof credential.issuer === 'string'
          ? credential.issuer
          : (credential.issuer as { id: string }).id

      // define provider, if applicable
      this.didProvider = await SwisstronikPlugin.loadProvider(issuer, this.supportedDidProviders)

      // define provider id, if applicable
      this.providerId = SwisstronikPlugin.generateProviderId()

      // define dkg options, if provided
      args.dkgOptions ||= this.didProvider.dkgOptions

      // suspend credential
      return await SwisstronikPlugin.suspendCredential(credential, {
          ...args.options,
          topArgs: args,
          publishOptions: {
              context,
              statusListEncoding: args?.options?.statusListEncoding,
              statusListValidUntil: args?.options?.statusListValidUntil,
              resourceId: args?.options?.resourceId,
              resourceVersion: args?.options?.resourceVersion,
              resourceAlsoKnownAs: args?.options?.alsoKnownAs,
              signInputs: args?.options?.signInputs,
              fee: args?.options?.fee
          }
      })
  }

  private async SuspendBulkCredentialsWithStatusList2021(args: ISwisstronikSuspendBulkCredentialsWithStatusList2021Args, context: IContext): Promise<BulkSuspensionResult> {
      // verify credential, if provided and suspension options are not
      if (args?.credentials && !args?.suspensionOptions) {
          
          const verificationResult = await Promise.all(args.credentials.map(async (credential) => {
              return await context.agent.verifyCredential({
                  credential,
                  policies: {
                      credentialStatus: false
                  }
              } satisfies IVerifyCredentialArgs)
          }))

          // early return if verification failed for any credential
          if (verificationResult.some(result => !result.verified)) {
              // define verified
              return { suspended: Array(args.credentials.length).fill(false), error: verificationResult.find(result => !result.verified)!.error || { message: 'verification: could not verify credential' }  }
          }
      }

      // if suspension options are provided, give precedence
      if (args?.suspensionOptions) {
          // validate suspension options - case: suspensionOptions.issuerDid
          if (!args.suspensionOptions.issuerDid) throw new Error('[swtr-veramo-plugin]: suspension: suspensionOptions.issuerDid is required')

          // validate suspension options - case: suspensionOptions.statusListName
          if (!args.suspensionOptions.statusListName) throw new Error('[swtr-veramo-plugin]: suspension: suspensionOptions.statusListName is required')

          // validate suspension options - case: suspensionOptions.statusListIndices
          if (!args.suspensionOptions.statusListIndices || !args.suspensionOptions.statusListIndices.length || args.suspensionOptions.statusListIndices.length === 0 || !args.suspensionOptions.statusListIndices.every(index => !isNaN(+index))) throw new Error('[swtr-veramo-plugin]: suspension: suspensionOptions.statusListIndex is required and must be an array of indices')

          // construct status list credential
          const statusListCredential = `${DefaultResolverUrl}${args.suspensionOptions.issuerDid}?resourceName=${args.suspensionOptions.statusListName}&resourceType=StatusList2021Suspension`

          // construct credential status
          args.credentials = args.suspensionOptions.statusListIndices.map(index => ({
              '@context': [],
              issuer: args.suspensionOptions!.issuerDid,
              credentialSubject: {},
              credentialStatus: {
                  id: `${statusListCredential}#${index}`,
                  type: 'StatusList2021Entry',
                  statusPurpose: 'suspension',
                  statusListIndex: `${index}`,
              },
              issuanceDate: '',
              proof: {}
          }))
      }

      // validate args - case: credentials
      if (!args.credentials || !args.credentials.length || args.credentials.length === 0) throw new Error('[swtr-veramo-plugin]: suspension: credentials is required and must be an array of credentials')

      // if jwt credentials, decode them
      const credentials = await Promise.all(args.credentials.map(async credential => typeof credential === 'string' ? await SwisstronikPlugin.decodeCredentialJWT(credential) : credential))

      // validate args in pairs - case: statusListFile and statusList
      if (args.options?.statusListFile && args.options?.statusList) {
          throw new Error('[swtr-veramo-plugin]: suspension: statusListFile and statusList are mutually exclusive')
      }

      // validate args in pairs - case: statusListFile and fetchList
      if (args.options?.statusListFile && args.options?.fetchList) {
          throw new Error('[swtr-veramo-plugin]: suspension: statusListFile and fetchList are mutually exclusive')
      }

      // validate args in pairs - case: statusList and fetchList
      if (args.options?.statusList && args.options?.fetchList) {
          throw new Error('[swtr-veramo-plugin]: suspension: statusList and fetchList are mutually exclusive')
      }

      // validate args in pairs - case: publish
      if (args.options?.publish && !args.fetchList && !(args.options?.statusListFile || args.options?.statusList)) {
          throw new Error('[swtr-veramo-plugin]: suspension: publish requires statusListFile or statusList, if fetchList is disabled')
      }

      // define issuer
      const issuer = typeof credentials[0].issuer === 'string'
          ? credentials[0].issuer
          : (credentials[0].issuer as { id: string }).id

      // define provider, if applicable
      this.didProvider = await SwisstronikPlugin.loadProvider(issuer, this.supportedDidProviders)

      // define provider id, if applicable
      this.providerId = SwisstronikPlugin.generateProviderId()

      // define dkg options, if provided
      args.dkgOptions ||= this.didProvider.dkgOptions

      // suspend credentials
      return await SwisstronikPlugin.suspendCredentials(credentials, {
          ...args.options,
          topArgs: args,
          publishOptions: {
              context,
              resourceId: args?.options?.resourceId,
              resourceVersion: args?.options?.resourceVersion,
              resourceAlsoKnownAs: args?.options?.alsoKnownAs,
              signInputs: args?.options?.signInputs,
              fee: args?.options?.fee
          }
      })
  }

  private async UnsuspendCredentialWithStatusList2021(args: ISwisstronikUnsuspendCredentialWithStatusList2021Args, context: IContext): Promise<UnsuspensionResult> {
      // verify credential, if provided and unsuspension options are not
      if (args?.credential && !args?.unsuspensionOptions) {
          const verificationResult = await context.agent.verifyCredential({
              credential: args.credential,
              policies: {
                  credentialStatus: false
              }
          } satisfies IVerifyCredentialArgs)

          // early return if verification failed
          if (!verificationResult.verified) {
              return { unsuspended: false, error: verificationResult.error }
          }
      }

      // if unsuspension options are provided, give precedence
      if (args?.unsuspensionOptions) {
          // validate unsuspension options - case: unsuspensionOptions.issuerDid
          if (!args.unsuspensionOptions.issuerDid) throw new Error('[swtr-veramo-plugin]: unsuspension: unsuspensionOptions.issuerDid is required')

          // validate unsuspension options - case: unsuspensionOptions.statusListName
          if (!args.unsuspensionOptions.statusListName) throw new Error('[swtr-veramo-plugin]: unsuspension: unsuspensionOptions.statusListName is required')

          // validate unsuspension options - case: unsuspensionOptions.statusListIndex
          if (!args.unsuspensionOptions.statusListIndex) throw new Error('[swtr-veramo-plugin]: unsuspension: unsuspensionOptions.statusListIndex is required')

          // construct status list credential
          const statusListCredential = `${DefaultResolverUrl}${args.unsuspensionOptions.issuerDid}?resourceName=${args.unsuspensionOptions.statusListName}&resourceType=StatusList2021Suspension`

          // construct credential status
          args.credential = {
              '@context': [],
              issuer: args.unsuspensionOptions.issuerDid,
              credentialSubject: {},
              credentialStatus: {
                  id: `${statusListCredential}#${args.unsuspensionOptions.statusListIndex}`,
                  type: 'StatusList2021Entry',
                  statusPurpose: 'suspension',
                  statusListIndex: `${args.unsuspensionOptions.statusListIndex}`,
              },
              issuanceDate: '',
              proof: {}
          }
      }

      // validate args - case: credential
      if (!args.credential) throw new Error('[swtr-veramo-plugin]: unsuspension: credential is required')

      // if jwt credential, decode it
      const credential = typeof args.credential === 'string' ? await SwisstronikPlugin.decodeCredentialJWT(args.credential) : args.credential

      // validate status purpose
      if (credential.credentialStatus?.statusPurpose !== 'suspension') {
          throw new Error(`[swtr-veramo-plugin]: suspension: Unsupported status purpose: ${credential.credentialStatus?.statusPurpose}`)
      }

      // validate args in pairs - case: statusListFile and statusList
      if (args.options?.statusListFile && args.options?.statusList) {
          throw new Error('[swtr-veramo-plugin]: suspension: statusListFile and statusList are mutually exclusive')
      }

      // validate args in pairs - case: statusListFile and fetchList
      if (args.options?.statusListFile && args.options?.fetchList) {
          throw new Error('[swtr-veramo-plugin]: suspension: statusListFile and fetchList are mutually exclusive')
      }

      // validate args in pairs - case: statusList and fetchList
      if (args.options?.statusList && args.options?.fetchList) {
          throw new Error('[swtr-veramo-plugin]: suspension: statusList and fetchList are mutually exclusive')
      }

      // validate args in pairs - case: publish
      if (args.options?.publish && !args.fetchList && !(args.options?.statusListFile || args.options?.statusList)) {
          throw new Error('[swtr-veramo-plugin]: suspension: publish requires statusListFile or statusList, if fetchList is disabled')
      }

      // define issuer
      const issuer = typeof credential.issuer === 'string'
          ? credential.issuer
          : (credential.issuer as { id: string }).id

      // define provider, if applicable
      this.didProvider = await SwisstronikPlugin.loadProvider(issuer, this.supportedDidProviders)

      // define provider id, if applicable
      this.providerId = SwisstronikPlugin.generateProviderId()

      // define dkg options, if provided
      args.dkgOptions ||= this.didProvider.dkgOptions

      // suspend credential
      return await SwisstronikPlugin.unsuspendCredential(credential, {
          ...args.options,
          topArgs: args,
          publishOptions: {
              context,
              statusListEncoding: args?.options?.statusListEncoding,
              statusListValidUntil: args?.options?.statusListValidUntil,
              resourceId: args?.options?.resourceId,
              resourceVersion: args?.options?.resourceVersion,
              resourceAlsoKnownAs: args?.options?.alsoKnownAs,
              signInputs: args?.options?.signInputs,
              fee: args?.options?.fee
          }
      })
  }

  private async UnsuspendBulkCredentialsWithStatusList2021(args: ISwisstronikUnsuspendBulkCredentialsWithStatusList2021Args, context: IContext): Promise<BulkUnsuspensionResult> {
      // verify credential, if provided and unsuspension options are not
      if (args?.credentials && !args?.unsuspensionOptions) {
          
          const verificationResult = await Promise.all(args.credentials.map(async (credential) => {
              return await context.agent.verifyCredential({
                  credential,
                  policies: {
                      credentialStatus: false
                  }
              } satisfies IVerifyCredentialArgs)
          }))

          // early return if verification failed for any credential
          if (verificationResult.some(result => !result.verified)) {
              // define verified
              return { unsuspended: Array(args.credentials.length).fill(false), error: verificationResult.find(result => !result.verified)!.error || { message: 'verification: could not verify credential' }  }
          }
      }

      // if unsuspension options are provided, give precedence
      if (args?.unsuspensionOptions) {
          // validate unsuspension options - case: unsuspensionOptions.issuerDid
          if (!args.unsuspensionOptions.issuerDid) throw new Error('[swtr-veramo-plugin]: unsuspension: unsuspensionOptions.issuerDid is required')

          // validate unsuspension options - case: unsuspensionOptions.statusListName
          if (!args.unsuspensionOptions.statusListName) throw new Error('[swtr-veramo-plugin]: unsuspension: unsuspensionOptions.statusListName is required')

          // validate unsuspension options - case: unsuspensionOptions.statusListIndices
          if (!args.unsuspensionOptions.statusListIndices || !args.unsuspensionOptions.statusListIndices.length || args.unsuspensionOptions.statusListIndices.length === 0 || !args.unsuspensionOptions.statusListIndices.every(index => !isNaN(+index))) throw new Error('[swtr-veramo-plugin]: unsuspension: unsuspensionOptions.statusListIndex is required and must be an array of indices')

          // construct status list credential
          const statusListCredential = `${DefaultResolverUrl}${args.unsuspensionOptions.issuerDid}?resourceName=${args.unsuspensionOptions.statusListName}&resourceType=StatusList2021Suspension`

          // construct credential status
          args.credentials = args.unsuspensionOptions.statusListIndices.map(index => ({
              '@context': [],
              issuer: args.unsuspensionOptions!.issuerDid,
              credentialSubject: {},
              credentialStatus: {
                  id: `${statusListCredential}#${index}`,
                  type: 'StatusList2021Entry',
                  statusPurpose: 'suspension',
                  statusListIndex: `${index}`,
              },
              issuanceDate: '',
              proof: {}
          }))
      }

      // validate args - case: credentials
      if (!args.credentials || !args.credentials.length || args.credentials.length === 0) throw new Error('[swtr-veramo-plugin]: unsuspension: credentials is required and must be an array of credentials')

      // if jwt credentials, decode them
      const credentials = await Promise.all(args.credentials.map(async credential => typeof credential === 'string' ? await SwisstronikPlugin.decodeCredentialJWT(credential) : credential))

      // validate args in pairs - case: statusListFile and statusList
      if (args.options?.statusListFile && args.options?.statusList) {
          throw new Error('[swtr-veramo-plugin]: unsuspension: statusListFile and statusList are mutually exclusive')
      }

      // validate args in pairs - case: statusListFile and fetchList
      if (args.options?.statusListFile && args.options?.fetchList) {
          throw new Error('[swtr-veramo-plugin]: unsuspension: statusListFile and fetchList are mutually exclusive')
      }

      // validate args in pairs - case: statusList and fetchList
      if (args.options?.statusList && args.options?.fetchList) {
          throw new Error('[swtr-veramo-plugin]: unsuspension: statusList and fetchList are mutually exclusive')
      }

      // validate args in pairs - case: publish
      if (args.options?.publish && !args.fetchList && !(args.options?.statusListFile || args.options?.statusList)) {
          throw new Error('[swtr-veramo-plugin]: unsuspension: publish requires statusListFile or statusList, if fetchList is disabled')
      }

      // define issuer
      const issuer = typeof credentials[0].issuer === 'string'
          ? credentials[0].issuer
          : (credentials[0].issuer as { id: string }).id

      // define provider, if applicable
      this.didProvider = await SwisstronikPlugin.loadProvider(issuer, this.supportedDidProviders)

      // define provider id, if applicable
      this.providerId = SwisstronikPlugin.generateProviderId()

      // define dkg options, if provided
      args.dkgOptions ||= this.didProvider.dkgOptions

      // suspend credentials
      return await SwisstronikPlugin.unsuspendCredentials(credentials, {
          ...args.options,
          topArgs: args,
          publishOptions: {
              context,
              resourceId: args?.options?.resourceId,
              resourceVersion: args?.options?.resourceVersion,
              resourceAlsoKnownAs: args?.options?.alsoKnownAs,
              signInputs: args?.options?.signInputs,
              fee: args?.options?.fee
          }
      })
  }

  private async TransactSendTokens(args: ISwisstronikTransactSendTokensArgs, context: IContext): Promise<TransactionResult> {
      // define provider
      const provider = function (that) {
        if (that.supportedDidProviders.length == 0) {
            throw new Error(`[swtr-veramo-plugin]: transact: no relevant providers found`)
        }
        return that.supportedDidProviders[0]
      }(this)

      try {
          // delegate to provider
          const transactionResult = await provider.transactSendTokens({
              recipientAddress: args.recipientAddress,
              amount: args.amount,
              memo: args.memo,
              txBytes: args.txBytes,
          })

          // return transaction result
          return {
              successful: !transactionResult.code,
              transactionHash: transactionResult.transactionHash,
              events: transactionResult.events,
              rawLog: transactionResult.rawLog,
              txResponse: args?.returnTxResponse ? transactionResult : undefined
          } satisfies TransactionResult
      } catch (error) {
          // return error
          return {
              successful: false,
              error: error as IError
          } satisfies TransactionResult
      }
  }

  private async ObservePaymentCondition(args: ISwisstronikObservePaymentConditionArgs, context: IContext): Promise<ObservationResult> {
      // verify with raw unified access control condition, if any
      if (args?.unifiedAccessControlCondition) {
          // validate args - case: unifiedAccessControlCondition.chain
          if (!args.unifiedAccessControlCondition.chain || !Object.values(LitCompatibleCosmosChains).includes(args.unifiedAccessControlCondition.chain as LitCompatibleCosmosChain)) throw new Error('[swtr-veramo-plugin]: observe: unifiedAccessControlCondition.chain is required and must be a valid Lit-compatible chain')

          // validate args - case: unifiedAccessControlCondition.path
          if (!args.unifiedAccessControlCondition.path) throw new Error('[swtr-veramo-plugin]: observe: unifiedAccessControlCondition.path is required')

          // validate args - case: unifiedAccessControlCondition.conditionType
          if (args.unifiedAccessControlCondition.conditionType !== 'cosmos') throw new Error('[swtr-veramo-plugin]: observe: unifiedAccessControlCondition.conditionType must be cosmos')

          // validate args - case: unifiedAccessControlCondition.method
          if (args.unifiedAccessControlCondition.method !== 'timelock') throw new Error('[swtr-veramo-plugin]: observe: unifiedAccessControlCondition.method must be timelock')

          // validate args - case: unifiedAccessControlCondition.parameters
          if (!args.unifiedAccessControlCondition.parameters || !Array.isArray(args.unifiedAccessControlCondition.parameters) || args.unifiedAccessControlCondition.parameters.length === 0 || args.unifiedAccessControlCondition.parameters.length > 1) throw new Error('[swtr-veramo-plugin]: observe: unifiedAccessControlCondition.parameters is required and must be an array of length 1 of type string content')

          // validate args - case: unifiedAccessControlCondition.returnValueTest
          if (!args.unifiedAccessControlCondition.returnValueTest || !args.unifiedAccessControlCondition.returnValueTest.comparator || !args.unifiedAccessControlCondition.returnValueTest.key || !args.unifiedAccessControlCondition.returnValueTest.value) throw new Error('[swtr-veramo-plugin]: observe: unifiedAccessControlCondition.returnValueTest is required')

          try {
              // get block height url
              const blockHeightUrl = function (){
                  switch (args.unifiedAccessControlCondition.parameters[0]) {
                      case 'latest':
                          return `${DefaultRESTUrls[0]}/cosmos/base/tendermint/v1beta1/blocks/latest`
                      default:
                          return `${DefaultRESTUrls[0]}/cosmos/base/tendermint/v1beta1/blocks/${args.unifiedAccessControlCondition.parameters[0]}`
                  }
              }()

              // fetch block response
              const blockHeightResponse = await (await fetch(blockHeightUrl)).json() as BlockResponse

              // get timestamp from block response
              const blockTimestamp = Date.parse(blockHeightResponse.block.header.time)

              // construct url
              const url = `${DefaultRESTUrls[0]}${args.unifiedAccessControlCondition.path}`

              // fetch relevant txs
              const txs = await (await fetch(url)).json() as ShallowTypedTxsResponse

              // skim through txs for relevant events, in which case the transaction timestamp is within the defined interval in seconds, from the block timestamp
              const meetsConditionTxIndex = txs?.tx_responses?.findIndex((tx) => {
                  // get tx timestamp
                  const txTimestamp = Date.parse(tx.timestamp)

                  // calculate diff in seconds
                  const diffInSeconds = Math.floor((blockTimestamp - txTimestamp) / 1000)

                  // return meets condition
                  switch (args.unifiedAccessControlCondition!.returnValueTest.comparator) {
                      case '<':
                          return diffInSeconds < parseInt(args.unifiedAccessControlCondition!.returnValueTest.value)
                      case '<=':
                          return diffInSeconds <= parseInt(args.unifiedAccessControlCondition!.returnValueTest.value)
                      default:
                          throw new Error(`[swtr-veramo-plugin]: observe: Unsupported comparator: ${args.unifiedAccessControlCondition!.returnValueTest.comparator}`)
                  }
              })

              // define meetsCondition
              const meetsCondition = (typeof meetsConditionTxIndex !== 'undefined' && meetsConditionTxIndex !== -1)

              // return observation result
              return {
                  subscribed: true,
                  meetsCondition: meetsCondition,
                  transactionHash: meetsCondition ? txs!.tx_responses[meetsConditionTxIndex].txhash : undefined,
                  events: meetsCondition ? txs!.tx_responses[meetsConditionTxIndex].events : undefined,
                  rawLog: meetsCondition ? txs!.tx_responses[meetsConditionTxIndex].raw_log : undefined,
                  txResponse: meetsCondition ? (args?.returnTxResponse ? txs!.tx_responses[meetsConditionTxIndex] : undefined) : undefined
              } satisfies ObservationResult
          } catch (error) {
              // return error
              return {
                  subscribed: false,
                  meetsCondition: false,
                  error: error as IError
              } satisfies ObservationResult
          }
      }

      // validate access control conditions components - case: recipientAddress
      if (!args.recipientAddress) {
          throw new Error('[swtr-veramo-plugin]: observation: recipientAddress is required')
      }

      // validate access control conditions components - case: amount
      if (!args.amount || !args.amount.amount || !args.amount.denom || args.amount.denom !== 'uswtr') {
          throw new Error('[swtr-veramo-plugin]: observation: amount is required, and must be an object with amount and denom valid string properties, amongst which denom must be `uswtr`')
      }

      // validate access control conditions components - case: intervalInSeconds
      if (!args.intervalInSeconds) {
          throw new Error('[swtr-veramo-plugin]: observation: intervalInSeconds is required')
      }

      // validate access control conditions components - case: comparator
      if (!args.comparator || (args.comparator !== '<' && args.comparator !== '<=')) {
          throw new Error('[swtr-veramo-plugin]: observation: comparator is required and must be either `<` or `<=`')
      }

      // define block height, if not provided
      args.blockHeight ||= 'latest'

      try {
          // get block height url
          const blockHeightUrl = function (){
              switch (args.blockHeight) {
                  case 'latest':
                      return `${DefaultRESTUrls[0]}/cosmos/base/tendermint/v1beta1/blocks/latest`
                  default:
                      return `${DefaultRESTUrls[0]}/cosmos/base/tendermint/v1beta1/blocks/${args.blockHeight}`
              }
          }()

          // fetch block response
          const blockHeightResponse = await (await fetch(blockHeightUrl)).json() as BlockResponse

          // get timestamp from block response
          const blockTimestamp = Date.parse(blockHeightResponse.block.header.time)

          // otherwise, construct url, as per components
          const url = `${DefaultRESTUrls[0]}/cosmos/tx/v1beta1/txs?events=transfer.recipient='${args.recipientAddress}'&events=transfer.amount='${args.amount.amount}${args.amount.denom}'&order_by=2&pagination.limit=1`

          // fetch relevant txs
          const txs = await (await fetch(url)).json() as ShallowTypedTxsResponse

          // skim through txs for relevant events, in which case the transaction timestamp is within the defined interval in seconds, from the block timestamp
          const meetsConditionTxIndex = txs?.tx_responses?.findIndex((tx) => {
              // get tx timestamp
              const txTimestamp = Date.parse(tx.timestamp)

              // calculate diff in seconds
              const diffInSeconds = Math.floor((blockTimestamp - txTimestamp) / 1000)

              // return meets condition
              switch (args.comparator) {
                  case '<':
                      return diffInSeconds < args.intervalInSeconds!
                  case '<=':
                      return diffInSeconds <= args.intervalInSeconds!
                  default:
                      throw new Error(`[swtr-veramo-plugin]: observe: Unsupported comparator: ${args.unifiedAccessControlCondition!.returnValueTest.comparator}`)
              }
          })

          // define meetsCondition
          const meetsCondition = (typeof meetsConditionTxIndex !== 'undefined' && meetsConditionTxIndex !== -1)

          // return observation result
          return {
              subscribed: true,
              meetsCondition: meetsCondition,
              transactionHash: meetsCondition ? txs!.tx_responses[meetsConditionTxIndex].txhash : undefined,
              events: meetsCondition ? txs!.tx_responses[meetsConditionTxIndex].events : undefined,
              rawLog: meetsCondition ? txs!.tx_responses[meetsConditionTxIndex].raw_log : undefined,
              txResponse: meetsCondition ? (args?.returnTxResponse ? txs!.tx_responses[meetsConditionTxIndex] : undefined) : undefined
          } satisfies ObservationResult
      } catch (error) {
          // return error
          return {
              subscribed: false,
              meetsCondition: false,
              error: error as IError
          } satisfies ObservationResult
      }
  }

  static async revokeCredential(credential: VerifiableCredential, options?: ISwisstronikStatusList2021Options): Promise<RevocationResult> {
      try {
          // validate status purpose
          if (credential?.credentialStatus?.statusPurpose !== 'revocation') throw new Error('[swtr-veramo-plugin]: revocation: Invalid status purpose')

          // fetch status list 2021
          const publishedList = (await SwisstronikPlugin.fetchStatusList2021(credential)) as StatusList2021Revocation

          // early return, if encrypted and no decryption key provided
          if (publishedList.metadata.encrypted && !options?.topArgs?.symmetricKey) throw new Error('[swtr-veramo-plugin]: revocation: symmetricKey is required, if status list 2021 is encrypted')

          // fetch status list 2021 inscribed in credential
          const statusList2021 = options?.topArgs?.fetchList 
              ? (await async function () {
                  // if not encrypted, return bitstring
                  if (!publishedList.metadata.encrypted)
                      return publishedList.metadata.encoding === 'base64url'
                          ? publishedList.StatusList2021.encodedList
                          : toString(fromString(publishedList.StatusList2021.encodedList, publishedList.metadata.encoding as DefaultStatusList2021Encoding), 'base64url')

                  // otherwise, decrypt and return raw bitstring
                  const scopedRawBlob = await toBlob(fromString(publishedList.StatusList2021.encodedList, 'hex'))

                  // decrypt
                  return await LitProtocol.decryptDirect(scopedRawBlob, fromString(options?.topArgs?.symmetricKey, 'hex'))
              }())
              : (await async function () {
                  // transcode to base64url, if needed
                  const publishedListTranscoded = publishedList.metadata.encoding === 'base64url'
                      ? publishedList.StatusList2021.encodedList
                      : toString(fromString(publishedList.StatusList2021.encodedList, publishedList.metadata.encoding as DefaultStatusList2021Encoding), 'base64url')

                  // if status list 2021 is not fetched, read from file
                  if (options?.statusListFile) {
                      // if not encrypted, return bitstring
                      if (!publishedList.metadata.encrypted) {
                          // construct encoded status list
                          const encoded = new StatusList({ buffer: await SwisstronikPlugin.getFile(options.statusListFile) }).encode() as Bitstring

                          // validate against published list
                          if (encoded !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: revocation: statusListFile does not match published status list 2021')

                          // return encoded
                          return encoded
                      }

                      // otherwise, decrypt and return bitstring
                      const scopedRawBlob = await toBlob(await SwisstronikPlugin.getFile(options.statusListFile))

                      // decrypt
                      const decrypted = await LitProtocol.decryptDirect(scopedRawBlob, fromString(options?.topArgs?.symmetricKey, 'hex'))

                      // validate against published list
                      if (decrypted !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: revocation: statusListFile does not match published status list 2021')

                      // return decrypted
                      return decrypted
                  }

                  if (!options?.statusListInlineBitstring) throw new Error('[swtr-veramo-plugin]: revocation: statusListInlineBitstring is required, if statusListFile is not provided')

                  // validate against published list
                  if (options?.statusListInlineBitstring !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: revocation: statusListInlineBitstring does not match published status list 2021')

                  // otherwise, read from inline bitstring
                  return options?.statusListInlineBitstring
              }())

          // parse status list 2021
          const statusList = await StatusList.decode({ encodedList: statusList2021 })

          // early exit, if credential is already revoked
          if (statusList.getStatus(Number(credential.credentialStatus.statusListIndex))) return { revoked: false }

          // update revocation status
          statusList.setStatus(Number(credential.credentialStatus.statusListIndex), true)

          // set in-memory status list ref
          const bitstring = await statusList.encode() as Bitstring

          // cast top-level args
          const topArgs = options?.topArgs as ISwisstronikRevokeCredentialWithStatusList2021Args

          // write status list 2021 to file, if provided
          if (topArgs?.writeToFile) {
              await SwisstronikPlugin.writeFile(fromString(bitstring, 'base64url'), options?.statusListFile)
          }

          // publish status list 2021, if provided
          const published = topArgs?.publish
              ? (await async function () {
                  // fetch status list 2021 metadata
                  const statusListMetadata = await SwisstronikPlugin.fetchStatusList2021Metadata(credential)

                  // publish status list 2021 as new version
                  const scoped = topArgs.publishEncrypted
                      ? (await async function () {
                          // validate encoding, if provided
                          if (options?.publishOptions?.statusListEncoding && !Object.values(DefaultStatusList2021Encodings).includes(options?.publishOptions?.statusListEncoding)) {
                              throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list encoding')
                          }

                          // validate validUntil, if provided
                          if (options?.publishOptions?.statusListValidUntil) {
                              // validate validUntil as string
                              if (typeof options?.publishOptions?.statusListValidUntil !== 'string') throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list validUntil (must be string)')

                              // validate validUntil as date
                              if (isNaN(Date.parse(options?.publishOptions?.statusListValidUntil))) throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list validUntil (must be date)')

                              // validate validUntil as future date
                              if (new Date(options?.publishOptions?.statusListValidUntil) < new Date()) throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list validUntil (must be future date)')

                              // validate validUntil towards validFrom
                              if (new Date(options?.publishOptions?.statusListValidUntil) <= new Date(publishedList.StatusList2021.validFrom)) throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list validUntil (must be after validFrom)')
                          }

                          // validate paymentConditions, if provided
                          if (topArgs?.paymentConditions) {
                              if (!topArgs?.paymentConditions?.every((condition) => condition.feePaymentAddress && condition.feePaymentAmount && condition.intervalInSeconds)) {
                                  throw new Error('[swtr-veramo-plugin]: paymentConditions must contain feePaymentAddress and feeAmount and intervalInSeconds')
                              }
  
                              if (!topArgs?.paymentConditions?.every((condition) => typeof condition.feePaymentAddress === 'string' && typeof condition.feePaymentAmount === 'string' && typeof condition.intervalInSeconds === 'number')) {
                                  throw new Error('[swtr-veramo-plugin]: feePaymentAddress and feePaymentAmount must be string and intervalInSeconds must be number')
                              }
  
                              if (!topArgs?.paymentConditions?.every((condition) => condition.type === AccessControlConditionTypes.timelockPayment)) {
                                  throw new Error('[swtr-veramo-plugin]: paymentConditions must be of type timelockPayment')
                              }
                          }

                          // validate dkgOptions
                          if (!topArgs?.dkgOptions || !topArgs?.dkgOptions?.chain || !topArgs?.dkgOptions?.network) {
                              throw new Error('[swtr-veramo-plugin]: dkgOptions is required')
                          }

                          // instantiate dkg-threshold client, in which case lit-protocol is used
                          const lit = await LitProtocol.create({
                              chain: topArgs?.dkgOptions?.chain,
                              litNetwork: topArgs?.dkgOptions?.network
                          })

                          // construct access control conditions and payment conditions tuple
                          const unifiedAccessControlConditionsTuple = publishedList.metadata.encrypted
                              ? (await (async function () {
                                  // define payment conditions, give precedence to top-level args
                                  const paymentConditions = topArgs?.paymentConditions || publishedList.metadata.paymentConditions!

                                  // return access control conditions and payment conditions tuple
                                  return [
                                      await Promise.all(paymentConditions.map(async (condition) => {
                                          switch (condition.type) {
                                              case AccessControlConditionTypes.timelockPayment:
                                                  return await LitProtocol.generateCosmosAccessControlConditionInverseTimelock({
                                                          key: '$.tx_responses.*.timestamp',
                                                          comparator: '<=',
                                                          value: `${condition.intervalInSeconds}`,
                                                      },
                                                      condition.feePaymentAmount,
                                                      condition.feePaymentAddress,
                                                      condition?.blockHeight,
                                                      topArgs?.dkgOptions?.chain
                                                  )
                                              default:
                                                  throw new Error(`[swtr-veramo-plugin]: unsupported access control condition type ${condition.type}`)
                                          }
                                      })),
                                      paymentConditions
                                  ] satisfies [CosmosAccessControlCondition[], PaymentCondition[]]
                              }()))
                              : (await (async function () {
                                  // validate paymentConditions
                                  if (!topArgs?.paymentConditions) {
                                      throw new Error('[swtr-veramo-plugin]: paymentConditions is required')
                                  }

                                  // return access control conditions and payment conditions tuple
                                  return [
                                      await Promise.all(topArgs.paymentConditions.map(async (condition) => {
                                          switch (condition.type) {
                                              case AccessControlConditionTypes.timelockPayment:
                                                  return await LitProtocol.generateCosmosAccessControlConditionInverseTimelock({
                                                          key: '$.tx_responses.*.timestamp',
                                                          comparator: '<=',
                                                          value: `${condition.intervalInSeconds}`,
                                                      },
                                                      condition.feePaymentAmount,
                                                      condition.feePaymentAddress,
                                                      condition?.blockHeight
                                                  )
                                              default:
                                                  throw new Error(`[swtr-veramo-plugin]: unsupported access control condition type ${condition.type}`)
                                          }
                                      })),
                                      topArgs.paymentConditions
                                  ] satisfies [CosmosAccessControlCondition[], PaymentCondition[]]
                              }()))

                          // encrypt bitstring
                          const { encryptedString, encryptedSymmetricKey, symmetricKey } = await lit.encrypt(bitstring, unifiedAccessControlConditionsTuple[0], true)

                          // define status list content
                          const content = {
                              StatusList2021: {
                                  statusPurpose: publishedList.StatusList2021.statusPurpose,
                                  encodedList: await blobToHexString(encryptedString),
                                  validFrom: publishedList.StatusList2021.validFrom,
                                  validUntil: options?.publishOptions?.statusListValidUntil || publishedList.StatusList2021.validUntil
                              },
                              metadata: {
                                  type: publishedList.metadata.type,
                                  encrypted: true,
                                  encoding: (options?.publishOptions?.statusListEncoding as DefaultStatusList2021Encoding | undefined) || publishedList.metadata.encoding,
                                  encryptedSymmetricKey,
                                  paymentConditions: unifiedAccessControlConditionsTuple[1]
                              }
                          } satisfies StatusList2021Revocation

                          // return tuple of publish result and encryption relevant metadata
                          return [
                              await SwisstronikPlugin.publishStatusList2021(fromString(JSON.stringify(content), 'utf-8'), statusListMetadata, options?.publishOptions),
                              { encryptedString, encryptedSymmetricKey, symmetricKey: toString(symmetricKey!, 'hex') }
                          ]
                      }())
                      : (await async function () {
                          // validate encoding, if provided
                          if (options?.publishOptions?.statusListEncoding && !Object.values(DefaultStatusList2021Encodings).includes(options?.publishOptions?.statusListEncoding)) {
                              throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list encoding')
                          }

                          // validate validUntil, if provided
                          if (options?.publishOptions?.statusListValidUntil) {
                              // validate validUntil as string
                              if (typeof options?.publishOptions?.statusListValidUntil !== 'string') throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list validUntil (must be string)')

                              // validate validUntil as date
                              if (isNaN(Date.parse(options?.publishOptions?.statusListValidUntil))) throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list validUntil (must be date)')

                              // validate validUntil as future date
                              if (new Date(options?.publishOptions?.statusListValidUntil) < new Date()) throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list validUntil (must be future date)')

                              // validate validUntil towards validFrom
                              if (new Date(options?.publishOptions?.statusListValidUntil) <= new Date(publishedList.StatusList2021.validFrom)) throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list validUntil (must be after validFrom)')
                          }

                          // define status list content
                          const content = {
                              StatusList2021: {
                                  statusPurpose: publishedList.StatusList2021.statusPurpose,
                                  encodedList: publishedList.metadata.encoding === 'base64url' ? bitstring : toString(fromString(bitstring, 'base64url'), options!.publishOptions.statusListEncoding as DefaultStatusList2021Encoding),
                                  validFrom: publishedList.StatusList2021.validFrom,
                                  validUntil: options?.publishOptions?.statusListValidUntil || publishedList.StatusList2021.validUntil
                              },
                              metadata: {
                                  type: publishedList.metadata.type,
                                  encoding: (options?.publishOptions?.statusListEncoding as DefaultStatusList2021Encoding | undefined) || publishedList.metadata.encoding,
                                  encrypted: false,
                              }
                          } satisfies StatusList2021Revocation

                          // return tuple of publish result and encryption relevant metadata
                          return [
                              await SwisstronikPlugin.publishStatusList2021(fromString(JSON.stringify(content), 'utf-8'), statusListMetadata, options?.publishOptions),
                              undefined
                          ]
                      }())

                  // early exit, if publish failed
                  if (!scoped[0]) throw new Error('[swtr-veramo-plugin]: revocation: Failed to publish status list 2021')

                  // return publish result
                  return scoped
              }())
              : undefined

          return {
              revoked: true,
              published: topArgs?.publish ? true : undefined,
              statusList: topArgs?.returnUpdatedStatusList ? await SwisstronikPlugin.fetchStatusList2021(credential) as StatusList2021Revocation : undefined,
              symmetricKey: topArgs?.returnSymmetricKey ? (published?.[1] as { symmetricKey: string })?.symmetricKey : undefined,
              resourceMetadata: topArgs?.returnStatusListMetadata ? await SwisstronikPlugin.fetchStatusList2021Metadata(credential) : undefined
          } satisfies RevocationResult
      } catch (error) {
          // silent fail + early exit
          console.error(error)

          return { revoked: false, error: error as IError } satisfies RevocationResult
      }
  }

  static async revokeCredentials(credentials: VerifiableCredential[], options?: ISwisstronikStatusList2021Options): Promise<BulkRevocationResult> {
      // validate credentials - case: empty
      if (!credentials.length || credentials.length === 0) throw new Error('[swtr-veramo-plugin]: revocation: No credentials provided')

      // validate credentials - case: consistent issuer
      if (credentials.map((credential) => {
          return ((credential.issuer as { id: string }).id)
              ? (credential.issuer as { id: string }).id
              : credential.issuer as string
      }).filter((value, _, self) => value && value !== self[0]).length > 0) throw new Error('[swtr-veramo-plugin]: revocation: Credentials must be issued by the same issuer')

      // validate credentials - case: status list index
      if (credentials.map((credential) => credential.credentialStatus!.statusListIndex).filter((value, index, self) => self.indexOf(value) !== index).length > 0) throw new Error('[swtr-veramo-plugin]: revocation: Credentials must have unique status list index')

      // validate credentials - case: status purpose
      if (!credentials.every((credential) => credential.credentialStatus?.statusPurpose === 'revocation')) throw new Error('[swtr-veramo-plugin]: revocation: Invalid status purpose')

      // validate credentials - case: status list id
      const remote = credentials[0].credentialStatus?.id
          ? (credentials[0].credentialStatus as { id: string }).id.split('#')[0]
          : (function(){
              throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list id')
          }())

      // validate credentials - case: status list id format
      if (!RemoteListPattern.test(remote)) throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list id format: expected: https://<optional_subdomain>.<sld>.<tld>/1.0/identifiers/<did:swtr:<method_specific_id>>?resourceName=<resource_name>&resourceType=<resource_type>')

      if (!credentials.every((credential) => {
          return (credential.credentialStatus as { id: string }).id.split('#')[0] === remote
      })) throw new Error('[swtr-veramo-plugin]: revocation: Credentials must belong to the same status list')

      // validate credentials - case: status list type
      if (!credentials.every((credential) => credential.credentialStatus?.type === 'StatusList2021Entry')) throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list type')

      try {
          // fetch status list 2021
          const publishedList = (await SwisstronikPlugin.fetchStatusList2021(credentials[0])) as StatusList2021Revocation

          // early return, if encrypted and no decryption key provided
          if (publishedList.metadata.encrypted && !options?.topArgs?.symmetricKey) throw new Error('[swtr-veramo-plugin]: revocation: symmetricKey is required, if status list 2021 is encrypted')

          // fetch status list 2021 inscribed in credential
          const statusList2021 = options?.topArgs?.fetchList 
              ? (await async function () {
                  // if not encrypted, return bitstring
                  if (!publishedList.metadata.encrypted)
                      return publishedList.metadata.encoding === 'base64url'
                          ? publishedList.StatusList2021.encodedList
                          : toString(fromString(publishedList.StatusList2021.encodedList, publishedList.metadata.encoding as DefaultStatusList2021Encoding), 'base64url')

                  // otherwise, decrypt and return raw bitstring
                  const scopedRawBlob = await toBlob(fromString(publishedList.StatusList2021.encodedList, 'hex'))

                  // decrypt
                  return await LitProtocol.decryptDirect(scopedRawBlob, fromString(options?.topArgs?.symmetricKey, 'hex'))
              }())
              : (await async function () {
                  // transcode to base64url, if needed
                  const publishedListTranscoded = publishedList.metadata.encoding === 'base64url'
                      ? publishedList.StatusList2021.encodedList
                      : toString(fromString(publishedList.StatusList2021.encodedList, publishedList.metadata.encoding as DefaultStatusList2021Encoding), 'base64url')

                  // if status list 2021 is not fetched, read from file
                  if (options?.statusListFile) {
                      // if not encrypted, return bitstring
                      if (!publishedList.metadata.encrypted) {
                          // construct encoded status list
                          const encoded = new StatusList({ buffer: await SwisstronikPlugin.getFile(options.statusListFile) }).encode() as Bitstring

                          // validate against published list
                          if (encoded !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: revocation: statusListFile does not match published status list 2021')

                          // return encoded
                          return encoded
                      }

                      // otherwise, decrypt and return bitstring
                      const scopedRawBlob = await toBlob(await SwisstronikPlugin.getFile(options.statusListFile))

                      // decrypt
                      const decrypted = await LitProtocol.decryptDirect(scopedRawBlob, fromString(options?.topArgs?.symmetricKey, 'hex'))

                      // validate against published list
                      if (decrypted !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: revocation: statusListFile does not match published status list 2021')

                      // return decrypted
                      return decrypted
                  }

                  if (!options?.statusListInlineBitstring) throw new Error('[swtr-veramo-plugin]: revocation: statusListInlineBitstring is required, if statusListFile is not provided')

                  // validate against published list
                  if (options?.statusListInlineBitstring !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: revocation: statusListInlineBitstring does not match published status list 2021')

                  // otherwise, read from inline bitstring
                  return options?.statusListInlineBitstring
              }())

          // parse status list 2021
          const statusList = await StatusList.decode({ encodedList: statusList2021 })

          // initiate bulk revocation
          const revoked = await Promise.allSettled(credentials.map((credential) => {
              return async function () {
                  // early return, if no credential status
                  if (!credential.credentialStatus) return { revoked: false }

                  // early exit, if credential is already revoked
                  if (statusList.getStatus(Number(credential.credentialStatus.statusListIndex))) return { revoked: false }

                  // update revocation status
                  statusList.setStatus(Number(credential.credentialStatus.statusListIndex), true)

                  // return revocation status
                  return { revoked: true }
              }()
          })) satisfies PromiseSettledResult<RevocationResult>[]

          // revert bulk ops, if some failed
          if (revoked.some((result) => result.status === 'fulfilled' && !result.value.revoked )) 
              throw new Error(`[swtr-veramo-plugin]: revocation: Bulk revocation failed: already revoked credentials in revocation bundle: raw log: ${JSON.stringify(revoked.map((result) => ({ revoked: result.status === 'fulfilled' ? result.value.revoked : false })))}`)

          // set in-memory status list ref
          const bitstring = await statusList.encode() as Bitstring

          // cast top-level args
          const topArgs = options?.topArgs as ISwisstronikRevokeCredentialWithStatusList2021Args

          // write status list 2021 to file, if provided
          if (topArgs?.writeToFile) {
              await SwisstronikPlugin.writeFile(fromString(bitstring, 'base64url'), options?.statusListFile)
          }

          // publish status list 2021, if provided
          const published = topArgs?.publish
              ? (await async function () {
                  // fetch status list 2021 metadata
                  const statusListMetadata = await SwisstronikPlugin.fetchStatusList2021Metadata(credentials[0])

                  // publish status list 2021 as new version
                  const scoped = topArgs.publishEncrypted
                      ? (await async function () {
                          // validate encoding, if provided
                          if (options?.publishOptions?.statusListEncoding && !Object.values(DefaultStatusList2021Encodings).includes(options?.publishOptions?.statusListEncoding)) {
                              throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list encoding')
                          }

                          // validate validUntil, if provided
                          if (options?.publishOptions?.statusListValidUntil) {
                              // validate validUntil as string
                              if (typeof options?.publishOptions?.statusListValidUntil !== 'string') throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list validUntil (must be string)')

                              // validate validUntil as date
                              if (isNaN(Date.parse(options?.publishOptions?.statusListValidUntil))) throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list validUntil (must be date)')

                              // validate validUntil as future date
                              if (new Date(options?.publishOptions?.statusListValidUntil) < new Date()) throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list validUntil (must be future date)')

                              // validate validUntil towards validFrom
                              if (new Date(options?.publishOptions?.statusListValidUntil) <= new Date(publishedList.StatusList2021.validFrom)) throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list validUntil (must be after validFrom)')
                          }

                          // validate paymentConditions, if provided
                          if (topArgs?.paymentConditions) {
                              if (!topArgs?.paymentConditions?.every((condition) => condition.feePaymentAddress && condition.feePaymentAmount && condition.intervalInSeconds)) {
                                  throw new Error('[swtr-veramo-plugin]: paymentConditions must contain feePaymentAddress and feeAmount and intervalInSeconds')
                              }

                              if (!topArgs?.paymentConditions?.every((condition) => typeof condition.feePaymentAddress === 'string' && typeof condition.feePaymentAmount === 'string' && typeof condition.intervalInSeconds === 'number')) {
                                  throw new Error('[swtr-veramo-plugin]: feePaymentAddress and feePaymentAmount must be string and intervalInSeconds must be number')
                              }

                              if (!topArgs?.paymentConditions?.every((condition) => condition.type === AccessControlConditionTypes.timelockPayment)) {
                                  throw new Error('[swtr-veramo-plugin]: paymentConditions must be of type timelockPayment')
                              }
                          }

                          // validate dkgOptions
                          if (!topArgs?.dkgOptions || !topArgs?.dkgOptions?.chain || !topArgs?.dkgOptions?.network) {
                              throw new Error('[swtr-veramo-plugin]: dkgOptions is required')
                          }

                          // instantiate dkg-threshold client, in which case lit-protocol is used
                          const lit = await LitProtocol.create({
                              chain: topArgs?.dkgOptions?.chain,
                              litNetwork: topArgs?.dkgOptions?.network
                          })

                          // construct access control conditions and payment conditions tuple
                          const unifiedAccessControlConditionsTuple = publishedList.metadata.encrypted
                              ? (await (async function () {
                                  // define payment conditions, give precedence to top-level args
                                  const paymentConditions = topArgs?.paymentConditions || publishedList.metadata.paymentConditions!

                                  // return access control conditions and payment conditions tuple
                                  return [
                                      await Promise.all(paymentConditions.map(async (condition) => {
                                          switch (condition.type) {
                                              case AccessControlConditionTypes.timelockPayment:
                                                  return await LitProtocol.generateCosmosAccessControlConditionInverseTimelock({
                                                          key: '$.tx_responses.*.timestamp',
                                                          comparator: '<=',
                                                          value: `${condition.intervalInSeconds}`,
                                                      },
                                                      condition.feePaymentAmount,
                                                      condition.feePaymentAddress,
                                                      condition?.blockHeight,
                                                      topArgs?.dkgOptions?.chain
                                                  )
                                              default:
                                                  throw new Error(`[swtr-veramo-plugin]: unsupported access control condition type ${condition.type}`)
                                          }
                                      })),
                                      paymentConditions
                                  ] satisfies [CosmosAccessControlCondition[], PaymentCondition[]]
                              }()))
                              : (await (async function () {
                                  // validate paymentConditions
                                  if (!topArgs?.paymentConditions) {
                                      throw new Error('[swtr-veramo-plugin]: paymentConditions is required')
                                  }

                                  // return access control conditions and payment conditions tuple
                                  return [
                                      await Promise.all(topArgs.paymentConditions.map(async (condition) => {
                                          switch (condition.type) {
                                              case AccessControlConditionTypes.timelockPayment:
                                                  return await LitProtocol.generateCosmosAccessControlConditionInverseTimelock({
                                                          key: '$.tx_responses.*.timestamp',
                                                          comparator: '<=',
                                                          value: `${condition.intervalInSeconds}`,
                                                      },
                                                      condition.feePaymentAmount,
                                                      condition.feePaymentAddress,
                                                      condition?.blockHeight
                                                  )
                                              default:
                                                  throw new Error(`[swtr-veramo-plugin]: unsupported access control condition type ${condition.type}`)
                                          }
                                      })),
                                      topArgs.paymentConditions
                                  ] satisfies [CosmosAccessControlCondition[], PaymentCondition[]]
                              }()))

                          // encrypt bitstring
                          const { encryptedString, encryptedSymmetricKey, symmetricKey } = await lit.encrypt(bitstring, unifiedAccessControlConditionsTuple[0], true)

                          // define status list content
                          const content = {
                              StatusList2021: {
                                  statusPurpose: publishedList.StatusList2021.statusPurpose,
                                  encodedList: await blobToHexString(encryptedString),
                                  validFrom: publishedList.StatusList2021.validFrom,
                                  validUntil: options?.publishOptions?.statusListValidUntil || publishedList.StatusList2021.validUntil
                              },
                              metadata: {
                                  type: publishedList.metadata.type,
                                  encrypted: true,
                                  encoding: (options?.publishOptions?.statusListEncoding as DefaultStatusList2021Encoding | undefined) || publishedList.metadata.encoding,
                                  encryptedSymmetricKey,
                                  paymentConditions: unifiedAccessControlConditionsTuple[1]
                              }
                          } satisfies StatusList2021Revocation

                          // return tuple of publish result and encryption relevant metadata
                          return [
                              await SwisstronikPlugin.publishStatusList2021(fromString(JSON.stringify(content), 'utf-8'), statusListMetadata, options?.publishOptions),
                              { encryptedString, encryptedSymmetricKey, symmetricKey: toString(symmetricKey!, 'hex') }
                          ]
                      }())
                      : (await async function () {
                          // validate encoding, if provided
                          if (options?.publishOptions?.statusListEncoding && !Object.values(DefaultStatusList2021Encodings).includes(options?.publishOptions?.statusListEncoding)) {
                              throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list encoding')
                          }

                          // validate validUntil, if provided
                          if (options?.publishOptions?.statusListValidUntil) {
                              // validate validUntil as string
                              if (typeof options?.publishOptions?.statusListValidUntil !== 'string') throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list validUntil (must be string)')

                              // validate validUntil as date
                              if (isNaN(Date.parse(options?.publishOptions?.statusListValidUntil))) throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list validUntil (must be date)')

                              // validate validUntil as future date
                              if (new Date(options?.publishOptions?.statusListValidUntil) < new Date()) throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list validUntil (must be future date)')

                              // validate validUntil towards validFrom
                              if (new Date(options?.publishOptions?.statusListValidUntil) <= new Date(publishedList.StatusList2021.validFrom)) throw new Error('[swtr-veramo-plugin]: revocation: Invalid status list validUntil (must be after validFrom)')
                          }

                          // define status list content
                          const content = {
                              StatusList2021: {
                                  statusPurpose: publishedList.StatusList2021.statusPurpose,
                                  encodedList: publishedList.metadata.encoding === 'base64url' ? bitstring : toString(fromString(bitstring, 'base64url'), options!.publishOptions.statusListEncoding as DefaultStatusList2021Encoding),
                                  validFrom: publishedList.StatusList2021.validFrom,
                                  validUntil: options?.publishOptions?.statusListValidUntil || publishedList.StatusList2021.validUntil
                              },
                              metadata: {
                                  type: publishedList.metadata.type,
                                  encoding: (options?.publishOptions?.statusListEncoding as DefaultStatusList2021Encoding | undefined) || publishedList.metadata.encoding,
                                  encrypted: false,
                              }
                          } satisfies StatusList2021Revocation

                          // return tuple of publish result and encryption relevant metadata
                          return [
                              await SwisstronikPlugin.publishStatusList2021(fromString(JSON.stringify(content), 'utf-8'), statusListMetadata, options?.publishOptions),
                              undefined
                          ]
                      }())

                  // early exit, if publish failed
                  if (!scoped[0]) throw new Error('[swtr-veramo-plugin]: revocation: Failed to publish status list 2021')

                  // return publish result
                  return scoped
              }())
              : undefined

          return {
              revoked: revoked.map((result) => result.status === 'fulfilled' ? result.value.revoked : false),
              published: topArgs?.publish ? true : undefined,
              statusList: topArgs?.returnUpdatedStatusList ? await SwisstronikPlugin.fetchStatusList2021(credentials[0]) as StatusList2021Revocation : undefined,
              symmetricKey: topArgs?.returnSymmetricKey ? (published?.[1] as { symmetricKey: string })?.symmetricKey : undefined,
              resourceMetadata: topArgs?.returnStatusListMetadata ? await SwisstronikPlugin.fetchStatusList2021Metadata(credentials[0]) : undefined
          } satisfies BulkRevocationResult
      } catch (error) {
          // silent fail + early exit
          console.error(error)

          return { revoked: [], error: error as IError } satisfies BulkRevocationResult
      }
  }

  static async suspendCredential(credential: VerifiableCredential, options?: ISwisstronikStatusList2021Options): Promise<SuspensionResult> {
      try {
          // validate status purpose
          if (credential?.credentialStatus?.statusPurpose !== 'suspension') throw new Error('[swtr-veramo-plugin]: suspension: Invalid status purpose')

          // fetch status list 2021
          const publishedList = (await SwisstronikPlugin.fetchStatusList2021(credential)) as StatusList2021Suspension

          // early return, if encrypted and no decryption key provided
          if (publishedList.metadata.encrypted && !options?.topArgs?.symmetricKey) throw new Error('[swtr-veramo-plugin]: suspension: symmetricKey is required, if status list 2021 is encrypted')

          // fetch status list 2021 inscribed in credential
          const statusList2021 = options?.topArgs?.fetchList 
              ? (await async function () {
                  // if not encrypted, return bitstring
                  if (!publishedList.metadata.encrypted)
                      return publishedList.metadata.encoding === 'base64url'
                          ? publishedList.StatusList2021.encodedList
                          : toString(fromString(publishedList.StatusList2021.encodedList, publishedList.metadata.encoding as DefaultStatusList2021Encoding), 'base64url')

                  // otherwise, decrypt and return raw bitstring
                  const scopedRawBlob = await toBlob(fromString(publishedList.StatusList2021.encodedList, 'hex'))

                  // decrypt
                  return await LitProtocol.decryptDirect(scopedRawBlob, fromString(options?.topArgs?.symmetricKey, 'hex'))
              }())
              : (await async function () {
                  // transcode to base64url, if needed
                  const publishedListTranscoded = publishedList.metadata.encoding === 'base64url'
                      ? publishedList.StatusList2021.encodedList
                      : toString(fromString(publishedList.StatusList2021.encodedList, publishedList.metadata.encoding as DefaultStatusList2021Encoding), 'base64url')

                  // if status list 2021 is not fetched, read from file
                  if (options?.statusListFile) {
                      // if not encrypted, return bitstring
                      if (!publishedList.metadata.encrypted) {
                          // construct encoded status list
                          const encoded = new StatusList({ buffer: await SwisstronikPlugin.getFile(options.statusListFile) }).encode() as Bitstring

                          // validate against published list
                          if (encoded !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: suspension: statusListFile does not match published status list 2021')

                          // return encoded
                          return encoded
                      }

                      // otherwise, decrypt and return bitstring
                      const scopedRawBlob = await toBlob(await SwisstronikPlugin.getFile(options.statusListFile))

                      // decrypt
                      const decrypted = await LitProtocol.decryptDirect(scopedRawBlob, fromString(options?.topArgs?.symmetricKey, 'hex'))

                      // validate against published list
                      if (decrypted !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: suspension: statusListFile does not match published status list 2021')

                      // return decrypted
                      return decrypted
                  }

                  if (!options?.statusListInlineBitstring) throw new Error('[swtr-veramo-plugin]: suspension: statusListInlineBitstring is required, if statusListFile is not provided')

                  // validate against published list
                  if (options?.statusListInlineBitstring !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: suspension: statusListInlineBitstring does not match published status list 2021')

                  // otherwise, read from inline bitstring
                  return options?.statusListInlineBitstring
              }())

          // parse status list 2021
          const statusList = await StatusList.decode({ encodedList: statusList2021 })

          // early exit, if already suspended
          if (statusList.getStatus(Number(credential.credentialStatus.statusListIndex))) return { suspended: true } satisfies SuspensionResult

          // update suspension status
          statusList.setStatus(Number(credential.credentialStatus.statusListIndex), true)

          // set in-memory status list ref
          const bitstring = await statusList.encode() as Bitstring

          // cast top-level args
          const topArgs = options?.topArgs as ISwisstronikSuspendCredentialWithStatusList2021Args

          // write status list 2021 to file, if provided
          if (topArgs?.writeToFile) {
              await SwisstronikPlugin.writeFile(fromString(bitstring, 'base64url'), options?.statusListFile)
          }

          // publish status list 2021, if provided
          const published = topArgs?.publish
              ? (await async function () {
                  // fetch status list 2021 metadata
                  const statusListMetadata = await SwisstronikPlugin.fetchStatusList2021Metadata(credential)

                  // publish status list 2021 as new version
                  const scoped = topArgs.publishEncrypted
                      ? (await async function () {
                          // validate encoding, if provided
                          if (options?.publishOptions?.statusListEncoding && !Object.values(DefaultStatusList2021Encodings).includes(options?.publishOptions?.statusListEncoding)) {
                              throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list encoding')
                          }

                          // validate validUntil, if provided
                          if (options?.publishOptions?.statusListValidUntil) {
                              // validate validUntil as string
                              if (typeof options?.publishOptions?.statusListValidUntil !== 'string') throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list validUntil (must be string)')

                              // validate validUntil as date
                              if (isNaN(Date.parse(options?.publishOptions?.statusListValidUntil))) throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list validUntil (must be date)')

                              // validate validUntil as future date
                              if (new Date(options?.publishOptions?.statusListValidUntil) < new Date()) throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list validUntil (must be future date)')

                              // validate validUntil towards validFrom
                              if (new Date(options?.publishOptions?.statusListValidUntil) <= new Date(publishedList.StatusList2021.validFrom)) throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list validUntil (must be after validFrom)')
                          }

                          // validate paymentConditions, if provided
                          if (topArgs?.paymentConditions) {
                              if (!topArgs?.paymentConditions?.every((condition) => condition.feePaymentAddress && condition.feePaymentAmount && condition.intervalInSeconds)) {
                                  throw new Error('[swtr-veramo-plugin]: paymentConditions must contain feePaymentAddress and feeAmount and intervalInSeconds')
                              }

                              if (!topArgs?.paymentConditions?.every((condition) => typeof condition.feePaymentAddress === 'string' && typeof condition.feePaymentAmount === 'string' && typeof condition.intervalInSeconds === 'number')) {
                                  throw new Error('[swtr-veramo-plugin]: feePaymentAddress and feePaymentAmount must be string and intervalInSeconds must be number')
                              }

                              if (!topArgs?.paymentConditions?.every((condition) => condition.type === AccessControlConditionTypes.timelockPayment)) {
                                  throw new Error('[swtr-veramo-plugin]: paymentConditions must be of type timelockPayment')
                              }
                          }

                          // validate dkgOptions
                          if (!topArgs?.dkgOptions || !topArgs?.dkgOptions?.chain || !topArgs?.dkgOptions?.network) {
                              throw new Error('[swtr-veramo-plugin]: dkgOptions is required')
                          }

                          // instantiate dkg-threshold client, in which case lit-protocol is used
                          const lit = await LitProtocol.create({
                              chain: topArgs?.dkgOptions?.chain,
                              litNetwork: topArgs?.dkgOptions?.network
                          })

                          // construct access control conditions and payment conditions tuple
                          const unifiedAccessControlConditionsTuple = publishedList.metadata.encrypted
                              ? (await (async function () {
                                  // define payment conditions, give precedence to top-level args
                                  const paymentConditions = topArgs?.paymentConditions || publishedList.metadata.paymentConditions!

                                  // return access control conditions and payment conditions tuple
                                  return [
                                      await Promise.all(paymentConditions.map(async (condition) => {
                                          switch (condition.type) {
                                              case AccessControlConditionTypes.timelockPayment:
                                                  return await LitProtocol.generateCosmosAccessControlConditionInverseTimelock({
                                                          key: '$.tx_responses.*.timestamp',
                                                          comparator: '<=',
                                                          value: `${condition.intervalInSeconds}`,
                                                      },
                                                      condition.feePaymentAmount,
                                                      condition.feePaymentAddress,
                                                      condition?.blockHeight,
                                                      topArgs?.dkgOptions?.chain
                                                  )
                                              default:
                                                  throw new Error(`[swtr-veramo-plugin]: unsupported access control condition type ${condition.type}`)
                                          }
                                      })),
                                      paymentConditions
                                  ] satisfies [CosmosAccessControlCondition[], PaymentCondition[]]
                              }()))
                              : (await (async function () {
                                  // validate paymentConditions
                                  if (!topArgs?.paymentConditions) {
                                      throw new Error('[swtr-veramo-plugin]: paymentConditions is required')
                                  }

                                  // return access control conditions and payment conditions tuple
                                  return [
                                      await Promise.all(topArgs.paymentConditions.map(async (condition) => {
                                          switch (condition.type) {
                                              case AccessControlConditionTypes.timelockPayment:
                                                  return await LitProtocol.generateCosmosAccessControlConditionInverseTimelock({
                                                          key: '$.tx_responses.*.timestamp',
                                                          comparator: '<=',
                                                          value: `${condition.intervalInSeconds}`,
                                                      },
                                                      condition.feePaymentAmount,
                                                      condition.feePaymentAddress,
                                                      condition?.blockHeight
                                                  )
                                              default:
                                                  throw new Error(`[swtr-veramo-plugin]: unsupported access control condition type ${condition.type}`)
                                          }
                                      })),
                                      topArgs.paymentConditions
                                  ] satisfies [CosmosAccessControlCondition[], PaymentCondition[]]
                              }()))

                          // encrypt bitstring
                          const { encryptedString, encryptedSymmetricKey, symmetricKey } = await lit.encrypt(bitstring, unifiedAccessControlConditionsTuple[0], true)

                          // define status list content
                          const content = {
                              StatusList2021: {
                                  statusPurpose: publishedList.StatusList2021.statusPurpose,
                                  encodedList: await blobToHexString(encryptedString),
                                  validFrom: publishedList.StatusList2021.validFrom,
                                  validUntil: options?.publishOptions?.statusListValidUntil || publishedList.StatusList2021.validUntil
                              },
                              metadata: {
                                  type: publishedList.metadata.type,
                                  encrypted: true,
                                  encoding: (options?.publishOptions?.statusListEncoding as DefaultStatusList2021Encoding | undefined) || publishedList.metadata.encoding,
                                  encryptedSymmetricKey,
                                  paymentConditions: unifiedAccessControlConditionsTuple[1]
                              }
                          } satisfies StatusList2021Suspension

                          // return tuple of publish result and encryption relevant metadata
                          return [
                              await SwisstronikPlugin.publishStatusList2021(fromString(JSON.stringify(content), 'utf-8'), statusListMetadata, options?.publishOptions),
                              { encryptedString, encryptedSymmetricKey, symmetricKey: toString(symmetricKey!, 'hex') }
                          ]
                      }())
                      : (await async function () {
                          // validate encoding, if provided
                          if (options?.publishOptions?.statusListEncoding && !Object.values(DefaultStatusList2021Encodings).includes(options?.publishOptions?.statusListEncoding)) {
                              throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list encoding')
                          }

                          // validate validUntil, if provided
                          if (options?.publishOptions?.statusListValidUntil) {
                              // validate validUntil as string
                              if (typeof options?.publishOptions?.statusListValidUntil !== 'string') throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list validUntil (must be string)')

                              // validate validUntil as date
                              if (isNaN(Date.parse(options?.publishOptions?.statusListValidUntil))) throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list validUntil (must be date)')

                              // validate validUntil as future date
                              if (new Date(options?.publishOptions?.statusListValidUntil) < new Date()) throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list validUntil (must be future date)')

                              // validate validUntil towards validFrom
                              if (new Date(options?.publishOptions?.statusListValidUntil) <= new Date(publishedList.StatusList2021.validFrom)) throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list validUntil (must be after validFrom)')
                          }

                          // define status list content
                          const content = {
                              StatusList2021: {
                                  statusPurpose: publishedList.StatusList2021.statusPurpose,
                                  encodedList: publishedList.metadata.encoding === 'base64url' ? bitstring : toString(fromString(bitstring, 'base64url'), options!.publishOptions.statusListEncoding as DefaultStatusList2021Encoding),
                                  validFrom: publishedList.StatusList2021.validFrom,
                                  validUntil: options?.publishOptions?.statusListValidUntil || publishedList.StatusList2021.validUntil
                              },
                              metadata: {
                                  type: publishedList.metadata.type,
                                  encoding: (options?.publishOptions?.statusListEncoding as DefaultStatusList2021Encoding | undefined) || publishedList.metadata.encoding,
                                  encrypted: false,
                              }
                          } satisfies StatusList2021Suspension

                          // return tuple of publish result and encryption relevant metadata
                          return [
                              await SwisstronikPlugin.publishStatusList2021(fromString(JSON.stringify(content), 'utf-8'), statusListMetadata, options?.publishOptions),
                              undefined
                          ]
                      }())

                  // early exit, if publish failed
                  if (!scoped[0]) throw new Error('[swtr-veramo-plugin]: suspension: Failed to publish status list 2021')

                  // return publish result
                  return scoped
              }())
              : undefined

          return {
              suspended: true,
              published: topArgs?.publish ? true : undefined,
              statusList: topArgs?.returnUpdatedStatusList ? await SwisstronikPlugin.fetchStatusList2021(credential) as StatusList2021Suspension : undefined,
              symmetricKey: topArgs?.returnSymmetricKey ? (published?.[1] as { symmetricKey: string })?.symmetricKey : undefined,
              resourceMetadata: topArgs?.returnStatusListMetadata ? await SwisstronikPlugin.fetchStatusList2021Metadata(credential) : undefined
          } satisfies SuspensionResult
      } catch (error) {
          // silent fail + early exit
          console.error(error)

          return { suspended: false, error: error as IError } satisfies SuspensionResult
      }
  }

  static async suspendCredentials(credentials: VerifiableCredential[], options?: ISwisstronikStatusList2021Options): Promise<BulkSuspensionResult> {
      // validate credentials - case: empty
      if (!credentials.length || credentials.length === 0) throw new Error('[swtr-veramo-plugin]: suspension: No credentials provided')

      // validate credentials - case: consistent issuer
      if (credentials.map((credential) => {
          return ((credential.issuer as { id: string }).id)
              ? (credential.issuer as { id: string }).id
              : credential.issuer as string
      }).filter((value, _, self) => value && value !== self[0]).length > 0) throw new Error('[swtr-veramo-plugin]: suspension: Credentials must be issued by the same issuer')

      // validate credentials - case: status list index
      if (credentials.map((credential) => credential.credentialStatus!.statusListIndex).filter((value, index, self) => self.indexOf(value) !== index).length > 0) throw new Error('[swtr-veramo-plugin]: suspension: Credentials must have unique status list index')

      // validate credentials - case: status purpose
      if (!credentials.every((credential) => credential.credentialStatus?.statusPurpose === 'suspension')) throw new Error('[swtr-veramo-plugin]: suspension: Invalid status purpose')

      // validate credentials - case: status list id
      const remote = credentials[0].credentialStatus?.id
          ? (credentials[0].credentialStatus as { id: string }).id.split('#')[0]
          : (function(){
              throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list id')
          }())

      // validate credentials - case: status list id format
      if (!RemoteListPattern.test(remote)) throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list id format: expected: https://<optional_subdomain>.<sld>.<tld>/1.0/identifiers/<did:swtr:<method_specific_id>>?resourceName=<resource_name>&resourceType=<resource_type>')

      if (!credentials.every((credential) => {
          return (credential.credentialStatus as { id: string }).id.split('#')[0] === remote
      })) throw new Error('[swtr-veramo-plugin]: suspension: Credentials must belong to the same status list')

      // validate credentials - case: status list type
      if (!credentials.every((credential) => credential.credentialStatus?.type === 'StatusList2021Entry')) throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list type')

      try {
          // fetch status list 2021
          const publishedList = (await SwisstronikPlugin.fetchStatusList2021(credentials[0])) as StatusList2021Suspension

          // early return, if encrypted and no decryption key provided
          if (publishedList.metadata.encrypted && !options?.topArgs?.symmetricKey) throw new Error('[swtr-veramo-plugin]: suspension: symmetricKey is required, if status list 2021 is encrypted')

          // fetch status list 2021 inscribed in credential
          const statusList2021 = options?.topArgs?.fetchList 
              ? (await async function () {
                  // if not encrypted, return bitstring
                  if (!publishedList.metadata.encrypted)
                      return publishedList.metadata.encoding === 'base64url'
                          ? publishedList.StatusList2021.encodedList
                          : toString(fromString(publishedList.StatusList2021.encodedList, publishedList.metadata.encoding as DefaultStatusList2021Encoding), 'base64url')

                  // otherwise, decrypt and return raw bitstring
                  const scopedRawBlob = await toBlob(fromString(publishedList.StatusList2021.encodedList, 'hex'))

                  // decrypt
                  return await LitProtocol.decryptDirect(scopedRawBlob, fromString(options?.topArgs?.symmetricKey, 'hex'))
              }())
              : (await async function () {
                  // transcode to base64url, if needed
                  const publishedListTranscoded = publishedList.metadata.encoding === 'base64url'
                      ? publishedList.StatusList2021.encodedList
                      : toString(fromString(publishedList.StatusList2021.encodedList, publishedList.metadata.encoding as DefaultStatusList2021Encoding), 'base64url')

                  // if status list 2021 is not fetched, read from file
                  if (options?.statusListFile) {
                      // if not encrypted, return bitstring
                      if (!publishedList.metadata.encrypted) {
                          // construct encoded status list
                          const encoded = new StatusList({ buffer: await SwisstronikPlugin.getFile(options.statusListFile) }).encode() as Bitstring

                          // validate against published list
                          if (encoded !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: suspension: statusListFile does not match published status list 2021')

                          // return encoded
                          return encoded
                      }

                      // otherwise, decrypt and return bitstring
                      const scopedRawBlob = await toBlob(await SwisstronikPlugin.getFile(options.statusListFile))

                      // decrypt
                      const decrypted = await LitProtocol.decryptDirect(scopedRawBlob, fromString(options?.topArgs?.symmetricKey, 'hex'))

                      // validate against published list
                      if (decrypted !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: suspension: statusListFile does not match published status list 2021')

                      // return decrypted
                      return decrypted
                  }

                  if (!options?.statusListInlineBitstring) throw new Error('[swtr-veramo-plugin]: suspension: statusListInlineBitstring is required, if statusListFile is not provided')

                  // validate against published list
                  if (options?.statusListInlineBitstring !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: suspension: statusListInlineBitstring does not match published status list 2021')

                  // otherwise, read from inline bitstring
                  return options?.statusListInlineBitstring
              }())

          // parse status list 2021
          const statusList = await StatusList.decode({ encodedList: statusList2021 })

          // initiate bulk suspension
          const suspended = await Promise.allSettled(credentials.map((credential) => {
              return async function () {
                  // early return, if no credential status
                  if (!credential.credentialStatus) return { suspended: false }

                  // early exit, if credential is already suspended
                  if (statusList.getStatus(Number(credential.credentialStatus.statusListIndex))) return { suspended: false }

                  // update suspension status
                  statusList.setStatus(Number(credential.credentialStatus.statusListIndex), true)

                  // return suspension status
                  return { suspended: true }
              }()
          })) satisfies PromiseSettledResult<SuspensionResult>[]

          // revert bulk ops, if some failed
          if (suspended.some((result) => result.status === 'fulfilled' && !result.value.suspended )) 
              throw new Error(`[swtr-veramo-plugin]: suspension: Bulk suspension failed: already suspended credentials in suspension bundle: raw log: ${JSON.stringify(suspended.map((result) => ({ suspended: result.status === 'fulfilled' ? result.value.suspended : false })))}`)

          // set in-memory status list ref
          const bitstring = await statusList.encode() as Bitstring

          // cast top-level args
          const topArgs = options?.topArgs as ISwisstronikRevokeCredentialWithStatusList2021Args

          // write status list 2021 to file, if provided
          if (topArgs?.writeToFile) {
              await SwisstronikPlugin.writeFile(fromString(bitstring, 'base64url'), options?.statusListFile)
          }

          // publish status list 2021, if provided
          const published = topArgs?.publish
              ? (await async function () {
                  // fetch status list 2021 metadata
                  const statusListMetadata = await SwisstronikPlugin.fetchStatusList2021Metadata(credentials[0])

                  // publish status list 2021 as new version
                  const scoped = topArgs.publishEncrypted
                      ? (await async function () {
                          // validate encoding, if provided
                          if (options?.publishOptions?.statusListEncoding && !Object.values(DefaultStatusList2021Encodings).includes(options?.publishOptions?.statusListEncoding)) {
                              throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list encoding')
                          }

                          // validate validUntil, if provided
                          if (options?.publishOptions?.statusListValidUntil) {
                              // validate validUntil as string
                              if (typeof options?.publishOptions?.statusListValidUntil !== 'string') throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list validUntil (must be string)')

                              // validate validUntil as date
                              if (isNaN(Date.parse(options?.publishOptions?.statusListValidUntil))) throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list validUntil (must be date)')

                              // validate validUntil as future date
                              if (new Date(options?.publishOptions?.statusListValidUntil) < new Date()) throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list validUntil (must be future date)')

                              // validate validUntil towards validFrom
                              if (new Date(options?.publishOptions?.statusListValidUntil) <= new Date(publishedList.StatusList2021.validFrom)) throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list validUntil (must be after validFrom)')
                          }

                          // validate paymentConditions, if provided
                          if (topArgs?.paymentConditions) {
                              if (!topArgs?.paymentConditions?.every((condition) => condition.feePaymentAddress && condition.feePaymentAmount && condition.intervalInSeconds)) {
                                  throw new Error('[swtr-veramo-plugin]: paymentConditions must contain feePaymentAddress and feeAmount and intervalInSeconds')
                              }

                              if (!topArgs?.paymentConditions?.every((condition) => typeof condition.feePaymentAddress === 'string' && typeof condition.feePaymentAmount === 'string' && typeof condition.intervalInSeconds === 'number')) {
                                  throw new Error('[swtr-veramo-plugin]: feePaymentAddress and feePaymentAmount must be string and intervalInSeconds must be number')
                              }

                              if (!topArgs?.paymentConditions?.every((condition) => condition.type === AccessControlConditionTypes.timelockPayment)) {
                                  throw new Error('[swtr-veramo-plugin]: paymentConditions must be of type timelockPayment')
                              }
                          }

                          // validate dkgOptions
                          if (!topArgs?.dkgOptions || !topArgs?.dkgOptions?.chain || !topArgs?.dkgOptions?.network) {
                              throw new Error('[swtr-veramo-plugin]: dkgOptions is required')
                          }

                          // instantiate dkg-threshold client, in which case lit-protocol is used
                          const lit = await LitProtocol.create({
                              chain: topArgs?.dkgOptions?.chain,
                              litNetwork: topArgs?.dkgOptions?.network
                          })

                          // construct access control conditions and payment conditions tuple
                          const unifiedAccessControlConditionsTuple = publishedList.metadata.encrypted
                              ? (await (async function () {
                                  // define payment conditions, give precedence to top-level args
                                  const paymentConditions = topArgs?.paymentConditions || publishedList.metadata.paymentConditions!

                                  // return access control conditions and payment conditions tuple
                                  return [
                                      await Promise.all(paymentConditions.map(async (condition) => {
                                          switch (condition.type) {
                                              case AccessControlConditionTypes.timelockPayment:
                                                  return await LitProtocol.generateCosmosAccessControlConditionInverseTimelock({
                                                          key: '$.tx_responses.*.timestamp',
                                                          comparator: '<=',
                                                          value: `${condition.intervalInSeconds}`,
                                                      },
                                                      condition.feePaymentAmount,
                                                      condition.feePaymentAddress,
                                                      condition?.blockHeight,
                                                      topArgs?.dkgOptions?.chain
                                                  )
                                              default:
                                                  throw new Error(`[swtr-veramo-plugin]: unsupported access control condition type ${condition.type}`)
                                          }
                                      })),
                                      paymentConditions
                                  ] satisfies [CosmosAccessControlCondition[], PaymentCondition[]]
                              }()))
                              : (await (async function () {
                                  // validate paymentConditions
                                  if (!topArgs?.paymentConditions) {
                                      throw new Error('[swtr-veramo-plugin]: paymentConditions is required')
                                  }

                                  // return access control conditions and payment conditions tuple
                                  return [
                                      await Promise.all(topArgs.paymentConditions.map(async (condition) => {
                                          switch (condition.type) {
                                              case AccessControlConditionTypes.timelockPayment:
                                                  return await LitProtocol.generateCosmosAccessControlConditionInverseTimelock({
                                                          key: '$.tx_responses.*.timestamp',
                                                          comparator: '<=',
                                                          value: `${condition.intervalInSeconds}`,
                                                      },
                                                      condition.feePaymentAmount,
                                                      condition.feePaymentAddress,
                                                      condition?.blockHeight
                                                  )
                                              default:
                                                  throw new Error(`[swtr-veramo-plugin]: unsupported access control condition type ${condition.type}`)
                                          }
                                      })),
                                      topArgs.paymentConditions
                                  ] satisfies [CosmosAccessControlCondition[], PaymentCondition[]]
                              }()))

                          // encrypt bitstring
                          const { encryptedString, encryptedSymmetricKey, symmetricKey } = await lit.encrypt(bitstring, unifiedAccessControlConditionsTuple[0], true)

                          // define status list content
                          const content = {
                              StatusList2021: {
                                  statusPurpose: publishedList.StatusList2021.statusPurpose,
                                  encodedList: await blobToHexString(encryptedString),
                                  validFrom: publishedList.StatusList2021.validFrom,
                                  validUntil: options?.publishOptions?.statusListValidUntil || publishedList.StatusList2021.validUntil
                              },
                              metadata: {
                                  type: publishedList.metadata.type,
                                  encrypted: true,
                                  encoding: (options?.publishOptions?.statusListEncoding as DefaultStatusList2021Encoding | undefined) || publishedList.metadata.encoding,
                                  encryptedSymmetricKey,
                                  paymentConditions: unifiedAccessControlConditionsTuple[1]
                              }
                          } satisfies StatusList2021Suspension

                          // return tuple of publish result and encryption relevant metadata
                          return [
                              await SwisstronikPlugin.publishStatusList2021(fromString(JSON.stringify(content), 'utf-8'), statusListMetadata, options?.publishOptions),
                              { encryptedString, encryptedSymmetricKey, symmetricKey: toString(symmetricKey!, 'hex') }
                          ]
                      }())
                      : (await async function () {
                          // validate encoding, if provided
                          if (options?.publishOptions?.statusListEncoding && !Object.values(DefaultStatusList2021Encodings).includes(options?.publishOptions?.statusListEncoding)) {
                              throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list encoding')
                          }

                          // validate validUntil, if provided
                          if (options?.publishOptions?.statusListValidUntil) {
                              // validate validUntil as string
                              if (typeof options?.publishOptions?.statusListValidUntil !== 'string') throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list validUntil (must be string)')

                              // validate validUntil as date
                              if (isNaN(Date.parse(options?.publishOptions?.statusListValidUntil))) throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list validUntil (must be date)')

                              // validate validUntil as future date
                              if (new Date(options?.publishOptions?.statusListValidUntil) < new Date()) throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list validUntil (must be future date)')

                              // validate validUntil towards validFrom
                              if (new Date(options?.publishOptions?.statusListValidUntil) <= new Date(publishedList.StatusList2021.validFrom)) throw new Error('[swtr-veramo-plugin]: suspension: Invalid status list validUntil (must be after validFrom)')
                          }

                          // define status list content
                          const content = {
                              StatusList2021: {
                                  statusPurpose: publishedList.StatusList2021.statusPurpose,
                                  encodedList: publishedList.metadata.encoding === 'base64url' ? bitstring : toString(fromString(bitstring, 'base64url'), options!.publishOptions.statusListEncoding as DefaultStatusList2021Encoding),
                                  validFrom: publishedList.StatusList2021.validFrom,
                                  validUntil: options?.publishOptions?.statusListValidUntil || publishedList.StatusList2021.validUntil
                              },
                              metadata: {
                                  type: publishedList.metadata.type,
                                  encoding: (options?.publishOptions?.statusListEncoding as DefaultStatusList2021Encoding | undefined) || publishedList.metadata.encoding,
                                  encrypted: false,
                              }
                          } satisfies StatusList2021Suspension

                          // return tuple of publish result and encryption relevant metadata
                          return [
                              await SwisstronikPlugin.publishStatusList2021(fromString(JSON.stringify(content), 'utf-8'), statusListMetadata, options?.publishOptions),
                              undefined
                          ]
                      }())

                  // early exit, if publish failed
                  if (!scoped[0]) throw new Error('[swtr-veramo-plugin]: suspension: Failed to publish status list 2021')

                  // return publish result
                  return scoped
              }())
              : undefined

          return {
              suspended: suspended.map((result) => result.status === 'fulfilled' ? result.value.suspended : false),
              published: topArgs?.publish ? true : undefined,
              statusList: topArgs?.returnUpdatedStatusList ? await SwisstronikPlugin.fetchStatusList2021(credentials[0]) as StatusList2021Suspension : undefined,
              symmetricKey: topArgs?.returnSymmetricKey ? (published?.[1] as { symmetricKey: string })?.symmetricKey : undefined,
              resourceMetadata: topArgs?.returnStatusListMetadata ? await SwisstronikPlugin.fetchStatusList2021Metadata(credentials[0]) : undefined
          } satisfies BulkSuspensionResult
      } catch (error) {
          // silent fail + early exit
          console.error(error)
          return { suspended: [], error: error as IError } satisfies BulkSuspensionResult
      }
  }

  static async unsuspendCredential(credential: VerifiableCredential, options?: ISwisstronikStatusList2021Options): Promise<UnsuspensionResult> {
      try {
          // validate status purpose
          if (credential?.credentialStatus?.statusPurpose !== 'suspension') throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status purpose')

          // fetch status list 2021
          const publishedList = (await SwisstronikPlugin.fetchStatusList2021(credential)) as StatusList2021Suspension

          // early return, if encrypted and no decryption key provided
          if (publishedList.metadata.encrypted && !options?.topArgs?.symmetricKey) throw new Error('[swtr-veramo-plugin]: unsuspension: symmetricKey is required, if status list 2021 is encrypted')

          // fetch status list 2021 inscribed in credential
          const statusList2021 = options?.topArgs?.fetchList 
              ? (await async function () {
                  // if not encrypted, return bitstring
                  if (!publishedList.metadata.encrypted)
                      return publishedList.metadata.encoding === 'base64url'
                          ? publishedList.StatusList2021.encodedList
                          : toString(fromString(publishedList.StatusList2021.encodedList, publishedList.metadata.encoding as DefaultStatusList2021Encoding), 'base64url')

                  // otherwise, decrypt and return raw bitstring
                  const scopedRawBlob = await toBlob(fromString(publishedList.StatusList2021.encodedList, 'hex'))

                  // decrypt
                  return await LitProtocol.decryptDirect(scopedRawBlob, fromString(options?.topArgs?.symmetricKey, 'hex'))
              }())
              : (await async function () {
                  // transcode to base64url, if needed
                  const publishedListTranscoded = publishedList.metadata.encoding === 'base64url'
                      ? publishedList.StatusList2021.encodedList
                      : toString(fromString(publishedList.StatusList2021.encodedList, publishedList.metadata.encoding as DefaultStatusList2021Encoding), 'base64url')

                  // if status list 2021 is not fetched, read from file
                  if (options?.statusListFile) {
                      // if not encrypted, return bitstring
                      if (!publishedList.metadata.encrypted) {
                          // construct encoded status list
                          const encoded = new StatusList({ buffer: await SwisstronikPlugin.getFile(options.statusListFile) }).encode() as Bitstring

                          // validate against published list
                          if (encoded !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: unsuspension: statusListFile does not match published status list 2021')

                          // return encoded
                          return encoded
                      }

                      // otherwise, decrypt and return bitstring
                      const scopedRawBlob = await toBlob(await SwisstronikPlugin.getFile(options.statusListFile))

                      // decrypt
                      const decrypted = await LitProtocol.decryptDirect(scopedRawBlob, fromString(options?.topArgs?.symmetricKey, 'hex'))

                      // validate against published list
                      if (decrypted !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: unsuspension: statusListFile does not match published status list 2021')

                      // return decrypted
                      return decrypted
                  }

                  if (!options?.statusListInlineBitstring) throw new Error('[swtr-veramo-plugin]: unsuspension: statusListInlineBitstring is required, if statusListFile is not provided')

                  // validate against published list
                  if (options?.statusListInlineBitstring !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: unsuspension: statusListInlineBitstring does not match published status list 2021')

                  // otherwise, read from inline bitstring
                  return options?.statusListInlineBitstring
              }())

          // parse status list 2021
          const statusList = await StatusList.decode({ encodedList: statusList2021 })

          // early exit, if already unsuspended
          if (!statusList.getStatus(Number(credential.credentialStatus.statusListIndex))) return { unsuspended: true } satisfies UnsuspensionResult

          // update suspension status
          statusList.setStatus(Number(credential.credentialStatus.statusListIndex), false)

          // set in-memory status list ref
          const bitstring = await statusList.encode() as Bitstring

          // cast top-level args
          const topArgs = options?.topArgs as ISwisstronikSuspendCredentialWithStatusList2021Args

          // write status list 2021 to file, if provided
          if (topArgs?.writeToFile) {
              await SwisstronikPlugin.writeFile(fromString(bitstring, 'base64url'), options?.statusListFile)
          }

          // publish status list 2021, if provided
          const published = topArgs?.publish
              ? (await async function () {
                  // fetch status list 2021 metadata
                  const statusListMetadata = await SwisstronikPlugin.fetchStatusList2021Metadata(credential)

                  // publish status list 2021 as new version
                  const scoped = topArgs.publishEncrypted
                      ? (await async function () {
                          // validate encoding, if provided
                          if (options?.publishOptions?.statusListEncoding && !Object.values(DefaultStatusList2021Encodings).includes(options?.publishOptions?.statusListEncoding)) {
                              throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list encoding')
                          }

                          // validate validUntil, if provided
                          if (options?.publishOptions?.statusListValidUntil) {
                              // validate validUntil as string
                              if (typeof options?.publishOptions?.statusListValidUntil !== 'string') throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list validUntil (must be string)')

                              // validate validUntil as date
                              if (isNaN(Date.parse(options?.publishOptions?.statusListValidUntil))) throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list validUntil (must be date)')

                              // validate validUntil as future date
                              if (new Date(options?.publishOptions?.statusListValidUntil) < new Date()) throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list validUntil (must be future date)')

                              // validate validUntil towards validFrom
                              if (new Date(options?.publishOptions?.statusListValidUntil) <= new Date(publishedList.StatusList2021.validFrom)) throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list validUntil (must be after validFrom)')
                          }

                          // validate paymentConditions, if provided
                          if (topArgs?.paymentConditions) {
                              if (!topArgs?.paymentConditions?.every((condition) => condition.feePaymentAddress && condition.feePaymentAmount && condition.intervalInSeconds)) {
                                  throw new Error('[swtr-veramo-plugin]: paymentConditions must contain feePaymentAddress and feeAmount and intervalInSeconds')
                              }

                              if (!topArgs?.paymentConditions?.every((condition) => typeof condition.feePaymentAddress === 'string' && typeof condition.feePaymentAmount === 'string' && typeof condition.intervalInSeconds === 'number')) {
                                  throw new Error('[swtr-veramo-plugin]: feePaymentAddress and feePaymentAmount must be string and intervalInSeconds must be number')
                              }

                              if (!topArgs?.paymentConditions?.every((condition) => condition.type === AccessControlConditionTypes.timelockPayment)) {
                                  throw new Error('[swtr-veramo-plugin]: paymentConditions must be of type timelockPayment')
                              }
                          }

                          // validate dkgOptions
                          if (!topArgs?.dkgOptions || !topArgs?.dkgOptions?.chain || !topArgs?.dkgOptions?.network) {
                              throw new Error('[swtr-veramo-plugin]: dkgOptions is required')
                          }

                          // instantiate dkg-threshold client, in which case lit-protocol is used
                          const lit = await LitProtocol.create({
                              chain: topArgs?.dkgOptions?.chain,
                              litNetwork: topArgs?.dkgOptions?.network
                          })

                          // construct access control conditions and payment conditions tuple
                          const unifiedAccessControlConditionsTuple = publishedList.metadata.encrypted
                              ? (await (async function () {
                                  // define payment conditions, give precedence to top-level args
                                  const paymentConditions = topArgs?.paymentConditions || publishedList.metadata.paymentConditions!

                                  // return access control conditions and payment conditions tuple
                                  return [
                                      await Promise.all(paymentConditions.map(async (condition) => {
                                          switch (condition.type) {
                                              case AccessControlConditionTypes.timelockPayment:
                                                  return await LitProtocol.generateCosmosAccessControlConditionInverseTimelock({
                                                          key: '$.tx_responses.*.timestamp',
                                                          comparator: '<=',
                                                          value: `${condition.intervalInSeconds}`,
                                                      },
                                                      condition.feePaymentAmount,
                                                      condition.feePaymentAddress,
                                                      condition?.blockHeight,
                                                      topArgs?.dkgOptions?.chain
                                                  )
                                              default:
                                                  throw new Error(`[swtr-veramo-plugin]: unsupported access control condition type ${condition.type}`)
                                          }
                                      })),
                                      paymentConditions
                                  ] satisfies [CosmosAccessControlCondition[], PaymentCondition[]]
                              }()))
                              : (await (async function () {
                                  // validate paymentConditions
                                  if (!topArgs?.paymentConditions) {
                                      throw new Error('[swtr-veramo-plugin]: paymentConditions is required')
                                  }

                                  // return access control conditions and payment conditions tuple
                                  return [
                                      await Promise.all(topArgs.paymentConditions.map(async (condition) => {
                                          switch (condition.type) {
                                              case AccessControlConditionTypes.timelockPayment:
                                                  return await LitProtocol.generateCosmosAccessControlConditionInverseTimelock({
                                                          key: '$.tx_responses.*.timestamp',
                                                          comparator: '<=',
                                                          value: `${condition.intervalInSeconds}`,
                                                      },
                                                      condition.feePaymentAmount,
                                                      condition.feePaymentAddress,
                                                      condition?.blockHeight
                                                  )
                                              default:
                                                  throw new Error(`[swtr-veramo-plugin]: unsupported access control condition type ${condition.type}`)
                                          }
                                      })),
                                      topArgs.paymentConditions
                                  ] satisfies [CosmosAccessControlCondition[], PaymentCondition[]]
                              }()))

                          // encrypt bitstring
                          const { encryptedString, encryptedSymmetricKey, symmetricKey } = await lit.encrypt(bitstring, unifiedAccessControlConditionsTuple[0], true)

                          // define status list content
                          const content = {
                              StatusList2021: {
                                  statusPurpose: publishedList.StatusList2021.statusPurpose,
                                  encodedList: await blobToHexString(encryptedString),
                                  validFrom: publishedList.StatusList2021.validFrom,
                                  validUntil: options?.publishOptions?.statusListValidUntil || publishedList.StatusList2021.validUntil
                              },
                              metadata: {
                                  type: publishedList.metadata.type,
                                  encrypted: true,
                                  encoding: (options?.publishOptions?.statusListEncoding as DefaultStatusList2021Encoding | undefined) || publishedList.metadata.encoding,
                                  encryptedSymmetricKey,
                                  paymentConditions: unifiedAccessControlConditionsTuple[1]
                              }
                          } satisfies StatusList2021Suspension

                          // return tuple of publish result and encryption relevant metadata
                          return [
                              await SwisstronikPlugin.publishStatusList2021(fromString(JSON.stringify(content), 'utf-8'), statusListMetadata, options?.publishOptions),
                              { encryptedString, encryptedSymmetricKey, symmetricKey: toString(symmetricKey!, 'hex') }
                          ]
                      }())
                      : (await async function () {
                          // validate encoding, if provided
                          if (options?.publishOptions?.statusListEncoding && !Object.values(DefaultStatusList2021Encodings).includes(options?.publishOptions?.statusListEncoding)) {
                              throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list encoding')
                          }

                          // validate validUntil, if provided
                          if (options?.publishOptions?.statusListValidUntil) {
                              // validate validUntil as string
                              if (typeof options?.publishOptions?.statusListValidUntil !== 'string') throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list validUntil (must be string)')

                              // validate validUntil as date
                              if (isNaN(Date.parse(options?.publishOptions?.statusListValidUntil))) throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list validUntil (must be date)')

                              // validate validUntil as future date
                              if (new Date(options?.publishOptions?.statusListValidUntil) < new Date()) throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list validUntil (must be future date)')

                              // validate validUntil towards validFrom
                              if (new Date(options?.publishOptions?.statusListValidUntil) <= new Date(publishedList.StatusList2021.validFrom)) throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list validUntil (must be after validFrom)')
                          }

                          // define status list content
                          const content = {
                              StatusList2021: {
                                  statusPurpose: publishedList.StatusList2021.statusPurpose,
                                  encodedList: publishedList.metadata.encoding === 'base64url' ? bitstring : toString(fromString(bitstring, 'base64url'), options!.publishOptions.statusListEncoding as DefaultStatusList2021Encoding),
                                  validFrom: publishedList.StatusList2021.validFrom,
                                  validUntil: options?.publishOptions?.statusListValidUntil || publishedList.StatusList2021.validUntil
                              },
                              metadata: {
                                  type: publishedList.metadata.type,
                                  encoding: (options?.publishOptions?.statusListEncoding as DefaultStatusList2021Encoding | undefined) || publishedList.metadata.encoding,
                                  encrypted: false,
                              }
                          } satisfies StatusList2021Suspension

                          // return tuple of publish result and encryption relevant metadata
                          return [
                              await SwisstronikPlugin.publishStatusList2021(fromString(JSON.stringify(content), 'utf-8'), statusListMetadata, options?.publishOptions),
                              undefined
                          ]
                      }())

                  // early exit, if publish failed
                  if (!scoped[0]) throw new Error('[swtr-veramo-plugin]: unsuspension: Failed to publish status list 2021')

                  // return publish result
                  return scoped
              }())
              : undefined

          return {
              unsuspended: true,
              published: topArgs?.publish ? true : undefined,
              statusList: topArgs?.returnUpdatedStatusList ? await SwisstronikPlugin.fetchStatusList2021(credential) as StatusList2021Suspension : undefined,
              symmetricKey: topArgs?.returnSymmetricKey ? (published?.[1] as { symmetricKey: string })?.symmetricKey : undefined,
              resourceMetadata: topArgs?.returnStatusListMetadata ? await SwisstronikPlugin.fetchStatusList2021Metadata(credential) : undefined
          } satisfies UnsuspensionResult
      } catch (error) {
          // silent fail + early exit
          console.error(error)

          return { unsuspended: false, error: error as IError } satisfies UnsuspensionResult
      }
  }

  static async unsuspendCredentials(credentials: VerifiableCredential[], options?: ISwisstronikStatusList2021Options): Promise<BulkUnsuspensionResult> {
      // validate credentials - case: empty
      if (!credentials.length || credentials.length === 0) throw new Error('[swtr-veramo-plugin]: unsuspension: No credentials provided')

      // validate credentials - case: consistent issuer
      if (credentials.map((credential) => {
          return ((credential.issuer as { id: string }).id)
              ? (credential.issuer as { id: string }).id
              : credential.issuer as string
      }).filter((value, _, self) => value && value !== self[0]).length > 0) throw new Error('[swtr-veramo-plugin]: unsuspension: Credentials must be issued by the same issuer')

      // validate credentials - case: status list index
      if (credentials.map((credential) => credential.credentialStatus!.statusListIndex).filter((value, index, self) => self.indexOf(value) !== index).length > 0) throw new Error('[swtr-veramo-plugin]: unsuspension: Credentials must have unique status list index')

      // validate credentials - case: status purpose
      if (!credentials.every((credential) => credential.credentialStatus?.statusPurpose === 'suspension')) throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status purpose')

      // validate credentials - case: status list id
      const remote = credentials[0].credentialStatus?.id
          ? (credentials[0].credentialStatus as { id: string }).id.split('#')[0]
          : (function(){
              throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list id')
          }())

      // validate credentials - case: status list id format
      if (!RemoteListPattern.test(remote)) throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list id format: expected: https://<optional_subdomain>.<sld>.<tld>/1.0/identifiers/<did:swtr:<method_specific_id>>?resourceName=<resource_name>&resourceType=<resource_type>')

      if (!credentials.every((credential) => {
          return (credential.credentialStatus as { id: string }).id.split('#')[0] === remote
      })) throw new Error('[swtr-veramo-plugin]: unsuspension: Credentials must belong to the same status list')

      // validate credentials - case: status list type
      if (!credentials.every((credential) => credential.credentialStatus?.type === 'StatusList2021Entry')) throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list type')

      try {
          // fetch status list 2021
          const publishedList = (await SwisstronikPlugin.fetchStatusList2021(credentials[0])) as StatusList2021Suspension

          // early return, if encrypted and no decryption key provided
          if (publishedList.metadata.encrypted && !options?.topArgs?.symmetricKey) throw new Error('[swtr-veramo-plugin]: unsuspension: symmetricKey is required, if status list 2021 is encrypted')

          // fetch status list 2021 inscribed in credential
          const statusList2021 = options?.topArgs?.fetchList 
              ? (await async function () {
                  // if not encrypted, return bitstring
                  if (!publishedList.metadata.encrypted)
                      return publishedList.metadata.encoding === 'base64url'
                          ? publishedList.StatusList2021.encodedList
                          : toString(fromString(publishedList.StatusList2021.encodedList, publishedList.metadata.encoding as DefaultStatusList2021Encoding), 'base64url')

                  // otherwise, decrypt and return raw bitstring
                  const scopedRawBlob = await toBlob(fromString(publishedList.StatusList2021.encodedList, 'hex'))

                  // decrypt
                  return await LitProtocol.decryptDirect(scopedRawBlob, fromString(options?.topArgs?.symmetricKey, 'hex'))
              }())
              : (await async function () {
                  // transcode to base64url, if needed
                  const publishedListTranscoded = publishedList.metadata.encoding === 'base64url'
                      ? publishedList.StatusList2021.encodedList
                      : toString(fromString(publishedList.StatusList2021.encodedList, publishedList.metadata.encoding as DefaultStatusList2021Encoding), 'base64url')

                  // if status list 2021 is not fetched, read from file
                  if (options?.statusListFile) {
                      // if not encrypted, return bitstring
                      if (!publishedList.metadata.encrypted) {
                          // construct encoded status list
                          const encoded = new StatusList({ buffer: await SwisstronikPlugin.getFile(options.statusListFile) }).encode() as Bitstring

                          // validate against published list
                          if (encoded !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: unsuspension: statusListFile does not match published status list 2021')

                          // return encoded
                          return encoded
                      }

                      // otherwise, decrypt and return bitstring
                      const scopedRawBlob = await toBlob(await SwisstronikPlugin.getFile(options.statusListFile))

                      // decrypt
                      const decrypted = await LitProtocol.decryptDirect(scopedRawBlob, fromString(options?.topArgs?.symmetricKey, 'hex'))

                      // validate against published list
                      if (decrypted !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: unsuspension: statusListFile does not match published status list 2021')

                      // return decrypted
                      return decrypted
                  }

                  if (!options?.statusListInlineBitstring) throw new Error('[swtr-veramo-plugin]: unsuspension: statusListInlineBitstring is required, if statusListFile is not provided')

                  // validate against published list
                  if (options?.statusListInlineBitstring !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: unsuspension: statusListInlineBitstring does not match published status list 2021')

                  // otherwise, read from inline bitstring
                  return options?.statusListInlineBitstring
              }())

          // parse status list 2021
          const statusList = await StatusList.decode({ encodedList: statusList2021 })

          // initiate bulk unsuspension
          const unsuspended = await Promise.allSettled(credentials.map((credential) => {
              return async function () {
                  // early return, if no credential status
                  if (!credential.credentialStatus) return { unsuspended: false }

                  // early exit, if credential is already unsuspended
                  if (!statusList.getStatus(Number(credential.credentialStatus.statusListIndex))) return { unsuspended: true }

                  // update unsuspension status
                  statusList.setStatus(Number(credential.credentialStatus.statusListIndex), false)

                  // return unsuspension status
                  return { unsuspended: true }
              }()
          })) satisfies PromiseSettledResult<UnsuspensionResult>[]

          // revert bulk ops, if some failed
          if (unsuspended.some((result) => result.status === 'fulfilled' && !result.value.unsuspended )) 
              throw new Error(`[swtr-veramo-plugin]: unsuspension: Bulk unsuspension failed: already unsuspended credentials in unsuspension bundle: raw log: ${JSON.stringify(unsuspended.map((result) => ({ unsuspended: result.status === 'fulfilled' ? result.value.unsuspended : false })))}`)

          // set in-memory status list ref
          const bitstring = await statusList.encode() as Bitstring

          // cast top-level args
          const topArgs = options?.topArgs as ISwisstronikRevokeCredentialWithStatusList2021Args

          // write status list 2021 to file, if provided
          if (topArgs?.writeToFile) {
              await SwisstronikPlugin.writeFile(fromString(bitstring, 'base64url'), options?.statusListFile)
          }

          // publish status list 2021, if provided
          const published = topArgs?.publish
              ? (await async function () {
                  // fetch status list 2021 metadata
                  const statusListMetadata = await SwisstronikPlugin.fetchStatusList2021Metadata(credentials[0])

                  // publish status list 2021 as new version
                  const scoped = topArgs.publishEncrypted
                      ? (await async function () {
                          // validate encoding, if provided
                          if (options?.publishOptions?.statusListEncoding && !Object.values(DefaultStatusList2021Encodings).includes(options?.publishOptions?.statusListEncoding)) {
                              throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list encoding')
                          }

                          // validate validUntil, if provided
                          if (options?.publishOptions?.statusListValidUntil) {
                              // validate validUntil as string
                              if (typeof options?.publishOptions?.statusListValidUntil !== 'string') throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list validUntil (must be string)')

                              // validate validUntil as date
                              if (isNaN(Date.parse(options?.publishOptions?.statusListValidUntil))) throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list validUntil (must be date)')

                              // validate validUntil as future date
                              if (new Date(options?.publishOptions?.statusListValidUntil) < new Date()) throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list validUntil (must be future date)')

                              // validate validUntil towards validFrom
                              if (new Date(options?.publishOptions?.statusListValidUntil) <= new Date(publishedList.StatusList2021.validFrom)) throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list validUntil (must be after validFrom)')
                          }

                          // validate paymentConditions, if provided
                          if (topArgs?.paymentConditions) {
                              if (!topArgs?.paymentConditions?.every((condition) => condition.feePaymentAddress && condition.feePaymentAmount && condition.intervalInSeconds)) {
                                  throw new Error('[swtr-veramo-plugin]: paymentConditions must contain feePaymentAddress and feeAmount and intervalInSeconds')
                              }

                              if (!topArgs?.paymentConditions?.every((condition) => typeof condition.feePaymentAddress === 'string' && typeof condition.feePaymentAmount === 'string' && typeof condition.intervalInSeconds === 'number')) {
                                  throw new Error('[swtr-veramo-plugin]: feePaymentAddress and feePaymentAmount must be string and intervalInSeconds must be number')
                              }

                              if (!topArgs?.paymentConditions?.every((condition) => condition.type === AccessControlConditionTypes.timelockPayment)) {
                                  throw new Error('[swtr-veramo-plugin]: paymentConditions must be of type timelockPayment')
                              }
                          }

                          // validate dkgOptions
                          if (!topArgs?.dkgOptions || !topArgs?.dkgOptions?.chain || !topArgs?.dkgOptions?.network) {
                              throw new Error('[swtr-veramo-plugin]: dkgOptions is required')
                          }

                          // instantiate dkg-threshold client, in which case lit-protocol is used
                          const lit = await LitProtocol.create({
                              chain: topArgs?.dkgOptions?.chain,
                              litNetwork: topArgs?.dkgOptions?.network
                          })

                          // construct access control conditions and payment conditions tuple
                          const unifiedAccessControlConditionsTuple = publishedList.metadata.encrypted
                              ? (await (async function () {
                                  // define payment conditions, give precedence to top-level args
                                  const paymentConditions = topArgs?.paymentConditions || publishedList.metadata.paymentConditions!

                                  // return access control conditions and payment conditions tuple
                                  return [
                                      await Promise.all(paymentConditions.map(async (condition) => {
                                          switch (condition.type) {
                                              case AccessControlConditionTypes.timelockPayment:
                                                  return await LitProtocol.generateCosmosAccessControlConditionInverseTimelock({
                                                          key: '$.tx_responses.*.timestamp',
                                                          comparator: '<=',
                                                          value: `${condition.intervalInSeconds}`,
                                                      },
                                                      condition.feePaymentAmount,
                                                      condition.feePaymentAddress,
                                                      condition?.blockHeight,
                                                      topArgs?.dkgOptions?.chain
                                                  )
                                              default:
                                                  throw new Error(`[swtr-veramo-plugin]: unsupported access control condition type ${condition.type}`)
                                          }
                                      })),
                                      paymentConditions
                                  ] satisfies [CosmosAccessControlCondition[], PaymentCondition[]]
                              }()))
                              : (await (async function () {
                                  // validate paymentConditions
                                  if (!topArgs?.paymentConditions) {
                                      throw new Error('[swtr-veramo-plugin]: paymentConditions is required')
                                  }

                                  // return access control conditions and payment conditions tuple
                                  return [
                                      await Promise.all(topArgs.paymentConditions.map(async (condition) => {
                                          switch (condition.type) {
                                              case AccessControlConditionTypes.timelockPayment:
                                                  return await LitProtocol.generateCosmosAccessControlConditionInverseTimelock({
                                                          key: '$.tx_responses.*.timestamp',
                                                          comparator: '<=',
                                                          value: `${condition.intervalInSeconds}`,
                                                      },
                                                      condition.feePaymentAmount,
                                                      condition.feePaymentAddress,
                                                      condition?.blockHeight
                                                  )
                                              default:
                                                  throw new Error(`[swtr-veramo-plugin]: unsupported access control condition type ${condition.type}`)
                                          }
                                      })),
                                      topArgs.paymentConditions
                                  ] satisfies [CosmosAccessControlCondition[], PaymentCondition[]]
                              }()))

                          // encrypt bitstring
                          const { encryptedString, encryptedSymmetricKey, symmetricKey } = await lit.encrypt(bitstring, unifiedAccessControlConditionsTuple[0], true)

                          // define status list content
                          const content = {
                              StatusList2021: {
                                  statusPurpose: publishedList.StatusList2021.statusPurpose,
                                  encodedList: await blobToHexString(encryptedString),
                                  validFrom: publishedList.StatusList2021.validFrom,
                                  validUntil: options?.publishOptions?.statusListValidUntil || publishedList.StatusList2021.validUntil
                              },
                              metadata: {
                                  type: publishedList.metadata.type,
                                  encrypted: true,
                                  encoding: (options?.publishOptions?.statusListEncoding as DefaultStatusList2021Encoding | undefined) || publishedList.metadata.encoding,
                                  encryptedSymmetricKey,
                                  paymentConditions: unifiedAccessControlConditionsTuple[1]
                              }
                          } satisfies StatusList2021Suspension

                          // return tuple of publish result and encryption relevant metadata
                          return [
                              await SwisstronikPlugin.publishStatusList2021(fromString(JSON.stringify(content), 'utf-8'), statusListMetadata, options?.publishOptions),
                              { encryptedString, encryptedSymmetricKey, symmetricKey: toString(symmetricKey!, 'hex') }
                          ]
                      }())
                      : (await async function () {
                          // validate encoding, if provided
                          if (options?.publishOptions?.statusListEncoding && !Object.values(DefaultStatusList2021Encodings).includes(options?.publishOptions?.statusListEncoding)) {
                              throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list encoding')
                          }

                          // validate validUntil, if provided
                          if (options?.publishOptions?.statusListValidUntil) {
                              // validate validUntil as string
                              if (typeof options?.publishOptions?.statusListValidUntil !== 'string') throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list validUntil (must be string)')

                              // validate validUntil as date
                              if (isNaN(Date.parse(options?.publishOptions?.statusListValidUntil))) throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list validUntil (must be date)')

                              // validate validUntil as future date
                              if (new Date(options?.publishOptions?.statusListValidUntil) < new Date()) throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list validUntil (must be future date)')

                              // validate validUntil towards validFrom
                              if (new Date(options?.publishOptions?.statusListValidUntil) <= new Date(publishedList.StatusList2021.validFrom)) throw new Error('[swtr-veramo-plugin]: unsuspension: Invalid status list validUntil (must be after validFrom)')
                          }

                          // define status list content
                          const content = {
                              StatusList2021: {
                                  statusPurpose: publishedList.StatusList2021.statusPurpose,
                                  encodedList: publishedList.metadata.encoding === 'base64url' ? bitstring : toString(fromString(bitstring, 'base64url'), options!.publishOptions.statusListEncoding as DefaultStatusList2021Encoding),
                                  validFrom: publishedList.StatusList2021.validFrom,
                                  validUntil: options?.publishOptions?.statusListValidUntil || publishedList.StatusList2021.validUntil
                              },
                              metadata: {
                                  type: publishedList.metadata.type,
                                  encoding: (options?.publishOptions?.statusListEncoding as DefaultStatusList2021Encoding | undefined) || publishedList.metadata.encoding,
                                  encrypted: false,
                              }
                          } satisfies StatusList2021Suspension

                          // return tuple of publish result and encryption relevant metadata
                          return [
                              await SwisstronikPlugin.publishStatusList2021(fromString(JSON.stringify(content), 'utf-8'), statusListMetadata, options?.publishOptions),
                              undefined
                          ]
                      }())

                  // early exit, if publish failed
                  if (!scoped[0]) throw new Error('[swtr-veramo-plugin]: unsuspension: Failed to publish status list 2021')

                  // return publish result
                  return scoped
              }())
              : undefined

          return {
              unsuspended: unsuspended.map((result) => result.status === 'fulfilled' ? result.value.unsuspended : false),
              published: topArgs?.publish ? true : undefined,
              statusList: topArgs?.returnUpdatedStatusList ? await SwisstronikPlugin.fetchStatusList2021(credentials[0]) as StatusList2021Suspension : undefined,
              symmetricKey: topArgs?.returnSymmetricKey ? (published?.[1] as { symmetricKey: string })?.symmetricKey : undefined,
              resourceMetadata: topArgs?.returnStatusListMetadata ? await SwisstronikPlugin.fetchStatusList2021Metadata(credentials[0]) : undefined
          } satisfies BulkUnsuspensionResult
      } catch (error) {
          // silent fail + early exit
          console.error(error)

          return { unsuspended: [], error: error as IError } satisfies BulkUnsuspensionResult
      }
  }

  static async checkRevoked(credential: VerifiableCredential, options: ISwisstronikStatusList2021Options = { fetchList: true }): Promise<boolean> {
      // validate status purpose
      if (credential.credentialStatus?.statusPurpose !== 'revocation') {
          throw new Error(`[swtr-veramo-plugin]: check: revocation: Unsupported status purpose: ${credential.credentialStatus?.statusPurpose}`)
      }

      // fetch status list 2021
      const publishedList = (await SwisstronikPlugin.fetchStatusList2021(credential)) as StatusList2021Revocation

      // fetch status list 2021 inscribed in credential
      const statusList2021 = options?.topArgs?.fetchList
          ? (await async function () {
              // if not encrypted, return bitstring
              if (!publishedList.metadata.encrypted)
                  return publishedList.metadata.encoding === 'base64url'
                      ? publishedList.StatusList2021.encodedList
                      : toString(fromString(publishedList.StatusList2021.encodedList, publishedList.metadata.encoding as DefaultStatusList2021Encoding), 'base64url')

              // otherwise, decrypt and return raw bitstring
              const scopedRawBlob = await toBlob(fromString(publishedList.StatusList2021.encodedList, 'hex'))

              // instantiate dkg-threshold client, in which case lit-protocol is used
              const lit = await LitProtocol.create({
                  chain: options?.topArgs?.dkgOptions?.chain,
                  litNetwork: options?.topArgs?.dkgOptions?.network
              })

              // construct access control conditions
              const unifiedAccessControlConditions = await Promise.all(publishedList.metadata.paymentConditions!.map(async (condition) => {
                  switch (condition.type) {
                      case AccessControlConditionTypes.timelockPayment:
                          return await LitProtocol.generateCosmosAccessControlConditionInverseTimelock({
                                  key: '$.tx_responses.*.timestamp',
                                  comparator: '<=',
                                  value: `${condition.intervalInSeconds}`,
                              },
                              condition.feePaymentAmount,
                              condition.feePaymentAddress,
                              condition?.blockHeight,
                              options?.topArgs?.dkgOptions?.chain
                          )
                      default:
                          throw new Error(`[swtr-veramo-plugin]: unsupported access control condition type ${condition.type}`)
                  }
              }))

              // decrypt
              return await lit.decrypt(scopedRawBlob, publishedList.metadata.encryptedSymmetricKey!, unifiedAccessControlConditions)
          }())
          : (await async function () {
              // transcode to base64url, if needed
              const publishedListTranscoded = publishedList.metadata.encoding === 'base64url'
                  ? publishedList.StatusList2021.encodedList
                  : toString(fromString(publishedList.StatusList2021.encodedList, publishedList.metadata.encoding as DefaultStatusList2021Encoding), 'base64url')

              // if status list 2021 is not fetched, read from file
              if (options?.statusListFile) {
                  // if not encrypted, return bitstring
                  if (!publishedList.metadata.encrypted) {
                      // construct encoded status list
                      const encoded = new StatusList({ buffer: await SwisstronikPlugin.getFile(options.statusListFile) }).encode() as Bitstring

                      // validate against published list
                      if (encoded !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: check: revocation: statusListFile does not match published status list 2021')

                      // return encoded
                      return encoded
                  }

                  // otherwise, decrypt and return bitstring
                  const scopedRawBlob = await toBlob(await SwisstronikPlugin.getFile(options.statusListFile))

                  // decrypt
                  const decrypted = await LitProtocol.decryptDirect(scopedRawBlob, fromString(options?.topArgs?.symmetricKey, 'hex'))

                  // validate against published list
                  if (decrypted !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: check: revocation: statusListFile does not match published status list 2021')

                  // return decrypted
                  return decrypted
              }

              if (!options?.statusListInlineBitstring) throw new Error('[swtr-veramo-plugin]: check: revocation: statusListInlineBitstring is required, if statusListFile is not provided')

              // validate against published list
              if (options?.statusListInlineBitstring !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: check: revocation: statusListInlineBitstring does not match published status list 2021')

              // otherwise, read from inline bitstring
              return options?.statusListInlineBitstring
          }())

      // transcode, if needed
      const transcodedStatusList2021 = publishedList.metadata.encoding === 'base64url'
          ? statusList2021
          : toString(fromString(statusList2021, publishedList.metadata.encoding as DefaultStatusList2021Encoding), 'base64url')

      // parse status list 2021
      const statusList = await StatusList.decode({ encodedList: transcodedStatusList2021 })

      // get status by index
      return !!statusList.getStatus(Number(credential.credentialStatus.statusListIndex))
  }

  static async checkSuspended(credential: VerifiableCredential, options: ISwisstronikStatusList2021Options = { fetchList: true }): Promise<boolean> {
      // validate status purpose
      if (credential.credentialStatus?.statusPurpose !== 'suspension') {
          throw new Error(`[swtr-veramo-plugin]: check: suspension: Unsupported status purpose: ${credential.credentialStatus?.statusPurpose}`)
      }

      // fetch status list 2021
      const publishedList = (await SwisstronikPlugin.fetchStatusList2021(credential)) as StatusList2021Suspension

      // fetch status list 2021 inscribed in credential
      const statusList2021 = options?.topArgs?.fetchList
          ? (await async function () {
              // if not encrypted, return bitstring
              if (!publishedList.metadata.encrypted)
                  return publishedList.metadata.encoding === 'base64url'
                      ? publishedList.StatusList2021.encodedList
                      : toString(fromString(publishedList.StatusList2021.encodedList, publishedList.metadata.encoding as DefaultStatusList2021Encoding), 'base64url')

              // otherwise, decrypt and return bitstring
              const scopedRawBlob = await toBlob(fromString(publishedList.StatusList2021.encodedList, 'hex'))

              // instantiate dkg-threshold client, in which case lit-protocol is used
              const lit = await LitProtocol.create({
                  chain: options?.topArgs?.dkgOptions?.chain,
                  litNetwork: options?.topArgs?.dkgOptions?.network
              })

              // construct access control conditions
              const unifiedAccessControlConditions = await Promise.all(publishedList.metadata.paymentConditions!.map(async (condition) => {
                  switch (condition.type) {
                      case AccessControlConditionTypes.timelockPayment:
                          return await LitProtocol.generateCosmosAccessControlConditionInverseTimelock({
                                  key: '$.tx_responses.*.timestamp',
                                  comparator: '<=',
                                  value: `${condition.intervalInSeconds}`,
                              },
                              condition.feePaymentAmount,
                              condition.feePaymentAddress,
                              condition?.blockHeight,
                              options?.topArgs?.dkgOptions?.chain
                          )
                      default:
                          throw new Error(`[swtr-veramo-plugin]: unsupported access control condition type ${condition.type}`)
                  }
              }))

              // decrypt
              return await lit.decrypt(scopedRawBlob, publishedList.metadata.encryptedSymmetricKey!, unifiedAccessControlConditions)
          }())
          : (await async function () {
              // transcode to base64url, if needed
              const publishedListTranscoded = publishedList.metadata.encoding === 'base64url'
              ? publishedList.StatusList2021.encodedList
              : toString(fromString(publishedList.StatusList2021.encodedList, publishedList.metadata.encoding as DefaultStatusList2021Encoding), 'base64url')

              // if status list 2021 is not fetched, read from file
              if (options?.statusListFile) {
                  // if not encrypted, return bitstring
                  if (!publishedList.metadata.encrypted) {
                      // construct encoded status list
                      const encoded = new StatusList({ buffer: await SwisstronikPlugin.getFile(options.statusListFile) }).encode() as Bitstring

                      // validate against published list
                      if (encoded !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: check: suspension: statusListFile does not match published status list 2021')

                      // return encoded
                      return encoded
                  }

                  // otherwise, decrypt and return bitstring
                  const scopedRawBlob = await toBlob(await SwisstronikPlugin.getFile(options.statusListFile))

                  // decrypt
                  const decrypted = await LitProtocol.decryptDirect(scopedRawBlob, fromString(options?.topArgs?.symmetricKey, 'hex'))

                  // validate against published list
                  if (decrypted !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: check: suspension: statusListFile does not match published status list 2021')

                  // return decrypted
                  return decrypted
              }

              if (!options?.statusListInlineBitstring) throw new Error('[swtr-veramo-plugin]: check: suspension: statusListInlineBitstring is required, if statusListFile is not provided')

              // validate against published list
              if (options?.statusListInlineBitstring !== publishedListTranscoded) throw new Error('[swtr-veramo-plugin]: check: suspension: statusListInlineBitstring does not match published status list 2021')

              // otherwise, read from inline bitstring
              return options?.statusListInlineBitstring
          }())

      // parse status list 2021
      const statusList = await StatusList.decode({ encodedList: statusList2021 })

      // get status by index
      return !!statusList.getStatus(Number(credential.credentialStatus.statusListIndex))
  }

  static async publishStatusList2021(statusList2021Raw: Uint8Array, statusList2021Metadata: LinkedResourceMetadataResolutionResult, options: { context: IContext, resourceId?: string, resourceVersion?: string, resourceAlsoKnownAs?: AlternativeUri[], signInputs?: ISignInputs[], fee?: DidStdFee }): Promise<boolean> {
      // construct status list 2021 payload from previous version + new version
      const payload = {
          collectionId: statusList2021Metadata.resourceCollectionId,
          id: options?.resourceId || v4(),
          name: statusList2021Metadata.resourceName,
          version: options?.resourceVersion || new Date().toISOString(),
          alsoKnownAs: options?.resourceAlsoKnownAs || [],
          resourceType: statusList2021Metadata.resourceType as DefaultStatusList2021ResourceType,
          data: statusList2021Raw
      } satisfies StatusList2021ResourcePayload

      return await options.context.agent[BroadcastStatusList2021MethodName]({
          kms: (await options.context.agent.keyManagerGetKeyManagementSystems())[0],
          payload,
          signInputs: options?.signInputs,
          fee: options?.fee
      })
  }

  static async fetchStatusList2021(credential: VerifiableCredential, returnRaw = false): Promise<StatusList2021Revocation | StatusList2021Suspension | Uint8Array> {
      // validate credential status
      if (!credential.credentialStatus) throw new Error('[swtr-veramo-plugin]: fetch status list: Credential status is not present')

      // validate credential status type
      if (credential.credentialStatus.type !== 'StatusList2021Entry') throw new Error('[swtr-veramo-plugin]: fetch status list: Credential status type is not valid')

      // validate credential status list status purpose
      if (credential.credentialStatus.statusPurpose !== 'revocation' && credential.credentialStatus.statusPurpose !== 'suspension') throw new Error('[swtr-veramo-plugin]: fetch status list: Credential status purpose is not valid')

      // fetch status list 2021
      const content = await (await fetch(credential.credentialStatus.id.split('#')[0])).json() as StatusList2021Revocation | StatusList2021Suspension

      if (!(content.StatusList2021 && content.metadata && content.StatusList2021.encodedList && content.StatusList2021.statusPurpose && content.metadata.encoding)) {
          throw new Error(`'[swtr-veramo-plugin]: fetch status list: Status List resource content is not valid'`)
      }

      // return raw if requested
      if (returnRaw) {
          return fromString(content.StatusList2021.encodedList, content.metadata.encoding as DefaultStatusList2021Encoding)
      }

      // otherwise, return content
      return content
  }

  static async fetchStatusList2021Metadata(credential: VerifiableCredential): Promise<LinkedResourceMetadataResolutionResult> {
      // get base url
      const baseUrl = new URL(credential.credentialStatus!.id.split('#')[0])

      // get resource name
      const resourceName = baseUrl.searchParams.get('resourceName')

      // get resource type
      const resourceType = baseUrl.searchParams.get('resourceType')

      // unset resource name
      baseUrl.searchParams.delete('resourceName')

      // unset resource type
      baseUrl.searchParams.delete('resourceType')

      // construct metadata url
      const metadataUrl = `${baseUrl.toString()}/metadata`

      // fetch collection metadata
      const collectionMetadata = await (await fetch(metadataUrl)).json() as DIDMetadataDereferencingResult

      // early exit if no linked resources
      if (!collectionMetadata?.contentStream?.linkedResourceMetadata) throw new Error('[swtr-veramo-plugin]: fetch status list metadata: No linked resources found')

      // find relevant resources by resource name
      const resourceVersioning = collectionMetadata.contentStream.linkedResourceMetadata.filter((resource) => resource.resourceName === resourceName && resource.resourceType === resourceType)

      // early exit if no relevant resources
      if (!resourceVersioning.length || resourceVersioning.length === 0) throw new Error(`[swtr-veramo-plugin]: fetch status list metadata: No relevant resources found by resource name ${resourceName}`)

      // get latest resource version by nextVersionId null pointer, or by latest created date as fallback
      return resourceVersioning.find((resource) => !resource.nextVersionId) || resourceVersioning.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())[0]
  }

  static async loadProvider(didUrl: string, providers: SwisstronikDIDProvider[]): Promise<SwisstronikDIDProvider> {
      const provider = providers.find((provider) => didUrl.includes(`${DIDPrefix}:${SwisstronikDIDMethod}`))
      if (!provider) {
          throw new Error(`[swtr-veramo-plugin]: Provider namespace not found`)
      }
      return provider
  }

  static generateProviderId(): string {
      return `${DIDPrefix}:${SwisstronikDIDMethod}`
  }

  static async getFile(filename: string): Promise<Uint8Array> {
      if (typeof filename !== 'string') {
          throw new Error('[swtr-veramo-plugin]: filename is required')
      }

      if (!fs.existsSync(filename)) {
          console.warn(`[swtr-veramo-plugin]: File ${filename} not found`)
          throw new Error(`[swtr-veramo-plugin]: File ${filename} not found`)
      }

      return new Promise((resolve, reject) => {
          const content = fs.readFileSync(filename)
          if (!content) {
              reject(new Error(`[swtr-veramo-plugin]: File ${filename} is empty`))
          }
          resolve(new Uint8Array(content))
      })
  }

  static async writeFile(content: Uint8Array, filename?: string): Promise<void> {
      if (!filename) {
          filename = `statusList2021-${v4()}`
      }

      // alert if file exists
      if (fs.existsSync(filename)) {
          console.warn(`[swtr-veramo-plugin]: File ${filename} already exists`)
          console.warn(`[swtr-veramo-plugin]: File ${filename} already exists. Overwriting...`)
      }

      return new Promise((resolve, reject) => {
          fs.writeFile(filename!, content, (err) => {
              if (err) {
                  reject(new Error(`[swtr-veramo-plugin]: Error writing file ${filename}: reason: ${err}`))
              }
              resolve()
          })
      })
  }

  static async decodeCredentialJWT(jwt: string): Promise<VerifiableCredential> {
      const decodedCredential = decodeJWT(jwt)

      // validate credential payload
      if (!decodedCredential.payload) throw new Error('[swtr-veramo-plugin]: decode jwt: decodedCredential.payload is required')

      // validate credential payload vc property as VerifiableCredential
      if (!decodedCredential.payload.vc) throw new Error('[swtr-veramo-plugin]: decode jwt: decodedCredential.payload.vc is required')

      return {
          ...decodedCredential.payload.vc,
          issuer: decodedCredential.payload.iss,
      } satisfies VerifiableCredential
  }
}