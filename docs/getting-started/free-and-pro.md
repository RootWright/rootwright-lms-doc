---
title: Free and Pro together in RootWright LMS
description: "How RootWright LMS Free and Pro work together: install order, what Pro depends on, and what happens when you deactivate Free or Pro."
plan: Free + Pro
tested_with: RootWright LMS 1.0.0 (Free), 1.0.0 (Pro)
last_verified: 2026-10-28
---

# Free and Pro together in RootWright LMS

RootWright LMS Pro is an add-on to the Free plugin. Both plugins share one admin, one set of courses and one database. This page explains how they behave together.

## The dependency

- Pro requires Free. WordPress lists **RootWright LMS Pro** with the note "Requires: RootWright LMS".
- While Pro is active, WordPress will not let you deactivate or delete the Free plugin. The Free row shows "You cannot deactivate this plugin as other plugins depend on it."
- Deactivate Pro first, then Free.

## The install states

| State | What you see |
|---|---|
| Free only | The full course workflow. Pro sections are absent. |
| Free and Pro active | The full admin with the PRO tags in the course editor and extra sidebar entries. |
| Pro uploaded without Free | Pro cannot be activated. The row says the required plugins are missing. |
| Pro not licensed yet | Pro features are not available until you activate the license. |

## Next steps

- [Activate your Pro license](/getting-started/activate-license).
- [Install RootWright LMS Pro](/getting-started/install-pro).
