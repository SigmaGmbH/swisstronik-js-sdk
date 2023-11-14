import {
  DIDDocument,
  DIDResolutionOptions,
  DIDResolutionResult,
  DIDResolver,
  ParsedDID,
  Resolvable,
} from 'did-resolver'
import {
  VerificationMethods,
} from '@swisstronik/sdk'
import { bases } from 'multiformats/basics'
  
  interface Options {
    url: string
  }
  
  /**
   * Default resolver url.
   * @public
   */
  export const DefaultResolverUrl = 'http://127.0.0.1:8545'
  
  /**
   * Creates a SwisstronikDidResolver instance that can be used with `did-resolver`.
   * @public
   */
  export function getResolver(options?: Options): Record<string, DIDResolver> {
    if (options?.url) return new SwisstronikDidResolver(options).build()
  
    return new SwisstronikDidResolver().build()
  }
  
  /**
   * SwisstronikDidResolver instance that can be used with `did-resolver`.
   * @public
   */
  export class SwisstronikDidResolver {
    private resolverUrl = DefaultResolverUrl
  
    constructor(options?: Options) {
      if (options?.url) this.resolverUrl = options.url
    }
  
    async resolve(
      did: string,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      parsed: ParsedDID,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _unused: Resolvable,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      options: DIDResolutionOptions,
    ): Promise<DIDResolutionResult> {
      try {
        const payload = {
          jsonrpc: "2.0",
          id: 0,
          method: "did_resolve",
          params: ["latest", did]
        };

        const result = await fetch(this.resolverUrl, {
          headers: { 'Content-Type': 'application/json' },
          method: "POST",
          body: JSON.stringify(payload)
        })

        // parse & normalize response
        const response = await result.json()
        const normalizedDIDDocument = this.normalizeDIDDocument(response.result.didDocument)
        return {
          didDocument: normalizedDIDDocument,
          didDocumentMetadata: response.result.didDocumentMetadata,
          didResolutionMetadata: {contentType: "application/did+json"}
        }
      } catch (e) {
        return Promise.reject(e)
      }
    }
  
    build(): Record<string, DIDResolver> {
      return { swtr: this.resolve.bind(this) }
    }

    // TODO: It is a quick fix, since resolver returns verification method field in snake case, not in camel case.
    private normalizeDIDDocument(didDocument: any): DIDDocument {
      let result = didDocument

      // Normalize verification method field name. Since verificationMethod is OPTIONAL field
      // we try to normalize it only if it presents
      if (result.hasOwnProperty("verification_method")) {
        result.verificationMethod = didDocument.verification_method
        delete result.verification_method

        // Parse each verification method and rename `verificationMaterial` field according
        // to verification method type + decode verification key
        result.verificationMethod = result.verificationMethod.map((vm: any) => {
          switch (vm?.type) {
            case VerificationMethods.Ed255192020:
              return {
                id: vm.id,
                controller: vm.controller,
                type: vm.type,
                publicKeyHex: this.decodeMultibaseToHex(vm.verification_material),
              }
            case VerificationMethods.JWK:
              return {
                id: vm.id,
                controller: vm.controller,
                verificationMethodType: vm.type,
                publicKeyJwk: JSON.parse(vm.verification_material),
              }
            case VerificationMethods.Ed255192018:
              return {
                id: vm.id,
                controller: vm.controller,
                verificationMethodType: vm.type,
                publicKeyBase58: vm.verification_material,
              }
            default:
              throw new Error(`Unsupported verificationMethod type: ${vm?.type}`)
          }
        })
      }

      return result
    }

    private decodeMultibaseToHex(material: string): string {
      const { base16, base58btc, base64, base64url } = bases
      const baseDecoder = base16.decoder.or(base58btc.decoder.or(base64.decoder.or(base64url.decoder)))
      return Buffer.from(baseDecoder.decode(material).slice(2)).toString('hex')
    }
  }