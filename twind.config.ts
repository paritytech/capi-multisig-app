import { Options } from "$fresh/plugins/twind.ts"
import { withForms } from "@twind/forms"

export default ((): Options => ({
  selfURL: import.meta.url,
  preflight: withForms(),
  theme: {
    extend: {
      colors: {
        tuna: "#321D47",
        nebula: "#D1D1DB",
        platinum: "#DFE1E6",
        jaguar: "rgba(0, 0, 0, 0.05)",
        magnolia: "#F3F5FB",
      },
    },
  },
}))()
