---
name: figma-to-code
description: Build React components from Figma designs using the Figma MCP server. Use when implementing UI from Figma designs or converting design specs to code.
argument-hint: [figma-url]
---

# Figma to Code Workflow

Use this skill to build React components from Figma designs using the Figma MCP server.

## Prerequisites

Ensure Figma MCP server is configured in Claude Code settings.

## Workflow

### Step 1: Get Design from Figma

Use MCPSearch to find and load Figma tools:

```
MCPSearch: "select:mcp__figma__get_file" or search "figma"
```

Then fetch the design:

```
mcp__figma__get_file with file_key from URL
```

### Step 2: Analyze the Design

Extract from the Figma response:

- Component hierarchy and structure
- Colors, typography, spacing
- Layout (flex, grid patterns)
- Interactive states (hover, active, disabled)
- Responsive behavior hints

### Step 3: Map to Project Patterns

**UI Library Mapping:**
| Figma Element | Use |
|---------------|-----|
| Buttons | MUI `<Button>` or Mantine `<Button>` |
| Text | MUI `<Typography>` with appropriate variant |
| Inputs | MUI `<TextField>` or Mantine `<TextInput>` |
| Cards | MUI `<Card>` or custom with `<Paper>` |
| Modals | MUI `<Dialog>` or Mantine `<Modal>` |
| Tables | Custom with `mui-table-react` |
| Icons | `@iconify/react` or `@mui/icons-material` |

**Spacing Mapping:**
| Figma | CSS/MUI |
|-------|---------|
| 4px | `gap-4`, `p-4`, `theme.spacing(0.5)` |
| 8px | `gap-8`, `p-8`, `theme.spacing(1)` |
| 16px | `gap-16`, `p-16`, `theme.spacing(2)` |
| 24px | `gap-24`, `p-24`, `theme.spacing(3)` |

### Step 4: Create Component Structure

Follow project folder structure:

```
ComponentName/
├── index.tsx              # Main component
├── style.scss             # Styles from Figma
├── constants/
│   └── componentName.type.ts    # TypeScript interfaces
├── helpers/
│   └── componentName.utility.ts # Helper functions
└── components/            # Sub-components
```

### Step 5: Implement Component

```tsx
import { Typography, Button } from '@mui/material';
import './style.scss';

interface IComponentNameProps {
  // Props from Figma interactions
}

const ComponentName: React.FC<IComponentNameProps> = (props) => {
  return <div className='component-name'>{/* Implement Figma design */}</div>;
};

export default ComponentName;
```

### Step 6: Extract Styles

Convert Figma styles to SCSS:

```scss
.component-name {
  // Layout from Figma
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;

  // Colors - use CSS variables or theme
  background-color: var(--background-paper);

  // Typography - prefer MUI Typography component
  // But for custom styles:
  &__title {
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
  }
}
```

## Design Token Mapping

### Colors

- Use MUI theme colors when possible
- For custom colors, check if they exist in `muiTheme.js`
- Avoid hardcoded hex values

### Typography

Use MUI Typography variants:
| Figma Style | MUI Variant |
|-------------|-------------|
| Heading 1 | `h1` |
| Heading 2 | `h2` |
| Heading 3 | `h3` |
| Body | `body1` |
| Caption | `caption` |

### Step 7: Validate in Browser (IMPORTANT)

**After implementing, ALWAYS open browser to verify the UI matches Figma:**

```
1. Use Playwright MCP to navigate to the page
   → mcp__playwright__navigate url="http://localhost:3000/page-path"

2. Take a screenshot
   → mcp__playwright__screenshot

3. Compare screenshot with Figma design:
   - Layout matches
   - Spacing is correct
   - Colors match
   - Typography is correct
   - Interactive elements visible

4. If discrepancies found:
   - Fix the code
   - Take new screenshot
   - Verify again
```

**Example validation prompt:**

```
"Open browser at localhost:3000/my-component and verify it matches the Figma design"
```

## Combined Workflow Example

```
User: Build the user profile card from this Figma and verify it looks correct
      https://www.figma.com/design/ABC123/Profile?node-id=100-200

Claude:
1. Fetch design from Figma MCP
2. Create component following project patterns
3. Extract styles to style.scss
4. Navigate browser to localhost:3000/profile
5. Take screenshot
6. Compare with Figma → Report: "Matches design" or "Found issues: spacing on X"
```

## Checklist

- [ ] Fetched design from Figma MCP
- [ ] Created component folder structure
- [ ] Used MUI/Mantine components where applicable
- [ ] Extracted styles to SCSS (no inline styles)
- [ ] Added TypeScript interfaces
- [ ] Handled loading/error/empty states
- [ ] Added accessibility attributes (aria-labels)
- [ ] Component under 300 lines
- [ ] **Opened browser and validated UI matches Figma**
- [ ] **Screenshot taken for verification**
