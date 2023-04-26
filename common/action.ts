/* TODO: import { $runtimeCall, RuntimeCall } from "@capi/westend" */
import * as $ from "scale-codec"

export interface Submit {
  type: "submit"
  // TODO: call: RuntimeCall
  channel: string
  signedExtrinsic: string
}

export interface Subscribe {
  type: "subscribe"
  channel: string
}

export interface Unsubscribe {
  type: "unsubscribe"
  channel: string
}

export type Input = Submit | Subscribe | Unsubscribe

export const $input: $.Codec<Input> = $.taggedUnion("type", [
  $.variant(
    "submit",
    $.object(
      // $.field("call", $runtimeCall),
      $.field("channel", $.str),
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
  // TODO: callHash: string
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
    | { status: "invalid" }
    | { status: "failed" }
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
            $.variant("invalid"),
            $.variant("failed"),
          ],
        ),
      ),
    ),
  ),
])
