---
name: browser-skill
description: Open browser and validate UI changes visually and functionally using Playwright MCP tools.
---

# Browser Skill

Use this skill to visually and functionally validate UI changes in the browser.

## How to use

- `/browser-skill`
  Start dev server and open browser for visual inspection.

- `/browser-skill <route>`
  Navigate to a specific route and validate the page.

## Prerequisites

- Dev server running at `http://localhost:3000` (`yarn start`)
- Playwright MCP tools available in Claude Code

## Workflow

### 1. Start Dev Server

Ensure the dev server is running:

```bash
yarn start
```

### 2. Navigate to Page

Use Playwright to open the target URL:

```
mcp__plugin_playwright_playwright__browser_navigate
URL: http://localhost:3000/<route>
```

### 3. Take Snapshot

Capture the accessibility tree (better than screenshots):

```
mcp__plugin_playwright_playwright__browser_snapshot
```

### 4. Check Console Errors

Review browser console for errors:

```
mcp__plugin_playwright_playwright__browser_console_messages
Level: error
```

### 5. Interactive Testing

Test user interactions:

| Action        | Tool                                                  |
| ------------- | ----------------------------------------------------- |
| Click element | `mcp__plugin_playwright_playwright__browser_click`    |
| Type text     | `mcp__plugin_playwright_playwright__browser_type`     |
| Fill form     | `mcp__plugin_playwright_playwright__browser_fill_form`|
| Press key     | `mcp__plugin_playwright_playwright__browser_press_key`|
| Select option | `mcp__plugin_playwright_playwright__browser_select_option` |

### 6. Take Screenshot (if needed)

For visual evidence:

```
mcp__plugin_playwright_playwright__browser_take_screenshot
```

## Validation Checklist

### Visual Validation

- [ ] Component renders without errors
- [ ] Layout matches expected design
- [ ] Typography uses correct variants (see [UI Skills](../ui-skills/SKILL.md))
- [ ] Spacing is consistent (utility classes)
- [ ] Colors match theme palette

### Functional Validation

- [ ] Interactive elements respond to clicks
- [ ] Form inputs accept and validate input
- [ ] Loading states display correctly
- [ ] Error states display correctly
- [ ] Empty states display correctly
- [ ] Navigation works as expected

### Accessibility Validation

- [ ] No critical a11y errors in snapshot
- [ ] Interactive elements have accessible names
- [ ] Focus order is logical
- [ ] Color contrast is sufficient

## Common Routes

| Route                 | Description       |
| --------------------- | ----------------- |
| `/`                   | Home/Landing page |
| `/login`              | Login page        |
| `/signup`             | Signup page       |
| `/intern/dashboard`   | Intern dashboard  |
| `/intern/profile`     | Intern profile    |
| `/company/dashboard`  | Company dashboard |
| `/company/candidates` | Candidate list    |

## Example Usage

### Validate a Component Change

```
/browser-skill /intern/profile

1. Navigate to http://localhost:3000/intern/profile
2. Take accessibility snapshot
3. Check for console errors
4. Validate component renders correctly
5. Test interactive elements
6. Report findings
```

### Test a Form

```
/browser-skill /login

1. Navigate to login page
2. Fill email field
3. Fill password field
4. Click submit button
5. Verify form validation
6. Check success/error states
```

## Troubleshooting

### Page Not Loading

- Verify dev server is running (`yarn start`)
- Check URL is correct
- Check for build errors in terminal

### Element Not Found

- Take a new snapshot
- Check element ref from snapshot
- Verify component is mounted

### Console Errors

- Check for missing dependencies
- Verify API endpoints
- Check for TypeScript errors

## Cleanup

After validation, close the browser:

```
mcp__plugin_playwright_playwright__browser_close
```
