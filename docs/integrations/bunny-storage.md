---
title: How to store course files in Bunny.net Storage
description: "Attach course files in RootWright LMS Pro from a Bunny.net storage zone: enter the storage zone name, zone access key and region, optionally add a CDN hostname, then switch the driver on."
plan: Pro
tested_with: RootWright LMS 1.0.0 (Free), 1.0.0 (Pro)
last_verified: 2026-11-02
---

# How to store course files in Bunny.net Storage

Bunny.net Storage keeps the files you attach to lessons, such as PDFs, worksheets and slide decks. The files stay in your Bunny storage zone. RootWright LMS does not copy them onto your WordPress server.

This is separate from Bunny.net Stream, which hosts lesson videos. See [Bunny.net Stream](/integrations/bunny-stream) for videos.

::: pro
Bunny.net Storage is part of RootWright LMS Pro.
:::

## Before you start

- A Bunny.net **storage zone**, created in the Bunny dashboard at `panel.bunny.net/storage`.
- The zone's **Access Key**, the storage zone password shown under **FTP & API Access**. This is not your account API key.
- The region the storage zone was created in.
- Optional: a **pull zone** for the storage zone, if you want files served from Bunny's CDN.

## Connection fields

| Field | Required | What it does |
|---|---|---|
| **Storage Zone** | Yes | The name of your storage zone. |
| **Access Key** | Yes | The zone password. The field is a password field. |
| **Region** | No | The region the zone was created in. Choose the same region, or requests are rejected as if the key were wrong. The default is Falkenstein, DE. |
| **CDN Hostname** | No | A pull zone hostname, such as `my-zone.b-cdn.net`. Without one, files are still served through your site with an access check, but not from the CDN. |
| **Active** | No | Switches this driver on. |

Do not enter the storage endpoint that Bunny shows, such as `storage.bunnycdn.com/...`. That address only answers to an API key.

## Connect Bunny.net Storage

::: steps
1. In WordPress, go to **Settings → Integrations → Video & storage**, then click **File storage** in the sidebar.
2. On the **Bunny.net Storage** card, click the edit icon.
3. In **Bunny.net Storage settings**, enter the **Storage Zone** and **Access Key**.
4. Choose the **Region** the zone was created in.
5. Optional: enter the **CDN Hostname** of the pull zone.
6. Click **Save**, then switch on the **Bunny.net Storage** card.
:::

![The File storage screen with three storage providers, all not configured](/images/integrations/file-storage-01-providers.jpg)

*Settings → Integrations → Video & storage → File storage. Each card shows **Not configured** until its settings are saved.*

## Attach a file to a lesson

Open a lesson in the lesson builder, add an **Attach File** block, and choose the file. The file stays in the storage zone. Learners who are enrolled can download it from the lesson.

::: todo Screenshot to add
**What:** The **Attach File** block in the lesson builder with a file from Bunny.net Storage attached.

**How to get there:** Open a lesson in the lesson builder → add an **Attach File** block → upload a small PDF to Bunny.net Storage.

**Save as:** `docs/public/images/integrations/bunny-storage-02-attach-file.jpg` (1440×900 window, JPG)

**Then:** replace this box with:
`![An Attach File block with a file stored in Bunny.net Storage](/images/integrations/bunny-storage-02-attach-file.jpg)`
:::

## Messages you may see

- **"Bunny Storage is not configured."** The card is not switched on, or a required field is empty. Fill in the **Storage Zone** and **Access Key**, save, and switch the card on.

## Related

- [Video & storage](/integrations/video-storage) for the other storage providers and the upload settings.
- [Bunny.net Stream](/integrations/bunny-stream) for lesson videos.
