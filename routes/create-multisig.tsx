import { Header } from "../components/layout/Header.tsx"
import { Layout } from "../components/layout/Layout.tsx"
import { Navbar } from "../components/layout/Navbar.tsx"
import { TestBlock } from "../components/TestBlock.tsx"
import CreateMultisig from "../islands/CreateMultisig.tsx"

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
      <CreateMultisig />
    </Layout>
  )
}
