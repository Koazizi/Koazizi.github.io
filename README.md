# koazizi.github.io

Website of the **Urban Hydrosystems & Resilience Lab**, Department of Civil and Architectural
Engineering, Tennessee State University — directed by Koorosh Azizi, Ph.D.

Live at <https://koazizi.github.io/>

## What this is

A hand-written static site: plain HTML, one stylesheet, one small JavaScript file for the
mobile menu. There is **no build step and no framework** — every page can be edited directly
in the GitHub web editor, and the site works fine with JavaScript disabled.

## Layout

```
index.html          research.html      publications.html
people.html         teaching.html      tools.html
news.html           join.html          contact.html
404.html            sitemap.xml        robots.txt

assets/
  css/site.css          all styling and design tokens
  js/nav.js             mobile menu toggle only
  fonts/                Source Serif 4 + Source Sans 3 (SIL OFL, self-hosted)
  img/                  portrait, figures/, photos/, CREDITS.md
  og/                   social preview card
  cv/                   CV (PDF)
```

## Editing

**Adding a publication** — copy an existing `<li class="pub">` block in `publications.html`.
Keep the conventions: full author list (never "et al."), `<span class="me">Azizi, K.</span>`
around his own name, an asterisk after a mentored student's name, and a DOI link.

**Adding news** — copy an `<li>` block in `news.html`. Every item needs a `<time datetime="…">`.
Post roughly monthly; a visibly stale news feed is worse than no news page at all, so if it
goes quiet for long, remove the page from the navigation instead.

**Changing the design** — everything lives in `assets/css/site.css`. Colours, type and spacing
are CSS custom properties at the top of that file; change them there rather than in the pages.

**Adding an image** — put the file in `assets/img/`, keep it under about 250 KB, write real
alt text, and record its source and licence in `assets/img/CREDITS.md`. Never hot-link an
image from another site.

## Design

Type is Source Serif 4 for headings and Source Sans 3 for body text — the pairing Stanford
uses for its own identity — self-hosted so the site makes no third-party requests. The accent
colour is Tennessee State University's official digital blue, `#00539F` (Reflex Blue), which
gives 7.67:1 contrast on white and passes WCAG AAA for body text. No TSU logo is used; a
departmental lockup would need approval from TSU Creative Services.

## Credits and licences

- Site content: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- Site code: [MIT](LICENSE)
- Images: each source and licence is recorded in [`assets/img/CREDITS.md`](assets/img/CREDITS.md)
- Fonts: Source Serif 4 and Source Sans 3, SIL Open Font License 1.1
