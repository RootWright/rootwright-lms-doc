---
title: How to connect Zoom to RootWright LMS
description: "Connect Zoom to RootWright LMS Pro: create a Server-to-Server OAuth app, paste its Account ID, Client ID and Client secret, enable Zoom, then add live meetings to lessons."
plan: Pro
tested_with: RootWright LMS 1.0.0 (Free), 1.0.0 (Pro)
last_verified: 2026-11-03
---

# How to connect Zoom to RootWright LMS

Zoom runs live classes inside a lesson. RootWright LMS Pro creates a Zoom meeting from the lesson builder and gives students a join link. You create the meeting once, from the lesson, and Zoom holds it.

::: pro
Live meetings require RootWright LMS Pro.
:::

## Before you start

- A Zoom account that can create a **Server-to-Server OAuth** app at `marketplace.zoom.us`.
- Permission to add scopes to that app. Zoom limits the scopes an app can request to the permissions of the account that creates it.

![The Zoom card on the Meetings screen, not configured](/images/integrations/zoom-01-meetings-zoom.jpg)

*Settings → Integrations → Meetings. Zoom shows **Not configured** until you enter the three values and turn it on.*

## Create the Zoom app

::: steps
1. Sign in to the Zoom App Marketplace and create an app of type **Server-to-Server OAuth**.
2. On the app's **Scopes** page, add the permissions RootWright LMS lists under **Permissions your Zoom app needs**: **Meetings: create, update and delete**, **Meeting registrants: add, list and update their status**, **Cloud recordings: read** and **Users: read**. If one is missing, Zoom's error names it.
3. Activate the app.
4. Copy the **Account ID**, **Client ID** and **Client secret** from the app's credentials. You need all three.
:::

## Connect Zoom to the site

::: steps
1. In WordPress, go to **Settings → Integrations → Meetings**.
2. In the Zoom card, paste the **Account ID**, **Client ID** and **Client secret**.
3. Click **Save**.
4. Switch on **Enable Zoom**, and save again.
:::

The **Zoom account** section below the fields fills in once the three IDs are saved. Until then it reads "Save the three ids above first." Cloud recording and personal links for enrolled learners need a paid Zoom plan.

Zoom becomes available in the lesson builder only when the card is enabled and all three values are saved. If you leave one empty, Zoom does not appear in the provider list.

::: todo Screenshot to add
**What:** The Zoom card on **Settings → Integrations → Meetings** with **Enable Zoom** on and the three fields filled in. Hide the Client secret.

**How to get there:** Settings → Integrations → Meetings, after you save the Account ID, Client ID and Client secret and switch on **Enable Zoom**. Blur or crop out the Client secret.

**Save as:** `docs/public/images/integrations/zoom-02-enabled.jpg` (1440×900 window, JPG)

**Then:** replace this box with:
`![The Zoom card with Enable Zoom on and the three IDs saved](/images/integrations/zoom-02-enabled.jpg)`
:::

## Add a meeting to a lesson

::: steps
1. Open the lesson in the lesson builder. Click **Add a block**, then **Live Meeting**.
2. Choose **Zoom** as the provider. The Live Meeting block shows Zoom only after Zoom is enabled and all three values are saved.
3. Enter the topic, the start time and the duration. Zoom keeps the first 200 characters of the topic. RootWright LMS sends the start time to Zoom in UTC. The duration is 60 minutes by default.
4. Leave the block in place. The meeting is attached to the lesson as soon as it is created, so you do not need to click **Save lesson** for it.
:::

::: todo Screenshot to add
**What:** The **Live Meeting** block in the lesson builder with **Zoom** selected, showing the topic, start time and duration fields.

**How to get there:** Open any lesson in the lesson builder → **Add a block** → **Live Meeting** → choose **Zoom**. Show the topic, start time and duration fields before you create the meeting.

**Save as:** `docs/public/images/integrations/zoom-03-live-meeting-block.jpg` (1440×900 window, JPG)

**Then:** replace this box with:
`![The Live Meeting block with Zoom selected](/images/integrations/zoom-03-live-meeting-block.jpg)`
:::

Students see the join link in the lesson. Zoom's host start link is not shown in the lesson, so start the meeting from your Zoom account.

Each lesson holds one meeting. If you try to create a second one, RootWright LMS stops and shows the message below. To change the meeting's topic, time, duration or options, click **Edit** in the **Live Meeting** block, then **Save changes**.

## Zoom meeting defaults

Every new Zoom meeting starts with the defaults under **Settings → Integrations → Meetings → Zoom meeting defaults**. A lesson can change them for its own meeting, when you create it or later with **Edit** in the **Live Meeting** block. The defaults are greyed out until Zoom is set up.

![The Zoom meeting defaults section](/images/integrations/zoom-05-meeting-defaults.jpg)

*Settings → Integrations → Meetings → Zoom meeting defaults, greyed out on a site where Zoom is not set up yet.*

| Setting | What it does | Default |
|---|---|---|
| **Record meetings** | **Off**, **Zoom cloud** or **Host's computer**. Recording starts when the host joins. **Host's computer** keeps the file on the teacher's machine, so learners can't watch it on your site. | Off |
| **Show the recording in the lesson** | When Zoom finishes a cloud recording, enrolled learners see **Watch recording** under the meeting. It is checked every hour for a day after the meeting ends. | On |
| **Who can join** | **Enrolled learners only**: each learner gets a personal link the first time they press **Join**, and someone who leaves the course can't use theirs. Needs a paid Zoom plan. **Anyone with the link**: one link for the lesson. | Anyone with the link |
| **Waiting room** | The host lets each person in. | On |
| **Mute people when they join** | Everyone joins muted. | On |
| **Start with the host's camera on** | The host's video is on when the meeting starts. | Off |

RootWright LMS always creates a scheduled meeting, sends the start time in UTC, and keeps join before host off, so students wait until the host starts the meeting.

## Delete a meeting

Delete the meeting from the **Live Meeting** block in the lesson builder.

::: todo Screenshot to add
**What:** The **Live Meeting** block with an existing Zoom meeting, showing where the delete control is.

**How to get there:** The same **Live Meeting** block after you create a test meeting. Make sure the delete control is in the frame.

**Save as:** `docs/public/images/integrations/zoom-04-meeting-created.jpg` (1440×900 window, JPG)

**Then:** replace this box with:
`![A lesson with a Zoom meeting attached](/images/integrations/zoom-04-meeting-created.jpg)`
:::

- RootWright LMS deletes the meeting from Zoom and removes it from the lesson.
- If Zoom refuses the delete, for example because the credentials have expired, RootWright LMS still removes the meeting from the lesson. The meeting stays in Zoom. Delete it in the Zoom dashboard too.
- Deleting a **lesson** removes the meeting from the lesson only. It does not delete the meeting in Zoom. Delete the meeting from the lesson before you delete the lesson.

## Messages you may see

- **"Zoom authentication failed — check the Account ID, Client ID and Secret in Settings → Integrations."** Copy the three values again from the Zoom app. Check that the app is active.
- **"Could not create the Zoom meeting: …"** Zoom returned an error. The text after the colon is Zoom's own message. Check the topic, the start time and the app's scopes.
- **"Zoom did not return a join link."** Try again. If it happens again, check the app in Zoom's dashboard.
- **"This lesson already has a meeting. Delete it before creating another."** Delete the existing meeting, then create the new one.
- **"No meeting provider is configured. An administrator can connect Zoom or Google Meet under RootWright LMS → Settings → Integrations."** This notice replaces the Live Meeting form until Zoom or Google Meet is enabled and all its values are saved.
- **"That meeting provider is not configured on this site."** Save all three Zoom values and switch on **Enable Zoom**.
- **"A topic and a valid start time are required."** Enter a topic and pick a start time.

## Related

- [Google Meet](/integrations/google-meet) for the other live class provider.
- [Video & storage](/integrations/video-storage) for lesson videos.
