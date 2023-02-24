import { createContext, toChildArray } from "preact"
import type { ComponentChildren } from "preact"
import { useContext, useEffect, useState } from "preact/hooks"

// ------ Usage of Wizard example
export default function WizardApp() {
  return (
    <Wizard>
      <ProgressBar />
      <Pages>
        <MultisigInit />
        <MultisigMembers />
        <MultisigFund />
        <MultisigSummary />
      </Pages>
      <Navigation />
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
}

const defaultWizardValues = {
  activeStep: 0,
  steps: 0,
  goNext: () => {},
  goPrev: () => {},
  setActiveStep: () => {},
  setSteps: () => {},
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

// ------ Wizard Component
function Wizard({ children }: { children: ComponentChildren }) {
  const [activeStep, setActiveStep] = useState(defaultWizardValues.activeStep)
  const [steps, setSteps] = useState(defaultWizardValues.steps)

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
    <div>
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
  return (
    <div>
      <h1 className="font-bold text-xl">Init setup</h1>
    </div>
  )
}

function MultisigMembers() {
  return (
    <div>
      <h1 className="font-bold text-xl">Members</h1>
    </div>
  )
}

function MultisigFund() {
  return (
    <div>
      <h1 className="font-bold text-xl">Fund</h1>
    </div>
  )
}

function MultisigSummary() {
  return (
    <div>
      <h1 className="font-bold text-xl">Summary</h1>
    </div>
  )
}
