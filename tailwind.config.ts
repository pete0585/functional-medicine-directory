import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#0F766E',
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
          950: '#042F2E',
        },
        amber: {
          DEFAULT: '#D97706',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        cream: {
          DEFAULT: '#FAFAF8',
          50: '#FDFDFB',
          100: '#FAFAF8',
          200: '#F4F4F0',
          300: '#EAEAE4',
        },
        slate: {
          DEFAULT: '#1E293B',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(160deg, #F0FDFA 0%, #FAFAF8 50%, #FFFBEB 100%)',
        'gradient-teal': 'linear-gradient(135deg, #0F766E 0%, #134E4A 100%)',
        'gradient-card': 'linear-gradient(135deg, #F0FDFA 0%, #FAFAF8 100%)',
      },
      boxShadow: {
        soft: '0 2px 16px rgba(15,118,110,0.06)',
        card: '0 4px 24px rgba(15,118,110,0.08)',
        'card-hover': '0 8px 32px rgba(15,118,110,0.14)',
        teal: '0 4px 14px rgba(15,118,110,0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}

export default config
