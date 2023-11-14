import { bech32 } from 'bech32';
import {hexToU8a, u8aToHex} from "./utils";
const { encode, decode, toWords, fromWords } = bech32;

const SWTR_PREFIX = "swtr"

/**
 * @name bech32toEthAddress
 * @summary Converts bech32 address with `swtr` prefix to ethereum (0x-prefixed hex) format
 * @description Correct `swtr`-prefixed bech32 input address returns 0x-prefixed hex string. Otherwise, will throw an error
 * @example
 * bech32toEthAddress("swtr13sllcdsqhjektac5r6h50dvjrthm0yt6zw3q4s"); // 0x8C3FFC3600BCB365F7141EAF47B5921AEFB7917A
 *
 */
export function bech32toEthAddress(address: string): string {
    const {prefix, words} = decode(address)

    if (prefix !== SWTR_PREFIX) {
        throw Error(`Incorrect prefix. Expected: ${SWTR_PREFIX}, Got: ${prefix}`)
    }

    const addressBytes = Uint8Array.from(fromWords(words))
    return u8aToHex(addressBytes)
}

/**
 * @name ethAddressToBech32
 * @summary Converts ethereum address to bech32 with `swtr` prefix
 * @description Correct ethereum address returns bech32-encoded address with `swtr` prefix. Otherwise, will throw an error
 * @example
 * ethAddressToBech32("0x8C3FFC3600BCB365F7141EAF47B5921AEFB7917A"); // swtr13sllcdsqhjektac5r6h50dvjrthm0yt6zw3q4s
 */
export function ethAddressToBech32(address: string): string {
    const ethAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
    if (!ethAddressRegex.test(address)) {
        throw Error("Invalid ethereum address")
    }

    const addressBytes = hexToU8a(address)
    return encode(SWTR_PREFIX, toWords(addressBytes))
}



