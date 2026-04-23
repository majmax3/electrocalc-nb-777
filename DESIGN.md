# Design Brief

## Direction

**Technical Precision** — Professional electrical installation calculator for Bolivian engineers, designed as a transparent calculation tool where every result is backed by explicit formulas.

## Tone

Brutalist/utilitarian with refined typography. No decoration—every visual element serves functional clarity and technical credibility.

## Differentiation

Transparent formula display with step-by-step calculations visible inline, making NB 777 compliance verification auditable and traceable.

## Color Palette

| Token       | OKLCH            | Role                                      |
| ----------- | ---------------- | ----------------------------------------- |
| background  | 0.13 0.02 240    | Deep charcoal, focus on content           |
| foreground  | 0.92 0.01 240    | Light text, high contrast                 |
| primary     | 0.50 0.18 240    | Technical blue, trust & precision         |
| accent      | 0.68 0.12 70     | Warm amber, highlights & success states   |
| destructive | 0.55 0.22 25     | Red, NB 777 non-compliance warnings       |
| card        | 0.17 0.022 240   | Elevated surfaces for sections            |
| border      | 0.26 0.022 240   | Sharp section boundaries                  |

## Typography

- **Display:** Space Grotesk — geometric, technical, modern, headers & hero text
- **Body:** DM Sans — highly legible UI labels, form text, data
- **Mono:** Geist Mono — formulas, technical data, calculation results
- **Scale:** Hero `text-4xl md:text-6xl font-bold tracking-tight`, Section `text-2xl md:text-3xl font-bold`, Label `text-xs font-semibold tracking-widest uppercase`, Body `text-base`

## Elevation & Depth

Minimal shadow hierarchy: cards use subtle-tech shadow (2px 6px), elevated sections use card-elevated shadow (4px 12px). No blur/glow effects—pure technical precision.

## Structural Zones

| Zone    | Background         | Border              | Notes                                 |
| ------- | ------------------ | ------------------- | ------------------------------------- |
| Header  | card (0.17)        | border-b            | Title + navigation, minimal treatment |
| Sidebar | secondary (0.21)   | border-r            | Form inputs, configuration zone      |
| Content | background (0.13)  | card sections       | Results, formulas, compliance checks |
| Footer  | secondary (0.21)   | border-t            | Project controls, export, help links |

## Spacing & Rhythm

Compact density for information-heavy content: sections use `gap-4` to `gap-6`, micro-spacing within cards uses `p-4` to `p-6`. Vertical rhythm: 24px base unit, halves at 12px, 8px for inline spacing.

## Component Patterns

- **Buttons:** Primary (bg-primary text-primary-foreground) for actions, secondary (bg-secondary) for toggles. Sharp `rounded-sm`, no fill animation.
- **Cards:** bg-card with border-border, rounded-sm, shadow-subtle-tech for data results, shadow-card-elevated for highlighted sections.
- **Badges:** Semantic colors only (chart-3 for success, destructive for warnings), rounded-sm, text-xs font-semibold.
- **Forms:** Input fields use bg-input border-border, text-foreground. Labels use tech-label class.

## Motion

- **Entrance:** Fade-in at 200ms on page load, sections stagger by 50ms.
- **Hover:** Buttons transition bg-color at 150ms, cards lift shadow at 200ms.
- **Pulse-subtle:** Loading states and live formula recalculation use pulse-subtle animation (2s).

## Constraints

- Maintain sharp edges and minimal radii (0–4px) for technical aesthetic.
- No gradients or decorative overlays—solid semantic colors only.
- Formulas display in monospace, always visible inline (never tooltips).
- Red warnings (compliance violations) must be unmissable but not overbearing.

## Signature Detail

ASCII circuit diagrams and unified line art (text-based schematics) embedded as `<pre>` blocks with `font-mono` styling, rendering electrical systems as readable text diagrams—pure engineering, zero graphics.
