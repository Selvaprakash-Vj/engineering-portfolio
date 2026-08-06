import { existsSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.cwd()
const required = [
  'public/Selvaprakash_Vijayaraman_Resume.pdf',
  'public/MachineGuard_AI_Project_Report.pdf',
  'public/Selvaprakash_Vijayaraman_Lebenslauf.docx',
  'public/de/index.html',
  'public/de/lebenslauf/index.html',
  'public/de/projekte/machineguard-ai/index.html',
  'public/projects/threadrom/index.html',
  'public/de/projekte/threadrom/index.html',
  'public/de/projekte/finance-tracker/index.html',
  'public/404.html',
  'public/.nojekyll',
  'public/robots.txt',
  'public/sitemap.xml',
  'public/social/portfolio-preview.png',
  'public/social/threadrom-preview.png',
]

const missing = required.filter(path => !existsSync(join(root, path)))
if (missing.length) {
  console.error('\nPublic-release check failed. Missing required files:')
  missing.forEach(path => console.error(`  - ${path}`))
  console.error('\nAdd the missing files before pushing the public release.\n')
  process.exit(1)
}

const forbiddenNamePatterns = [
  /bank.*statement/i,
  /credit.*card.*statement/i,
  /transactions?\.(csv|xlsx|xls|pdf)$/i,
  /bills?[/\\]/i,
  /\.env(\.|$)/i,
  /secret/i,
  /credential/i,
  /(^|[/\\])(INSTALL_|PHASE\d|HOTFIX_).*\.md$/i,
  /\.tsbuildinfo$/i,
]

const ignored = new Set(['node_modules', 'dist', '.git'])
const suspicious = []

function walk(directory) {
  for (const name of readdirSync(directory)) {
    if (ignored.has(name)) continue
    const full = join(directory, name)
    const rel = relative(root, full)
    const stat = statSync(full)
    if (stat.isDirectory()) walk(full)
    else if (forbiddenNamePatterns.some(pattern => pattern.test(rel))) suspicious.push(rel)
  }
}

walk(root)

if (suspicious.length) {
  console.error('\nPotentially private files detected:')
  suspicious.forEach(path => console.error(`  - ${path}`))
  console.error('\nReview or remove these files before publishing.\n')
  process.exit(1)
}

console.log('\n✓ Resume and public project report are present')
console.log('✓ English and German GitHub Pages route shells are present')
console.log('✓ SEO and social-preview assets are present')
console.log('✓ No obviously private finance statements or secret files detected')
console.log('✓ Portfolio is ready for a production build\n')
