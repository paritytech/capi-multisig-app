import { RuntimeCall, westend } from "@capi/westend"
import { $extrinsic, SignedExtrinsicRune } from "capi"
import { MultisigRune } from "capi/patterns/multisig"
import { $result, equals, Submit } from "common"
import type { SubmitResult } from "common"
import * as ws from "ws"

export async function handleSubmit(
  channels: Record<string, Set<ws.WebSocket>>,
  submit: Submit,
) {
  const signedExtrinsicRune = SignedExtrinsicRune
    .fromHex(westend, submit.signedExtrinsic)
  const signedExtrinsicBytes = await signedExtrinsicRune.run()
  const metadata = await westend.metadata.run()

  const extrinsic = $extrinsic(metadata).decode(signedExtrinsicBytes)

  // TODO: use call cashes
  await parseCallHashes(extrinsic.call as RuntimeCall)

  const multisig = await MultisigRune.fromHex(westend, submit.multisigHash)
    .run()

  const send = (result: SubmitResult["result"]) => {
    for (const ws of channels[submit.multisigHash] ?? new Set()) {
      const payload = $result.encode({
        type: "submit",
        channel: submit.multisigHash,
        signedExtrinsic: submit.signedExtrinsic,
        result,
      })
      ws.send(payload)
    }
  }

  try {
    if (!extrinsic.signature) {
      send({ status: "invalid", message: "extrinsic has no signature" })
      return
    }

    const senderAccountId: Uint8Array | undefined =
      (extrinsic.signature.sender.address as any).value
    if (
      !senderAccountId
      || !multisig.signatories.find((accountId) =>
        equals(accountId, senderAccountId)
      )
    ) {
      send({ status: "unauthorized" })
      return
    }

    await signedExtrinsicRune
      .sent()
      .dbgStatus("tx status")
      .transactionStatuses((txStatus) => {
        if (typeof txStatus === "string") {
          send({ status: txStatus })
        } else {
          const status = Object.keys(txStatus)[0]!
          switch (status) {
            case "future":
            case "ready":
            case "broadcast":
            case "inBlock":
            case "retracted":
            case "finalityTimeout":
            case "usurped":
            case "dropped":
            case "invalid":
              send({ status })
              break
            case "finalized":
              const hash: string = txStatus["finalized"]! as string
              send({ status, hash })
              break
          }
        }

        return false
      })
      .run()
  } catch (err) {
    send({ status: "failed" })
    throw err
  }
}

async function parseCallHashes(call: RuntimeCall): Promise<Uint8Array[]> {
  switch (call.type) {
    case "Utility": {
      const palletUtilityCall = call.value
      switch (palletUtilityCall.type) {
        case "batch":
        case "batchAll":
          return (await Promise.all(
            palletUtilityCall.calls.map(parseCallHashes),
          ))
            .flat()
        default:
          break
      }
      break
    }
    case "Proxy": {
      const palletProxyCall = call.value
      switch (palletProxyCall.type) {
        case "proxy":
          return parseCallHashes(palletProxyCall.call)
        default:
          break
      }

      break
    }
    case "Multisig": {
      const multisigCall = call.value
      switch (multisigCall.type) {
        case "asMulti":
          return [await westend.extrinsic(multisigCall.call).callHash.run()]
        case "approveAsMulti":
          return [multisigCall.callHash]
        default:
          break
      }
      break
    }
    default:
      break
  }

  return []
}
