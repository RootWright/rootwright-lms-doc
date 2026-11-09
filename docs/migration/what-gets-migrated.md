---
title: What the RootWright LMS migrator brings across
description: "Every course, lesson, quiz, question type, student, order and file the RootWright LMS migrator moves from LearnDash, Tutor LMS, LearnPress and others."
plan: Free
tested_with: RootWright LMS 1.0.0 (Free), 1.0.0 (Pro), Migrator 1.0.0
last_verified: 2026-11-09
---

# What the RootWright LMS migrator brings across

The RootWright LMS migrator moves courses, modules, lessons, quizzes and assignments, students with their progress and results, reviews, announcements, instructors, and orders from Academy LMS, LearnDash, LearnPress, LifterLMS, MasterStudy, Masteriyo and Tutor LMS. Certificates, LearnDash groups, LifterLMS memberships and the answers inside quiz attempts do not come across. This page lists the details.

For the steps, see [How to migrate to RootWright LMS](/migration/migrate-to-rootwright).

## What comes across

| What | Details |
|---|---|
| **Courses** | Title, description, price, level, categories, tags, cover image, instructors and course details. A free course stays free. |
| **Curriculum** | Modules, lessons, quizzes with their questions, and assignments, in the original order. |
| **Media** | Cover images, course intro videos, lesson videos, lesson downloads, assignment files, question pictures and files students handed in. |
| **Students** | Every enrolled student gets a RootWright LMS student profile, with the original enrollment date and status. |
| **Progress** | Completed lessons, quiz attempts with their scores and results, and assignment submissions with marks and instructor feedback. |
| **Reviews** | Course reviews and ratings, including LearnDash's own and its Ratings, Reviews and Feedback add-on. |
| **Announcements** | Course announcements, as **drafts** you publish when you choose. |
| **Instructors** | Course instructors become RootWright LMS instructors, including approved instructors with no course yet. Pending or rejected instructor applications arrive as applications to review. Job title, photo, phone and address come across where the old LMS kept them. |
| **Orders and payments** | Each LMS's own orders, payments and refunds, and the WooCommerce or Easy Digital Downloads orders that sold your courses. Each enrollment is linked to the order that paid for it. |

## What does not come across

- **Certificates** and certificate templates. Set up certificates again in [Certificate designs and studio](/certificates/certificate-studio).
- **LearnDash groups.** Their students are enrolled in each course directly; the group and its leaders are not created.
- **LifterLMS memberships.** A student who had access only through a membership is not enrolled.
- **The answers inside a quiz attempt.** Each attempt's score, result and dates come across, not what the student ticked for each question.
- **Live sessions:** Google Meet and Zoom meetings.
- **LearnPress H5P items**, and **MasterStudy and Masteriyo assignments**.
- **Course bundles** as bundles. Their courses and students come across.
- **Video poster images**, and a question's own video.
- **Store products.** WooCommerce and EDD products stay as they are; the link between the product and the course is kept.

The scan screen counts the items in this list that your site has, before anything is written.

## How each LMS's structure maps

RootWright LMS courses have modules, and lessons inside modules. Quizzes and assignments are lesson types.

| LMS | Becomes a module | Becomes a lesson |
|---|---|---|
| Academy LMS | Curriculum topic | Lesson, quiz, assignment |
| LearnDash | **Lesson** | **Topic**, quiz |
| LearnPress | Section | Lesson, quiz |
| LifterLMS | Section | Lesson, quiz |
| MasterStudy LMS | Curriculum section | Lesson, quiz |
| Masteriyo LMS | Section | Lesson, quiz |
| Tutor LMS | Topic | Lesson, quiz, assignment |

### LearnDash

LearnDash nests one level deeper than RootWright LMS, so a LearnDash **lesson** becomes a **module** and its **topics** become the lessons inside it. If the LearnDash lesson has its own content, that content becomes the first lesson of the module. Quizzes attached to the whole course go into a final module, so none are lost. LearnDash section headings are not migrated, because the lessons already become modules.

Students come from direct course access, from expired access (they keep their record), and from membership of a group the course belongs to, judged by LearnDash's own rules for group end dates and access days. Test-mode LearnDash payments are not sales and are skipped.

### Academy LMS

By default Academy LMS stores lessons outside WordPress posts. Those lessons are always created fresh, even in a **Complete migration**, so their URLs change; quizzes and assignments keep theirs. The course price comes from its linked WooCommerce product or EDD download. A course with no curriculum record migrates as an empty course, and the scan counts these first.

### Courses with no modules

When a course has no sections (some MasterStudy and Academy courses), its lessons attach straight to the course. A flat course stays flat.

## Students and access

- Unpaid, cancelled, refunded and expired enrollments **never** get access in RootWright LMS. Expiry is worked out the way each LMS works it out.
- A student who **finished** a course whose access has since run out stays completed, so they keep the record that they finished.
- Dates are converted to your site's time zone.
- No emails go out during the migration, so students are not welcomed again or told a course "reopened".

## Quiz questions

Questions are mapped to the closest RootWright LMS [question type](/quizzes/question-types). Five types need **RootWright LMS Pro**. Without Pro, those questions are skipped and the scan says so: `1 "ordering" question needs RootWright LMS Pro and will be skipped.`

| RootWright LMS type | Plan | Comes from |
|---|---|---|
| Single choice | Free | Single choice in every LMS |
| Multiple choice | Free | Multiple choice in every LMS |
| True / False | Free | True/false in every LMS except LearnDash |
| Written answer | Free | Short answer and essay or open-ended questions |
| Fill in the blanks | Free | Fill-in-the-blank questions in every LMS except Masteriyo |
| Image choice | Pro | LifterLMS picture choice |
| Put in order | Pro | Ordering or sorting questions (not Academy LMS) |
| Match the pairs | Pro | Matching questions, including image matching |
| Rating scale | Pro | LearnDash assessment and LifterLMS scale questions |
| Keywords | Pro | MasterStudy keywords questions |

What happens to the rest:

- **Questions with no equivalent are skipped and logged**, never guessed at. Examples: Tutor LMS draw image, pin image, puzzle and H5P questions; LifterLMS upload and code questions.
- **Picture questions keep their pictures.** A "label this image" question arrives as a matching question with the picture on the left.
- **A fill-in-the-blanks or keywords question with no answer key becomes a written answer** that the instructor marks, so students are not scored zero on it.
- **A matching question with fewer than two pairs, or an ordering question with fewer than two items, is skipped**, because it could never be marked right.
- Short answer and essay questions are marked by hand in RootWright LMS. A LearnDash model answer is kept as the explanation, which students do not see during the attempt.

## Files and media

Files are never copied. Your old LMS already stored them on your site, so RootWright LMS links to the same files.

| What | Where it goes in RootWright LMS |
|---|---|
| Course intro video (YouTube, Vimeo or a file) | The course video |
| Lesson downloads | The lesson's **Resources** |
| Course-wide downloads | The **first lesson's** Resources, because RootWright LMS keeps downloads on lessons |
| Audio lessons (LifterLMS, MasterStudy) | A link in the lesson's Resources |
| Files students handed in | The student's submission |

## Lessons that were drafts

RootWright LMS lessons have no draft state. A lesson that was unpublished in your old LMS is migrated and logged as a warning, and enrolled students can open it. Remove it from the course if it is not ready. A **Complete migration** leaves the post's own status alone, so undoing it gives your old LMS its draft back.

## What Undo removes

**Undo this migration** removes everything the migration created: courses or converted courses, lessons, questions, prices, instructor links, enrollments, progress, quiz attempts, submissions, orders and the file links it added. Categories and tags it created are removed unless another course still uses them. Anyone it made an instructor goes back to what they were before.

## Frequently asked questions

### Does the RootWright LMS migrator copy certificates?

No. Certificates and certificate templates are not migrated. Set them up in RootWright LMS after the migration.

### Will LearnDash groups be migrated to RootWright LMS?

The group itself is not, but every student who had access to a course through a LearnDash group is enrolled in that course directly.

### What happens to WooCommerce products when I migrate to RootWright LMS?

They stay as they are. The migrator keeps the link between each product and its course, and brings across the WooCommerce or EDD orders that sold your courses.

## Related

- [How to migrate to RootWright LMS](/migration/migrate-to-rootwright)
- [Question types](/quizzes/question-types)
- [Orders and subscriptions](/commerce/orders-and-subscriptions)
- [Certificate designs and studio](/certificates/certificate-studio)
