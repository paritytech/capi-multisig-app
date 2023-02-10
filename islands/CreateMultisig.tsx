import { computed, signal } from "@preact/signals"
import { JSX } from "preact/jsx-runtime"
import { Button } from "../components/Button.tsx"
import { Card } from "../components/Card.tsx"
import { IconPlus } from "../components/icons/IconPlus.tsx"

const DEFAULT_THRESHOLD = 2
const name = signal("")
const threshold = signal(DEFAULT_THRESHOLD)
const depositorAddress = signal("")
const signatories = signal([""])

const errorsName = computed(() => {
  if (!name.value) {
    return ["Name is empty"]
  }
  return []
})

const errorsThreshold = computed(() => {
  const errors: string[] = []
  if (!threshold.value) {
    errors.push("Provide a threshold")
  }
  if (threshold.value < 2) {
    errors.push("Threshold must be greater than 2")
  }
  if (threshold.value > signatories.value.length) {
    errors.push("Threshold must be lesser than amount of signatories")
  }
  return errors
})

export default function CreateMultisig() {
  const setName = ({ currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    name.value = currentTarget.value
  }

  const setThreshold = ({ currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    threshold.value = currentTarget.valueAsNumber
  }

  const setDepositorAddress = ({ currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    depositorAddress.value = currentTarget.value
  }

  const setSignatory = ({ index, value }: { index: number; value: string }) => {
    signatories.value = signatories.value.map((signatory, index_) => {
      if (index_ === index) {
        return value
      }
      return signatory
    })
  }

  const addSignatory = () => {
    signatories.value = signatories.value.concat("")
  }

  const createMultisig = async () => {
    await fetch("/api/put_multisig", {
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
        // id: crypto.randomUUID(),
        id: name.value, // TODO
        name: name.value,
        depositorAddress: depositorAddress.value,
        threshold: threshold.value,
        signatories: signatories.value,
      }),
    })
  }

  return (
    <Card className="mt-10 px-8 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-tuna">Multisig Name:</label>

        <input
          className="rounded-lg bg-jaguar border-gray-300 text-gray-900 w-full focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
          placeholder="Multisig Name"
          type="text"
          value={name.value}
          onInput={setName}
        />
        <p>The name will not be written on chain</p>

        {errorsName.value && errorsName.value.length > 0 && (
          <div className="flex flex-col gap-2">
            {errorsName.value.map((error) => <p key={error} className="text-red-600">{error}</p>)}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 w-40">
        <label className="text-tuna">Threshold:</label>
        <input
          className="rounded-lg bg-jaguar border-gray-300 text-gray-900 focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
          placeholder="2"
          type="number"
          value={threshold.value}
          onChange={setThreshold}
        />

        {errorsThreshold.value && errorsThreshold.value.length > 0 && (
          <div className="flex flex-col gap-2">
            {errorsThreshold.value.map((error) => (
              <p key={error} className="text-red-600">{error}</p>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-tuna">Depositor:</label>

        {/* TODO Replace to Select */}
        <input
          className="rounded-lg bg-jaguar border-gray-300 text-gray-900 w-full focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
          placeholder="Depositor Address"
          type="text"
          value={depositorAddress.value}
          onInput={setDepositorAddress}
        />
      </div>

      {signatories.value.map((signatory, index) => {
        return (
          <div className="flex flex-col gap-2">
            <label className="text-tuna">Signatory:</label>

            <input
              className="rounded-lg bg-jaguar border-gray-300 text-gray-900 w-full focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Signatory Address"
              type="text"
              value={signatory}
              onInput={(e) => {
                setSignatory({ index, value: (e.target as HTMLInputElement).value })
              }}
            />
          </div>
        )
      })}

      <div className="self-end">
        <Button variant="ghost" iconLeft={<IconPlus />} onClick={addSignatory}>
          Add signatory
        </Button>
      </div>

      <div className="self-end">
        <Button variant="fill" onClick={createMultisig}>Create multisig</Button>
      </div>
    </Card>
  )
}
