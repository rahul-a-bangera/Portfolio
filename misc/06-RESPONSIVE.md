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

### Touch Interactions
- **Tab Swipe Scrolling**: Touch and drag left/right to scroll through hidden tabs
- **Smooth Scrolling**: Native smooth scroll behavior enabled
- **Grab Cursor**: Visual feedback for draggable areas (desktop)

---

## Component Responsive Features

| Component | Mobile | Desktop |
|-----------|--------|---------|
| Header | Icons only | Text + Icons |
| Home | Stacked layout | Card layout |
| Resume | Vertical tabs with touch swipe | Horizontal tabs with mouse drag |
| Blog | Single column | Grid layout |
| Contact | Stacked form | Two columns |

---

## Resume Tabs - Touch Swipe Feature

### Functionality
- **Mobile**: Swipe left/right on tab header to scroll
- **Desktop**: Click and drag tab header to scroll
- **Smooth**: Native smooth scrolling with momentum
- **Visual**: Grab cursor on desktop for drag indication

### Implementation
```typescript
// Touch events for mobile
tabList.addEventListener('touchstart', handleTouchStart);
tabList.addEventListener('touchmove', handleTouchMove);
tabList.addEventListener('touchend', handleTouchEnd);

// Mouse events for desktop
tabList.addEventListener('mousedown', handleMouseDown);
tabList.addEventListener('mousemove', handleMouseMove);
tabList.addEventListener('mouseup', handleMouseUp);
```

### CSS Enhancements
```css
/* Smooth touch scrolling */
.mat-mdc-tab-list {
  overflow-x: auto !important;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Hide scrollbar */
}

/* Grab cursor for desktop */
.mat-mdc-tab-list {
  cursor: grab;
}
```

---

## Testing Viewports

- iPhone SE (375px)
- iPhone 12/13 (390px)
- iPhone Pro Max (428px)
- iPad (768px)
- Desktop (1920px+)

---

## Testing Touch Interactions

### On Mobile Devices
1. Open Resume section
2. Touch and hold on any tab
3. Drag finger left or right
4. Tabs should scroll smoothly
5. Hidden tabs become visible

### On Desktop
1. Open Resume section
2. Click and hold on tab header
3. Cursor changes to "grabbing"
4. Drag mouse left or right
5. Tabs scroll horizontally

---

**Last Updated**: December 11, 2024
