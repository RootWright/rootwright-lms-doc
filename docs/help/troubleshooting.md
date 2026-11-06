---
title: RootWright LMS troubleshooting and FAQ
description: "Fix common RootWright LMS problems: test-mode payments, Google on local sites, AI generation stopped by LiteSpeed, nginx or Apache time limits, uploads and emails."
plan: Free + Pro
tested_with: RootWright LMS 1.0.0 (Free), 1.0.0 (Pro)
last_verified: 2026-11-03
---

# RootWright LMS troubleshooting and FAQ

Start here when something in RootWright LMS does not work as this documentation describes. Each entry lists the symptom, what causes it, and what to do.

## Payments still say "test mode"

**Symptom.** The Settings overview shows "Stripe is in test mode — real cards are declined" or the same for PayPal.

**Cause.** The gateway is in sandbox mode. Only test payments go through.

**Fix.** Enter the live keys and webhook secret for the gateway, then set **Mode** to live. See [Payment gateways](/commerce/payment-gateways).

## Google connection fails on a local site

**Symptom.** The YouTube or Google Meet connection does not complete. The settings say Google refuses the site's address.

**Cause.** Google accepts redirect URIs only on a public domain. Local hosts such as `localhost`, `.test` and `.local` are refused before the consent screen.

**Fix.** Connect from a public staging domain, or use the `rootwright_lms_pro_google_redirect_uri` filter. See [YouTube](/integrations/youtube) and [Google Meet](/integrations/google-meet).

## "Mark complete" does nothing on a lesson

**Symptom.** A student clicks **Mark complete** and the lesson does not change to completed.

**Cause.** In testing on 1.0.0, **Mark complete** worked on lessons with content. On a lesson with no content at all, the button did nothing.

**Fix.** Add content to the lesson, even a short paragraph, then try again. See [Lesson completion](/learning/lesson-completion).

## An admin screen is blank or keeps loading

**Symptom.** A RootWright LMS screen stays blank, or shows a spinner that never ends.

**Cause.** Usually the browser is holding an older copy of the admin app after the plugin was updated, or the server is slow to answer.

**Fix.** Reload the page with a hard refresh (**Ctrl+Shift+R**, or **Cmd+Shift+R** on a Mac). If it stays blank, note the page and your WordPress version and report it.

## AI generation stops partway: host limits

::: pro
AI course generation is part of RootWright LMS Pro.
:::

If course generation sits on **Planning the course** or **Writing lessons** and never moves on, or stops with "The server stopped this run", your web server is ending the background job before the AI has replied. RootWright LMS runs AI work in the background through WordPress's own request system, and many hosts stop those requests after 40 to 90 seconds. Raising that limit for two background addresses fixes it.

### How to tell this is the problem

You see one or more of these:

- The generate screen stays on **Planning the course** or **Writing lessons** for many minutes, with no new text appearing.
- The run shows **Generation stopped**, with: "The server stopped this run during its "outline" step without an error message. That is usually a host limit on long background requests (PHP-FPM request_terminate_timeout, or a proxy timeout). Running WP-Cron from a real server cron avoids it."
- The job's history says "Retrying at once with Thorough thinking, so the request is shorter." (or another thinking level).
- Under **Tools → Scheduled Actions**, a search for `rootwright_lms_pro_ai_course_generate` shows **Failed** actions whose log says "action started via Async Request", then "action was in-progress for at least 300 seconds without completing and has been marked as failed".

To find your host's limit, look at the **Complete** actions in the same search. Each log shows when the step started and when it finished. If no completed step ran longer than a fixed time, that is the limit. On one shared LiteSpeed host it was 67 seconds.

### Why it happens

A generation is a few long steps: the outline, then rounds of lessons written side by side. Each step is one request to the AI provider, and a step can take one to two minutes. It takes longer at higher thinking levels or with a long skill attached.

WordPress starts background work by sending a request to your own site and hanging up straight away. The step then runs inside your web server like any other request, so the server's time limit applies to it. When the limit is shorter than the step, the server ends PHP partway through, with no error, and the step's work is lost.

### What RootWright LMS does on its own

You do not need to set any of this up. When a step is ended this way, RootWright LMS:

- **Retries straight away with one level less thinking** for that run, for example **Maximum** becomes **Thorough**, since the same request would be ended again. The run keeps the level you chose on record, and its history notes the retry.
- **Retries a round of lessons with half as many at once.** Lessons are written up to 25 at a time, side by side. A round that was ended goes again at half the size. It is also halved when the provider answers "slow down" (HTTP 429).
- **Notices the stop quickly.** While a step waits for the AI, it records every 15 seconds that it is still running. A step that stops recording for a minute was ended by the server, so it is retried:
  - within about a minute while the generate screen is open;
  - within 5 minutes when nobody is watching, on the next background check;
  - after 10 to 15 minutes with the **WordPress AI (Connectors)** provider, which cannot record while it waits.
- **Raises PHP's time limit** before an AI call, when `max_execution_time` is shorter than the call and the host allows it.
- **Records the reason.** A PHP fatal error, such as "Maximum execution time of 120 seconds exceeded" or an out-of-memory error, is saved word for word on the job.
- **Stops after 3 attempts per step and per lesson,** with "Gave up after 3 attempts. Last attempt: …". A cover image is never retried, because the image provider may already have charged for it.
- **Keeps what was built.** A stopped generation keeps the course and the lessons it finished. Click **Write the missing lessons** to finish it, or **Run it again** if no course was created yet.

Each ended step still costs time, and the ended request has to start again. On a host with a short limit, the settings below are what make generation fast again.

### Fix it on LiteSpeed (most shared cPanel hosts)

Tested on a shared cPanel host running LiteSpeed, where it fixed the problem.

::: steps
1. Open **cPanel → File Manager** and go to your WordPress folder, the one with `wp-config.php`.
2. Click **Settings** at the top right, tick **Show Hidden Files (dotfiles)** and click **Save**. `.htaccess` starts with a dot, so it is hidden until you do this.
3. Right-click `.htaccess` and choose **Edit**. If there is no `.htaccess`, create one with **+ File**.
4. Paste this at the very top, above `# BEGIN LSCACHE` and `# BEGIN WordPress`:

   ```apache
   # BEGIN RootWright background jobs
   <IfModule LiteSpeed>
   RewriteEngine On
   RewriteCond %{QUERY_STRING} (^|&)action=as_async_request_queue_runner(&|$)
   RewriteRule ^wp-admin/admin-ajax\.php$ - [E=noabort:1,E=noconntimeout:1]
   RewriteRule ^wp-cron\.php$ - [E=noabort:1,E=noconntimeout:1]
   </IfModule>
   # END RootWright background jobs
   ```

5. Click **Save Changes**. It takes effect at once.
:::

Keep it outside the `LSCACHE` and `WordPress` blocks. The LiteSpeed Cache plugin and WordPress rewrite their own blocks and would remove anything inside them.

| Setting | Effect |
|---|---|
| `noabort` | PHP keeps running after the request that started it hangs up. |
| `noconntimeout` | LiteSpeed's connection time limit does not apply to this request. |

If steps still stop at the same time afterwards, your host enforces a limit these settings cannot lift. Ask their support whether they honour `noabort` and `noconntimeout`, or use [server cron](#fix-it-on-any-host-run-background-jobs-from-server-cron) instead.

### Fix it on nginx with PHP-FPM

On nginx, the limit that ends a background step is PHP-FPM's `request_terminate_timeout`. nginx's own `fastcgi_read_timeout`, the one behind the 504 error, only affects someone waiting for a page, so it does not matter here.

`request_terminate_timeout` is set per PHP-FPM pool, not per address. The clean fix is a small second pool used only for background requests:

```ini
; /etc/php/8.x/fpm/pool.d/wp-background.conf
[wp-background]
user = www-data
group = www-data
listen = /run/php/wp-background.sock
pm = ondemand
pm.max_children = 4
request_terminate_timeout = 0
```

Then send the two background addresses to it, and everything else to your normal pool:

```nginx
map $arg_action $wp_php_pool {
    as_async_request_queue_runner unix:/run/php/wp-background.sock;
    default                       unix:/run/php/php8.x-fpm.sock;
}

location = /wp-cron.php {
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_ignore_client_abort on;
    fastcgi_pass unix:/run/php/wp-background.sock;
}

location = /wp-admin/admin-ajax.php {
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_ignore_client_abort on;
    fastcgi_pass $wp_php_pool;
}
```

Replace `php8.x-fpm.sock` with your PHP version's socket, then reload PHP-FPM and nginx. `pm.max_children = 4` caps how many background jobs can run at once.

The shorter alternative is to raise `request_terminate_timeout`, to `300` for example, in your existing pool. That is one line, but slow requests anywhere on the site can then hold PHP longer too.

### Fix it on Apache

What to change depends on how Apache runs PHP:

| Apache runs PHP with | What ends a long step | What to change |
|---|---|---|
| **PHP-FPM** (`proxy_fcgi`) | `request_terminate_timeout` | The same PHP-FPM pool settings as for nginx, above. |
| **mod_fcgid** (common on older cPanel and Plesk servers) | `FcgidIOTimeout` (40 seconds by default) and `FcgidBusyTimeout` | Raise them in the server config, for example `FcgidIOTimeout 300` and `FcgidBusyTimeout 600`. On shared hosting, ask your host. |
| **mod_php** | Usually nothing | PHP's own time limit counts processor time on Linux, and waiting for the AI uses almost none. |

### Fix it on any host: run background jobs from server cron

This works everywhere, including managed WordPress hosts whose limits you cannot change, because background jobs then run in PHP's command-line mode and no web server is involved. The cost is a short wait before each step, up to one cron interval.

::: steps
1. **Add a cron job** that runs every minute. In cPanel this is **Advanced → Cron Jobs**:

   ```bash
   cd /home/YOUR_USER/public_html && /usr/local/bin/php -q wp-cron.php >/dev/null 2>&1
   ```

   With WP-CLI installed, this runs the AI queue directly:

   ```bash
   cd /home/YOUR_USER/public_html && wp cron event run --due-now --quiet && wp action-scheduler run --group=rootwright-lms-ai --quiet
   ```

   Replace the path with your WordPress folder. Some shared plans allow cron only every 5 minutes; then each step can wait up to 5 minutes.

2. **Stop page visits starting WP-Cron.** Add this to `wp-config.php`, above the line that says "That's all, stop editing!":

   ```php
   define( 'DISABLE_WP_CRON', true );
   ```

3. **Stop background jobs starting through web requests.** Create `wp-content/mu-plugins/no-async-runner.php` with:

   ```php
   <?php
   add_filter( 'action_scheduler_allow_async_request_runner', '__return_false' );
   ```
:::

All three are needed. With only the cron job, background jobs still start through web requests and are ended the same way.

Managed WordPress hosts often have their own setting for this, usually called server cron or alternate cron. Check your host's documentation first. The same change also makes queued group emails go out on time; see [Email settings](/settings/emails).

### Make each step shorter

These help on any host, alone or together with the fixes above. All are under **Settings → Integrations → AI → Cost & load**:

- **Faster replies**, where your provider offers it (Claude, OpenAI and Gemini). The same model writes the reply faster, so each step is shorter. It costs more per call and is off by default.
- **Default thinking mode**. A lower level makes each step shorter. You can also pick it per generation under **Style → Thinking**.
- **Concurrent jobs**. Keep it at 2 on shared hosting, so AI does not take over the queue that also sends your email.

![The Cost & load section of the AI settings](/images/settings/ai-02-cost-load.jpg)

*Settings → Integrations → AI → Cost & load.*

To hold AI work while you change server settings, switch on **Pause all AI** here. Jobs wait where they are, nothing is lost, and a call already in progress finishes.

### Other host settings that stop AI calls

- **"This site blocks outgoing requests to … (WP_HTTP_BLOCK_EXTERNAL). Add it to WP_ACCESSIBLE_HOSTS."** `wp-config.php` blocks WordPress from calling outside services. Add your provider's address, for example `define( 'WP_ACCESSIBLE_HOSTS', 'api.anthropic.com' );`.
- **A proxy.** If your server reaches the internet through a proxy, set WordPress's own `WP_PROXY_HOST` and `WP_PROXY_PORT`. AI requests use them.
- **Out of memory.** If the reason names an out-of-memory error, ask your host to raise PHP's `memory_limit` for the site.

### Is it safe?

Yes. None of these changes give anyone access to anything new. Logins, permissions and nonces work as before, and PHP's own time and memory limits still apply.

The LiteSpeed and nginx settings above cover only two kinds of request:

- Action Scheduler's background runner, which checks a WordPress nonce first, so a request from outside is turned away in milliseconds.
- `wp-cron.php`, where WordPress holds a lock so repeated visits do not start overlapping runs.

Every other request on your site, including other plugins' `admin-ajax.php` calls, keeps your server's normal limits.

## A video will not upload

**Symptom.** A large video fails to upload, or the message says the file is too big.

**Cause.** PHP's upload limit on the host, or the plugin's **Max upload size** (2000 MB by default).

**Fix.** Raise the PHP upload limits on your host, or upload to Bunny.net, which uploads straight from the browser. See [Video & storage](/integrations/video-storage).

## Students do not get the welcome email

**Symptom.** A new student does not receive the welcome email.

**Cause.** **Send welcome email** was switched off when the account was created, or **Send course emails** is paused under **Settings → Emails**.

**Fix.** Turn on the email switch under **Settings → Communication → Emails**, then resend from the student's profile.

## Frequently asked questions

**Why does AI course generation stop on my host?**
Most often because the web server ends long background requests. RootWright LMS retries on its own, with less thinking and smaller rounds of lessons, and keeps what it built. The lasting fix is a server rule for LiteSpeed, nginx or Apache, or running background jobs from server cron. See [AI generation stops partway: host limits](#ai-generation-stops-partway-host-limits).

**Does the Cloudflare 100-second timeout affect AI generation?**
No. Cloudflare's limit applies to someone waiting for a response. RootWright LMS's background requests hang up straight away, so nobody is waiting on them.

**Can I lower the thinking level instead of changing the server?**
Yes. A lower level makes each step shorter, so it is more likely to fit inside your host's limit, and RootWright LMS does this on its own after a step is ended. But on a host with a 60-second limit even **Balanced** can be too long for a round of lessons, so fixing the limit gives better courses.

**Why does AI generation work on my computer but not my live site?**
Local development servers rarely set a time limit on PHP. Shared and managed hosts usually do.

**Will AI generation slow down my site or delay my emails?**
It runs in the background, not while visitors browse. **Concurrent jobs** limits how many AI jobs run at once. Keep it at 2 on shared hosting so AI does not hold up the queue that sends your emails.

**Do I lose a half-built course if generation stops?**
No. The course and the lessons that were finished are kept. Click **Write the missing lessons** to finish it.

**Can I stop AI from spending too much?**
Yes. Set a **Monthly token budget** and **Per-person monthly limits** under **Settings → Integrations → AI → Cost & load**. Jobs refuse to start once the budget is reached.

**Can students buy a course without Pro?**
No. Selling through Stripe or PayPal is a Pro feature. A free course, or one enrolled by an admin, works on Free.

**Do I need WooCommerce?**
No. RootWright LMS has its own checkout with Pro. It can also sell through FluentCart.

**Can I import a course from LearnDash?**
Not in this build. There is no LearnDash importer in RootWright LMS 1.0.0.

**Where do I see a student's grades?**
Open the student from **People → Students**, then the **Grades** tab. See [Student profile and progress](/students/student-progress).

**Can I change the colors of certificates?**
Yes. Set the **Accent color** and **Brand logo** under **Settings → Certificates**. See [Certificate studio](/certificates/certificate-studio).

## Still stuck?

Note the page, the exact message and your RootWright LMS and WordPress versions, then contact the RootWright team. Include the steps you took so they can repeat them.
