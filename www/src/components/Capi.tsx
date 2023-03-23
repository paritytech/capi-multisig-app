import { System } from "@capi/polkadot"
import { alice, ChainRune, WsConnection } from "capi"
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

      console.log("capi: ", accountInfo)

      console.log("codegen: ", await System.Account.entryPage(10, null).run())

      try {
        const result = await System.Account.value(alice.publicKey).run()
        console.log(result)
      } catch (error) {
        console.error(error)
      }
    }

    fetchBalance()
  }, [])

  return <h1 class="text-xl">Capi balance (console.log)</h1>
}
