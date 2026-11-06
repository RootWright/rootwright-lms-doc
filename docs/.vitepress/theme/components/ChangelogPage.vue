<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { releases, type Tag } from '../data/changelog'
import { site } from '../data/site'
import SiteFooter from './SiteFooter.vue'

type Filter = 'all' | Tag | 'pro'
const filter = ref<Filter>('all')
const filters: { id: Filter; label: string; dot?: string }[] = [
  { id: 'all', label: 'All changes' },
  { id: 'New', label: 'New', dot: '#2e9865' },
  { id: 'Improved', label: 'Improved', dot: '#4ea8f7' },
  { id: 'Fixed', label: 'Fixed', dot: '#ff7d5c' },
  { id: 'Building', label: 'In progress', dot: '#ffc83d' },
  { id: 'pro', label: 'Pro only', dot: '#9c7bff' }
]
const tagLabel = (t: string) => (t === 'Building' ? 'In progress' : t)

const shown = computed(() =>
  releases.map((r) => ({
    ...r,
    items: r.items.filter((i) => filter.value === 'all' || (filter.value === 'pro' ? i.pro : i.tag === filter.value))
  }))
)
const total = computed(() => shown.value.reduce((n, r) => n + r.items.length, 0))
const slug = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const href = (l: string) => (l.startsWith('http') ? l : withBase(l))
</script>

<template>
  <div class="rw-cl">
    <section class="hero">
      <div class="wrap grid">
        <div>
          <div class="eyebrow">Changelog</div>
          <h1 class="rw-display">What’s new in RootWright</h1>
          <p>Every release, in plain words — what changed, who it’s for, and where to read more.</p>
        </div>
        <form v-if="site.newsletterAction" class="sub" :action="site.newsletterAction" method="post">
          <label for="rw-cl-email">Get release notes by email</label>
          <p class="hint">One email per release. No marketing.</p>
          <div class="sub-row">
            <input id="rw-cl-email" name="email" type="email" required placeholder="you@school.com" autocomplete="email" />
            <button type="submit">Subscribe</button>
          </div>
          <a v-if="site.rss" class="rss" :href="site.rss">or follow the RSS feed</a>
        </form>
      </div>
    </section>

    <div class="wrap filters" role="group" aria-label="Filter changes">
      <button v-for="f in filters" :key="f.id" type="button" class="flt" :class="{ on: filter === f.id }" :aria-pressed="filter === f.id" @click="filter = f.id">
        <span v-if="f.dot" class="fdot" :style="{ background: f.dot }" />{{ f.label }}
      </button>
      <span class="count" aria-live="polite">{{ total }} {{ total === 1 ? 'change' : 'changes' }}</span>
    </div>

    <div class="wrap list">
      <section v-for="r in shown" :id="slug(r.version)" :key="r.version" class="release">
        <div class="side">
          <span class="status" :class="r.status.toLowerCase()">{{ r.status === 'Building' ? 'In progress' : r.status }}</span>
          <h2 class="rw-display"><a :href="`#${slug(r.version)}`">{{ r.version }}</a></h2>
          <div class="date">{{ r.date }}</div>
          <p>{{ r.summary }}</p>
        </div>
        <div class="items">
          <div v-for="i in r.items" :key="i.title" class="item">
            <span><span class="tag" :class="i.tag.toLowerCase()">{{ tagLabel(i.tag) }}</span></span>
            <div>
              <div class="it">{{ i.title }} <span v-if="i.pro" class="pill pro">Pro</span></div>
              <div class="id">{{ i.desc }}</div>
              <a v-if="i.link" class="guide" :href="href(i.link)">Read the guide →</a>
            </div>
          </div>
          <div v-if="!r.items.length" class="empty">Nothing of this type in this release.</div>
        </div>
      </section>
    </div>

    <SiteFooter />
  </div>
</template>

<style scoped>
.wrap { max-width: 1280px; margin: 0 auto; padding-left: 24px; padding-right: 24px; }
@media (min-width: 768px) { .wrap { padding-left: 48px; padding-right: 48px; } }
.hero { background: var(--vp-c-bg-alt); border-bottom: 1px solid var(--vp-c-divider); }
.grid { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); gap: 48px; align-items: end; padding-top: 72px; padding-bottom: 56px; }
.eyebrow { font-family: var(--vp-font-family-mono); font-size: 13px; text-transform: uppercase; letter-spacing: .08em; color: var(--vp-c-brand-1); }
h1 { margin: 8px 0 14px; font-size: clamp(40px, 5vw, 60px); line-height: 1.02; font-weight: 700; }
.hero p { margin: 0; max-width: 560px; font-size: 18px; color: var(--vp-c-text-2); }
.sub { padding: 22px; border: 1px solid var(--vp-c-divider); border-radius: var(--rw-r-card); background: var(--rw-raised); box-shadow: var(--rw-sh); }
.sub label { display: block; font-weight: 700; }
.sub .hint { margin: 4px 0 12px; font-size: 14px; }
.sub-row { display: flex; gap: 8px; }
.sub input { flex: 1; min-width: 0; height: 44px; padding: 0 14px; border: 1px solid var(--vp-c-border); border-radius: var(--rw-r-btn); background: var(--vp-c-bg); font-size: 15px; }
.sub input:focus { outline: none; border-color: var(--rw-root); box-shadow: 0 0 0 4px var(--rw-free-bg); }
.sub button { height: 44px; padding: 0 18px; border-radius: var(--rw-r-btn); background: var(--vp-button-brand-bg); color: var(--vp-button-brand-text); font-weight: 600; }
.rss { display: inline-block; margin-top: 10px; font-size: 13px; color: var(--vp-c-text-2); }
.filters { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding-top: 28px; padding-bottom: 8px; }
.flt {
  display: inline-flex; align-items: center; gap: 6px; height: 40px; padding: 0 14px; border: 1px solid var(--vp-c-divider);
  border-radius: 12px 4px 4px 4px; background: var(--rw-raised); color: var(--vp-c-text-2); font-size: 14px; font-weight: 600; transition: all .15s;
}
.flt:hover { border-color: var(--vp-c-border); color: var(--vp-c-text-1); }
.flt.on { background: var(--vp-c-text-1); color: var(--vp-c-bg); border-color: var(--vp-c-text-1); }
.fdot { width: 8px; height: 8px; border-radius: 50%; }
.count { margin-left: auto; font-size: 14px; color: var(--vp-c-text-2); }
.list { padding-bottom: 96px; }
.release { display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 40px; padding: 36px 0; border-bottom: 1px solid var(--vp-c-divider); scroll-margin-top: 100px; }
.side { position: sticky; top: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 24px); align-self: start; }
.side h2 { margin: 12px 0 4px; font-size: 32px; line-height: 1.1; font-weight: 700; }
.side h2 a { color: inherit; }
.date { font-family: var(--vp-font-family-mono); font-size: 14px; color: var(--vp-c-text-2); }
.side p { margin: 12px 0 0; font-size: 15px; color: var(--vp-c-text-2); }
.status { display: inline-block; font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: var(--rw-r-sm); background: var(--vp-c-text-1); color: var(--vp-c-bg); }
.status.building { background: var(--rw-beta-bg); color: var(--rw-beta-fg); }
.status.stable { background: var(--rw-free-bg); color: var(--rw-free-fg); }
.items { display: flex; flex-direction: column; gap: 4px; }
.item { display: grid; grid-template-columns: 112px minmax(0, 1fr); gap: 16px; padding: 16px 18px; border-radius: var(--rw-r-win); transition: background-color .15s; }
.item:hover { background: var(--vp-c-bg-soft); }
.tag { display: inline-block; font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: var(--rw-r-sm); }
.tag.new { background: var(--rw-free-bg); color: var(--rw-free-fg); }
.tag.improved { background: var(--rw-note-bg); color: var(--rw-note-fg); }
.tag.fixed { background: var(--rw-danger-bg); color: var(--rw-danger-fg); }
.tag.building { background: var(--rw-beta-bg); color: var(--rw-beta-fg); }
.it { font-weight: 700; font-size: 17px; }
.id { font-size: 15px; color: var(--vp-c-text-2); line-height: 1.55; }
.pill { display: inline-block; font-size: 11px; font-weight: 700; padding: 1px 7px; border-radius: var(--rw-r-sm); vertical-align: 2px; }
.pill.pro { background: var(--rw-pro-bg); color: var(--rw-pro-fg); }
.guide { display: inline-block; margin-top: 6px; font-size: 14px; font-weight: 600; color: var(--vp-c-brand-1); }
.guide:hover { text-decoration: underline; }
.empty { padding: 22px 18px; border: 1px dashed var(--vp-c-border); border-radius: var(--rw-r-win); color: var(--vp-c-text-2); font-size: 15px; }
@media (max-width: 960px) {
  .grid, .release { grid-template-columns: minmax(0, 1fr); }
  .release { gap: 16px; }
  .side { position: static; }
}
@media (max-width: 640px) { .item { grid-template-columns: minmax(0, 1fr); gap: 6px; } .count { width: 100%; margin-left: 0; } }
</style>
