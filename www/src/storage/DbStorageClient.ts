import { $runtimeCall, RuntimeCall, Westend } from "@capi/westend"
import { ExtrinsicRune, hex, Rune } from "capi"
import { client } from "../trpc/trpc.js"
import { SetupType } from "../types/index.js"
import { fromSetupHex, toSetupHex } from "../util/capi-helpers.js"
import { IStorageClient } from "./IStorageClient.js"

export class DbStorageClient implements IStorageClient {
  async getSetups(address: string): Promise<SetupType[]> {
    const queried = await client.getAccountSetups.query(
      address,
    )
    return Promise.all(
      queried?.map((s) => fromSetupHex(s)) || [],
    )
  }
  async storeSetup(setup: SetupType): Promise<void> {
    const setupHex = await toSetupHex(setup)
    return client.addMultisig.mutate(setupHex)
  }
  async getCall(callHash: string): Promise<RuntimeCall | undefined> {
    const callData = await client.getCalldata.query(callHash)
    console.log(callData)
    if (!callData) return undefined
    try {
      return $runtimeCall.decode(hex.decode(callData.data.slice(2)))
    } catch (exception) {
      console.error(`Unable to decode call ${callData}`)
      return undefined
    }
  }
  async storeCall(call: ExtrinsicRune<Westend, never>): Promise<void> {
    const collection = await Rune.array([
      call.callHash.access(),
      call.callData.access(),
    ]).run()
    const [hash, data] = collection.map((value) => "0x" + hex.encode(value))
    if (!hash || !data) {
      throw new Error("Could not store calldata. Serialization has failed.")
    }
    const calldata = { hash, data }
    return client.addCalldata.mutate(calldata)
  }
}
