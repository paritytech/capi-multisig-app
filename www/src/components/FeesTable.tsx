import { formatBalance } from "../util/balance.js"
import "react-tooltip/dist/react-tooltip.css"
import { Tooltip } from "react-tooltip"
import { IconInfo } from "./icons/IconInfo.js"

export type Fee = {
  name: string
  value: bigint
  displayValue: string
  info?: string
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
            <span className="flex items-center">
              <span className="mr-2">{fee.name}</span>
              {fee.info && (
                <a data-tooltip-id="my-tooltip" data-tooltip-content={fee.info}>
                  <IconInfo />
                </a>
              )}
            </span>
            <span>
              {fee.displayValue}
            </span>
          </div>
        )
      })}
      <Tooltip id="my-tooltip" />
      <div className="flex justify-between border-t pt-4 mt-2">
        <span>Total</span>
        <span>{formatBalance(total)}</span>
      </div>
    </div>
  )
}
