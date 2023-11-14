/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, @typescript-eslint/no-non-null-assertion */
// any is used for extensibility
// unused vars are kept by convention
// non-null assertion is used when we know better than the compiler that the value is not null or undefined
import {
  DidStdFee,
  ISignInputs,
  MethodSpecificIdAlgo,
  VerificationMethods,
  DIDDocumentExternal
} from '@swisstronik/sdk'
import {
  Coin,
  DeliverTxResponse
} from '@cosmjs/stargate'
import {
  IAgentContext,
  IKeyManager,
  IPluginMethodMap,
  IIdentifier,
  VerifiableCredential,
  IVerifyCredentialArgs,
  IVerifyResult,
  VerifiablePresentation,
  IVerifyPresentationArgs,
  IError,
  ICreateVerifiableCredentialArgs,
  ICredentialIssuer,
  IDIDManager,
  IDataStore,
  IResolver,
  W3CVerifiableCredential,
  ICredentialVerifier,
} from '@veramo/core'
import {
  LinkedResource,
  TImportableEd25519Key,
  ResourcePayload,
  StatusList2021ResourcePayload,
  DefaultStatusList2021ResourceTypes,
  DefaultStatusList2021StatusPurposeTypes,
  DefaultStatusList2021Encoding,
  DefaultStatusList2021StatusPurposeType,
} from '../did-manager/didProvider'
import {
  CosmosAccessControlCondition,
  LitCompatibleCosmosChain,
  LitNetwork,
} from '../dkg-threshold/litProtocol.js';

export type IContext = IAgentContext<IDIDManager & IKeyManager & IDataStore & IResolver & ICredentialIssuer & ICredentialVerifier & ISwisstronikPlugin>
export type TExportedDIDDocWithKeys = { didDoc: DIDDocumentExternal, keys: TImportableEd25519Key[], versionId?: string }
export type TExportedDIDDocWithLinkedResourceWithKeys = TExportedDIDDocWithKeys & { linkedResource: LinkedResource }
export type LinkedResourceMetadataResolutionResult = { resourceURI: string, resourceCollectionId: string, resourceId: string, resourceName: string, resourceType: string, mediaType: string, resourceVersion?: string, created: string, checksum: string, previousVersionId: string | null, nextVersionId: string | null }
export type DIDMetadataDereferencingResult = { '@context': 'https://w3id.org/did-resolution/v1', dereferencingMetadata: { contentType: string, error?: string, retrieved: string, did: { didString: string, methodSpecificId: string, method: string } }, contentStream: { created: string, versionId: string, linkedResourceMetadata: LinkedResourceMetadataResolutionResult[] }, contentMetadata: Record<string, any> }
export type ShallowTypedTx = { body: { messages: any[], memo: string, timeout_height: string, extension_options: any[], non_critical_extension_options: any[] }, auth_info: { signer_infos: { public_key: { '@type': string, key: string }, mode_info: { single: { mode: string } }, sequence: string }[], fee: { amount: Coin[], gas_limit: string, payer: string, granter: string }, tip: any | null }, signatures: string[] }
export type ShallowTypedTxTxResponses = { height: string, txhash: string, codespace: string, code: number, data: string, raw_log: string, logs: any[], info: string, gas_wanted: string, gas_used: string, tx: ShallowTypedTx, timestamp: string, events: any[] }
export type ShallowTypedTxsResponse = { txs: ShallowTypedTx[], tx_responses: ShallowTypedTxTxResponses[], pagination: string | null, total: string } | undefined
export type BlockResponse = { block_id: BlockID, block: Block, sdk_block: Block}
export type Block = { header: Header, data: Data, evidence: Evidence, last_commit: LastCommit }
export type Data = { txs: any[] }
export type Evidence = { evidence: any[] }
export type Header = { version: Version, chain_id: string, height: string, time: string, last_block_id: BlockID, last_commit_hash: string, data_hash: string, validators_hash: string, next_validators_hash: string, consensus_hash: string, app_hash: string, last_results_hash: string, evidence_hash: string, proposer_address: string }
export type BlockID = { hash: string, part_set_header: PartSetHeader }
export type PartSetHeader = { total: number, hash: string }
export type Version = { block: string, app: string }
export type LastCommit = { height: string, round: number, block_id: BlockID, signatures: Signature[] }
export type Signature = { block_id_flag: string, validator_address?: string, timestamp: Date, signature?: string }
export type VerificationResult = { verified: boolean, revoked?: boolean, suspended?: boolean, error?: IVerifyResult['error'] }
export type StatusCheckResult = { revoked?: boolean, suspended?: boolean, error?: IError }
export type RevocationResult = { revoked: boolean, error?: IError, statusList?: StatusList2021Revocation, symmetricKey?: string, published?: boolean, resourceMetadata?: LinkedResourceMetadataResolutionResult }
export type BulkRevocationResult = { revoked: boolean[], error?: IError, statusList?: StatusList2021Revocation, symmetricKey?: string, published?: boolean, resourceMetadata?: LinkedResourceMetadataResolutionResult }
export type SuspensionResult = { suspended: boolean, error?: IError, statusList?: StatusList2021Suspension, symmetricKey?: string, published?: boolean, resourceMetadata?: LinkedResourceMetadataResolutionResult }
export type BulkSuspensionResult = { suspended: boolean[], error?: IError, statusList?: StatusList2021Suspension, symmetricKey?: string, published?: boolean, resourceMetadata?: LinkedResourceMetadataResolutionResult }
export type UnsuspensionResult = { unsuspended: boolean, error?: IError, statusList?: StatusList2021Suspension, symmetricKey?: string, published?: boolean, resourceMetadata?: LinkedResourceMetadataResolutionResult }
export type BulkUnsuspensionResult = { unsuspended: boolean[], error?: IError, statusList?: StatusList2021Suspension, symmetricKey?: string, published?: boolean, resourceMetadata?: LinkedResourceMetadataResolutionResult }
export type Bitstring = string
export type StatusList2021Revocation = { StatusList2021: { statusPurpose: typeof DefaultStatusList2021StatusPurposeTypes.revocation, encodedList: string, validFrom: string, validUntil?: string }, metadata: { type: typeof DefaultStatusList2021ResourceTypes.revocation, encrypted: boolean, encoding: DefaultStatusList2021Encoding, encryptedSymmetricKey?: string, paymentConditions?: PaymentCondition[] } }
export type StatusList2021Suspension = { StatusList2021: { statusPurpose: typeof DefaultStatusList2021StatusPurposeTypes.suspension, encodedList: string, validFrom: string, validUntil?: string }, metadata: { type: typeof DefaultStatusList2021ResourceTypes.suspension, encrypted: boolean, encoding: DefaultStatusList2021Encoding, encryptedSymmetricKey?: string, paymentConditions?: PaymentCondition[] } }
export type AccessControlConditionType = typeof AccessControlConditionTypes[keyof typeof AccessControlConditionTypes]
export type AccessControlConditionReturnValueComparator = typeof AccessControlConditionReturnValueComparators[keyof typeof AccessControlConditionReturnValueComparators]
export type PaymentCondition = { feePaymentAddress: string, feePaymentAmount: string, intervalInSeconds: number, blockHeight?: string, type: Extract<AccessControlConditionType, 'timelockPayment'> }
export type DkgOptions = { chain?: Extract<LitCompatibleCosmosChain, 'swisstronik'>, network?: LitNetwork }
export type CreateStatusList2021Result = { created: boolean, error?: Error, resource: StatusList2021Revocation | StatusList2021Suspension, resourceMetadata: LinkedResourceMetadataResolutionResult, encrypted?: boolean, symmetricKey?: string }
export type TransactionResult = { successful: boolean, transactionHash?: string, events?: DeliverTxResponse['events'], rawLog?: string, txResponse?: DeliverTxResponse, error?: IError }
export type ObservationResult = { subscribed: boolean, meetsCondition: boolean, transactionHash?: string, events?: DeliverTxResponse['events'], rawLog?: string, txResponse?: ShallowTypedTxTxResponses, error?: IError }

export const AccessControlConditionTypes = { timelockPayment: 'timelockPayment', memoNonce: 'memoNonce', balance: 'balance' } as const
export const AccessControlConditionReturnValueComparators = { lessThan: '<', greaterThan: '>', equalTo: '=', lessThanOrEqualTo: '<=', greaterThanOrEqualTo: '>=' } as const

export const RemoteListPattern = /^(https:\/\/)?[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,}\/1\.0\/identifiers\/did:swtr:[a-zA-Z0-9-]+\?((resourceName=[^&]*)&(resourceType=[^&]*)|((resourceType=[^&]*)&(resourceName=[^&]*)))$/

export const CreateIdentifierMethodName = 'swisstronikCreateIdentifier'
export const UpdateIdentifierMethodName = 'swisstronikUpdateIdentifier'
export const DeactivateIdentifierMethodName = 'swisstronikDeactivateIdentifier'
export const CreateResourceMethodName = 'swisstronikCreateLinkedResource'
export const CreateStatusList2021MethodName = 'swisstronikCreateStatusList2021'
export const BroadcastStatusList2021MethodName = 'swisstronikBroadcastStatusList2021'
export const GenerateDidDocMethodName = 'swisstronikGenerateDidDoc'
export const GenerateDidDocWithLinkedResourceMethodName = 'swisstronikGenerateDidDocWithLinkedResource'
export const GenerateKeyPairMethodName = 'swisstronikGenerateIdentityKeys'
export const GenerateVersionIdMethodName = 'swisstronikGenerateVersionId'
export const GenerateStatusList2021MethodName = 'swisstronikGenerateStatusList2021'
export const IssueRevocableCredentialWithStatusList2021MethodName = 'swisstronikIssueRevocableCredentialWithStatusList2021'
export const IssueSuspendableCredentialWithStatusList2021MethodName = 'swisstronikIssueSuspendableCredentialWithStatusList2021'
export const VerifyCredentialMethodName = 'swisstronikVerifyCredential'
export const VerifyPresentationMethodName = 'swisstronikVerifyPresentation' 
export const CheckCredentialStatusMethodName = 'swisstronikCheckCredentialStatus' 
export const RevokeCredentialMethodName = 'swisstronikRevokeCredential'
export const RevokeCredentialsMethodName = 'swisstronikRevokeCredentials'
export const SuspendCredentialMethodName = 'swisstronikSuspendCredential'
export const SuspendCredentialsMethodName = 'swisstronikSuspendCredentials'
export const UnsuspendCredentialMethodName = 'swisstronikUnsuspendCredential'
export const UnsuspendCredentialsMethodName = 'swisstronikUnsuspendCredentials'
export const TransactSendTokensMethodName = 'swisstronikTransactSendTokens'
export const ObservePaymentConditionMethodName = 'swisstronikObservePaymentCondition'

export const DIDPrefix = 'did'
export const SwisstronikDIDMethod = 'swtr'

export interface ISwisstronikCreateIdentifierArgs {
  kms: string
  alias: string
  document: DIDDocumentExternal
  keys?: TImportableEd25519Key[]
  versionId?: string
  fee?: DidStdFee
}

export interface ISwisstronikUpdateIdentifierArgs {
  kms: string
  document: DIDDocumentExternal
  keys?: TImportableEd25519Key[]
  versionId?: string
  fee?: DidStdFee
}

export interface ISwisstronikDeactivateIdentifierArgs {
  kms: string
  document: DIDDocumentExternal
  keys?: TImportableEd25519Key[]
  fee?: DidStdFee
}

export interface ISwisstronikCreateLinkedResourceArgs {
  kms: string
  payload: ResourcePayload
  file?: string
  signInputs?: ISignInputs[]
  fee?: DidStdFee
}

export interface ISwisstronikCreateStatusList2021Args {
  kms: string
  issuerDid: string
  statusListName: string
  statusPurpose: DefaultStatusList2021StatusPurposeType
  encrypted: boolean
  paymentConditions?: PaymentCondition[]
  dkgOptions?: DkgOptions
  resourceVersion?: ResourcePayload['version']
  alsoKnownAs?: ResourcePayload['alsoKnownAs']
  statusListLength?: number
  statusListEncoding?: DefaultStatusList2021Encoding
  validUntil?: string
  returnSymmetricKey?: boolean
}

export interface ISwisstronikCreateUnencryptedStatusList2021Args {
  kms: string
  payload: StatusList2021ResourcePayload
  file?: string
  signInputs?: ISignInputs[]
  fee?: DidStdFee
}

export interface ISwisstronikBroadcastStatusList2021Args {
  kms: string
  payload: StatusList2021ResourcePayload
  file?: string
  signInputs?: ISignInputs[]
  fee?: DidStdFee
}

export interface ISwisstronikGenerateDIDDocumentArgs {
  verificationMethod: VerificationMethods
  methodSpecificIdAlgo: MethodSpecificIdAlgo
}

export interface ISwisstronikGenerateDIDDocumentWithLinkedResourceArgs extends ISwisstronikGenerateDIDDocumentArgs {
  [key: string]: any
}

export interface ISwisstronikGenerateKeyPairArgs {
  [key: string]: any
}

export interface ISwisstronikGenerateVersionIdArgs {
  [key: string]: any
}

export interface ISwisstronikGenerateStatusList2021Args {
  length?: number
  buffer?: Uint8Array
  bitstringEncoding?: DefaultStatusList2021Encoding
}

export interface ISwisstronikIssueRevocableCredentialWithStatusList2021Args {
  issuanceOptions: ICreateVerifiableCredentialArgs
  statusOptions: {
      statusPurpose: 'revocation'
      statusListName: string
      statusListIndex?: number
      statusListVersion?: string
      statusListRangeStart?: number
      statusListRangeEnd?: number
      indexNotIn?: number[]
  }
}

export interface ISwisstronikIssueSuspendableCredentialWithStatusList2021Args {
  issuanceOptions: ICreateVerifiableCredentialArgs
  statusOptions: {
      statusPurpose: 'suspension'
      statusListName: string
      statusListIndex?: number
      statusListVersion?: string
      statusListRangeStart?: number
      statusListRangeEnd?: number
      indexNotIn?: number[]
  }
}

export interface ISwisstronikVerifyCredentialWithStatusList2021Args {
  credential: W3CVerifiableCredential
  verificationArgs?: IVerifyCredentialArgs
  fetchList?: boolean
  dkgOptions?: DkgOptions
  options?: ISwisstronikStatusList2021Options
}

export interface ISwisstronikVerifyPresentationWithStatusList2021Args {
  presentation: VerifiablePresentation
  verificationArgs?: IVerifyPresentationArgs
  fetchList?: boolean
  dkgOptions?: DkgOptions
  options?: ISwisstronikStatusList2021Options
}

export interface ISwisstronikCheckCredentialStatusWithStatusList2021Args {
  credential?: W3CVerifiableCredential
  statusOptions?: ISwisstronikCheckCredentialWithStatusList2021StatusOptions
  fetchList?: boolean
  dkgOptions?: DkgOptions
  options?: ISwisstronikStatusList2021Options
}

export interface ISwisstronikRevokeCredentialWithStatusList2021Args {
  credential?: W3CVerifiableCredential
  revocationOptions?: ISwisstronikRevokeCredentialWithStatusList2021Options
  fetchList?: boolean
  publish?: boolean
  publishEncrypted?: boolean
  symmetricKey?: string
  paymentConditions?: PaymentCondition[]
  writeToFile?: boolean
  returnUpdatedStatusList?: boolean
  returnSymmetricKey?: boolean
  returnStatusListMetadata?: boolean
  dkgOptions?: DkgOptions
  options?: ISwisstronikStatusList2021Options
}

export interface ISwisstronikRevokeBulkCredentialsWithStatusList2021Args {
  credentials?: W3CVerifiableCredential[]
  revocationOptions?: ISwisstronikRevokeBulkCredentialsWithStatusList2021Options
  fetchList?: boolean
  publish?: boolean
  publishEncrypted?: boolean
  symmetricKey?: string
  paymentConditions?: PaymentCondition[]
  writeToFile?: boolean
  returnUpdatedStatusList?: boolean
  returnSymmetricKey?: boolean
  returnStatusListMetadata?: boolean
  dkgOptions?: DkgOptions
  options?: ISwisstronikStatusList2021Options
}

export interface ISwisstronikSuspendCredentialWithStatusList2021Args {
  credential?: W3CVerifiableCredential
  suspensionOptions?: ISwisstronikSuspendCredentialWithStatusList2021Options
  fetchList?: boolean
  publish?: boolean
  publishEncrypted?: boolean
  symmetricKey?: string
  paymentConditions?: PaymentCondition[]
  writeToFile?: boolean
  returnUpdatedStatusList?: boolean
  returnSymmetricKey?: boolean
  returnStatusListMetadata?: boolean
  dkgOptions?: DkgOptions
  options?: ISwisstronikStatusList2021Options
}

export interface ISwisstronikSuspendBulkCredentialsWithStatusList2021Args {
  credentials?: W3CVerifiableCredential[]
  suspensionOptions?: ISwisstronikSuspendBulkCredentialsWithStatusList2021Options
  fetchList?: boolean
  publish?: boolean
  publishEncrypted?: boolean
  symmetricKey?: string
  paymentConditions?: PaymentCondition[]
  writeToFile?: boolean
  returnUpdatedStatusList?: boolean
  returnSymmetricKey?: boolean
  returnStatusListMetadata?: boolean
  dkgOptions?: DkgOptions
  options?: ISwisstronikStatusList2021Options
}

export interface ISwisstronikUnsuspendCredentialWithStatusList2021Args {
  credential?: W3CVerifiableCredential
  unsuspensionOptions?: ISwisstronikUnsuspendCredentialWithStatusList2021Options
  fetchList?: boolean
  publish?: boolean
  publishEncrypted?: boolean
  symmetricKey?: string
  paymentConditions?: PaymentCondition[]
  writeToFile?: boolean
  returnUpdatedStatusList?: boolean
  returnSymmetricKey?: boolean
  returnStatusListMetadata?: boolean
  dkgOptions?: DkgOptions
  options?: ISwisstronikStatusList2021Options
}

export interface ISwisstronikUnsuspendBulkCredentialsWithStatusList2021Args {
  credentials?: W3CVerifiableCredential[]
  unsuspensionOptions?: ISwisstronikUnsuspendBulkCredentialsWithStatusList2021Options
  fetchList?: boolean
  publish?: boolean
  publishEncrypted?: boolean
  symmetricKey?: string
  paymentConditions?: PaymentCondition[]
  writeToFile?: boolean
  returnUpdatedStatusList?: boolean
  returnSymmetricKey?: boolean
  returnStatusListMetadata?: boolean
  dkgOptions?: DkgOptions
  options?: ISwisstronikStatusList2021Options
}

export interface ISwisstronikTransactSendTokensArgs {
  recipientAddress: string
  amount: Coin
  memo?: string
  txBytes?: Uint8Array
  returnTxResponse?: boolean
}

export interface ISwisstronikObservePaymentConditionArgs {
  recipientAddress?: string
  amount?: Coin
  intervalInSeconds?: number
  blockHeight?: string
  comparator?: Extract<AccessControlConditionReturnValueComparator, '<' | '<='>
  unifiedAccessControlCondition?: Required<CosmosAccessControlCondition>
  returnTxResponse?: boolean
}

export interface ISwisstronikStatusList2021Options {
  statusListFile?: string
  statusListInlineBitstring?: string
  [key: string]: any
}

export interface ISwisstronikRevokeCredentialWithStatusList2021Options {
  issuerDid: string
  statusListName: string
  statusListIndex: number
  statusListVersion?: string
}

export interface ISwisstronikRevokeBulkCredentialsWithStatusList2021Options {
  issuerDid: string
  statusListName: string
  statusListIndices: number[]
  statusListVersion?: string
}

export interface ISwisstronikSuspendCredentialWithStatusList2021Options {
  issuerDid: string
  statusListName: string
  statusListIndex: number
  statusListVersion?: string
}

export interface ISwisstronikSuspendBulkCredentialsWithStatusList2021Options {
  issuerDid: string
  statusListName: string
  statusListIndices: number[]
  statusListVersion?: string
}

export interface ISwisstronikUnsuspendCredentialWithStatusList2021Options {
  issuerDid: string
  statusListName: string
  statusListIndex: number
  statusListVersion?: string
}

export interface ISwisstronikUnsuspendBulkCredentialsWithStatusList2021Options {
  issuerDid: string
  statusListName: string
  statusListIndices: number[]
  statusListVersion?: string
}

export interface ISwisstronikCheckCredentialWithStatusList2021StatusOptions {
  issuerDid: string
  statusListName: string
  statusListIndex: number
  statusPurpose: DefaultStatusList2021StatusPurposeType
  statusListVersion?: string
}

export interface ISwisstronikPlugin extends IPluginMethodMap {
  [CreateIdentifierMethodName]: (args: ISwisstronikCreateIdentifierArgs, context: IContext) => Promise<Omit<IIdentifier, 'provider'>>
  [UpdateIdentifierMethodName]: (args: ISwisstronikUpdateIdentifierArgs, context: IContext) => Promise<Omit<IIdentifier, 'provider'>>,
  [DeactivateIdentifierMethodName]: (args: ISwisstronikDeactivateIdentifierArgs, context: IContext) => Promise<boolean>,
  [CreateResourceMethodName]: (args: ISwisstronikCreateLinkedResourceArgs, context: IContext) => Promise<boolean>,
  [CreateStatusList2021MethodName]: (args: ISwisstronikCreateStatusList2021Args, context: IContext) => Promise<CreateStatusList2021Result>,
  [BroadcastStatusList2021MethodName]: (args: ISwisstronikBroadcastStatusList2021Args, context: IContext) => Promise<boolean>,
  [GenerateDidDocMethodName]: (args: ISwisstronikGenerateDIDDocumentArgs, context: IContext) => Promise<TExportedDIDDocWithKeys>,
  [GenerateDidDocWithLinkedResourceMethodName]: (args: ISwisstronikGenerateDIDDocumentWithLinkedResourceArgs, context: IContext) => Promise<TExportedDIDDocWithLinkedResourceWithKeys>,
  [GenerateKeyPairMethodName]: (args: ISwisstronikGenerateKeyPairArgs, context: IContext) => Promise<TImportableEd25519Key>
  [GenerateVersionIdMethodName]: (args: ISwisstronikGenerateVersionIdArgs, context: IContext) => Promise<string>
  [GenerateStatusList2021MethodName]: (args: ISwisstronikGenerateStatusList2021Args, context: IContext) => Promise<string>
  [IssueRevocableCredentialWithStatusList2021MethodName]: (args: ISwisstronikIssueRevocableCredentialWithStatusList2021Args, context: IContext) => Promise<VerifiableCredential>
  [IssueSuspendableCredentialWithStatusList2021MethodName]: (args: ISwisstronikIssueSuspendableCredentialWithStatusList2021Args, context: IContext) => Promise<VerifiableCredential>
  [VerifyCredentialMethodName]: (args: ISwisstronikVerifyCredentialWithStatusList2021Args, context: IContext) => Promise<VerificationResult>
  [VerifyPresentationMethodName]: (args: ISwisstronikVerifyPresentationWithStatusList2021Args, context: IContext) => Promise<VerificationResult>
  [CheckCredentialStatusMethodName]: (args: ISwisstronikCheckCredentialStatusWithStatusList2021Args, context: IContext) => Promise<StatusCheckResult>
  [RevokeCredentialMethodName]: (args: ISwisstronikRevokeCredentialWithStatusList2021Args, context: IContext) => Promise<RevocationResult>
  [RevokeCredentialsMethodName]: (args: ISwisstronikRevokeBulkCredentialsWithStatusList2021Args, context: IContext) => Promise<BulkRevocationResult>
  [SuspendCredentialMethodName]: (args: ISwisstronikSuspendCredentialWithStatusList2021Args, context: IContext) => Promise<SuspensionResult>
  [SuspendCredentialsMethodName]: (args: ISwisstronikSuspendBulkCredentialsWithStatusList2021Args, context: IContext) => Promise<BulkSuspensionResult>
  [UnsuspendCredentialMethodName]: (args: ISwisstronikUnsuspendCredentialWithStatusList2021Args, context: IContext) => Promise<UnsuspensionResult>
  [UnsuspendCredentialsMethodName]: (args: ISwisstronikUnsuspendBulkCredentialsWithStatusList2021Args, context: IContext) => Promise<BulkUnsuspensionResult>
  [TransactSendTokensMethodName]: (args: ISwisstronikTransactSendTokensArgs, context: IContext) => Promise<TransactionResult>
  [ObservePaymentConditionMethodName]: (args: ISwisstronikObservePaymentConditionArgs, context: IContext) => Promise<ObservationResult>
}