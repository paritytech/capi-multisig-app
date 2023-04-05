import { chain } from "@capi/polkadot_westend"

async function getExistentialDeposit() {
  return await chain
    .pallet("Balances")
    .constant("ExistentialDeposit").decoded
    .run()
}

async function getProxyDepositBase() {
  return await chain
    .pallet("Proxy")
    .constant("ProxyDepositBase").decoded
    .run()
}

async function getProxyDepositFactor() {
  return await chain
    .pallet("Proxy")
    .constant("ProxyDepositFactor").decoded
    .run()
}

export const proxyDepositBase = await getProxyDepositBase()
export const proxyDepositFactor = await getProxyDepositFactor()
export const existentialDeposit = await getExistentialDeposit()
