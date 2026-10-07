# Yurida Zani | Portfolio

Personal portfolio website of Yurida Zani, an Informatics graduate looking for entry-level IT support and helpdesk roles.

**Live site:** https://yurida-zani.vercel.app

## About this site

A static website built with plain HTML, CSS, and JavaScript. No framework and no build step.

- Home page with profile, skills, experience, and an archive of earlier web development projects
- Case study pages generated from a single data file
- Fonts: Archivo and Newsreader (Google Fonts)

## Project structure

```
index.html            Home page
project-detail.html   Case study page (reads ?id= from the URL)
style.css             Shared styles
cases.js              Case study data (the only file to edit when adding one)
detail.js             Renders a case study from cases.js
Pic1.jpg              Profile photo
```

## Adding a case study

1. Open `cases.js`.
2. Copy the commented example block into the `window.CASES` list and remove the `//` markers.
3. Fill in `id`, `title`, `summary`, `status`, `tools`, and `sections`.
4. Commit and push. The home page list and the detail page update automatically.

The `status` field should say honestly what the case is, for example "Home lab" for self-directed practice or "Real case" for an actual incident.

## Deployment

Hosted on Vercel as a static site (framework preset "Other", no build command). Every push to `main` triggers a new deployment.

## Running locally

Open `index.html` in a browser. No installation needed.

## Contact

- Email: yuridazani.personal@gmail.com
- LinkedIn: https://linkedin.com/in/yurida-zani-b35321211/

&copy; 2026 Yurida Zani. All rights reserved.
