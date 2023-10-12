import daisyui from 'daisyui'
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,svelte}'],
  theme: {
    extend: {}
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['synthwave']
  }
} as Config
