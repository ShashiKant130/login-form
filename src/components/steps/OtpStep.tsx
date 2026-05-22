import { useRef, useState } from 'react'
import { StepHeading, StepShell } from './StepNavigation'
import styles from './Steps.module.css'

interface OtpStepProps {
  otp: string
  error?: string
  onChange: (v: string) => void
}

const OTP_LENGTH = 4

export function OtpStep({ otp, error, onChange }: OtpStepProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const [resendCooldown, setResendCooldown] = useState(0)
  const digits = otp.padEnd(OTP_LENGTH, ' ').split('').slice(0, OTP_LENGTH)

  const updateOtp = (newDigits: string[]) => {
    onChange(newDigits.join('').trim())
  }

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const next = [...digits.map((d) => (d === ' ' ? '' : d))]
    next[index] = digit
    updateOtp(next)
    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index]?.trim() && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    onChange(pasted)
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1)
    inputsRef.current[focusIdx]?.focus()
  }

  const handleResend = () => {
    if (resendCooldown > 0) return
    setResendCooldown(30)
    const interval = setInterval(() => {
      setResendCooldown((c) => {
        if (c <= 1) {
          clearInterval(interval)
          return 0
        }
        return c - 1
      })
    }, 1000)
  }

  return (
    <StepShell>
      <StepHeading><strong>OTP Verification</strong></StepHeading>
      <p className={styles.otpSubText}>An OTP has been sent to your mobile number</p>
      <div className={styles.otpBlock}>
        <div
          className={styles.otpRow}
          onPaste={handlePaste}
          role="group"
          aria-label="One-time password"
        >
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputsRef.current[i] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className={`${styles.otpInput} ${error ? styles.error : ''}`}
              value={digit.trim()}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>
        {error ? (
          <p className={styles.otpError} role="alert">
            {error}
          </p>
        ) : null}
        <p className={styles.resend}>
          Did not receive OTP?{' '}
          <button
            type="button"
            className={styles.resendBtn}
            onClick={handleResend}
            disabled={resendCooldown > 0}
          >
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
          </button>
        </p>
      </div>
    </StepShell>
  )
}
