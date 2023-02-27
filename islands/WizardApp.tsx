import { Button } from "components"
import { useForm } from "https://esm.sh/react-hook-form@7.43.1?external=react,react-dom,@types/react,@types/react-dom"
import { createContext, toChildArray } from "preact"
import type { ComponentChildren } from "preact"
import { useContext, useEffect, useState } from "preact/hooks"

// ------ Usage of Wizard example
export default function WizardApp() {
  return (
    <Wizard>
      {/* <ProgressBar /> */}
      <Pages>
        <MultisigInit />
        <MultisigMembers />
        <MultisigFund />
        <MultisigSummary />
      </Pages>
      {/* <Navigation /> */}
    </Wizard>
  )
}

// ------ Wizard Context
interface IWizardContext {
  activeStep: number
  steps: number
  goNext: () => void
  goPrev: () => void
  setActiveStep: (step: number) => void
  setSteps: (steps: number) => void
  setFormData: ({}) => void
  formData: {
    multisigName: string
    member: string
    fund: number | null
  }
}

const defaultWizardValues = {
  activeStep: 0,
  steps: 0,
  goNext: () => {},
  goPrev: () => {},
  setActiveStep: () => {},
  setSteps: () => {},
  setFormData: () => {},
  formData: {
    multisigName: "",
    member: "",
    fund: null,
  },
}
const WizardContext = createContext<IWizardContext>(defaultWizardValues)

// ------ Wizard Hooks
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

const useWizardProgress = () => {
  const { activeStep, steps } = useContext(WizardContext)
  return {
    activeStep,
    steps,
  }
}

const useWizardForm = () => {
  const { formData, setFormData } = useContext(WizardContext)

  const updateFormData = (formDataNew) => {
    setFormData({ ...formData, ...formDataNew })
  }

  return {
    formData,
    updateFormData,
  }
}

// ------ Wizard Component
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

// ------ Custom components based on Wizard
function ProgressBar() {
  const { activeStep, steps } = useWizardProgress()
  return (
    <div>
      <h1>Step number: {activeStep + 1} / {steps}</h1>
    </div>
  )
}

function Navigation() {
  const { activeStep, goNext, goPrev, steps } = useWizardNavigation()
  const isFirstStep = activeStep <= 0
  const isLastStep = activeStep >= steps - 1
  return (
    <div>
      <button
        className={`bg-blue-500 text-white rounded-lg py-2 px-4 ${
          isFirstStep ? "bg-gray-400 cursor-not-allowed" : ""
        }`}
        disabled={isFirstStep}
        onClick={goPrev}
      >
        Previous
      </button>

      <button
        className={`bg-blue-500 text-white rounded-lg py-2 px-4 ${
          isLastStep ? "bg-gray-400 cursor-not-allowed" : ""
        }`}
        disabled={isLastStep}
        onClick={goNext}
      >
        Next
      </button>
    </div>
  )
}

// ------ Step Pages
function MultisigInit() {
  const { register, handleSubmit } = useForm()
  const { formData, updateFormData } = useWizardForm()
  const { goNext } = useWizardNavigation()

  const onSubmit = (formDataNew) => {
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
      <hr className="border-t border-gray-300 mt-4 mb-2" />
      <div className="flex justify-end">
        <Button variant="ghost" type="submit" className="w-auto">
          Next {">"}
        </Button>
      </div>
    </form>
  )
}

function MultisigMembers() {
  const { register, handleSubmit } = useForm()
  const { formData, updateFormData } = useWizardForm()
  const { goNext, goPrev } = useWizardNavigation()

  const onSubmit = (formDataNew) => {
    updateFormData(formDataNew)
    goNext()
  }

  const onBack = (formDataNew) => {
    updateFormData(formDataNew)
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
      <hr className="border-t border-gray-300 mt-4 mb-4" />
      <div className="flex justify-between">
        <Button variant="ghost" onClick={handleSubmit(onBack)} className="w-auto">
          {"<"} Back
        </Button>
        <Button variant="fill" type="submit" className="w-auto">
          Sign & create
        </Button>
      </div>
    </form>
  )
}

function MultisigFund() {
  const { register, handleSubmit } = useForm()
  const { formData, updateFormData } = useWizardForm()
  const { goNext, goPrev } = useWizardNavigation()

  const onSubmit = (formDataNew) => {
    updateFormData(formDataNew)
    goNext()
  }

  const onBack = (formDataNew) => {
    updateFormData(formDataNew)
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
      <hr className="border-t border-gray-300 mt-4 mb-4" />
      <div className="flex justify-between">
        <Button variant="ghost" onClick={handleSubmit(onBack)} className="w-auto">
          {"<"} Back
        </Button>
        <Button variant="fill" type="submit" className="w-auto">
          Sign & fund
        </Button>
      </div>
    </form>
  )
}

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
