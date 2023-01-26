import type { ComponentChildren } from "preact"
import { TestBlock } from "../TestBlock.tsx"

export const Header = ({
  title,
}: { title: ComponentChildren }) => {
  return (
    <header className="bg-white py-2 px-6 rounded-t border border-[#D1D1DB]">
      <div className="flex flex-row flex-nowrap justify-between items-center">
        {title && (
          <div className="flex">
            {title}
          </div>
        )}
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
      </div>
    </header>
  )
}
