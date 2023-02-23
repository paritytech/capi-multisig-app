import { Handlers } from "$fresh/server.ts"
import { client, Put, TableName } from "../../server/mod.ts"

export const handler: Handlers = {
  async POST(req) {
    const { accountAddress, multisigAddress, name, signatories, threshold } = await req.json()

    await client.send(
      new Put({
        TableName,
        Item: {
          pk: accountAddress,
          sk: `MULTI#${multisigAddress}`,
          kind: "Multisig",
          name,
          signatories,
          threshold,
        },
      }),
    )

    return new Response("Put Signatory - Success")
  },
}
