# WID Learn — Women in DeFi Learning Platform (LMS Frontend)

A complete, responsive frontend for an online learning platform (Coursera/Udemy-style), built with **React 19 + Vite + Tailwind CSS v4**. This is a merged, from-scratch rebuild that consolidates the two starter codebases (`learning-mgt`, `learning_platform`) into one cohesive app, styled to match the provided design reference.

Frontend-only demo: all data (auth, enrollment, lesson progress, quiz scores) is stored in the browser's `localStorage` — there is no backend.

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build      # production build to /dist
npm run preview    # preview the production build
```

Requires Node 18+.

## Features

- **Home page** — hero, categories, popular courses, how-it-works, testimonials, CTA
- **Course catalog** (`/courses`) — search, category & level filters, sorting
- **Course detail** (`/courses/:slug`) — curriculum accordion, instructor info, enroll CTA, related courses
- **Lesson player** (`/courses/:slug/learn`) — video area, lesson sidebar, next/prev navigation, mark-complete, progress bar
- **Quiz system** (`/courses/:slug/quiz`) — start screen, one question at a time, progress indicator
- **Quiz results** (`/courses/:slug/quiz/result`) — pass/fail state, score breakdown, review answers
- **Student dashboard** (`/dashboard`) — stats, in-progress courses, completed courses, recommendations, recent activity
- **Auth** — login & signup (`/login`, `/signup`), demo-only accounts stored in `localStorage`
- **Profile** (`/profile`) — edit name/title, view enrolled courses & progress
- **Responsive nav & footer**, mobile menu, breadcrumbs throughout

## Architecture

```
src/
  components/    Reusable UI (Navbar, Footer, CourseCard, ProgressBar, ProgressRing, Button, ...)
  pages/         Route-level views
  context/       AuthContext (login/signup/session) + LearningContext (enrollment/progress/quiz)
  data/          Mock course catalog (src/data/courses.js) — swap this out for a real API later
```

State management uses React Context + `useState`/`useEffect`, persisted to `localStorage`:
- `lms_auth_user` / `lms_users_db` — session + demo user "database"
- `lms_learning_<userId>` — per-user enrollments, lesson progress, quiz results

## Notes for going to production

- Replace `src/data/courses.js` with real API calls (e.g. React Query) behind the same shape.
- Replace the demo `AuthContext` with real authentication (JWT/session) — passwords are currently stored in plaintext in `localStorage`, which is only acceptable for a frontend demo.
- Swap the YouTube `iframe` placeholders in the lesson player for your real video hosting/player.
