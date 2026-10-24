---
name: Collegiate Horizon
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
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2151da'
  primary: '#0037b0'
  on-primary: '#ffffff'
  primary-container: '#1d4ed8'
  on-primary-container: '#cad3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#00496b'
  on-tertiary: '#ffffff'
  tertiary-container: '#00628d'
  on-tertiary-container: '#abdaff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#c9e6ff'
  tertiary-fixed-dim: '#89ceff'
  on-tertiary-fixed: '#001e2f'
  on-tertiary-fixed-variant: '#004c6e'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-2xl:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-2xl-mobile:
    fontFamily: Manrope
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-xl:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-xl-mobile:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.005em
  headline-sm:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system delivers an elevated, preparatory-tier student portal experience for modern secondary institutions. It balances academic rigor and clarity with an approachable, empowering posture for students, faculty, and guardians. The aesthetic rejects gamified visual clutter in favor of architectural poise, calm utility, and authoritative structure.

### Core Philosophy & Influences
- **Architectural Modernism:** Employs deliberate structural alignment, precise grid rhythms, and functional whitespace to reduce cognitive fatigue during heavy academic workflows.
- **Preparatory Prestige:** Grounded in a commanding collegiate royal blue paired with neutral slate tones, evoking institutions of excellence while maintaining contemporary web standards.
- **Cognitive Clarity:** Information hierarchy is strict and immediate. Course deadlines, grade shifts, attendance alerts, and schedules can be processed in seconds.
- **Tone:** Disciplined, supportive, trustworthy, and focused.

## Colors

The system employs a crisp, daylight-focused palette designed for high legibility under prolonged viewing.

### Color Tokens & Semantic Roles
- **Primary (`#1D4ED8`):** Deep Collegiate Royal Blue. Anchors the institutional presence. Reserved for key action items, high-priority interactive states, active tab highlights, and academic milestones.
- **Secondary (`#0F172A`):** Deep Oxford Slate. Used for primary typography, dominant header bars, high-contrast modal backings, and critical status containers.
- **Tertiary (`#0EA5E9`):** Accent Sky. Applied to secondary interactive elements, informational tags, subject categorization chips (e.g., STEM, humanities), and live status pings.
- **Neutral (`#64748B`):** Slate Neutral. Dictates secondary text, instructional copy, structural borders, and subtle muted badges.

### Surface Architecture
- **Canvas Base:** Soft Slate (`#F8FAFC`) forms the foundation of the workspace, creating a soft baseline that avoids pure white screen glare.
- **Card Surfaces:** Crisp Porcelain (`#FFFFFF`) layered directly over the canvas base, bounded with subtle perimeter lines (`#E2E8F0`).
- **Dark Neutral Text:** Primary headings and metrics sit at `#0F172A`, body narrative at `#1E293B`, and secondary meta details at `#64748B`.
- **System States:** Success is governed by Emerald (`#059669`), Warnings by Amber (`#D97706`), and Urgent/Overdue items by Crimson (`#DC2626`).

## Typography

The pairing of **Manrope** and **Hanken Grotesk** pairs geometric precision with humanistic readability.

### Structural Roles
- **Headlines (Manrope):** Semi-geometric modern proportions with tight aperture and deliberate geometric terminals. This font delivers authority for portal page titles, course subject names, metric summaries, and card cluster headlines without feeling sterile.
- **Body & Controls (Hanken Grotesk):** Open apertures, clean vertical metrics, and crisp legibility at small sizes. Used for assignment descriptions, grade rosters, tabular records, notification streams, and input labels.
- **Letter Spacing & Casing:** Uppercase treatment is strictly limited to `label-sm` when designating meta statuses (e.g., `OVERDUE`, `SUBMITTED`, `TERM 1`). Headline tracking is slightly tightened (`-0.01em` to `-0.02em`) to maintain cohesion in data-dense layouts.

## Layout & Spacing

The portal layout adheres strictly to an 8-point spatial grid system.

### Grid Architecture
- **Desktop (1200px+):** Fixed fluid viewport with max-width `1440px`. Implements a 12-column structure with `1.5rem` (24px) gutters and `2rem` (32px) exterior margins. Standard layout divides into an 8-column main study/agenda feed and a 4-column contextual rail (schedule, quick links, advisor notes).
- **Tablet (768px – 1199px):** 8-column structure with `1rem` (16px) gutters. The contextual rail drops below the primary workflow stream or transforms into a toggleable drawer.
- **Mobile (< 768px):** 4-column structure with `1rem` (16px) margins and `0.75rem` (12px) gutters. Full-width modular card stacking.

### Spatial Rhythm
- `space-xs` (4px): Icon-to-text gaps within micro labels and badge indicators.
- `space-sm` (8px): Spacing within clustered metadata groups, tag listings, and input padding adjustments.
- `space-md` (16px): Internal padding for standard cards, row spacing in assignment tables, and form field stacks.
- `space-lg` (24px): Card interior padding on expansive views; gap between related module cards.
- `space-xl` (32px): Major structural section breaks and dashboard cluster separations.

## Elevation & Depth

This system avoids heavy, artificial skeuomorphism or loud dropshadows. Visual depth is established primarily through **tonal separation** and **delicate, low-opacity ambient shadows** paired with structural borders.

### Elevation Levels
- **Level 0 (Flat Surface / Canvas):** `#F8FAFC`. Base backdrop layer for all screen states. No shadows.
- **Level 1 (Card & Module Foundation):** `#FFFFFF` surface bordered by a crisp `1px` stroke of `#E2E8F0` (`slate-200`). Accompanied by a diffused, low-opacity ambient shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`.
- **Level 2 (Hovered & Interactive Modules):** Cards and actionable rows elevate on hover with a subtle physical lift: `0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`. Border shifts slightly to `#CBD5E1`.
- **Level 3 (Popovers, Select Flyouts, Dropdowns):** Floating interactive menus sit above the primary plane: `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)` wrapped in a 1px `#E2E8F0` border.
- **Level 4 (Modals & Focus Dialogues):** Institutional alerts, assignment submission panes, and grade breakdown modals utilize `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.06)`. Backdrops receive a calm slate veil: `#0F172A` at 40% opacity with a `4px` backdrop blur.

## Shapes

The portal utilizes `roundedness: 2` (base radius of `0.5rem` / 8px). This creates clean, friendly, yet disciplined geometry that avoids the casual look of full pill components and the harshness of sharp rectangular bounds.

### Boundary Tokens
- **Base UI Controls (`rounded`, 8px / 0.5rem):** Inputs, buttons, segmented toggles, and dropdown triggers.
- **Structural Cards (`rounded-lg`, 12px / 0.75rem – 16px / 1rem):** Primary course cards, schedule blocks, alert panels, and data summaries.
- **Large Modal Sheets (`rounded-xl`, 20px / 1.25rem – 24px / 1.5rem):** Top-level dialog sheets, slide-over preview cards, and full-screen drawer panels.
- **Status Pills (`rounded-full`):** Category tags, submission indicators, and student profile avatars are the only elements permitted full corner smoothing.

## Components

### Buttons
- **Primary:** Background `#1D4ED8`, text `#FFFFFF`, radius `0.5rem`. Hover shifts to `#1E40AF` with a subtle transform lift. Focus ring is a 2px offset ring in `#93C5FD`.
- **Secondary:** Background `#FFFFFF`, text `#0F172A`, 1px border `#CBD5E1`. Hover uses `#F8FAFC` background and `#0F172A` border.
- **Tertiary / Ghost:** Background transparent, text `#1D4ED8`. Hover uses `#EFF6FF` background.
- **Destructive:** Background `#FEE2E2`, text `#DC2626`, 1px border `#FECACA`. Hover changes to background `#DC2626`, text `#FFFFFF`.

### Cards
- **Base Module:** Crisp `#FFFFFF` surface, 1px border `#E2E8F0`, corner radius `1rem` (`rounded-lg` to `rounded-xl`). Internal padding is `1.5rem` (`space-lg`).
- **Course Dashboard Card:** Header row features subject code badge, course title (`Manrope` `headline-sm`), instructor info, followed by a progress bar (4px height, `#E2E8F0` track, `#1D4ED8` fill), and footer meta with pending tasks count.

### Chips & Badges
- **Academic Status Chips:** Radius `9999px` (pill), font `label-sm`, padding `0.25rem 0.75rem`.
  - *Submitted / Passing:* Background `#ECFDF5`, text `#065F46`, border 1px `#A7F3D0`.
  - *Pending / In Progress:* Background `#EFF6FF`, text `#1E40AF`, border 1px `#BFDBFE`.
  - *Overdue / Urgent:* Background `#FEF2F2`, text `#991B1B`, border 1px `#FECACA`.

### Form Fields & Inputs
- **Text Inputs & Selects:** Height `40px` (or `44px` on mobile), background `#FFFFFF`, border 1px `#CBD5E1`, text `#0F172A`, radius `0.5rem`. Placeholder in `#94A3B8`.
- **Active Focus:** Border transitions to `#1D4ED8` with a 3px outer glow ring of `rgba(29, 78, 216, 0.15)`.

### Checkboxes & Radios
- Square with `0.25rem` radius for checkboxes; full circular for radios. Inactive border is 1.5px `#94A3B8`. Active check state fills with `#1D4ED8` displaying a white crisp check icon.

### Data Tables & Course Lists
- Header cells styled with `label-sm`, uppercase, color `#64748B`, background `#F8FAFC`, border-bottom 1px `#E2E8F0`.
- Data rows feature hover background `#F8FAFC`, active state transitions, and tabular numbers for grades, dates, and times.

### Iconography Style
- All visual glyphs adhere to a crisp, outline Lucide standard: `1.75px` to `2px` stroke weight, round cap and join, bounded strictly to 16x16, 20x20, or 24px frames.