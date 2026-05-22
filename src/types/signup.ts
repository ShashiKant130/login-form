export type AccountType = 'personal' | 'business'

export interface SignupFormData {
  accountType: AccountType
  firstName: string
  lastName: string
  mobile: string
  otp: string
  password: string
  confirmPassword: string
}

export const initialSignupData: SignupFormData = {
  accountType: 'personal',
  firstName: '',
  lastName: '',
  mobile: '',
  otp: '',
  password: '',
  confirmPassword: '',
}
