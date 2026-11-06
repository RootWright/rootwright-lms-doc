---
title: How to add instructors and review publish requests in RootWright LMS
description: "Add instructors in RootWright LMS from an existing account, a new account or a CSV file, see their workload, and approve courses they submit for publishing."
plan: Free + Pro
tested_with: RootWright LMS 1.0.0 (Free), 1.0.0 (Pro)
last_verified: 2026-11-03
---

# How to add instructors and review publish requests in RootWright LMS

The **Instructors** screen lists who teaches at your school and how much each of them has on right now. Add instructors under **People → Instructors**. When publishing needs approval, their courses wait for you under **Publish requests**.

![The Instructors screen](/images/students/instructors-01-list.jpg)

*People → Instructors. Filter by **Status** or **Course**, sort by **Most to grade**, and switch between list and grid views.*

## Add an instructor

::: steps
1. Go to **People → Instructors** and click **Add instructor**. The **Add people** drawer opens with **Instructor** selected.
2. Choose how to add them:
   - **Existing WordPress user**: search by name, email or username.
   - **New account**: enter **Email**, **First name** and **Last name**. RootWright LMS creates their WordPress login.
   - **Import CSV**: upload a `.csv` file, one person per row, up to 2,000 rows.
3. Leave **Send welcome email** on to send the "Welcome — new instructor" email. **Edit template** opens it.
4. Click **Add**. The button shows how many instructors will be added.
:::

![The Add people drawer with Instructor selected](/images/students/instructors-02-add.jpg)

*The **Add people** drawer. Switch **Add as** to **Student** to add students instead.*

## The instructor list

- **Search by name or email** finds an instructor.
- **+ Status** and **+ Course** filter the list.
- The count reads, for example, "3 instructors · 2 active".
- **To grade** counts submissions waiting on their courses. **Students** counts everyone enrolled on a course they teach, in any role.

## Publish requests

When **Who can publish a course** is set to **Require admin approval** under **Settings → Courses & lessons → Publishing**, an instructor's **Publish** submits the course instead.

![The Publish requests screen with nothing waiting](/images/students/publish-requests-01.jpg)

*People → Instructors → Publish requests.*

::: steps
1. Go to **People → Instructors → Publish requests**.
2. Use **Open the course to review it** to check the course.
3. Click **Publish** to make it live, or **Decline** to send it back to the instructor as a draft. When declining, enter a **Reason**.
:::

Click **Refresh** to check for new requests. An individual course can override the site-wide publishing rule.

## Related

- [Instructor applications](/students/instructor-applications)
- [Roles and permissions](/ai/roles-and-permissions)
- [Courses & lessons settings](/settings/courses-and-lessons)
- [Co-instructors and course team](/courses/course-team)
