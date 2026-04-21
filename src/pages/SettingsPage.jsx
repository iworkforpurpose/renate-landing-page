import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Mail, User, Calendar, Check } from 'lucide-react'
import Button from '../components/primitives/Button'
import { getOrg, setOrg } from '../lib/auth'

const inputBase =
  'w-full rounded-lg bg-white ring-1 ring-ink-200 focus:ring-brand-500 px-4 h-11 text-[14px] text-ink-900 placeholder:text-ink-400 focus:outline-none transition'
const labelBase = 'block text-[12px] font-medium text-ink-700 mb-1.5'

const DEFAULT_FORM = {
  name: '',
  username: '',
  email: '',
  website: '',
  industry: '',
  size: '',
  location: '',
  about: '',
}

function formatDate(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return '—'
  }
}

export default function SettingsPage() {
  const [form, setForm] = useState(DEFAULT_FORM)
  const [createdAt, setCreatedAt] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const org = getOrg()
    if (org) {
      setForm({ ...DEFAULT_FORM, ...org })
      setCreatedAt(org.createdAt || null)
    }
  }, [])

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (saved) setSaved(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setOrg({ ...form, createdAt: createdAt || new Date().toISOString() })
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  const initial = (form.name || '?').trim().charAt(0).toUpperCase()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="min-h-screen bg-ink-50/40"
    >
      <div className="mx-auto max-w-content px-5 md:px-8 pt-10 md:pt-14 pb-20">
        <div className="flex flex-col gap-2 mb-8">
          <div className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-800" />
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-brand-700">Settings</span>
          </div>
          <h1 className="text-[clamp(1.8rem,1.2rem+1.6vw,2.4rem)] font-semibold text-ink-900 leading-tight">
            Organisation profile
          </h1>
          <p className="text-[14px] text-ink-600">Update how your company shows up across Renate.</p>
        </div>

        {/* Identity card */}
        <div className="rounded-2xl bg-white ring-1 ring-ink-200 shadow-soft-1 p-6 md:p-7 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl bg-brand-800 text-white text-2xl font-semibold">
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[20px] font-semibold text-ink-900 truncate">
                {form.name || 'Your organisation'}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-ink-600">
                {form.email && (
                  <span className="inline-flex items-center gap-1.5">
                    <Mail size={13} className="text-ink-400" /> {form.email}
                  </span>
                )}
                {form.username && (
                  <span className="inline-flex items-center gap-1.5">
                    <User size={13} className="text-ink-400" /> {form.username}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={13} className="text-ink-400" /> Joined {formatDate(createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Editable form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white ring-1 ring-ink-200 shadow-soft-1 p-6 md:p-7"
        >
          <div className="flex items-center gap-2 mb-5">
            <Building2 size={15} className="text-brand-700" />
            <h2 className="text-[14px] font-semibold text-ink-900">Company information</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="name" className={labelBase}>Organisation name</label>
              <input id="name" type="text" value={form.name} onChange={update('name')} className={inputBase} />
            </div>

            <div>
              <label htmlFor="username" className={labelBase}>Admin username</label>
              <input id="username" type="text" value={form.username} onChange={update('username')} className={inputBase} />
            </div>

            <div>
              <label htmlFor="email" className={labelBase}>Contact email</label>
              <input id="email" type="email" value={form.email} onChange={update('email')} className={inputBase} />
            </div>

            <div>
              <label htmlFor="website" className={labelBase}>Website</label>
              <input id="website" type="text" value={form.website} onChange={update('website')} placeholder="https://acme.com" className={inputBase} />
            </div>

            <div>
              <label htmlFor="industry" className={labelBase}>Industry</label>
              <input id="industry" type="text" value={form.industry} onChange={update('industry')} placeholder="e.g. Fintech" className={inputBase} />
            </div>

            <div>
              <label htmlFor="size" className={labelBase}>Company size</label>
              <input id="size" type="text" value={form.size} onChange={update('size')} placeholder="e.g. 50–200" className={inputBase} />
            </div>

            <div>
              <label htmlFor="location" className={labelBase}>Headquarters</label>
              <input id="location" type="text" value={form.location} onChange={update('location')} placeholder="e.g. San Francisco, CA" className={inputBase} />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="about" className={labelBase}>About</label>
              <textarea
                id="about"
                rows={4}
                value={form.about}
                onChange={update('about')}
                placeholder="What does your company do?"
                className="w-full rounded-lg bg-white ring-1 ring-ink-200 focus:ring-brand-500 px-4 py-3 text-[14px] text-ink-900 placeholder:text-ink-400 focus:outline-none transition resize-none"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-[12px] text-ink-500">
              {saved ? (
                <span className="inline-flex items-center gap-1.5 text-mint-700">
                  <Check size={13} strokeWidth={3} /> Saved
                </span>
              ) : (
                'Changes are saved locally for this browser.'
              )}
            </div>
            <Button type="submit" variant="primary" size="md">
              Save changes
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
