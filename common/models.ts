import * as $ from "scale-codec"

export interface Approvals {
  /** The block at which the approval was finalized */
  blockHash: string
  /** The accountId of the voting user */
  member: string
}

export const $approvals: $.Codec<Approvals> = $.object(
  $.field("blockHash", $.str),
  $.field("member", $.str),
)

export interface HistoryItem {
  /** The scale-encoded call data */
  callData: string
  /** Time point of the first approval */
  timePoint: [blockNumber: number, txIndex: number]
  /** All votes, the first of which is the initiator */
  approvals: Approvals[]
  /** Whether the proposal was cancelled */
  cancelled?: string
}

export const $historyItem: $.Codec<HistoryItem> = $.object(
  $.field("callData", $.str),
  $.field("timePoint", $.tuple($.u32, $.u32)),
  $.field("approvals", $.array($approvals)),
  $.optionalField("cancelled", $.str),
)

export interface Setup {
  type: "setup"
  /** The stash accountId */
  id: string
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
  /** Previous actions of the setup */
  history: HistoryItem[]
}

export const $setup: $.Codec<Setup> = $.object(
  $.field("type", $.constant<"setup">("setup", $.str)),
  $.field("id", $.str),
  $.field("genesisHash", $.str),
  $.field("name", $.str),
  $.field("members", $.array($.tuple($.str, $.str))),
  $.field("threshold", $.u32),
  $.field("multisig", $.str),
  $.field("stash", $.str),
  $.field("history", $.array($historyItem)),
)

export function isSetup(setup: unknown): setup is Setup {
  return $.is($setup, setup)
}

export interface Account {
  type: "account"
  /** hex-encoded accountId */
  id: string
  /** The setups of which the account is member */
  setups: string[]
}

export type Model = Setup | Account
