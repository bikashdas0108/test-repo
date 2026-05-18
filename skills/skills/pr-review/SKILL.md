---
name: pr-review
description: Review PRs and code changes against MOO Platform conventions. Use to check code quality, patterns, and identify issues before merging.
argument-hint: [pr-url-or-branch]
---

# PR Review Checklist

Use this skill to review code changes against project standards.

## How to Use

```bash
# Review current branch changes
/pr-review

# Review specific PR
/pr-review https://github.com/org/repo/pull/123

# Review specific files
/pr-review src/Components/MyComponent
```

## Review Checklist

### 1. Code Style

| Check     | Rule                                                     |
| --------- | -------------------------------------------------------- |
| Functions | Use `const fn = () => {}` not `function fn() {}`         |
| Imports   | Library imports (including `@mui/*` icons) at TOP        |
| Styling   | No inline styles, no `sx={{ mt: 3 }}` - use `style.scss` |
| Quotes    | Single quotes for strings and JSX attributes             |
| Types     | No `any` - use proper TypeScript interfaces              |

### 2. Component Structure

| Check     | Rule                                                              |
| --------- | ----------------------------------------------------------------- |
| Folder    | Has `index.tsx`, `style.scss`, `constants/`, `helpers/`, `hooks/` |
| File Size | Max 300 lines per file                                            |
| Props     | Interface prefixed with `I` (e.g., `IComponentProps`)             |
| Export    | `export default ComponentName` at bottom                          |
| Naming    | Folder name matches component name (no `Container` suffix etc.)   |
| Dialogs   | Uses `MuiDialog` from `mui-dialog`, not raw MUI `Dialog`         |
| Modals    | Conditionally rendered: `{isOpen && <Modal />}`                   |
| Classes   | Uses `classNames()` utility, not template literal concatenation   |

### 3. State & API

| Check     | Rule                                            |
| --------- | ----------------------------------------------- |
| RTK Query | Uses `onQueryStarted: onQueryStartedErrorToast` |
| Mutations | Uses `.unwrap()` with try/catch                 |
| Cache     | `invalidatesTags` returns `[]` on error         |
| Loading   | Handles `isLoading`, `isFetching` states        |
| Empty     | Handles empty data state                        |
| Error     | Shows error feedback via `showSnackbar`         |

### 4. React Best Practices

| Check       | Rule                                                                            |
| ----------- | ------------------------------------------------------------------------------- |
| Hooks       | Not too many `useState`/`useEffect` - extract to custom hooks                   |
| Handlers    | `useCallback` ONLY for functions passed to memoized children (not internal use) |
| Memoization | `useMemo`/`useCallback` only when necessary                                     |
| Lodash      | Import with `_` prefix (`_get`, `_map`)                                         |

### 5. Testing

| Check    | Rule                                                 |
| -------- | ---------------------------------------------------- |
| Coverage | New code has tests                                   |
| Location | Tests in `src/__tests__/` mirroring source structure |
| Mocks    | RTK Query hooks properly mocked                      |
| States   | Tests cover loading, error, empty, success states    |

### 6. Security & Performance

| Check       | Rule                                              |
| ----------- | ------------------------------------------------- |
| XSS         | No `dangerouslySetInnerHTML` without sanitization |
| Secrets     | No hardcoded API keys, tokens, credentials        |
| Large Lists | Virtualized if > 100 items                        |
| Images      | Have explicit dimensions to prevent CLS           |

## Review Commands

```bash
# Get changed files
git diff --name-only origin/main...HEAD

# Get full diff
git diff origin/main...HEAD

# Check specific file
git diff origin/main...HEAD -- src/Components/MyComponent/index.tsx
```

## Review Output Format

When reviewing, provide feedback in this format:

```markdown
## PR Review: [Component/Feature Name]

### Summary

Brief description of what the PR does.

### Issues Found

#### Critical (Must Fix)

- [ ] Issue description with file:line reference

#### Warnings (Should Fix)

- [ ] Issue description with file:line reference

#### Suggestions (Nice to Have)

- [ ] Suggestion with file:line reference

### Checklist

- [ ] Code style follows conventions
- [ ] Component structure is correct
- [ ] Error handling implemented
- [ ] Loading/empty states handled
- [ ] Tests added/updated
- [ ] No security concerns

### Verdict

- [ ] Approved
- [ ] Approved with suggestions
- [ ] Changes requested
```

## Common Issues to Flag

### Import Order Violation

```tsx
// ❌ WRONG
import HeaderBar from 'Components/Header';
import PersonIcon from '@mui/icons-material/Person'; // Should be at top

// ✅ CORRECT
import PersonIcon from '@mui/icons-material/Person';
import HeaderBar from 'Components/Header';
```

### Inline Styles

```tsx
// ❌ WRONG
<Box sx={{ mt: 3, mb: 4 }}>
<div style={{ padding: 16 }}>

// ✅ CORRECT
<Box className='container'>  // styles in style.scss
```

### Function Declaration

```tsx
// ❌ WRONG
function handleClick() { ... }
export default function Component() { ... }

// ✅ CORRECT
const handleClick = () => { ... };
const Component = () => { ... };
export default Component;
```

### Missing Error Handling

```tsx
// ❌ WRONG
const [updateData] = useUpdateDataMutation();
await updateData(payload);

// ✅ CORRECT
const [updateData] = useUpdateDataMutation();
try {
  await updateData(payload).unwrap();
  dispatch(showSnackbar({ severity: 'success', ... }));
} catch (error) {
  dispatch(showSnackbar({ severity: 'error', ... }));
}
```

### Missing Loading State

```tsx
// ❌ WRONG
const { data } = useGetDataQuery();
return <List items={data} />;

// ✅ CORRECT
const { data, isLoading } = useGetDataQuery();
if (isLoading && !data) return <Skeleton />;
if (!data?.length) return <EmptyState />;
return <List items={data} />;
```

## Integration with GitHub

```bash
# Fetch PR details
gh pr view 123

# Get PR diff
gh pr diff 123

# List changed files
gh pr diff 123 --name-only

# Add review comment
gh pr review 123 --comment --body "Review feedback here"

# Approve PR
gh pr review 123 --approve

# Request changes
gh pr review 123 --request-changes --body "Changes needed"
```
