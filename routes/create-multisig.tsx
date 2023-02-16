import { Header, Layout, Navbar, TestBlock } from "components"
import CreateMultisig from "../islands/CreateMultisig.tsx"

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
      <div className="mx-10 mb-10">
        <CreateMultisig />
      </div>
    </Layout>
  )
}
