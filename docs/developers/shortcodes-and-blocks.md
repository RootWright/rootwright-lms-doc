---
title: RootWright LMS shortcodes and blocks
description: "The RootWright LMS shortcodes and Gutenberg blocks: the student and instructor dashboards, login and registration forms, course listing, single course, certificate and profile blocks, with their main settings."
plan: Free + Pro
tested_with: RootWright LMS 1.0.0 (Free), 1.0.0 (Pro)
last_verified: 2026-10-28
---

# RootWright LMS shortcodes and blocks

RootWright LMS includes shortcodes for the learner screens and Gutenberg blocks for building pages. Use blocks in the block editor. Use shortcodes in a classic editor, or where a block is not available.

## Shortcodes

| Shortcode | What it shows |
|---|---|
| `[rootwright_lms_dashboard]` | The learner or instructor dashboard. Shows the right one for the logged-in user. |
| `[rootwright_lms_student]` | The student dashboard. |
| `[rootwright_lms_instructor]` | The instructor dashboard. |
| `[rootwright_lms_login]` | The sign-in form. |
| `[rootwright_lms_register]` | The sign-up form. |
| `[rootwright_lms_lost_password]` | The password reset request form. |
| `[rootwright_lms_certificate_verify]` | The certificate verifier, where a visitor enters a certificate ID. |
| `[rootwright_lms_instructor_application]` | The form to apply to teach. |

## Blocks

| Block | What it does | Main settings |
|---|---|---|
| Course listing (`rootwright-lms/course-listing`) | A grid of courses with filters and pagination. | Layout (grid), courses per page (12), source, categories, tags, instructors, specific courses, and show search, filters and pagination. |
| Single course (`rootwright-lms/single-course`) | One course's details, with curriculum and instructor. | Course, layout (sidebar), sidebar position, heading level (h1), and show curriculum, description and instructor. |
| Dashboard (`rootwright-lms/dashboard`) | The role-aware dashboard. | None. |
| Certificate (`rootwright-lms/certificate`) | One certificate. | Issuance, preview template, and show actions. |
| Auth (`rootwright-lms/auth`) | A login screen. | Screen. |
| Certificate verify (`rootwright-lms/certificate-verify`) | The verifier as a block. | Design. |
| Profile listing (`rootwright-lms/profile-listing`) | A grid of instructor profiles. | Type (instructor), columns (4), profiles per page (12), show search, sort and bio, featured profile. |
| Checkout (`rootwright-lms-pro/checkout`) | The Pro checkout form. | Accent color, design. Pro. |

RootWright LMS also adds five block patterns in the **rootwright-lms** category.

## Example: a course grid in a page

Add a **Course listing** block, set **Courses per page** to 6, and turn on **Show filters**. Publish the page. Visitors see a filterable grid of courses that links to each course page.

## Example: a login page with a shortcode

```text
[rootwright_lms_login]
```

Paste the shortcode into a page in the classic editor, or a **Shortcode** block in the block editor.

## Related

- [Templates and overrides](/developers/templates).
- [REST API reference](/developers/rest-api).
