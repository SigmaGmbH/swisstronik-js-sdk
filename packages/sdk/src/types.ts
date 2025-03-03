import {
  Service as ProtobufService,
  VerificationMethod as ProtobufVerificationMethod,
} from "./types-proto";
import { IdentitySDK } from "./index.js";
import { Coin } from "@cosmjs/proto-signing";
import { Signer } from "did-jwt";
import { Account, QueryClient } from "@cosmjs/stargate";
import { DIDResolutionResult } from "did-resolver";
import { DidExtension } from "./modules/did.js";
import { ResourceExtension } from "./modules/resource.js";
import { MonthlyVestingAccount } from "./types-proto/swisstronik/vesting/monthlyVestingAccount";
export {
  DIDDocument as DIDDocumentExternal,
  VerificationMethod as VerificationMethodExternal,
  Service as ServiceExternal,
  ServiceEndpoint as ServiceEndpointExternal,
  JsonWebKey as JsonWebKeyExternal,
} from "did-resolver";

export type QueryExtensionSetup<T> = (base: QueryClient) => T;

export type IdentityExtension<K extends string, V = any> = {
  [P in K]: Record<P, V> & Partial<Record<Exclude<K, P>, never>> extends infer O
    ? { [Q in keyof O]: O[Q] }
    : never;
}[K];

export type IdentityExtensions = DidExtension | ResourceExtension;

export interface IModuleMethod {
  (...args: any[]): Promise<any>;
}

export interface IModuleMethodMap extends Record<string, IModuleMethod> {}

export interface IContext {
  sdk: IdentitySDK;
}

export type DIDDocumentWithMetadataExternal = Pick<
  DIDResolutionResult,
  "didDocument" | "didDocumentMetadata"
>;

export type SpecValidationResult = {
  valid: boolean;
  error?: string;
  protobufVerificationMethod?: ProtobufVerificationMethod[];
  protobufService?: ProtobufService[];
};

export enum VerificationMethods {
  Ed255192020 = "Ed25519VerificationKey2020",
  Ed255192018 = "Ed25519VerificationKey2018",
  JWK = "JsonWebKey2020",
}

export enum MethodSpecificIdAlgo {
  Base58 = "base58btc",
  Uuid = "uuid",
}

export type TSignerAlgo = {
  [key in VerificationMethods as string]?: (secretKey: Uint8Array) => Signer;
};

export interface ISignInputs {
  verificationMethodId: string;
  keyType?: "Ed25519" | "Secp256k1" | "P256";
  privateKeyHex: string;
}

export interface IKeyPair {
  publicKey: string;
  privateKey: string;
  algo?: MethodSpecificIdAlgo;
}

export interface IKeyValuePair {
  key: string;
  value: any;
}

export type TVerificationKeyPrefix = string;

export type TVerificationKey<
  K extends TVerificationKeyPrefix,
  N extends number
> = `${K}-${N}`;

export interface IVerificationKeys {
  readonly methodSpecificId: TMethodSpecificId;
  readonly didUrl: `did:swtr:${IVerificationKeys["methodSpecificId"]}` extends string
    ? string
    : never;
  readonly keyId: `${IVerificationKeys["didUrl"]}#${TVerificationKey<
    TVerificationKeyPrefix,
    number
  >}`;
  readonly publicKey: string;
}

export type TMethodSpecificId = string;

export interface DidStdFee {
  readonly amount: readonly Coin[];
  readonly gas: string;
  payer?: string;
  granter?: string;
}

export const ISignInputs = {
  isSignInput(object: Object[]): object is ISignInputs[] {
    return object.some((x) => "privateKeyHex" in x);
  },
};

export type SwisstronikAccount = Account & {
  monthlyVestingAccount?: MonthlyVestingAccount;
};

//Instance: Address
export interface AddressDetails {
  isVerified: boolean;
  isRevoked: boolean;
  verifications: Verification[];
}

export type MergedAddressDetails = {
  address: string;
} & AddressDetails;

//Instance: Verification
export interface Verification {
  type: VerificationType;
  verificationId: string;
  issuerAddress: string;
}

export interface VerificationRPC extends Omit<Verification, "verificationId"> {
  verificationId: Uint8Array;
}

export enum VerificationTypeEnum {
  /** VT_UNSPECIFIED - VT_UNSPECIFIED defines an invalid/undefined verification type. */
  VT_UNSPECIFIED = 0,
  /** VT_KYC - Know Your Custom */
  VT_KYC = 1,
  /** VT_KYB - Know Your Business */
  VT_KYB = 2,
  /** VT_KYW - Know Your Wallet */
  VT_KYW = 3,
  /** VT_HUMANITY - Check humanity */
  VT_HUMANITY = 4,
  /** VT_AML - Anti Money Laundering (check transactions) */
  VT_AML = 5,
  VT_ADDRESS = 6,
  VT_CUSTOM = 7,
  VT_CREDIT_SCORE = 8,
  /** VT_BIOMETRIC - Biometric Passports and other types of biometric verification */
  VT_BIOMETRIC = 9,
  UNRECOGNIZED = -1,
}

export const verificationTypes = VerificationTypeEnum;

export type VerificationType = (typeof VerificationTypeEnum)[number];

export type VerificationTypeAnotation = keyof typeof VerificationTypeEnum;

export type VerificationDetails = {
  type: VerificationType;
  issuerAddress?: string;
  originChain?: string;
  issuanceTimestamp?: number;
  expirationTimestamp?: number;
  originalData?: string;
  schema?: string;
  issuerVerificationId?: string;
  version?: number;
  /** Is revoked */
  isRevoked: boolean;
};

export type MergedVerificationDetails = { 
  verificationID: string;
} & VerificationDetails;

//Instance: Issuer
export type IssuerDetails = {
  name?: string;
  description?: string;
  url?: string;
  logo?: string;
  legalEntity?: string;
  creator?: string;
};

export type MergedIssuerDetails = {
  issuerAddress: string;
} & IssuerDetails;

//Instance: ZK
export interface ZKCredential {
  type: VerificationType;
  issuerAddress: Uint8Array;
  holderPublicKey: Uint8Array;
  expirationTimestamp: number;
  issuanceTimestamp: number;
}

//Instance: CredentialHash / IssuanceProof
export interface IQueryCredentialHashRequest {
  verificationId: string;
}

export interface IQueryCredentialHashResponse {
  credentialHash: string;
}

export interface IQueryIssuanceProofRequest {
  credentialHash: string;
}

export interface IQueryIssuanceProofResponse {
  encodedProof: string;
}

// Instance: Holder
export interface IQueryHolderByVerificationIdRequest {
  verificationId: string;
}

export interface IQueryHolderByVerificationIdResponse {
  address: string;
}