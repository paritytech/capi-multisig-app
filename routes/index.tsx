import { Header, Layout, Navbar, TestBlock } from "components"
import CapiComponent from "islands/CapiComponent.tsx"

export default function Landing() {
  return (
    <Layout>
      <Header title={<TestBlock>Overview</TestBlock>} />
      <Navbar />
      <TestBlock className="h-80">
        None of the accounts connected is a part of a multisig. You can create a new multisig from
        the top toolbar.
      </TestBlock>
      <CapiComponent />
    </Layout>
  )
}
