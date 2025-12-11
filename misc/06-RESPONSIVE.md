# Responsive Design Guide

**Project**: Rahul A - Portfolio Website  
**Version**: 1.0.0  
**Last Updated**: December 11, 2024

---

## Breakpoints

```css
/* Desktop Default - No media query needed (1024px+) */

/* Tablet - 960px to 1024px */
@media (max-width: 1024px) { }

/* Mobile Large - 768px to 960px */
@media (max-width: 960px) { }

/* Mobile Medium - 480px to 768px */
@media (max-width: 768px) { }

/* Mobile Small - Below 480px */
@media (max-width: 480px) { }
```

---

## Touch Targets

- **Minimum**: 44x44px (iOS guidelines)
- **Preferred**: 48x48px (Android guidelines)
- **Spacing**: Minimum 8px between targets

---

## Mobile Optimizations

### Navigation
- Icon-only on mobile (<768px)
- Full text on desktop

### Layout
- Single-column on mobile
- Multi-column on desktop

### Typography
- 16px minimum for inputs (prevents iOS zoom)
- Scale headings: 32px (desktop) ? 20px (mobile)

---

## Component Responsive Features

| Component | Mobile | Desktop |
|-----------|--------|---------|
| Header | Icons only | Text + Icons |
| Home | Stacked layout | Card layout |
| Resume | Vertical tabs | Horizontal tabs |
| Blog | Single column | Grid layout |
| Contact | Stacked form | Two columns |

---

## Testing Viewports

- iPhone SE (375px)
- iPhone 12/13 (390px)
- iPhone Pro Max (428px)
- iPad (768px)
- Desktop (1920px+)

---

**Last Updated**: December 11, 2024
