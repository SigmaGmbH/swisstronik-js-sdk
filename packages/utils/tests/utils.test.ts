import { bech32toEthAddress, ethAddressToBech32} from '../src'

it('Should properly convert bech32 address to hex', () => {
    const correctBech32Address = "swtr13sllcdsqhjektac5r6h50dvjrthm0yt6zw3q4s"
    const expectedAddress = "0x8C3FFC3600BCB365F7141EAF47B5921AEFB7917A"

    const result = bech32toEthAddress(correctBech32Address)
    expect(result.toLowerCase()).toEqual(expectedAddress.toLowerCase())
})

it('Should properly convert hex address to bech32', () => {
    const correctAddress = "0x8C3FFC3600BCB365F7141EAF47B5921AEFB7917A"
    const expectedBech32Address = "swtr13sllcdsqhjektac5r6h50dvjrthm0yt6zw3q4s"

    const result = ethAddressToBech32(correctAddress)
    expect(result.toLowerCase()).toEqual(expectedBech32Address.toLowerCase())
})