---
title: How to set up Stripe and PayPal in RootWright LMS
description: "Take course payments in RootWright LMS Pro with Stripe or PayPal: enter the keys for sandbox and live mode, copy the webhook endpoint, and switch from test mode to live."
plan: Pro
tested_with: RootWright LMS 1.0.0 (Free), 1.0.0 (Pro)
last_verified: 2026-10-28
---

# How to set up Stripe and PayPal in RootWright LMS

RootWright LMS Pro takes payments on its own checkout through Stripe or PayPal. No store plugin is needed. Set the keys under **Settings → Commerce → Payment gateways**.

::: pro
Payment gateways are part of RootWright LMS Pro.
:::

## Test mode and live mode

Each gateway has a **Mode** dropdown. Start in **Sandbox (testing)**. Real cards are declined in sandbox, so only test payments go through.

The banner at the top reads **Test mode on. Real cards are declined.** Click **Switch to live** when you are ready. The banner also appears under **Needs attention** on the Settings overview until live keys are saved.

![The Stripe settings with test mode on](/images/commerce/payment-gateways-01-stripe.jpg)

*Settings → Commerce → Payment gateways → Stripe. Stripe shows **Connected** and **Test mode** once the keys are saved.*

## Stripe

::: steps
1. Open **Payment gateways → Stripe**.
2. Enter the **Test secret key** and **Test publishable key** from the Stripe dashboard under **Developers → API keys**.
3. Enter the **Test webhook secret** from **Developers → Webhooks**, then copy the **Webhook endpoint** that RootWright LMS shows into your Stripe webhook.
4. Switch on **Enable**.
5. To go live, enter the live keys and webhook secret, then change **Mode** to live.
:::

Events are refused unless the webhook secret matches. Stripe handles one-time payments, subscriptions, refunds, and cancel at the end of the period. PayPal handles one-time payments, subscriptions and refunds.

## PayPal

::: steps
1. Open **Payment gateways → PayPal**.
2. Enter the **Sandbox client ID** and **Sandbox client secret** from the PayPal Developer dashboard, under **Apps & Credentials**.
3. Add a webhook for the **Webhook endpoint** shown on the screen, then enter its ID in **Sandbox webhook ID**. PayPal checks every event against this ID, and events are refused without it.
4. Switch on **Enable**.
5. For live payments, enter the live client ID, client secret and webhook ID, then change **Mode** to live.
:::

## Related

- [Checkout and tax](/commerce/checkout-and-tax).
- [Orders and subscriptions](/commerce/orders-and-subscriptions).
