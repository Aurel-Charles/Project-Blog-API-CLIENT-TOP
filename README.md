# My Odin Project blog — reader client

The public-facing front end of my **Blog API** project: a React app where readers browse published posts, read them in full, and join the discussion in the comments.

Built as part of [The Odin Project](https://www.theodinproject.com/) — Full Stack JavaScript path. The project is split in three parts:

- **Blog API** — REST API (Express 5, Prisma, PostgreSQL, JWT auth) — [repo](https://github.com/Aurel-Charles/Project-Blog-API-SERVER-TOP)
- **Reader client** — this repo
- **Admin portal** — for writing, editing and publishing posts — [repo](https://github.com/Aurel-Charles/Project-Blog-API-ADMIN-TOP) · [live](https://project-blog-api-admin-top.netlify.app)

## Live demo

[Visit the blog](https://project-blog-api-client-top.netlify.app)


## Features

- Home page with a short introduction and the latest published post
- Post index with publication date, excerpt and author (the excerpt is plain text, extracted from the post's HTML)
- Full post page with publication and update dates, rendering the formatted content (headings, lists, quotes, links, code blocks)
- Post HTML is sanitized with **DOMPurify** before being rendered, even though the API already cleans it
- Comments on every post
  - anonymous readers comment with a name, logged-in readers comment as themselves
  - authors can edit and delete their own comments, admins can manage all of them
  - the list updates instantly, without reloading the page
  - deleting asks for confirmation first, in a dialog built on the native `<dialog>` element
  - while a comment is being posted or deleted, the button is disabled and shows a spinner (*Posting…*, *Deleting…*), so nothing is sent twice
- Sign up, log in and log out (JWT stored in `localStorage`, user fetched from `/auth/me`)
- Validation errors from the API shown under the matching field
- Loading and error states on every request, and a 404 page
- Responsive layout, visible keyboard focus, reduced-motion support

## Tech stack

- **React 19** + **Vite**
- **React Router** (data mode: `createBrowserRouter`, layout route with `Outlet`)
- **CSS Modules** with global design tokens (CSS custom properties)
- **DOMPurify** to sanitize post HTML before rendering it
- **Lucide React** for icons
- Fonts: **Newsreader** (reading) and **Fira Sans** (interface), from Google Fonts

## Getting started

```bash
git clone git@github.com:Aurel-Charles/Project-Blog-API-CLIENT-TOP.git
cd Project-Blog-API-CLIENT-TOP
npm install
cp .env.example .env   # then set the API URL
npm run dev
```

### Environment variables

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the Blog API, without a trailing slash (e.g. `http://localhost:3000`) |

Vite inlines this value at build time, so on Netlify it must be set in the site's environment variables **before** building.

## Project structure

```
src/
├── main.jsx            router setup
├── routes.jsx          layout route + pages
├── App.jsx             header, footer, auth state (token + user)
├── api/api.js          apiFetch(): base URL, JSON, Bearer token, errors
├── components/
│   ├── Header, Footer, Loader, FieldErrors, ConfirmDialog
│   └── comments/       Comments, SingleComment, CommentForm
├── pages/              Home, Posts, SinglePost, Login, Register, NotFound
├── styles/             shared CSS Modules (page, article, form)
├── utils/              formatDate, truncate, htmlToText, purifyHtml
└── index.css           design tokens, reset, base styles
```

## API endpoints used

| Method | Endpoint | Used for |
|---|---|---|
| `GET` | `/posts` | post index, latest post |
| `GET` | `/posts/:postId` | single post |
| `GET` | `/posts/:postId/comments` | comments list |
| `POST` | `/posts/:postId/comments` | add a comment |
| `PATCH` | `/posts/:postId/comments/:commentId` | edit a comment |
| `DELETE` | `/posts/:postId/comments/:commentId` | delete a comment |
| `POST` | `/auth/register` | sign up |
| `POST` | `/auth/login` | log in |
| `GET` | `/auth/me` | current user |

## Deployment

Deployed on **Netlify**:

- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_API_URL`

`public/_redirects` sends every route to `index.html`, so links like `/posts/3` work when opened directly or reloaded:

```
/*    /index.html   200
```

## What I learned

- Fetching data in `useEffect` with loading / error / data states
- Centralising requests in one `apiFetch` helper that throws errors carrying the HTTP status and validation details
- Sharing auth state through `useOutletContext` and refreshing it with `/auth/me`
- Updating lists without refetching: spread to add, `filter` to delete, `map` to replace
- Controlled forms and field-level error messages
- Styling a React app with CSS Modules and design tokens
- Showing a pending state while a request runs, and confirming destructive actions with a reusable dialog
- Rendering HTML safely with DOMPurify and `dangerouslySetInnerHTML`, and turning HTML into plain text for excerpts with `DOMParser`
