# Ronald Davila — Portfolio

Personal portfolio built with [Astro](https://astro.build/), featuring bilingual support (Spanish / English), vanilla CSS with design tokens, and plain JavaScript for interactivity.

## Tech Stack

- **Framework:** Astro 5.1.0 (static site generation)
- **Languages:** TypeScript, Astro
- **Styling:** Vanilla CSS with custom properties
- **Animations:** Vanilla JavaScript (no libraries)
- **Form backend:** [Web3Forms](https://web3forms.com/)
- **Deployment:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env` file in the project root (see `.env.example`):

```
PUBLIC_WEB3FORMS_KEY=your_key_here
```

Get a free key at [web3forms.com](https://web3forms.com/).

## Project Structure

```
src/
├── components/     # Astro UI components (Hero, About, Skills, Experience, Projects, Contact, …)
├── layouts/        # Layout.astro — master HTML template with SEO meta tags
├── pages/          # Route files
│   ├── index.astro       # Spanish (default)
│   └── en/index.astro    # English
├── i18n/           # Translation system
│   ├── ui.ts             # t() and tArray() helpers
│   └── locales/          # es.json, en.json
└── styles/
    └── global.css  # Design tokens (CSS variables), resets, global utilities

public/             # Static assets served as-is (images, fonts, CV PDF)
scripts/            # Build-time utilities (image optimization)
```

## Bilingual System

The site has two routes: `/` (Spanish) and `/en/` (English). Each page passes a `lang` prop to all components. Translations live in `src/i18n/locales/*.json` and are accessed with `t(lang, 'key.path')` or `tArray(lang, 'key.path')`.

First-time visitors are auto-redirected to their browser language. Subsequent visits respect the stored `localStorage` preference (`lang-preference`).

## Code Quality

```bash
npm run lint        # ESLint check
npm run lint:fix    # ESLint auto-fix
npm run format      # Prettier format
```

## Image Optimization

After adding or replacing images in `public/`:

```bash
node scripts/optimize-images.mjs
```

This generates correctly-sized PWA icons and compresses heavy PNG/JPG files.
