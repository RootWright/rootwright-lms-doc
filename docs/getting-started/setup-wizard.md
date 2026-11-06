---
title: How to run the RootWright LMS setup wizard
description: "Run the RootWright LMS setup wizard: choose what you are setting up, create or reuse the required pages, set the essentials, add payments and a first course."
plan: Free
tested_with: RootWright LMS 1.0.0 (Free), 1.0.0 (Pro)
last_verified: 2026-11-03
---

# How to run the RootWright LMS setup wizard

The setup wizard walks you through the first settings of RootWright LMS in six short steps. It takes about five minutes. Every choice has a sensible default, and you can change any of it later in **Settings**.

The wizard opens after you activate RootWright LMS.

## Before you start

- RootWright LMS Free is active. See [Install RootWright LMS Free](/getting-started/install-free).
- You can sign in as an administrator.

## The six steps

| Step | What it does |
|---|---|
| **1. Welcome** | Asks what you are setting up. Your answer picks the defaults for the rest of the wizard. |
| **2. Pages** | Creates the pages RootWright LMS needs, or uses the pages you already have. |
| **3. Essentials** | Sets the currency, sign-up, sign-in screens and support email. |
| **4. Payments** | Optional. Connects the store you already use, or keeps the site free for now. |
| **5. First course** | Optional. Creates a course from a title. |
| **6. Done** | Shows what the wizard set up and where to go next. |

The top of the wizard shows the current step and the time left. Click **Save & exit** at any point to leave. Your place is saved, and you can pick up from the dashboard.

## Step 1: Welcome

::: steps
1. Under **What are you setting up?**, choose one option:
   - **Sell courses**: paid courses, bundles and subscriptions. Payments are switched on, and sign-up is open.
   - **Free courses for a community**: anyone can sign up and learn.
   - **Train a team or members**: only people you add can take courses.
2. Click **Start setup**.
:::

![The Welcome step with Sell courses selected](/images/getting-started/setup-wizard-02-welcome.jpg)

*Step 1. **Sell courses** shows what it switches on: **Payments step on** and **Open sign-up**.*

The right-hand panel lists what the wizard will do. It also says that pages and settings you already have are left exactly as they are.

Click **Skip for now** to leave the wizard. You can pick up where you left off from the dashboard.

## Step 2: Pages

The Pages step shows a plan before anything changes. It lists each page RootWright LMS uses, the address it gets, and whether it reuses one of your pages.

![The Pages step with the plan for each page](/images/getting-started/setup-wizard-01-pages.jpg)

*Step 2 of the wizard. Each row shows a page, its address, and which existing page it will use.*

Two pages are required:

- **Dashboard**: where students and instructors land after signing in. Address: `/dashboard`.
- **Course catalogue**: the public list of courses. Address: `/course-catalogue`.

The other pages are optional. They include **Sign in**, **Create account**, **Reset password**, **Verify a certificate**, **Certificate**, **Student profiles**, **Instructor profiles** and **Bundles**.

::: steps
1. Check the plan. A page marked **Using your page** already exists and keeps its content.
2. Click **Create 1 page** to create any page the plan marks as new. The button shows how many pages it will create.
3. To pick pages yourself, click **Choose pages myself**.
:::

In **Choose pages myself**, each page has a **Change** link. **Change** switches the row to a page picker: leave it on the suggested name to create a new page, or pick a page you already have. **Checkout** is not included until you tick it. Click **Done choosing** to close the list.

![The Choose pages myself view with the Bundles picker open](/images/getting-started/setup-wizard-03-choose-pages.jpg)

*After **Change** on **Bundles**, the row reads "New page · Created when you press the button above". Pick your existing page in the menu to keep using it.*

::: warning Check each row before you continue
A row you opened with **Change** is set to create a new page. If you only wanted to look, pick your existing page again in the menu, or leave the wizard and start it again.
:::

Each page holds one RootWright LMS block. Do not remove the block from a page, or the page stops working.

## Step 3: Essentials

The Essentials step sets four things:

- **Currency and locale**: the currency and how prices are shown.
- **Sign-up**: whether people can create their own student accounts.
- **Sign-in screens**: whether RootWright LMS replaces the WordPress login screen.
- **Support email**: optional. The wizard keeps it with your settings for your records. Learners don't see it anywhere yet.

![The Essentials step](/images/getting-started/setup-wizard-04-essentials.jpg)

*Step 3. The **What learners see** panel previews the choice you are on: **Price**, **Sign-up** or **Sign-in**.*

The defaults follow your Welcome choice. With **Sell courses**, **Let students create their own accounts** is on, with the note "On because you're selling courses". Click **Save and continue** to save only what you changed, or **Skip this step** to keep your current settings.

These match the screens in **Settings → Currency & locale**, **Settings → Students** and **Settings → Site & pages**. Change them there later if you need to.

## Step 4: Payments

The Payments step is optional. You can use the store you already have, or keep the site free for now.

![The Payments step with WooCommerce found on the site](/images/getting-started/setup-wizard-05-payments.jpg)

*Step 4. The wizard detects the store plugins on your site and recommends the one it finds.*

The choices are:

- **Use** a store plugin that is active on the site, such as **WooCommerce**. Each paid course gets a product in that store, and buying it enrolls the student.
- **Rootwright checkout with Stripe or PayPal** (Pro): RootWright LMS's own checkout page, using API keys from your Stripe or PayPal dashboard.
- **I'll only offer free courses for now**: courses stay free until you give one a price.

Nothing is charged or created until you price a course.

If you skip payments, you can connect a store later in **Settings → Checkout & stores** and **Settings → Payment gateways**. See [Payment gateways](/commerce/payment-gateways).

## Step 5: First course

The First course step is optional. A title is enough to start. The course stays a draft that only you can see until you publish it.

![The First course step with a title entered](/images/getting-started/setup-wizard-06-first-course.jpg)

*Step 5. Choose **Start from scratch** or **Draft it with AI** (Pro), then click **Create draft**.*

- **Start from scratch** creates the draft. Open it in the course builder from the next screen to add sections and lessons.
- **Draft it with AI** plans the course and writes its lessons from your description. See [Generate a course with AI](/courses/generate-with-ai).

You can build the course later from **RootWright LMS → Courses**. See [Add a course](/courses/add-a-course).

## Step 6: Done

The Done step lists what the wizard did, with a link for each item, and a preview of your course catalogue.

![The Done step](/images/getting-started/setup-wizard-07-done.jpg)

*Step 6. **What setup did** counts the finished items. Steps you skipped are listed too, such as "Payments not chosen yet".*

**Next up** suggests what to do next: create your first course, customise your emails, or add an instructor. Click **Go to my dashboard** to finish. You can run setup again at any time. It never overwrites what you have.

## After the wizard

Until setup is finished, the dashboard shows a **Getting started** checklist. It lists the remaining setup tasks, with a progress bar. Click **Continue** to open the next task. Once you finish the wizard, the dashboard shows your school's figures instead.

![The dashboard Getting started checklist](/images/getting-started/dashboard-getting-started.jpg)

*The dashboard shows a Getting started checklist with the next task.*

## Messages you may see

- **A reminder on the admin screens**: the wizard is not finished and the required pages are still missing. Finish step 2 to remove it.
- **A reminder on the dashboard**: you left the wizard with **Skip for now**. Pick it up again from the dashboard. If you choose **Not now** on the reminder, it stays hidden for seven days.

## Related

- [Install RootWright LMS Free](/getting-started/install-free)
- [Dashboard tour](/getting-started/dashboard-tour)
- [Settings overview](/settings/overview)
