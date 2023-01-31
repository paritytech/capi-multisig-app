import * as C from "http://localhost:5646/@local/mod.ts"
import * as T from "http://localhost:5646/@local/test_util/mod.ts"

// import { client } from "http://localhost:5646/@local/proxy/ws:127.0.0.1:9944/@v0.9.37/capi.ts"
// export const client = C.rpcClient(C.rpc.proxyProvider, "ws:127.0.0.1:9944")
// import { extrinsic } from "http://localhost:5646/@local/proxy/ws:127.0.0.1:9944/@v0.9.37/mod.ts"
// import { Balances } from "http://localhost:5646/@local/proxy/ws:127.0.0.1:9944/@v0.9.37/pallets/mod.ts"
import * as pallets from "http://localhost:5646/@local/proxy/ws:127.0.0.1:9944/@v0.9.37/pallets/mod.ts"

// const loadDynamicImports = async () => {
//   const pallets = await import(`http://localhost:5646/@local/proxy/${rpcAddress}/pallets/mod.ts`)
// }

export function CapiComponent() {
  const rpcAddress = "ws:127.0.0.1:9944" // Added to SUGGESTED_CHAIN_URLS in capi/server/server.ts
  const client = C.rpcClient(C.rpc.proxyProvider, rpcAddress)
  const extrinsic = C.extrinsic(client)

  const runMultisig = async () => {
    const userNames = ["alice", "bob", "charlie"]
    T.users.slice(0, 3).map((pair, i) => {
      console.log(`${userNames[i]}: ${C.ss58.encode(0, pair.publicKey)}`)
    })

    // deterministic no need to connect to a chain
    const multisig = new C.fluent.Multisig(
      client,
      T.users.slice(0, 3).map((pair) => pair.publicKey),
      2,
    )

    // Transfer initial balance (existential deposit) to multisig address
    const existentialDeposit = extrinsic({
      sender: T.alice.address,
      call: pallets.Balances.transfer({
        value: 4_000_000_000_000n,
        dest: C.MultiAddress.Id(multisig.address),
      }),
    }).signed(T.alice.sign)

    C.throwIfError(await watchExtrinsic(existentialDeposit, "Existential deposit").run())

    function watchExtrinsic(extrinsic: C.SignedExtrinsic, label: string) {
      return extrinsic.watch(({ end }) => (status) => {
        console.log(`${label}:`, status)
        if (C.rpc.known.TransactionStatus.isTerminal(status)) {
          return end()
        }
        return
      })
    }
  }

  runMultisig()

  return <div>Capi Component</div>
}
