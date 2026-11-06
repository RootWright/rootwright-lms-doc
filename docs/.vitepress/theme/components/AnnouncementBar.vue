<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { withBase } from 'vitepress'
import { site } from '../data/site'
import RwIcon from './RwIcon.vue'

const b = site.banner
const KEY = 'rw-banner-dismissed'
const hidden = ref(false)

onMounted(() => {
  try { hidden.value = localStorage.getItem(KEY) === b.id } catch {}
})

function dismiss() {
  hidden.value = true
  document.documentElement.classList.add('rw-no-banner')
  try { localStorage.setItem(KEY, b.id) } catch {}
}
</script>

<template>
  <div v-if="b.enabled && !hidden" class="rw-banner" role="region" aria-label="Announcement">
    <p class="rw-banner-text">
      <span class="dot" aria-hidden="true" />
      <span class="msg">{{ b.text }}</span>
      <a v-if="b.link" :href="b.link.startsWith('http') ? b.link : withBase(b.link)">{{ b.linkText }} →</a>
    </p>
    <button type="button" class="close" aria-label="Dismiss announcement" @click="dismiss">
      <RwIcon name="x" :size="16" :stroke="2" />
    </button>
  </div>
</template>

<style scoped>
.rw-banner {
  position: fixed; top: 0; left: 0; right: 0; z-index: var(--vp-z-index-layout-top);
  height: var(--vp-layout-top-height); display: flex; align-items: center; justify-content: center;
  padding: 0 48px; background: var(--vp-c-text-1); color: var(--vp-c-bg); font-size: 14px;
}
.rw-banner-text { margin: 0; display: flex; align-items: center; gap: 8px; white-space: nowrap; overflow: hidden; }
.msg { overflow: hidden; text-overflow: ellipsis; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: #4cb683; flex-shrink: 0; }
a { color: inherit; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; flex-shrink: 0; }
.close {
  position: absolute; right: 8px; top: 50%; transform: translateY(-50%); width: 32px; height: 32px;
  display: grid; place-items: center; border-radius: var(--rw-r-sm); color: inherit; opacity: .7;
}
.close:hover { opacity: 1; background: rgba(127, 127, 127, .2); }
@media (max-width: 640px) { .msg { display: none; } }
</style>
