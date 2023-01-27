import { Header } from "../components/layout/Header.tsx"
import { Layout } from "../components/layout/Layout.tsx"
import { Navbar } from "../components/layout/Navbar.tsx"
import { TestBlock } from "../components/TestBlock.tsx"

export default function Transactions() {
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
      <TestBlock className="h-80">
        <TestBlock>Transaction 1</TestBlock>
        <TestBlock>Transaction 2</TestBlock>
        <TestBlock>...</TestBlock>
      </TestBlock>
    </Layout>
  )
}
