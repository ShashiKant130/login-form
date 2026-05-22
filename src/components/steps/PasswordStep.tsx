import { useState } from 'react'
import { EyeIcon } from '../icons/Icons'
import { InputField } from '../ui/InputField'
import {
  CONFIRM_PASSWORD_MATCH_HINT,
  PASSWORD_MIN_LENGTH_MESSAGE,
} from '../../utils/validation'
import { StepHeading, StepShell } from './StepNavigation'
import styles from './Steps.module.css'

interface PasswordStepProps {
  password: string
  confirmPassword: string
  errors: { password?: string; confirmPassword?: string }
  onPasswordChange: (v: string) => void
  onConfirmChange: (v: string) => void
}

interface PasswordFieldProps {
  label: string
  placeholder: string
  value: string
  error?: string
  hint?: string
  onChange: (v: string) => void
}

function PasswordField({
  label,
  placeholder,
  value,
  error,
  hint,
  onChange,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)

  return (
    <InputField
      label={label}
      type={visible ? 'text' : 'password'}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={error}
      hint={hint}
      rightElement={
        <button
          type="button"
          className={styles.eyeBtn}
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          <EyeIcon open={visible} />
        </button>
      }
    />
  )
}

export function PasswordStep({
  password,
  confirmPassword,
  errors,
  onPasswordChange,
  onConfirmChange,
}: PasswordStepProps) {
  return (
    <StepShell>
      <StepHeading>
        <strong>Create Password for your account</strong>
      </StepHeading>
      <div className={styles.fields}>
        <PasswordField
          label="Enter new password"
          placeholder="Enter new password"
          value={password}
          error={errors.password}
          hint={!errors.password ? PASSWORD_MIN_LENGTH_MESSAGE : undefined}
          onChange={onPasswordChange}
        />
        <PasswordField
          label="Confirm password"
          placeholder="Confirm password"
          value={confirmPassword}
          error={errors.confirmPassword}
          hint={!errors.confirmPassword ? CONFIRM_PASSWORD_MATCH_HINT : undefined}
          onChange={onConfirmChange}
        />
      </div>
    </StepShell>
  )
}
