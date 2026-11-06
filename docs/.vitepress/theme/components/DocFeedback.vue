<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import { site } from '../data/site'
import RwIcon from './RwIcon.vue'

const route = useRoute()
const state = ref<'ask' | 'no' | 'thanks'>('ask')
const note = ref('')
watch(() => route.path, () => { state.value = 'ask'; note.value = '' })

async function send(helpful: boolean) {
  state.value = 'thanks'
  if (!site.feedbackEndpoint) return
  try {
    await fetch(site.feedbackEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: route.path, helpful, note: note.value.trim(), version: site.version })
    })
  } catch {}
}
</script>

<template>
  <section class="rw-feedback" aria-label="Page feedback">
    <div v-if="state === 'ask'" class="ask">
      <h2 class="q rw-display">Was this page helpful?</h2>
      <button type="button" class="fb" @click="send(true)"><RwIcon name="up" :size="17" /> Yes</button>
      <button type="button" class="fb" @click="state = 'no'"><RwIcon name="down" :size="17" /> Not really</button>
    </div>

    <form v-else-if="state === 'no'" class="no" @submit.prevent="send(false)">
      <label for="rw-fb-note" class="q rw-display">Sorry about that. What was missing?</label>
      <p class="hint">Your note goes straight to the people who write these docs.</p>
      <textarea id="rw-fb-note" v-model="note" rows="3" placeholder="e.g. I couldn’t find the setting this page mentions" />
      <div class="btns">
        <button type="submit" class="send">Send feedback</button>
        <button type="button" class="cancel" @click="state = 'ask'">Cancel</button>
      </div>
    </form>

    <div v-else class="thanks" role="status">
      <span class="tick"><RwIcon name="check" :size="16" :stroke="3" /></span>
      <span><b>Thanks!</b> That helps us know what to fix and what to keep.</span>
    </div>

    <div class="links">
      <a v-if="site.help.bugs" :href="site.help.bugs" target="_blank" rel="noopener"><RwIcon name="bug" :size="15" /> Report a problem with this page</a>
      <a v-if="site.help.community" :href="site.help.community" target="_blank" rel="noopener"><RwIcon name="users" :size="15" /> Ask the community</a>
    </div>
  </section>
</template>

<style scoped>
.rw-feedback { margin: 56px 0 28px; padding: 24px; border-radius: var(--rw-r-card); background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); }
.ask { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.q { margin: 0; flex: 1; min-width: 200px; font-size: 20px; font-weight: 700; line-height: 1.3; border: 0; padding: 0; display: block; }
.fb {
  display: inline-flex; align-items: center; gap: 8px; height: 44px; padding: 0 18px; font-weight: 600; font-size: 15px;
  border: 1px solid var(--vp-c-border); border-radius: var(--rw-r-btn); background: var(--vp-c-bg); color: var(--vp-c-text-1); transition: all .15s;
}
.fb:hover { border-color: var(--rw-root); color: var(--vp-c-brand-1); }
.hint { margin: 4px 0 12px; font-size: 15px; color: var(--vp-c-text-2); }
textarea {
  width: 100%; padding: 12px 14px; border: 1px solid var(--vp-c-border); border-radius: var(--rw-r-btn);
  background: var(--vp-c-bg); color: var(--vp-c-text-1); font: inherit; font-size: 15px; resize: vertical;
}
textarea:focus { outline: none; border-color: var(--rw-root); box-shadow: 0 0 0 4px var(--rw-free-bg); }
.btns { display: flex; gap: 10px; margin-top: 12px; }
.send { height: 44px; padding: 0 18px; border-radius: var(--rw-r-btn); background: var(--vp-button-brand-bg); color: var(--vp-button-brand-text); font-weight: 600; }
.send:hover { background: var(--vp-button-brand-hover-bg); }
.cancel { height: 44px; padding: 0 16px; border-radius: var(--rw-r-btn); border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); }
.thanks { display: flex; align-items: center; gap: 12px; font-size: 17px; }
.tick { width: 32px; height: 32px; display: grid; place-items: center; border-radius: 10px 3px 3px 3px; background: var(--rw-root); color: #fff; }
.links { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--vp-c-divider); font-size: 14px; }
.links a { display: inline-flex; align-items: center; gap: 6px; color: var(--vp-c-text-2); }
.links a:hover { color: var(--vp-c-brand-1); }
</style>
