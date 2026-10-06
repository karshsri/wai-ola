# Wai Ola Restoration: website mockup

Multi-page React (Vite) mockup for a Maui water damage mitigation and restoration company.
Hero with an interactive stage card, video background, scroll-driven homepage and 8 inner pages.

> This is a **mockup**. Phone number, credentials, reviews, stats and project cards are placeholders.
> Replace them with verified client data before launch.

## Pages
`/` Home · `/services` · `/process` · `/projects` · `/areas` · `/about` · `/faq` · `/emergency` · `/contact`

## Run locally
Requires Node 18 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build for production
```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

## Deploy
The site is a single-page app with client-side routes, so the host must send every path to `index.html`.

- **Vercel:** `npx vercel --prod` (or import the folder in the Vercel dashboard). `vercel.json` already contains the rewrite.
- **Netlify:** drag the `dist/` folder into Netlify, or connect the repo (build command `npm run build`, publish directory `dist`). `public/_redirects` already contains the rewrite.
- Do **not** open `dist/index.html` by double-clicking. Routes only work behind a web server.

## Where to edit things
| What | File |
|---|---|
| Brand name, phone, stages shown in the hero, service names, areas | `src/data.js` |
| Mock content: stats, services, process steps, projects, reviews, FAQs, map pins | `src/mock.js` |
| Hero (background video, stage card, back/next logic) | `src/Hero.jsx` |
| All pages and the homepage sections | `src/pages.jsx` |
| Header, menu, routes | `src/App.jsx` |
| Footer, shared components, video showcase, card hover effects | `src/shared.jsx` |
| Hero animated scenes (canvas) | `src/scenes.js` |
| Styles | `src/styles.css` (hero, header) and `src/home.css` (pages, footer) |
| Photos and videos | `public/media/` |
| Page titles and search schema (JSON-LD) | `index.html` and the `Page` titles in `src/pages.jsx` |

To rename the brand, search the project for `Wai Ola Restoration` and replace it.

## Using the hero card
Click the **right half** of the card for the next stage, the **left half** to go back (keyboard: left and right arrow keys when the card is focused). On the last stage the card becomes a call button.

## Credits
Photos and videos are from [Pexels](https://www.pexels.com) (free license, attribution not required).
Fonts: Fraunces and Manrope (Google Fonts).

## Notes before launch
- Replace placeholder phone `(808) 000-0000`, credentials, "Since 2018", ratings and reviews with real data.
- Replace stock photos in `public/media/` with real project photos (keep the same file names, or update `src/mock.js` and `src/data.js`).
- `public/media/ocean.mp4` is about 9 MB. Compress it (about 2 MB is enough) before going live.
- This is a client-rendered app. For stronger search and AI-answer visibility, consider prerendering or moving to Next.js, and add real LocalBusiness data (address, hours, reviews) to the schema in `index.html`.
- The contact form does not send anything yet. Connect it to your form service or backend.
