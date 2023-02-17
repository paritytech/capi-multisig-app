import { System } from "http://localhost:4646/frame/wss/rpc.polkadot.io/@v0.9.37/mod.ts"
import { useEffect } from "preact/hooks"

export default function CapiComponent() {
  useEffect(() => {
    ;(async () => {
      // console.log(await System.Account.keyPage(10).run())
    })()
  }, [])
  return <div>Capi-using component</div>
}
