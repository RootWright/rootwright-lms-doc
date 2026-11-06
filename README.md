# RootWright LMS Docs

The official RootWright LMS documentation site, built with [VitePress](https://vitepress.dev) and a custom theme in the RootWright brand.

## Run it

```bash
npm install
npm run docs:dev      # http://localhost:5173 with live reload
npm run docs:build    # production build → docs/.vitepress/dist
npm run docs:preview  # serve the build locally
```

Node 18+ is required.

## Where things live

```
docs/
  index.md                    Home page (renders <DocsHome />)
  changelog.md                Changelog page (renders <ChangelogPage />)
  getting-started/ courses/ … One folder per sidebar section, one .md per page
  contributing/components.md  Every docs building block with its Markdown (hidden; delete before launch)
  public/                     logo.svg, favicon.svg, robots.txt, images/, videos/
  .vitepress/
    config.ts                 Site config: nav, search, SEO (canonical, JSON-LD, sitemap), llms.txt
    sidebar.ts                The docs map → sidebar, breadcrumbs and draft pages
    theme/
      data/site.ts            Banner, nav button, version, help links, feedback endpoint
      data/home.ts            Everything on the home page
      data/changelog.ts       Release notes
      styles/tokens.css       Brand colours, radii, fonts → VitePress variables (light + dark)
      styles/overrides.css    Restyles VitePress's nav, sidebar, search, doc pages, callouts
      components/             Home, changelog, banner, page meta, feedback, sidebar filter, footer
      icons.js                Icon set (run `npm run icons:css` after adding one)
      shiki-theme.ts          Code highlighting in brand colours
scripts/
  make-stubs.mjs              `npm run docs:stubs` — creates a draft page for each sidebar link without one
```

## Writing a page

1. Add the link to `docs/.vitepress/sidebar.ts` (add `pro: true` for Pro features).
2. Run `npm run docs:stubs` to create the file, or write it yourself at `docs/<section>/<slug>.md`.
3. Fill in the frontmatter and content. Remove `status: draft` when it's ready.

```yaml
---
title: How to add a course in RootWright LMS
description: "Create a course in RootWright LMS from the WordPress dashboard…"
plan: Free            # Free | Pro | Free + Pro — shown as pills above the title
tested_with: RootWright 1.0.0 (Free), 1.0.0 (Pro)
last_verified: 2026-10-26
---
```

Breadcrumbs, plan pills, reading time, **Copy link**, **Copy for AI**, "Was this page helpful?", the sidebar filter and the "On this page" outline are added automatically.

Callouts: `::: info` (Note), `::: tip`, `::: warning`, `::: danger` (Caution), `::: beta`, `::: pro`, `::: details`.
Numbered steps: wrap an ordered list in `::: steps`. Code tabs: `::: code-group`.
See `/contributing/components` in the running site for all of them.

## Before launch

- Set the real docs domain in `config.ts` (`SITE`) and `public/robots.txt`.
- Replace `public/logo.svg` and `public/favicon.svg` with the official logo files (the current mark is a close redraw).
- Set `help` links, `feedbackEndpoint` and `newsletterAction` in `theme/data/site.ts`.
- Delete `docs/contributing/` if you don't want the components page published.
