import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { addPostedJob } from '../lib/postedJobs'

const inputBase =
  'w-full rounded-lg bg-white ring-1 ring-ink-200 focus:ring-brand-500 px-3.5 h-10 text-[13.5px] text-ink-900 placeholder:text-ink-400 focus:outline-none transition'
const textareaBase =
  'w-full rounded-lg bg-white ring-1 ring-ink-200 focus:ring-brand-500 px-3.5 py-2.5 text-[13.5px] text-ink-900 placeholder:text-ink-400 focus:outline-none transition resize-none'
const labelBase = 'block text-[12px] font-medium text-ink-700 mb-1'
const errorText = 'text-[11.5px] text-rose-600 mt-1'

const EMPTY = {
  title: '',
  description: '',
  experience: '',
  payRange: '',
  location: '',
}

export default function PostJobModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!open) return
    setForm(EMPTY)
    setErrors({})
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.title.trim()) next.title = 'Job title is required.'
    if (!form.description.trim()) next.description = 'Job description is required.'
    if (!form.experience.trim()) next.experience = 'Experience is required.'
    if (!form.payRange.trim()) next.payRange = 'Pay range is required.'
    if (!form.location.trim()) next.location = 'Location is required.'
    return next
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return
    const job = addPostedJob(form)
    onCreated?.(job)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
        >
          <div
            className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="post-job-title"
            className="relative z-10 w-full max-w-lg rounded-2xl bg-white ring-1 ring-ink-200 shadow-lift-2 max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            <div className="flex items-start justify-between px-5 pt-5 pb-3 border-b border-ink-100">
              <div>
                <h2 id="post-job-title" className="text-[16px] font-semibold text-ink-900">Post a job</h2>
                <p className="text-[12px] text-ink-500 mt-0.5">Share role details. It'll appear on your dashboard.</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100 hover:text-ink-800 transition"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate className="px-5 py-4 space-y-3.5">
              <div>
                <label htmlFor="pj-title" className={labelBase}>Job title</label>
                <input
                  id="pj-title"
                  type="text"
                  value={form.title}
                  onChange={update('title')}
                  placeholder="e.g. Senior Frontend Engineer"
                  className={inputBase}
                  autoFocus
                />
                {errors.title && <p className={errorText}>{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="pj-description" className={labelBase}>Job description</label>
                <textarea
                  id="pj-description"
                  rows={4}
                  value={form.description}
                  onChange={update('description')}
                  placeholder="Responsibilities, team, stack, what a great hire looks like…"
                  className={textareaBase}
                />
                {errors.description && <p className={errorText}>{errors.description}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="pj-experience" className={labelBase}>Experience</label>
                  <input
                    id="pj-experience"
                    type="text"
                    value={form.experience}
                    onChange={update('experience')}
                    placeholder="5+ years"
                    className={inputBase}
                  />
                  {errors.experience && <p className={errorText}>{errors.experience}</p>}
                </div>

                <div>
                  <label htmlFor="pj-pay" className={labelBase}>Pay range</label>
                  <input
                    id="pj-pay"
                    type="text"
                    value={form.payRange}
                    onChange={update('payRange')}
                    placeholder="$160k – $210k"
                    className={inputBase}
                  />
                  {errors.payRange && <p className={errorText}>{errors.payRange}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="pj-location" className={labelBase}>Location</label>
                <input
                  id="pj-location"
                  type="text"
                  value={form.location}
                  onChange={update('location')}
                  placeholder="Remote · US"
                  className={inputBase}
                />
                {errors.location && <p className={errorText}>{errors.location}</p>}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-9 items-center rounded-lg ring-1 ring-ink-200 bg-white px-3.5 text-[13px] font-medium text-ink-700 hover:bg-ink-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex h-9 items-center rounded-lg bg-ink-900 px-4 text-[13px] font-medium text-white hover:bg-brand-800 transition shadow-soft-1"
                >
                  Post job
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
