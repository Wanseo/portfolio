import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'

export default defineConfig({
  base: './',
  plugins: [{
    name: 'initial-portfolio-markup',
    transformIndexHtml(html) {
      const source = readFileSync(new URL('./src/main.ts', import.meta.url), 'utf8')
      const marker = "!.innerHTML = `"
      const start = source.indexOf(marker) + marker.length
      const end = source.indexOf('\n`', start)
      if (start < marker.length || end < start) throw new Error('Initial portfolio markup not found')
      const markup = source.slice(start, end)
        .replace("${titleSurfaceEffectsEnabled ? '' : ' title-surface-effects-off'}", ' title-surface-effects-off')
        .replace("${cornerVerseEnabled ? '' : ' hidden'}", ' hidden')
      return html.replace('<div id="app"></div>', `<div id="app">${markup}</div>`)
    },
  }],
})
