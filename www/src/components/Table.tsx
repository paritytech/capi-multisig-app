import type { VNode } from "preact"
import { toChildArray } from "preact"

type TableProps = {
  unit?: string
  children: VNode<ItemProps>[] | VNode<ItemProps>
}

export function Table({ unit, children }: TableProps) {
  let items = toChildArray(children) as VNode<ItemProps>[]
  const totalFee = items.reduce(
    (total: number, { props: { fee } }) => total + fee,
    0,
  )

  if (unit) {
    items = items.map((child) => ({
      ...child,
      props: { ...child.props, unit },
    }))
  }

  return (
    <div class="bg-table-bg leading-6 text-sm text-table-text border border-table-border rounded py-5">
      <dl>
        <>{items}</>
        <hr class="divide-y mx-6 pb-4" />
        <div class="px-6 flex justify-between font-bold">
          <dt>Total</dt>
          <dd>{totalFee} {unit}</dd>
        </div>
      </dl>
    </div>
  )
}

type ItemProps = {
  name: string
  fee: number
  unit?: string
}

function Item({ name, fee, unit }: ItemProps) {
  return (
    <div class="pb-4 px-6 flex justify-between">
      <dt>{name}</dt>
      <dd>{fee} {unit}</dd>
    </div>
  )
}

Table.Item = Item
