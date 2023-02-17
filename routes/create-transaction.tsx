import { Header, Layout, Navbar, TestBlock } from "components"

export default function Create() {
  return (
    <Layout>
      <Header />
      <Navbar
        title={
          <TestBlock>
            <a href="/" className="hover:text-indigo-500">&lt; Back</a>
          </TestBlock>
        }
      />
      <TestBlock className="h-80">
        <TestBlock className="">Multisig Name</TestBlock>
        <TestBlock className="">Signatories List</TestBlock>
        <TestBlock className="">Start new transaction</TestBlock>
      </TestBlock>
    </Layout>
  )
}
