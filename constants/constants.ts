import { retrieveEnvVariable } from "../utils"
import { PublicKey } from "@solana/web3.js";

export const PRIVATE_KEY = retrieveEnvVariable('PRIVATE_KEY')
export const RPC_ENDPOINT = retrieveEnvVariable('RPC_ENDPOINT')
export const RPC_WEBSOCKET_ENDPOINT = retrieveEnvVariable('RPC_WEBSOCKET_ENDPOINT')
export const PUMPAMM_FEE_RECIPIENT = new PublicKey("62qc2CNXwrYqQScmEdiZFFAnJR262PxWEuNQtxfafNgV")
export const JITO_FEE = retrieveEnvVariable('JITO_FEE')
