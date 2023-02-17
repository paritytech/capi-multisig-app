export type Account = Real | Proxy | Multisig

interface Real extends AccountBase<"Real"> {}

interface Proxy extends AccountBase<"Proxy"> {}

interface Multisig extends AccountBase<"Multisig"> {
  signatories: string[]
  threshold: number
}

interface AccountBase<Kind extends string> {
  pk: string // public key
  sk: string // sorting key
  name: string
}
