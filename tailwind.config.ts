import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/@shadcn/ui/dist/**/*.mjs"
  ],
  theme: {
    extend: {}
  },
  plugins: []
} satisfies Config;
