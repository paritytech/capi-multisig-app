import { $input, $result, MultisigSetup } from "common"
import express from "express"
import * as http from "http"
import * as ws from "ws"
import { handleSubmit } from "./submit.js"

const app = express()

app.get("/", (_, res) => {
  res.status(200)
  res.send()
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
          await handleSubmit(channels, decoded)
          break
        case "multisig_setup":
          await handleMultisigCreation(ws, decoded)
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

async function handleMultisigCreation(
  _ws: ws.WebSocket,
  _args: MultisigSetup,
): Promise<void> {
  // TODO
}
