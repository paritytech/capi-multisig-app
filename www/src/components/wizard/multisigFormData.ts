import { Signal, signal } from "@preact/signals"
import type { MultisigData } from "./schemas.js"

const initialValues = {
  name: "",
  memberCount: 2,
  threshold: 2,
  members: [],
  fund: 1,
}

export const formData: Signal<MultisigData> = signal(initialValues)

export const updateFormData = (formDataNew: Partial<MultisigData>) => {
  formData.value = { ...formData.value, ...formDataNew }
}
