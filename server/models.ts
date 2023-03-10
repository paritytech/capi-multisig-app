export type Model = Setup | Account;

export interface Setup {
  type: "setup";
  /** The stash accountId */
  id: string;
  /** The genesis hash of the setup's network */
  genesisHash: string;
  /** A human-readable name for the setup */
  name: string;
  /** member accountIds */
  members: [user: string, proxy?: string][];
  /** The number of signatories a proposal need in order to be executed */
  threshold: number;
  /** The underlying multisig accountId */
  multisig: string;
  /** The underlying pure proxy accountId */
  stash: string;
  /** Previous actions of the setup */
  history: HistoryItem[];
}

export interface HistoryItem {
  /** The scale-encoded call data */
  callData: string;
  /** Time point of the first approval */
  timePoint: [blockNumber: number, txIndex: number];
  /** All votes, the first of which is the initiator */
  approvals: Approvals[];
  /** Whether the proposal was cancelled */
  cancelled?: string;
}

export interface Approvals {
  /** The block at which the approval was finalized */
  blockHash: string;
  /** The accountId of the voting user */
  member: string;
}

export interface Account {
  type: "account";
  /** hex-encoded accountId */
  id: string;
  /** The setups of which the account is member */
  setups: string[];
}
