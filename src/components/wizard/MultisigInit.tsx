import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { signal } from '@preact/signals'
import type { Signal } from '@preact/signals'

import { Button } from '../Button'
import { useWizardNavigation, useWizardActiveForm } from './Wizard'

export const multisigInitSchema = z.object({
  name: z.string().min(1, { message: 'Required a multisig name' }),
})
export type IMultisigInitEntity = z.infer<typeof multisigInitSchema>

export function createDefaultMultisigInit(): Signal<IMultisigInitEntity> {
  return signal({
    name: '',
  })
}

export function MultisigInit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMultisigInitEntity>({
    resolver: zodResolver(multisigInitSchema),
    mode: 'onChange',
  })
  const { goNext } = useWizardNavigation()
  const { formDataActive, updateFormDataActive } =
    useWizardActiveForm<IMultisigInitEntity>()

  const onSubmit = (formDataNew: IMultisigInitEntity) => {
    updateFormDataActive(formDataNew)
    goNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 class="text-xl leading-8">1. Multisig setup</h1>
      <hr class="border-t border-gray-300 mt-6 mb-4" />
      <label class="leading-6">
        Multisig Name: <span class="text-pink-600">*</span>
      </label>
      <input
        {...register('name')}
        id="name"
        defaultValue={formDataActive.name}
        placeholder="Enter the name..."
        class="block rounded-lg border border-gray-300 p-2 my-2 w-1/2"
      />
      {errors.name && (
        <div class="bg-red-100 text-red-700 p-2 rounded mt-2 border border-red-300">
          {errors.name.message}
        </div>
      )}
      <hr class="divide-x-0 divide-gray-300 mt-4 mb-2" />
      <div class="flex justify-end">
        <Button variant="ghost" type="submit">
          Next &gt;
        </Button>
      </div>
    </form>
  )
}
