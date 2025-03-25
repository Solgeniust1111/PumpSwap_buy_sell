import { Connection, Keypair, PublicKey, sendAndConfirmTransaction } from "@solana/web3.js"
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes"
import { createMint } from "@solana/spl-token"
import {
    percentAmount,
    generateSigner,
    signerIdentity,
    createSignerFromKeypair,
} from "@metaplex-foundation/umi";
import {
    TokenStandard,
    createAndMint,
    mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { PRIVATE_KEY, RPC_ENDPOINT } from "../../constants";
import { PumpfunAmm } from "../../pumpAmm/pumpAmm_client";

export const pumpSwapCreate = async () => {
    try {
        console.log("here")
        const connection = new Connection(RPC_ENDPOINT, 'confirmed')

        const payer = Keypair.fromSecretKey(bs58.decode(PRIVATE_KEY))

        // const umi = createUmi(connection); //Replace with your QuickNode RPC Endpoint

        // const userWallet = umi.eddsa.createKeypairFromSecretKey(bs58.decode(PRIVATE_KEY));

        // const userWalletSigner = createSignerFromKeypair(umi, userWallet);

        // const metadata = {
        //     name: "xyz",
        //     symbol: "_0_",
        //     uri: "https://arweave.net/0qUGUIrmXCu-N6lUQZTuSPSsaCF9bK7Y19GvgAjuBIY",
        // };
        // // create mint
        // const mint = generateSigner(umi);
        // console.log("mint => ", mint)
        // //
        // umi.use(signerIdentity(userWalletSigner));
        // umi.use(mplTokenMetadata());

        // createAndMint(umi, {
        //     mint,
        //     authority: umi.identity,
        //     name: metadata.name,
        //     symbol: metadata.symbol,
        //     uri: metadata.uri,
        //     sellerFeeBasisPoints: percentAmount(0),
        //     decimals: 6,
        //     amount: 1000_000_000_000000,
        //     tokenOwner: userWallet.publicKey,
        //     tokenStandard: TokenStandard.Fungible,
        // })
        //     .sendAndConfirm(umi)

        const pumpAmmClient = new PumpfunAmm(connection)
        const tx = await pumpAmmClient.getCreateTx(payer, 200 * 10 ** 6, 0.0001 * 10 ** 9, "3WarJxWbBBLULsRS4zJ8cyLrEu5HB7rJszuh2PdF6JeV")
        if (!tx) return
        tx.feePayer = payer.publicKey
        const res = await sendAndConfirmTransaction(connection, tx, [payer]);
        if (res) {
            console.log("signature: ", res)
        }
    } catch (error) {
        console.log(error)
    }
}