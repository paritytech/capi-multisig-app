import { MultiAddress, Westend, westend } from "@capi/westend"
import { hex, Sr25519, ss58 } from "capi"
import { MultisigRune } from "capi/patterns/multisig"
import { signature } from "capi/patterns/signature/polkadot"
import { $input, $result, deferred } from "common"
import WebSocket from "ws"

const args = process.argv.slice(2)
if (args.length < 6) {
  throw new Error("4 secret keys, threshold and endpoint are required")
}
const secret1 = hex.decode(args[0]!)
const secret2 = hex.decode(args[1]!)
const secret3 = hex.decode(args[2]!)
const secret4 = hex.decode(args[3]!)

const alice = Sr25519.fromSecret(secret1)
const bob = Sr25519.fromSecret(secret2)
const charlie = Sr25519.fromSecret(secret3)
const david = Sr25519.fromSecret(secret4)
const threshold = +args[4]!
const [_, stash] = ss58.decode(args[5]!)
const endpoint = args[6]!

const multisig: MultisigRune<Westend, never> = MultisigRune.from(westend, {
  signatories: [alice, bob, charlie].map(({ publicKey }) => publicKey),
  threshold,
})

const davidFree = westend.System.Account
  .value(david.publicKey)
  .unhandle(undefined)
  .access("data", "free")

const davidFreeInitial = await davidFree.run()
console.log("David free initial:", davidFreeInitial)

const call = westend.Proxy.proxy({
  real: MultiAddress.Id(stash),
  call: westend.Balances.transfer({
    dest: david.address,
    value: 1353n,
  }),
})

const encoded: string = await multisig.hex.run()

const bobRatify = await multisig.ratify(bob.address, call)
  .signed(signature({ sender: bob }))
  .hex()
  .run()
const bobRatifySuccess = deferred()

const ws = new WebSocket(endpoint)

ws.on("open", async () => {
  ws.send($input.encode({
    type: "subscribe",
    channel: encoded,
  }))

  ws.send($input.encode({
    type: "submit",
    multisigHash: encoded,
    signedExtrinsic: bobRatify,
  }))

  await bobRatifySuccess

  const charlieRatify = await multisig.ratify(charlie.address, call)
    .signed(signature({ sender: charlie }))
    .hex()
    .run()

  ws.send($input.encode({
    type: "submit",
    multisigHash: encoded,
    signedExtrinsic: charlieRatify,
  }))
})

ws.on("message", async (message) => {
  const decoded = $result.decode(Uint8Array.from(message as Buffer))
  console.log(decoded)
  switch (decoded.type) {
    case "submit":
      switch (decoded.result.status) {
        case "finalized":
          if (decoded.signedExtrinsic === bobRatify) {
            bobRatifySuccess.resolve(undefined)
          } else {
            const davidFreeFinal = await davidFree.run()
            console.log("David free final:", davidFreeFinal)
            ws.close()
          }
          break
        default:
          break
      }
      break
    default:
      break
  }
})
