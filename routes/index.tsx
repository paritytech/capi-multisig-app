import { Head } from "$fresh/runtime.ts"
import { Layout } from "../components/Layout.tsx"
import { PolkadotLogo } from "../components/PolkadotLogo.tsx"
import Counter from "../islands/Counter.tsx"

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <Layout>
        <div class="p-4 mx-auto max-w-screen-md">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-2xl font-semibold text-gray-900">Multisig</h1>
          </div>
          <p class="my-6">
            Welcome to `fresh`. Try updating this message in the ./routes/index.tsx file, and
            refresh.
          </p>
          <Counter start={3} />
        </div>
      </Layout>
    </>
  )
}
