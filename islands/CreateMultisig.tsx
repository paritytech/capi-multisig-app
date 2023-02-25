import { signal } from "@preact/signals"
import { Button, Card, IconPlus } from "components"
import { DEFAULT_THRESHOLD } from "misc"
import { useCallback } from "preact/hooks"
import { JSX } from "preact/jsx-runtime"

const name = signal("")
const threshold = signal(DEFAULT_THRESHOLD)
const depositorAddress = signal("")
const signatories = signal([""])

export default function CreateMultisig() {
  const setName = useCallback(({ currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    name.value = currentTarget.value
  }, [])

  const setThreshold = useCallback(
    ({ currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      threshold.value = currentTarget.valueAsNumber
    },
    [],
  )

  const setDepositorAddress = useCallback(
    ({ currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      depositorAddress.value = currentTarget.value
    },
    [],
  )

  const setSignatory = useCallback(({ index, value }: { index: number; value: string }) => {
    signatories.value = signatories.value.map((signatory, idx) => {
      if (idx === index) return value
      return signatory
    })
  }, [])

  const addSignatory = useCallback(() => {
    signatories.value = signatories.value.concat("")
  }, [])

  const createMultisig = useCallback(async () => {
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
  }, [])

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
