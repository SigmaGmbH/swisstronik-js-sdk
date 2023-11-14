import {
    MsgCreateDIDDocument,
    MsgCreateDIDDocumentPayload,
    VerificationMethod,
    DirectSecp256k1HdWallet,
    typeUrlMsgCreateDidDoc,
    SwisstronikSigningStargateClient,
    ISignInputs,
    MethodSpecificIdAlgo,
    VerificationMethods
} from "../src"
import {
    Registry
} from "@cosmjs/proto-signing"
import { EdDSASigner } from "did-jwt"
import {

} from "../src/types"
import {
    fromString,
    toString
} from 'uint8arrays'
import {
    createDIDPayload,
    createDIDVerificationMethod,
    createKeyPairBase64,
    createVerificationKeys,
    validateSpecCompliantPayload
} from '../src/utils';
import {
    localnet,
    faucet
} from "./testutils.test"
import { verify } from "@stablelib/ed25519"
import { v4 } from "uuid"

const nonExistingDid = "did:SWtr:fantasticnet:123"
const nonExistingKeyId = 'did:SWtr:fantasticnet:123#key-678'
const nonExistingPublicKeyMultibase = '1234567890'
const nonExistingVerificationMethod = 'ExtraTerrestrialVerificationKey2045'
const nonExistingVerificationDidDocument = {
    "authentication": [
        "did:swtr:z6Jn6NmYkaCepQe2#key-1"
    ],
    "controller": [
        "did:swtr:z6Jn6NmYkaCepQe2"
    ],
    "id": "did:swtr:z6Jn6NmYkaCepQe2",
    "verificationMethod": [
        {
            "controller": "did:swtr:z6Jn6NmYkaCepQe2",
            "id": "did:swtr:z6Jn6NmYkaCepQe2#key-1",
            "publicKeyMultibase": "z6Jn6NmYkaCepQe29vgCZQhFfRkN3YpEPiu14F8HbbmqW",
            "type": nonExistingVerificationMethod
        }
    ]
}

describe('IdentitySigningStargateClient', () => {
    describe('constructor', () => {
        it('can be instantiated & works for swisstronik network', async () => {
            const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic)
            const signer = await SwisstronikSigningStargateClient.connectWithSigner(localnet.rpcUrl, wallet)
            expect(signer).toBeInstanceOf(SwisstronikSigningStargateClient)
        })

        it('can be constructed with swisstronik custom registry', async () => {
            const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic)
            const registry = new Registry()
            registry.register(typeUrlMsgCreateDidDoc, MsgCreateDIDDocument)
            const signer = await SwisstronikSigningStargateClient.connectWithSigner(localnet.rpcUrl, wallet, { registry })
            expect(signer.registry.lookupType(typeUrlMsgCreateDidDoc)).toBe(MsgCreateDIDDocument)
        })
    })

    describe('getDidSigner', () => {
        it('can get a signer for a did', async () => {
            const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic)
            const signer = await SwisstronikSigningStargateClient.connectWithSigner(localnet.rpcUrl, wallet)
            const keyPair = createKeyPairBase64()
            const verificationKeys = createVerificationKeys(keyPair.publicKey, MethodSpecificIdAlgo.Base58, 'key-1')
            const verificationMethods = createDIDVerificationMethod([VerificationMethods.Ed255192020], [verificationKeys])
            const didPayload = createDIDPayload(verificationMethods, [verificationKeys])
            const { protobufVerificationMethod } = validateSpecCompliantPayload(didPayload)

            const didSigner = await signer.getDidSigner(didPayload.verificationMethod![0].id, protobufVerificationMethod!)

            expect(didSigner).toBe(EdDSASigner)
        })

        it('should throw for a non-supported verification method', async () => {
            const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic)
            const signer = await SwisstronikSigningStargateClient.connectWithSigner(localnet.rpcUrl, wallet)

            await expect(signer.getDidSigner(nonExistingVerificationDidDocument.verificationMethod[0].id, nonExistingVerificationDidDocument.verificationMethod)).rejects.toThrow()
        })

        it('should throw for non-matching verification method id', async () => {
            const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic)
            const signer = await SwisstronikSigningStargateClient.connectWithSigner(localnet.rpcUrl, wallet)
            const keyPair = createKeyPairBase64()
            const verificationKeys = createVerificationKeys(keyPair.publicKey, MethodSpecificIdAlgo.Base58, 'key-1')
            const verificationMethods = createDIDVerificationMethod([VerificationMethods.Ed255192020], [verificationKeys])
            const payload = createDIDPayload(verificationMethods, [verificationKeys])
            const { protobufVerificationMethod } = validateSpecCompliantPayload(payload)

            await expect(signer.getDidSigner(nonExistingKeyId, protobufVerificationMethod!)).rejects.toThrow()
        })
    })

    describe('checkDidSigners', () => {
        it('it should instantiate a signer for a did', async () => {
            const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic)
            const signer = await SwisstronikSigningStargateClient.connectWithSigner(localnet.rpcUrl, wallet)
            const keyPair = createKeyPairBase64()
            const verificationKeys = createVerificationKeys(keyPair.publicKey, MethodSpecificIdAlgo.Base58, 'key-1')
            const verificationMethods = createDIDVerificationMethod([VerificationMethods.Ed255192020], [verificationKeys])
            const payload = createDIDPayload(verificationMethods, [verificationKeys])
            const { protobufVerificationMethod } = validateSpecCompliantPayload(payload)
            const didSigners = await signer.checkDidSigners(protobufVerificationMethod)

            expect(didSigners[VerificationMethods.Ed255192020]).toBe(EdDSASigner)
        })

        it('should instantiate multiple signers for a did with multiple verification methods', async () => {
            const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic)
            const signer = await SwisstronikSigningStargateClient.connectWithSigner(localnet.rpcUrl, wallet)
            const keyPair1 = createKeyPairBase64()
            const keyPair2 = createKeyPairBase64()
            const keyPair3 = createKeyPairBase64()
            const verificationKeys1 = createVerificationKeys(keyPair1.publicKey, MethodSpecificIdAlgo.Base58, 'key-1')
            const verificationKeys2 = createVerificationKeys(keyPair2.publicKey, MethodSpecificIdAlgo.Base58, 'key-2')
            const verificationKeys3 = createVerificationKeys(keyPair3.publicKey, MethodSpecificIdAlgo.Base58, 'key-3')
            const verificationMethods = createDIDVerificationMethod([VerificationMethods.Ed255192020, VerificationMethods.JWK, VerificationMethods.Ed255192018], [verificationKeys1, verificationKeys2, verificationKeys3])

            const payload = createDIDPayload(verificationMethods, [verificationKeys1, verificationKeys2, verificationKeys3])
            const { protobufVerificationMethod } = validateSpecCompliantPayload(payload)

            const didSigners = await signer.checkDidSigners(protobufVerificationMethod)

            expect(didSigners[VerificationMethods.Ed255192020]).toBe(EdDSASigner)
            expect(didSigners[VerificationMethods.JWK]).toBe(EdDSASigner)
            expect(didSigners[VerificationMethods.Ed255192018]).toBe(EdDSASigner)
        })

        it('should throw for non-supported verification method', async () => {
            const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic)
            const signer = await SwisstronikSigningStargateClient.connectWithSigner(localnet.rpcUrl, wallet)
            const verificationMethod: Partial<VerificationMethod> = {
                id: nonExistingKeyId,
                verificationMethodType: nonExistingVerificationMethod,
                controller: nonExistingDid,
                verificationMaterial: JSON.stringify({publicKeyMultibase: nonExistingPublicKeyMultibase})
            }

            await expect(signer.checkDidSigners([VerificationMethod.fromPartial(verificationMethod)])).rejects.toThrow()
        })
    })

    describe('signcreateDidDocTx', () => {
        it('should sign a did tx with valid signature', async () => {
            const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic)
            const signer = await SwisstronikSigningStargateClient.connectWithSigner(localnet.rpcUrl, wallet)
            const keyPair = createKeyPairBase64()
            const verificationKeys = createVerificationKeys(keyPair.publicKey, MethodSpecificIdAlgo.Base58, 'key-1')
            const verificationMethods = createDIDVerificationMethod([VerificationMethods.Ed255192020], [verificationKeys])
            const didPayload = createDIDPayload(verificationMethods, [verificationKeys])
            const signInputs: ISignInputs[] = [
                {
                    verificationMethodId: didPayload.verificationMethod![0].id,
                    privateKeyHex: toString(fromString(keyPair.privateKey, 'base64'), 'hex')
                }
            ]
            const { protobufVerificationMethod, protobufService } = validateSpecCompliantPayload(didPayload)
            const versionId = v4()
            const payload = MsgCreateDIDDocumentPayload.fromPartial({
                context: <string[]>didPayload?.['@context'],
                id: didPayload.id,
                controller: <string[]>didPayload.controller,
                verificationMethod: protobufVerificationMethod,
                authentication: <string[]>didPayload.authentication,
                assertionMethod: <string[]>didPayload.assertionMethod,
                capabilityInvocation: <string[]>didPayload.capabilityInvocation,
                capabilityDelegation: <string[]>didPayload.capabilityDelegation,
                keyAgreement: <string[]>didPayload.keyAgreement,
                service: protobufService,
                alsoKnownAs: <string[]>didPayload.alsoKnownAs,
                versionId: versionId
            })
            const signInfos = await signer.signCreateDIDDocumentTx(signInputs, payload)
            const publicKeyRaw = fromString(keyPair.publicKey, 'base64')
            const messageRaw = MsgCreateDIDDocumentPayload.encode(payload).finish()

            const verified = verify(
                publicKeyRaw,
                messageRaw,
                signInfos[0].signature
            )

            expect(verified).toBe(true)
        })
    })
})