# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (--force flag clears Vite cache)
npm run build        # Production build (output dir set by VITE_OUT_DIR env var)
npm run lint-fix     # Auto-fix ESLint issues in src/ (.js, .jsx, .vue)
```

There are no test commands configured.

## Architecture

This is a **Vue 3 + TypeScript** SPA for the FIC (Foreign Investors Council) of Uzbekistan. It has two distinct surfaces sharing one Vite app:

1. **Public website** (`/`) — rendered by `WebsiteLayout.vue`, routes in `src/router/modules/website.routes.ts`
2. **Admin panel** (`/admin`) — rendered by `MainLayout.vue` with a collapsible sidebar, routes in `src/router/modules/index.ts`. Requires authentication; redirects to `/admin/login` when unauthenticated.

### Router guards (`src/router/guards/`)
Three guards run in order on every navigation:
- `loading.guard.ts` — NProgress bar (registered first so it wraps the others)
- `auth.guard.ts` — checks token, redirects unauthenticated users away from protected routes
- `role.guard.ts` — enforces per-route role requirements

Routes marked `meta: { isPublic: true }` skip auth entirely. Website routes use `meta.titleKey` (i18n key) and `meta.heroImage` to drive the shared `WebHeroSection` banner; set `meta: { noHero: true }` to suppress it.

### API → Store rule
**All API calls must go through Pinia stores. Components never call services directly.**

Pattern for a new feature:
1. `src/features/<feature>/services/index.service.ts` — raw axios calls, returns typed data
2. `src/features/<feature>/store/index.ts` — Pinia store with `loading`, `error`, and state; actions call the service
3. Component calls `useXxxStore()` and invokes store actions

See `src/features/news/store/index.ts` for the canonical example (fetchAll, createItem, updateItem, deleteItem — each sets `loading`, catches to `error`, finally resets `loading`).

### API layer (`src/services/`)
- `api.ts` creates a single Axios instance with `VITE_BASE_API` as `baseURL`
- Interceptors in `src/services/interceptors/`:
  - `auth.interceptor.ts` — injects `Authorization: Bearer <token>` on requests; resets store and redirects to `/login` on 401
  - `error.interceptor.ts` — global error handling
- Global services live in `src/services/modules/` (e.g. `user.service.ts`); feature services belong inside `src/features/<feature>/services/`

### State (`src/stores/`)
- `user.ts` — auth state: access/refresh tokens persisted in cookies (`src/utils/cookies.ts`), user profile in memory. Handles login, logout, token refresh, and `fetchUserInfo`.
- `file.ts` — file upload state
- Feature stores live in `src/features/<feature>/store/`

### Permissions (`src/constants/permissions.constants.ts` + `src/composables/usePermissions.ts`)
Permissions follow the pattern `action:resource` (e.g. `create:courses`). The `usePermissions()` composable exposes `canAccess(resource, action)`, `hasRole([...])`, and `isAdmin`. User permissions come from `userStore.user.permissions` (server-provided array).

### Composables (`src/composables/`)
- `useCrudTable` — wraps paginated list fetching + delete with ElMessage confirmations
- `useForm` — wraps Element Plus form validation + submission with loading state
- `usePermissions` — role/permission checks
- `useModal`, `useLocale`, `useMarquee`, `useBeutify`, `useUsernameValidation`

### Feature module structure
New features go in `src/features/<feature>/` with this layout:
```
components/   # UI components for this feature
composables/  # feature-specific composables
services/     # index.service.ts — raw axios calls
store/        # index.ts — Pinia store (calls service, not axios directly)
types/        # TypeScript interfaces
styles/       # (optional) scoped SCSS
```

---

## i18n (Localization)

**Every user-visible string must use `$t()` / `useI18n()` — no hardcoded text in templates.**

- Three locales: `uz` (default + fallback), `ru`, `en`
- Translation files: `src/assets/locales/uz.json`, `ru.json`, `en.json`
- All three files must be updated together when adding new keys
- Default/fallback locale is `uz`; if a key is missing in `ru`/`en`, `uz` is shown
- Switch language via `setLocale(locale)` from `src/utils/i18n.ts`; saved to `localStorage`
- For arrays/nested objects in translations, use `const items = computed(() => (tm('key') as any[]).map(i => rt(i)))`

---

## Responsive Design (Mobile-first)

Tailwind breakpoints (defined in `tailwind.config.js`):
```
(no prefix)  — mobile   < 768px
md:          — tablet   768px+  (iPad)
lg:          — desktop 1024px+
xl:          — wide    1280px+
```

**Rules:**
- Write mobile styles first, then override with `md:`, `lg:`, `xl:` prefixes
- For touch/swipe events use `touchstart`/`touchend` (see `HomeHero.vue` for pattern); minimum 40px swipe threshold
- Use `clamp()` for fluid font sizes: `text-[clamp(15px,1.3vw,18px)]` — clamp scales between mobile min and desktop max
- Full-width on mobile → multi-column on tablet+: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- On mobile, dark overlay (`bg-[rgba(10,14,20,0.55)]`) replaces gradient overlays used on desktop

---

## Design System

### Layout
- **Page wrapper**: always use `.page-container` (`max-w-[1400px] mx-auto px-4 md:px-6`)
- **Section padding**: `py-16 md:py-24` for major sections
- **Section title**: use `.section-title` class (`font-black text-[clamp(32px,5vw,64px)] leading-[1.05] text-[#1a1e2e] uppercase`)

### Colors (all defined in `tailwind.config.js` and `src/assets/styles/var.scss`)
| Token | Value | Usage |
|---|---|---|
| `#1a1e2e` | dark navy | headings, primary text, dark backgrounds |
| `#444` / `#505a63` | medium gray | body text |
| `#8a94a6` | light gray | captions, meta |
| `#eef0f4` | border | card borders |
| `#f7f8fa` | light bg | card backgrounds |
| `primary` / `--el-color-primary` | `#191c1f` | Element Plus overrides, buttons |

### Cards
Standard card: `rounded-2xl border border-[#eef0f4] shadow-[0_2px_24px_rgba(0,0,0,0.07)] p-5 md:p-7`

### Buttons / Links
Outline pill: `inline-flex items-center gap-2 border border-[#d0d5dd] text-[#1a1e2e] font-semibold text-[15px] px-7 py-3 rounded-full transition-all duration-200 hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e]`

### Typography
- Primary font: **Onest** (set globally in `app.scss`)
- Body text: `text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed`
- Small meta: `text-[13px] text-[#8a94a6]`
- Card title: `font-bold text-[17px] text-[#1a1e2e]`

### Animations
- Page transitions: `fade` (opacity 0.2s) in `WebsiteLayout`, `slide-right` in `MainLayout`
- GSAP (`gsap`) is used for hero slider animations and complex entrance effects
- Simple entrance: `gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' })`

### Website page structure
Each website page follows this pattern:
- `src/views/website/<page>/Index.vue` — thin orchestrator, just imports and composes section components
- `src/views/website/<page>/components/<PageSection>.vue` — individual sections (named `<PageName><SectionName>.vue`)
- Sections are `<section>` tags with background color, padding, and `.page-container` inside

### Adding a new website route
1. Create view at `src/views/website/<page>/Index.vue`
2. Add route to `src/router/modules/website.routes.ts` with `meta.titleKey` (i18n key) and `meta.heroImage`
3. Add translation keys to all three locale files
4. If `noHero: true`, the shared hero banner is suppressed

---

## Path alias

`@` resolves to `src/`. Always use `@/` for cross-directory imports, never relative `../..` paths.

## Environment files

`.env.development`, `.env.production`, `.env.staging`, `.env.test` — the critical variable is `VITE_BASE_API` (backend base URL). Vite `mode` selects which file is loaded.

## SVG icons

Icons in `src/assets/images/icons/` are processed by a custom `svgBuilder` Vite plugin. Use the `<svg-icon name="...">` component; the `name` matches the SVG filename without extension.
