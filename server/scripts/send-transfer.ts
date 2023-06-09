import { polkadot } from "@capi/polkadot"
import { hex, Sr25519 } from "capi"
import { signature } from "capi/patterns/signature/polkadot"
import { $input, $result } from "common"
import * as crypto from "crypto"
import WebSocket from "ws"

const args = process.argv.slice(2)
if (args.length < 2) {
  throw new Error("secret key and endpoint are required")
}
const secret = hex.decode(args[0]!)
const endpoint = args[1]!

const sender = Sr25519.fromSecret(secret)

const recipient = Sr25519.fromSecret(crypto.getRandomValues(new Uint8Array(64)))

const signedExtrinsic = await polkadot.Balances
  .transfer({
    value: 12345n,
    dest: recipient.address,
  })
  .signed(signature({ sender }))
  .hex()
  .run()

const ws = new WebSocket(endpoint)

ws.on("open", () => {
  ws.send($input.encode({
    type: "subscribe",
    channel: "multisig-xyz",
  }))

  ws.send($input.encode({
    type: "submit",
    channel: "multisig-xyz",
    signedExtrinsic,
  }))
})

ws.on("message", (message) => {
  console.log($result.decode(Uint8Array.from(message as Buffer)))
})
