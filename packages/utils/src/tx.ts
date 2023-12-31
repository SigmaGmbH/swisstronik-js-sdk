import {
  deriveEncryptionKey,
  encryptECDH,
  USER_KEY_PREFIX,
  decryptECDH,
} from './encryption'
import { stringToU8a, hexToU8a, u8aToHex } from './utils'
import { getNodePublicKey } from './rpc'
import { randomBytes } from 'tweetnacl'

/**
 * Encrypts provided transaction data using random or provided encryption key
 * @param nodeURL URL of node with JSON-RPC (for example 127.0.0.1:8545)
 * @param data Raw transaction `data` field
 * @param userEncryptionKey Encryption key which will be used as user encryption key for that transaction
 * @returns Encrypted `data` field for transaction in hex format
 */
export async function encryptDataField(
  nodeURL: string,
  data: string,
  userEncryptionKey?: Uint8Array
): Promise<[string, Uint8Array]> {
  // Generate random user encryption key if is not provided
  userEncryptionKey = userEncryptionKey ?? randomBytes(32)

  // Create encryption key using KDF
  const encryptionPrivateKey = deriveEncryptionKey(
    userEncryptionKey,
    stringToU8a(USER_KEY_PREFIX)
  )

  // Obtain node public key
  const nodePublicKeyResponse = await getNodePublicKey(nodeURL)
  if (!nodePublicKeyResponse.publicKey) {
    throw new Error(
      `Cannot obtain node public key. Reason: ${nodePublicKeyResponse.error}`
    )
  }
  const nodePublicKey = nodePublicKeyResponse.publicKey

  // Encrypt data
  const encryptionResult = encryptECDH(
    encryptionPrivateKey,
    hexToU8a(nodePublicKey),
    hexToU8a(data)
  )
  if (!encryptionResult.result) {
    throw new Error(`Encryption error. Reason: ${encryptionResult.error}`)
  }
  return [u8aToHex(encryptionResult.result), userEncryptionKey]
}

/**
 * Decrypts node response (call / transaction result data)
 * @param nodeURL URL of node with JSON-RPC (for example 127.0.0.1:8545)
 * @param encryptedResponse Encrypted returned data
 * @param encryptionKey Key used for encryption
 * @returns Decrypted result
 */
export async function decryptNodeResponse(
  nodeURL: string,
  encryptedResponse: string,
  encryptionKey: Uint8Array
): Promise<Uint8Array> {
  // Create encryption key using KDF
  const encryptionPrivateKey = deriveEncryptionKey(
    encryptionKey,
    stringToU8a(USER_KEY_PREFIX)
  )

  // Obtain node public key
  const nodePublicKeyResponse = await getNodePublicKey(nodeURL)
  if (!nodePublicKeyResponse.publicKey) {
    throw new Error(
      `Cannot obtain node public key. Reason: ${nodePublicKeyResponse.error}`
    )
  }
  const nodePublicKey = nodePublicKeyResponse.publicKey

  const decryptionResult = decryptECDH(
    encryptionPrivateKey,
    hexToU8a(nodePublicKey),
    hexToU8a(encryptedResponse)
  )
  if (!decryptionResult.result) {
    throw new Error(`Decryption error. Reason: ${decryptionResult.error}`)
  }

  return decryptionResult.result
}
