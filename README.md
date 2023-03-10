# Capi Multisig App

Multisig (multiple signatories) is a concept of having several entities sign off a transaction. This may be required for several reasons, such as corporate governance, security, spend tracking/management, contractual obligations.

The Capi Multisig App is an application for managing multi-signature wallets and performing multi-signature transactions on blockchains in the Polkadot network.

In its first iteration, the Capi Multisig App connects to the Westend Testnet and provides functionality for creating a multisig setup which uses a `PureProxy` as vault (the account holding the funds).

## Prerequisites for app users

1. Have the Polkadot.js extension installed in your browser. 
2. Follow [this guide](https://www.youtube.com/watch?v=sy7lvAqyzkY) to create a few of accounts if you don’t have them already. Make sure they are available on the Westend testnet.
3. Get some testnet tokens via the [Westend Faucet](https://matrix.to/#/#westend_faucet:matrix.org) by following [this guide](https://wiki.polkadot.network/docs/learn-DOT#getting-tokens-on-the-westend-testnet) 

Note: The faucet can send tokens only once per day. Use [the accounts page](https://polkadot.js.org/apps/#/accounts) on Polkadot.js Apps or a wallet of your choice in order to split the tokens between your accounts in case you need to pay fees.


## Tech stack
TypeScript, Capi, Preact, Tailwind, Vite, DynamoDB

## Run locally
Install dependencies
```
pnpm install
```
Start the dev server
```
pnpm run start
```
Build for production
```
pnpm run build
```
## References and Links

- [Wiki Multisig](https://wiki.polkadot.network/docs/learn-account-multisig)
- [Wiki PureProxies](https://wiki.polkadot.network/docs/learn-proxies#anonymous-proxy-pure-proxy)
