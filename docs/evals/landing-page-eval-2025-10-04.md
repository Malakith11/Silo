# Landing Page Design Evaluation - Causaly Inspiration
**Date:** October 4, 2025
**Reference:** https://www.causaly.com/
**Target:** SiloMD Landing Page Redesign

## Executive Summary
This evaluation documents the design system, components, and visual language from Causaly.com to be replicated for the SiloMD landing page. The goal is to mirror their clean, professional medical/life sciences aesthetic with bright accent colors and clear typography.

---

## Design System Analysis

### Color Palette
**Primary Colors:**
- **Brand Purple/Blue:** `#5D3FD3` (vibrant purple-blue for "R&D productivity")
- **Brand Red/Coral:** `#FF6B6B` or `#FF5757` (warm red for "complete" and "AI platform")
- **Background:** `#FFFFFF` (pure white)
- **Text Primary:** `#000000` or `#1A1A1A` (black for headlines)
- **Text Secondary:** `#6B7280` or similar (gray for body text)

**Accent Colors:**
- **Top Banner:** `#5D3FD3` or `#6366F1` (bright blue/purple)
- **Navy CTA:** `#1E293B` or `#0F172A` (dark navy for buttons)

**Shadows & Effects:**
- Subtle shadows on cards and buttons
- No heavy gradients or glass morphism
- Clean, flat design with depth through shadows only

### Typography
**Font Family:**
- Primary: Likely "Space Grotesk", "Inter", or "Manrope" (modern geometric sans-serif)
- Fallback: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

**Font Weights:**
- Headlines: 400 (regular) for black text, 600-700 for colored words
- Body: 400 (regular)
- Buttons/CTAs: 600 (semi-bold)

**Font Sizes (Hero Section):**
- Hero Headline: ~72-80px (desktop)
- Hero Subheading: ~18-20px
- Body Text: ~16-18px
- Button Text: ~16px

**Letter Spacing:**
- Headlines: tight (-0.02em to -0.01em)
- Body: normal (0)

### Layout & Spacing
**Container:**
- Max width: ~1280px
- Padding: 80-100px horizontal (desktop), 24px (mobile)

**Hero Section:**
- Left-aligned text
- Large whitespace on right for graphics/animation
- Vertical padding: ~120px top, ~100px bottom

**Grid System:**
- Appears to use 12-column grid
- Hero content spans ~7-8 columns
- Right side reserved for visual elements

**Spacing Scale:**
- Uses consistent spacing: 8px, 16px, 24px, 32px, 48px, 64px, 96px

### Components

#### 1. Top Announcement Banner
- Full-width purple/blue background
- White text with "Join us!" button (white bg, purple text)
- Center-aligned content
- Height: ~40-48px
- Dismissible with X button on right

#### 2. Header/Navigation
- Clean white background
- Logo on left (black)
- Navigation items: "AI PLATFORM", "PRODUCTS", "USE CASES", "RESOURCES", "ABOUT"
- Dropdowns indicated with chevron icons
- Right side: "LOGIN" (outlined) + "REQUEST A DEMO" (dark navy filled)
- Sticky/fixed positioning
- Height: ~80px
- Subtle bottom border or shadow

#### 3. Hero Section
**Structure:**
- Large headline with mixed colors:
  - "Unlock" (black)
  - "R&D productivity" (purple/blue)
  - "with the most" (black)
  - "complete" (red/coral)
  - "AI platform" (red/coral)
  - "for life sciences" (black)
- Subheading paragraph (gray text, ~2-3 lines)
- Primary CTA button: "REQUEST A DEMO" (dark navy, white text)
- Background: subtle animated network/node graphics (light gray lines and dots)

**Visual Elements:**
- Abstract network visualization (nodes and connecting lines)
- Subtle animation (likely floating/pulsing effect)
- Very light gray color (#F3F4F6 or lighter)
- Positioned in background, doesn't interfere with text

#### 4. Buttons
**Primary (REQUEST A DEMO):**
- Background: `#1E293B` (dark navy)
- Text: white
- Border-radius: ~8px (slightly rounded, not pill-shaped)
- Padding: 14px 32px
- Font-weight: 600
- Hover: slightly lighter navy, subtle lift

**Secondary (LOGIN):**
- Background: transparent
- Border: 1px solid `#E5E7EB` or similar
- Text: dark gray/black
- Same border-radius and padding
- Hover: light gray background

**Banner Button (Join us!):**
- Background: white
- Text: purple (matches banner bg)
- Small padding: 6px 16px
- Border-radius: ~6px

### Animations & Interactions
**Observed:**
1. **Network Background:** Subtle float/pulse animation on nodes
2. **Button Hover:** Slight color change + optional lift (2-4px translateY)
3. **Nav Dropdowns:** Smooth fade + slide down
4. **Page Load:** Possible fade-in for hero content

**Timing:**
- Transitions: 200-300ms ease-in-out
- Animations: 3-5s infinite loop for background elements

### Responsive Behavior
- Desktop-first approach
- Mobile: Stack layout, reduce font sizes
- Navigation collapses to hamburger menu on mobile
- Hero text size reduces proportionally

---

## Implementation Changes Required

### 1. `/apps/landing/src/app/globals.css`
**Replace entire file with Causaly-inspired styles:**
- Remove dark theme completely
- Remove glass morphism effects
- Add clean white background
- Implement Causaly color variables
- Add modern sans-serif font stack
- Remove blob animations, add network animation
- Simplify button styles to match Causaly

### 2. `/apps/landing/tailwind.config.ts`
**Updates:**
- Update color palette to match Causaly
- Remove dark mode configuration
- Add custom animation keyframes for network effect
- Update font family to modern sans-serif

### 3. `/apps/landing/src/components/layout/site-header.tsx`
**Complete redesign:**
- White background with subtle border/shadow
- Logo left, nav center, CTAs right
- Add dropdown indicators
- "LOGIN" outlined button + "REQUEST A DEMO" filled button
- Sticky positioning

### 4. `/apps/landing/src/components/sections/hero.tsx`
**Complete redesign:**
- Left-aligned large headline with colored keywords
- Replace "Silo" with "SiloMD" throughout
- Headline structure: Mix of black and colored words
- Add subheading paragraph
- Single "REQUEST A DEMO" CTA
- Add network background animation component

### 5. `/apps/landing/src/components/` (New)
**Add:**
- `announcement-banner.tsx` - Top purple banner
- `network-background.tsx` - Animated network visualization
- Update Button component to match Causaly styles

### 6. `/apps/landing/public/`
**Assets needed:**
- Update/create logo for SiloMD (black version)
- Consider adding network node graphics (SVG)

### 7. Typography Setup
**Install fonts (if not using system):**
```bash
npm install @fontsource/space-grotesk
# or use next/font with Google Fonts
```

### 8. Theme Colors (Tailwind)
```js
colors: {
  brand: {
    purple: '#5D3FD3',
    coral: '#FF6B6B',
    navy: '#1E293B',
  },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    // ... standard gray scale
  }
}
```

---

## Priority Implementation Order

1. **[HIGH]** Update `globals.css` - Foundation for all styles
2. **[HIGH]** Update `tailwind.config.ts` - Color system and theme
3. **[HIGH]** Create `announcement-banner.tsx` - Quick visual impact
4. **[HIGH]** Redesign `site-header.tsx` - Critical navigation
5. **[HIGH]** Redesign `hero.tsx` - Main conversion element
6. **[MEDIUM]** Create `network-background.tsx` - Visual polish
7. **[MEDIUM]** Update Button components - Consistency
8. **[LOW]** Add remaining sections as needed

---

## Key Differences from Current Design

| Aspect | Current (Dark Theme) | Target (Causaly) |
|--------|---------------------|------------------|
| Background | Dark with gradients | Clean white |
| Typography | Glass/gradient text | Solid colored words |
| Buttons | Gradient, pill-shaped | Flat, rounded corners |
| Effects | Glass morphism, blurs | Clean shadows only |
| Colors | Blues/teals/purples | Purple, coral, navy |
| Layout | Centered | Left-aligned |
| Animations | Floating blobs | Network nodes |

---

## Design Principles from Causaly

1. **Clarity First:** Clean white space, clear hierarchy
2. **Bold Headlines:** Large, colorful, attention-grabbing
3. **Professional Medical:** Trustworthy, clinical aesthetic
4. **Minimal Effects:** No heavy animations or gradients
5. **Strong CTAs:** Clear, prominent call-to-actions
6. **Consistent Spacing:** Predictable rhythm and flow

---

## Notes for Development

- Use brand name "SiloMD" instead of "Silo"
- Maintain accessibility (WCAG AA minimum)
- Ensure responsive behavior matches Causaly's quality
- Test animations for performance
- Consider prefers-reduced-motion for animations

**Screenshots Reference:**
- `causaly-full-page.png` - Full page layout
- `causaly-hero.png` - Hero section detail