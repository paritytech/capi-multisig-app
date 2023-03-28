import { Balances, chain, System } from "@capi/polkadot_westend"
// import { Balances, chain, System } from "@capi/polkadot"
import { MultiAddress } from "@capi/polkadot_westend/types/sp_runtime/multiaddress.js"
import { effect } from "@preact/signals"
import { Rune, ss58 } from "capi"
import { pjsSender } from "capi/patterns/compat/pjs_sender"
import { MultisigRune } from "capi/patterns/multisig"
import { signature } from "capi/patterns/signature/polkadot"
import { Link } from "react-router-dom"
import { Button } from "../components/Button.js"
import { CenteredCard } from "../components/CenteredCard.js"
import { IconPlus } from "../components/icons/IconPlus.js"
import { Identicon } from "../components/identicon/Identicon.js"
import {
  accounts,
  defaultAccount,
  defaultExtension,
} from "../signals/accounts.js"
// import { getBalance } from "../util/capi.js"
import { shortAddress } from "../util/short.js"
import { Page } from "./templates/base.js"

effect(async () => {
  if (!defaultAccount.value) return
  if (!accounts.value.length) return

  const alexa = accounts.value[0]
  const billy = accounts.value[1]
  const carol = accounts.value[2]

  const accountsPubKey = accounts.value.map(({ address }) =>
    ss58.decode(address)[1]
  )
  const alexaPubKey = accountsPubKey[0]!
  const billyPubKey = accountsPubKey[1]!
  const carolPubKey = accountsPubKey[2]!

  // Create a multisig
  const multisig = Rune.constant({
    signatories: [alexaPubKey, billyPubKey, carolPubKey],
    threshold: 2,
  }).into(MultisigRune, chain)

  const multisigAddress = await multisig.address.run()

  console.log(
    "Created multisig address: ",
    ss58.encode(42, multisigAddress.value),
  )

  const billyCapiAddr = await MultiAddress.Id(billyPubKey).run()

  const sender = pjsSender(chain, alexa.signer)

  // Fund the multisig
  await Balances.transfer({
    value: 2_000_000n,
    dest: billyCapiAddr,
  })
    .signed(signature({ sender: sender(alexa.address) }))
    // .signed(signature({ sender: alexa }))
    // .signed(signature({
    //   sender: {
    //     address: alexaAddressCapi,
    //     sign: accounts.value[0].signer.signPayload, // signPayload , signRaw
    //   },
    // }))
    //
    .sent()
    .dbgStatus("Existential deposit:")
    .finalized()
    .run()
})

// effect(async () => {
//   if (!defaultAccount.value) return
//   const balance = await getBalance(
//     defaultAccount.value.address,
//   )
//   console.log(balance)
// })
// console.log("signature", signature)

export function Dashboard() {
  return (
    <Page>
      <CenteredCard>
        <div className="flex flex-col gap-6 divide-y divide-divider">
          <h2 className="text-black text-xl ">Create a multisig</h2>
          <div className="">
            <div className="mt-32 flex justify-center">
              <Link to="/create-multisig">
                <Button iconLeft={<IconPlus />} size="xl">
                  New multisig
                </Button>
              </Link>
            </div>
            <div className="mt-14 flex flex-wrap gap-2 items-center">
              <p className="leading-8">Create a Multisig with address</p>
              {defaultAccount.value?.address && (
                <Identicon size={24} value={defaultAccount.value?.address} />
              )}
              {defaultAccount.value?.name && (
                <span className="font-bold">{defaultAccount.value?.name}</span>
              )}
              {defaultAccount.value?.address && (
                <span>{shortAddress(defaultAccount.value?.address)}</span>
              )}
            </div>
            <p className="leading-8">
              Multi-signature wallets require authorization of transactions
              through multiple keys.&nbsp;
              <a
                href="https://wiki.polkadot.network/docs/learn-account-multisig"
                target="_blank"
                className="text-link hover:text-link/80 underline"
              >
                Learn more about multisigs.
              </a>
            </p>
          </div>
        </div>
      </CenteredCard>
    </Page>
  )
}
