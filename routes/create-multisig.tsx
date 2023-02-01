import { Header, Layout, Navbar, TestBlock } from "components"

export default function Create() {
  return (
    <Layout>
      <Header
        title={
          <TestBlock>
            <a href="/" className="hover:text-indigo-500">&lt; Back</a>
          </TestBlock>
        }
      />
      <Navbar />
      <TestBlock className="">
        <TestBlock className="">Multisig Name</TestBlock>
        <TestBlock className="">Threshold</TestBlock>
        <TestBlock className="">Depositor</TestBlock>
        <TestBlock className="">Add signatory</TestBlock>
        <TestBlock className="">Create</TestBlock>
      </TestBlock>
    </Layout>
  )
}
