import { Button } from '../ui/Button'
import styles from './StepNavigation.module.css'
import stepStyles from './Steps.module.css'

interface StepNavigationProps {
  onBack?: () => void
  onContinue: () => void
  continueLabel?: string
  loading?: boolean
  disableContinue?: boolean
  showBack?: boolean
  backDisabled?: boolean
}

export function StepNavigation({
  onBack,
  onContinue,
  continueLabel = 'Continue',
  loading = false,
  disableContinue = false,
  showBack = true,
  backDisabled = false,
}: StepNavigationProps) {
  return (
    <div
      className={styles.nav}
    >
      {showBack ? (
        <Button
          variant="outline"
          onClick={onBack}
          disabled={backDisabled || !onBack}
          className={styles.backBtn}
        >
          Back
        </Button>
      ) : (
        <span className={styles.backPlaceholder} aria-hidden="true" />
      )}
      <Button
        variant="primary"
        onClick={onContinue}
        loading={loading}
        disabled={disableContinue}
        className={styles.continueBtn}
      >
        {continueLabel}
      </Button>
    </div>
  )
}

export function StepHeading({ children }: { children: React.ReactNode }) {
  return <h2 className={stepStyles.heading}>{children}</h2>
}
