---
title: Docs components
description: Every building block available when writing RootWright LMS docs pages, with the Markdown to use.
plan: Free + Pro
search: false
head:
  - - meta
    - name: robots
      content: noindex
---

# Docs components

This page shows every building block the RootWright docs theme supports, with the Markdown that makes it. It's hidden from search and from the sidebar — use it as a reference while writing, or delete it before launch.

## Page frontmatter

```yaml
---
title: How to add a course in RootWright LMS     # shown in the browser tab and search
description: "Create a course in RootWright LMS…"  # 110–160 characters
plan: Free                                         # Free | Pro | Free + Pro  → pills under the breadcrumb
tested_with: RootWright 1.0.0 (Free), 1.0.0 (Pro)  # shown in the meta row
last_verified: 2026-10-26
status: draft                                      # optional — shows a Draft pill
---
```

The breadcrumb, plan pills, reading time, **Copy link** and **Copy for AI** buttons are added automatically above the title. **Copy for AI** copies the page as Markdown so readers can paste it into ChatGPT, Claude or another assistant.

## Callouts

::: info
Use **info** (shown as *Note*) for context the reader should know.
:::

::: tip
Use **tip** for a better or faster way to do something.
:::

::: warning
Use **warning** for something that can surprise the reader.
:::

::: danger
Use **danger** (shown as *Caution*) when a step can lose data or break a live site.
:::

::: beta
Use **beta** for behaviour that may still change before 1.0.
:::

::: pro
Use **pro** when a feature needs a Pro license. [Compare Free and Pro](/getting-started/free-and-pro).
:::

::: details Click to expand
Use **details** for optional depth that most readers can skip.
:::

Any callout takes a custom title: `::: tip Before you publish`.

```md
::: tip
Text of the tip.
:::

::: pro Needs RootWright Pro
Text.
:::
```

## Steps

::: steps
1. In your WordPress dashboard, go to **RootWright → Courses**.
2. Click **Add New Course**. A side panel opens with three tabs: **Details**, **Curriculum** and **Settings**.
3. Enter a title and click **Publish**.
:::

```md
::: steps
1. In your WordPress dashboard, go to **RootWright → Courses**.
2. Click **Add New Course**.
3. Enter a title and click **Publish**.
:::
```

## Code

Single block, with a file name and highlighted line:

```php [functions.php]{2}
<?php
add_action( 'rootwright/lesson_completed', function ( $student_id, $lesson_id ) {
    // Your code here.
}, 10, 2 );
```

Tabs:

::: code-group

```bash [cURL]
curl -u "admin:APPLICATION_PASSWORD" \
  https://example.com/wp-json/rootwright/v1/courses?per_page=5
```

```js [JavaScript]
const res = await fetch('/wp-json/rootwright/v1/courses?per_page=5')
const courses = await res.json()
```

```php [PHP]
$response = wp_remote_get( rest_url( 'rootwright/v1/courses?per_page=5' ) );
```

:::

> The hook and endpoint names above are examples only — replace them with real ones from the plugin.

## Badges

Inline badges: <Badge type="free" text="Free" /> <Badge type="pro" text="Pro" /> <Badge type="info" text="New in 1.0" /> <Badge type="beta" text="Beta" />

```md
<Badge type="pro" text="Pro" />
```

## Tables

| Setting | What it does | Default | Plan |
|---|---|---|---|
| **Course title** | Name students see on the course page. | — | Free |
| **Drip** | Releases lessons on a schedule. | Off | Pro |

## Images and video

Screenshots go in `docs/public/images/<section>/`, videos in `docs/public/videos/<section>/`.

```md
![The Courses screen with the Add New Course button highlighted](/images/courses/add-a-course-01-courses-list.webp)

<video controls preload="none" poster="/videos/courses/add-a-course-poster.webp" width="100%">
  <source src="/videos/courses/add-a-course.mp4" type="video/mp4">
</video>
```

## Keyboard keys

Press <kbd>⌘</kbd> <kbd>K</kbd> to search the docs.
