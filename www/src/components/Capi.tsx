import { System } from "@capi/polkadot"
import { alice } from "capi"
import { useEffect } from "preact/hooks"

export function Capi() {
  useEffect(() => {
    const fetchBalance = async () => {
      // https://github.com/paritytech/capi/blob/main/examples/balance.ts
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
