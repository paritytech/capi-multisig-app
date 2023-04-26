import { chain as chain } from "@capi/westend"
import { SignedExtrinsicRune } from "capi"
import { $input, $result, Submit } from "common"
import express from "express"
import * as http from "http"
import * as ws from "ws"

const app = express()

app.get("/", (_, res) => {
  res.status(200)
  res.send()
})

const httpServer = http.createServer(app)

const wsServer = new ws.WebSocketServer({ noServer: true })
const channels: Record<string, Set<ws.WebSocket>> = {}

const port = process.env.PORT ?? 5000
httpServer.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})

httpServer.on("upgrade", (req, socket, head) => {
  wsServer.handleUpgrade(req, socket, head, (ws) => {
    wsServer.emit("connection", ws, req)
  })
})

wsServer.on("connection", (ws, _req) => {
  ws.on("error", handleError)

  ws.on("message", async (message) => {
    try {
      const payload = Uint8Array.from(message as Buffer)
      const decoded = $input.decode(payload)

      switch (decoded.type) {
        case "subscribe":
          if (!channels[decoded.channel]) {
            channels[decoded.channel] = new Set()
          }
          channels[decoded.channel]?.add(ws)
          ws.send($result.encode({
            type: "subscribe",
            result: "ok",
          }))
          break
        case "unsubscribe":
          channels[decoded.channel]?.delete(ws)
          ws.send($result.encode({
            type: "unsubscribe",
            result: "ok",
          }))
          break
        case "submit":
          await handleSubmit(ws, decoded)
          break
        default:
          break
      }
    } catch (err) {
      handleError(err as Error)
    }
  })
})

function handleError(err: unknown) {
  console.error(err)
}

async function handleSubmit(ws: ws.WebSocket, submit: Submit): Promise<void> {
  try {
    const send = (data: Uint8Array) => {
      channels[submit.channel]?.forEach((ws) => ws.send(data))
    }

    await SignedExtrinsicRune.fromHex(
      chain,
      submit.signedExtrinsic,
    )
      .sent()
      .dbgStatus("tx status")
      .transactionStatuses((txStatus: Record<string, unknown> | string) => {
        if (typeof txStatus === "string") {
          if (txStatus === "ready") {
            send($result.encode({
              type: "submit",
              result: { status: "ready" },
            }))
          }
        } else {
          const status = Object.keys(txStatus)[0]!
          switch (status) {
            case "ready":
            case "broadcast":
            case "inBlock":
              send($result.encode({
                type: "submit",
                result: { status },
              }))
              break
            case "finalized":
              const hash: string = txStatus["finalized"]! as string
              send($result.encode({
                type: "submit",
                result: { status, hash },
              }))
              break
          }
        }
      })
      .run()
  } catch (err) {
    ws.send($result.encode({
      type: "submit",
      result: { status: "failed" },
    }))
    handleError(err)
  }
}
