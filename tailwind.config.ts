import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'gradient-start': 'hsl(192, 100%, 67%)',
        'gradient-end': 'hsl(280, 87%, 65%)',
        primary: {
          'bright-blue': 'hsl(220, 98%, 61%)',
          'check-background-start': 'hsl(192, 100%, 67%)',
          'check-background-end': 'hsl(280, 87%, 65%)'
        },
        neutral: {
          'light-100': 'hsl(0, 0%, 98%)',
          'light-200': 'hsl(236, 33%, 92%)',
          'light-300': 'hsl(233, 11%, 84%)',
          'light-400': 'hsl(236, 9%, 61%)',
          'light-500': 'hsl(235, 19%, 35%)',

          'dark-100': 'hsl(235, 21%, 11%)',
          'dark-200': 'hsl(235, 24%, 19%)',
          'dark-300': 'hsl(234, 39%, 85%)',
          'dark-400': 'hsl(236, 33%, 92%)',
          'dark-500': 'hsl(234, 11%, 52%)',
          'dark-600': 'hsl(233, 14%, 35%)',
          'dark-700': 'hsl(237, 14%, 26%)'
        }
      }
    }
  },
}