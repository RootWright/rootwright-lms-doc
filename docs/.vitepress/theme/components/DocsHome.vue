<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { withBase } from 'vitepress'
import { hero, quickStart, roles, topicDesc, symptoms, learndash, helpBand } from '../data/home'
import { sections } from '../../sidebar'
import { releases } from '../data/changelog'
import { site } from '../data/site'
import { openSearch } from '../search'
import RwIcon from './RwIcon.vue'
import SiteFooter from './SiteFooter.vue'

const href = (l: string) => (l.startsWith('http') ? l : withBase(l))

/* Quick start checklist (remembered in this browser) */
const KEY = 'rw-quickstart'
const done = ref<Record<string, boolean>>({})
onMounted(() => {
  try { done.value = JSON.parse(localStorage.getItem(KEY) || '{}') } catch {}
})
watch(done, (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)) } catch {} }, { deep: true })
const doneCount = computed(() => quickStart.steps.filter((s) => done.value[s.id]).length)
const pct = computed(() => Math.round((doneCount.value / quickStart.steps.length) * 100))
const toggle = (id: string) => (done.value = { ...done.value, [id]: !done.value[id] })

/* Role tabs */
const roleId = ref(roles[1].id)
const role = computed(() => roles.find((r) => r.id === roleId.value)!)
function onTabKey(e: KeyboardEvent, i: number) {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
  const n = roles.length
  const next = (i + (e.key === 'ArrowRight' ? 1 : n - 1)) % n
  roleId.value = roles[next].id
  ;(document.getElementById(`rw-tab-${roles[next].id}`) as HTMLElement | null)?.focus()
}

/* Topic cards: one per sidebar section, so a new page shows up here without editing the home page */
const topics = sections.map((s) => ({
  icon: s.icon, title: s.text, desc: topicDesc[s.base] ?? '', link: s.base + s.items[0].link, count: s.items.length,
  links: s.items.slice(0, 3).map((i) => [i.text, s.base + i.link, !!i.pro] as const)
}))

/* What's new: first items across releases */
const tagLabel = (t: string) => (t === 'Building' ? 'In progress' : t)
const news = computed(() =>
  releases.flatMap((r) => r.items.map((i) => ({ ...i, release: r.version }))).slice(0, 4)
)

const isMac = ref(true)
onMounted(() => { isMac.value = /Mac|iPhone|iPad/.test(navigator.platform) })
</script>

<template>
  <div class="rw-home">
    <!-- Hero -->
    <section class="hero">
      <div class="wrap hero-grid">
        <div>
          <a class="kicker" :href="href(hero.kickerLink)"><span class="dot" />{{ hero.kicker }} <RwIcon name="arrowR" :size="14" :stroke="2" /></a>
          <h1 class="rw-display title">
            {{ hero.titleBefore }} <span class="mark">{{ hero.titleMark }}</span> {{ hero.titleAfter }}
          </h1>
          <p class="lead">{{ hero.lead }}</p>
          <button type="button" class="bigsearch" @click="openSearch('')">
            <RwIcon name="search" :size="22" :stroke="1.9" />
            <span>{{ hero.searchHint }}</span>
            <kbd>{{ isMac ? '⌘' : 'Ctrl' }} K</kbd>
          </button>
          <div class="popular">
            <span>Popular:</span>
            <button v-for="p in hero.popular" :key="p.text" type="button" class="chip" @click="openSearch(p.query)">{{ p.text }}</button>
          </div>
        </div>

        <div class="qs">
          <div class="qs-head">
            <div>
              <div class="eyebrow">Quick start</div>
              <div class="rw-display qs-title">{{ quickStart.title }}</div>
            </div>
            <div class="qs-count" aria-live="polite">{{ doneCount }} of {{ quickStart.steps.length }} done</div>
          </div>
          <div class="bar" role="progressbar" :aria-valuenow="pct" aria-valuemin="0" aria-valuemax="100" aria-label="Quick start progress"><div :style="{ width: pct + '%' }" /></div>
          <ul class="steps">
            <li v-for="s in quickStart.steps" :key="s.id" class="step" :class="{ done: done[s.id] }">
              <button type="button" class="ck" :aria-pressed="!!done[s.id]" :aria-label="`Mark “${s.title}” as ${done[s.id] ? 'not done' : 'done'}`" @click="toggle(s.id)">
                <RwIcon name="check" :size="14" :stroke="3" />
              </button>
              <a :href="href(s.link)" class="st">
                <span class="st-t">{{ s.title }}</span>
                <span class="st-d">{{ s.desc }}</span>
              </a>
              <span class="time">{{ s.time }}</span>
            </li>
          </ul>
          <a class="more" :href="href(quickStart.link)">Open the full quick start guide <RwIcon name="arrowR" :size="16" :stroke="2" /></a>
        </div>
      </div>
    </section>

    <!-- Paths by role -->
    <section class="wrap sec">
      <div class="sec-head">
        <div>
          <div class="eyebrow green">Start where you are</div>
          <h2 class="rw-display h2">What are you here to do?</h2>
        </div>
        <div class="tabs" role="tablist" aria-label="Choose your role">
          <button
            v-for="(r, i) in roles" :id="`rw-tab-${r.id}`" :key="r.id" type="button" role="tab" class="tab"
            :class="{ on: r.id === roleId }" :aria-selected="r.id === roleId" :tabindex="r.id === roleId ? 0 : -1"
            aria-controls="rw-role-panel" @click="roleId = r.id" @keydown="onTabKey($event, i)"
          ><RwIcon :name="r.icon" :size="17" />{{ r.label }}</button>
        </div>
      </div>
      <div id="rw-role-panel" class="role-grid" role="tabpanel" :aria-labelledby="`rw-tab-${roleId}`">
        <div class="role-card">
          <div class="eyebrow mintink">{{ role.kicker }}</div>
          <div class="rw-display role-title">{{ role.title }}</div>
          <p>{{ role.desc }}</p>
          <a class="role-cta" :href="href(role.cta.link)">{{ role.cta.text }} <RwIcon name="arrowR" :size="16" :stroke="2.2" /></a>
        </div>
        <div class="role-links">
          <a v-for="l in role.links" :key="l.link" class="card rlink" :href="href(l.link)">
            <span class="rlink-top">
              <span class="ico"><RwIcon name="file" :size="17" /></span>
              <span v-if="l.pro" class="pill pro">Pro</span>
            </span>
            <span class="rlink-t">{{ l.title }}</span>
            <span class="rlink-d">{{ l.desc }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Topics -->
    <section class="wrap sec">
      <div class="sec-head">
        <div>
          <div class="eyebrow green">Browse the docs</div>
          <h2 class="rw-display h2">Every part of RootWright</h2>
        </div>
        <div class="legend">
          <span><span class="pill free">Free</span> in every install</span>
          <span><span class="pill pro">Pro</span> needs a Pro license</span>
        </div>
      </div>
      <div class="topics">
        <div v-for="t in topics" :key="t.title" class="card topic">
          <span class="ttop"><span class="tico"><RwIcon :name="t.icon" :size="21" /></span><span class="tcount">{{ t.count }} {{ t.count === 1 ? 'page' : 'pages' }}</span></span>
          <a class="rw-display ttl" :href="href(t.link)">{{ t.title }}</a>
          <p>{{ t.desc }}</p>
          <ul>
            <li v-for="[text, link, pro] in t.links" :key="link">
              <a :href="href(link)"><span>{{ text }}</span><span v-if="pro" class="pill pro sm">Pro</span><RwIcon class="arr" name="chevR" :size="15" :stroke="2" /></a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Fix by symptom -->
    <section class="wrap sec">
      <div class="sec-head">
        <div>
          <div class="eyebrow green">Fix a problem</div>
          <h2 class="rw-display h2">Something not working?</h2>
        </div>
        <a class="more" :href="withBase('/help/troubleshooting')">All fixes <RwIcon name="arrowR" :size="16" :stroke="2" /></a>
      </div>
      <div class="symptoms">
        <a v-for="s in symptoms" :key="s.link" class="card sym" :href="href(s.link)">
          <span class="sym-ico"><RwIcon name="alert" :size="17" /></span>
          <span class="sym-t">{{ s.text }}</span>
          <RwIcon class="arr" name="arrowR" :size="16" :stroke="2" />
        </a>
      </div>
    </section>

    <!-- What's new + LearnDash -->
    <section class="wrap sec two">
      <div class="panel">
        <div class="panel-head">
          <h2 class="rw-display h3"><RwIcon name="history" :size="22" /> What’s new</h2>
          <a :href="withBase('/changelog')">Full changelog →</a>
        </div>
        <a v-for="n in news" :key="n.title" class="news" :href="n.link ? href(n.link) : withBase('/changelog')">
          <span><span class="tag" :class="n.tag.toLowerCase()">{{ tagLabel(n.tag) }}</span></span>
          <span>
            <span class="news-t">{{ n.title }} <span v-if="n.pro" class="pill pro sm">Pro</span></span>
            <span class="news-d">{{ n.desc }}</span>
          </span>
        </a>
      </div>
      <div class="panel mint">
        <h2 class="rw-display h3">{{ learndash.title }}</h2>
        <p class="ld-text">{{ learndash.text }}</p>
        <div class="ld-links">
          <a v-for="l in learndash.links" :key="l.text" class="card ld" :href="href(l.link)">
            <RwIcon :name="l.icon" :size="18" /><span>{{ l.text }}</span><RwIcon class="arr" name="arrowR" :size="16" :stroke="2" />
          </a>
        </div>
      </div>
    </section>

    <!-- Help band -->
    <section class="wrap sec last">
      <div class="band">
        <div>
          <h2 class="rw-display band-t">{{ helpBand.title }} <span>{{ helpBand.accent }}</span></h2>
          <p>{{ helpBand.text }}</p>
        </div>
        <div class="band-links">
          <a v-if="site.help.community" class="card bl" :href="site.help.community"><RwIcon name="users" :size="22" /><b>Ask the community</b><span>Questions, ideas and show-and-tell from other course builders.</span></a>
          <a v-if="site.help.support" class="card bl" :href="site.help.support"><RwIcon name="buoy" :size="22" /><b>Contact support</b><span>Talk to the team that builds RootWright.</span></a>
          <a v-if="site.help.bugs" class="card bl" :href="site.help.bugs"><RwIcon name="bug" :size="22" /><b>Report a bug</b><span>Beta testers: include your version and steps to reproduce.</span></a>
        </div>
      </div>
    </section>

    <SiteFooter />
  </div>
</template>

<style scoped>
.rw-home { --wrap: 1280px; }
.wrap { max-width: var(--wrap); margin: 0 auto; padding-left: 24px; padding-right: 24px; }
@media (min-width: 768px) { .wrap { padding-left: 48px; padding-right: 48px; } }
a { color: inherit; }
.eyebrow { font-family: var(--vp-font-family-mono); font-size: 12px; text-transform: uppercase; letter-spacing: .08em; color: var(--vp-c-text-2); }
.eyebrow.green { color: var(--vp-c-brand-1); font-size: 13px; }
.eyebrow.mintink { color: #7fd4a9; }
.pill { display: inline-block; font-size: 12px; font-weight: 700; padding: 2px 8px; border-radius: var(--rw-r-sm); line-height: 1.5; }
.pill.sm { font-size: 11px; padding: 1px 7px; }
.pill.free { background: var(--rw-free-bg); color: var(--rw-free-fg); }
.pill.pro { background: var(--rw-pro-bg); color: var(--rw-pro-fg); }
.card { transition: transform .22s var(--rw-ease), box-shadow .22s, border-color .22s; }
.card:hover { transform: translateY(-3px); box-shadow: var(--rw-sh2); border-color: var(--vp-c-border) !important; }

/* Hero */
.hero { background: var(--vp-c-bg-alt); border-bottom: 1px solid var(--vp-c-divider); }
.hero-grid { display: grid; grid-template-columns: minmax(0, 1.12fr) minmax(0, .88fr); gap: 64px; align-items: center; padding-top: 80px; padding-bottom: 88px; }
.kicker {
  display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px 6px 10px; border: 1px solid var(--vp-c-divider);
  border-radius: 999px; background: var(--rw-raised); color: var(--vp-c-brand-1); font-size: 14px; font-weight: 600; transition: border-color .15s;
}
.kicker:hover { border-color: var(--rw-root); }
.dot { width: 8px; height: 8px; border-radius: 50%; background: var(--rw-root); }
.title { margin: 22px 0 18px; font-size: clamp(42px, 5vw, 64px); line-height: 1.02; font-weight: 700; }
.mark { background: linear-gradient(180deg, transparent 60%, var(--rw-hl) 60%); padding: 0 .06em; }
.lead { margin: 0 0 32px; max-width: 560px; font-size: 19px; line-height: 1.55; color: var(--vp-c-text-2); }
.bigsearch {
  display: flex; align-items: center; gap: 14px; width: 100%; max-width: 600px; height: 62px; padding: 0 12px 0 20px;
  border: 1.5px solid var(--vp-c-border); border-radius: 20px 6px 6px 6px; background: var(--rw-raised); box-shadow: var(--rw-sh);
  color: var(--vp-c-text-2); font-size: 17px; text-align: left; transition: border-color .15s, box-shadow .15s;
}
.bigsearch:hover { border-color: var(--rw-root); box-shadow: 0 0 0 4px var(--rw-free-bg), var(--rw-sh); }
.bigsearch span { flex: 1; }
.bigsearch kbd, .qs kbd {
  font-family: var(--vp-font-family-mono); font-size: 13px; padding: 3px 9px; border: 1px solid var(--vp-c-border);
  border-bottom-width: 2px; border-radius: 7px; background: var(--vp-c-bg-alt);
}
.popular { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 18px; font-size: 14px; color: var(--vp-c-text-2); }
.chip {
  padding: 5px 12px; border: 1px solid var(--vp-c-divider); border-radius: var(--rw-r-chip); background: var(--rw-raised);
  color: var(--vp-c-text-1); font-size: 14px; transition: border-color .15s, color .15s;
}
.chip:hover { border-color: var(--rw-root); color: var(--vp-c-brand-1); }

.qs { background: var(--rw-raised); border: 1px solid var(--vp-c-divider); border-radius: 28px 10px 10px 10px; box-shadow: var(--rw-sh2); padding: 26px; }
.qs-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.qs-title { font-size: 24px; font-weight: 700; margin-top: 2px; }
.qs-count { font-size: 14px; font-weight: 600; color: var(--vp-c-brand-1); white-space: nowrap; }
.bar { height: 6px; border-radius: 6px; background: var(--vp-c-bg-soft); margin: 16px 0 18px; overflow: hidden; }
.bar > div { height: 100%; border-radius: 6px; background: var(--rw-root); transition: width .35s var(--rw-ease); }
.steps { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.step { display: flex; align-items: flex-start; gap: 14px; padding: 14px 16px; border: 1px solid var(--vp-c-divider); border-radius: var(--rw-r-win); background: var(--vp-c-bg); transition: border-color .15s; }
.step:hover { border-color: var(--vp-c-border); }
.ck {
  flex-shrink: 0; width: 24px; height: 24px; margin-top: 1px; display: grid; place-items: center;
  border: 1.5px solid var(--vp-c-border); border-radius: var(--rw-r-sm); color: transparent; transition: all .15s;
}
.ck:hover { border-color: var(--rw-root); }
.step.done .ck { background: var(--rw-root); border-color: var(--rw-root); color: #fff; }
.st { flex: 1; min-width: 0; }
.st-t { display: block; font-weight: 600; font-size: 16px; }
.st:hover .st-t { color: var(--vp-c-brand-1); }
.step.done .st-t { text-decoration: line-through; color: var(--vp-c-text-2); }
.st-d { display: block; font-size: 14px; color: var(--vp-c-text-2); line-height: 1.45; }
.time { flex-shrink: 0; font-family: var(--vp-font-family-mono); font-size: 12px; color: var(--vp-c-text-2); margin-top: 3px; }
.more { display: inline-flex; align-items: center; gap: 6px; margin-top: 18px; font-weight: 600; font-size: 15px; color: var(--vp-c-brand-1); }
.more:hover :deep(svg) { transform: translateX(3px); }
.more :deep(svg) { transition: transform .15s; }

/* Sections */
.sec { padding-top: 88px; }
.sec.last { padding-bottom: 96px; }
.sec-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 28px; }
.h2 { margin: 6px 0 0; font-size: clamp(30px, 3.4vw, 40px); line-height: 1.1; font-weight: 700; }
.h3 { margin: 0; font-size: 26px; font-weight: 700; display: flex; align-items: center; gap: 10px; }

.tabs { display: flex; flex-wrap: wrap; gap: 8px; }
.tab {
  display: inline-flex; align-items: center; gap: 8px; height: 44px; padding: 0 18px; border: 1px solid var(--vp-c-divider);
  border-radius: var(--rw-r-btn); background: var(--rw-raised); color: var(--vp-c-text-2); font-size: 15px; font-weight: 600; transition: all .15s;
}
.tab:hover { border-color: var(--vp-c-border); color: var(--vp-c-text-1); }
.tab.on { background: var(--vp-c-text-1); border-color: var(--vp-c-text-1); color: var(--vp-c-bg); }

.role-grid { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.6fr); gap: 20px; }
.role-card { display: flex; flex-direction: column; min-height: 300px; padding: 32px; border-radius: 28px 10px 10px 10px; background: var(--rw-deep); color: #f2efe7; }
.role-title { font-size: 30px; line-height: 1.15; font-weight: 700; margin-top: 10px; }
.role-card p { margin: 12px 0 24px; color: #d3ded7; }
.role-cta {
  margin-top: auto; align-self: flex-start; display: inline-flex; align-items: center; gap: 8px; height: 44px; padding: 0 18px;
  border-radius: var(--rw-r-btn); background: #4cb683; color: #0e1814 !important; font-weight: 700; transition: background-color .15s;
}
.role-cta:hover { background: #63c796; }
.role-links { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.rlink { display: flex; flex-direction: column; gap: 6px; padding: 22px; border: 1px solid var(--vp-c-divider); border-radius: 20px 6px 6px 6px; background: var(--rw-raised); }
.rlink-top { display: flex; align-items: center; justify-content: space-between; }
.ico { width: 34px; height: 34px; display: grid; place-items: center; border-radius: var(--rw-r-chip); background: var(--rw-mint); color: var(--vp-c-brand-1); }
.rlink-t { font-weight: 700; font-size: 17px; margin-top: 6px; }
.rlink:hover .rlink-t { color: var(--vp-c-brand-1); }
.rlink-d { font-size: 15px; color: var(--vp-c-text-2); line-height: 1.5; }

.legend { display: flex; flex-wrap: wrap; gap: 14px; font-size: 14px; color: var(--vp-c-text-2); }
.legend > span { display: inline-flex; align-items: center; gap: 6px; }
.topics { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.topic { display: flex; flex-direction: column; padding: 24px; border: 1px solid var(--vp-c-divider); border-radius: var(--rw-r-card); background: var(--rw-raised); }
.ttop { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.tico { width: 44px; height: 44px; display: grid; place-items: center; border-radius: var(--rw-r-btn); background: var(--vp-c-text-1); color: var(--vp-c-bg); }
.tcount { font-family: var(--vp-font-family-mono); font-size: 12px; color: var(--vp-c-text-3); }

.symptoms { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.sym { display: flex; align-items: center; gap: 14px; padding: 16px 18px; border: 1px solid var(--vp-c-divider); border-radius: var(--rw-r-win); background: var(--rw-raised); }
.sym-ico { width: 34px; height: 34px; flex-shrink: 0; display: grid; place-items: center; border-radius: var(--rw-r-chip); background: var(--rw-danger-bg); color: var(--rw-danger-fg); }
.sym-t { flex: 1; font-weight: 600; }
.sym:hover .sym-t { color: var(--vp-c-brand-1); }
.ttl { margin-top: 18px; font-size: 21px; font-weight: 700; transition: color .15s; }
.ttl:hover { color: var(--vp-c-brand-1); }
.topic p { margin: 6px 0 16px; font-size: 15px; color: var(--vp-c-text-2); line-height: 1.5; }
.topic ul { list-style: none; margin: auto 0 0; padding: 0; border-top: 1px solid var(--vp-c-divider); }
.topic li a { display: flex; align-items: center; gap: 8px; padding: 10px 0; border-bottom: 1px solid var(--vp-c-divider); font-size: 15px; color: var(--vp-c-text-2); transition: color .15s; }
.topic li a > span:first-child { flex: 1; }
.topic li a:hover { color: var(--vp-c-brand-1); }
.arr { transition: transform .15s; }
a:hover > .arr { transform: translateX(3px); }

.two { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); gap: 20px; }
.panel { padding: 30px; border: 1px solid var(--vp-c-divider); border-radius: 28px 10px 10px 10px; background: var(--rw-raised); }
.panel.mint { background: var(--rw-mint); border-color: transparent; }
.panel-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 10px; }
.panel-head a { font-weight: 600; font-size: 15px; color: var(--vp-c-brand-1); }
.news { display: grid; grid-template-columns: 112px minmax(0, 1fr); gap: 16px; padding: 16px 12px; margin: 0 -12px; border-radius: var(--rw-r-btn); transition: background-color .15s; }
.news:hover { background: var(--vp-c-bg-soft); }
.news-t { display: block; font-weight: 700; }
.news-d { display: block; font-size: 15px; color: var(--vp-c-text-2); line-height: 1.5; }
.tag { display: inline-block; font-size: 12px; font-weight: 700; padding: 3px 9px; border-radius: var(--rw-r-sm); }
.tag.new { background: var(--rw-free-bg); color: var(--rw-free-fg); }
.tag.improved { background: var(--rw-note-bg); color: var(--rw-note-fg); }
.tag.fixed { background: var(--rw-danger-bg); color: var(--rw-danger-fg); }
.tag.building { background: var(--rw-beta-bg); color: var(--rw-beta-fg); }
.ld-text { margin: 8px 0 20px; color: var(--vp-c-text-1); }
.ld-links { display: flex; flex-direction: column; gap: 10px; }
.ld { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border: 1px solid var(--vp-c-divider); border-radius: var(--rw-r-win); background: var(--rw-raised); font-weight: 600; }
.ld span { flex: 1; }

.band { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.7fr); gap: 40px; align-items: center; padding: 48px; border-radius: 40px 14px 14px 14px; background: var(--rw-deep); color: #f2efe7; }
.band-t { margin: 0; font-size: clamp(30px, 3.4vw, 40px); line-height: 1.08; font-weight: 700; }
.band-t span { color: #7fd4a9; }
.band p { margin: 14px 0 0; color: #d3ded7; font-size: 17px; }
.band-links { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.bl { display: flex; flex-direction: column; gap: 8px; padding: 22px; border: 1px solid rgba(246, 243, 236, .14); border-radius: 20px 6px 6px 6px; background: rgba(246, 243, 236, .06); color: #f2efe7 !important; }
.bl :deep(svg) { color: #7fd4a9; }
.bl b { font-size: 17px; }
.bl span { font-size: 14px; color: #b9c9bf; }
.bl:hover { border-color: rgba(246, 243, 236, .3) !important; }

@media (max-width: 1100px) {
  .topics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .band { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 860px) {
  .hero-grid, .role-grid, .two { grid-template-columns: minmax(0, 1fr); }
  .hero-grid { padding-top: 48px; padding-bottom: 56px; gap: 40px; }
  .sec { padding-top: 64px; }
}
@media (max-width: 640px) {
  .topics, .role-links, .band-links, .symptoms { grid-template-columns: minmax(0, 1fr); }
  .band { padding: 28px; }
  .news { grid-template-columns: minmax(0, 1fr); gap: 6px; }
  .bigsearch kbd { display: none; }
}
</style>
