import { GasPrice } from "@cosmjs/stargate"
import dotenv from "dotenv"

dotenv.config()

export const faucet = {
    prefix: 'swtr',
    minimalDenom: 'uswtr',
    mnemonic: process.env.MNEMONIC || 'entry garbage bike poem grunt negative easily annual miss happy license blur false fringe program picture inner tape dismiss eagle include quality drill master',
    address: process.env.FAUCET_ADDRESS || 'swtr13sllcdsqhjektac5r6h50dvjrthm0yt6zw3q4s',
}

export const localnet = {
    rpcUrl: process.env.RPC_URL || 'http://127.0.0.1:26657',
    gasPrice: GasPrice.fromString( `50${faucet.minimalDenom}` )
}

export const json_content = "{\"message\": \"hello world\"}"

export const image_content = 'iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAAA1BMVEW10NBjBBbqAAAAH0lEQVRoge3BAQ0AAADCoPdPbQ43oAAAAAAAAAAAvg0hAAABmmDh1QAAAABJRU5ErkJggg' as const

export const default_content = '<p>Test file content</p>'

export function containsAll<T>(array: T[], values: T[]): boolean {
    return values.every(value => array.includes(value))
}

export function containsAllButOmittedFields<T extends Record<string, any>>(array: T[], values: T[], omit: string[]): boolean {
    const replacer = (key: string, value: any) => omit.includes(key) ? undefined : value
    return values.every(value => array.some(item => JSON.stringify(item, replacer) === JSON.stringify(value, replacer)))
}