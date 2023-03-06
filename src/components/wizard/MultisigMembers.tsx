import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { signal } from '@preact/signals'
import type { Signal } from '@preact/signals'

import { Button } from '../Button'
import { useWizardNavigation, useWizardActiveForm } from './Wizard'

const isValidAddress = () => true // TODO: update when function added
export const multisigMemberSchema = z.object({
  member: z.string({}).refine(isValidAddress, {
    message: 'Invalid address',
  }),
})
export type IMultisigMemberEntity = z.infer<typeof multisigMemberSchema>

export function createDefaultMembers(): Signal<IMultisigMemberEntity> {
  return signal({
    member: '',
  })
}

export function MultisigMembers() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMultisigMemberEntity>({
    resolver: zodResolver(multisigMemberSchema),
    mode: 'onChange',
  })
  const { goNext, goPrev } = useWizardNavigation()
  const { formDataActive, updateFormDataActive } =
    useWizardActiveForm<IMultisigMemberEntity>()

  const onSubmit = (formDataNew: IMultisigMemberEntity) => {
    updateFormDataActive(formDataNew)
    goNext()
  }

  const onBack = (formDataNew: IMultisigMemberEntity) => {
    updateFormDataActive(formDataNew)
    goPrev()
  }
  const onErrorBack = () => {
    goPrev()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 class="font-normal text-xl leading-8">2. Members</h1>
      <hr class="border-t border-gray-300 mt-6 mb-4" />
      <label class="leading-6">
        Member: <span class="text-pink-600">*</span>
      </label>
      <input
        {...register('member')}
        defaultValue={formDataActive.member}
        placeholder="Enter the address..."
        class="block w-full rounded-lg border border-gray-300 p-2 my-2"
      />
      {errors.member && (
        <div class="bg-red-100 text-red-700 p-2 rounded mt-2 border border-red-300">
          {errors.member.message}
        </div>
      )}
      <hr class="border-t border-gray-300 mt-4 mb-4" />
      <div class="flex justify-between">
        <Button variant="ghost" onClick={handleSubmit(onBack, onErrorBack)}>
          {'<'} Back
        </Button>
        <Button type="submit">Sign & create</Button>
      </div>
    </form>
  )
}
