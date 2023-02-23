import { Card, Header, Layout, Navbar } from "components"
import CapiComponent from "islands/CapiComponent.tsx"
import Multisigs from "../islands/Multisigs.tsx"

export default function Landing() {
  return (
    <Layout>
      <Header />
      <Navbar title={<h1 className="text-2xl">Overview</h1>} />
      <div className="flex flex-col items-center justify-center mt-10 gap-4">
        <Card className="flex flex-col items-center w-[600px]">
          <Multisigs />
        </Card>
        <CapiComponent />
      </div>
    </Layout>
  )
}
