const KEY = 'renate_signed_up'
const ORG_KEY = 'renate_org'

export function isSignedUp() {
  try {
    return localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

export function setSignedUp() {
  try {
    localStorage.setItem(KEY, '1')
  } catch {
    // ignore (private mode etc.)
  }
}

export function clearSignedUp() {
  try {
    localStorage.removeItem(KEY)
    localStorage.removeItem(ORG_KEY)
  } catch {
    // ignore
  }
}

export function getOrg() {
  try {
    const raw = localStorage.getItem(ORG_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function setOrg(org) {
  try {
    localStorage.setItem(ORG_KEY, JSON.stringify(org))
  } catch {
    // ignore
  }
}
