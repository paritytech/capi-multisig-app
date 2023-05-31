import type { VNode } from "preact"
import { toChildArray } from "preact"
import { useMemo } from "preact/hooks"
import { Tooltip } from "react-tooltip"
import { IconInfo } from "./icons/IconInfo.js"

type SumTableProps = {
  unit: string
  children: VNode<RowProps>[] | VNode<RowProps>
}

export function SumTable({ unit, children }: SumTableProps) {
  const [items, totalFee] = useMemo(() => {
    let items = toChildArray(children) as VNode<RowProps>[]
    const totalFee = items.reduce(
      (total: number, { props: { value } }) => {
        return total + Number(value)
      },
      0,
    )

    if (unit) {
      items = items.map((child) => ({
        ...child,
        props: { ...child.props, unit },
      }))
    }
    return [items, totalFee]
  }, [children])

  return (
    <div className="bg-table-bg leading-6 text-sm text-table-text border border-table-border rounded py-5">
      <dl>
        <>{items}</>
        <Tooltip id="sum-table-item" />
        <hr className="divide-y mx-6 pb-4" />
        <div className="px-6 flex justify-between font-bold">
          <dt>Total</dt>
          <dd>{totalFee} {unit}</dd>
        </div>
      </dl>
    </div>
  )
}

export interface Row {
  name: string
  value: string
  info?: string
  unit?: string
}

interface RowProps extends Row {}

function Row({ name, value, info, unit }: RowProps) {
  return (
    <div className="pb-4 px-6 flex justify-between">
      <dt className={"flex flex-row justify-center items-center"}>
        {name}
        {info && (
          <a
            className={"ml-1"}
            data-tooltip-id="my-tooltip"
            data-tooltip-content={info}
          >
            <IconInfo />
          </a>
        )}
      </dt>
      <dd>{value} {unit}</dd>
    </div>
  )
}

SumTable.Row = Row
