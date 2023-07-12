import { Westend } from "@capi/westend"
import { RuntimeCall } from "@capi/westend"
import { ExtrinsicRune } from "capi"
import { SetupType } from "../types/index.js"

export interface IStorageClient {
  getSetups(member: string): Promise<SetupType[]>
  storeSetup(setup: SetupType): Promise<void>
  getCall(callHash: string): Promise<RuntimeCall | undefined>
  storeCall(call: ExtrinsicRune<Westend, never>): Promise<void>
}
