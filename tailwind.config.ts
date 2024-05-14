import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      spacing: {
        8: '0.5rem',
        12: '0.75rem',
        16: '1rem',
        24: '1.5rem',
        32: '2rem',
        40: '2.5rem',
        48: '3rem',
        56: '3.5rem',
        64: '4rem',
        72: '4.5rem',
        80: '5rem',
        88: '5.5rem',
        96: '6rem',
        104: '6.5rem',
        112: '7rem',
        120: '7.5rem',
        128: '8rem',
        200: '12.5rem',
        256: '16rem'
      },
      fontSize: {
        m: ['0.8125rem', '1.25rem']
      },
      colors: {
        brand: {
          50: '#FBFBFF',
          100: '#f2f2ff',
          200: '#e5e6fe',
          300: '#bebefd',
          400: '#898af8',
          500: '#5a5cec',
          600: '#4b3ed5',
          700: '#3a30a6',
          800: '#282471',
          900: '#1b1849'
        },
        neutral: {
          50: '#FAFBFF',
          100: '#F0F2FA',
          150: '#E3E7F2',
          200: '#D0D5E7',
          250: '#BCC2DB',
          300: '#A0A9CA',
          400: '#808CB6',
          500: '#64709C',
          600: '#4D5679',
          700: '#3A415D',
          800: '#2C3148',
          850: '#212538',
          900: '#191C2C'
        },
        green: {
          50: '#F2FAF7',
          100: '#C3E8D8',
          200: '#98E1C5',
          500: '#32C48D',
          700: '#04543F'
        },
        red: {
          50: '#FDF2F2',
          100: '#FDD9D9',
          200: '#F19E9E',
          500: '#E53E3E',
          700: '#9A1C1C'
        },
        yellow: {
          50: '#FFFBEB',
          100: '#F7E3B5',
          200: '#F0CF83',
          500: '#E3A008',
          700: '#8E4B10'
        },
        blue: {
          50: '#EBF5FF',
          100: '#D6E5FE',
          500: '#76A9FA',
          700: '#1A56DB'
        },
        royalBlue: {
          500: '#6246EA'
        },
        ceruleanBlue: {
          100: '#EBF8FF',
          700: '#2B6CB0'
        },
        rose: {
          100: '#FFEFF4',
          700: '#F5487F'
        },
        pink: {
          100: '#FFF5F7',
          700: '#B83280'
        },
        purple: {
          100: '#FAF5FF',
          700: '#6B46C1'
        },
        seaGreen: {
          100: '#EAFDEF',
          700: '#276749'
        },
        persianRed: {
          100: '#FFF5F5',
          700: '#C53030'
        },
        orange: {
          50: '#FFFAF0',
          100: '#F8DDC4',
          500: '#C05621',
          700: '#8B3F18'
        },
        olive: {
          100: '#F2F9EC',
          700: '#486C2B'
        },
        teal: {
          100: '#E6FFFA',
          700: '#2C7A7B'
        },
        tan: {
          100: '#FFFFEB',
          700: '#975A16'
        },
        brown: {
          100: '#FAF3F3',
          700: '#A05D31'
        },
        indigo: {
          100: '#EBF4FF',
          700: '#4C51BF'
        }
      }
    }
  },
  important: true,
  darkMode: 'class'
};
export default config;
