import { Header } from "../components/layout/Header.tsx"
import { Layout } from "../components/layout/Layout.tsx"
import { Navbar } from "../components/layout/Navbar.tsx"
import { TestBlock } from "../components/TestBlock.tsx"

export default function Create() {
  return (
    <Layout>
      <div className="py-4">
        <Header
          title={
            <TestBlock>
              <a href="/" className="hover:text-indigo-500">&lt; Back</a>
            </TestBlock>
          }
        />
        <Navbar />
        <TestBlock className="">
          <TestBlock className="">
            Multisig Name
          </TestBlock>
          <TestBlock className="">
            Threshold
          </TestBlock>
          <TestBlock className="">
            Depositor
          </TestBlock>
          <TestBlock className="">
            Add signatory
          </TestBlock>
          <TestBlock className="">
            Create
          </TestBlock>
        </TestBlock>
      </div>
    </Layout>
  )
}
