---
name: ui-skills
description: Opinionated constraints for building better interfaces with agents.
---

# UI Skills

When invoked, apply these opinionated constraints for building better interfaces.

## How to use

- `/ui-skills`
  Apply these constraints to any UI work in this conversation.

- `/ui-skills <file>`
  Review the file against all constraints below and output:
  - violations (quote the exact line/snippet)
  - why it matters (1 short sentence)
  - a concrete fix (code-level suggestion)

## Components

- MUST use **MUI** as the primary component library
- MUST use **Mantine** as secondary library (for specific components like input, select, Combobox, DatePicker)
- MUST use the project's existing component primitives first (check `Common/Components/`)
- NEVER mix MUI and Mantine within the same component when possible
- MUST add an `aria-label` to icon-only buttons
- NEVER rebuild keyboard or focus behavior by hand unless explicitly requested

## Interaction

- MUST use MUI `Dialog` with confirmation for destructive or irreversible actions
- SHOULD use structural skeletons for loading states (known layouts)
- SHOULD use spinners for unknown content (modals, form submissions)
- use `dvh` & `dvw` instead of `vh` & `vw`
- MUST respect `safe-area-inset` for fixed elements
- MUST show errors next to where the action happens (inline for fields, toast via `showErrorMessage` for actions)
- NEVER block paste in `input` or `textarea` elements unless explicitly requested

## Animation

- NEVER add animation unless it is explicitly requested
- MUST animate only compositor props (`transform`, `opacity`)
- NEVER animate layout properties (`width`, `height`, `top`, `left`, `margin`, `padding`)
- SHOULD avoid animating paint properties (`background`, `color`) except for small, local UI (text, icons)
- SHOULD use `ease-out` on entrance
- NEVER exceed `200ms` for interaction feedback
- MUST pause looping animations when off-screen
- SHOULD respect `prefers-reduced-motion`
- NEVER introduce custom easing curves unless explicitly requested
- SHOULD avoid animating large images or full-screen surfaces

## Typography

- MUST Mui Typography component for all text
- MUST use color, component and variant property
- variant should be one of these:
  - **Display**: `displayL`, `displayM`
  - **Heading**: `headingL`, `headingM`, `headingS`
  - **SemiBold Label**: `semiBoldLabelL`, `semiBoldLabelM`, `semiBoldLabelS`, `semiBoldLabelXs`, `semiBoldLabelXxs`
  - **Regular Label**: `regularLabelL`, `regularLabelM`, `regularLabelS`, `regularLabelXs`, `regularLabelXxs`
  - **Text**: `textXl`, `textL`, `textM`
  - **Subtext**: `subtextM`, `subtextS`
  - **SemiBold Link**: `semiBoldLinkXL`, `semiBoldLinkL`, `semiBoldLinkM`, `semiBoldLinkS`, `semiBoldLinkXs`
  - **Regular Link**: `regularLinkXL`, `regularLinkL`
- Never use font-family to any text unless explicitly requested

## Layout

- MUST use a fixed z-index scale through SCSS map/function (no arbitrary values)

## Performance

- NEVER animate large `blur()` or `backdrop-filter` surfaces
- NEVER apply `will-change` outside an active animation
- NEVER use `useEffect` for anything that can be expressed as render logic
