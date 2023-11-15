import {
    DirectSecp256k1HdWallet,
    SwisstronikSigningStargateClient,
} from "../src"
import {
    faucet
} from './testutils.test'

import {
    EthAccount
} from '../src/types-proto/ethermint/types/v1/account'
import {
    BaseAccount
} from '../src/types-proto/cosmos/auth/v1beta1/auth'

describe('debug', () => {
    it('encode decode', async () => {
        const acc = BaseAccount.fromPartial({
            accountNumber: 0,
            address: "debug",
            sequence: 0,
        })
        const encoded = BaseAccount.encode(acc).finish()
        const decoded = BaseAccount.decode(encoded)
        console.log(decoded)
    })
    // it('can be instantiated & works for swisstronik network', async () => {
    //     const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic)
    //     const signer = await SwisstronikSigningStargateClient.connectWithSigner("https://rpc.testnet.swisstronik.com", wallet)

    //     const res = await signer.getAccount("swtr1fv64953tatw4t80t6sn725fr2yzf2dyv8g96en")
    //     console.log(res)
    // }, 15000)
})