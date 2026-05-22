import arrowDown from '../../assets/arrow-down.png'
import usaFlag from '../../assets/usa-flag.png'
import { StepHeading, StepShell } from './StepNavigation'
import styles from './Steps.module.css'

interface MobileStepProps {
  mobile: string
  error?: string
  onChange: (v: string) => void
}

export function MobileStep({ mobile, error, onChange }: MobileStepProps) {
  return (
    <StepShell>
      <StepHeading><strong>OTP Verification</strong></StepHeading>
      <div className={styles.fields}>
        <div>
          <label className={styles.mobileNumberText}>
            Mobile Number
            <span className={styles.required}>*</span>
          </label>
          <div className={styles.phoneRow}>
            <button type="button" className={styles.countryCode} aria-label="Country code +1">
              <img src={usaFlag} alt="" className={styles.countryFlag} aria-hidden="true" />
              <span className={styles.countryCodeText}>+1</span>
              <img src={arrowDown} alt="" className={styles.countryArrow} aria-hidden="true" />
            </button>
            <input
              type="tel"
              className={styles.phoneInput}
              placeholder="8343989239"
              value={mobile}
              onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, 10))}
              aria-invalid={!!error}
              aria-describedby={error ? 'mobile-error' : undefined}
            />
          </div>
          {error ? (
            <p id="mobile-error" className={styles.fieldError} role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </StepShell>
  )
}
