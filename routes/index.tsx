import { Card, Header, Identicon, Layout, Navbar } from "components"
import CapiComponent from "islands/CapiComponent.tsx"
import WizardApp from "islands/WizardApp.tsx"
import Select from "../islands/AccountSelect.tsx"
import Inputs from "../islands/Inputs.tsx"

export default function Landing() {
  return (
    <Layout>
      <Header />
      <Navbar title={<h1 className="text-2xl">Overview</h1>} />
      <div className="flex flex-col items-center justify-center mt-10 gap-4">
        <Card className="flex flex-col items-center w-[600px]">
          <WizardApp />
        </Card>
        <Card className="flex flex-col items-center w-[600px] space-y-4">
          <h2 className="font-bold">Identicon</h2>
          <Identicon size={32} value="5EP1x5VUMwQiaWHkNa5d6qE2FqRW8Apyw6P67NPUzzHMdDz4" />
          <Identicon size={32} value="5EHufKvrjg3QGn4VFgFpSq7fybnLauire1ULHEcosAg8E47X" />
        </Card>
        <Card className="flex flex-col items-center w-[600px] space-y-4">
          <h2 className="font-bold">AccountSelect</h2>
          <Select />
        </Card>
        <Card className="flex flex-col items-center w-[600px] space-y-4">
          <h2 className="font-bold">AddressInput</h2>
          <Inputs />
        </Card>
        <Card className="flex flex-col items-center w-[600px]">
          <p>None of the accounts connected is a part of a multisig.</p>
          <p>You can create a new multisig from the top toolbar.</p>
        </Card>
        <CapiComponent />
      </div>
    </Layout>
  )
}
