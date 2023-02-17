import { Handlers } from "$fresh/server.ts"
import { client, Put, TableName } from "../../server/mod.ts"

export const handler: Handlers = {
  async GET() {
    await client.send(
      new Put({
        TableName,
        Item: {
          pk: "ab_multi",
          sk: "multi#ab_multi",
          name: "alice & bob",
          signatories: ["alice", "bob"],
          threshold: 2,
        },
      }),
    )
    return new Response("Put Multisig - Success")
  },
}
