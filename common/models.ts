import * as $ from "scale-codec";

export interface Approvals {
  /** The block at which the approval was finalized */
  blockHash: string;
  /** The accountId of the voting user */
  member: string;
}

export const $approvals: $.Codec<Approvals> = $.object(
  $.field("blockHash", $.str),
  $.field("member", $.str)
);

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

export const $historyItem: $.Codec<HistoryItem> = $.object(
  $.field("callData", $.str),
  $.field("timePoint", $.tuple($.u32, $.u32)),
  $.field("approvals", $.array($approvals)),
  $.optionalField("cancelled", $.str)
);

export interface Setup {
  type: "setup";
  id: string;
  name: string;
  multisigHex: string;
  stash?: string;
  //  TODO: history: HistoryItem[]
}

export const $setup: $.Codec<Setup> = $.object(
  $.field("type", $.constant<"setup">("setup", $.str)),
  $.field("id", $.str),
  $.field("name", $.str),
  $.field("multisigHex", $.str),
  $.optionalField("stash", $.str)
);

export function isSetup(setup: unknown): setup is Setup {
  return $.is($setup, setup);
}

export interface Account {
  type: "account";
  /** hex-encoded accountId */
  id: string;
  /** The setups of which the account is member */
  setups: string[];
}

export type Model = Setup | Account;
