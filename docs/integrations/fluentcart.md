---
title: How to sell courses with FluentCart
description: "Sell RootWright LMS courses through FluentCart: link a course to a FluentCart product, choose FluentCart as the payment store, and understand which billing intervals and events grant or remove access."
plan: Free + Pro
tested_with: RootWright LMS 1.0.0 (Free), 1.0.0 (Pro)
last_verified: 2026-10-28
---

# How to sell courses with FluentCart

FluentCart is a WordPress store plugin. RootWright LMS can sell courses through it: a FluentCart order grants access, and a refund or ended subscription removes it. You do not need a separate checkout.

## Before you start

- Install and activate **FluentCart**. RootWright LMS detects it automatically.
- Have at least one course published in RootWright LMS.

## Link a course to a FluentCart product

::: steps
1. Open the course in the course builder and click **Pricing & Access**.
2. Under **Store product**, in **Link a product**, choose **FluentCart** as the **Store**. Then type at least two characters in **Product** to find an existing product, or click **Create FluentCart product** to make one from the course.
3. Click **Update** to save the course.
:::

Under **Settings → Checkout & stores**, the **Default store** setting decides which store sells courses when more than one is connected. Choose **Automatic (store priority)** to keep the built-in order, or pick FluentCart to always sell through it.

![The Store product section with FluentCart chosen as the store](/images/integrations/fluentcart-02-link-product.jpg)

*Pricing & Access → Store product. Until a product is linked, the course can't be purchased.*

![Checkout & stores with Default store set to FluentCart](/images/integrations/fluentcart-01-default-store.jpg)

*Settings → Checkout & stores. This setting has its own **Save changes** bar. Click **Discard** to undo a change you have not saved.*

## What grants and removes access

| FluentCart event | RootWright LMS action |
|---|---|
| Order paid, or order completed | Grants access. |
| Order refunded | Removes access. |
| Subscription renewed, reactivated or resumed | Grants access. |
| Subscription expired | Removes access. |
| Subscription ended | Ends the plan. |
| Subscription canceled | RootWright LMS does not change access on this event. |

## Billing limits

FluentCart can bill only on these intervals: daily, weekly, monthly, every 3 or 6 months, or yearly. Courses on another interval cannot be sold through FluentCart. The plugin says so with an error naming the course.

## Thank-you page

After checkout, a student goes to the course thank-you page only when every item in the order is a course.

## Related

- [Payment gateways](/commerce/payment-gateways) for selling through Stripe or PayPal instead.
- [Orders and subscriptions](/commerce/orders-and-subscriptions).
