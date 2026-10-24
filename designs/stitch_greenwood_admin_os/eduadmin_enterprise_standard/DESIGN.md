---
name: EduAdmin Enterprise Standard
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#4f4633'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#817660'
  outline-variant: '#d3c5ac'
  surface-tint: '#785a00'
  primary: '#785a00'
  on-primary: '#ffffff'
  primary-container: '#eab308'
  on-primary-container: '#604700'
  inverse-primary: '#f7be1d'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#006398'
  on-tertiary: '#ffffff'
  tertiary-container: '#78c2ff'
  on-tertiary-container: '#004f7a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdf9a'
  primary-fixed-dim: '#f7be1d'
  on-primary-fixed: '#251a00'
  on-primary-fixed-variant: '#5a4300'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#004b73'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: '700'
    lineHeight: 2.5rem
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '700'
    lineHeight: 2rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1rem
  label-lg:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: 1.25rem
  label-md:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.025em
  label-sm:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

The design system embodies a utility-first, high-clarity operational environment engineered for institutional administration, academic scheduling, and student lifecycle management. The visual tone is authoritative, dependable, and meticulously structured. It eliminates visual noise to prioritize cognitive efficiency during extended sessions of data entry, record reconciliation, and reporting.

Drawing from modern enterprise SaaS conventions, the aesthetic balances minimal elevation with crisp, low-contrast structural dividers. Dense data tables, key metrics, and multi-step workflows present information without ambiguity. Amber acts as a focal beacon for active states, key interactions, and primary calls to action, while a cool slate neutral armature ensures prolonged visual comfort and strict typographic hierarchy.

## Colors

The palette establishes an operational canvas where neutral slate surfaces dominate and color carries functional meaning.

### Palette Roles
- **Primary Accent (`#EAB308`):** Applied to active primary action triggers, active tabs, and primary selection states. Interacted states shift to `#CA8A04` for hover and `#A16207` for active press. Subdued amber surfaces (`#FEF9C3`) anchor highlights, badges, and selected row indicators. Text placed on `#EAB308` defaults to `#0F172A` to maintain WCAG AAA contrast.
- **Secondary / Structure (`#0F172A`):** Anchors high-priority typography, key headings, primary navigation sidebars, and high-emphasis controls.
- **Canvas & Surfaces:** 
  - Application Canvas: `#F8FAFC`
  - Elevated Container / Cards: `#FFFFFF`
  - Subtle Inset / Header Tiers: `#F1F5F9`
  - Structural Borders & Grids: `#E2E8F0`
  - Active Divider / Strong Border: `#CBD5E1`
- **Typography:**
  - Primary Text: `#0F172A`
  - Secondary / Meta Text: `#64748B`
  - Disabled / Placeholder: `#94A3B8`
- **Semantic Feedback Tokens:**
  - **Success (Enrolled / Paid / Validated):** Text `#047857`, Surface `#ECFDF5`, Border `#A7F3D0`.
  - **Warning / Pending (Awaiting Review / Grace Period):** Text `#B45309`, Surface `#FEF3C7`, Border `#FDE68A`.
  - **Critical / Overdue (Failed / Suspended / Action Required):** Text `#BE123C`, Surface `#FFF1F2`, Border `#FECDD3`.
  - **Info (System Notice / Audit Log):** Text `#0369A1`, Surface `#F0F9FF`, Border `#BAE6FD`.

## Typography

Typography relies entirely on `Inter` with open tabular lining figures enabled for data tables (`font-feature-settings: "tnum"`). Metrics, timestamps, attendance rates, and fiscal numbers align with mathematical precision. 

The typographic hierarchy prioritizes micro-legibility at 12px to 14px sizes. Letter spacing tightens moderately on large headlines to form cohesive headers, while labels and data headers utilize subtle positive letter-tracking to maximize legibility in high-density tables and badge indicators.

## Layout & Spacing

The layout is built on a 12-column fluid grid system pinned inside a fixed vertical administrative frame.

### Layout Philosophy
- **Navigation Shell:** Fixed 256px vertical navigation sidebar on desktop, collapsing to an 64px icon-only rail at viewports below 1280px, and transforming into an off-canvas drawer on mobile screens (<768px).
- **Workspace Bounds:** Content canvases stretch to 100% fluid width with a maximum ceiling of 1600px for tabular dashboard views, preventing wide-aspect eye fatigue.
- **Breakpoints:**
  - **Mobile (`<768px`):** 4 columns, 16px margins (`margin`), 16px gutters (`gutter`). Data tables switch to card-based record stacks.
  - **Tablet (`768px - 1023px`):** 8 columns, 24px margins, 16px gutters. Secondary sidebars collapse into toggle panels.
  - **Desktop (`≥1024px`):** 12 columns, 32px margins (`margin-desktop`), 24px gutters (`gutter-desktop`). Dense multi-column data views and synchronized auxiliary panels persist simultaneously.

## Elevation & Depth

Visual hierarchy is maintained primarily through structured borders (`#E2E8F0`) and layered surface fills, using elevation sparingly to indicate transient states.

- **Level 0 (Base Surface):** `#F8FAFC` canvas. No shadow.
- **Level 1 (Structural Cards / Panels):** `#FFFFFF` fill with an explicit 1px solid `#E2E8F0` border and a diffuse micro-shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)`.
- **Level 2 (Hovered Cards / Dropdowns / Popovers):** `#FFFFFF` fill, 1px `#CBD5E1` border, elevated shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`.
- **Level 3 (Modals / Slide-Over Inspection Sheets):** `#FFFFFF` fill, bounded by `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)`, placed above a backdrop veil of `#0F172A` at 40% opacity.

## Shapes

The design system uses a strict 8px (`0.5rem` / `rounded-lg`) baseline for all interactive containers, data panels, and inputs, creating a consistent shape language across enterprise layouts.

- **Standard Elements (0.25rem / 4px):** Checkboxes, tags, inner table cells, small action pills.
- **Core Containers (0.5rem / 8px):** Cards, input fields, action buttons, table wrappers, searchbars, dialogs.
- **Large Panels (0.75rem / 12px):** Root modal sheets and persistent floating dashboard utility docks.
- **Pill Elements:** Reserved strictly for status badges and student avatar containers.

## Components

### Buttons
- **Primary:** Background `#EAB308`, label `#0F172A` (weight 600), border none. Hover state `#CA8A04`. Focus-visible rings show a 2px offset with `#EAB308`.
- **Secondary:** Background `#FFFFFF`, 1px solid border `#E2E8F0`, label `#0F172A`. Hover: `#F8FAFC` surface with `#CBD5E1` border.
- **Destructive:** Background `#FFF1F2`, 1px solid border `#FECDD3`, label `#BE123C`. Hover: `#FFE4E6`.
- **Sizing:** Compact enterprise height standard of 36px (`px-3 py-1.5`) for primary controls; 32px for in-row table action buttons.

### Inputs & Selectors
- Background `#FFFFFF`, 1px solid border `#E2E8F0`, 8px corner radius. Placeholder text `#94A3B8`.
- Focus state: Border transitions to `#0F172A` with a 1px matching ring or `#EAB308` focus highlight. Height is standardized to 36px for single-line text and filter dropdowns.

### Data Tables
- **Header:** Background `#F8FAFC`, border-bottom 1px solid `#E2E8F0`, label `label-md` in uppercase `#64748B`.
- **Rows:** Alternating transparent and `#FFFFFF` rows with 1px border-bottom `#F1F5F9`. Height 44px for compact density, 52px for standard view.
- **Active / Selected Row:** Background `#FEF9C3` at 40% tint with a solid 3px left border in `#EAB308`.

### Status Badges & Chips
- Compact padding (`px-2 py-0.5`), radius 9999px (pill), text style `label-sm`.
- Semantic pairing: text and matching background/border as defined in the semantic color tokens (e.g., `#ECFDF5` background with `#047857` text for "Enrolled").

### Cards & Metric Tiles
- Surface `#FFFFFF`, 1px solid `#E2E8F0`, 8px corner radius, padding `1.25rem`. 
- Includes a dedicated header strip for metric KPIs with a trailing delta indicator (positive emerald or negative rose).