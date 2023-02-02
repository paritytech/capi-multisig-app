import { alice } from "capi"
import { System } from "http://localhost:4646/frame/dev/polkadot/@v0.9.36/mod.ts"
import { useEffect } from "preact/hooks"

export default function CapiComponent() {
  useEffect(() => {
    ;(async () => {
      console.log(await System.Account.entry([alice.publicKey]).run())
    })()
  }, [])
  return <div>Capi-using component</div>
}
