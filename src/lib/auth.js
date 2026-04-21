const KEY = 'renate_signed_up'

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
  } catch {
    // ignore
  }
}
