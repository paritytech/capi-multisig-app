import * as $ from "scale-codec"

export type PartitionKey = "pk"
export type SortKey = "sk"
export type ItemKeys = PartitionKey | SortKey

// Approvals
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

// Call history
export interface HistoryItem {
  pk: string
  sk: string
  /** The scale-encoded call data */
  callData: string
  /** Time point of the first approval */
  timePoint: [blockNumber: number, txIndex: number]
  /** All votes, the first of which is the initiator */
  approvals: Approvals[]
  /** Whether the proposal was cancelled */
  cancelled?: string
}

export type History = Omit<HistoryItem, ItemKeys>

export const $historyItem: $.Codec<History> = $.object(
  $.field("callData", $.str),
  $.field("timePoint", $.tuple($.u32, $.u32)),
  $.field("approvals", $.array($approvals)),
  $.optionalField("cancelled", $.str),
)

// Multisig Setup
export interface SetupItem {
  pk: string
  sk?: string
  multisig: string
  name: string
  stash?: string
}

export type Setup = Omit<SetupItem, ItemKeys>

export const $setup: $.Codec<Setup> = $.object(
  $.field("multisig", $.str),
  $.field("name", $.str),
  $.optionalField("stash", $.str),
)
export function isSetup(setup: unknown): setup is Setup {
  return $.is($setup, setup)
}

// Account
export interface AccountItem {
  pk: string
  sk?: string
  /** hex-encoded accountId */
  accountId: string
  /** The setups of which the account is member */
  setups: string[]
}
export type Account = Omit<AccountItem, ItemKeys>

// Model
export type Model = HistoryItem | SetupItem | AccountItem
