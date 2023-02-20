import { Card, Header, Layout, Navbar } from "components";
import CapiComponent from "islands/CapiComponent.tsx";
// import FormikComponent from "islands/FormikComponent.tsx";
import ReactHookFormComponent from "islands/ReactHookFormComponent.tsx";

export default function Landing() {
  return (
    <Layout>
      <Header title={<h1 className="text-2xl">Overview</h1>} />
      <Navbar />
      <div className="flex justify-center mt-10">
        <Card className="flex flex-col items-center w-[600px]">
          <p>None of the accounts connected is a part of a multisig.</p>
          <p>You can create a new multisig from the top toolbar.</p>
        </Card>
      </div>
      <CapiComponent />
      {/* <FormikComponent /> */}
      <ReactHookFormComponent />
    </Layout>
  );
}
