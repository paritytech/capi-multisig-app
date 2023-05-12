import { MultiAddress, Westend, westend } from "@capi/westend"
import { effect, Signal, signal } from "@preact/signals"
import { ExtrinsicRune, ss58 } from "capi"
import { defaultAccount } from "../../../signals/index.js"
import { formData } from "./formData.js"

export const selectedAccount = signal(defaultAccount.value)
export const call = signal<ExtrinsicRune<Westend, never> | undefined>(undefined)
export const fee: Signal<number> = signal(0)

effect(() => {
  if (!formData.value.to) return
  const addressPubKey = ss58.decode(formData.value.to)[1]
  call.value = westend.Balances
    .transferKeepAlive({
      value: BigInt(formData.value.amount),
      dest: MultiAddress.Id(addressPubKey),
    })
})

effect(() => {
  call.value?.estimate().run().then((estimate: BigInt) => {
    fee.value = Number(estimate)
  })
})
