import { Button } from "components"
import { zodResolver } from "https://esm.sh/@hookform/resolvers@2.9.11/zod"
import { useForm } from "https://esm.sh/react-hook-form@7.43.1?external=react,react-dom,@types/react,@types/react-dom"
import * as z from "https://esm.sh/zod@3.20.6"
import { isValidAddress } from "misc"
import { createContext, toChildArray } from "preact"
import type { ComponentChildren } from "preact"
import { useContext, useEffect, useState } from "preact/hooks"

// ------ Usage of Wizard
export default function WizardApp() {
  return (
    <Wizard>
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
  activeStep: number
  steps: number
  formData: IFormData
  goNext: () => void
  goPrev: () => void
  setActiveStep: (step: number) => void
  setSteps: (totalSteps: number) => void
  setFormData: (formData: IFormData) => void
}

type IFormData = Record<string, any>

// ------ Default form
const defaultValuesMultisigInit: IMultisigInitEntity = {
  multisigName: "",
}
const defaultValuesMembers: IMultisigMemberEntity = {
  member: "",
}
const defaultValuesFund: IMultisigFundEntity = {
  fund: null,
}

// ------ Default context
const defaultWizardValues: IWizardContext = {
  activeStep: 0,
  steps: 0,
  formData: { ...defaultValuesMultisigInit, ...defaultValuesMembers, ...defaultValuesFund },
  goNext: () => {},
  goPrev: () => {},
  setActiveStep: () => {},
  setSteps: () => {},
  setFormData: () => {},
}
const WizardContext = createContext<IWizardContext>(defaultWizardValues)

// ------ Hooks
const useWizardNavigation = () => {
  const { activeStep, goNext, goPrev, steps } = useContext(WizardContext)
  return {
    activeStep,
    goNext,
    goPrev,
    steps,
  }
}

const useWizardPages = (totalSteps: number) => {
  const { setSteps, activeStep } = useContext(WizardContext)

  useEffect(() => {
    setSteps(totalSteps)
  }, [totalSteps, setSteps])

  return {
    activeStep,
  }
}

const useWizardForm = () => {
  const { formData, setFormData } = useContext(WizardContext)

  const updateFormData = (formDataNew: IFormData) => {
    setFormData({ ...formData, ...formDataNew })
  }

  return {
    formData,
    updateFormData,
  }
}

// ------ Components
function Wizard({ children }: { children: ComponentChildren }) {
  const [activeStep, setActiveStep] = useState(defaultWizardValues.activeStep)
  const [steps, setSteps] = useState(defaultWizardValues.steps)
  const [formData, setFormData] = useState(defaultWizardValues.formData)

  const goNext = () => {
    setActiveStep(activeStep + 1)
  }

  const goPrev = () => {
    setActiveStep(activeStep - 1)
  }

  const contextWizard = {
    activeStep,
    setActiveStep,
    steps,
    setSteps,
    goNext,
    goPrev,
    formData,
    setFormData,
  }

  return (
    <WizardContext.Provider value={contextWizard}>
      {children}
    </WizardContext.Provider>
  )
}

function Pages({ children }: { children: ComponentChildren }) {
  const totalSteps = toChildArray(children).length
  const { activeStep } = useWizardPages(totalSteps)
  return (
    <div className="w-full">
      {toChildArray(children)[activeStep]}
    </div>
  )
}

// ------ Pages
// ------ Multisig Init
const multisigInitSchema = z.object({
  multisigName: z.string().min(1, { message: "Required a multisig address" }),
})
type IMultisigInitEntity = z.infer<typeof multisigInitSchema>

function MultisigInit() {
  const { register, handleSubmit, formState: { errors } } = useForm<IMultisigInitEntity>({
    resolver: zodResolver(multisigInitSchema),
  })
  const { formData, updateFormData } = useWizardForm()
  const { goNext } = useWizardNavigation()

  const onSubmit = (formDataNew: IMultisigInitEntity) => {
    updateFormData(formDataNew)
    goNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-normal text-xl leading-8">1. Multisig setup</h1>
      <hr className="border-t border-gray-300 mt-6 mb-4" />
      <label className="leading-6">
        Multisig Name: <span className="text-pink-600">*</span>
      </label>
      <input
        {...register("multisigName")}
        defaultValue={formData.multisigName}
        placeholder="Enter the name..."
        className="block w-full rounded-lg border border-gray-300 p-2 my-2 w-1/3"
      />
      {errors.multisigName && (
        <div className="bg-red-100 text-red-700 p-2 rounded mt-2 border border-red-300">
          {errors.multisigName.message}
        </div>
      )}
      <hr className="border-t border-gray-300 mt-4 mb-2" />
      <div className="flex justify-end">
        <Button variant="ghost" type="submit" className="w-auto">
          Next {">"}
        </Button>
      </div>
    </form>
  )
}
// ------ Multisig Members
const multisigMemberSchema = z.object({
  member: z.string({}).refine(isValidAddress, {
    message: "Invalid polkadot address",
  }),
})
type IMultisigMemberEntity = z.infer<typeof multisigMemberSchema>

function MultisigMembers() {
  const { register, handleSubmit, formState: { errors } } = useForm<IMultisigMemberEntity>({
    resolver: zodResolver(multisigMemberSchema),
  })
  const { formData, updateFormData } = useWizardForm()
  const { goNext, goPrev } = useWizardNavigation()

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
      <h1 className="font-normal text-xl leading-8">2. Members</h1>
      <hr className="border-t border-gray-300 mt-6 mb-4" />
      <label className="leading-6">
        Member: <span className="text-pink-600">*</span>
      </label>
      <input
        {...register("member")}
        defaultValue={formData.member}
        placeholder="Enter the address..."
        className="block w-full rounded-lg border border-gray-300 p-2 my-2 w-1/3"
      />
      {errors.member && (
        <div className="bg-red-100 text-red-700 p-2 rounded mt-2 border border-red-300">
          {errors.member.message}
        </div>
      )}
      <hr className="border-t border-gray-300 mt-4 mb-4" />
      <div className="flex justify-between">
        <Button variant="ghost" onClick={handleSubmit(onBack, onErrorBack)} className="w-auto">
          {"<"} Back
        </Button>
        <Button variant="fill" type="submit" className="w-auto">
          Sign & create
        </Button>
      </div>
    </form>
  )
}

// ------ Multisig Fund
const multisigFundSchema = z.object({
  fund: z.optional(
    z.number({ invalid_type_error: "Fund must be greater than 0" }).min(1, {
      message: "Fund must be greater than 0",
    }),
  ).nullable(),
})
type IMultisigFundEntity = z.infer<typeof multisigFundSchema>

function MultisigFund() {
  const { register, handleSubmit, formState: { errors } } = useForm<IMultisigFundEntity>({
    resolver: zodResolver(multisigFundSchema),
  })
  const { formData, updateFormData } = useWizardForm()
  const { goNext, goPrev } = useWizardNavigation()

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
      <h1 className="font-normal text-xl leading-8">3. Fund the multisig</h1>
      <hr className="border-t border-gray-300 mt-6 mb-4" />
      <label className="leading-6">
        Fund the multisig: <span className="text-pink-600">*</span>
      </label>
      <input
        {...register("fund", { valueAsNumber: true })}
        type="number"
        defaultValue={`${formData.fund}`}
        placeholder="0 DOT"
        className="block w-full rounded-lg border border-gray-300 p-2 my-2 w-1/3"
      />
      {errors.fund && (
        <div className="bg-red-100 text-red-700 p-2 rounded mt-2 border border-red-300">
          {errors.fund.message}
        </div>
      )}
      <hr className="border-t border-gray-300 mt-4 mb-4" />
      <div className="flex justify-between">
        <Button variant="ghost" onClick={handleSubmit(onBack, onErrorBack)} className="w-auto">
          {"<"} Back
        </Button>
        <Button variant="fill" type="submit" className="w-auto">
          Sign & fund
        </Button>
      </div>
    </form>
  )
}

// ------ Multisig Summary
function MultisigSummary() {
  const { formData } = useWizardForm()
  const { goPrev } = useWizardNavigation()

  return (
    <div>
      <h1 className="font-normal text-xl leading-8">Summary</h1>
      <hr className="border-t border-gray-300 mt-6 mb-4" />
      <pre className="font-mono whitespace-pre-wrap overflow-x-auto bg-gray-100 p-4 rounded-lg shadow-md">
        {JSON.stringify(formData, null, 2)}
      </pre>
      <hr className="border-t border-gray-300 mt-4 mb-2" />
      <div className="flex justify-start">
        <Button variant="ghost" type="submit" className="w-auto" onClick={goPrev}>
          {"<"} Back
        </Button>
      </div>
    </div>
  )
}
