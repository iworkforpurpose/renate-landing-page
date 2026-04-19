import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', md: '2rem' },
    },
    extend: {
      colors: {
        brand: {
          50:  '#F6EEFF',
          100: '#EADBFF',
          200: '#D4B9FF',
          300: '#BC94FA',
          400: '#A372F1',
          500: '#9156EC',
          600: '#7A3BD9',
          700: '#5E22B4',
          800: '#3F1487',
          900: '#2A0D5C',
        },
        ink: {
          50:  '#FAFAFB',
          100: '#F3F4F7',
          200: '#E6E7EC',
          300: '#CED1D9',
          400: '#9BA0AD',
          500: '#6B7280',
          600: '#4B5260',
          700: '#2F3340',
          800: '#1A1C25',
          900: '#0B0A10',
        },
        mint:  { 100: '#D7F5E4', 500: '#21C07A', 700: '#0E7A48' },
        amber: { 100: '#FFE9C2', 500: '#F5A524', 700: '#A36310' },
        rose:  { 100: '#FFD9DC', 500: '#E5484D', 700: '#9A1F24' },
      },
      fontFamily: {
        display: ['"Funnel Display"', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        sans:    ['"Funnel Display"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:    ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        eyebrow: ['0.78rem', { letterSpacing: '0.16em', lineHeight: '1', fontWeight: '600' }],
        lede:    ['clamp(1.05rem, 0.95rem + 0.4vw, 1.2rem)', { lineHeight: '1.6' }],
        section: ['clamp(2.2rem, 1.4rem + 3.2vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        hero:    ['clamp(2.8rem, 1.6rem + 4.5vw, 5.25rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        display: ['clamp(3.5rem, 2rem + 6vw, 7rem)', { lineHeight: '0.98', letterSpacing: '-0.04em' }],
      },
      spacing: {
        'section-y':    'clamp(6rem, 4rem + 6vw, 9rem)',
        'section-y-lg': 'clamp(8rem, 5rem + 8vw, 11rem)',
        'nav-h':        '76px',
      },
      maxWidth: {
        prose:   '68ch',
        content: '1200px',
        shell:   '1280px',
        narrow:  '960px',
      },
      boxShadow: {
        'soft-1':     '0 1px 2px rgba(20,14,40,.04), 0 4px 14px rgba(20,14,40,.04)',
        'lift-1':     '0 10px 24px -12px rgba(63,20,135,.18), 0 22px 60px -30px rgba(63,20,135,.22)',
        'lift-2':     '0 20px 48px -18px rgba(63,20,135,.22), 0 44px 120px -48px rgba(63,20,135,.28)',
        'glass':      '0 20px 60px rgba(63,20,135,.06), inset 0 1px 0 rgba(255,255,255,.6)',
        'panel-ring': '0 0 0 1px rgba(20,14,40,.06), 0 24px 48px -24px rgba(63,20,135,.18)',
        'panel-dark': '0 0 0 1px rgba(255,255,255,.06), 0 24px 56px -20px rgba(0,0,0,.5)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #3F1487 0%, #9156EC 100%)',
        'brand-soft':     'linear-gradient(180deg, #FAFAFB 0%, #F6EEFF 100%)',
      },
      keyframes: {
        'fade-rise':      { '0%': { opacity: 0, transform: 'translateY(24px)' }, '100%': { opacity: 1, transform: 'none' } },
        'shimmer':        { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        'gradient-drift': { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        'pulse-amber':    { '0%,100%': { boxShadow: '0 0 0 0 rgba(245,165,36,.35)' }, '50%': { boxShadow: '0 0 0 10px rgba(245,165,36,0)' } },
        'wave':           { '0%,100%': { transform: 'scaleY(.35)' }, '50%': { transform: 'scaleY(1)' } },
      },
      animation: {
        'fade-rise':      'fade-rise .6s cubic-bezier(.16,1,.3,1) both',
        'shimmer':        'shimmer 2.4s linear infinite',
        'gradient-drift': 'gradient-drift 14s ease-in-out infinite',
        'pulse-amber':    'pulse-amber 1.8s ease-in-out infinite',
        'wave':           'wave 1.2s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(.16,1,.3,1)',
      },
    },
  },
  plugins: [typography, forms],
}
