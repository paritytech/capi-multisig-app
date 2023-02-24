import { Card, Header, Layout, Navbar } from "components"
import CapiComponent from "islands/CapiComponent.tsx"
import WizardApp from "islands/WizardApp.tsx"

export default function Landing() {
  return (
    <Layout>
      <Header />
      <Navbar title={<h1 className="text-2xl">Overview</h1>} />
      <div className="flex flex-col items-center justify-center mt-10 gap-4">
        <WizardApp />
        <Card className="flex flex-col items-center w-[600px]">
          <p>None of the accounts connected is a part of a multisig.</p>
          <p>You can create a new multisig from the top toolbar.</p>
        </Card>
        <CapiComponent />
      </div>
    </Layout>
  )
}
