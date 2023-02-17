export type Web3GlobalThis =
  & Window
  & typeof globalThis
  & {
    injectedWeb3: unknown
  }
