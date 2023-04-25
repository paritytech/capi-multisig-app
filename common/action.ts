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

export const input: $.Codec<Input> = $.taggedUnion("type", [
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
  result: "ok" | "error"
}

export interface UnsubscribeResult {
  type: "unsubscribe"
  result: "ok" | "error"
}

export interface SubmitResult {
  type: "submit"
  // TODO: callHash: string
  result:
    | { status: "ready" }
    | { status: "broadcast" }
    | { status: "inBlock" }
    | { status: "failed" }
    | { status: "finalized"; hash: string }
}

export type Result = SubmitResult | SubscribeResult | UnsubscribeResult

export const $result: $.Codec<Result> = $.taggedUnion("type", [
  $.variant(
    "subscribe",
    $.object($.field("result", $.literalUnion(["ok", "error"] as const))),
  ),
  $.variant(
    "unsubscribe",
    $.object($.field("result", $.literalUnion(["ok", "error"] as const))),
  ),
  $.variant(
    "submit",
    $.object(
      $.field(
        "result",
        $.taggedUnion(
          "status",
          [
            $.variant("ready"),
            $.variant("broadcast"),
            $.variant("inBlock"),
            $.variant("failed"),
            $.variant("finalized", $.object($.field("hash", $.str))),
          ],
        ),
      ),
    ),
  ),
])
