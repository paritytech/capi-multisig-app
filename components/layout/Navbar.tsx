import { TestBlock } from "../TestBlock.tsx"

export const Navbar = () => (
  <nav>
    <div className="bg-white py-2 px-6 rounded-b border border-nebula -mt-px">
      <div className="flex justify-end">
        <TestBlock>
          <a href="/create-multisig" className="hover:text-indigo-500">New multisig</a>
        </TestBlock>
        <TestBlock>
          <a href="/create-transaction" className="hover:text-indigo-500">New transaction</a>
        </TestBlock>
        <TestBlock>
          <a href="/transactions" className="hover:text-indigo-500">Transaction History</a>
        </TestBlock>
      </div>
    </div>
  </nav>
)
