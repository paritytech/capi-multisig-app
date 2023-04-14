# Capi Multisig App

"Multisig" (multiple signatories) is a term which describes an account that is
governed by multiple actors, who operate this shared account by creating and
collectively-approving proposals. There are many use cases to which multisigs
are applicable; some use cases include corporate governance, security, spend
tracking/management, and the definition and upholding of contractual
obligations.

The Capi Multisig App simplifies the management of multisigs on Substrate
networks.

In its first iteration, the Capi Multisig App connects to the Westend Testnet
and provides functionality for creating a multisig setup which uses a
`PureProxy` as vault (the account holding the funds).

## Usage Prerequisites

1. Have the Polkadot.js extension installed in your browser.
2. If you don't already have accounts, follow
   [this guide](https://www.youtube.com/watch?v=sy7lvAqyzkY). Ensure your
   accounts are marked as accessible to the Westend testnet.
3. Get some testnet tokens via the
   [Westend Faucet](https://matrix.to/#/#westend_faucet:matrix.org) by following
   [this guide](https://wiki.polkadot.network/docs/learn-DOT#getting-tokens-on-the-westend-testnet)

Note: The faucet can send tokens only once per day. Use
[the accounts page](https://polkadot.js.org/apps/#/accounts) on Polkadot.js Apps
or a wallet of your choice in order to split the tokens between your accounts in
case you need to pay fees.

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


# Design Tokens from Figmga

The theme at ```www/src/theme/``` contains the theme generated from design tokens exported from Figma.

Tokens get pushed to ```tokens-from-figma``` branch from Figma, then get transformed to CSS variables and a tailwind config file with the tokens set up as variables, making them available as an extension of the default tailwind theme.

### Tokens API

global
* typography: fontFamily, fontWeight, lineHeight, etc.
* colors: entire range of usable colors (eg. shades of pink)

colors (light/dark)
* background - for full width and/or height app backgrounds
* fill - for UI elements (eg. buttons)
* border - for UI elements, and separation lines
* foreground - for text, icons, etc.

* box shadow
