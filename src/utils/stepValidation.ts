import type { StepId } from '../hooks/useSignupWizard'
import type { SignupFormData } from '../types/signup'
import {
  validateConfirmPassword,
  validateMobile,
  validateName,
  validateOtp,
  validatePassword,
} from './validation'

export type StepFieldErrors = Record<string, string | undefined>

export function getStepErrors(step: StepId, formData: SignupFormData): StepFieldErrors {
  switch (step) {
    case 'mobile':
      return { mobile: validateMobile(formData.mobile) }
    case 'otp':
      return { otp: validateOtp(formData.otp) }
    case 'name':
      return {
        firstName: validateName(formData.firstName),
        lastName: validateName(formData.lastName),
      }
    case 'password':
      return {
        password: validatePassword(formData.password),
        confirmPassword: validateConfirmPassword(
          formData.password,
          formData.confirmPassword,
        ),
      }
    default:
      return {}
  }
}

export function hasStepErrors(errors: StepFieldErrors): boolean {
  return Object.values(errors).some(Boolean)
}
