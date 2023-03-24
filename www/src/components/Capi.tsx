// import { System } from "@capi/polkadot"
import { System } from "@capi/polkadot_westend"
import { ChainRune, ss58, WsConnection } from "capi"
import { useEffect } from "preact/hooks"

export function Capi() {
  useEffect(() => {
    const fetchBalance = async () => {
      const address = "5CDPWdQ3DpF6eBjU8becHPnCwMY5UbxFDhfaorv9wcu8it2L"
      const addressPubKey = ss58.decode(address)[1]

      // ----- Capi balance
      const chain = ChainRune.from(
        WsConnection,
        "wss://westend-rpc.polkadot.io",
      ) // wss://rpc.polkadot.io

      const balanceCapi = await chain
        .pallet("System")
        .storage("Account")
        .value(addressPubKey)
        .run()

      console.log("Balance from Capi: ", formatToDot(balanceCapi.data.free))

      // ----- Capi codegen balance
      const balanceCapiCodegen: any = await System.Account.value(
        addressPubKey,
      ).run()

      console.log(
        "Balance from Capi codegen: ",
        formatToDot(balanceCapiCodegen.data.free),
      )
    }

    fetchBalance()
  }, [])

  return <h1 class="text-xl">Capi balance (console.log)</h1>
}

function formatToDot(balance: number) {
  return `${balance.toString().slice(0, -10)}.${balance.toString().slice(-10)}`
}
