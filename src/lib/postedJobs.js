import { useEffect, useState } from 'react'

const KEY = 'renate_posted_jobs'
const EVT = 'renate:posted-jobs'

function read() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function write(jobs) {
  try {
    localStorage.setItem(KEY, JSON.stringify(jobs))
    window.dispatchEvent(new Event(EVT))
  } catch {
    // ignore
  }
}

function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'role'
}

function uniqueSlug(base, existing) {
  const taken = new Set(existing.map((j) => j.slug))
  if (!taken.has(base)) return base
  let i = 2
  while (taken.has(`${base}-${i}`)) i += 1
  return `${base}-${i}`
}

function relativePosted(date) {
  const diffMs = Date.now() - new Date(date).getTime()
  const mins = Math.round(diffMs / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? '' : 's'} ago`
  const days = Math.round(hrs / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

export function addPostedJob({ title, description, experience, payRange, location }) {
  const current = read()
  const base = slugify(title)
  const slug = uniqueSlug(base, current)
  const job = {
    id: slug,
    slug,
    title: title.trim(),
    department: 'New',
    location: location.trim(),
    type: 'Full-time',
    postedAtIso: new Date().toISOString(),
    accent: 'brand',
    icon: 'briefcase',
    summary: description.trim(),
    experience: experience.trim(),
    payRange: payRange.trim(),
    stats: { sourced: 0, qualified: 0, interviewed: 0, shortlisted: 0 },
    candidates: [],
    userPosted: true,
  }
  write([job, ...current])
  return job
}

function hydrate(job) {
  return { ...job, postedAt: job.postedAtIso ? relativePosted(job.postedAtIso) : 'just now' }
}

export function usePostedJobs() {
  const [jobs, setJobs] = useState(() => read().map(hydrate))

  useEffect(() => {
    const sync = () => setJobs(read().map(hydrate))
    window.addEventListener(EVT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  return jobs
}
