# MoviGo

A movie and TV show discovery web app built with **Next.js App Router**, **TypeScript**, and the **TMDB API**. Browse trending and popular titles, filter and sort by genre, watch trailers, and explore detailed cast and similar-title recommendations — all wrapped in a clean, responsive, theme-aware UI.

This is a full rebuild of an earlier vanilla JavaScript + Vite version, focused on modern React patterns, type-safe API integration, and scalable component architecture.

## Live Demo

[movigo-mu.vercel.app](https://movigo-mu.vercel.app)

## Features

- **Trending & Popular carousels** — daily/weekly trending toggle, popular movies and TV shows
- **Discover pages** — filter by genre (multi-select combobox) and sort by popularity, rating, release date, or title
- **Live search** — debounced search-as-you-type across movies and TV shows, with a dropdown results panel
- **Detail pages** — full movie/TV info with backdrop hero, cast carousel, and "More Like This" recommendations
- **Trailer playback** — embedded YouTube trailer in a modal dialog, no page navigation required
- **Pagination** — page-based browsing with automatic scroll-to-top on page change
- **Dark/light theme** — system-aware theme toggle
- **Fully responsive** — mobile-first layout across all pages

## Tech Stack

| Category      | Technology                                               |
| ------------- | -------------------------------------------------------- |
| Framework     | [Next.js](https://nextjs.org/) (App Router)              |
| Language      | TypeScript                                               |
| Styling       | Tailwind CSS                                             |
| UI Components | shadcn/ui (Base UI primitives)                           |
| Data Fetching | [TanStack Query](https://tanstack.com/query)             |
| HTTP Client   | Axios                                                    |
| Data Source   | [TMDB API](https://www.themoviedb.org/documentation/api) |
| Deployment    | Vercel                                                   |

## Architecture Notes

- **API credentials stay server-side.** All TMDB requests are proxied through Next.js Route Handlers (`app/api/media/**`), so the TMDB read access token is never exposed to the client.
- **Server/Client boundary.** Dynamic route pages (e.g. `app/movie/[id]/page.tsx`) are Server Components that unwrap `params`, then delegate to a Client Component for TanStack Query-powered data fetching.
- **Typed API layer.** All TMDB response shapes are typed in `lib/api/media.ts`, using only the fields the app actually consumes.

## Getting Started

### Prerequisites

- Node.js 18+
- A [TMDB API](https://www.themoviedb.org/settings/api) account (free) — you'll need a **Read Access Token (v4 auth)**

### Installation

```bash
git clone https://github.com/Pranish03/movigo.git
cd movigo
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```bash
TMDB_API_BASE_URL=https://api.themoviedb.org/3
TMDB_API_READ_ACCESS_TOKEN=your_tmdb_read_access_token
```

> These are intentionally **not** prefixed with `NEXT_PUBLIC_` — they're only used inside server-side Route Handlers and are never sent to the browser.

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
├── (public)/
│   ├── _components/        # Homepage sections (Hero, Trending, Popular)
│   ├── movies/
│   │   └── [id]/           # Movie detail page
│   └── tv/
│       └── [id]/           # TV show detail page
├── api/
│   └── media/              # Route Handlers proxying TMDB
components/
├── shared/                 # Reusable app components (MediaCard, CastCard, SearchBar, etc.)
└── ui/                     # shadcn/ui components
lib/
├── api/                    # Typed fetch functions
├── axios.ts                # Server-side TMDB Axios instance
└── constants.ts            # Image base URLs, etc.
```

## Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.

![TMDB Logo](https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg)

## Author

**Pranish Chaulagain**

- Portfolio: [pranishchaulagain.com.np](https://pranishchaulagain.com.np)
- GitHub: [@Pranish03](https://github.com/Pranish03)
