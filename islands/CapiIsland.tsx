// TODO: FIX: Uncaught ReferenceError: ClientE_ is not defined [browser http://localhost:8000/]
import * as C from "http://localhost:5646/@local/mod.ts"
// import * as C from "https://deno.land/x/capi/mod.ts"

export default function CapiIsland() {
  console.log("C", C)

  return <div>Capi Island</div>
}
