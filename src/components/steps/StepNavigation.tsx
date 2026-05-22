import type { ReactNode } from 'react'
import { Button } from '../ui/Button'
import styles from './StepNavigation.module.css'
import stepStyles from './Steps.module.css'

interface StepNavigationProps {
  onBack?: () => void
  onContinue: () => void
  loading?: boolean
  backDisabled?: boolean
}

export function StepNavigation({
  onBack,
  onContinue,
  loading = false,
  backDisabled = false,
}: StepNavigationProps) {
  return (
    <div className={styles.nav}>
      <Button
        variant="outline"
        onClick={onBack}
        disabled={backDisabled || !onBack}
        className={styles.backBtn}
      >
        Back
      </Button>
      <Button
        variant="primary"
        onClick={onContinue}
        loading={loading}
        className={styles.continueBtn}
      >
        Continue
      </Button>
    </div>
  )
}

export function StepHeading({ children }: { children: ReactNode }) {
  return <h2 className={stepStyles.heading}>{children}</h2>
}

export function StepShell({ children }: { children: ReactNode }) {
  return <div className={stepStyles.stepEnter}>{children}</div>
}
