import type { ComponentChildren } from "preact"
import { TestBlock } from "../TestBlock.tsx"

export const Header = ({
  title,
}: { title: ComponentChildren }) => {
  return (
    <header>
      <TestBlock className="flex flex-row flex-nowrap justify-between">
        <div className="flex">
          {title && title}
        </div>
        <div className="flex">
          <TestBlock>
            Wallet connect
          </TestBlock>
          <TestBlock>
            Dark / Light mode
          </TestBlock>
          <TestBlock>
            Settings
          </TestBlock>
        </div>
      </TestBlock>
    </header>
  )
}
