# Quick Responsive Design Reference

## Media Query Breakpoints

```css
/* Desktop Default - No media query needed */
/* Applies to screens wider than 1024px */

/* Tablet & Large Mobile - 960px to 1024px */
@media (max-width: 1024px) { }

/* Mobile Large - 768px to 960px */
@media (max-width: 960px) { }

/* Mobile Medium - 480px to 768px */
@media (max-width: 768px) { }

/* Mobile Small - Below 480px */
@media (max-width: 480px) { }
```

## Component Responsive Features

| Component | Desktop | Tablet (960px) | Mobile (768px) | Small Mobile (480px) |
|-----------|---------|----------------|----------------|----------------------|
| **Header** | Full text + icons | Smaller text | Icon only | Smaller icons |
| **Home Profile** | 140px image | 110px image | 110px image | 90px image |
| **Resume Tabs** | Full labels | Medium labels | Small labels | Tiny labels |
| **Blog Grid** | Multi-column | 2 columns | 1 column | 1 column |
| **Contact Form** | 2 columns | 2 columns | 1 column | 1 column |
| **Buttons** | Normal size | Medium size | Large touch | Large touch |

## Font Sizes

### Headings
| Element | Desktop | Tablet (1024px) | Mobile (768px) | Small Mobile (480px) |
|---------|---------|-----------------|----------------|----------------------|
| h1 | 32px | 28px | 24px | 20px |
| h2 | 28px | 24px | 20px | 18px |
| h3 | 24px | 20px | 18px | 16px |
| h4 | 20px | 20px | 17px | 15px |
| h5 | 18px | 18px | 16px | 14px |
| h6 | 16px | 16px | 15px | 13px |
| p | 15px | 15px | 14px | 13px |

## Touch Target Sizes

### Minimum Sizes
- **Primary buttons**: 44px × 44px minimum (iOS guideline)
- **Secondary buttons**: 40px × 40px minimum
- **Navigation items**: 44px × 44px on mobile
- **Icon buttons**: 40px × 40px minimum
- **Form inputs**: 44px height minimum

## Layout Changes

### Home Component
```
Desktop:     [Profile Card - Max 700px width]
Mobile:      [Profile Card - Full width with margins]
```

### Resume Component
```
Desktop:     [Full Tabs] ? [Content in columns]
Mobile:      [Icon Tabs] ? [Content stacked]
```

### Blog Component
```
Desktop:     [Filter Chips in row] + [3-4 column grid]
Mobile:      [Scrollable chips] + [Single column]
```

### Contact Component
```
Desktop:     [Info Cards | Contact Form]
Mobile:      [Info Cards stacked] + [Contact Form full width]
```

## Common Responsive Patterns

### 1. Navigation
- Hide text labels on mobile
- Show only icons
- Ensure 44px minimum touch target

### 2. Cards
- Reduce padding: 32px ? 24px ? 20px ? 16px
- Stack content vertically on mobile
- Full-width on small screens

### 3. Grids
- Auto-fit columns with minimum width
- Switch to single column below 768px
- Reduce gap sizes on mobile

### 4. Modals/Popups
- Full-screen on small mobile
- 95% width with margins on mobile
- Stack fields vertically

### 5. Forms
- 16px font size minimum (prevents iOS zoom)
- Full-width on mobile
- Stack labels above inputs

## Testing Viewports

```
iPhone SE:           375px × 667px
iPhone 12/13:        390px × 844px
iPhone 12/13 Pro Max: 428px × 926px
Galaxy S21:          360px × 800px
iPad:                768px × 1024px
iPad Pro:            1024px × 1366px
Desktop:             1920px × 1080px
```

## Quick Tips

1. **Always test on real devices** when possible
2. **Use Chrome DevTools** device emulation for quick testing
3. **Check in both portrait and landscape** orientations
4. **Test touch interactions** with actual finger taps
5. **Verify form inputs** don't cause unwanted zoom
6. **Check horizontal scroll** - should only be intentional
7. **Test with slow network** to see loading states
8. **Verify text remains readable** without zooming

## Common Issues & Solutions

### Issue: Elements too small to tap
**Solution**: Ensure minimum 44px × 44px touch targets

### Issue: Text causes zoom on iOS form inputs
**Solution**: Use 16px or larger font size on inputs

### Issue: Horizontal scrolling
**Solution**: Use `overflow-x: hidden` on body or set max-width: 100%

### Issue: Cards too wide on mobile
**Solution**: Use max-width: 100% and add padding on container

### Issue: Columns don't stack on mobile
**Solution**: Switch to `flex-direction: column` or single column grid

### Issue: Modal too large on mobile
**Solution**: Use width: 95% or 96% with small margins

## Browser Prefixes Included

- `-webkit-tap-highlight-color`: For better touch feedback
- `-webkit-scrollbar`: For custom scrollbar styling
- `backdrop-filter`: For frosted glass effects

## Performance Considerations

1. Smaller animation patterns on mobile (50px ? 30px)
2. Reduced box-shadow blur on mobile
3. Simplified gradients where possible
4. Optimized grid layouts with fewer columns

## Accessibility

- Maintained color contrast ratios
- Touch targets meet WCAG guidelines
- Text remains readable at all sizes
- Focus states work on all devices
- Keyboard navigation supported
