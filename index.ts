
import { pumpSwapBuy } from "./src/tx/pumpSwapBuy"
import { pumpSwapSell } from "./src/tx/pumpSwapSell"
import { pumpSwapCreate } from "./src/tx/pumpSwapCreate"

const main = async () => {

  // await pumpSwapBuy()
  // await pumpSwapSell()
  await pumpSwapCreate()

}

main()



