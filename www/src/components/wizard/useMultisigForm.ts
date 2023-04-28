import { signal } from "@preact/signals"
import type { MultisigData } from "./schemas.js"

const initialValues: MultisigData = {
  name: "",
  memberCount: 2,
  threshold: 2,
  members: [],
  fund: 1,
}

const formData = signal(initialValues)

export function useMultisigForm() {
  const updateFormData = (formDataNew: Partial<MultisigData>) => {
    formData.value = { ...formData.value, ...formDataNew }
  }

  return {
    updateFormData,
    formData,
  }
}
