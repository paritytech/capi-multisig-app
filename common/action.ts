import * as $ from "scale-codec"

export interface Submit {
  type: "submit"
  multisigHash: string
  signedExtrinsic: string
}

export interface MultisigSetup {
  type: "multisig_setup"
  genesisHash: string
  displayName: string
  multisigHash: string
}

export interface Subscribe {
  type: "subscribe"
  channel: string
}

export interface Unsubscribe {
  type: "unsubscribe"
  channel: string
}

export type Input = Submit | MultisigSetup | Subscribe | Unsubscribe

export const $input: $.Codec<Input> = $.taggedUnion("type", [
  $.variant(
    "multisig_setup",
    $.object(
      $.field("genesisHash", $.str),
      $.field("displayName", $.str),
      $.field("multisigHash", $.str),
    ),
  ),
  $.variant(
    "submit",
    $.object(
      $.field("multisigHash", $.str),
      $.field("signedExtrinsic", $.str),
    ),
  ),
  $.variant("subscribe", $.object($.field("channel", $.str))),
  $.variant("unsubscribe", $.object($.field("channel", $.str))),
])

export interface SubscribeResult {
  type: "subscribe"
  channel: string
  result: "ok" | "error"
}

export interface UnsubscribeResult {
  type: "unsubscribe"
  channel: string
  result: "ok" | "error"
}

export interface SubmitResult {
  type: "submit"
  channel: string
  signedExtrinsic: string
  result:
    | { status: "future" }
    | { status: "ready" }
    | { status: "broadcast" }
    | { status: "inBlock" }
    | { status: "retracted" }
    | { status: "finalityTimeout" }
    | { status: "finalized"; hash: string }
    | { status: "usurped" }
    | { status: "dropped" }
    | { status: "invalid"; message?: string }
    | { status: "failed" }
    | { status: "unauthorized" }
}

export type Result = SubmitResult | SubscribeResult | UnsubscribeResult

export const $result: $.Codec<Result> = $.taggedUnion("type", [
  $.variant(
    "subscribe",
    $.object(
      $.field("channel", $.str),
      $.field("result", $.literalUnion(["ok", "error"] as const)),
    ),
  ),
  $.variant(
    "unsubscribe",
    $.object(
      $.field("channel", $.str),
      $.field("result", $.literalUnion(["ok", "error"] as const)),
    ),
  ),
  $.variant(
    "submit",
    $.object(
      $.field("channel", $.str),
      $.field("signedExtrinsic", $.str),
      $.field(
        "result",
        $.taggedUnion(
          "status",
          [
            $.variant("future"),
            $.variant("ready"),
            $.variant("broadcast"),
            $.variant("inBlock"),
            $.variant("retracted"),
            $.variant("finalityTimeout"),
            $.variant("finalized", $.object($.field("hash", $.str))),
            $.variant("usurped"),
            $.variant("dropped"),
            $.variant("invalid", $.object($.optionalField("message", $.str))),
            $.variant("failed"),
            $.variant("unauthorized"),
          ],
        ),
      ),
    ),
  ),
])
