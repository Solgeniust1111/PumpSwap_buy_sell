import { Connection, Keypair, PublicKey, sendAndConfirmTransaction } from "@solana/web3.js"
import { PumpfunAmm } from "../../pumpAmm/pumpAmm_client"
import { PRIVATE_KEY, RPC_ENDPOINT } from "../../constants"
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes"

export const pumpSwapBuy = async () => {
    try {
        console.log("here")
        const connection = new Connection(RPC_ENDPOINT, 'confirmed')

        const pool = new PublicKey("69DPEf311TfFgHzgSukT8hVNtxAgxjMyxQXnUEbqCbeQ")
        const mint = new PublicKey("3SEGgF9BargVkCSugpDSuok8EC4fHiia4SLL2aQgpump")
        const payer = Keypair.fromSecretKey(bs58.decode(PRIVATE_KEY))
        console.log("payer: ", payer.publicKey)
        const pumpAmmClient = new PumpfunAmm(connection)
        const tx = await pumpAmmClient.getBuyTx(payer, mint, pool, 100 * 10 ** 6, 0.001 * 10 ** 9)
        tx.feePayer = payer.publicKey
        const res = await sendAndConfirmTransaction(connection, tx, [payer]);
        if (res) {
            console.log("signature: ", res)
        }
    } catch (error) {
        console.log(error)
    }
}