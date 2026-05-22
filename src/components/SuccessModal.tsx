import { useEffect } from 'react'
import successTick from '../assets/success-tick.png'
import type { SignupFormData } from '../types/signup'
import { maskEmail } from '../utils/validation'
import { ShieldIcon } from './icons/Icons'
import { Button } from './ui/Button'
import styles from './SuccessModal.module.css'

interface SuccessModalProps {
  data: SignupFormData
  onDashboard: () => void
}

function displayEmail(data: SignupFormData): string {
  const local = data.firstName.trim().slice(0, 2).toLowerCase() || 'jo'
  return maskEmail(`${local}*****@example.com`)
}

export function SuccessModal({ data, onDashboard }: SuccessModalProps) {
  useEffect(() => {
    const scrollY = window.scrollY
    document.body.classList.add('modal-open')
    document.body.style.top = `-${scrollY}px`

    return () => {
      document.body.classList.remove('modal-open')
      document.body.style.top = ''
      window.scrollTo(0, scrollY)
    }
  }, [])

  const fullName = `${data.firstName.trim()} ${data.lastName.trim()}`.trim()
  const mobileDisplay = data.mobile

  const summary = [
    { label: 'Account Type', value: data.accountType === 'personal' ? 'Personal' : 'Business' },
    { label: 'Email', value: displayEmail(data) },
    { label: 'Name', value: fullName || '—' },
    { label: 'Mobile Number', value: mobileDisplay },
  ]

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="success-title">
      <div className={styles.modal}>
        <img
          src={successTick}
          alt=""
          className={styles.successIcon}
          width={46}
          height={46}
          aria-hidden="true"
        />
        <h2 id="success-title" className={styles.title}>
          You&apos;re all set!
        </h2>
        <p className={styles.subtitle}>
          Here&apos;s a quick summary of your account details
        </p>
        <dl className={styles.summary}>
          {summary.map((item) => (
            <div key={item.label} className={styles.summaryRow}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.security}>
          <span className={styles.shield}>
            <ShieldIcon />
          </span>
          Your account is secured with bank-grade security
        </p>
        <Button variant="primary" onClick={onDashboard} className={styles.dashboardBtn}>
          Go To Dashboard
        </Button>
      </div>
    </div>
  )
}
