# Cookie Utility Service

A lightweight, type-safe cookie management service for Angular applications.

## Location
`src/app/utils/cookie.service.ts`

## Features

- ? Get, set, and delete cookies
- ? Type-safe cookie options
- ? Automatic encoding/decoding
- ? Expiration support (days or Date object)
- ? Path, domain, secure, and SameSite attributes
- ? Check if cookie exists
- ? Get all cookies as object
- ? Clear all cookies

## Usage

### Import
```typescript
import { CookieService } from '../utils/cookie.service';
```

### Set a Cookie
```typescript
// Simple set (expires with session)
CookieService.set('username', 'John Doe');

// Set with expiration (365 days)
CookieService.set('token', 'abc123', { expires: 365 });

// Set with custom options
CookieService.set('preferences', JSON.stringify(data), {
  expires: 30,
  path: '/',
  secure: true,
  sameSite: 'lax'
});
```

### Get a Cookie
```typescript
const username = CookieService.get('username');
// Returns: 'John Doe' or null if not found
```

### Delete a Cookie
```typescript
CookieService.delete('username');
```

### Check if Cookie Exists
```typescript
if (CookieService.exists('token')) {
  // Cookie exists
}
```

### Get All Cookies
```typescript
const allCookies = CookieService.getAll();
// Returns: { username: 'John Doe', token: 'abc123' }
```

### Clear All Cookies
```typescript
CookieService.clear();
```

## Cookie Options

```typescript
interface CookieOptions {
  expires?: Date | number;  // Date object or days from now
  path?: string;            // Default: '/'
  domain?: string;          // Cookie domain
  secure?: boolean;         // HTTPS only
  sameSite?: 'strict' | 'lax' | 'none';
}
```

## Example: Storing User Preferences

```typescript
// Save preferences
const preferences = {
  theme: 'dark',
  language: 'en'
};

CookieService.set('user_prefs', JSON.stringify(preferences), {
  expires: 365,
  path: '/',
  sameSite: 'lax'
});

// Load preferences
const savedPrefs = CookieService.get('user_prefs');
if (savedPrefs) {
  const preferences = JSON.parse(savedPrefs);
  console.log(preferences.theme); // 'dark'
}
```

## Best Practices

1. **Use meaningful names**: Use descriptive cookie names
2. **Set expiration**: Always set expiration for persistent cookies
3. **Use JSON for objects**: Stringify objects before storing
4. **Handle errors**: Wrap JSON.parse in try-catch
5. **Secure cookies**: Use `secure: true` and `sameSite: 'lax'` for sensitive data

## Security Notes

- Cookies are stored in plain text - don't store sensitive data
- Use `secure: true` for HTTPS-only cookies
- Use `sameSite: 'lax'` or `'strict'` to prevent CSRF attacks
- Set appropriate expiration times
- Be mindful of cookie size limits (4KB per cookie)

## Browser Compatibility

Works in all modern browsers that support:
- `document.cookie`
- `encodeURIComponent` / `decodeURIComponent`

## Related Files

- **Service using cookies**: `src/app/services/ambient-control.service.ts`
- **Cookie storage key**: `ambient_settings`
- **Expiration**: 365 days

---

**Last Updated**: December 12, 2024
