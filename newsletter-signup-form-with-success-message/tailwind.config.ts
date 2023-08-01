import type { Config } from 'tailwindcss'

export default {
  content: ["./app/**/*.{jx,ts,tsx,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        "roboto" : ["Roboto", "sans-serif"]
      }
    },
  },
  plugins: [],
} satisfies Config

