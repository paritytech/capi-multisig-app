// import { System } from "@capi/polkadot"
import { ChainRune, WsConnection } from "capi"
import { useEffect } from "preact/hooks"

export function Capi() {
  useEffect(() => {
    const fetchBalance = async () => {
      // https://github.com/paritytech/capi/blob/main/examples/balance.ts
      const chain = ChainRune.from(WsConnection, "wss://rpc.polkadot.io")

      const accountInfo = await chain
        .pallet("System")
        .storage("Account")
        .entryPage(10, null)
        .run()

      console.log(accountInfo)
    }

    fetchBalance()
  }, [])

  return <h1 class="text-xl">Capi balance (console.log)</h1>
}
