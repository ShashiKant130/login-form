import { InputField } from '../ui/InputField'
import { StepHeading, StepShell } from './StepNavigation'
import styles from './Steps.module.css'

interface NameStepProps {
  firstName: string
  lastName: string
  errors: { firstName?: string; lastName?: string }
  onFirstNameChange: (v: string) => void
  onLastNameChange: (v: string) => void
}

export function NameStep({
  firstName,
  lastName,
  errors,
  onFirstNameChange,
  onLastNameChange,
}: NameStepProps) {
  return (
    <StepShell>
      <StepHeading><strong>What is your name?</strong></StepHeading>
      <div className={styles.fields}>
        <InputField
          label="First Name"
          placeholder="Oliver"
          value={firstName}
          onChange={(e) => onFirstNameChange(e.target.value)}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => onLastNameChange(e.target.value)}
          error={errors.lastName}
        />
      </div>
    </StepShell>
  )
}
