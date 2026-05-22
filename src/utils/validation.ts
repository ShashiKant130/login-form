export const PASSWORD_MIN_LENGTH_MESSAGE = 'Must be at least 6 characters'
export const CONFIRM_PASSWORD_MATCH_HINT = 'Both passwords must match'

export function validateName(value: string): string | undefined {
  const trimmed = value.trim()
  if (!trimmed) return 'This field is required'
  if (trimmed.length < 2) return 'Must be at least 2 characters'
  if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) return 'Only letters are allowed'
  return undefined
}

export function validateMobile(value: string): string | undefined {
  const digits = value.replace(/\D/g, '')
  if (!digits) return 'Mobile number is required'
  if (digits.length < 10) return 'Enter a valid 10-digit mobile number'
  return undefined
}

export function validateOtp(value: string): string | undefined {
  if (!value) return 'OTP is required'
  if (!/^\d{4}$/.test(value)) return 'Enter the 4-digit OTP'
  return undefined
}

export function validatePassword(value: string): string | undefined {
  if (!value) return 'Password is required'
  if (value.length < 6) return PASSWORD_MIN_LENGTH_MESSAGE
  return undefined
}

export function validateConfirmPassword(
  password: string,
  confirm: string,
): string | undefined {
  if (!confirm) return 'Please confirm your password'
  if (password !== confirm) return CONFIRM_PASSWORD_MATCH_HINT
  return undefined
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!local || !domain) return email
  const visible = local.slice(0, 2)
  const masked = '•'.repeat(Math.max(local.length - 2, 4))
  return `${visible}${masked}@${domain}`
}
