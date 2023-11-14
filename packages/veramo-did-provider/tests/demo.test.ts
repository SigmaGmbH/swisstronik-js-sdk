import { agent } from './testutils.test'
import {
  createDidVerificationMethod,
  createVerificationKeys,
  createDidPayload,
  MethodSpecificIdAlgo,
  VerificationMethods, DIDDocumentExternal,
} from '@swisstronik/sdk'

const createDefaultDIDDocument = async (): Promise<DIDDocumentExternal> => {
  // Add key to KMS
  const key = await agent.keyManagerCreate({ kms: 'local', type: 'Ed25519' })

  // Create verification material
  const vmKeys = createVerificationKeys(key.publicKeyHex, MethodSpecificIdAlgo.Base58, `${key.kid}-1`)
  const vmMethods = createDidVerificationMethod([VerificationMethods.Ed255192020], [vmKeys])

  // Construct DID document
  return createDidPayload(vmMethods, [vmKeys])
}

describe('Demo', () => {
  it('Create basic self-controlled DID', async () => {
    // Construct DID Document
    let document = await createDefaultDIDDocument()
    document.alsoKnownAs = ['kyc-provider']

    // Store it on-chain
    const identifier = await agent.didManagerCreate({
      provider: 'did:swtr',
      options: { document },
    })

    // Obtain DID document
    const resolvedDocument = await agent.resolveDid({
      didUrl: identifier.did,
    })

    expect(resolvedDocument.didDocument).not.toBeNull()
    expect(resolvedDocument.didDocumentMetadata).not.toBeNull()
    expect(resolvedDocument.didDocument!.id).toEqual(identifier.did)

    // List issued identifiers
    const identifiers = await agent.didManagerFind()
    expect(identifiers.length).toBeGreaterThan(0)
  }, 15000)

  it('Create verifiable credential', async () => {
    const document = await createDefaultDIDDocument()
    const identifier = await agent.didManagerCreate({
      provider: 'did:swtr',
      options: { document },
    })

    const credentialSubject = {
      id: identifier.did,
      address: "swtr13sllcdsqhjektac5r6h50dvjrthm0yt6zw3q4s",
    }

    const credential = await agent.createVerifiableCredential({
      credential: {
        issuer: { id: identifier.did },
        credentialSubject,
      },
      proofFormat: 'jwt',
    })

    console.log('credential: ', credential)

    const verificationResult = await agent.verifyCredential({ credential })
    expect(verificationResult.error).toBeUndefined()
    expect(verificationResult.verified).toEqual(true)
  }, 15000)
})