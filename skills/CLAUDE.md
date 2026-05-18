# CLAUDE.md - AI Development Guide

## Project Overview

Virtual Internships Platform frontend - React/TypeScript SPA supporting two user experiences:

- **Intern**: Internship discovery, applications, and management
- **Company**: Talent management, candidate review, and offer workflows

## Skills (Detailed Guidelines)

| Skill                                                                | Command                 | Description                                           |
| -------------------------------------------------------------------- | ----------------------- | ----------------------------------------------------- |
| [Component Guidelines](.claude/skills/component-guidelines/SKILL.md) | `/component-guidelines` | Core architecture, conventions, and coding patterns   |
| [Testing Guidelines](.claude/skills/testing-guidelines/SKILL.md)     | `/testing-guidelines`   | Testing patterns, mocking, and best practices         |
| [Debugging Guidelines](.claude/skills/debugging-guidelines/SKILL.md) | `/debugging-guidelines` | Debug strategies, error tracking, and troubleshooting |
| [UI Skills](.claude/skills/ui-skills/SKILL.md)                       | `/ui-skills`            | Typography, animation, styling constraints            |
| [Browser Skill](.claude/skills/browser-skill/SKILL.md)               | `/browser-skill`        | Visual and functional validation in browser           |
| [Figma to Code](.claude/skills/figma-to-code/SKILL.md)               | `/figma-to-code [url]`  | Build React components from Figma designs using MCP   |
| [PR Review](.claude/skills/pr-review/SKILL.md)                       | `/pr-review [url]`      | Review code changes against project conventions       |
| RAMS (A11y Review)                                                   | `/rams [file]`          | Run accessibility and visual design review            |

## Auto-Invoke Skills (IMPORTANT)

**You MUST automatically invoke the relevant skill BEFORE starting work on these tasks:**

| Task Type                                                              | Skill to Invoke         |
| ---------------------------------------------------------------------- | ----------------------- |
| Creating/modifying components, hooks, pages, or API integrations       | `/component-guidelines` |
| Writing tests, fixing test failures, or setting up test infrastructure | `/testing-guidelines`   |
| Investigating bugs, errors, or unexpected behavior                     | `/debugging-guidelines` |
| Implementing UI styling, typography, or animations                     | `/ui-skills`            |
| Implementing UI from a Figma design URL                                | `/figma-to-code [url]`  |
| E2E testing, visual verification, or browser automation                | `/browser-skill`        |
| Reviewing code changes or PRs                                          | `/pr-review [url]`      |
| Checking accessibility or visual design consistency                    | `/rams [file]`          |

**Rules:**

1. **Plan before implementing** - Before creating any component or feature, first create a plan and get user approval before writing any code
2. Invoke the skill at the START of the task, before writing any code
3. If multiple skills apply, invoke the most relevant one (e.g., `/component-guidelines` for new components)
4. Use the skill's guidance throughout the implementation
5. For Figma/PR tasks, the URL parameter is required

## Tech Stack

- **Framework**: React 18.2, TypeScript 5.8, Vite 6.3
- **State**: Redux Toolkit + RTK Query, redux-persist
- **UI**: MUI 5.14, Mantine 8.2
- **Forms**: React Hook Form + Yup validation
- **Styling**: SCSS modules, MUI styled(), utility classes
- **Testing**: Jest 29, React Testing Library
- **Routing**: React Router v7

## Project Structure

```
src/
├── common/           # Shared components, hooks, utils
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom hooks
│   └── pages/        # Shared pages
├── company/          # Host company features
│   ├── components/   # Company-specific components
│   └── pages/        # Company pages
├── intern/           # Intern features
│   ├── components/   # Intern-specific components
│   └── pages/        # Intern pages
├── redux/
│   ├── store/        # Store configuration
│   └── slices/       # RTK slices and RTK Query APIs
├── routes/           # React Router configuration
└── utils/            # Utility functions
```

## Common Commands

```bash
yarn start          # Dev server
yarn build          # Production build
yarn test           # Run tests
yarn test:watch     # Tests in watch mode
yarn test:coverage  # Tests with coverage
yarn lint           # ESLint check
yarn lint:fix       # ESLint fix
yarn format         # Prettier format
```

## Accessibility Testing

### axe-core Integration

- **jest-axe** is integrated for automated accessibility testing
- A11y tests run automatically on pre-commit for changed `.tsx/.jsx` files
- Use `yarn test:a11y` to run all accessibility tests manually
- **Every component test file MUST include an accessibility test** (see [Testing Guidelines](.claude/skills/testing-guidelines/SKILL.md))

### /rams for Design Review

- **Run `/rams` command** in your AI editor (Claude Code, Cursor, or Antigravity) to review components
- Run `/rams <file.tsx>` to check specific files for WCAG 2.1 accessibility issues
- Fix all critical accessibility issues (missing alt text, icon-only buttons without aria-label, form inputs without labels) before committing
- Check components for visual design consistency (spacing, typography, color contrast)

## Git Commit Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```bash
type(scope): subject
```

**Rules:**

- **Maximum 100 characters** for commit message subject line
- Example: `feat(auth): add OTP validation to login flow`

| Type       | Purpose                            |
| ---------- | ---------------------------------- |
| `feat`     | New feature                        |
| `fix`      | Bug fix                            |
| `docs`     | Documentation only changes         |
| `style`    | Code formatting, no logic changes  |
| `refactor` | Code restructure without features  |
| `test`     | Adding or updating tests           |
| `chore`    | Maintenance tasks (build, config)  |
| `ci`       | CI/CD config updates               |
| `build`    | Build system or dependency updates |

### Pre-commit Hooks (Husky + lint-staged)

- ESLint runs on `*.js`, `*.jsx`, `*.tsx` files
- Stylelint runs on `*.css`, `*.scss` files
- Prettier formats all staged files
- Commitlint validates commit message format
- **NEVER skip pre-commit hooks** - Do NOT use `--no-verify` when committing. All commits must pass through the pre-commit hooks (lint, format, commitlint). If a hook fails, fix the issue and commit again.

## Import Order

```tsx
// 1. Library imports (React, third-party)
import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import _get from 'lodash/get';

// 2. Components/containers — named-path AND relative ./components/ in ONE block (no blank lines between them)
import UserAvatar from 'Common/Components/UserAvatar';
import MyLocalWidget from './components/MyLocalWidget';

// 3. Hooks — custom hooks AFTER components (named-path and local in ONE block)
import { useClipboard } from 'Common/Hooks/useClipboard';
import { useComponentLogic } from './hooks/useComponentLogic';

// 4. Redux (slices, hooks)
import { useAppDispatch } from 'Redux/Store';
import { showSnackbar } from 'Redux/Slices/Common/SnackbarSlice';

// 5. Utils/helpers — ALWAYS before constants
import { formatDate } from 'Utils/Common/utils';
import { helperFn } from './helpers/component.utils';

// 6. Constants — ALWAYS after utils/helpers
import { USER_ROLES } from 'constants/user';
import { MY_CONST } from './constants/component.constants';

// 7. CSS/SCSS
import './component.scss';
```

## Critical Rules

### Before ANY Implementation

- **STOP and READ** the skill files FIRST
- Do NOT write code until you have read and understood these guidelines.
- Ask user questions if you have any doubt regarding the requirements or guidelines.

### No Hardcoded or Random Values

- **NEVER** use hardcoded, random, or made-up fallback values for API payload fields (e.g., `?? 12`, `?? 20`, `|| 'someDefault'`)
- If real data is unavailable (undefined/null), **omit the field entirely** from the payload — do not substitute a placeholder value
- Only use fallbacks that are explicitly defined in product/business logic (e.g., "if start date is in the past, use next Monday")

### Error Handling

- **NEVER** swallow errors silently
- Use `showErrorMessage` with type `CONTACT_SUPPORT` and `transactionId` for user-facing errors
- Use `onQueryStartedErrorToast` from `Util/rtkQueryErrorHandler` for RTK Query error handling
- Ignore aborted request errors (don't show error toast for cancelled requests)
- Always provide fallback message: `errorMessage || 'Something went wrong'

### UI States

- Always handle ALL states: loading, error, empty, success
- Show skeleton loaders during data fetching
- Skeletons must mirror final content exactly to avoid layout shift
- Every list needs an empty state component
- Use `useLazyQuery` when fetch should be triggered manually

### Mutations

- Disable buttons during async operations
- Show loading indicator on buttons (spinner/disabled state)
- Use `.unwrap()` to handle mutation results with try/catch
- Use showSuccessMessage after successful mutations
- Use showErrorMessage on mutation failure
- Invalidate related caches after mutations using `invalidateTags`

### API & State Management

- Use AbortController for cancellable requests (search, navigation)
- Use RTK Query `updateQueryData` for single item updates (avoid full list refetch)
- Cancel pending requests on component unmount to prevent memory leaks

### Testing

- Write failing test first (TDD approach)
- Use factory pattern: `getMockX(overrides)` for test data
- Test behavior, not implementation
- Run tests before committing
- PRs must maintain or increase test coverage
- Coverage drops will block PR merge

### Performance

- Virtualize large lists
- Set explicit image dimensions to prevent CLS (Cumulative Layout Shift)
- Reserve space for images before they load

### Dialogs & Modals

- **Always use `MuiDialog` from `mui-dialog`** — never use raw MUI `<Dialog>` directly
- `MuiDialog` provides: `MODAL_TYPES` (INFORMATION, CONFIRMATION, INPUT), `MODAL_SIZES` (SMALL, MEDIUM, LARGE), and subtypes (ACKNOWLEDGEMENT, PASSIVE, DESTRUCTIVE, DEFAULT)
- Use `showActions={false}` when providing custom action buttons inside the modal content
- **Conditionally render modals** — don't mount when closed: `{isOpen && <Modal />}`

### Typography (CRITICAL)

- **ALWAYS use `<Typography variant='...'>` for ALL visible text elements** — never raw `<span>`, `<div>`, or `<p>` with `font-size`/`font-weight` in SCSS
- Use MUI Typography with a specific-path import: `import Typography from '@mui/material/Typography';` (never barrel `import { Typography } from '@mui/material'`)
- Pick the closest theme variant — do NOT add `font-size`/`font-weight` to SCSS to match a design; if no variant fits, use the closest one
- Available variants: `displayL/M`, `headingL/M/S`, `semiBoldLabelL/M/S/Xs/Xxs`, `regularLabelL/M/S/Xs/Xxs`
- Use `component` prop to render semantic HTML: `<Typography variant='regularLabelM' component='p'>`, `<Typography ... component='h3'>`
- SCSS may still handle `color`, `letter-spacing` (if custom), `text-transform`, and `text-overflow` on the same element
- **Exception (rare)**: responsive section headings using `clamp()` font sizes — document why no variant fits

### MUI Buttons (CRITICAL)

- **ALWAYS use MUI `<Button>` or `<IconButton>` for clickable button elements** — never raw `<button>` in feature components
- Specific-path imports: `import Button from '@mui/material/Button';`, `import IconButton from '@mui/material/IconButton';`
- Style via `className` + SCSS; NEVER use `sx` prop
- Examples: filter pills, toggle buttons, carousel nav arrows, CTAs — all MUST be MUI components

### Render Functions in Helpers (CRITICAL)

- **ANY function that returns JSX and uses `.map()`/`.filter()`/`.reduce()` MUST live in `helpers/[componentName].renderers.tsx`** — never inline in `index.tsx`
- Even small render helpers (3-line renderers) MUST go to helpers
- `index.tsx` should only contain: state hooks, effect hooks, event handlers that call renderer functions, and the root JSX tree
- Data mappers (API response → view model) MUST live in `helpers/[componentName].utils.ts`
- Examples: `renderFooterLinks`, `renderNavLinks`, `renderFaqItem`, `mapApiTestimonial`, `mapApiToCard` — all MUST be in helper files

### Magic Numbers (CRITICAL)

- **ZERO tolerance for unnamed numeric literals in logic** (timings, indices, limits, offsets, thresholds)
- Define as `SCREAMING_SNAKE_CASE` constants at the top of the file, or in `[feature].constants.ts` / `[component].constants.ts`
- Examples: `WORD_TRANSITION_MS = 360`, `SLOT_CENTER_INDEX = 3`, `MAX_VISIBLE_AVATARS = 6`, `SCROLL_THRESHOLD_PX = 60`
- Acceptable inline literals: `0`, `1` (array start/step), CSS units in `style={{ translateZ: 30 }}` (document via constant if reused)

### Image Elements

- ALL `<img>` tags MUST have explicit `width` and `height` attributes (prevents CLS)
- Below-fold images MUST have `loading='lazy'`
- Partner/brand logos served from dynamic URLs MUST still have concrete dimensions (or `max-width`/`max-height` fallback in SCSS)

### SCSS File Size

- **SCSS files > 200 lines → split the component into sub-components**
- If a component has multiple visual sections (header, body, footer, expand-panel), each MUST be its own sub-component with its own `index.tsx` + `scss`
- Parent composes children; never cram all styles into one monolithic SCSS

### Optional Chaining

- Prefer `a?.b?.c` over `a && a.b && a.b.c` for property access
- Prefer `obj?.items?.length > 0` over `obj && obj.items && obj.items.length > 0`
- For conditional rendering with data access: `{user?.name && <span>{user.name}</span>}`

### Documentation

- PRDs go in `docs/` at project root (e.g., `docs/PRD-FEATURE-NAME.md`), not inside feature folders

## Quick AI Instructions

### DO

- Search ALL existing components before creating new ones
- Use TypeScript interfaces for all props (NEVER use `any`) — **all interface names must start with `I`** (e.g., `IComponentProps`, `IUserData`, `IPipelineCandidate`)
- Follow component file structure (index.tsx + scss + hooks/ + helpers/ + constants/) — **every `.tsx` component MUST be `folder/index.tsx`, never a standalone `component.tsx` file**
- **All folder names must be camelCase** — e.g. `components/`, `hooks/`, `helpers/`, `myFeature/` (never PascalCase like `Components/`)
- Use RTK Query for API calls
- Keep files under 300 lines
- Extract business logic to custom hooks
- Maintain filters in URL params (not localStorage)
- Import lodash with `_` prefix (`_get`, `_map`)
- **Always use lodash for dynamic data iteration** — Use `_map`, `_forEach`, `_filter` instead of native `.map()`, `.forEach()`, `.filter()` for API responses and dynamic arrays. Native methods are only acceptable on constant/static arrays defined in code.
- Always use `showSuccessMessage` to show success snackbar or toast
- Always use **Arrow functions only** - Use `const XYZ = () => {}` not `function XYZ() {}`
- **Always use Typography variants** - Use the project's custom Typography variants (`semiBoldLabelM`, `textM`, `semiBoldLabelXxs`, etc.) from `src/muiTheme.ts` instead of custom `font-size`/`font-weight` in SCSS. Never hardcode font styles when a matching variant exists.
- **No MUI sx prop at all** - Never use `sx={{...}}` on any MUI component, not even for `borderBottom`, `borderColor`, `p`, etc. Move ALL styles to the component's `style.scss`
- **Use utility classes from general.scss** - If a utility class exists (e.g., `d-f`, `ai-c`, `jc-sb`, `gap-8`, `flex-dir-col`), use it instead of writing duplicate CSS/SCSS. Check `src/assets/scss/common/general.scss` for available utilities.
- **Separate media queries** - Always write `@media` queries as a separate block at the bottom of the SCSS file, outside of the main selector. Never nest `@media` inside BEM selectors.
- **Always use MUI `<Typography variant='...'>` for visible text** — never raw `<span>`/`<div>`/`<p>` with font-size/font-weight in SCSS
- **Always use MUI `<Button>`/`<IconButton>` for buttons** — never raw `<button>` in feature components
- **Always extract render functions to `helpers/[component].renderers.tsx`** — never inline in `index.tsx` (even tiny 3-line ones that use `.map()`)
- **Always extract API→view mappers to `helpers/[component].utils.ts`** — never inline in `index.tsx`
- **Always define magic numbers as named constants** — zero unnamed numeric literals in logic
- **Always add `width` and `height` to `<img>`** — prevents CLS
- **Split SCSS files >200 lines** into sub-components

### DON'T

- Create duplicate components without searching first
- Put business logic directly in component JSX
- Put render functions with loops (`map`, `filter`, etc.) directly in the component — extract them to `helpers/componentName.renderers.tsx`
- Use inline styles (except for dynamic values)
- Hardcode `font-size`/`font-weight` in SCSS — use MUI Typography variants instead (see `src/muiTheme.ts` for available variants)
- Skip error handling for API calls
- Use `any` type
- Use `map` when not returning anything (use `forEach`)
- Use native `.map()`, `.forEach()`, `.filter()` on dynamic/API data — always use lodash (`_map`, `_forEach`, `_filter`) instead. Native methods are only for constant arrays.
- Have more than 2 arguments in functions (use object instead)
- Duplicate CSS styles that already exist as utility classes in `general.scss`
- Use hardcoded strings in components — move all UI text/labels to a constants file
- Use `useMemo`/`useCallback` for simple derived values that don't involve expensive computation — plain variables are sufficient
- Use `useCallback` unless the function is **passed as a prop to a memoized child component** — functions used only within the same hook or component don't need `useCallback`
- Leave session/local storage flags uncleaned — always clean up temporary flags on component unmount via `useEffect` cleanup
- Push a branch without rebasing — always run `git rebase origin/main` (or the base branch) after committing and before pushing/opening a PR
- Use raw MUI `Dialog` — always use `MuiDialog` from `mui-dialog` package (see Dialogs & Modals section below)
- Use template literal string concatenation for conditional CSS classes — use `classNames` utility from `classnames` package instead
- Mount modals/dialogs when they are closed — always conditionally render: `{isOpen && <Modal />}`
- Use underscore prefix for unused function params (e.g., `_param`) — name params properly even if unused in the current implementation
- Name a component differently from its folder — folder name and default export component name must match (e.g., folder `whatsappNudge` → component `WhatsappNudge`, NOT `WhatsappNudgeContainer`)
- Use raw `<span>`/`<div>`/`<p>` for visible text with `font-size`/`font-weight` styles — use `<Typography variant='...'>` instead
- Use raw `<button>` for clickable buttons in feature components — use MUI `<Button>` or `<IconButton>`
- Put render functions with `.map()`/`.filter()` inline in `index.tsx` — even small ones go to `helpers/[component].renderers.tsx`
- Put API→view mappers inline in `index.tsx` — extract to `helpers/[component].utils.ts`
- Use unnamed numeric literals in logic (timings, indices, thresholds) — define as `SCREAMING_SNAKE_CASE` constants
- Omit `width`/`height` on `<img>` tags — causes CLS
- Let SCSS files grow past 200 lines — split the component into sub-components with their own SCSS
