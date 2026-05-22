import { useCallback, useState } from 'react'
import type { SignupFormData } from '../types/signup'
import { initialSignupData } from '../types/signup'

export const STEPS = [
  'accountType',
  'mobile',
  'otp',
  'name',
  'password',
] as const

export type StepId = (typeof STEPS)[number]

const PROGRESS_STEPS = new Set<StepId>(['mobile', 'otp', 'name', 'password'])

const PROGRESS_PERCENT: Partial<Record<StepId, number>> = {
  mobile: 20,
  otp: 50,
  name: 75,
  password: 100,
}

export function useSignupWizard() {
  const [stepIndex, setStepIndex] = useState(0)
  const [formData, setFormData] = useState<SignupFormData>(initialSignupData)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const currentStep = STEPS[stepIndex]

  const updateField = useCallback(
    <K extends keyof SignupFormData>(key: K, value: SignupFormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  const goNext = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1))
  }, [])

  const goBack = useCallback(() => {
    setStepIndex((i) => Math.max(i - 1, 0))
  }, [])

  const showProgress = PROGRESS_STEPS.has(currentStep)
  const progressPercent = PROGRESS_PERCENT[currentStep] ?? 0

  const runWithLoading = useCallback(async (fn: () => Promise<void>) => {
    setIsLoading(true)
    try {
      await fn()
    } finally {
      setIsLoading(false)
    }
  }, [])

  const completeSignup = useCallback(async () => {
    await runWithLoading(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setShowSuccess(true)
    })
  }, [runWithLoading])

  const reset = useCallback(() => {
    setFormData(initialSignupData)
    setStepIndex(0)
    setShowSuccess(false)
  }, [])

  return {
    currentStep,
    formData,
    updateField,
    goNext,
    goBack,
    progressPercent,
    showProgress,
    showSuccess,
    isLoading,
    completeSignup,
    runWithLoading,
    reset,
  }
}
