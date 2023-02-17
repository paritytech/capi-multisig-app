import type { ComponentChildren } from "preact"
import { TestBlock } from "../TestBlock.tsx"

export const Navbar = ({ title }: { title: ComponentChildren }) => (
  <nav>
    <div className="flex items-center justify-between bg-white py-2 px-6 rounded-b border border-nebula -mt-px">
      <div>
        {title && <div className="flex">{title}</div>}
      </div>
      <div className="flex justify-end">
        <TestBlock>
          <a href="/create-multisig" className="hover:text-indigo-500">New multisig</a>
        </TestBlock>
        <TestBlock>
          <a href="/create-transaction" className="hover:text-indigo-500">New transaction</a>
        </TestBlock>
      </div>
    </div>
  </nav>
)
