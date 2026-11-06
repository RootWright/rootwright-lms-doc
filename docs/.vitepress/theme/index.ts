import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import '@fontsource/familjen-grotesk/500.css'
import '@fontsource/familjen-grotesk/700.css'
import '@fontsource/hanken-grotesk/400.css'
import '@fontsource/hanken-grotesk/500.css'
import '@fontsource/hanken-grotesk/600.css'
import '@fontsource/hanken-grotesk/700.css'
import '@fontsource/hanken-grotesk/400-italic.css'
import '@fontsource/dm-mono/400.css'
import '@fontsource/dm-mono/500.css'
import './styles/tokens.css'
import './styles/icons.css'
import './styles/overrides.css'

import AnnouncementBar from './components/AnnouncementBar.vue'
import NavTitleAfter from './components/NavTitleAfter.vue'
import NavCta from './components/NavCta.vue'
import SidebarFilter from './components/SidebarFilter.vue'
import DocMeta from './components/DocMeta.vue'
import DocFeedback from './components/DocFeedback.vue'
import RelatedPages from './components/RelatedPages.vue'
import DocsHome from './components/DocsHome.vue'
import ChangelogPage from './components/ChangelogPage.vue'
import RwIcon from './components/RwIcon.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(AnnouncementBar),
      'nav-bar-title-after': () => h(NavTitleAfter),
      'nav-bar-content-after': () => h(NavCta),
      'sidebar-nav-before': () => h(SidebarFilter),
      'doc-before': () => h(DocMeta),
      'doc-footer-before': () => h(DocFeedback),
      'aside-outline-after': () => h(RelatedPages)
    })
  },
  enhanceApp({ app }) {
    app.component('DocsHome', DocsHome)
    app.component('ChangelogPage', ChangelogPage)
    app.component('RwIcon', RwIcon)
  }
} satisfies Theme
