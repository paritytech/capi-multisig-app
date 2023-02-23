import { computed, signal } from "@preact/signals"
import { selectedAccount } from "./WalletConnect.tsx"

const multisigs = computed(async () => {
  if (selectedAccount.value?.address) {
    const res = await fetch("/api/query_multi", {
      // TODO separate function
      // TODO do we need all these headers?
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        pk: selectedAccount.value?.address,
      }),
    }).then((response) => response.json())
    // .then((data) => {
    //   console.log('Multisigs:', data.Items);
    // })
    console.log("fetch multisigs: ", res)
    return res
  }
  return undefined
})

export default function Multisigs() {
  if (!multisigs) {
    return <p>No multisigs</p>
  }
  return (
    <div>
      Multisig
    </div>
  )
}
