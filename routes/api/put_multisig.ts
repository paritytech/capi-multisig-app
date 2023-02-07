import { Handlers } from "$fresh/server.ts"
import { client, Put, TableName } from "../../server/mod.ts"

export const handler: Handlers = {
  // TODO add error handling
  async POST(req) {
    const { id, proxies = [], multisigs = [], signatories = [], threshold } = await req.json()

    await client.send(
      new Put({
        TableName,
        Item: {
          id,
          kind: "Multisig",
          proxies,
          multisigs,
          signatories,
          threshold,
        },
      }),
    )
    return new Response("Put Multisig - Success")
  },
}
