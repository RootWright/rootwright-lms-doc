<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData, useRoute, withBase, onContentUpdated } from 'vitepress'
import { flatLinks } from '../../sidebar'
import RwIcon from './RwIcon.vue'

const { frontmatter, page } = useData()
const route = useRoute()

const show = computed(() => frontmatter.value.meta !== false)

const normalize = (p: string) => p.replace(/\.html$/, '').replace(/\/index$/, '/').replace(/\/$/, '') || '/'
const here = computed(() => flatLinks.find((l) => normalize(withBase(l.link)) === normalize(route.path)))
const isDraft = computed(() => frontmatter.value.status === 'draft')

const updated = computed(() => {
  const raw = frontmatter.value.last_verified ?? page.value.lastUpdated
  const d = raw ? new Date(raw) : null
  return d && !isNaN(+d) ? d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''
})

/* The meta line sits under the page title, which lives in the markdown. Move it there after each render. */
const row = ref<HTMLElement>()
const minutes = ref(0)
onContentUpdated(() => {
  const doc = document.querySelector('.vp-doc')
  if (!doc) return
  minutes.value = Math.max(1, Math.round((doc.textContent || '').trim().split(/\s+/).length / 220))
  doc.querySelector('h1')?.insertAdjacentElement('afterend', row.value!)
})

const linkCopied = ref(false)
const aiState = ref<'idle' | 'busy' | 'done'>('idle')

async function copy(text: string) {
  try { await navigator.clipboard.writeText(text); return true } catch { return false }
}
async function copyLink() {
  await copy(location.href.split('#')[0])
  linkCopied.value = true
  setTimeout(() => (linkCopied.value = false), 1600)
}
async function copyForAI() {
  aiState.value = 'busy'
  let md = ''
  try {
    const path = normalize(route.path)
    const res = await fetch((path === '/' ? '/index' : path) + '.md')
    if (res.ok && !(res.headers.get('content-type') || '').includes('text/html')) md = await res.text()
  } catch {}
  if (!md) {
    const el = document.querySelector('.vp-doc') as HTMLElement | null
    md = `# ${page.value.title}\n\n${el?.innerText ?? ''}`
  }
  await copy(`Source: ${location.href.split('#')[0]}\n\n${md}`)
  aiState.value = 'done'
  setTimeout(() => (aiState.value = 'idle'), 1800)
}
</script>

<template>
  <div v-if="show" class="rw-docmeta">
    <nav v-if="here" class="crumbs" aria-label="Breadcrumb">
      <a :href="withBase('/')">Docs</a>
      <RwIcon name="chevR" :size="12" :stroke="2" />
      <a :href="withBase(here.sectionLink)">{{ here.section }}</a>
      <RwIcon name="chevR" :size="12" :stroke="2" />
      <span aria-current="page">{{ here.text }}</span>
    </nav>

    <div ref="row" class="rw-docmeta-row">
      <span class="meta">
        <span v-if="isDraft" class="draft">Draft</span>
        <span v-if="minutes">{{ minutes }} min read</span>
        <span v-if="minutes && updated" aria-hidden="true"> · </span>
        <span v-if="updated">Updated {{ updated }}</span>
      </span>
      <span class="actions">
        <button type="button" class="act" @click="copyLink">
          <RwIcon :name="linkCopied ? 'check' : 'link'" :size="14" />
          {{ linkCopied ? 'Link copied' : 'Copy link' }}
        </button>
        <button type="button" class="act" :disabled="aiState === 'busy'" title="Copy this page as Markdown to paste into ChatGPT, Claude or another AI assistant" @click="copyForAI">
          <RwIcon :name="aiState === 'done' ? 'check' : 'copy'" :size="14" />
          {{ aiState === 'done' ? 'Copied as Markdown' : 'Copy for AI' }}
        </button>
      </span>
    </div>
  </div>
</template>

<style>
/* Not scoped: the row is moved under the page title, inside .vp-doc. */
.rw-docmeta .crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 13px; color: var(--vp-c-text-3); margin-bottom: 18px; }
.rw-docmeta .crumbs a { color: var(--vp-c-text-3); transition: color .15s; }
.rw-docmeta .crumbs a:hover { color: var(--vp-c-brand-1); }
.rw-docmeta .crumbs [aria-current] { color: var(--vp-c-text-2); }
.rw-docmeta-row {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px 16px;
  margin: 14px 0 36px; font-size: 14px; color: var(--vp-c-text-3);
}
.rw-docmeta-row .draft { margin-right: 8px; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; background: var(--rw-beta-bg); color: var(--rw-beta-fg); }
.rw-docmeta-row .actions { display: flex; gap: 2px; }
.rw-docmeta-row .act {
  display: inline-flex; align-items: center; gap: 6px; height: 30px; padding: 0 8px; border-radius: 6px;
  font-size: 13px; font-weight: 500; color: var(--vp-c-text-3); transition: background-color .15s, color .15s;
}
.rw-docmeta-row .act:hover { background: var(--vp-c-bg-soft); color: var(--vp-c-brand-1); }
</style>
