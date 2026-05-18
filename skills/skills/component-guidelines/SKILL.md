# Component Guidelines

## 1. Component Reusability (CRITICAL)

**BEFORE creating any new component**, search ALL existing components:

- `src/Common/Components/` - Shared components
- `src/Intern/Components/` - Intern-specific components
- `src/Company/Components/` - Company-specific components
- `*/Pages/*/Components/` - Page-level components

If a component could be reused across domains, move it to `Common/Components/`.

## 2. File Size Limit (CRITICAL)

**Maximum 300 lines per React file.**

If exceeding, break into:

- Smaller sub-components
- Helper files (utility functions, render functions, extracted logic)
- Custom hooks for business logic and state/effects

## 3. Component File Structure

```
componentName/
├── index.tsx                              # UI only (max 300 lines)
├── componentName.scss                     # Styles
├── helpers/                               # Utility functions, render functions
│   ├── componentName.general.ts          # General utility functions
│   ├── componentName.renderers.tsx       # Small render functions (JSX)
│   └── componentName.utils.ts            # Data transformations, validators
├── constants/                             # All constants
│   ├── componentName.general.ts          # General constants
│   └── componentName.enums.ts            # Enums and types
├── hooks/                                 # Custom hooks (business logic + state)
│   ├── useGetTableData.ts                # Hook for table data
│   └── useFormValidation.ts              # Hook for form logic
└── Components/                            # Sub-components (follow same pattern)
    └── subComponent/
        ├── index.tsx
        └── subComponent.scss
```

**CRITICAL: Every `.tsx` component file MUST be `index.tsx` inside a named folder.** Never create standalone `.tsx` files like `componentName.tsx` — always use `componentName/index.tsx`. This applies to ALL components including sub-components in `components/` directories.

**File/folder naming conventions:**

- **Component folders**: camelCase (e.g., `deadlineMissedModal/`, `questionCard/`)
- **Folder name must match component name** — if folder is `whatsappNudge`, the default export must be `WhatsappNudge` (not `WhatsappNudgeContainer` or any other suffix)
- Helpers: `componentName.[functionality].ts` (e.g., `componentName.general.ts`)
- Constants: `componentName.[type].ts` (e.g., `componentName.enums.ts`)
- Hooks: `use[Functionality].ts` (e.g., `useGetTableData.ts`)
- **All UI strings/labels** must be in constants files, not hardcoded in components

## 4. Component Design Principles

- **SRP (Single Responsibility)**: Each component does ONE thing well
- **DRY (Don't Repeat Yourself)**: Extract repeated logic to helpers/hooks
- **Dumb Components**: Prefer presentational components that receive data via props
- **No Magic Numbers**: Define all numbers as named constants
- **No Inline Functions in JSX**: Extract all inline handler functions (e.g., `onKeyDown`, `onClick` with logic) into named functions defined in the component body. Simple one-liner prop-forwarding callbacks like `() => onSelect(value)` are acceptable.
- **No Variable Declarations Inside JSX**: Never declare variables (e.g., `const { x, y } = ...`) inside JSX map callbacks or render blocks. Extract the rendering logic into a renderer function in `helpers/componentName.renderers.tsx` and call it from JSX.
- **No Render Functions with Loops in Components**: Any function that returns JSX and uses `.map()`, `.filter()`, or other iteration must be extracted to `helpers/componentName.renderers.tsx` — never defined inline in the component body.
- Refer to: https://www.patterns.dev/react/ for design patterns

## 5. Separation of Concerns

| Layer            | Responsibility                                                         |
| ---------------- | ---------------------------------------------------------------------- |
| **UI Component** | Only rendering and user interactions (dumb components)                 |
| **Custom Hook**  | Business logic AND refactoring states/effect hooks from the component  |
| **Helper/Utils** | Utility functions, small render functions, extracted logic (stateless) |

Avoid multiple `useState`/`useEffect` in components - extract to custom hooks.

## 6. Component Template

```tsx
import React from 'react';
import { Typography, Button } from '@mui/material';

import { useComponentLogic } from './hooks/useComponentLogic';
import { formatData } from './helpers/componentName.utils';
import { COMPONENT_CONSTANTS } from './constants/componentName.general';

import './componentName.scss';

interface ComponentNameProps {
  title: string;
  onAction: () => void;
  isDisabled?: boolean;
}

const ComponentName: React.FC<ComponentNameProps> = ({ title, onAction, isDisabled = false }) => {
  const { data, isLoading, error, handleSubmit } = useComponentLogic();

  if (error) return <ErrorState error={error} />;
  if (isLoading && !data) return <LoadingSkeleton />;
  if (!data?.items?.length) return <EmptyState />;

  return (
    <div className='d-f flex-dir-col gap-16 p-24'>
      <Typography variant='h3'>{title}</Typography>
      <Button variant='contained' onClick={onAction} disabled={isDisabled || isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </Button>
    </div>
  );
};

export default ComponentName;
```

## 7. UI State Handling (CRITICAL)

### Loading State Decision Tree

```tsx
// CORRECT: Check error first, then loading ONLY when no data
if (error) return <ErrorState error={error} onRetry={refetch} />;
if (isLoading && !data) return <LoadingState />;
if (!data?.items?.length) return <EmptyState />;
return <ItemList items={data.items} />;
```

**Golden Rule:** Show loading ONLY when there's no data to display.
On refetch, keep showing existing data (don't replace with spinner).

### When to use Skeleton vs Spinner

| Type                 | Use Case                                                      |
| -------------------- | ------------------------------------------------------------- |
| **Skeleton loaders** | Known layouts (lists, cards, profiles, initial page loads)    |
| **Spinners**         | Unknown content (modals, form submissions, inline operations) |

## 8. Error Handling Hierarchy

Use appropriate error presentation based on severity:

| Level          | Use Case                          | Component                       |
| -------------- | --------------------------------- | ------------------------------- |
| 1. Inline      | Field validation errors           | Form field error text           |
| 2. Toast       | Recoverable errors, retry-able    | Snackbar via `showErrorMessage` |
| 3. Banner      | Page-level, partial functionality | Alert banner at top             |
| 4. Full Screen | Unrecoverable, no data            | `<ApiError />` component        |

**NEVER swallow errors silently** - users must always see feedback.

## 9. Button States for Mutations

```tsx
// CORRECT: Disable button AND show loading indicator
<Button disabled={isDisabled} loading={isLoading} onClick={handleSubmit}>
  {isLoading ? 'Saving...' : 'Save'}
</Button>
```

- Always disable buttons during async operations
- Show loading state (spinner or text change)
- Prevent double submissions

## 10. Empty States

Every list/collection MUST have an empty state:

```tsx
// Search results - no matches
<EmptyState
  icon={<SearchIcon />}
  title="No results found"
  description="Try adjusting your search terms"
/>

// Initial state - no data yet
<EmptyState
  icon={<AddIcon />}
  title="No items yet"
  description="Create your first item to get started"
  action={<Button onClick={onCreate}>Create Item</Button>}
/>
```

## 11. Optimistic Updates (Use Selectively)

For instant-feeling interactions (likes, favorites, toggles):

```tsx
const handleLike = async () => {
  // Update UI immediately
  setIsLiked(true);
  try {
    await likeItem(itemId);
  } catch (error) {
    // Rollback on error
    setIsLiked(false);
    dispatch(showSnackbar({ severity: 'error', message: 'Failed to like' }));
  }
};
```

## 12. Styling Conventions

### Conditional Class Names

Always use the `classNames` utility from `classnames` package for conditional CSS classes — never use template literal string concatenation:

```tsx
// BAD
<div className={`wnic p-16 ${isVisible ? 'wnic--visible' : 'wnic--hidden'}`}>

// GOOD
import classNames from 'classnames';
<div className={classNames('wnic', 'p-16', isVisible ? 'wnic--visible' : 'wnic--hidden')}>
```

### Utility Classes

```tsx
className = 'd-f'; // display: flex
className = 'flex-dir-col'; // flex-direction: column
className = 'jc-c ai-c'; // justify-content: center, align-items: center
className = 'jc-sb'; // justify-content: space-between
className = 'gap-16'; // gap: 16px
className = 'p-24'; // padding: 24px
className = 'mt-16 mb-8'; // margin-top: 16px, margin-bottom: 8px
```

### SCSS Module Pattern

```scss
// ComponentName/componentName.scss
.component-container {
  // Use kebab-case for class names
  &__header {
    /* BEM modifier */
  }
  &--active {
    /* BEM state */
  }
}
```

### Media Queries

Always write `@media` queries as a **separate block at the bottom** of the SCSS file, outside of the main selector. Never nest `@media` inside BEM selectors.

```scss
// CORRECT — media queries separated at the bottom
.my-component {
  display: flex;
  gap: 24px;

  &__sidebar {
    width: 300px;
  }
}

@media only screen and (max-width: 768px) {
  .my-component {
    flex-direction: column;

    &__sidebar {
      width: 100%;
    }
  }
}
```

```scss
// WRONG — media queries nested inside selectors
.my-component {
  display: flex;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
}
```

### MUI Styled Components

```tsx
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));
```

## 13. State Management

- **RTK Query**: REQUIRED for all API calls
- **Redux slices**: UI/sync state
- **useState**: Component-local state
- **Filters**: Maintain in URL params (NOT localStorage)

## 14. Hooks Best Practices

- Avoid multiple `useState`/`useEffect` - extract to custom hooks
- Use `memo`, `useMemo`, `useCallback` ONLY for expensive computations or referential equality needs — simple derived values (boolean checks, filtering small arrays) should be plain variables, not wrapped in `useMemo`
- **`useCallback` is only needed when the function is passed as a prop to a memoized child component.** Functions used only within the same hook or component (e.g., callbacks passed to another hook in the same file) do NOT need `useCallback`
- Use component-level code splitting for dynamic components

## 15. Function Arguments

If function has more than 2 arguments, pass as object:

```tsx
// BAD
calculateTotal(price, quantity, discount, tax);

// GOOD
calculateTotal({ price, quantity, discount, tax });
```

## 16. Lodash Usage

Import lodash methods with `_` prefix:

```tsx
import _get from 'lodash/get';
import _map from 'lodash/map';
import _set from 'lodash/set';
```

## 17. Loop Best Practices

```tsx
// BAD - using map without return
items.map((item) => {
  console.log(item);
});

// GOOD - use forEach when not returning
items.forEach((item) => {
  console.log(item);
});

// GOOD - use map when returning/transforming
const names = items.map((item) => item.name);
```

## 18. Code Hygiene

- Delete unused code and files immediately
- Every file must be TypeScript
- Use `interface` for props/state (not `type` for component props)
- NEVER use `any` - always define proper types
- Props interfaces prefixed with `I` (e.g., `IComponentProps`)

## Pre-Completion Checklist

Before marking a component complete, verify:

- [ ] Searched existing components before creating
- [ ] File under 300 lines
- [ ] Error handling implemented (not swallowed)
- [ ] Loading state shows ONLY when no data exists
- [ ] Empty state exists for lists/collections
- [ ] Buttons disabled during async operations
- [ ] User feedback on success/error (toast or inline)
- [ ] TypeScript interfaces defined (no `any`)
- [ ] Business logic extracted to hooks

## 19. Dialogs & Modals

- **Always use `MuiDialog` from `mui-dialog`** — never use raw MUI `<Dialog>` directly
- Available types: `MODAL_TYPES.INFORMATION`, `MODAL_TYPES.CONFIRMATION`, `MODAL_TYPES.INPUT`
- Available sizes: `MODAL_SIZES.SMALL`, `MODAL_SIZES.MEDIUM`, `MODAL_SIZES.LARGE`
- Use `showActions={false}` when providing custom action buttons inside the modal content
- **Conditionally render modals** — never mount when closed:

```tsx
// BAD — modal is always in the DOM
<MyModal open={isOpen} onClose={handleClose} />

// GOOD — modal only mounts when needed
{isOpen && <MyModal open={isOpen} onClose={handleClose} />}
```

## Anti-Patterns to AVOID

- Showing spinner when cached data exists
- Silently catching errors without user notification
- Buttons not disabled during loading
- Missing empty states for lists
- `any` type instead of proper TypeScript
- Multiple useState/useEffect in component (extract to hook)
- Magic numbers (use named constants)
- More than 2 function arguments without using object
- Using raw MUI `Dialog` instead of `MuiDialog` from `mui-dialog`
- Template literal concatenation for conditional classes instead of `classNames` utility
- Mounting modals/dialogs when they are closed (always use `{isOpen && <Modal />}`)
- Wrapping functions in `useCallback` that aren't passed to memoized children
- Component name not matching its folder name (e.g., folder `myComponent` but export is `MyComponentContainer`)
