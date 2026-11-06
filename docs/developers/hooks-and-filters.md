---
title: RootWright LMS hooks and filters for developers
description: "The actions and filters RootWright LMS fires: enrollment, progress, certificates, email, payments and settings hooks, with the arguments they pass and examples to extend the plugin."
plan: Free + Pro
tested_with: RootWright LMS 1.0.0 (Free), 1.0.0 (Pro)
last_verified: 2026-10-28
---

# RootWright LMS hooks and filters for developers

RootWright LMS fires WordPress actions (`do_action`) and filters (`apply_filters`) at the moments that matter to a learning site: enrollment, progress, certificates, email and payments. Every hook name starts with `rootwright_lms_`, and Pro hooks start with `rootwright_lms_pro_`.

::: warning Coverage
The plugin has about 150 action names and 160 filter names. This page lists the most useful ones by purpose. Check the call site for the full argument list, because not every hook has a doc block.
:::

## Enrollment and access

| Hook | Type | Passes |
|---|---|---|
| `rootwright_lms_enrollment_created` | Action | The enrollment, the student ID and the course ID. |
| `rootwright_lms_enrollment_granted` | Action | The enrollment, the source and a reference. |
| `rootwright_lms_enrollment_revoked` | Action | Same as granted. |
| `rootwright_lms_enrollment_expired` | Action | The expired enrollment. |
| `rootwright_lms_course_enrollment_open` | Filter | Whether a course accepts new enrollments. |

## Progress and grading

| Hook | Type | Passes |
|---|---|---|
| `rootwright_lms_lesson_completed` | Action | The user ID, course ID and lesson ID. |
| `rootwright_lms_course_completed` | Action | The course completion record. |
| `rootwright_lms_quiz_graded` | Action | The quiz attempt. |
| `rootwright_lms_submission_graded` | Action | The assignment submission. |
| `rootwright_lms_course_lessons_changed` | Action | Fires when a course's lessons change. |

## Certificates

| Hook | Type | Passes |
|---|---|---|
| `rootwright_lms_certificate_issued` | Action | The issuance, the user ID and the course ID. |
| `rootwright_lms_certificate_criteria_met` | Filter | Whether the criteria for a certificate are met. |
| `rootwright_lms_can_view_certificate` | Filter | Whether the viewer may see a certificate. |

## Accounts

| Hook | Type | Passes |
|---|---|---|
| `rootwright_lms_user_registered` | Action | The new user. |
| `rootwright_lms_user_logged_in` | Action | The user. |
| `rootwright_lms_login_failed` | Action | The attempt. |
| `rootwright_lms_password_reset_requested` and `_completed` | Action | The user. |

## Email

| Hook | Type | Passes |
|---|---|---|
| `rootwright_lms_email_sent` | Action | The message. |
| `rootwright_lms_email_failed` | Action | The message and the error. |
| `rootwright_lms_email_should_send` | Filter | Whether to send an email. |
| `rootwright_lms_email_recipients` | Filter | The recipient list. |
| `rootwright_lms_email_subject` and `rootwright_lms_email_body` | Filter | The subject and body text. |

## Lesson payload and video

| Hook | Type | Passes |
|---|---|---|
| `rootwright_lms_lesson_payload` | Filter | The lesson data sent to the player. |
| `rootwright_lms_allowed_embed_hosts` | Filter | Hostnames allowed in lesson embeds. |
| `rootwright_lms_upload_max_bytes` | Filter | The upload limit. |
| `rootwright_lms_bunny_embed_url` | Filter | The Bunny.net player URL. |
| `rootwright_lms_video_playback_descriptor` | Filter | The playback details, including the watermark. |

## Payments and purchase (Pro)

| Hook | Type | Passes |
|---|---|---|
| `rootwright_lms_pro_payment_completed` | Action | The payment. |
| `rootwright_lms_pro_payment_failed` | Action | The payment. |
| `rootwright_lms_pro_refund_recorded` | Action | The refund. |
| `rootwright_lms_pro_subscription_renewed` | Action | The subscription. |
| `rootwright_lms_fluentcart_purchase_url` | Filter | The purchase link for a FluentCart product. |
| `rootwright_lms_fluentcart_price_label` | Filter | The price text shown for a FluentCart product. |

## Extension registries

These actions let add-ons register their own pieces. Pass a registry or class object.

- `rootwright_lms_register_addons`
- `rootwright_lms_register_settings_panels`
- `rootwright_lms_register_stream_providers`
- `rootwright_lms_register_storage_drivers`
- `rootwright_lms_register_purchase_providers`
- `rootwright_lms_pro_register_gateways`

## Example: react when a course is completed

```php
add_action( 'rootwright_lms_course_completed', function ( $completion ) {
	// Your code, such as posting to a Slack channel.
}, 10, 1 );
```

## Example: change the Bunny.net player URL

```php
add_filter( 'rootwright_lms_bunny_embed_url', function ( $url ) {
	return $url;
} );
```

## Example: set the Google redirect URI on a local site

Google accepts redirect URIs only on public domains. A filter can point the Google connection at a public staging domain:

```php
add_filter( 'rootwright_lms_pro_google_redirect_uri', function () {
	return 'https://staging.example.com/wp-json/rootwright-lms/v2/integrations/google/callback';
} );
```

## Related

- [REST API reference](/developers/rest-api).
- [Templates and overrides](/developers/templates).
