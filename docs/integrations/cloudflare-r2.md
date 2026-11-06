---
title: How to store course files in Cloudflare R2
description: "Attach course files in RootWright LMS Pro from a Cloudflare R2 bucket: enter the account ID, bucket, and an R2 API token, optionally add a public URL, then switch the driver on."
plan: Pro
tested_with: RootWright LMS 1.0.0 (Free), 1.0.0 (Pro)
last_verified: 2026-11-02
---

# How to store course files in Cloudflare R2

Cloudflare R2 keeps the files you attach to lessons, such as PDFs, worksheets and slide decks, in an R2 bucket. The files stay in your bucket. RootWright LMS does not copy them onto your WordPress server.

This is separate from Cloudflare Stream, which hosts lesson videos. See [Cloudflare Stream](/integrations/cloudflare-stream) for videos.

::: pro
Cloudflare R2 is part of RootWright LMS Pro.
:::

## Before you start

- A Cloudflare account with **R2** enabled.
- Your **Account ID**, a 32-character value shown on the R2 page of the Cloudflare dashboard.
- An R2 bucket for course files.
- An **R2 API token** with **Object Read & Write** on that bucket. Create it on the R2 page of the Cloudflare dashboard. Cloudflare shows the **Secret Access Key** once, when the token is created.

## Connection fields

| Field | Required | What it does |
|---|---|---|
| **Account ID** | Yes | Identifies your Cloudflare account. |
| **Bucket** | Yes | The name of the R2 bucket. |
| **Access Key ID** | Yes | The access key from the R2 API token. |
| **Secret Access Key** | Yes | The secret from the R2 API token. The field is a password field. Cloudflare never shows it again, so create a new token if you lost it. |
| **Public URL** | No | The `r2.dev` address or custom domain, if the bucket has public access turned on. Leave it empty for a private bucket. |
| **Active** | No | Switches this driver on. |

Files are served through your site with an enrolment check, whether the bucket is public or private.

## Connect Cloudflare R2

::: steps
1. In WordPress, go to **Settings → Integrations → Video & storage**, then click **File storage** in the sidebar.
2. On the **Cloudflare R2** card, click the edit icon.
3. In **Cloudflare R2 settings**, enter the **Account ID**, **Bucket**, **Access Key ID** and **Secret Access Key**.
4. Optional: enter a **Public URL**. Leave it empty for a private bucket.
5. Click **Save**, then switch on the **Cloudflare R2** card.
:::

::: todo Screenshot to add
**What:** The **Cloudflare R2** card switched on, with the **Configured** label.

**How to get there:** Settings → Integrations → Video & storage → File storage, after saving the R2 credentials and switching the card on.

**Save as:** `docs/public/images/integrations/cloudflare-r2-02-configured.jpg` (1440×900 window, JPG)

**Then:** replace this box with:
`![The Cloudflare R2 card switched on and configured](/images/integrations/cloudflare-r2-02-configured.jpg)`
:::

## Attach a file to a lesson

Open a lesson in the lesson builder, add an **Attach File** block, and choose the file. The file stays in the bucket. Learners who are enrolled can download it from the lesson.

::: todo Screenshot to add
**What:** The **Attach File** block in the lesson builder with a file from Cloudflare R2 attached.

**How to get there:** Open a lesson in the lesson builder → add an **Attach File** block → upload a small PDF to R2.

**Save as:** `docs/public/images/integrations/cloudflare-r2-03-attach-file.jpg` (1440×900 window, JPG)

**Then:** replace this box with:
`![An Attach File block with a file stored in Cloudflare R2](/images/integrations/cloudflare-r2-03-attach-file.jpg)`
:::

Uploads from your site go in a single request, so PHP's upload limit on your host applies to each file.

## Messages you may see

- **"Cloudflare rejected the request (403) — check the access key, the secret and that the token covers this bucket."** Check the **Access Key ID** and **Secret Access Key**, and that the token has **Object Read & Write** on this bucket.

## Related

- [Video & storage](/integrations/video-storage) for the other storage providers and the upload settings.
- [Cloudflare Stream](/integrations/cloudflare-stream) for lesson videos.
