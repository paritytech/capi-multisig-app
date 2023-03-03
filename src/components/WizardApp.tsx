import { Button } from './Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
// import { isValidAddress } from "misc"
import { createContext, toChildArray } from 'preact'
import type { ComponentChildren } from 'preact'
import { useContext, useEffect } from 'preact/hooks'
import { signal } from '@preact/signals'
import type { Signal } from '@preact/signals'

// ------ Usage of Wizard
export default function WizardApp() {
  return (
    <Wizard forms={createDefaultMultisigStepForms()}>
      <Pages>
        <MultisigInit />
        <MultisigMembers />
        <MultisigFund />
        <MultisigSummary />
      </Pages>
    </Wizard>
  )
}

// ------ Context
interface IWizardContext {
  activeStep: Signal<number>
  steps: Signal<number>
  formData: IFormData
  goNext: () => void
  goPrev: () => void
}

type IFormData = Record<string, any>

function createWizardContext() {
  const activeStep = signal(0)
  const steps = signal(0)
  const formData = {}

  function goNext() {
    activeStep.value = activeStep.value + 1
  }

  function goPrev() {
    activeStep.value = activeStep.value - 1
  }

  return {
    activeStep,
    steps,
    formData,
    goNext,
    goPrev,
  }
}

const WizardContext = createContext<IWizardContext>(createWizardContext())

// ------ Hooks
function useWizard() {
  return useContext(WizardContext)
}

function useWizardForm<T>() {
  const { formData, activeStep } = useWizard()
  const formDataActive: T = formData[activeStep.value]

  const updateFormDataActive = (formDataNew: IFormData) => {
    for (const key in formDataNew) {
      formDataActive[key].value = formDataNew[key]
    }
  }

  return {
    formData: formDataActive,
    updateFormData: updateFormDataActive,
    formDataAll: formData,
  }
}

// ------ Components
interface IPropsWizard {
  children: ComponentChildren
  forms: IFormData
}

function Wizard({ children, forms }: IPropsWizard) {
  const contextWizard = createWizardContext()

  if (forms) contextWizard.formData = forms

  return (
    <WizardContext.Provider value={contextWizard}>
      {children}
    </WizardContext.Provider>
  )
}

function Pages({ children }: { children: ComponentChildren }) {
  const { activeStep, steps } = useWizard()
  const totalSteps = toChildArray(children).length

  useEffect(() => {
    steps.value = totalSteps
  }, [totalSteps])

  return <div class="w-full">{toChildArray(children)[activeStep.value]}</div>
}

// ------ STEPS
// Define all possible steps
export enum MultisigStep {
  MultisigInit,
  MultisigMembers,
  MultisigFund,
  MultisigSummary,
}

// Define default forms
export function createDefaultMultisigStepForms() {
  return {
    [MultisigStep.MultisigInit]: createDefaultMultisigInit(),
    [MultisigStep.MultisigMembers]: createDefaultMultisigMembers(),
    [MultisigStep.MultisigFund]: createDefaultMultisigFund(),
  }
}

// ------ Multisig Init
const multisigInitSchema = z.object({
  name: z.string().min(1, { message: 'Required a multisig address' }),
})
type IMultisigInitEntity = z.infer<typeof multisigInitSchema>

export function createDefaultMultisigInit() {
  return {
    name: signal(''),
  }
}

function MultisigInit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMultisigInitEntity>({
    resolver: zodResolver(multisigInitSchema),
    mode: 'onChange',
  })
  const { goNext } = useWizard()
  const { formData, updateFormData } = useWizardForm<IMultisigInitEntity>()

  const onSubmit = (formDataNew: IMultisigInitEntity) => {
    updateFormData(formDataNew)
    goNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 class="font-normal text-xl leading-8">1. Multisig setup</h1>
      <hr class="border-t border-gray-300 mt-6 mb-4" />
      <label class="leading-6">
        Multisig Name: <span class="text-pink-600">*</span>
      </label>
      <input
        {...register('name')}
        id="name"
        defaultValue={formData.name}
        placeholder="Enter the name..."
        class="block rounded-lg border border-gray-300 p-2 my-2 w-1/2"
      />
      {errors.name && (
        <div class="bg-red-100 text-red-700 p-2 rounded mt-2 border border-red-300">
          {errors.name.message}
        </div>
      )}
      <hr class="border-t border-gray-300 mt-4 mb-2" />
      <div class="flex justify-end">
        <Button variant="ghost" type="submit" class="w-auto">
          Next {'>'}
        </Button>
      </div>
    </form>
  )
}
// ------ Multisig Members
const isValidAddress = () => true // TODO: update when function added
const multisigMemberSchema = z.object({
  member: z.string({}).refine(isValidAddress, {
    message: 'Invalid address',
  }),
})
type IMultisigMemberEntity = z.infer<typeof multisigMemberSchema>

function createDefaultMultisigMembers() {
  return {
    member: signal(''),
  }
}

function MultisigMembers() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMultisigMemberEntity>({
    resolver: zodResolver(multisigMemberSchema),
    mode: 'onChange',
  })
  const { goNext, goPrev } = useWizard()
  const { formData, updateFormData } = useWizardForm<IMultisigMemberEntity>()

  const onSubmit = (formDataNew: IMultisigMemberEntity) => {
    updateFormData(formDataNew)
    goNext()
  }

  const onBack = (formDataNew: IMultisigMemberEntity) => {
    updateFormData(formDataNew)
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
        defaultValue={formData.member}
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
        <Button
          variant="ghost"
          onClick={handleSubmit(onBack, onErrorBack)}
          class="w-auto"
        >
          {'<'} Back
        </Button>
        <Button variant="ghost" type="submit" class="w-auto">
          Sign & create
        </Button>
      </div>
    </form>
  )
}

// ------ Multisig Fund
const multisigFundSchema = z.object({
  fund: z
    .optional(
      z.number({ invalid_type_error: 'Fund must be greater than 0' }).min(1, {
        message: 'Fund must be greater than 0',
      }),
    )
    .nullable(),
})
type IMultisigFundEntity = z.infer<typeof multisigFundSchema>

function createDefaultMultisigFund() {
  return {
    fund: signal(null),
  }
}

function MultisigFund() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMultisigFundEntity>({
    resolver: zodResolver(multisigFundSchema),
    mode: 'onChange',
  })
  const { goNext, goPrev } = useWizard()
  const { formData, updateFormData } = useWizardForm<IMultisigFundEntity>()

  const onSubmit = (formDataNew: IMultisigFundEntity) => {
    updateFormData(formDataNew)
    goNext()
  }

  const onBack = (formDataNew: IMultisigFundEntity) => {
    updateFormData(formDataNew)
    goPrev()
  }

  const onErrorBack = () => {
    goPrev()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 class="font-normal text-xl leading-8">3. Fund the multisig</h1>
      <hr class="border-t border-gray-300 mt-6 mb-4" />
      <label class="leading-6">
        Fund the multisig: <span class="text-pink-600">*</span>
      </label>
      <input
        {...register('fund', { valueAsNumber: true })}
        type="number"
        defaultValue={`${formData.fund}`}
        placeholder="0 DOT"
        class="block rounded-lg border border-gray-300 p-2 my-2 w-1/3"
      />
      {errors.fund && (
        <div class="bg-red-100 text-red-700 p-2 rounded mt-2 border border-red-300">
          {errors.fund.message}
        </div>
      )}
      <hr class="border-t border-gray-300 mt-4 mb-4" />
      <div class="flex justify-between">
        <Button
          variant="ghost"
          onClick={handleSubmit(onBack, onErrorBack)}
          class="w-auto"
        >
          {'<'} Back
        </Button>
        <Button variant="ghost" type="submit" class="w-auto">
          Sign &amp; fund
        </Button>
      </div>
    </form>
  )
}

// ------ Multisig Summary
function MultisigSummary() {
  const { goPrev } = useWizard()
  const { formDataAll } = useWizardForm()

  console.log('formDataAll', formDataAll)

  return (
    <div>
      <h1 class="font-normal text-xl leading-8">Summary</h1>
      <hr class="border-t border-gray-300 mt-6 mb-4" />
      <pre className="bg-gray-100 p-4 rounded-lg shadow-md overflow-x-auto">
        {Object.entries(formDataAll).map(([objectKey, objectValue]) => (
          <div key={objectKey}>
            {Object.entries(objectValue).map(([key, value]) => (
              <div key={key} className="flex mb-2">
                <span className="font-bold text-gray-800 mr-2">{key}:</span>
                <span className="font-mono text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        ))}
      </pre>

      <hr class="border-t border-gray-300 mt-4 mb-2" />
      <div class="flex justify-start">
        <Button variant="ghost" type="submit" class="w-auto" onClick={goPrev}>
          {'<'} Back
        </Button>
      </div>
    </div>
  )
}
