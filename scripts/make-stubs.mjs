// Creates a draft page for every sidebar link in docs/.vitepress/sidebar.ts that has no .md file yet.
// Existing pages are never touched. Run: npm run docs:stubs
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'

const src = readFileSync('docs/.vitepress/sidebar.ts', 'utf8')
const body = src.slice(src.indexOf('export const sections'), src.indexOf('const esc'))
const today = new Date().toISOString().slice(0, 10)
let made = 0

for (const block of body.split(/\n  \{\n/).slice(1)) {
  const base = block.match(/base: '([^']+)'/)?.[1]
  const section = block.match(/text: '([^']+)'/)?.[1]
  if (!base) continue
  for (const m of block.matchAll(/\{ text: '((?:[^'\\]|\\.)+)', link: '([^']+)'(, pro: true)? \}/g)) {
    const [, text, link, pro] = m
    const file = join('docs', base, link + '.md')
    if (existsSync(file)) continue
    mkdirSync(dirname(file), { recursive: true })
    const title = text.replace(/\\'/g, "'")
    writeFileSync(file, `---
title: ${title}
description: "${title} in RootWright LMS. This page is being written."
plan: ${pro ? 'Pro' : 'Free'}
status: draft
last_verified: ${today}
---

# ${title}

::: beta Being written
This page is part of the RootWright LMS ${section} docs and is being written for the 1.0 beta. Check back soon, or [ask the community](https://rootwrightlms.com) in the meantime.
:::
`)
    made++
  }
}
console.log(`Created ${made} draft page(s).`)
