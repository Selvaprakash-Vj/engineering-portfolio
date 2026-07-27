import { existsSync, readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const obsoletePatterns = [
  /^INSTALL_.*\.md$/i,
  /^PHASE\d.*\.md$/i,
  /^HOTFIX_.*\.md$/i,
  /\.tsbuildinfo$/i,
]

const removed = []
for (const name of readdirSync(root)) {
  if (!obsoletePatterns.some(pattern => pattern.test(name))) continue
  const target = join(root, name)
  if (existsSync(target)) {
    rmSync(target, { recursive: true, force: true })
    removed.push(name)
  }
}

if (removed.length) {
  console.log('\nRemoved obsolete public-repository files:')
  removed.forEach(name => console.log(`  - ${name}`))
} else {
  console.log('\nNo obsolete phase notes or TypeScript build-info files were found.')
}
console.log('Repository cleanup complete.\n')
