import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Button from '../components/primitives/Button'
import { setSignedUp, setOrg } from '../lib/auth'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputBase =
  'w-full rounded-lg bg-white ring-1 ring-ink-200 focus:ring-brand-500 px-4 h-11 text-[0.95rem] text-ink-900 placeholder:text-ink-400 focus:outline-none transition'
const labelBase = 'block text-sm font-medium text-ink-700 mb-1.5'
const errorText = 'text-sm text-rose-600 mt-1'

export default function SignupPage() {
  const [form, setForm] = useState({
    organisation: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.organisation.trim()) next.organisation = 'Organisation name is required.'
    if (!form.username.trim()) next.username = 'Username is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!EMAIL_RE.test(form.email.trim())) next.email = 'Enter a valid email.'
    if (!form.password) next.password = 'Password is required.'
    else if (form.password.length < 8) next.password = 'Password must be at least 8 characters.'
    if (!form.confirmPassword) next.confirmPassword = 'Please confirm your password.'
    else if (form.password !== form.confirmPassword)
      next.confirmPassword = 'Passwords do not match.'
    return next
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length === 0) {
      // TODO: replace with real signup endpoint
      setOrg({
        name: form.organisation.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        createdAt: new Date().toISOString(),
      })
      setSignedUp()
      setSubmitted(true)
      setTimeout(() => navigate('/dashboard'), 1200)
    }
  }

  return (
    <div className="relative min-h-screen bg-white text-ink-800 font-display antialiased flex flex-col overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-rose-50" />

      <motion.div
        aria-hidden
        className="absolute top-1/2 left-1/2 h-[1400px] w-[1400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'conic-gradient(from 0deg, #E9DDFB, #C5A6F2, #9156EC, #F5B8D0, #E9DDFB)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
      />

      <motion.div
        aria-hidden
        className="absolute top-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl mix-blend-screen"
        style={{
          background:
            'conic-gradient(from 180deg, transparent, #9156EC 30%, transparent 60%, #F5B8D0 80%, transparent)',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)',
        }}
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 }}
      />

      <div aria-hidden className="absolute inset-0 dot-grid-bg opacity-30" />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/40"
      />

      <header className="relative z-10 border-b border-ink-100/60 backdrop-blur-sm bg-white/60">
        <div className="mx-auto max-w-shell px-5 md:px-8 h-[76px] flex items-center">
          <Link to="/" className="flex items-center" aria-label="Renate home">
            <img src="/logo-wordmark.png" alt="Renate" className="h-9 w-auto" />
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-5 py-12 md:py-20">
        <div className="w-full max-w-md">
          {submitted ? (
            <div className="rounded-2xl bg-white ring-1 ring-ink-200 shadow-soft-1 p-8 text-center flex flex-col items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-mint-500/15 ring-1 ring-mint-500/30 flex items-center justify-center text-mint-700">
                <Check size={20} strokeWidth={3} />
              </div>
              <h1 className="text-2xl font-semibold text-ink-900">Welcome to Renate</h1>
              <p className="text-ink-600 text-[0.95rem]">
                Your account request for <span className="font-medium text-ink-900">{form.organisation}</span> has been received. We'll be in touch within 48h.
              </p>
              <Link
                to="/"
                className="text-sm font-medium text-brand-800 hover:text-brand-700 underline-offset-4 hover:underline mt-2"
              >
                Back to home
              </Link>
            </div>
          ) : (
            <div className="rounded-2xl bg-white ring-1 ring-ink-200 shadow-soft-1 p-8">
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-ink-900">Create your Renate account</h1>
                <p className="mt-1.5 text-sm text-ink-600">
                  Get your team set up with your autonomous AI recruiter.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label htmlFor="organisation" className={labelBase}>Organisation Name</label>
                  <input
                    id="organisation"
                    type="text"
                    value={form.organisation}
                    onChange={update('organisation')}
                    placeholder="Acme Inc."
                    className={inputBase}
                    autoComplete="organization"
                  />
                  {errors.organisation && <p className={errorText}>{errors.organisation}</p>}
                </div>

                <div>
                  <label htmlFor="username" className={labelBase}>Username</label>
                  <input
                    id="username"
                    type="text"
                    value={form.username}
                    onChange={update('username')}
                    placeholder="jane.doe"
                    className={inputBase}
                    autoComplete="username"
                  />
                  {errors.username && <p className={errorText}>{errors.username}</p>}
                </div>

                <div>
                  <label htmlFor="email" className={labelBase}>Email</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="you@company.com"
                    className={inputBase}
                    autoComplete="email"
                  />
                  {errors.email && <p className={errorText}>{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className={labelBase}>Password</label>
                  <input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={update('password')}
                    placeholder="At least 8 characters"
                    className={inputBase}
                    autoComplete="new-password"
                  />
                  {errors.password && <p className={errorText}>{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className={labelBase}>Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={update('confirmPassword')}
                    placeholder="Re-enter your password"
                    className={inputBase}
                    autoComplete="new-password"
                  />
                  {errors.confirmPassword && <p className={errorText}>{errors.confirmPassword}</p>}
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
                  Create account
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-ink-600">
                Already have an account?{' '}
                <Link to="/" className="font-medium text-brand-800 hover:text-brand-700">
                  Back to home
                </Link>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
