<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { withBase } from 'vitepress'
import { hero, crumbs, topicDesc, popular } from '../data/home'
import { sections, flatLinks } from '../../sidebar'
import { site } from '../data/site'
import { openSearch } from '../search'
import RwIcon from './RwIcon.vue'
import SiteFooter from './SiteFooter.vue'

const href = (l: string) => (l.startsWith('http') ? l : withBase(l))

/* Topic cards: one per sidebar section, so a new page shows up here without editing the home page */
const topics = sections.map((s) => ({
  icon: s.icon, title: s.text, desc: topicDesc[s.base] ?? '', count: s.items.length,
  links: s.items.map((i) => ({ text: i.text, link: s.base + i.link }))
}))

/* Inline filter, like the Library page. Empty query shows the first 4 links per card. */
const q = ref('')
const query = computed(() => q.value.trim().toLowerCase())
const shown = computed(() =>
  topics
    .map((t) => {
      const titleHit = !!query.value && t.title.toLowerCase().includes(query.value)
      const links = !query.value ? t.links.slice(0, 4)
        : titleHit ? t.links
        : t.links.filter((l) => l.text.toLowerCase().includes(query.value))
      return { ...t, links }
    })
    .filter((t) => t.links.length)
)
function parts(text: string) {
  const i = query.value ? text.toLowerCase().indexOf(query.value) : -1
  return i < 0 ? [text, '', ''] : [text.slice(0, i), text.slice(i, i + query.value.length), text.slice(i + query.value.length)]
}

const popularRows = popular.map((p) => ({ ...p, section: flatLinks.find((l) => l.link === p.link)?.section ?? '' }))

const input = ref<HTMLInputElement>()
function onKey(e: KeyboardEvent) {
  const t = e.target as HTMLElement
  if (e.key === '/' && !/INPUT|TEXTAREA/.test(t.tagName) && !t.isContentEditable) { e.preventDefault(); input.value?.focus() }
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="rw-home">
    <section class="page-hero">
      <div class="wrap">
        <nav class="crumbs" aria-label="Breadcrumb">
          <template v-for="c in crumbs" :key="c.text">
            <a v-if="c.link" :href="c.link">{{ c.text }}</a><span v-else>{{ c.text }}</span>
            <RwIcon name="chevR" :size="12" :stroke="2" />
          </template>
          <span aria-current="page">Docs</span>
        </nav>
        <h1>{{ hero.titleBefore }} <span class="accent">{{ hero.titleAccent }}</span></h1>
        <p class="lead">{{ hero.lead }}</p>
        <div class="search">
          <label for="rw-doc-q" class="sr">Search the docs</label>
          <RwIcon name="search" :size="20" />
          <input id="rw-doc-q" ref="input" v-model="q" type="search" :placeholder="hero.searchHint" autocomplete="off" @keydown.enter="openSearch(q)" />
          <kbd>/</kbd>
        </div>
      </div>
    </section>

    <section class="band first">
      <div class="wrap">
        <div class="dgrid">
          <div v-for="t in shown" :key="t.title" class="dcard">
            <div class="top"><span class="ico-s"><RwIcon :name="t.icon" :size="18" /></span><span class="count">{{ t.count }} {{ t.count === 1 ? 'guide' : 'guides' }}</span></div>
            <h3><a :href="href(t.links[0].link)">{{ t.title }}</a></h3>
            <p>{{ t.desc }}</p>
            <ul>
              <li v-for="l in t.links" :key="l.link">
                <a :href="href(l.link)">
                  <span>{{ parts(l.text)[0] }}<mark v-if="parts(l.text)[1]">{{ parts(l.text)[1] }}</mark>{{ parts(l.text)[2] }}</span>                  <RwIcon name="arrowR" :size="14" :stroke="2" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="query" class="more-search">
          <p v-if="!shown.length">No guide titles match “{{ q.trim() }}”.</p>
          <button type="button" class="link" @click="openSearch(q)">Search the full text of every page for “{{ q.trim() }}” <RwIcon name="arrowR" :size="15" :stroke="2" /></button>
        </div>
      </div>
    </section>

    <section class="band soft">
      <div class="wrap">
        <div class="sec-head"><span class="eyebrow">Popular</span><h2>Most-read guides</h2></div>
        <div class="popular">
          <a v-for="p in popularRows" :key="p.link" :href="href(p.link)">
            <span class="ico-s"><RwIcon name="file" :size="18" /></span>{{ p.text }}<small>{{ p.section }}</small>
          </a>
        </div>
      </div>
    </section>

    <section class="band">
      <div class="wrap help-row">
        <div v-if="site.help.community" class="help-card"><span class="ico-s"><RwIcon name="users" :size="18" /></span><h3>Community forum</h3><p>Ask questions and share tips with other course creators.</p><a class="link" :href="site.help.community">Join the forum <RwIcon name="arrowR" :size="15" :stroke="2" /></a></div>
        <div v-if="site.help.bugs" class="help-card"><span class="ico-s"><RwIcon name="bug" :size="18" /></span><h3>Report a bug</h3><p>We’re in beta. Include your version and the steps to reproduce.</p><a class="link" :href="site.help.bugs">Report a bug <RwIcon name="arrowR" :size="15" :stroke="2" /></a></div>
        <div v-if="site.help.support" class="help-card dk"><span class="ico-s"><RwIcon name="buoy" :size="18" /></span><h3>Talk to the team</h3><p>Still stuck? Send us a message and a person will reply.</p><a class="link" :href="site.help.support">Contact support <RwIcon name="arrowR" :size="15" :stroke="2" /></a></div>
      </div>
    </section>

    <SiteFooter />
  </div>
</template>

<style scoped>
/* Library look from the RootWright marketing site: Manrope titles, DM Sans text, mint and deep-green surfaces. */
.rw-home {
  --green: #1e765b; --green-2: #178164; --chip: #e9f8f2; --mint: #96ffd4; --mint-bg: #f5fffb; --mint-line: #dbfbee;
  --ink: #18162b; --body: #6f6b7e; --muted: #85808f; --line: #e7e4ee; --line-2: #f1f0f4;
  --paper: #fafffd; --bg: #ffffff; --deep: #09251f; --deep-sub: #aba7b9; --hl: #fff1b8; --shadow: rgba(9, 37, 31, .25);
  --glow: rgba(150, 255, 212, .22);
  --f-title: 'Manrope', var(--rw-font-display);
  --f-body: 'DM Sans', var(--vp-font-family-base);
  font-family: var(--f-body); color: var(--ink); background: var(--bg);
}
:global(.dark .rw-home) {
  --green: #5fd3a5; --green-2: #7fe0b8; --chip: #143a2f; --mint-bg: #0f231d; --mint-line: #1f4a3b;
  --ink: #eef5f1; --body: #a7b3ad; --muted: #8b968f; --line: #22352e; --line-2: #1b2c26;
  --paper: #0e1a16; --bg: var(--vp-c-bg); --deep: #06140f; --deep-sub: #9fb0a8; --hl: #5a4a12; --shadow: rgba(0, 0, 0, .5);
  --glow: rgba(150, 255, 212, .07);
}
.wrap { max-width: 1208px; margin: 0 auto; padding: 0 24px; }
a { color: inherit; text-decoration: none; }
h1, h2, h3 { font-family: var(--f-title); font-weight: 400; letter-spacing: -.035em; text-wrap: balance; color: var(--ink); border: 0; margin: 0; padding: 0; }
.sr { position: absolute; left: -9999px; }
.accent { color: var(--green); }
.eyebrow { font: 700 12px/1 var(--f-body); letter-spacing: .14em; text-transform: uppercase; color: var(--green); }
.ico-s { width: 36px; height: 36px; border-radius: 8px; background: var(--chip); display: grid; place-items: center; color: var(--green); flex: none; }
.link { display: inline-flex; align-items: center; gap: 7px; font: 700 14px/1.4 var(--f-body); color: var(--green); }
.link :deep(svg) { transition: transform .15s; }
.link:hover :deep(svg) { transform: translateX(3px); }

/* hero */
.page-hero { background: linear-gradient(180deg, var(--paper) 0%, var(--bg) 100%); padding: 72px 0 64px; position: relative; overflow: hidden; border-bottom: 1px solid var(--line-2); text-align: center; }
.page-hero::before { content: ""; position: absolute; left: 50%; top: -80px; width: 900px; max-width: 100%; height: 460px; transform: translateX(-50%); background: radial-gradient(closest-side, var(--glow), transparent); pointer-events: none; }
.page-hero .wrap { position: relative; }
.crumbs { display: flex; gap: 8px; align-items: center; justify-content: center; flex-wrap: wrap; font: 500 12px var(--f-body); color: var(--muted); }
.crumbs a:hover { color: var(--green); }
.page-hero h1 { font-size: 56px; line-height: 1.1; margin: 16px auto 0; max-width: 860px; }
.lead { font-size: 18px; line-height: 1.6; color: var(--body); max-width: 640px; margin: 20px auto 0; }
.search { position: relative; max-width: 560px; margin: 32px auto 0; }
.search > :deep(svg) { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--muted); }
.search input { width: 100%; height: 56px; border: 1px solid var(--line); border-radius: 12px; padding: 0 48px; font: 400 16px var(--f-body); color: var(--ink); background: var(--bg); box-shadow: 0 10px 30px -18px var(--shadow); }
.search input:focus { outline: 2px solid var(--green); outline-offset: 1px; border-color: transparent; }
.search kbd { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); font: 600 12px var(--f-body); color: var(--muted); border: 1px solid var(--line); border-radius: 4px; padding: 3px 6px; }

/* bands */
.band { padding: 96px 0; }
.band.first { padding-top: 64px; }
.band.soft { background: var(--paper); }
.sec-head { margin-bottom: 40px; }
.sec-head h2 { font-size: 48px; line-height: 1.15; margin-top: 14px; }

/* topic cards */
.dgrid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; }
.dcard { background: var(--bg); border: 1px solid var(--line); border-radius: 16px; padding: 24px; display: flex; flex-direction: column; gap: 12px; }
.dcard .top { display: flex; justify-content: space-between; align-items: center; }
.count { font: 500 12px var(--f-body); color: var(--muted); }
.dcard h3 { font-size: 24px; line-height: 1.3; margin-top: 8px; }
.dcard h3 a:hover { color: var(--green); }
.dcard > p { font-size: 14px; line-height: 1.6; color: var(--body); margin: 0; }
.dcard ul { list-style: none; margin: 4px 0 0; padding: 0; border-top: 1px solid var(--line-2); }
.dcard li { margin: 0; }
.dcard li a { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--body); padding: 10px 0; border-bottom: 1px dashed var(--line); transition: color .15s; }
.dcard li a > span:first-child { flex: 1; }
.dcard li:last-child a { border-bottom: 0; }
.dcard li a:hover { color: var(--green); }
.dcard li a :deep(svg) { color: var(--muted); flex: none; }
.dcard mark { background: var(--hl); color: inherit; border-radius: 2px; }
.more-search { text-align: center; margin-top: 32px; font-size: 14px; color: var(--muted); display: flex; flex-direction: column; gap: 10px; align-items: center; }

/* popular */
.popular { display: grid; grid-template-columns: 1fr 1fr; gap: 0 40px; }
.popular a { display: flex; align-items: center; gap: 14px; padding: 18px 0; border-bottom: 1px solid var(--line-2); font: 500 16px var(--f-body); color: var(--ink); }
.popular a:hover { color: var(--green); }
.popular small { margin-left: auto; font-size: 12px; color: var(--muted); white-space: nowrap; }

/* help */
.help-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.help-card { border-radius: 16px; padding: 28px; display: flex; flex-direction: column; gap: 10px; background: var(--mint-bg); border: 1px solid var(--mint-line); }
.help-card h3 { font-size: 24px; line-height: 1.3; }
.help-card p { font-size: 14px; line-height: 1.6; color: var(--body); flex: 1; margin: 0; }
.help-card.dk { background: var(--deep); border-color: var(--deep); }
.help-card.dk h3 { color: #fff; }
.help-card.dk p { color: var(--deep-sub); }
.help-card.dk .link { color: var(--mint); }
.help-card.dk .ico-s { background: rgba(150, 255, 212, .12); color: var(--mint); }

@media (max-width: 1100px) { .dgrid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 900px) {
  .page-hero { padding: 56px 0 48px; }
  .page-hero h1 { font-size: 40px; }
  .sec-head h2 { font-size: 34px; }
  .band { padding: 72px 0; }
  .help-row, .popular { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .wrap { padding: 0 16px; }
  .dgrid { grid-template-columns: 1fr; }
  .search kbd { display: none; }
}
</style>
