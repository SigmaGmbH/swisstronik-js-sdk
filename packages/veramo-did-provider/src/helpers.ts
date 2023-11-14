import { toString } from 'uint8arrays/to-string'

export const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined'
export const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null
export const isWebWorker = typeof self === 'object' && self.constructor && self.constructor.name === 'DedicatedWorkerGlobalScope'
export const isJsDom = (typeof window !== 'undefined' && window.name === 'nodejs') || (typeof navigator !== 'undefined' && (navigator.userAgent.includes('jsdom') || navigator.userAgent.includes('Node.js')))
export const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative' // use wisely: limited as of react-native v0.67 + navigator.product has been deprecated
export const isElectron = (typeof window !== 'undefined' && typeof window.process === 'object' && (window.process as NodeJS.Process & { type: 'browser' | 'renderer' | 'worker' | 'utility' }).type === 'renderer') || (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) || (typeof process === 'object' && typeof process.versions === 'object' && !!process.versions.electron)

export async function randomFromRange(min: number, max: number, notIn: number[]): Promise<number> {
    const random = Math.floor(Math.random() * (max - min + 1) + min)
    if (notIn.includes(random)) {
        return await randomFromRange(min, max, notIn)
    }
    return random
}

export async function toBlob(data: Uint8Array): Promise<Blob> {
    return new Blob([data])
}

export async function blobToHexString(blob: Blob): Promise<string> {
    const buffer = await blob.arrayBuffer()
    const uint8Array = new Uint8Array(buffer)
    return toString(uint8Array, 'hex')
}