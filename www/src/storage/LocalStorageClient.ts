import { $runtimeCall, RuntimeCall, Westend } from "@capi/westend"
import { Wallet, WalletAccount } from "@talisman-connect/wallets"
import { ExtrinsicRune, hex, Rune } from "capi"
import { SetupType } from "../types/index.js"
import { IStorageClient } from "./IStorageClient.js"

export function retrieveStored(key: "defaultAccount"): WalletAccount | undefined
export function retrieveStored(key: "defaultExtension"): Wallet | undefined
export function retrieveStored(key: "defaultExtension" | "defaultAccount") {
  const stored = localStorage.getItem(key)
  if (stored) {
    try {
      return JSON.parse(stored) as WalletAccount | Wallet | undefined
    } catch (error) {
      console.error(`Could not retrieve ${key}`, error)
    }
  }
  return
}

export class LocalStorageClient implements IStorageClient {
  async getSetups(member: string): Promise<SetupType[]> {
    const storedSetups = localStorage.getItem(member)
    if (!storedSetups) return []

    const tempParsedSetups = JSON.parse(storedSetups)
    if (Array.isArray(tempParsedSetups)) {
      return tempParsedSetups
    } else {
      console.warn(`Stored setups for ${member} is not an array`)
      return []
    }
  }

  async storeSetup(setup: SetupType): Promise<void> {
    for (const [member, _] of setup.members) {
      const setupsOfMember = await this.getSetups(member)
      const indexOfSetup = setupsOfMember.findIndex(
        (storedSetup: SetupType) => storedSetup.multisig === setup.multisig,
      )
      if (indexOfSetup === -1) {
        setupsOfMember.push(setup)
      } else {
        setupsOfMember[indexOfSetup] = setup
      }
      localStorage.setItem(member, JSON.stringify(setupsOfMember))
    }
  }

  async storeCall(call: ExtrinsicRune<Westend, never>): Promise<void> {
    const collection = await Rune.array([
      call.callHash.access(),
      call.callData.access(),
    ]).run()
    const [hash, data] = collection.map((value) => "0x" + hex.encode(value))
    if (!hash || !data) throw new Error("Could not store call")

    localStorage.setItem(hash, data)
  }

  async getCall(callHash: string): Promise<RuntimeCall | undefined> {
    const callData = localStorage.getItem(callHash)
    if (!callData) return undefined
    try {
      return $runtimeCall.decode(hex.decode(callData.slice(2)))
    } catch (exception) {
      console.error(`Unable to decode call ${callData}`)
      return undefined
    }
  }
}
