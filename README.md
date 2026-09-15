# Northform RGM Advisory — website

Static site for [northform.co.nz](https://northform.co.nz). Eleventy + Netlify, no database, no framework runtime. Content is edited through a browser-based admin panel at `/admin`, which saves changes straight into the Git repo.

## Running it

```bash
npm install
npm run dev      # http://localhost:8080, live reload
npm run build    # outputs to _site/
```

Node 20+.

## Editing content

Everything a non-developer needs to change lives at **northform.co.nz/admin**. Four sections:

| Section | What it edits | File behind it |
|---|---|---|
| Insights | Blog posts. Write, edit, delete, publish. | `src/posts/*.md` |
| Homepage | Every heading, paragraph and figure on the front page | `src/_data/home.json` |
| What we do | The four practice areas in depth: questions, outcomes, figures | `src/_data/services.json` |
| About page | Headline, credibility figures and the main text | `src/_data/about.json` |
| Contact details | Phone, email, business name, copyright year | `src/_data/site.json` |

Clicking Publish makes a real commit and Netlify rebuilds the site. Changes are live in about a minute.

Contact details appear in the header, footer, contact page and search metadata. Change them once in the admin panel and every page updates.

## Turning the admin panel on

The code is in place but Netlify needs to be told to allow logins. Do this once, in the Netlify dashboard:

1. **Site configuration → Identity → Enable Identity.**
2. **Registration → set to Invite only.** Do this before anything else, or anyone who finds `/admin` can sign themselves up.
3. **Identity → Services → Enable Git Gateway.** This is what lets a logged-in editor commit without a GitHub account.
4. **Identity → Invite users** → send an invite to the email address that will edit the site. The invite email contains the link that sets a password.

Two things worth knowing:

- `/admin` only works on the live Netlify URL. Netlify Identity is a hosted service, so it will not authenticate on `localhost`.
- If Publish fails, it is almost always Git Gateway not being enabled, or the Netlify user lacking write access to the repo.

## What's where

```
src/
  index.njk            Homepage template (text comes from _data/home.json)
  services.njk         What we do (text comes from _data/services.json)
  404.njk              Not-found page
  about.njk            About template (text comes from _data/about.json)
  insights.njk         Blog index
  contact.njk          Contact page + Netlify form
  thanks.njk           Form success page
  posts/               Blog posts, one markdown file each
    posts.json         Shared front matter for all posts
  _data/
    site.json          Phone, email, brand name, year
    home.json          All homepage copy
    services.json      All What-we-do copy
    about.json         All About page copy
  admin/
    index.html         The admin panel shell
    config.yml         Defines what the panel lets you edit
  _includes/
    layouts/base.njk   HTML shell, meta tags, structured data
    layouts/post.njk   Blog post layout
    partials/          Header and footer
  assets/
    css/               The whole design system, one file
    img/               Photography used in the hero and on article cards
    uploads/           Where images added through /admin land
    favicon.svg
```

Adding a field to the admin panel means editing `config.yml` and the matching template. That is a code change and needs a commit before it shows up in the panel.

## Design system

Defined as CSS custom properties at the top of `src/assets/css/northform.css`.

| Token | Value | Role |
|---|---|---|
| `--paper` | `#f0f1f2` | Page ground, cool rather than cream |
| `--navy` | `#1a2a4a` | All text. Navy as ink, never as a background |
| `--slate` | `#5b6577` | Secondary text |
| `--hairline` | `#d4d8dd` | Every border and divider |
| `--pine` | `#0d5c56` | The only accent. Buttons and figures only |

Type: **Inter** at weight 300 for display, since the light weight is what makes it read calm rather than loud. **IBM Plex Mono** for labels and every number, with `tabular-nums` so figures line up.

Single light theme, deliberately. This is a brand surface, not a document viewer.

## Adding a blog post without the admin panel

Create a `.md` file in `src/posts/`:

```markdown
---
title: "Your headline"
date: 2026-09-15
category: Trade Investment
excerpt: "One or two sentences. Appears on the insights list and homepage."
description: "Longer version for search engines."
---

Your post body in markdown.
```

Categories: `Pricing`, `Trade Investment`, `Portfolio & Mix`, `Trade Terms`, `Market Context`. An optional `image:` line puts a photo on the article card. The URL comes from the filename, so `my-post.md` becomes `/insights/my-post/`. Posts sort newest first, and the homepage shows the latest three.

## The contact form

Uses Netlify Forms, so there is no backend to run. It will not submit from `localhost`.

**Netlify turns form detection off by default, and the form silently fails until it is switched on.** Submitting while it is off lands on a browser "page can't be found" error at `/thanks/`, even though that page loads fine on its own. To turn it on:

1. In the Netlify project, go to **Forms → Enable form detection**.
2. **Redeploy.** Netlify only scans for forms during a build, so enabling detection does nothing until the next deploy. Use **Deploys → Trigger deploy → Deploy site**.
3. Check it worked: view the source of `/contact/` on the live site. Once Netlify has processed the form, the `data-netlify` attribute is gone.

Submissions then appear under **Forms** in the Netlify dashboard. Add an email notification under **Project configuration → Notifications → Form submission notifications**, pointed at an inbox that actually receives mail. A honeypot field catches most spam.

## Content rules

Two rules from the brand strategy are enforced in the current copy. Keep them in mind when editing, including in the admin panel:

- **No individual is named anywhere.** Not in page copy, not in post bylines, not in meta tags. Credibility is anchored on role and scale ("20+ years in FMCG commercial roles", "$250M+ portfolio revenue managed"), with no employer names either.
- **The percentage ranges are framed as industry-typical, not as guaranteed results.** The disclaimer paragraph at the end of the practices section is doing that work, and there is a hint on that field in the admin panel saying so. If the ranges change, keep the disclaimer.

There are no case studies on the site because there are no clients to write about yet. When there are, Insights is the right place for them.

## Deploying

Push to a Git repo and connect it in Netlify. `netlify.toml` already sets the build command, publish directory and Node version, and includes the `/admin` redirect. Point the `northform.co.nz` domain at the site in Netlify's domain settings.
