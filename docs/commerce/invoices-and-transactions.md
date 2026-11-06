---
title: Invoices, transactions and webhook events in RootWright LMS
description: "Find invoices and credit notes, filter payment transactions, and check gateway webhook events in RootWright LMS Pro under Commerce → Invoices and Transactions."
plan: Pro
tested_with: RootWright LMS 1.0.0 (Free), 1.0.0 (Pro)
last_verified: 2026-11-03
---

# Invoices, transactions and webhook events in RootWright LMS

RootWright LMS Pro keeps an invoice for each payment, a credit note for each refund, and a record of every charge, renewal, refund and dispute from Stripe and PayPal. Find them under **Commerce → Invoices** and **Commerce → Transactions**.

::: pro
Invoices and transactions are part of RootWright LMS Pro. They cover payments taken by RootWright Checkout with Stripe or PayPal.
:::

## Invoices

![The Invoices screen before any payment](/images/commerce/invoices-01-list.jpg)

*Commerce → Invoices. An invoice appears here for each payment, and a credit note for each refund.*

To find an invoice, type its number in **Find by number**, for example `INV-2026-000001`, and click **Find**.

## Transactions

![The Transactions screen with its filters](/images/commerce/transactions-01-list.jpg)

*Commerce → Transactions. A charge, renewal, refund or dispute shows up here.*

Filter the list with:

| Filter | Options |
|---|---|
| Type | **All types**, **Charge**, **Renewal**, **Refund**, **Dispute**, **Free ($0)** |
| Status | **All statuses**, **Pending**, **Processing**, **Completed**, **Failed**, **Refunded**, **Partially refunded**, **Disputed** |
| Gateway | **All gateways**, **Stripe**, **PayPal** |
| Mode | **All**, **Sandbox**, **Live**. The list opens on **Sandbox** while the gateways are in test mode. |
| Dates | **From** and **To** |
| Search | **Buyer email or gateway transaction ID** |

::: tip Checking a test purchase
If a test purchase does not appear, set the mode filter to **Sandbox** or **All**.
:::

## Webhook events

The **Webhook events** tab lists every delivery from a connected gateway. Use it to check that Stripe or PayPal can reach your site.

- Filter by status: **Received**, **Processed**, **Ignored** or **Failed**.
- Filter by gateway: **Stripe** or **PayPal**.

If the tab stays empty after a test payment, check the webhook URL and secret under [Payment gateways](/commerce/payment-gateways).

## Related

- [Orders and subscriptions](/commerce/orders-and-subscriptions)
- [Payment gateways: Stripe and PayPal](/commerce/payment-gateways)
- [Checkout, tax and access rules](/commerce/checkout-and-tax)
