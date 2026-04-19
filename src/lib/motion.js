export const EASE = [0.16, 1, 0.3, 1]

export const DUR = {
  xs: 0.25,
  sm: 0.4,
  md: 0.6,
  lg: 0.9,
}

export const fadeRise = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.sm, ease: EASE },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.sm, ease: EASE } },
}

export const stagger = (delay = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: delay,
    },
  },
})

export const viewport = { once: true, amount: 0.35 }
