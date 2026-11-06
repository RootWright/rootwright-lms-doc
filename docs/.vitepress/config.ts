import { defineConfig } from 'vitepress'
import container from 'markdown-it-container'
import llmstxt from 'vitepress-plugin-llms'
import { buildSidebar, buildPlainSidebar } from './sidebar'
import { site } from './theme/data/site'
import { rootwrightNight } from './theme/shiki-theme'
import { withSynonyms } from './synonyms'

const SITE = 'https://docs.rootwrightlms.com'

/** Extra callouts on top of VitePress's built-in info / tip / warning / danger / details. */
const CALLOUTS: Record<string, string> = {
  note: 'Note',
  beta: 'Beta',
  pro: 'Pro',
  // A screenshot still to add. Remove each one when its image is in place.
  todo: 'Screenshot to add'
}

export default defineConfig({
  lang: 'en-US',
  title: 'RootWright LMS Docs',
  titleTemplate: ':title · RootWright LMS Docs',
  description: 'Official documentation for RootWright LMS, the WordPress LMS plugin: guides, how-tos and developer reference.',
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ['.rootwright-docs/**', 'README.md'],
  sitemap: { hostname: SITE },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#14231E' }],
    ['meta', { property: 'og:site_name', content: 'RootWright LMS Docs' }],
    ['meta', { property: 'og:type', content: 'website' }],
    // Reserve space for the announcement bar before first paint (no layout jump).
    ...(site.banner.enabled
      ? [['script', {}, `(function(){var d=document.documentElement;d.classList.add('rw-has-banner');try{if(localStorage.getItem('rw-banner-dismissed')===${JSON.stringify(site.banner.id)})d.classList.add('rw-no-banner')}catch(e){}})()`] as any]
      : [])
  ],

  markdown: {
    // Code blocks are dark in both day and night mode, in brand colours.
    theme: { light: rootwrightNight, dark: rootwrightNight },
    container: {
      infoLabel: 'Note',
      tipLabel: 'Tip',
      warningLabel: 'Warning',
      dangerLabel: 'Caution',
      detailsLabel: 'Details'
    },
    config(md) {
      for (const [name, label] of Object.entries(CALLOUTS)) {
        md.use(container, name, {
          render(tokens: any[], idx: number) {
            const t = tokens[idx]
            if (t.nesting === 1) {
              const custom = t.info.trim().slice(name.length).trim()
              return `<div class="custom-block ${name}"><p class="custom-block-title">${md.utils.escapeHtml(custom || label)}</p>\n`
            }
            return '</div>\n'
          }
        })
      }
      // ::: steps  — wraps an ordered list and turns it into numbered step blocks
      md.use(container, 'steps', {
        render(tokens: any[], idx: number) {
          return tokens[idx].nesting === 1 ? '<div class="rw-steps">\n' : '</div>\n'
        }
      })
    }
  },

  vite: {
    plugins: [llmstxt({ sidebar: buildPlainSidebar(), ignoreFiles: ['contributing/**', 'index.md', 'changelog.md'] })]
  },

  themeConfig: {
    logo: { src: '/logo.svg', alt: '' },
    siteTitle: 'RootWright',

    nav: [
      {
        text: 'Guides',
        link: '/getting-started/what-is-rootwright',
        activeMatch: '^/(getting-started|courses|learning|quizzes|students|certificates|ai|commerce|integrations|settings)/'
      },
      { text: 'Developers', link: '/developers/rest-api', activeMatch: '^/developers/' },
      { text: 'Changelog', link: '/changelog' },
      { text: 'Help', link: '/help/troubleshooting', activeMatch: '^/help/' },
      {
        text: 'v1.0 beta',
        items: [
          { text: 'Release notes', link: '/changelog' },
          { text: 'rootwrightlms.com', link: 'https://rootwrightlms.com' }
        ]
      }
    ],

    sidebar: {
      '/': buildSidebar()
    },

    outline: { level: [2, 3], label: 'On this page' },
    docFooter: { prev: 'Previous', next: 'Next' },
    lastUpdated: { text: 'Last updated', formatOptions: { dateStyle: 'medium' } },
    returnToTopLabel: 'Back to top',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Appearance',
    lightModeSwitchTitle: 'Switch to day mode',
    darkModeSwitchTitle: 'Switch to night mode',
    externalLinkIcon: true,

    search: {
      provider: 'local',
      options: {
        detailedView: true,
        translations: {
          button: { buttonText: 'Search docs…', buttonAriaLabel: 'Search docs' },
          modal: {
            displayDetails: 'Show previews',
            resetButtonTitle: 'Clear',
            backButtonTitle: 'Close search',
            noResultsText: 'No results for',
            footer: { selectText: 'open', navigateText: 'move', closeText: 'close' }
          }
        },
        miniSearch: {
          searchOptions: { fuzzy: 0.2, prefix: true, boost: { title: 4, text: 2, titles: 1 } }
        },
        _render(src, env, md) {
          const html = md.render(src, env)
          if (env.frontmatter?.search === false) return ''
          return withSynonyms(html, '/' + env.relativePath.replace(/(index)?\.md$/, ''))
        }
      }
    }
  },

  transformHead({ pageData }) {
    if (pageData.isNotFound) return []
    const url = SITE + '/' + pageData.relativePath.replace(/(index)?\.md$/, '')
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: pageData.title,
      description: pageData.description,
      dateModified: pageData.frontmatter.last_verified,
      about: {
        '@type': 'SoftwareApplication',
        name: 'RootWright LMS',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'WordPress'
      },
      publisher: { '@type': 'Organization', name: 'RootWright LMS', url: 'https://rootwrightlms.com' },
      mainEntityOfPage: url
    }
    return [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:title', content: pageData.title }],
      ['meta', { property: 'og:url', content: url }],
      ['script', { type: 'application/ld+json' }, JSON.stringify(ld)]
    ]
  }
})
