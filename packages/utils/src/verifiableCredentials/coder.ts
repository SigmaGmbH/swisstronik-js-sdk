import { ethers } from "ethers";
import rlp from 'rlp';
import { VerifiableCredential } from "./types.js";
import { u8aToHex } from "../utils.js";

/**
 * Encodes provided Verifiable Credential to RLP format
 * @param credential W3C Verifiable Credential
 */
export function encodeVerifiableCredentialToRLP(credential: VerifiableCredential): string {
    if (credential.proof["type"] !== "JwtProof2020") {
        throw new Error(`encodeVerifiableCredentialToRLP: unsupported proof type: ${credential.proof["type"]}`)
    }

    const proof = credential.proof["jwt"] as string

    return u8aToHex(rlp.encode(proof))
}

/**
 * Creates data for transaction / call to contract, which support `authorize` function
 * and can verify provided verifiable credential
 * @param credential Verifiable Credential
 */
export function encodeTxDataWithVC(credential: VerifiableCredential): string {
    const functionSignature = "function authorize(bytes proof)"
    const contractInterface = new ethers.utils.Interface([functionSignature])
    const encodedCredential = encodeVerifiableCredentialToRLP(credential)

    return contractInterface.encodeFunctionData("authorize", [encodedCredential])
}