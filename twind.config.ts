import { Options } from "$fresh/plugins/twind.ts";
import { withForms } from "@twind/forms";

export default ((): Options => ({
  selfURL: import.meta.url,
  preflight: withForms(),
}))();
