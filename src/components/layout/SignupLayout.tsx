import type { ReactNode } from 'react'
import heroIllustration from '../../assets/hero-illustration.png'
import styles from './SignupLayout.module.css'

interface SignupLayoutProps {
  children: ReactNode
}

export function SignupLayout({ children }: SignupLayoutProps) {
  return (
    <div className={styles.page}>
      {/* <div className={styles.waveBg} aria-hidden="true" /> */}
      <div className={styles.container}>
        <aside className={styles.hero}>
          <p className={styles.eyebrow}>Let&apos;s get started</p>
          <h1 className={styles.title}>Create your account</h1>
          <p className={styles.subtitle}>
            Follow the steps to create your account
          </p>
          <img
            src={heroIllustration}
            alt=""
            className={styles.heroImage}
            aria-hidden="true"
          />
        </aside>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}
