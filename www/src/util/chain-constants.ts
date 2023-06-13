import { currentChain } from "../signals/chain.js"

async function getExistentialDeposit() {
  return await currentChain.value.pallet("Balances").constant(
    "ExistentialDeposit",
  ).decoded.run()
}

async function getProxyDepositBase() {
  return await currentChain.value.pallet("Proxy").constant("ProxyDepositBase")
    .decoded.run()
}

async function getProxyDepositFactor() {
  return await currentChain.value.pallet("Proxy").constant("ProxyDepositFactor")
    .decoded.run()
}

export const PROXY_DEPOSIT_BASE = await getProxyDepositBase()
export const PROXY_DEPOSIT_FACTOR = await getProxyDepositFactor()
export const EXISTENTIAL_DEPOSIT = await getExistentialDeposit()
