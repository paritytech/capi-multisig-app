import { polkadot } from "@capi/polkadot"
import { hex, Sr25519, ss58 } from "capi"
import * as crypto from "crypto"

const secret = crypto.getRandomValues(new Uint8Array(64))
const kp = Sr25519.fromSecret(secret)
const address = ss58.encode(polkadot.System.SS58Prefix, kp.publicKey)

console.log("secret:", hex.encode(secret))
console.log("address:", address)
