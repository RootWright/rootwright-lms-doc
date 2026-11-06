<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, withBase } from 'vitepress'
import { flatLinks } from '../../sidebar'

const route = useRoute()
const normalize = (p: string) => p.replace(/\.html$/, '').replace(/\/$/, '') || '/'

/** Other pages in the same sidebar section as this one. */
const related = computed(() => {
  const here = flatLinks.find((l) => normalize(withBase(l.link)) === normalize(route.path))
  return here ? flatLinks.filter((l) => l.section === here.section && l.link !== here.link).slice(0, 4) : []
})
</script>

<template>
  <nav v-if="related.length" class="rw-related" aria-labelledby="rw-related-title">
    <div id="rw-related-title" class="title">Related</div>
    <a v-for="l in related" :key="l.link" :href="withBase(l.link)">{{ l.text }}<span v-if="l.pro" class="rw-pill rw-pill-pro">Pro</span></a>
  </nav>
</template>

<style scoped>
.rw-related { margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider); display: flex; flex-direction: column; gap: 2px; }
.title { font-family: var(--vp-font-family-mono); font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: .08em; color: var(--vp-c-text-2); margin-bottom: 6px; }
a { font-size: 14px; line-height: 1.4; padding: 5px 0; color: var(--vp-c-text-2); transition: color .15s; }
a:hover { color: var(--vp-c-brand-1); }
.rw-pill { margin-left: 6px; }
</style>
