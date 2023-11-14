import {
	Registry,
	GeneratedType,
} from '@cosmjs/proto-signing'

import { defaultRegistryTypes } from '@cosmjs/stargate'

export function createDefaultIdentityRegistry(customTypes?: Iterable<[string, GeneratedType]>): Registry {
	if (!customTypes) customTypes = [];
	return new Registry([...defaultRegistryTypes, ...customTypes])
}

export const IdentityRegistry = new Registry(defaultRegistryTypes)
