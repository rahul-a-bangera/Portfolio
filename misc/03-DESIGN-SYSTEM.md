# Design System

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Theme**: Cyberpunk Terminal Green

---

## Table of Contents

1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing System](#spacing-system)
4. [Component Patterns](#component-patterns)
5. [Responsive Design](#responsive-design)
6. [Accessibility](#accessibility)
7. [Animations](#animations)

---

## Color Palette

### Terminal Green Theme

**IMPORTANT: Always use these exact color values. Do not introduce new colors without updating this document.**

```css
/* Primary Colors */
--terminal-green: #00ff96;              /* Main accent - CTAs, links, highlights */
--terminal-bg-dark: #0f0f1e;            /* Main background */
--terminal-bg-medium: #1a1a2e;          /* Secondary background */
--terminal-bg-light: #16213e;           /* Tertiary background */

/* Text Colors */
--terminal-text: rgba(255,255,255,0.9);          /* Primary text */
--terminal-text-secondary: rgba(255,255,255,0.6); /* Secondary text */
--terminal-text-dim: rgba(255,255,255,0.4);      /* Dim text (disabled, placeholders) */

/* Border Colors */
--terminal-border: rgba(0,255,150,0.2);          /* Default borders */
--terminal-border-bright: rgba(0,255,150,0.5);   /* Active/hover borders */
--terminal-border-glow: rgba(0,255,150,0.3);     /* Glow effect borders */

/* Effect Colors */
--terminal-green-glow: rgba(0,255,150,0.3);      /* Glow effects */
--terminal-green-light: rgba(0,255,150,0.2);     /* Light backgrounds */
--terminal-green-dark: rgba(0,255,150,0.1);      /* Subtle backgrounds */
```

### Color Usage Guidelines

| Element | Color | Usage |
|---------|-------|-------|
| **Primary CTAs** | `#00ff96` | Buttons, links, icons |
| **Backgrounds** | `#0f0f1e`, `#1a1a2e`, `#16213e` | Layered backgrounds |
| **Text** | `rgba(255,255,255,0.9)` | Main content |
| **Secondary Text** | `rgba(255,255,255,0.6)` | Labels, metadata |
| **Borders** | `rgba(0,255,150,0.2-0.5)` | Cards, inputs, dividers |
| **Hover Effects** | Increase opacity/glow | Buttons, cards, links |

### Accessibility

- **Terminal green on dark**: AAA contrast (9:1)
- **White text on dark**: AA contrast (12:1)
- **Secondary text on dark**: AA contrast (7:1)

All color combinations meet **WCAG AA standards** (4.5:1 minimum).

---

## Typography

### Font Families

```css
/* Headings - Monospace (Terminal Style) */
--monospace-font: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Courier New', monospace;

/* Body Text - Sans-serif (Readability) */
--body-font: 'Segoe UI', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;

/* Icons - Material Icons */
--icon-font: 'Material Icons';
```

### Font Sizes (Responsive)

| Element | Desktop (1024px+) | Tablet (768px) | Mobile (< 768px) |
|---------|-------------------|----------------|------------------|
| **h1** | 32px | 24px | 20px |
| **h2** | 28px | 20px | 18px |
| **h3** | 24px | 18px | 16px |
| **h4** | 20px | 17px | 15px |
| **h5** | 18px | 16px | 14px |
| **h6** | 16px | 15px | 13px |
| **body** | 15px | 14px | 13px |
| **small** | 13px | 12px | 12px |

### Line Heights

```css
/* Headings - Tighter */
h1, h2, h3, h4, h5, h6 {
  line-height: 1.3-1.4;
}

/* Body Text - Comfortable */
body, p {
  line-height: 1.6-1.7;
}

/* Small Text - Balanced */
small {
  line-height: 1.4-1.5;
}
```

### Font Weights

- **Regular**: 400 (body text)
- **Medium**: 500 (emphasized text)
- **Bold**: 700 (headings, CTAs)

### Text Styles

```css
/* Heading with Terminal Style */
.heading-terminal {
  font-family: var(--monospace-font);
  color: var(--terminal-green);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Body Text */
.body-text {
  font-family: var(--body-font);
  color: var(--terminal-text);
  line-height: 1.6;
}

/* Link Style */
.link {
  color: var(--terminal-green);
  text-decoration: none;
  transition: all 0.3s ease;
}

.link:hover {
  text-shadow: 0 0 10px rgba(0, 255, 150, 0.6);
}
```

---

## Spacing System

### Spacing Scale (8px Base)

Use multiples of 8px for consistent spacing:

```css
--spacing-1: 8px;    /* Tiny gap */
--spacing-2: 16px;   /* Small gap */
--spacing-3: 24px;   /* Medium gap */
--spacing-4: 32px;   /* Large gap */
--spacing-5: 40px;   /* Extra-large gap */
--spacing-6: 48px;   /* Section gap */
--spacing-7: 60px;   /* Major section gap */
```

### Padding Guidelines

| Component | Desktop | Tablet | Mobile |
|-----------|---------|--------|--------|
| **Container** | 40px | 32px | 20px |
| **Card** | 24px | 20px | 16px |
| **Button** | 12px 28px | 10px 24px | 8px 20px |
| **Section** | 60px 0 | 48px 0 | 32px 0 |

### Responsive Padding Formula

```
Desktop (40px) ? Tablet (32px) ? Mobile Large (24px) ? Mobile (20px) ? Mobile Small (16px)
```

---

## Component Patterns

### Cards

#### Default Card

```css
.card {
  background: rgba(15, 15, 30, 0.9);
  border: 2px solid rgba(0, 255, 150, 0.3);
  border-radius: 8px;
  padding: 24px;
  box-shadow: 
    0 0 30px rgba(0, 255, 150, 0.3),
    0 0 60px rgba(0, 255, 150, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  border-color: rgba(0, 255, 150, 0.5);
  box-shadow: 
    0 0 40px rgba(0, 255, 150, 0.4),
    0 0 80px rgba(0, 255, 150, 0.15);
  transform: translateY(-4px);
}
```

#### Glassmorphism Card

```css
.card-glass {
  background: rgba(15, 15, 30, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 150, 0.2);
  border-radius: 12px;
}
```

### Buttons

#### Primary Button

```css
.button-primary {
  background: #00ff96;
  color: #0f0f1e;
  border: 2px solid #00ff96;
  padding: 12px 28px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: var(--monospace-font);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button-primary:hover {
  background: transparent;
  color: #00ff96;
  box-shadow: 0 0 25px rgba(0, 255, 150, 0.5);
  transform: translateY(-2px);
}

.button-primary:active {
  transform: translateY(0);
}
```

#### Secondary Button (Outlined)

```css
.button-secondary {
  background: transparent;
  color: #00ff96;
  border: 2px solid rgba(0, 255, 150, 0.5);
  padding: 10px 24px;
  border-radius: 4px;
}

.button-secondary:hover {
  background: rgba(0, 255, 150, 0.1);
  border-color: #00ff96;
}
```

### Icons

```css
.icon {
  font-size: 24px;
  color: var(--terminal-green);
  transition: all 0.3s ease;
}

.icon:hover {
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 255, 150, 0.8);
  transform: scale(1.1);
}
```

### Inputs

```css
.input {
  background: rgba(26, 26, 46, 0.5);
  border: 2px solid rgba(0, 255, 150, 0.2);
  border-radius: 4px;
  padding: 12px 16px;
  color: var(--terminal-text);
  font-family: var(--body-font);
  font-size: 15px;
  min-height: 44px; /* iOS touch target */
}

.input:focus {
  outline: none;
  border-color: var(--terminal-green);
  box-shadow: 0 0 20px rgba(0, 255, 150, 0.3);
}

.input::placeholder {
  color: var(--terminal-text-dim);
}
```

### Badges

```css
.badge {
  background: rgba(0, 255, 150, 0.1);
  border: 1px solid rgba(0, 255, 150, 0.3);
  color: var(--terminal-green);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-family: var(--monospace-font);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

---

## Responsive Design

### Breakpoints

```css
/* Desktop Default - 1024px+ (No media query needed) */

/* Tablet - 768px to 1024px */
@media (max-width: 1024px) {
  /* Reduce spacing */
  /* Adjust font sizes */
}

/* Mobile - 480px to 768px */
@media (max-width: 768px) {
  /* Single-column layouts */
  /* Icon-only navigation */
  /* Stack cards vertically */
}

/* Mobile Small - Below 480px */
@media (max-width: 480px) {
  /* Minimum padding */
  /* Smallest font sizes */
  /* Maximum touch target sizes */
}
```

### Touch Targets

**iOS/Android Guidelines:**
- **Minimum**: 44x44px (iOS)
- **Recommended**: 48x48px (Android)
- **Spacing**: Minimum 8px between targets

```css
/* Touch-Friendly Button */
@media (max-width: 768px) {
  .button {
    min-height: 44px;
    min-width: 44px;
    padding: 12px 20px;
  }
}
```

### Mobile Optimizations

| Component | Desktop | Mobile (< 768px) |
|-----------|---------|------------------|
| **Navigation** | Text + Icons | Icons only |
| **Cards** | Grid (2-3 columns) | Single column |
| **Forms** | Two columns | Single column |
| **Padding** | 40px | 20px ? 16px |
| **Font Size** | 15px | 13px |

### Responsive Text

```css
/* Fluid Typography (Optional) */
h1 {
  font-size: clamp(20px, 5vw, 32px);
}

body {
  font-size: clamp(13px, 2vw, 15px);
}
```

### Viewport Meta Tag

```html
<!-- index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
```

---

## Accessibility

### ARIA Labels

```html
<!-- Icon-Only Button -->
<button aria-label="Download Resume">
  <span class="material-icons">download</span>
</button>

<!-- Navigation -->
<nav aria-label="Main Navigation">
  <a href="#home" aria-current="page">Home</a>
</nav>

<!-- Collapsible Section -->
<div role="button" aria-expanded="false" aria-controls="popup">
  Show More
</div>
```

### Keyboard Navigation

- **Tab Order**: Logical flow (top to bottom, left to right)
- **Focus Indicators**: Visible outline on focus
- **Skip Links**: Jump to main content

```css
/* Focus Styles */
button:focus,
a:focus,
input:focus {
  outline: 2px solid var(--terminal-green);
  outline-offset: 2px;
}

/* Skip to Main Content */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--terminal-green);
  color: var(--terminal-bg-dark);
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### Color Contrast

All text meets **WCAG AA standards** (4.5:1 for normal text):

- Terminal green (#00ff96) on dark: **9:1** (AAA)
- White text on dark: **12:1** (AAA)
- Secondary text: **7:1** (AAA)

---

## Animations

### Transition Durations

```css
--transition-fast: 0.15s;    /* Hover, focus */
--transition-normal: 0.3s;   /* Default */
--transition-slow: 0.5s;     /* Page transitions */
```

### Common Animations

#### Fade In

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}
```

#### Glow Pulse

```css
@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 30px rgba(0, 255, 150, 0.3);
  }
  50% {
    box-shadow: 0 0 50px rgba(0, 255, 150, 0.5);
  }
}

.glow-pulse {
  animation: glowPulse 2s infinite;
}
```

#### Hover Scale

```css
.scale-hover {
  transition: transform 0.3s ease;
}

.scale-hover:hover {
  transform: scale(1.05);
}
```

### GPU-Accelerated Properties

**Use these for smooth animations:**
- `transform` (translateX, translateY, scale, rotate)
- `opacity`

**Avoid animating:**
- `width`, `height` (causes reflow)
- `margin`, `padding` (causes reflow)
- `top`, `left` (use `transform` instead)

---

## Theme Consistency Rules

### DO's [SUCCESS]

- Always use CSS custom properties (variables)
- Maintain terminal green (#00ff96) as primary accent
- Add responsive styles for all breakpoints
- Include hover states for interactive elements
- Use semantic HTML (header, nav, section, article)
- Add ARIA labels for accessibility
- Test on actual mobile devices
- Use GPU-accelerated animations

### DON'Ts [WARNING]

- Don't introduce new colors without updating this doc
- Don't use inline styles in templates
- Don't skip mobile testing
- Don't hardcode color values
- Don't ignore accessibility
- Don't animate layout properties
- Don't use emojis (encoding issues in CI/CD)
- Don't exceed touch target minimums (44px)

---

## Testing Checklist

### Visual Testing

- [X] Test on Chrome, Safari, Firefox, Edge
- [X] Test on iPhone (375px, 390px, 428px)
- [X] Test on iPad (768px, 1024px)
- [X] Test on desktop (1920px, 2560px)
- [X] Verify hover states
- [X] Check focus indicators
- [X] Test dark mode (if applicable)

### Accessibility Testing

- [X] Keyboard navigation works
- [X] Screen reader announces correctly
- [X] Color contrast meets AA standards
- [X] Touch targets minimum 44px
- [X] ARIA labels present
- [X] Focus visible on all interactive elements

---

## Next Steps

- **Setup/Deployment?** ? See [01-SETUP-AND-DEPLOYMENT.md](01-SETUP-AND-DEPLOYMENT.md)
- **Architecture details?** ? See [02-TECHNICAL-ARCHITECTURE.md](02-TECHNICAL-ARCHITECTURE.md)
- **Build issues?** ? See [04-BUILD-AND-TROUBLESHOOTING.md](04-BUILD-AND-TROUBLESHOOTING.md)

---

**Contact**: rahul.bangera.999@gmail.com  
**Portfolio**: https://rahul-a.in
