<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import { openSearch } from '../search'
import { synonyms } from '../../synonyms'
import RwIcon from './RwIcon.vue'

const q = ref('')
const empty = ref(false)
const clean = (s: string) => s.replace(/\bPro\b/g, '').trim().toLowerCase()
const pathOf = (href: string) => href.replace(/\.html$/, '').replace(/\/$/, '')

function apply() {
  const root = document.querySelector('.VPSidebar') as HTMLElement | null
  if (!root) return
  const term = q.value.trim().toLowerCase()
  const words = term.split(/\s+/).filter(Boolean)
  const matches = (s: string) => words.every((w) => s.includes(w))
  if (term) root.setAttribute('data-rw-filter', '')
  else root.removeAttribute('data-rw-filter')
  let anyShown = false
  root.querySelectorAll<HTMLElement>('.VPSidebarItem.level-0').forEach((group) => {
    const title = clean(group.querySelector(':scope > .item')?.textContent || '')
    const groupHit = !!term && matches(title)
    let shown = 0
    group.querySelectorAll<HTMLElement>('.VPSidebarItem.level-1').forEach((item) => {
      const syn = synonyms[pathOf(item.querySelector('a')?.getAttribute('href') || '')] || ''
      const hit = !term || groupHit || matches(clean(item.textContent || '') + ' ' + syn)
      item.hidden = !hit
      if (hit) shown++
    })
    const wrapper = (group.closest('.group') as HTMLElement) || group
    wrapper.hidden = shown === 0
    if (shown) anyShown = true
  })
  empty.value = !!term && !anyShown
}

const route = useRoute()
watch(q, () => nextTick(apply))
watch(() => route.path, () => nextTick(apply))
onMounted(apply)
</script>

<template>
  <div class="rw-sbfilter">
    <label class="box">
      <span class="sr-only">Filter the menu</span>
      <RwIcon name="search" :size="15" :stroke="2" />
      <input v-model="q" type="text" placeholder="Filter this menu" autocomplete="off" @keydown.esc="q = ''" />
      <button v-if="q" type="button" class="clear" aria-label="Clear filter" @click="q = ''"><RwIcon name="x" :size="14" :stroke="2" /></button>
    </label>
    <p v-if="empty" class="none">
      Nothing in the menu matches.
      <button type="button" @click="openSearch(q)">Search all docs →</button>
    </p>
  </div>
</template>

<style scoped>
.rw-sbfilter { padding: 20px 0 8px; }
.box {
  display: flex; align-items: center; gap: 8px; height: 40px; padding: 0 10px 0 12px; color: var(--vp-c-text-3);
  border: 1px solid var(--vp-c-divider); border-radius: 12px 4px 4px 4px; background: var(--vp-c-bg-alt); transition: border-color .15s, box-shadow .15s;
}
.box:focus-within { border-color: var(--rw-root); box-shadow: 0 0 0 4px var(--rw-free-bg); }
input { flex: 1; min-width: 0; border: 0; outline: 0; background: transparent; font-size: 14px; color: var(--vp-c-text-1); }
input::placeholder { color: var(--vp-c-text-3); }
.clear { width: 24px; height: 24px; display: grid; place-items: center; border-radius: 6px; color: var(--vp-c-text-2); }
.clear:hover { background: var(--vp-c-default-soft); }
.none { margin: 12px 4px 0; font-size: 14px; color: var(--vp-c-text-2); }
.none button { color: var(--vp-c-brand-1); font-weight: 600; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
</style>

<style>
.VPSidebar[data-rw-filter] .VPSidebarItem.collapsed > .items { display: block !important; }
.VPSidebar[data-rw-filter] .VPSidebarItem .caret { visibility: hidden; }
</style>
