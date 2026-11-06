---
title: Search & AI visibility settings in RootWright LMS
description: "Turn on Course structured data and a /llms.txt course index in RootWright LMS so search engines and AI assistants can read your course catalogue."
plan: Free
tested_with: RootWright LMS 1.0.0 (Free), 1.0.0 (Pro)
last_verified: 2026-11-03
---

# Search & AI visibility settings in RootWright LMS

**Settings → Search & AI visibility** controls what search engines and AI assistants can read about your courses. RootWright LMS can add structured data to your course pages and publish a plain-text course index at `/llms.txt`.

![The Search & AI visibility settings](/images/settings/search-visibility-01.jpg)

*Settings → Search & AI visibility. Both options are on in this example.*

## Course structured data

Adds Course, breadcrumb and course-list markup to your catalogue and course pages.

- The course list is still a Google rich result.
- The single-course markup is not a Google rich result, since Google retired course rich results in September 2025. Answer engines read it instead.

Turn this off if your SEO plugin already outputs Course schema, so the page does not carry it twice.

## Publish /llms.txt

Publishes a plain-text index of your courses at `yoursite.com/llms.txt`, intended for AI crawlers.

- It is an emerging convention rather than a standard. No major answer engine has committed to reading it, so treat it as cheap insurance, not a ranking factor.
- The file is cached.
- It is never served while WordPress is set to discourage search engines (**Settings → Reading → Search engine visibility**).

## Related

- [Site & pages](/settings/site-and-pages)
- [The course page students see](/courses/course-page)
