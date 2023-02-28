// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" }
import * as $$0 from "./islands/AccountSelect.tsx"
import * as $$1 from "./islands/CapiComponent.tsx"
import * as $$2 from "./islands/CreateMultisig.tsx"
import * as $$3 from "./islands/Inputs.tsx"
import * as $$4 from "./islands/WalletConnect.tsx"
import * as $$5 from "./islands/WizardApp.tsx"
import * as $0 from "./routes/api/db_get.ts"
import * as $1 from "./routes/api/put_multisig.ts"
import * as $2 from "./routes/api/put_proxy.ts"
import * as $3 from "./routes/api/put_real.ts"
import * as $4 from "./routes/api/update_real.ts"
import * as $5 from "./routes/create-multisig.tsx"
import * as $6 from "./routes/create-transaction.tsx"
import * as $7 from "./routes/index.tsx"

const manifest = {
  routes: {
    "./routes/api/db_get.ts": $0,
    "./routes/api/put_multisig.ts": $1,
    "./routes/api/put_proxy.ts": $2,
    "./routes/api/put_real.ts": $3,
    "./routes/api/update_real.ts": $4,
    "./routes/create-multisig.tsx": $5,
    "./routes/create-transaction.tsx": $6,
    "./routes/index.tsx": $7,
  },
  islands: {
    "./islands/AccountSelect.tsx": $$0,
    "./islands/CapiComponent.tsx": $$1,
    "./islands/CreateMultisig.tsx": $$2,
    "./islands/Inputs.tsx": $$3,
    "./islands/WalletConnect.tsx": $$4,
    "./islands/WizardApp.tsx": $$5,
  },
  baseUrl: import.meta.url,
  config,
}

export default manifest
