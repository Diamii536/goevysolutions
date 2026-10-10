# Goevy Solutions — website submission

A complete static website built with HTML, CSS, and vanilla JavaScript.
No installation, build command, paid library, or framework is required.

## Open the website

1. Extract the ZIP first.
2. Open the `goevy-solutions` folder.
3. Double-click `index.html` to open the homepage in your browser.
4. Keep the HTML files, `assets`, `css`, and `js` folders together.

You can also open the folder in VS Code and use Live Server.
For static hosting, upload the folder contents so that `index.html` is at the web root.

## Included pages

- Home: `index.html`
- Six detailed services: `services.html`
- Seven-step process: `how-we-work.html`
- Priority sectors: `who-we-serve.html`
- About Goevy: `about.html`
- Team delivery model: `team.html`
- Goevy Systems Lab: `systems-lab.html`
- Searchable, filterable Insights: `insights.html`
- Three complete insight articles
- Case studies and illustrative engagement examples: `case-studies.html`
- Enquiry form and FAQs: `contact.html`
- Specialist collaboration: `collaborate.html`
- Privacy information: `privacy.html`
- Downloadable business systems checklist in `assets`

## Contact form

All enquiries use **admin@goevysolutions.org**.

The form validates required fields and prepares an email in the visitor's own email app.
The visitor reviews and sends that email. The website does not claim that a message has
been sent, and it does not include a server or mail-delivery service.

“Copy enquiry” copies the message, with a manual selection fallback when browser clipboard
access is unavailable. Visitors can also use the direct email link.

If automatic website submission is needed later, connect an approved form service or
backend, then update the form messaging and privacy information to match.

## Editing

- Page text: edit the relevant `.html` file.
- Shared appearance and responsive layouts: `css/style.css`.
- Navigation, process explorer, insight filtering, and form behaviour: `js/main.js`.
- Logo: `assets/logo.png`, preserved from the original Desktop project.
- Colours: CSS variables at the top of `css/style.css`.
- Contact address: search all files for `admin@goevysolutions.org` if it changes.
- Navigation and footer are included directly in each HTML page, so the site works offline
  and page content remains available without JavaScript. Update these shared areas
  consistently when adding pages.

## Content handoff

The six services and six priority sectors follow the supplied content brief.
The navy, red, and blue direction follows the supplied screenshot and original logo.
The original Desktop and Downloads projects were left untouched.

The three Insight articles and readiness checklist are newly drafted editorial content.
The case-study page contains clearly labelled illustrative approaches, not fabricated
client names, projects, testimonials, metrics, or achieved results. Replace or extend
these with approved client stories when available.

The team page describes the delivery model from the original site. Unfinished name and
biography placeholders have been replaced with a capabilities overview.

## Verification

All 15 HTML pages were checked for local file links, anchor targets, duplicate IDs, a
single main heading, and image alternatives. JavaScript syntax was checked.

The CSS includes desktop, tablet, and mobile breakpoints, keyboard focus styles,
reduced-motion support, and a print stylesheet. Browser automation and the in-app
preview could not be completed in the build environment, so visual verification in
your browser is still needed before submission.
