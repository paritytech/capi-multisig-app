import { Header, Navbar, TestBlock } from "components"

export default function Create() {
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
        <TestBlock className="">Multisig Name</TestBlock>
        <TestBlock className="">Signatories List</TestBlock>
        <TestBlock className="">Start new transaction</TestBlock>
      </TestBlock>
    </>
  )
}
