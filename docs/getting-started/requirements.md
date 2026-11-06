---
title: RootWright LMS requirements
description: "What you need to run RootWright LMS: WordPress 6.8 or later for Free, WordPress 6.9 or later for Pro, PHP 8.2 or later, and an administrator account."
plan: Free + Pro
tested_with: RootWright LMS 1.0.0 (Free), 1.0.0 (Pro)
last_verified: 2026-10-28
---

# RootWright LMS requirements

Before you install RootWright LMS, check that your WordPress site meets these requirements.

## Minimum versions

| Requirement | RootWright LMS Free | RootWright LMS Pro |
|---|---|---|
| WordPress | 6.8 or later | 6.9 or later |
| PHP | 8.2 or later | 8.2 or later |
| Other plugins | None | RootWright LMS Free must be installed and active |

These values come from the plugin headers of version 1.0.0.

## Accounts you need

- An **administrator** account to install and activate the plugins, and to open **RootWright LMS** in the admin.
- For Pro payments, a Stripe or PayPal account. Sandbox keys are enough for testing.
- For Pro video, a Bunny.net, Cloudflare Stream or YouTube account. For Pro live classes, a Zoom or Google account. See [Integrations](/integrations/video-storage).

## Optional stores

RootWright LMS sells courses through its own checkout (Stripe or PayPal, Pro). It can also sell through an existing store plugin: [FluentCart](/integrations/fluentcart) is supported. Other store plugins appear in the store list on the Checkout screen when they are active.

::: tip
Run the site on a host where you can change the PHP upload limit. Large lesson videos need it. See [Video & storage](/integrations/video-storage) for the plugin's own upload limit.
:::
