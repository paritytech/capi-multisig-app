import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toChildArray } from 'preact'
import type { ComponentChildren } from 'preact'
import { signal, computed } from '@preact/signals'
import type { Signal } from '@preact/signals'

// ------ Usage of Wizard
export default function WizardApp() {
  return (
    <Wizard>
      <MultisigInit />
      <MultisigMembers />
      <MultisigFund />
      <MultisigSummary />
    </Wizard>
  )
}

// ------ Types
enum MultisigStep {
  MultisigInit,
  MultisigMembers,
  MultisigFund,
  MultisigSummary,
}

interface IFormData {
  [MultisigStep.MultisigInit]: Signal<IMultisigInitEntity>
  [MultisigStep.MultisigMembers]: Signal<IMultisigMemberEntity>
  [MultisigStep.MultisigFund]: Signal<IMultisigFundEntity>
}

type IMultisigEntities =
  | IMultisigInitEntity
  | IMultisigMemberEntity
  | IMultisigFundEntity

// ------ State
function createDefaultFormData(): IFormData {
  return {
    [MultisigStep.MultisigInit]: createDefaultMultisigInit(),
    [MultisigStep.MultisigMembers]: createDefaultMembers(),
    [MultisigStep.MultisigFund]: createDefaultFund(),
  }
}

function createWizardState() {
  const activeStep = signal(0)
  const formData: Signal<IFormData> = computed(() => createDefaultFormData())

  return {
    activeStep,
    formData: formData.value,
  }
}

const wizardState = createWizardState()

// ------ Hooks
function useWizardNavigation() {
  const { activeStep } = wizardState

  function goNext() {
    activeStep.value = activeStep.value + 1
  }

  function goPrev() {
    activeStep.value = activeStep.value - 1
  }
  return {
    goNext,
    goPrev,
  }
}

function useWizardActiveForm<T extends IMultisigEntities>() {
  const { formData, activeStep } = wizardState

  const formDataActive = formData[activeStep.value as keyof IFormData]

  const updateFormDataActive = (formDataNew: T) => {
    formDataActive.value = formDataNew
  }

  return {
    updateFormDataActive,
    formDataActive: formDataActive.value as T,
  }
}

// ------ Components
function Wizard({ children }: { children: ComponentChildren }) {
  return (
    <div class="w-full">
      {toChildArray(children)[wizardState.activeStep.value]}
    </div>
  )
}

// ------ STEPS
// ------ Multisig Init
const multisigInitSchema = z.object({
  name: z.string().min(1, { message: 'Required a multisig address' }),
})
type IMultisigInitEntity = z.infer<typeof multisigInitSchema>

function createDefaultMultisigInit(): Signal<IMultisigInitEntity> {
  return signal({
    name: '',
  })
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
  const { goNext } = useWizardNavigation()
  const { formDataActive, updateFormDataActive } =
    useWizardActiveForm<IMultisigInitEntity>()

  const onSubmit = (formDataNew: IMultisigInitEntity) => {
    updateFormDataActive(formDataNew)
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
        defaultValue={formDataActive.name}
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
        <button type="submit" class="w-auto">
          Next {'>'}
        </button>
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

function createDefaultMembers(): Signal<IMultisigMemberEntity> {
  return signal({
    member: '',
  })
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
        <button onClick={handleSubmit(onBack, onErrorBack)} class="w-auto">
          {'<'} Back
        </button>
        <button type="submit" class="w-auto">
          Sign & create
        </button>
      </div>
    </form>
  )
}

// ------ Multisig Fund
const multisigFundSchema = z.object({
  fund: z.number().min(1, { message: 'Fund must be greater than 0' }),
})
type IMultisigFundEntity = z.infer<typeof multisigFundSchema>

function createDefaultFund(): Signal<IMultisigFundEntity> {
  return signal({
    fund: 1,
  })
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
  const { goNext, goPrev } = useWizardNavigation()
  const { formDataActive, updateFormDataActive } =
    useWizardActiveForm<IMultisigFundEntity>()

  const onSubmit = (formDataNew: IMultisigFundEntity) => {
    updateFormDataActive(formDataNew)
    goNext()
  }

  const onBack = (formDataNew: IMultisigFundEntity) => {
    updateFormDataActive(formDataNew)
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
        defaultValue={formDataActive.fund.toString()}
        class="block rounded-lg border border-gray-300 p-2 my-2 w-1/3"
      />
      {errors.fund && (
        <div class="bg-red-100 text-red-700 p-2 rounded mt-2 border border-red-300">
          {errors.fund.message}
        </div>
      )}
      <hr class="border-t border-gray-300 mt-4 mb-4" />
      <div class="flex justify-between">
        <button onClick={handleSubmit(onBack, onErrorBack)} class="w-auto">
          {'<'} Back
        </button>
        <button type="submit" class="w-auto">
          Sign &amp; fund
        </button>
      </div>
    </form>
  )
}

// ------ Multisig Summary
function MultisigSummary() {
  const { formData } = wizardState
  const { goPrev } = useWizardNavigation()
  console.log('formDataAll', formData)

  return (
    <div>
      <h1 class="font-normal text-xl leading-8">Summary</h1>
      <hr class="border-t border-gray-300 mt-6 mb-4" />
      <pre className="bg-gray-100 p-4 rounded-lg shadow-md overflow-x-auto">
        {/* ${JSON.stringify(formData, null, 2)} */}
        {Object.entries(formData).map(([objectKey, objectValue]) => (
          <div key={objectKey}>
            {Object.entries(objectValue.value).map(([key, value]) => (
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
        <button type="submit" class="w-auto" onClick={goPrev}>
          {'<'} Back
        </button>
      </div>
    </div>
  )
}
