# Revora FMCG Advisory — Website

Multi-page marketing site with a blog ("Insights") and a browser-based admin at `/admin` for publishing posts. Built with Eleventy, deployed on Netlify, content managed with Decap CMS.

## What's in here

```
src/
  index.njk            Homepage
  about.njk            About page
  services.njk         What we do (4 practice areas)
  insights.njk         Blog index
  contact.njk          Contact page (Netlify form)
  posts/               Blog posts (markdown — the admin writes into this folder)
  admin/               The admin app (/admin) and its config
  css/, js/, assets/   Styles, scripts, images
  _data/site.json      Email, phone, site name — edit contact details here
netlify.toml           Netlify build settings (no manual config needed)
```

## Publish it (one-time setup, ~15 minutes)

### 1. Put it on GitHub

1. Create a new repository on github.com (e.g. `revora-website`). Keep it **private** if you like — Netlify works with both.
2. Upload everything in this folder **except** `node_modules` and `_site` (both are ignored by `.gitignore` if you use git on your computer). The branch should be called `main` (GitHub's default).

Using the command line, from inside this folder:

```
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/revora-website.git
git push -u origin main
```

### 2. Deploy on Netlify

1. Log in at netlify.com → **Add new site → Import an existing project → GitHub** → pick your repo.
2. Netlify reads `netlify.toml` automatically (build command `npm run build`, publish folder `_site`). Just click **Deploy**.
3. You'll get a live URL like `https://something.netlify.app`. You can rename it under **Site configuration → Site details → Change site name** (e.g. `revora`).

### 3. Turn on the admin (`/admin`)

The admin needs Netlify to know who's allowed in:

1. In your Netlify site dashboard: **Integrations → Identity → Enable Identity** (on some dashboards it's under **Site configuration → Identity**).
2. Under Identity settings → **Registration**, set it to **Invite only** (important — otherwise anyone could sign up).
3. Still in Identity settings, scroll to **Services → Git Gateway** and click **Enable Git Gateway**. This is what lets the admin save posts to your GitHub repo.
4. Go to the **Identity** tab → **Invite users** → enter your own email.
5. Open the invite email and click the link — it takes you to your site where you set a password.
6. Visit `https://your-site.netlify.app/admin/`, log in, and you're in.

### 4. Turn on contact form emails

Netlify detects the contact form automatically. To get submissions emailed to you: **Forms → Form notifications → Add notification → Email notification**. Submissions also always appear in the Forms tab of the dashboard.

## Using the admin

- Go to `/admin`, log in, click **Insights (Blog)**.
- **New Insight** → fill in title, date, category, summary, optional header image, and write the article. The editor has a rich-text mode (no markdown knowledge needed).
- Click **Publish**. This commits the post to GitHub, Netlify rebuilds, and the article is live in about a minute.
- Editing or deleting existing posts works the same way.

## Everyday edits

- **Contact email / phone**: edit `src/_data/site.json`, commit, done. The placeholder email is `hello@revora.co.nz` — swap it for the real one when you have it.
- **Page copy**: the `.njk` files in `src/` are HTML — edit text directly and push, and Netlify redeploys.
- **When you get a domain**: add it in Netlify under **Domain management** — no code changes needed.

## Local preview (optional)

With Node.js installed:

```
npm install
npm start
```

Then open http://localhost:8080. (The admin only works on the live Netlify site, since it depends on Netlify Identity.)
