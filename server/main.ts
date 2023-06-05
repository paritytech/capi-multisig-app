import { westend } from "@capi/westend"
import { SignedExtrinsicRune } from "capi"
import { $input, $result, Submit } from "common"
import express from "express"
import * as http from "http"
import * as ws from "ws"
import { ApiController } from "./controllers.js"
import { createTablesIfNotExist } from "./dynamoDB/table.js"

const app = express()

app.get("/", async (_, res) => {
  res.status(200)
  res.send()
})

app.get("/test/db", async (_, res) => {
  try {
    await createTablesIfNotExist()
    const id = "5F3sa2TJAWMqDhXG6jhV4N8ko9SxwGy8TpaNS1repo5EYjQX"
    const setups = [
      "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
      "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
    ]
    await ApiController.createAccount({
      type: "account",
      id,
      setups,
    })
    const item = await ApiController.getAccount(id)
    await ApiController.deleteAccount(id)
    res.status(200)
    res.send(item)
  } catch (err) {
    res.status(500)
    res.send(err)
  }
})

const httpServer = http.createServer(app)

const wsServer = new ws.WebSocketServer({ noServer: true })
const channels: Record<string, Set<ws.WebSocket>> = {}

const port = 5555
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
            channel: decoded.channel,
            result: "ok",
          }))
          break
        case "unsubscribe":
          if (channels[decoded.channel]?.delete(ws)) {
            ws.send($result.encode({
              type: "unsubscribe",
              channel: decoded.channel,
              result: "ok",
            }))
          }
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
      westend,
      submit.signedExtrinsic,
    )
      .sent()
      .dbgStatus("tx status")
      .transactionStatuses((txStatus) => {
        if (typeof txStatus === "string") {
          send($result.encode({
            type: "submit",
            channel: submit.channel,
            result: { status: txStatus },
          }))
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
              send($result.encode({
                type: "submit",
                channel: submit.channel,
                result: { status },
              }))
              break
            case "finalized":
              const hash: string = txStatus["finalized"]! as string
              send($result.encode({
                type: "submit",
                channel: submit.channel,
                result: { status, hash },
              }))
              break
          }
        }

        return false
      })
      .run()
  } catch (err) {
    ws.send($result.encode({
      type: "submit",
      channel: submit.channel,
      result: { status: "failed" },
    }))
    handleError(err)
  }
}
