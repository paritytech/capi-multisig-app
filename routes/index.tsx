import { Header } from "../components/layout/Header.tsx"
import { Layout } from "../components/layout/Layout.tsx"
import { Navbar } from "../components/layout/Navbar.tsx"
import { TestBlock } from "../components/TestBlock.tsx"

export default function Landing() {
  return (
    <Layout>
      <Header title={<TestBlock>Overview</TestBlock>} />
      <Navbar />
      <TestBlock className="h-80">
        None of the accounts connected is a part of a multisig. You can create a new multisig from
        the top toolbar.
      </TestBlock>
    </Layout>
  )
}
