import { westend } from "@capi/westend"

async function getExistentialDeposit() {
  return await westend
    .pallet("Balances")
    .constant("ExistentialDeposit").decoded
    .run()
}

async function getProxyDepositBase() {
  return await westend
    .pallet("Proxy")
    .constant("ProxyDepositBase").decoded
    .run()
}

async function getProxyDepositFactor() {
  return await westend
    .pallet("Proxy")
    .constant("ProxyDepositFactor").decoded
    .run()
}

export const proxyDepositBase: bigint = await getProxyDepositBase()
export const proxyDepositFactor: bigint = await getProxyDepositFactor()
export const existentialDeposit: bigint = await getExistentialDeposit()
