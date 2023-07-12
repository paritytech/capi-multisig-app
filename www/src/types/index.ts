export interface SetupType {
  /** The genesis hash of the setup's network */
  genesisHash: string
  /** A human-readable name for the setup */
  name: string
  /** member accountIds */
  members: [user: string, proxy: string][]
  /** The number of signatories a proposal need in order to be executed */
  threshold: number
  /** The underlying multisig accountId */
  multisig: string
  /** The underlying pure proxy accountId */
  stash: string
}
