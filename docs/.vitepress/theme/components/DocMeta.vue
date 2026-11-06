<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'
import { flatLinks } from '../../sidebar'
import { site } from '../data/site'
import RwIcon from './RwIcon.vue'

const { frontmatter, page } = useData()
const route = useRoute()

const show = computed(() => frontmatter.value.meta !== false)

const normalize = (p: string) => p.replace(/\.html$/, '').replace(/\/index$/, '/').replace(/\/$/, '') || '/'
const here = computed(() => flatLinks.find((l) => normalize(withBase(l.link)) === normalize(route.path)))

const plan = computed<string | undefined>(() => frontmatter.value.plan ?? (here.value?.pro ? 'Pro' : undefined))
const planPills = computed(() =>
  (plan.value ? String(plan.value).split(/\s*\+\s*/) : []).map((p) => ({ text: p, cls: /pro/i.test(p) ? 'pro' : 'free' }))
)
const isDraft = computed(() => frontmatter.value.status === 'draft')

const minutes = ref(0)
function measure() {
  const el = document.querySelector('.vp-doc')
  if (!el) return
  const words = (el.textContent || '').trim().split(/\s+/).length
  minutes.value = Math.max(1, Math.round(words / 220))
}
onMounted(measure)
watch(() => route.path, () => nextTick(measure))

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
      <RwIcon name="chevR" :size="14" :stroke="2" />
      <a :href="withBase(here.sectionLink)">{{ here.section }}</a>
      <RwIcon name="chevR" :size="14" :stroke="2" />
      <span aria-current="page">{{ here.text }}</span>
    </nav>

    <div class="row">
      <span v-for="p in planPills" :key="p.text" class="pill" :class="p.cls">{{ p.text }}</span>
      <span v-if="isDraft" class="pill draft">Draft</span>
      <span v-if="minutes" class="item"><RwIcon name="clock" :size="15" /> {{ minutes }} min read</span>
      <span class="item sep" aria-hidden="true">·</span>
      <span class="item">{{ frontmatter.tested_with ? `Tested with ${frontmatter.tested_with}` : `Docs for ${site.version}` }}</span>
      <div class="actions">
        <button type="button" class="act" @click="copyLink">
          <RwIcon :name="linkCopied ? 'check' : 'link'" :size="15" />
          {{ linkCopied ? 'Link copied' : 'Copy link' }}
        </button>
        <button type="button" class="act" :disabled="aiState === 'busy'" @click="copyForAI" title="Copy this page as Markdown to paste into ChatGPT, Claude or another AI assistant">
          <RwIcon :name="aiState === 'done' ? 'check' : 'spark'" :size="15" />
          {{ aiState === 'done' ? 'Copied as Markdown' : 'Copy for AI' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rw-docmeta { margin-bottom: 28px; }
.crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 14px; color: var(--vp-c-text-2); margin-bottom: 14px; }
.crumbs a { color: var(--vp-c-text-2); transition: color .15s; }
.crumbs a:hover { color: var(--vp-c-brand-1); }
.crumbs [aria-current] { color: var(--vp-c-text-1); font-weight: 600; }
.row {
  display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 12px 0;
  border-top: 1px solid var(--vp-c-divider); border-bottom: 1px solid var(--vp-c-divider); font-size: 14px; color: var(--vp-c-text-2);
}
.item { display: inline-flex; align-items: center; gap: 6px; }
.pill { font-size: 12px; font-weight: 700; padding: 3px 9px; border-radius: var(--rw-r-sm); }
.pill.free { background: var(--rw-free-bg); color: var(--rw-free-fg); }
.pill.pro { background: var(--rw-pro-bg); color: var(--rw-pro-fg); }
.pill.draft { background: var(--rw-beta-bg); color: var(--rw-beta-fg); }
.actions { margin-left: auto; display: flex; gap: 8px; }
.act {
  display: inline-flex; align-items: center; gap: 6px; height: 34px; padding: 0 12px; font-size: 14px; font-weight: 500;
  border: 1px solid var(--vp-c-divider); border-radius: var(--rw-r-chip); color: var(--vp-c-text-2); transition: background-color .15s, border-color .15s, color .15s;
}
.act:hover { background: var(--vp-c-bg-soft); border-color: var(--vp-c-border); color: var(--vp-c-text-1); }
@media (max-width: 640px) { .sep { display: none; } .actions { margin-left: 0; width: 100%; } .act { flex: 1; justify-content: center; } }
</style>
