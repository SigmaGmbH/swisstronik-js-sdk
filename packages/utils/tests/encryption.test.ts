import { encrypt, decrypt, getX25519PublicKey, encryptECDH, decryptECDH, hexToU8a, deriveEncryptionKey, USER_KEY_PREFIX, stringToU8a, u8aToHex, deriveSharedSecret, TX_KEY_PREFIX } from "../src"
import { randomBytes } from "tweetnacl"

it('Basic encryption process', () => {
  const plaintext = randomBytes(32)
  const privateKey = randomBytes(32)

  const encryptionResult = encrypt(Uint8Array.from(privateKey), plaintext)
  expect(encryptionResult.error).toBeUndefined()
  expect(encryptionResult.result).not.toBeUndefined()

  const decryptionResult = decrypt(Uint8Array.from(privateKey), encryptionResult.result!)
  expect(decryptionResult.error).toBeUndefined()
  expect(decryptionResult.result).not.toBeUndefined()

  expect(plaintext).toEqual(decryptionResult.result!)
})

it('Should catch error in decryption process', () => {
  const plaintext = randomBytes(32)
  const privateKey = randomBytes(32)
  const privateKey2 = randomBytes(32)

  const encryptionResult = encrypt(Uint8Array.from(privateKey), plaintext)
  expect(encryptionResult.error).toBeUndefined()
  expect(encryptionResult.result).not.toBeUndefined()

  const decryptionResult = decrypt(Uint8Array.from(privateKey2), encryptionResult.result!)
  expect(decryptionResult.error).toEqual('deoxysii: message authentication failure')
  expect(decryptionResult.result).toBeUndefined()
})

it('ECDH encryption process', () => {
  const plaintext = randomBytes(32)
  const userPrivateKey = randomBytes(32)
  const nodePrivateKey = randomBytes(32)
  const nodePublicKey = getX25519PublicKey(nodePrivateKey)

  const encryptionResult = encryptECDH(userPrivateKey, nodePublicKey, plaintext)
  expect(encryptionResult.error).toBeUndefined()
  expect(encryptionResult.result).not.toBeUndefined()

  const encryptedData = encryptionResult.result!.subarray(32)
  const decryptionResult = decryptECDH(userPrivateKey, nodePublicKey, encryptedData)
  expect(decryptionResult.error).toBeUndefined()
  expect(decryptionResult.result).not.toBeUndefined()

  expect(decryptionResult.result).toEqual(plaintext)
})

it('ECDH encryption process with secp256k1 user private key', () => {
  const userSecp256k1PrivateKey = hexToU8a("0xC516DC17D909EFBB64A0C4A9EE1720E10D47C1BF3590A257D86EEB5FFC644D43")
  const userPrivateKey = deriveEncryptionKey(userSecp256k1PrivateKey, stringToU8a(USER_KEY_PREFIX))

  const plaintext = randomBytes(32)
  const nodePublicKey = hexToU8a("0x86477673c1c6fd9d061e884f56d440b2ce03fa2fe39a2a4882357a451a7f490e")

  const encryptionResult = encryptECDH(userPrivateKey, nodePublicKey, plaintext)
  expect(encryptionResult.error).toBeUndefined()
  expect(encryptionResult.result).not.toBeUndefined()

  const encryptedData = encryptionResult.result!.subarray(32)
  const decryptionResult = decryptECDH(userPrivateKey, nodePublicKey, encryptedData)
  expect(decryptionResult.error).toBeUndefined()
  expect(decryptionResult.result).not.toBeUndefined()

  expect(decryptionResult.result).toEqual(plaintext)
})

it('Should derive same encryption key as go', async () => {
  const GO_DERIVED_KEY = "2c5235ad7a26753fb1e9c553b0912173adffef84f20b52d3e01a30a4da7b9109"

  const userPrivateKey = hexToU8a("0000000000000000000000000000000000000000000000000000000000000000")
  const salt = stringToU8a(TX_KEY_PREFIX)
  const derivedKey = deriveEncryptionKey(userPrivateKey, salt)

  expect(derivedKey).toEqual(hexToU8a(GO_DERIVED_KEY))
})

it('Should derive same x25519 public key as go', async () => {
  const GO_X25519_PK_SECRET = "2fe57da347cd62431528daac5fbb290730fff684afc4cfc2ed90995f58cb3b74"

  const privateKey = hexToU8a("0000000000000000000000000000000000000000000000000000000000000000")
  const publicKey = getX25519PublicKey(privateKey)

  expect(publicKey).toEqual(hexToU8a(GO_X25519_PK_SECRET))
})