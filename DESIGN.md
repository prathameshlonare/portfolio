# Design System

## Product Context

A terminal-themed portfolio that demonstrates AWS/DevOps competence through the medium itself — the interface IS the proof. Success is a viewer who thinks "this person gets infrastructure" within 30 seconds.

## Brand Personality

Clean, minimal, confident. Terminal-authentic — not gimmicky. The interface feels like a well-configured dev environment: fast, quiet, functional.

## Aesthetic Direction

**Terminal-Native Authenticity**
- No Hollywood terminal effects
- No gradient text, no glassmorphism
- No caricature-terminal themes (green-on-black Matrix style)
- Authentic terminal experience that feels like actual infrastructure

**Visual Philosophy**
- Every pixel serves the narrative, not decoration
- Practice what you preach — the portfolio itself should feel like good infrastructure
- The interface feels like a well-configured dev environment: fast, quiet, functional

## Color System (OKLCH)

### Primary Colors
- `--accent-green`: oklch(0.704 0.202 146.7) - Terminal success/output green
- `--accent-blue`: oklch(0.380 0.160 255) - Terminal command/link blue

### Surface Colors
- `--bg-primary`: oklch(0.070 0.003 110) - Dark mode terminal background
- `--bg-secondary`: oklch(0.110 0.004 110) - Slightly lighter terminal background
- `--bg-elevated`: oklch(0.090 0.003 110) - Terminal surface highlights

### Text Colors
- `--text-primary`: oklch(0.880 0.003 110) - Terminal output text
- `--text-secondary`: oklch(0.750 0.004 110) - Terminal secondary text
- `--text-muted`: oklch(0.500 0.004 110) - Terminal dimmed text
- `--text-dim`: oklch(0.380 0.004 110) - Terminal very dimmed text

### Border Colors
- `--border`: oklch(0.200 0.006 110) - Terminal borders
- `--border-hover`: oklch(0.280 0.008 110) - Terminal hover borders

## Typography

### Font Stack
```css
font-family: "JetBrains Mono", "SF Mono", Monaco, "Cascadia Code", monospace;
```

### Heading Typography
- Font: "JetBrains Mono" (monospace for consistency)
- Weight: 700 (bold)
- Tracking: -0.04em (tight but readable)
- Size: Responsive with clamp()

### Body Typography
- Font: "JetBrains Mono", monospace
- Weight: 400 (regular)
- Line-height: 1.5
- Color: --text-secondary

## Spacing System

### Base Unit
- 4px (terminal-style clean spacing)

### Scale
- 0: 0px
- 1: 4px
- 2: 8px
- 3: 16px
- 4: 24px
- 5: 32px
- 6: 48px
- 7: 64px
- 8: 96px

## Component Patterns

### Terminal Prompt
- Background: --bg-secondary
- Border: 1px solid --border
- Text color: --text-primary
- Prompt prefix: --accent-green
- Command text: --text-secondary
- Output: --text-muted

### Project Cards
- Background: --bg-secondary
- Border: 1px solid --border
- Hover: border-color: --accent-green, background: color-mix(in srgb, var(--accent-green) 5%, transparent)
- Transition: all 200ms ease-out

### Skill Badges
- Background: --bg-secondary
- Border: 1px solid --border
- Text: --text-muted
- Hover: border-color: --accent-blue, color: --accent-blue

### Navigation
- Background: --bg-primary
- Border: 1px solid --border
- Active: border-color: --accent-green, color: --accent-green
- Hover: color: --text-primary

## Animation System

### Duration Guidelines
- Micro-interactions: 150-200ms
- Component transitions: 200-300ms
- Page transitions: 300-400ms

### Easing Curves
- UI interactions: cubic-bezier(0.23, 1, 0.32, 1) (strong ease-out)
- Page transitions: cubic-bezier(0.77, 0, 0.175, 1) (smooth)

### Animation Principles
1. **No scale(0) animations** - Start from scale(0.95) with opacity: 0
2. **Origin-aware popovers** - Scale from trigger, not center (except modals)
3. **Press feedback** - transform: scale(0.97) on :active
4. **Skip tooltip delays** - No animation on subsequent tooltips
5. **Respect reduced motion** - @media (prefers-reduced-motion: reduce)

## Accessibility

### WCAG Compliance
- Body text contrast: 4.5:1 (meets WCAG AA)
- Large text contrast: 3:1
- Focus states: visible outline on interactive elements
- Keyboard navigation: full keyboard support

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Component States

### Interactive Elements
- Hover: transform: translateY(-1px), border-color: --accent-green
- Active: transform: scale(0.97)
- Focus: outline: 2px solid --accent-green
- Disabled: opacity: 0.5, cursor: not-allowed

### Terminal States
- Success: color: --accent-green
- Error: color: oklch(0.600 0.250 0)
- Warning: color: oklch(0.800 0.200 50)
- Info: color: --accent-blue

## Anti-Patterns

### Never Use
1. Gradient text
2. Glassmorphism
3. Side-stripe borders (border-left/right > 1px)
4. Identical card grids
5. Tiny uppercase tracked eyebrow above every section
6. Numbered section markers as default scaffolding (01 / 02 / 03)
7. Text that overflows its container
8. Hand-drawn/sketchy SVG illustrations
9. Repeating-linear-gradient stripe backgrounds
10. Meta-criticism copy

## Performance Optimizations

### Animation Optimization
- Use transform/opacity only (skip layout/paint)
- CSS variables for theming (but avoid on animated elements)
- Hardware-accelerated transforms
- Lazy load non-critical components

### Rendering Optimization
- Use semantic HTML
- Optimize images (WebP/AVIF)
- Minimize layout thrashing
- Use CSS containment where appropriate

## Testing Checklist

### Visual Quality
- [ ] No gradient text
- [ ] No glassmorphism
- [ ] Authentic terminal feel
- [ ] Clean, minimal design
- [ ] Consistent spacing rhythm

### Interaction Quality
- [ ] Press feedback on all interactive elements
- [ ] Proper hover states
- [ ] Keyboard navigation
- [ ] Focus management
- [ ] Touch target minimums

### Motion Quality
- [ ] No scale(0) animations
- [ ] Origin-aware animations
- [ ] Respect reduced motion
- [ ] Smooth easing curves
- [ ] Performance optimized

### Accessibility
- [ ] WCAG AA compliance
- [ ] Screen reader support
- [ ] Color contrast validation
- [ ] Keyboard navigation
- [ ] Reduced motion support
