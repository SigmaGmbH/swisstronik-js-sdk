import {
    TImportableEd25519Key,
    createSignInputsFromImportableEd25519Key,
    getCosmosAccount,
    isJSON,
} from '../src/utils'
import {
    createDIDVerificationMethod,
    createVerificationKeys,
    createKeyPairRaw
} from '../src/utils'
import { toString } from 'uint8arrays/to-string'
import {
    IKeyPair,
    MethodSpecificIdAlgo,
    VerificationMethods
} from '../src/types'
import { DirectSecp256k1HdWallet } from "../src/compatability"
import { stringToPath } from '@cosmjs/crypto'

describe('createSignInputsFromImportableEd25519Key', () => {
    it('should create a sign input from an importable ed25519 key 2020', async () => {
        const keyPair = createKeyPairRaw()
        const importableEd25519Key: TImportableEd25519Key = {
            publicKeyHex: toString(keyPair.publicKey, 'hex'),
            privateKeyHex: toString(keyPair.secretKey, 'hex'),
            kid: toString(keyPair.publicKey, 'hex'),
            type: 'Ed25519'
        }
        const keyPairBase64: IKeyPair = {
            publicKey: toString(keyPair.publicKey, 'base64'),
            privateKey: toString(keyPair.secretKey, 'base64'),
        }

        const verificationKeys = createVerificationKeys(keyPairBase64.publicKey, MethodSpecificIdAlgo.Base58, 'key-1')
        const verificationMethod = createDIDVerificationMethod([VerificationMethods.Ed255192020], [verificationKeys])
        const signInput = createSignInputsFromImportableEd25519Key(importableEd25519Key, verificationMethod)

        expect(signInput).toEqual({ verificationMethodId: verificationKeys.keyId, privateKeyHex: importableEd25519Key.privateKeyHex })
    })

    it('should create a sign input from an importable ed25519 key 2018', async () => {
        const keyPair = createKeyPairRaw()
        const importableEd25519Key: TImportableEd25519Key = {
            publicKeyHex: toString(keyPair.publicKey, 'hex'),
            privateKeyHex: toString(keyPair.secretKey, 'hex'),
            kid: toString(keyPair.publicKey, 'hex'),
            type: 'Ed25519'
        }
        const keyPairBase64: IKeyPair = {
            publicKey: toString(keyPair.publicKey, 'base64'),
            privateKey: toString(keyPair.secretKey, 'base64'),
        }

        const verificationKeys = createVerificationKeys(keyPairBase64.publicKey, MethodSpecificIdAlgo.Base58, 'key-1')
        const verificationMethod = createDIDVerificationMethod([VerificationMethods.Ed255192018], [verificationKeys])
        const signInput = createSignInputsFromImportableEd25519Key(importableEd25519Key, verificationMethod)

        expect(signInput).toEqual({ verificationMethodId: verificationKeys.keyId, privateKeyHex: importableEd25519Key.privateKeyHex })
    })

    it('should create a sign input from an importable ed25519 key with VM type JWK', () => {
        const keyPair = createKeyPairRaw()
        const importableEd25519Key: TImportableEd25519Key = {
            publicKeyHex: toString(keyPair.publicKey, 'hex'),
            privateKeyHex: toString(keyPair.secretKey, 'hex'),
            kid: toString(keyPair.publicKey, 'hex'),
            type: 'Ed25519'
        }
        const keyPairBase64: IKeyPair = {
            publicKey: toString(keyPair.publicKey, 'base64'),
            privateKey: toString(keyPair.secretKey, 'base64'),
        }

        const verificationKeys = createVerificationKeys(keyPairBase64.publicKey, MethodSpecificIdAlgo.Base58, 'key-1')
        const verificationMethod = createDIDVerificationMethod([VerificationMethods.JWK], [verificationKeys])
        const signInput = createSignInputsFromImportableEd25519Key(importableEd25519Key, verificationMethod)

        expect(signInput).toEqual({ verificationMethodId: verificationKeys.keyId, privateKeyHex: importableEd25519Key.privateKeyHex })
    })

    it('should get the cosmos account from publicKeyHex', () => {
        const pubkeyHex = "04c68c987d7a36208ba28b593ade5ea9593235575d2b7572df9c7c1ec831fccc589a8eb911a1344a7b5ccfa4ae093a55ee1bc5b4d29b1973434581cb856e83640e"
        const expectedAddress = "swtr13sllcdsqhjektac5r6h50dvjrthm0yt6zw3q4s"

        expect(getCosmosAccount(pubkeyHex)).toEqual(expectedAddress)
    })

    it('should return valid json', async () => {
        // define invalid cases
        const invalid = [
            'invalid',
            '{invalid: json}',
            '{"invalid": "json"',
            '"invalid": "json"}',
            '{""}',
            0,
            1,
            true,
            null,
            undefined,
        ]

        // define valid cases
        const valid = [
            '{"valid": "json"}',
            '{"valid": "json", "with": "multiple", "keys": "and", "values": "of", "different": "types"}',
            '{"valid": "json", "with": "multiple", "keys": "and", "values": "of", "different": "types", "and": {"nested": "objects"}}',
            '{"valid": "json", "with": "multiple", "keys": "and", "values": "of", "different": "types", "and": {"nested": "objects", "and": {"even": {"more": {"nested": "objects"}}}}}',
            '{"": ""}',
            '{"boolean": true}',
            '{"boolean": false}',
            '{"number": 0}',
            '{"nullish": null}',
            '{"array": []}',
            '{"array": [1, 2, 3]}',
            '{"array": [1, 2, 3], "with": ["multiple", "arrays"]}',
        ]

        // check invalid cases
        invalid.forEach((invalidCase) => {
            expect(isJSON(invalidCase)).toBe(false)
        })

        // check valid cases
        valid.forEach((validCase) => {
            expect(isJSON(validCase)).toBe(true)
        })
    })

    it('should recover correct wallet from mnemonic', async () => {
        const mnemonic = "entry garbage bike poem grunt negative easily annual miss happy license blur false fringe program picture inner tape dismiss eagle include quality drill master"
        const expectedAddress = "swtr13sllcdsqhjektac5r6h50dvjrthm0yt6zw3q4s"

        const hdWallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic,{
            prefix: "swtr",
            hdPaths: [ stringToPath("m/44'/60'/0'/0/0") ]
        });
        const [wallet] = await hdWallet.getAccounts()

        expect(wallet.address).toEqual(expectedAddress)
    })
})