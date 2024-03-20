import "./polyfills.js";
import {
	OfflineSigner,
	Registry
} from '@cosmjs/proto-signing'
import {
	DIDModule,
	MinimalImportableDIDModule,
	DidExtension
} from './modules/did.js';
import {
	MinimalImportableResourceModule,
	ResourceModule,
	ResourceExtension
} from './modules/resource.js';
import {
	AbstractIdentitySDKModule,
	applyMixins,
	instantiateIdentitySDKModule,
	instantiateIdentitySDKModuleRegistryTypes,
	instantiateIdentitySDKModuleQuerierExtensionSetup
} from './modules/_.js';
import { createDefaultIdentityRegistry } from './registry.js'
import { SwisstronikSigningStargateClient } from './signer.js'
import {
	IContext,
	IModuleMethodMap
} from './types.js';
import {
	GasPrice,
	QueryClient
} from '@cosmjs/stargate'
import { SwisstronikQuerier } from './querier.js'
import { Tendermint34Client } from '@cosmjs/tendermint-rpc'

export interface IIdentitySDKOptions {
	modules: AbstractIdentitySDKModule[]
	querierExtensions?: Record<string, any>[] 
	rpcUrl: string
	gasPrice?: GasPrice
	authorizedMethods?: string[]
	readonly wallet: OfflineSigner
}

export type DefaultIdentitySDKModules = MinimalImportableDIDModule & MinimalImportableResourceModule

export interface IdentitySDK extends DefaultIdentitySDKModules {}

export class IdentitySDK {
	methods: IModuleMethodMap
	signer: SwisstronikSigningStargateClient
	querier: SwisstronikQuerier & DidExtension & ResourceExtension
	options: IIdentitySDKOptions
	private protectedMethods: string[] = ['constructor', 'build', 'loadModules', 'loadRegistry']

	constructor(options: IIdentitySDKOptions) {
		if (!options?.wallet) {
			throw new Error('No wallet provided')
		}

		this.options = {
			authorizedMethods: [],
			...options
		}

		this.methods = {}
		this.signer = new SwisstronikSigningStargateClient(undefined, this.options.wallet, {})
		this.querier = <any> new QueryClient({} as unknown as Tendermint34Client)
	}

	async execute<P = any, R = any>(method: string, ...params: P[]): Promise<R> {
		if (!Object.keys(this.methods).includes(method)) {
			throw new Error(`Method ${method} is not authorized`)
		}
		return await this.methods[method](...params, { sdk: this } as IContext)
	}

	private async loadModules(modules: AbstractIdentitySDKModule[]): Promise<IdentitySDK> {
		this.options.modules = this.options.modules.map((module: any) => instantiateIdentitySDKModule(module, this.signer, this.querier, { sdk: this } as IContext) as unknown as AbstractIdentitySDKModule)

		const methods = applyMixins(this, modules)
		this.methods = { ...this.methods, ...filterUnauthorizedMethods(methods, this.options.authorizedMethods || [], this.protectedMethods) }

		for (const method of Object.keys(this.methods)) {
			// @ts-ignore
			this[method] = async (...params: any[]) => {
				return await this.execute(method, ...params)
			}
		}

		return this
	}

    private loadRegistry(): Registry {
        const registryTypes = this.options.modules.map((module: any) => instantiateIdentitySDKModuleRegistryTypes(module)).reduce((acc, types) => {
            return [...acc, ...types]
        })
        return createDefaultIdentityRegistry(registryTypes)
    }

	private async loadQuerierExtensions(): Promise<SwisstronikQuerier & DidExtension & ResourceExtension> {
		const querierExtensions = this.options.modules.map((module: any) => instantiateIdentitySDKModuleQuerierExtensionSetup(module))
		const querier = await SwisstronikQuerier.connectWithExtensions(this.options.rpcUrl, ...querierExtensions)
		return <SwisstronikQuerier & DidExtension & ResourceExtension>querier
	}

	async build(): Promise<IdentitySDK> {
        const registry = this.loadRegistry()

		this.querier = await this.loadQuerierExtensions()
		this.signer = await SwisstronikSigningStargateClient.connectWithSigner(
			this.options.rpcUrl,
			this.options.wallet,
            {
                registry,
				gasPrice: this.options?.gasPrice,
            }
		)

		return await this.loadModules(this.options.modules)
	}
}

export function filterUnauthorizedMethods(methods: IModuleMethodMap, authorizedMethods: string[], protectedMethods: string[]): IModuleMethodMap {
	let _methods = Object.keys(methods)
	if (authorizedMethods.length === 0)
		return _methods
			.filter(method => !protectedMethods.includes(method))
			.reduce((acc, method) => ({ ...acc, [method]: methods[method] }), {})

	return _methods
		.filter(method => authorizedMethods.includes(method) && !protectedMethods.includes(method))
		.reduce((acc, method) => ({ ...acc, [method]: methods[method] }), {})
}

export async function createIdentitySDK(options: IIdentitySDKOptions): Promise<IdentitySDK> {
	return await (new IdentitySDK(options)).build()
}

export { DIDModule, ResourceModule }
export { AbstractIdentitySDKModule, applyMixins } from './modules/_.js'
export {
	DidExtension,
	MinimalImportableDIDModule,
	MsgCreateDidDocEncodeObject,
	MsgCreateDidDocResponseEncodeObject,
	MsgUpdateDidDocEncodeObject,
	MsgUpdateDidDocResponseEncodeObject,
	MsgDeactivateDidDocEncodeObject,
	MsgDeactivateDidDocResponseEncodeObject,
	contexts,
	defaultDidExtensionKey,
	protobufLiterals as protobufLiteralsDid,
	typeUrlMsgCreateDidDoc,
	typeUrlMsgCreateDidDocResponse,
	typeUrlMsgUpdateDidDoc,
	typeUrlMsgUpdateDidDocResponse,
	typeUrlMsgDeactivateDidDoc,
	typeUrlMsgDeactivateDidDocResponse,
	setupDidExtension,
	isMsgCreateDidDocEncodeObject,
	isMsgUpdateDidDocEncodeObject,
	isMsgDeactivateDidDocEncodeObject,
} from './modules/did.js'
export {
	ResourceExtension,
	MinimalImportableResourceModule,
	defaultResourceExtensionKey,
	protobufLiterals as protobufLiteralsResource,
	typeUrlMsgCreateResource,
	typeUrlMsgCreateResourceResponse,
	setupResourceExtension,
	isMsgCreateResourceEncodeObject,
} from './modules/resource.js'
export * from './signer.js'
export * from './client.js'
export * from './querier.js'
export * from './registry.js'
export * from './types.js'
export {
	TImportableEd25519Key,
	createKeyPairRaw, 
	createKeyPairBase64,
	createKeyPairHex,
	createVerificationKeys,
	createDIDVerificationMethod as createDidVerificationMethod,
	createDIDPayload as createDidPayload,
	createSignInputsFromImportableEd25519Key,
	validateSpecCompliantPayload,
	isEqualKeyValuePair,
    createCosmosPayerWallet,
	getCosmosAccount,
	checkBalance
} from './utils.js'
export * from './compatability/index.js'
export * from './types-proto/index.js'