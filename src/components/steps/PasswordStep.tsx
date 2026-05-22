import { useState } from 'react'
import { EyeIcon } from '../icons/Icons'
import { InputField } from '../ui/InputField'
import { StepHeading } from './StepNavigation'
import styles from './Steps.module.css'

interface PasswordStepProps {
  password: string
  confirmPassword: string
  errors: { password?: string; confirmPassword?: string }
  onPasswordChange: (v: string) => void
  onConfirmChange: (v: string) => void
}

export function PasswordStep({
  password,
  confirmPassword,
  errors,
  onPasswordChange,
  onConfirmChange,
}: PasswordStepProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const eyeToggle = (show: boolean, setShow: (v: boolean) => void) => (
    <button
      type="button"
      className={styles.eyeBtn}
      onClick={() => setShow(!show)}
      aria-label={show ? 'Hide password' : 'Show password'}
    >
      <EyeIcon open={show} />
    </button>
  )

  return (
    <div className={styles.stepEnter}>
      <StepHeading><strong>Create Password for your account</strong></StepHeading>
      <div className={styles.fields}>
        <InputField
          label="Enter new password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter new password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          error={errors.password}
          hint={!errors.password ? 'Must be atleast 6 characters' : undefined}
          rightElement={eyeToggle(showPassword, setShowPassword)}
        />
        <InputField
          label="Confirm password"
          type={showConfirm ? 'text' : 'password'}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => onConfirmChange(e.target.value)}
          error={errors.confirmPassword}
          hint={!errors.confirmPassword ? 'Both passwords must match' : undefined}
          rightElement={eyeToggle(showConfirm, setShowConfirm)}
        />
      </div>
    </div>
  )
}
