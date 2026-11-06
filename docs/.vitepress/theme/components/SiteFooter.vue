<script setup lang="ts">
import { withBase } from 'vitepress'
import { site } from '../data/site'

const cols = [
  { title: 'Docs', links: [['Getting started', '/getting-started/what-is-rootwright'], ['Courses', '/courses/courses-screen'], ['Developers', '/developers/rest-api'], ['Changelog', '/changelog']] },
  { title: 'Product', links: [['rootwrightlms.com', 'https://rootwrightlms.com'], ['Join the beta', 'https://rootwrightlms.com'], ['Free and Pro', '/getting-started/free-and-pro']] },
  { title: 'Help', links: [['Troubleshooting', '/help/troubleshooting'], ['Community', site.help.community], ['Report a bug', site.help.bugs]] }
]
const href = (l: string) => (l.startsWith('http') ? l : withBase(l))
</script>

<template>
  <footer class="rw-footer">
    <div class="inner">
      <div class="brand">
        <a class="logo" :href="withBase('/')">
          <img :src="withBase('/logo.svg')" alt="" width="28" height="28" />
          <span class="rw-display">RootWright <span class="lms">LMS</span></span>
        </a>
        <p>The WordPress LMS built the slow way. <em>Measure twice. Ship once.</em></p>
      </div>
      <nav v-for="c in cols" :key="c.title" :aria-label="c.title" class="col">
        <div class="h">{{ c.title }}</div>
        <template v-for="[t, l] in c.links" :key="t">
          <a v-if="l" :href="href(l)">{{ t }}</a>
        </template>
      </nav>
    </div>
    <div class="bottom">
      <span>© {{ new Date().getFullYear() }} RootWright LMS</span>
      <span>Docs for RootWright {{ site.version }} · <a :href="withBase('/changelog')">Release notes</a></span>
    </div>
  </footer>
</template>

<style scoped>
.rw-footer { border-top: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-alt); }
.inner { max-width: 1280px; margin: 0 auto; padding: 56px 24px 28px; display: grid; grid-template-columns: minmax(0, 1.4fr) repeat(3, minmax(0, 1fr)); gap: 32px; }
.logo { display: flex; align-items: center; gap: 10px; color: var(--vp-c-text-1); font-weight: 700; font-size: 18px; }
.lms { font-weight: 500; color: var(--vp-c-text-2); }
.brand p { margin: 14px 0 0; max-width: 300px; color: var(--vp-c-text-2); font-size: 15px; }
.col { display: flex; flex-direction: column; gap: 8px; font-size: 15px; }
.h { font-weight: 700; margin-bottom: 4px; }
.col a { color: var(--vp-c-text-2); transition: color .15s; }
.col a:hover { color: var(--vp-c-brand-1); }
.bottom { max-width: 1280px; margin: 0 auto; padding: 18px 24px 32px; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; font-size: 14px; color: var(--vp-c-text-2); border-top: 1px solid var(--vp-c-divider); }
.bottom a { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
@media (min-width: 768px) { .inner, .bottom { padding-left: 48px; padding-right: 48px; } }
@media (max-width: 768px) { .inner { grid-template-columns: repeat(2, minmax(0, 1fr)); } .brand { grid-column: 1 / -1; } }
</style>
