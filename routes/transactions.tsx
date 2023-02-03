import { Header, Navbar, TestBlock } from "components"

export default function Transactions() {
  return (
    <>
      <Header
        title={
          <TestBlock>
            <a href="/" className="hover:text-indigo-500">&lt; Back</a>
          </TestBlock>
        }
      />
      <Navbar />
      <TestBlock className="h-80">
        <TestBlock>Transaction 1</TestBlock>
        <TestBlock>Transaction 2</TestBlock>
        <TestBlock>...</TestBlock>
      </TestBlock>
    </>
  )
}
