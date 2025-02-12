import {
  Account,
  AccountParser,
  StargateClient,
  StargateClientOptions,
} from "@cosmjs/stargate";
import { Tendermint34Client, Tendermint37Client } from "@cosmjs/tendermint-rpc";
import {
  QueryAddressDetailsRequest,
  QueryAddressDetailsResponse,
  QueryAddressListRequest,
  QueryAddressListResponse,
} from "./compliance/addressDetails.js";
import {
  QueryIssuerDetailsRequest,
  QueryIssuerDetailsResponse,
  QueryIssuerListRequest,
  QueryIssuerListResponse,
} from "./compliance/issuerDetails.js";
import {
  QueryVerificationDetailsRequest,
  QueryVerificationDetailsResponse,
  QueryVerificationListRequest,
  QueryVerificationListResponse,
} from "./compliance/verificationDetails.js";
import { PageRequest } from "cosmjs-types/cosmos/base/query/v1beta1/pagination.js";
import { accountFromAny } from "./utils.js";
import { QueryCredentialHashRequest, QueryCredentialHashResponse, QueryIssuanceProofRequest, QueryIssuanceProofResponse } from './compliance/issuanceProof.js';
export class SwisstronikStargateClient extends StargateClient {
  private readonly overridenAccountParser: AccountParser;

  constructor(
    tmClient: Tendermint37Client | Tendermint34Client | undefined,
    options: StargateClientOptions = {}
  ) {
    super(tmClient, options);

    const { accountParser = accountFromAny } = options;
    this.overridenAccountParser = accountParser;
  }

  public static async connect(
    endpoint: string,
    options: StargateClientOptions = {}
  ) {
    // Tendermint/CometBFT 0.34/0.37 auto-detection. Starting with 0.37 we seem to get reliable versions again 🎉
    // Using 0.34 as the fallback.
    let tmClient: Tendermint37Client | Tendermint34Client;
    const tm37Client = await Tendermint37Client.connect(endpoint);
    const version = (await tm37Client.status()).nodeInfo.version;
    console.log(`[sdk::client.ts] Detected Tendermint version: ${version}`);
    if (version.startsWith("0.37.")) {
      tmClient = tm37Client;
    } else {
      tm37Client.disconnect();
      tmClient = await Tendermint34Client.connect(endpoint);
    }
    return new SwisstronikStargateClient(tmClient, options);
  }

  public async getAccount(searchAddress: string): Promise<Account | null> {
    try {
      console.log(
        `[sdk::client.ts] Requesting account data for ${searchAddress}`
      );
      const account = await this.forceGetQueryClient().auth.account(
        searchAddress
      );
      console.log(`[sdk::client.ts] Obtained data: `, account);
      return account ? this.overridenAccountParser(account) : null;
    } catch (error: any) {
      console.log(`[sdk::client.ts] Cannot obtain data. Reason: ${error}`);
      if (/rpc error: code = NotFound/i.test(error.toString())) {
        return null;
      }
      throw error;
    }
  }

  public async queryAddressDetails(address: string) {
    const response = await this.forceGetTmClient().abciQuery({
      path: `/swisstronik.compliance.Query/AddressDetails`,
      data: QueryAddressDetailsRequest.encode({ address }).finish(),
    });

    return QueryAddressDetailsResponse.decode(response.value);
  }

  public async queryAddressList(pagination?: PageRequest) {
    const response = await this.forceGetTmClient().abciQuery({
      path: `/swisstronik.compliance.Query/AddressesDetails`,
      data: QueryAddressListRequest.encode({ pagination }).finish(),
    });

    return QueryAddressListResponse.decode(response.value);
  }

  public async queryIssuerDetails(issuerAddress: string) {
    const response = await this.forceGetTmClient().abciQuery({
      path: `/swisstronik.compliance.Query/IssuerDetails`,
      data: QueryIssuerDetailsRequest.encode({ issuerAddress }).finish(),
    });

    return QueryIssuerDetailsResponse.decode(response.value);
  }

  public async queryIssuerList(pagination?: PageRequest) {
    const response = await this.forceGetTmClient().abciQuery({
      path: `/swisstronik.compliance.Query/IssuersDetails`,
      data: QueryIssuerListRequest.encode({ pagination }).finish(),
    });

    return QueryIssuerListResponse.decode(response.value);
  }

  public async queryVerificationDetails(verificationID: string) {
    const response = await this.forceGetTmClient().abciQuery({
      path: `/swisstronik.compliance.Query/VerificationDetails`,
      data: QueryVerificationDetailsRequest.encode({ verificationID }).finish(),
    });

    return QueryVerificationDetailsResponse.decode(response.value);
  }

  public async queryVerificationList(pagination?: PageRequest) {
    const response = await this.forceGetTmClient().abciQuery({
      path: `/swisstronik.compliance.Query/VerificationsDetails`,
      data: QueryVerificationListRequest.encode({ pagination }).finish(),
    });

    return QueryVerificationListResponse.decode(response.value);
  }

/**
 * Get credentional hash by verificationId
 * @param verificationId 
 * @returns 
 */
  public async queryIssuanceCredentionalsRequest(verificationId: string) {
    const postParam = QueryCredentialHashRequest.encode({ verificationId }).finish();
    const response = await this.forceGetTmClient().abciQuery({
      path: `/swisstronik.compliance.Query/CredentialHash`,
      data: postParam,
    });
    return QueryCredentialHashResponse.decode(response.value);
  }

  /**
   * Get IssuanceProof by credentialHash
   * @param verificationId 
   * @returns 
   */
  public async queryIssuanceProofRequest(credentialHash: string) {
    const response = await this.forceGetTmClient().abciQuery({
      path: `/swisstronik.compliance.Query/IssuanceProof`,
      data: QueryIssuanceProofRequest.encode({ credentialHash }).finish(),
    });

    return QueryIssuanceProofResponse.decode(response.value);
  }

}//






