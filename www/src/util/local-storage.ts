import { Wallet, WalletAccount } from "@talisman-connect/wallets"
import { isSetup, Setup } from "common"

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

// TODO temporary solution to persist setups until saved in backend db
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

// TODO temporary solution to persist setups until saved in backend db
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
