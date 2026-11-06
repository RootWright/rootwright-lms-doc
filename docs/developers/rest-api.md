---
title: RootWright LMS REST API reference
description: "The RootWright LMS REST API: the rootwright-lms/v2 namespace, how requests are authenticated with cookies and nonces or bearer tokens, and the main route groups for courses, lessons, students and commerce."
plan: Free + Pro
tested_with: RootWright LMS 1.0.0 (Free), 1.0.0 (Pro)
last_verified: 2026-10-28
---

# RootWright LMS REST API reference

RootWright LMS exposes its admin and learner screens through a REST API at `/wp-json/rootwright-lms/v2/`. Use it to read and change courses, lessons, students and settings from your own code or from an AI agent.

::: warning Coverage
This page lists the route groups and the authentication rules. The plugin registers about 500 routes. Per-route parameter tables are not written yet. Read the controller for the route you need.
:::

## Base URL and namespace

- Core routes: `https://yoursite.com/wp-json/rootwright-lms/v2/`.
- Fast lane routes for the learner player: `https://yoursite.com/wp-json/rootwright-lms/fast/v1/`.

## Authentication

**Logged-in admin or learner (default).** Send the WordPress REST nonce in the `X-WP-Nonce` header along with the logged-in cookie. The site sends the nonce to its own screens, so the browser does this for you. Requests with an invalid nonce are rejected.

**Public routes.** Some routes need no login, such as listing public courses (`public/courses`), checking a certificate (`public/certificates/verify`) and registering an account. These routes are open by design.

**Bearer tokens for AI clients (Pro).** RootWright LMS Pro exposes a Model Context Protocol endpoint at `/wp-json/rootwright-lms/v2/mcp`. Create a token in the admin, then send it as `Authorization: Bearer <token>`. Tokens are stored as hashes, have three scopes (`courses:read`, `courses:write`, `students:read`), and are limited to 120 requests per token. The endpoint needs HTTPS unless you set the `rootwright_lms_mcp_allow_insecure` filter.

Application passwords work through WordPress's default REST authentication. The plugin does not turn them off.

## Permission levels

| Level | Who can call it |
|---|---|
| Public | Anyone. |
| Authenticated | Any logged-in user. |
| Student | Users with the student role, or a super admin. |
| Instructor | Instructors, or a super admin. Calling an instructor route also updates the instructor's last-active time. |
| Admin | Super admins (the `manage_options` capability). |

Object-level checks, such as whether an instructor owns a course, run inside the controller.

## Route groups

| Group | Examples | Level |
|---|---|---|
| Public catalogue | `public/courses`, `public/profiles/{type}`, `public/courses/{id}/reviews`, `public/certificates/verify` | Public |
| Courses | `courses`, `courses/{id}`, `courses/{id}/duplicate`, `courses/{id}/instructors`, `courses/{id}/skill-map` | Instructor |
| Lessons | `lessons`, `lessons/{id}`, `lessons/{id}/video`, `lessons/{id}/quiz-settings`, `lessons/{id}/recall-items` | Instructor |
| Topics and taxonomy | `topics`, `categories`, `tags` | Instructor (read), Admin (write) |
| Students and people | `students`, `students/bulk/enroll`, `admin/people/add`, `admin/students/{uid}/overview` | Admin |
| Student learning | `student/courses`, `student/lessons/{c}/{l}/progress`, `student/quiz-attempts`, `student/today` | Student |
| Enrollment | `enrollments/courses/{id}` | Authenticated |
| Grading | `submissions/{id}/grade`, `quiz-attempts/{id}/answers/{q}/grade` | Instructor |
| Certificates | `certificates/generate`, `certificates/course/{cid}`, `certificates/{issuanceId}` | Authenticated, with object checks |
| Commerce (Admin) | `admin/orders`, `discounts`, `admin/course-products` | Admin |
| Settings | `admin/settings/panel/{panel}`, `admin/emails`, `admin/pages` | Admin |
| Media and video | `upload`, `storage/browse/{driver}`, `stream/videos`, `stream/providers` | Instructor; provider settings are Admin |
| Payments (Pro) | `payments/intents`, `payments/{uuid}/complete`, `webhooks/{gateway}` | Authenticated or public webhook |
| Subscriptions and invoices (Pro) | `subscriptions`, `invoices`, `admin/subscriptions` | Authenticated, Admin |
| Meetings (Pro) | `meetings/providers`, `meetings/{lesson_id}` | Instructor |
| AI (Pro) | `ai/providers`, `ai/courses/generate`, `ai/jobs/{uuid}` | Instructor, Admin |

## Example: list public courses

```bash
curl "https://yoursite.com/wp-json/rootwright-lms/v2/public/courses?per_page=5"
```

The route needs no authentication. Replace `yoursite.com` with your domain.

## Example: create a course as an admin

```bash
curl -X POST "https://yoursite.com/wp-json/rootwright-lms/v2/courses" \
  -u "admin:APPLICATION_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"course_name":"Intro to Watercolor Painting","status":"draft"}'
```

`course_name` and `status` are required. The caller must be an administrator or have the teacher role. Create an application password under **Users → Profile** in WordPress.

## Errors

Errors use the standard WordPress REST error shape with a `code`, a `message` and a `data.status`. Common ones:

- `403` when the caller's role does not include the permission for the route.
- `404` when a course, lesson or student ID does not exist.
- `422` when a validation rule fails. The message names the field.
- `429` when a rate limit applies, such as bulk CSV imports.

## Related

- [Hooks and filters](/developers/hooks-and-filters).
- [Shortcodes and blocks](/developers/shortcodes-and-blocks).
