import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const routePairs = [
  ['index.html', 'public/de/index.html'],
  ['public/resume/index.html', 'public/de/lebenslauf/index.html'],
  ['public/projects/machineguard-ai/index.html', 'public/de/projekte/machineguard-ai/index.html'],
  ['public/projects/finance-tracker/index.html', 'public/de/projekte/finance-tracker/index.html'],
]

const errors = []
for (const [english, german] of routePairs) {
  if (!existsSync(join(root, english))) errors.push(`Missing English route shell: ${english}`)
  if (!existsSync(join(root, german))) errors.push(`Missing German route shell: ${german}`)
}

const sitemapPath = join(root, 'public/sitemap.xml')
const sitemap = existsSync(sitemapPath) ? readFileSync(sitemapPath, 'utf8') : ''
const expectedUrls = [
  '/engineering-portfolio/',
  '/engineering-portfolio/de/',
  '/engineering-portfolio/resume/',
  '/engineering-portfolio/de/lebenslauf/',
  '/engineering-portfolio/projects/machineguard-ai/',
  '/engineering-portfolio/de/projekte/machineguard-ai/',
  '/engineering-portfolio/projects/finance-tracker/',
  '/engineering-portfolio/de/projekte/finance-tracker/',
]
for (const url of expectedUrls) {
  if (!sitemap.includes(url)) errors.push(`Sitemap is missing: ${url}`)
}

const routing = readFileSync(join(root, 'src/routing.tsx'), 'utf8')
for (const route of [
  '/de/projekte/machineguard-ai',
  '/de/projekte/finance-tracker',
  '/de/lebenslauf',
  '/projects/machineguard-ai',
  '/projects/finance-tracker',
  '/resume',
]) {
  if (!routing.includes(route)) errors.push(`Routing configuration is missing: ${route}`)
}

const i18n = readFileSync(join(root, 'src/i18n.ts'), 'utf8')
if (!i18n.includes('en: {') || !i18n.includes('de: {')) {
  errors.push('English and German interface dictionaries were not both detected.')
}

if (errors.length) {
  console.error('\nBilingual QA failed:')
  errors.forEach(error => console.error(`  - ${error}`))
  console.error('')
  process.exit(1)
}

console.log('\n✓ English and German route shells are paired')
console.log('✓ Sitemap contains all bilingual public routes')
console.log('✓ Language-aware routing is configured')
console.log('✓ English and German interface dictionaries are present')
console.log('✓ Bilingual QA passed\n')
