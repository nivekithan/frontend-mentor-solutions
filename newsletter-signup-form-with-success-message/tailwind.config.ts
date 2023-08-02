import type { Config } from 'tailwindcss'

export default {
  content: ["./app/**/*.{jx,ts,tsx,jsx}"],
  theme: {
    screens: {
      "sm" : {max : "400px"}
    },    
    extend: {
      fontFamily: {
        "roboto" : ["Roboto", "sans-serif"]
      }
    },
  },
  plugins: [],
} satisfies Config

