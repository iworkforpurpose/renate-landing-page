import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/primitives/Button'
import { setSignedUp } from '../lib/auth'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputBase =
  'w-full rounded-lg bg-white ring-1 ring-ink-200 focus:ring-brand-500 px-4 h-11 text-[0.95rem] text-ink-900 placeholder:text-ink-400 focus:outline-none transition'
const labelBase = 'block text-sm font-medium text-ink-700 mb-1.5'
const errorText = 'text-sm text-rose-600 mt-1'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!EMAIL_RE.test(form.email.trim())) next.email = 'Enter a valid email.'
    if (!form.password) next.password = 'Password is required.'
    return next
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length === 0) {
      // TODO: replace with real login endpoint
      setSignedUp()
      navigate('/dashboard')
    }
  }

  return (
    <div className="relative min-h-screen bg-white text-ink-800 font-display antialiased flex flex-col overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-rose-50" />
      <div aria-hidden className="absolute inset-0 dot-grid-bg opacity-30" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/40" />

      <header className="relative z-10 border-b border-ink-100/60 backdrop-blur-sm bg-white/60">
        <div className="mx-auto max-w-shell px-5 md:px-8 h-[76px] flex items-center">
          <Link to="/" className="flex items-center" aria-label="Renate home">
            <img src="/logo-wordmark.png" alt="Renate" className="h-9 w-auto" />
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-5 py-12 md:py-20">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white ring-1 ring-ink-200 shadow-soft-1 p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-ink-900">Log in to Renate</h1>
              <p className="mt-1.5 text-sm text-ink-600">
                Welcome back. Access your pipelines and shortlists.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
                  placeholder="Your password"
                  className={inputBase}
                  autoComplete="current-password"
                />
                {errors.password && <p className={errorText}>{errors.password}</p>}
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
                Log in
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-ink-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-brand-800 hover:text-brand-700">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
