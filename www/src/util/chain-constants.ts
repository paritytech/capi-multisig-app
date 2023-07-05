import { westend } from "@capi/westend"

async function getExistentialDeposit() {
  return await westend.pallet("Balances").constant("ExistentialDeposit").decoded
    .run()
}

async function getProxyDepositBase() {
  return await westend.pallet("Proxy").constant("ProxyDepositBase").decoded
    .run()
}

async function getProxyDepositFactor() {
  return await westend.pallet("Proxy").constant("ProxyDepositFactor").decoded
    .run()
}

export const PROXY_DEPOSIT_BASE = await getProxyDepositBase()
export const PROXY_DEPOSIT_FACTOR = await getProxyDepositFactor()
export const EXISTENTIAL_DEPOSIT = await getExistentialDeposit()
