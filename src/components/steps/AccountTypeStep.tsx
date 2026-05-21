import type { AccountType } from '../../types/signup'
import { BriefcaseIcon, CheckIcon, PersonIcon } from '../icons/Icons'
import { StepHeading } from './StepNavigation'
import styles from './Steps.module.css'

interface AccountTypeStepProps {
  value: AccountType
  onChange: (type: AccountType) => void
}

export function AccountTypeStep({ value, onChange }: AccountTypeStepProps) {
  return (
    <div className={styles.stepEnter}>
      <StepHeading>
        To join us tell us <strong>what type of account</strong> you are opening
      </StepHeading>
      <div className={styles.accountOptions} role="radiogroup" aria-label="Account type">
        <button
          type="button"
          role="radio"
          aria-checked={value === 'personal'}
          className={`${styles.accountOption} ${value === 'personal' ? styles.selected : ''}`}
          onClick={() => onChange('personal')}
        >
          <span className={styles.accountOptionLeft}>
            <PersonIcon />
            Personal
          </span>
          <span className={styles.checkCircle}>
            <CheckIcon />
          </span>
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={value === 'business'}
          className={`${styles.accountOption} ${value === 'business' ? styles.selected : ''}`}
          onClick={() => onChange('business')}
        >
          <span className={styles.accountOptionLeft}>
            <BriefcaseIcon />
            Business
          </span>
          <span className={styles.checkCircle}>
            <CheckIcon />
          </span>
        </button>
      </div>
    </div>
  )
}
