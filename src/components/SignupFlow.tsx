import { useCallback, useState } from 'react'
import { useSignupWizard } from '../hooks/useSignupWizard'
import {
  getStepErrors,
  hasStepErrors,
  type StepFieldErrors,
} from '../utils/stepValidation'
import { FormCard } from './layout/FormCard'
import { SignupLayout } from './layout/SignupLayout'
import { SuccessModal } from './SuccessModal'
import { AccountTypeStep } from './steps/AccountTypeStep'
import { MobileStep } from './steps/MobileStep'
import { NameStep } from './steps/NameStep'
import { OtpStep } from './steps/OtpStep'
import { PasswordStep } from './steps/PasswordStep'
import { StepNavigation } from './steps/StepNavigation'

export function SignupFlow() {
  const wizard = useSignupWizard()
  const [errors, setErrors] = useState<StepFieldErrors>({})

  const clearErrors = () => setErrors({})

  const validateCurrentStep = useCallback((): boolean => {
    const nextErrors = getStepErrors(wizard.currentStep, wizard.formData)
    setErrors(nextErrors)
    return !hasStepErrors(nextErrors)
  }, [wizard.currentStep, wizard.formData])

  const handleContinue = async () => {
    if (wizard.currentStep === 'accountType') {
      clearErrors()
      wizard.goNext()
      return
    }

    if (!validateCurrentStep()) return

    if (wizard.currentStep === 'mobile') {
      await wizard.runWithLoading(async () => {
        await new Promise((resolve) => setTimeout(resolve, 900))
        clearErrors()
        wizard.goNext()
      })
      return
    }

    if (wizard.currentStep === 'password') {
      await wizard.completeSignup()
      return
    }

    clearErrors()
    wizard.goNext()
  }

  const handleBack = () => {
    clearErrors()
    wizard.goBack()
  }

  const renderStep = () => {
    const { formData, updateField, currentStep } = wizard

    switch (currentStep) {
      case 'accountType':
        return (
          <AccountTypeStep
            value={formData.accountType}
            onChange={(t) => updateField('accountType', t)}
          />
        )
      case 'mobile':
        return (
          <MobileStep
            mobile={formData.mobile}
            error={errors.mobile}
            onChange={(v) => updateField('mobile', v)}
          />
        )
      case 'otp':
        return (
          <OtpStep
            otp={formData.otp}
            error={errors.otp}
            onChange={(v) => updateField('otp', v)}
          />
        )
      case 'name':
        return (
          <NameStep
            firstName={formData.firstName}
            lastName={formData.lastName}
            errors={{
              firstName: errors.firstName,
              lastName: errors.lastName,
            }}
            onFirstNameChange={(v) => updateField('firstName', v)}
            onLastNameChange={(v) => updateField('lastName', v)}
          />
        )
      case 'password':
        return (
          <PasswordStep
            password={formData.password}
            confirmPassword={formData.confirmPassword}
            errors={{
              password: errors.password,
              confirmPassword: errors.confirmPassword,
            }}
            onPasswordChange={(v) => updateField('password', v)}
            onConfirmChange={(v) => updateField('confirmPassword', v)}
          />
        )
      default:
        return null
    }
  }

  const isFirstStep = wizard.currentStep === 'accountType'

  return (
    <SignupLayout>
      <FormCard
        showProgress={wizard.showProgress}
        progressPercent={wizard.progressPercent}
        footer={
          <StepNavigation
            onBack={handleBack}
            onContinue={handleContinue}
            backDisabled={isFirstStep}
            loading={wizard.isLoading}
          />
        }
      >
        {renderStep()}
      </FormCard>
      {wizard.showSuccess ? (
        <SuccessModal
          data={wizard.formData}
          onDashboard={() => {
            wizard.reset()
            clearErrors()
          }}
        />
      ) : null}
    </SignupLayout>
  )
}
