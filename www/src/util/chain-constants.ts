import { westend } from "@capi/westend"
import { scope } from "./scope.js"

async function getExistentialDeposit() {
  return await westend.pallet("Balances").constant("ExistentialDeposit").decoded
    .run(scope.value)
}

async function getProxyDepositBase() {
  return await westend.pallet("Proxy").constant("ProxyDepositBase").decoded.run(
    scope.value,
  )
}

async function getProxyDepositFactor() {
  return await westend.pallet("Proxy").constant("ProxyDepositFactor").decoded
    .run(scope.value)
}

export const PROXY_DEPOSIT_BASE = await getProxyDepositBase()
export const PROXY_DEPOSIT_FACTOR = await getProxyDepositFactor()
export const EXISTENTIAL_DEPOSIT = await getExistentialDeposit()
