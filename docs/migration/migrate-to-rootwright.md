---
title: How to migrate to RootWright LMS from another LMS
description: "Move courses, lessons, quizzes, students, progress and orders into RootWright LMS from LearnDash, Tutor LMS, LearnPress, LifterLMS and more, with undo."
plan: Free
tested_with: RootWright LMS 1.0.0 (Free), 1.0.0 (Pro), Migrator 1.0.0
last_verified: 2026-11-09
---

# How to migrate to RootWright LMS from another LMS

To migrate to RootWright LMS, install the **RootWright LMS — Migrator** add-on and go to **Settings → Advanced → Migrate**. Pick the LMS you are leaving, check what the scan found, choose **Copy into RootWright LMS** or **Complete migration**, and start. Courses, lessons, quizzes, students, progress and orders come across, and you can undo the whole migration from the same screen.

## Before you start

- **RootWright LMS** is installed and active. The migrator is a separate add-on, **RootWright LMS — Migrator**, that needs it. It requires WordPress 7.1.4 or later and PHP 8.2.
- You are signed in as an administrator. Only administrators can open Settings.
- **Back up your database.** The migrate screen says it too: the migration writes to your live site.
- Your old LMS plugin does **not** need to be active. The migrator reads its data straight from the database, so you can deactivate it first. Do not delete its data.
- Five question types (image choice, ordering, matching, rating scale and keywords) need **RootWright LMS Pro**. Without Pro they are skipped and the scan tells you how many. See [What gets migrated](/migration/what-gets-migrated#quiz-questions).

## Which LMS plugins can I migrate from?

The RootWright LMS migrator moves content from seven LMS plugins. Version 1.0.0 was tested with these versions:

| LMS plugin | Tested version |
|---|---|
| Academy LMS | 3.8.5 |
| LearnDash | 5.2.2.1 (also 4.25.6) |
| LearnPress | 4.4.13 |
| LifterLMS | 11.0.0 |
| MasterStudy LMS | 3.7.58 |
| Masteriyo LMS | 3.5.0 |
| Tutor LMS | 4.2.0 |

Only the plugins whose data is on your site appear on the migrate screen.

## Step 1: Choose the LMS you are leaving

::: steps
1. In the RootWright LMS admin, go to **Settings** and click **Migrate** under **Advanced**.
2. Under **Migrate to RootWright LMS**, click the card for your old LMS, for example **Tutor LMS** or **LearnDash**. Each card reads **Scan this site's … content**.
:::

![The Migrate screen with a card for each LMS found on the site and a Your last migration card at the bottom](/images/migration/migrate-01-choose-source.jpg)

*Settings → Advanced → Migrate. After a migration has run, a **Your last migration** card lets you open its log or undo it.*

If no supported LMS data is on the site, the screen shows **Nothing to migrate** instead of the cards.

## Step 2: Check what the scan found

The scan reads your old LMS and writes nothing. The screen is titled **{LMS} — what we found** and shows six counts: **Courses**, **Lessons**, **Quizzes**, **Questions**, **Students** and **Reviews**.

Read the **Before you start** box under the counts. It lists everything that will not come across exactly, before you commit to anything. For example:

- `1 "scale" question has no equivalent in RootWright LMS and will be skipped.`
- `1 Tutor LMS course bundle is not migrated as a bundle; its courses and their students are.`

![The Tutor LMS scan results with six counts and a Before you start box listing skipped questions, Zoom meetings and a course bundle](/images/migration/migrate-02-scan-results.jpg)

*A Tutor LMS scan. The **Before you start** box only appears when there is something to warn about.*

## Step 3: Choose which courses to migrate

By default every course is migrated. The **Which courses?** row says **All 2 courses** (or however many you have) until you pick some.

::: steps
1. Click **Which courses?** to open the course list.
2. Tick the courses you want. The label changes to, for example, **1 of 2 selected**.
3. Use **Select all** and **Clear** to change many at once. With more than eight courses, a **Filter courses** search box appears, and **Select all** becomes **Select these** to select only the filtered courses.
4. Click **Choose how to migrate**.
:::

![The Which courses? list open, with one of two courses ticked and the label reading 1 of 2 selected](/images/migration/migrate-03-pick-courses.jpg)

::: tip
Leave every course unticked to migrate all of them. On a site with many courses the list shows only the first part and says so; unticked still means all.
:::

## Step 4: Choose how to migrate

The **How should we migrate?** screen has two options. Both bring across the same content. They differ in what happens to your existing courses.

| | **Copy into RootWright LMS** (Recommended) | **Complete migration** |
|---|---|---|
| What it does | Creates brand-new RootWright LMS courses, lessons and quizzes. | Converts your existing courses into RootWright LMS courses. |
| Your old LMS | Untouched. Its courses keep working. | Can no longer see or edit the converted courses. |
| Course and lesson URLs | The copies get new URLs. Old links keep pointing at the old plugin. | Every URL stays exactly as it is today. |
| Copies | Two until you delete the old ones. | One. |
| Undo | Yes, completely. | Yes, from the same screen. |

![The two migration options side by side, with Copy into RootWright LMS selected and marked Recommended](/images/migration/migrate-04-choose-mode.jpg)

Choose **Copy into RootWright LMS** to try RootWright LMS next to your current setup and compare. Choose **Complete migration** when you are ready to switch and want to keep your URLs and search rankings.

Click the green button to start. It names the option and, if you picked courses, how many, for example **Copy into RootWright LMS — 1 courses**.

## Step 5: Let it run

The run screen shows a progress bar, how many courses are done, and the stage it is on: **Course details**, **Lessons and quizzes**, **Students**, **Student progress**, **Quiz attempts and assignments**, **Reviews**, **Announcements** and **Recalculating progress** for each course, then **Orders and payments**, **WooCommerce and EDD orders** and **Instructors and applications** once at the end.

- **You can close the tab.** The migration saves its place after every record and carries on in the background through WP-Cron. Open **Settings → Migrate** again and it picks up where it is.
- **Pause** stops it until you click **Resume**.
- **Stop** ends it early. Everything migrated so far is kept.
- **No emails are sent.** Students are not welcomed again to courses they joined years ago, and migrated announcements arrive as drafts.

The migration works in small steps that stay inside your host's time limit, so a large site on cheap hosting does not time out. A student who enrolls while it runs is not missed.

## Step 6: Check the log

When the run finishes, the title reads **Copy into RootWright LMS — finished** (or **Complete migration — finished**) and the counts show what came across: courses, lessons, questions, students, progress rows, quiz and assignment results, reviews, announcements, orders, and anything not migrated.

![A finished migration: 100%, 2 of 2 courses, counts for each kind of record, and a log with skipped and warning lines](/images/migration/migrate-05-finished-run.jpg)

*Use **All**, **Skip**, **Warn** and **Error** to filter the log. The number next to each filter is how many lines it has.*

Read the **Skip** and **Warn** lines before you switch off your old LMS, as the screen asks: **Migration finished. Check the skipped and warning lines above before you deactivate your old LMS.** Common ones:

- **A question type was skipped.** It has no equivalent in RootWright LMS, or it needs Pro.
- **A draft lesson is now open.** RootWright LMS lessons have no draft state, so a lesson that was unpublished in your old LMS can be opened by enrolled students. Remove it from the course if it is not ready.

Then open a few migrated courses in **Teaching → Courses** and check them as a student would.

## Undo a migration

::: steps
1. Go to **Settings → Advanced → Migrate**.
2. Click **Your last migration**, then **Undo this migration**.
3. Confirm. Everything the migration created is removed, **including any enrollments or progress recorded in RootWright LMS since it ran**. Your original courses are not affected.
:::

Undoing a **Complete migration** turns the converted courses back into your old LMS's courses. A running migration must be stopped first.

## Switch over to RootWright LMS

Once the log is clean and the courses look right:

1. Deactivate your old LMS plugin. With **Copy into RootWright LMS**, your old course pages stop working at this point, so redirect them to the new ones.
2. Check your menus, landing pages and checkout links point at RootWright LMS courses.
3. Keep the migration record until you are sure. Undo only works while it exists.

## Troubleshooting

### There is no Migrate item under Settings

The **RootWright LMS — Migrator** add-on is not active, or RootWright LMS is older than the add-on needs. Activate the add-on on the **Plugins** screen and reload the RootWright LMS admin.

### "Nothing to migrate"

No Academy LMS, Tutor LMS, LearnDash, LearnPress, LifterLMS, MasterStudy or Masteriyo data was found in the database. If you deleted the old plugin's data when you uninstalled it, there is nothing left to read.

### "A migration is already in progress. Finish or cancel it first."

Only one migration runs at a time. Open **Settings → Migrate**: it jumps to the running migration, where you can wait for it or click **Stop**.

### "Stop the migration before rolling it back."

You tried to undo a migration that is still running. Click **Stop**, then **Undo this migration**.

### Some questions are missing

They were skipped. The **Skip** filter in the log says which and why. If the reason is that the type needs RootWright LMS Pro, activate Pro and run the migration again.

## Frequently asked questions

### Will my current LMS keep working during and after the migration?

With **Copy into RootWright LMS**, yes. RootWright LMS does not change anything in your current LMS. With **Complete migration**, your old LMS can no longer see the converted courses; **Undo this migration** gives them back.

### Can I run the RootWright LMS migration more than once?

Yes. A second run updates what the first one created instead of making duplicates. To switch between **Copy into RootWright LMS** and **Complete migration**, undo the earlier one first.

### Are my images, videos and files copied?

No, and they don't need to be. Your old LMS already stored them on your site, so RootWright LMS links to the same files.

### Do students lose their progress when I migrate to RootWright LMS?

No. Enrollments keep their original dates and status, and lesson progress, quiz attempts, assignment submissions and grades come across. Students who had not paid, had cancelled or whose access had expired do not get access.

### Does the migration need RootWright LMS Pro?

No. The migrator works with RootWright LMS Free. Pro is needed for five question types and for payment transactions to be recorded with their orders.

## Related

- [What gets migrated](/migration/what-gets-migrated): everything that comes across from each LMS, and what does not.
- [Question types](/quizzes/question-types)
- [Install RootWright LMS Pro](/getting-started/install-pro)
- [Settings overview](/settings/overview)
