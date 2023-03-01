import { Wallet, WalletAccount } from '@talisman-connect/wallets'

export function retrieveStored(key: 'defaultAccount'): WalletAccount | undefined
export function retrieveStored(key: 'defaultExtension'): Wallet | undefined
export function retrieveStored(key: 'defaultExtension' | 'defaultAccount') {
  const stored = localStorage.getItem(key)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (error) {
      console.error(`Could not retrieve ${key}`, error)
    }
  }
}
