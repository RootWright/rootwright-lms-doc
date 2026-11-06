---
title: RootWright LMS templates and theme overrides
description: "How RootWright LMS loads its templates, how block themes and Site Editor templates take priority, and the filters that change which certificate or course page template is used."
plan: Free + Pro
tested_with: RootWright LMS 1.0.0 (Free), 1.0.0 (Pro)
last_verified: 2026-10-28
---

# RootWright LMS templates and theme overrides

RootWright LMS does not look up template files in your theme folder. Its PHP templates load from the plugin, and block themes can replace them through the Site Editor. This page explains which template wins and which filters change it.

## How templates load

- Dashboard and profile pages load from the plugin's `templates/` folder.
- Certificate pages load from `templates/certificates/` with the built-in designs `sky-landscape.php` and `sky-portrait.php`.
- Course archive and single course pages use the plugin's block template.

Because the plugin includes these files directly, a file with the same name in your theme is not used. The `locate_template` function is not called.

## Block themes and the Site Editor

On a block theme, a Site Editor template takes priority over the plugin's template. A template with the same slug in your theme also takes priority. The slugs used include `archive-rootwright_course`, `single-rootwright_course` and `taxonomy-{tax}`.

Edit the template in the Site Editor.

## Filters that change templates

| Filter | Purpose |
|---|---|
| `template_include` | Choose the template file for a request. |
| `rootwright_lms_dashboard_standalone` | Show the dashboard without the theme header and footer. |
| `rootwright_lms_course_page_layout` | Change the layout of the course page. |
| `rootwright_lms_certificate_ssr_templates` | Allow-list of certificate template keys. |
| `rootwright_lms_certificate_template_path` | Replace the file used for a certificate design. The path must be a real `.php` file. |

## Example: use your own certificate design

Check the call site in CertificateBlock.php for the exact arguments before you rely on this example.

```php
add_filter( 'rootwright_lms_certificate_template_path', function ( $path, $key ) {
	if ( 'sky-landscape' === $key ) {
		return get_stylesheet_directory() . '/rootwright/certificate-landscape.php';
	}
	return $path;
}, 10, 2 );
```

The filter must return a real file. If the path does not exist, the plugin falls back to its own design.

## Related

- [Hooks and filters](/developers/hooks-and-filters).
- [Shortcodes and blocks](/developers/shortcodes-and-blocks).
