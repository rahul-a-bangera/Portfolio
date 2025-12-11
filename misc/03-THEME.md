# Theme & Design System

**Project**: Rahul A - Portfolio Website  
**Version**: 1.0.0  
**Last Updated**: December 11, 2024

---

## Color Palette

### Terminal Green Theme

```css
/* Primary Colors */
--terminal-green: #00ff96;              /* Main accent color */
--terminal-bg-dark: #0f0f1e;            /* Main background */
--terminal-bg-medium: #1a1a2e;          /* Secondary background */
--terminal-bg-light: #16213e;           /* Tertiary background */

/* Text Colors */
--terminal-text: rgba(255,255,255,0.9);          /* Primary text */
--terminal-text-secondary: rgba(255,255,255,0.6); /* Secondary text */

/* Border Colors */
--terminal-border: rgba(0,255,150,0.2);          /* Default borders */
--terminal-border-bright: rgba(0,255,150,0.5);   /* Active/hover borders */

/* Effect Colors */
--terminal-green-glow: rgba(0,255,150,0.3);      /* Glow effects */
--terminal-green-light: rgba(0,255,150,0.2);     /* Light backgrounds */
```

**Always use these exact color values. Do not introduce new colors without updating this document.**

---

## Typography

### Font Families

```css
/* Headings - Monospace */
--monospace-font: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Courier New', monospace;

/* Body Text - Sans-serif */
--body-font: 'Segoe UI', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;

/* Icons */
--icon-font: 'Material Icons';
```

### Font Sizes

| Element | Desktop | Tablet (768px) | Mobile (480px) |
|---------|---------|----------------|----------------|
| h1 | 32px | 24px | 20px |
| h2 | 28px | 20px | 18px |
| h3 | 24px | 18px | 16px |
| h4 | 20px | 17px | 15px |
| h5 | 18px | 16px | 14px |
| h6 | 16px | 15px | 13px |
| body | 15px | 14px | 13px |

### Line Heights

- **Headings**: 1.3-1.4
- **Body Text**: 1.6-1.7
- **Small Text**: 1.4-1.5

---

## Spacing System

Use multiples of 8px:

```css
--spacing-1: 8px;
--spacing-2: 16px;
--spacing-3: 24px;
--spacing-4: 32px;
--spacing-5: 40px;
--spacing-6: 48px;
--spacing-7: 60px;
```

---

## Component Patterns

### Cards

```css
.card {
  background: rgba(15, 15, 30, 0.9);
  border: 2px solid rgba(0, 255, 150, 0.3);
  border-radius: 8px;
  box-shadow: 
    0 0 30px rgba(0, 255, 150, 0.3),
    0 0 60px rgba(0, 255, 150, 0.1);
}

.card:hover {
  border-color: rgba(0, 255, 150, 0.5);
  box-shadow: 
    0 0 40px rgba(0, 255, 150, 0.4),
    0 0 80px rgba(0, 255, 150, 0.15);
}
```

### Buttons

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
}

.button-primary:hover {
  background: transparent;
  color: #00ff96;
  box-shadow: 0 0 25px rgba(0, 255, 150, 0.5);
  transform: translateY(-2px);
}
```

### Icons

```css
.icon {
  font-size: 20-24px;
  color: #00ff96;
}
```

---

**Last Updated**: December 11, 2024
