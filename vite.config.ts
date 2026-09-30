import { defineConfig } from 'vite'

export default defineConfig({
  // Keep built asset URLs relative so the site works under GitHub Pages'
  // repository subpath (for example, /portfolio/) and on custom domains.
  base: './',
})
