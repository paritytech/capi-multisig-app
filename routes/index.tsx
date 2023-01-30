import { Card } from "../components/Card.tsx"
import { Header } from "../components/layout/Header.tsx"
import { Layout } from "../components/layout/Layout.tsx"
import { Navbar } from "../components/layout/Navbar.tsx"
import { PolkadotLogo } from "../components/PolkadotLogo.tsx"

export default function Landing() {
  return (
    <Layout>
      <Header
        title={
          <div className="w-40">
            <PolkadotLogo />
          </div>
        }
      />
      <Navbar />
      <div className="flex justify-center mt-10">
        <Card className="flex flex-col items-center w-[600px]">
          <p>None of the accounts connected is a part of a multisig.</p>
          <p>You can create a new multisig from the top toolbar.</p>
        </Card>
      </div>
    </Layout>
  )
}
