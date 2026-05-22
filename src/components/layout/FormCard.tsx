import type { ReactNode } from 'react'
import { ProgressBar } from '../ui/ProgressBar'
import styles from './FormCard.module.css'

interface FormCardProps {
  children: ReactNode
  showProgress?: boolean
  progressPercent?: number
  footer?: ReactNode
}

export function FormCard({
  children,
  showProgress = false,
  progressPercent = 0,
  footer,
}: FormCardProps) {
  return (
    <>
      {showProgress ? <ProgressBar percent={progressPercent} /> : null}
    <div className={styles.card}>
      {/* {showProgress ? <ProgressBar percent={progressPercent} /> : null} */}
      <div className={styles.body}>
        <div className={styles.content}>{children}</div>
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>
    </>
  )
}
