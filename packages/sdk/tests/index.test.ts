import {
    GeneratedType
} from '@cosmjs/proto-signing'
import {
    DirectSecp256k1HdWallet,
    AbstractIdentitySDKModule,
    SwisstronikSigningStargateClient,
    createDefaultIdentityRegistry,
    SwisstronikQuerier,
    createIdentitySDK,
    DIDModule,
    IIdentitySDKOptions,
    ResourceModule,
    QueryExtensionSetup,
    setupDidExtension,
    DidExtension,
    defaultDidExtensionKey,
    setupResourceExtension,
    ResourceExtension,
    defaultResourceExtensionKey
} from '../src'
import {
    localnet,
    faucet
} from './testutils.test'
import { jest } from '@jest/globals'

describe(
    'IdentitySDK', () => {
        describe('constructor', () => {
            it('can be instantiated with modules', async () => {
                const options = {
                    modules: [DIDModule as unknown as AbstractIdentitySDKModule],
                    rpcUrl: localnet.rpcUrl,
                    wallet: await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic)
                } as IIdentitySDKOptions
                const identitySDK = await createIdentitySDK(options)

                const sdkMethods = Object.keys(identitySDK.methods)
                const testSigner = await SwisstronikSigningStargateClient.connectWithSigner(options.rpcUrl, options.wallet)
                const testQuerier = await SwisstronikQuerier.connectWithExtension(options.rpcUrl, setupDidExtension) as SwisstronikQuerier & DidExtension
                const moduleMethods = Object.keys(new DIDModule(testSigner, testQuerier).methods)

                moduleMethods.forEach((method) => {
                    expect(sdkMethods).toContain(method)
                })
            }, 15000)

            it('should use module methods', async () => {
                const rpcUrl = localnet.rpcUrl
                const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic)

                class TestModule extends AbstractIdentitySDKModule {
                    registryTypes: Iterable<[string, GeneratedType]> = []
                    methods = {
                        doSomething: this.doSomething.bind(this)
                    }

                    constructor(signer: SwisstronikSigningStargateClient, querier: SwisstronikQuerier) {
                        super(signer, querier)
                    }

                    public getRegistryTypes(): Iterable<[string, GeneratedType]> {
                        return TestModule.registryTypes
                    }

                    public getQuerierExtensionSetup(): QueryExtensionSetup<{}> {
                        return () => ({})
                    }

                    async doSomething(): Promise<string> {
                        return 'did something'
                    }
                }

                const options = {
                    modules: [TestModule as unknown as AbstractIdentitySDKModule],
                    rpcUrl,
                    wallet
                } as IIdentitySDKOptions

                const identitySDK = await createIdentitySDK(options)

                //@ts-ignore
                const doSomething = await identitySDK.doSomething()
                expect(doSomething).toBe('did something')

                const spy = jest.spyOn(identitySDK.methods, 'doSomething')
                //@ts-ignore
                await identitySDK.doSomething()
                expect(spy).toHaveBeenCalled()
            }, 15000)

            it('should instantiate registry from passed modules', async () => {
                const options = {
                    modules: [DIDModule as unknown as AbstractIdentitySDKModule],
                    rpcUrl: localnet.rpcUrl,
                    wallet: await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic)
                } as IIdentitySDKOptions
                const identitySDK = await createIdentitySDK(options)

                const didRegistryTypes = DIDModule.registryTypes
                const identityRegistry = createDefaultIdentityRegistry(didRegistryTypes)

                expect(identitySDK.signer.registry).toStrictEqual(identityRegistry)
            }, 15000)

            it('should instantiate registry from multiple passed modules', async () => {
                const options = {
                    modules: [DIDModule as unknown as AbstractIdentitySDKModule, ResourceModule as unknown as AbstractIdentitySDKModule],
                    rpcUrl: localnet.rpcUrl,
                    wallet: await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic)
                } as IIdentitySDKOptions
                const identitySDK = await createIdentitySDK(options)

                const didRegistryTypes = DIDModule.registryTypes
                const resourceRegistryTypes = ResourceModule.registryTypes
                const identityRegistry = createDefaultIdentityRegistry([...didRegistryTypes, ...resourceRegistryTypes])

                expect(identitySDK.signer.registry).toStrictEqual(identityRegistry)
            }, 15000)

            it('should instantiate querier extension from passed modules', async () => {
                const options = {
                    modules: [DIDModule as unknown as AbstractIdentitySDKModule],
                    rpcUrl: localnet.rpcUrl,
                    wallet: await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic)
                } as IIdentitySDKOptions
                const identitySDK = await createIdentitySDK(options)

                const querier = await SwisstronikQuerier.connectWithExtension(options.rpcUrl, setupDidExtension) as SwisstronikQuerier & DidExtension

                // we need to stringify the querier extension because it's a proxy object
                // and the equality check will fail
                expect(JSON.stringify(identitySDK.querier[defaultDidExtensionKey])).toStrictEqual(JSON.stringify(querier[defaultDidExtensionKey]))
            }, 15000)

            it('should instantiate querier extension from multiple passed modules', async () => {
                const options = {
                    modules: [DIDModule as unknown as AbstractIdentitySDKModule, ResourceModule as unknown as AbstractIdentitySDKModule],
                    rpcUrl: localnet.rpcUrl,
                    wallet: await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic)
                } as IIdentitySDKOptions
                const identitySDK = await createIdentitySDK(options)
                const resourceQuerier = await SwisstronikQuerier.connectWithExtension(options.rpcUrl, setupResourceExtension) as SwisstronikQuerier & ResourceExtension

                // we need to stringify the querier extension because it's a proxy object
                // and the equality check will fail
                expect(JSON.stringify(identitySDK.querier[defaultResourceExtensionKey])).toStrictEqual(JSON.stringify(resourceQuerier[defaultResourceExtensionKey]))
            }, 15000)
        })
    }
)