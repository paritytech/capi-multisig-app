import { $runtimeCall, Westend } from "@capi/westend"
import { Wallet, WalletAccount } from "@talisman-connect/wallets"
import { ExtrinsicRune, hex, Rune } from "capi"
import { isSetup, Setup } from "common"
import { scope } from "../signals/scope.js"

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

// TODO temporary solution to persist SETUPS until saved in backend db
export function getStoredSetups(member: string): Setup[] {
  const storedSetups = localStorage.getItem(member)
  if (!storedSetups) return []

  const tempParsedSetups = JSON.parse(storedSetups)
  if (Array.isArray(tempParsedSetups)) {
    return tempParsedSetups.filter((maybeSetup: unknown) => isSetup(maybeSetup))
  } else {
    console.warn(`Stored setups for ${member} is not an array`)
    return []
  }
}

// TODO temporary solution to persist SETUPS until saved in backend db
export function storeSetup(members: string[], setup: Setup) {
  for (const member of members) {
    const setupsOfMember = getStoredSetups(member)
    const indexOfSetup = setupsOfMember.findIndex(
      (storedSetup: Setup) => storedSetup.multisig === setup.multisig,
    )
    if (indexOfSetup === -1) {
      setupsOfMember.push(setup)
    } else {
      setupsOfMember[indexOfSetup] = setup
    }
    localStorage.setItem(member, JSON.stringify(setupsOfMember))
  }
}

// TODO temporary solution to persist CALLS until saved in backend db
export async function storeCall(call: ExtrinsicRune<Westend, never>) {
  const collection = await Rune.array([
    call.callHash.access(),
    call.callData.access(),
  ]).run(
    scope.value,
  )
  const [hash, data] = collection.map((value) => "0x" + hex.encode(value))
  if (!hash || !data) throw new Error("Could not store call")

  localStorage.setItem(hash, data)
}

// TODO temporary solution to persist CALLS until saved in backend db
export function getCall(callHash: string) {
  const callData = localStorage.getItem(callHash)
  if (!callData) return undefined
  try {
    return $runtimeCall.decode(hex.decode(callData.slice(2)))
  } catch (exception) {
    console.error(`Unable to decode call ${callData}`)
    return undefined
  }
}
