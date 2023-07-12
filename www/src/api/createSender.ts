import { westend } from "@capi/westend"
import { pjsSender } from "capi/patterns/compat/pjs_sender"
import { defaultExtension } from "../signals/accounts.js"

export function createSender(address: string) {
  return pjsSender(
    westend,
    defaultExtension.value!.signer as any,
  )(address)
}
