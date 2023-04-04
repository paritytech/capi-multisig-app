import { formatBalance } from "../util/balance.js"

export type Fee = {
  name: string
  value: bigint
  displayValue: string
}

interface Props {
  fees: Fee[]
}

export function FeesTable({ fees }: Props) {
  let total = 0n
  return (
    <div className="px-6 py-8 bg-table-bg">
      {fees.map((fee) => {
        total = total + fee.value
        return (
          <div className="flex justify-between mb-4">
            <span>{fee.name}</span>
            <span>{fee.displayValue}</span>
          </div>
        )
      })}
      <div className="flex justify-between border-t pt-4 mt-2">
        <span>Total</span>
        <span>{formatBalance(total)}</span>
      </div>
    </div>
  )
}
