import type { VNode } from "preact"
import { toChildArray } from "preact"

type TableProps = {
  children: VNode<ItemProps>[] | VNode<ItemProps>
}

export function Table({ children }: TableProps) {
  const totalFee = (toChildArray(children) as VNode<ItemProps>[]).reduce(
    (total: number, { props: { fee } }) => total + fee,
    0,
  )

  return (
    <div class="bg-table-bg leading-6 text-sm text-table-text border border-table-border rounded py-5">
      <dl>
        <>{children}</>
        <hr class="divide-y mx-6 pb-4" />
        <div class="px-6 flex justify-between font-bold">
          <dt>Total</dt>
          <dd>{totalFee} DOT</dd>
        </div>
      </dl>
    </div>
  )
}

type ItemProps = {
  name: string
  fee: number
  unit: string
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
