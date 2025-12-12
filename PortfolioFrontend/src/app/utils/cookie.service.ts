export interface CookieOptions {
  expires?: Date | number; // Date object or days from now
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export class CookieService {
  /**
   * Get a cookie value by name
   */
  static get(name: string): string | null {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    
    for (let cookie of cookies) {
      let c = cookie.trim();
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length));
      }
    }
    return null;
  }

  /**
   * Set a cookie
   */
  static set(name: string, value: string, options: CookieOptions = {}): void {
    let cookieString = `${name}=${encodeURIComponent(value)}`;

    // Set expiration
    if (options.expires) {
      if (typeof options.expires === 'number') {
        const date = new Date();
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
        cookieString += `; expires=${date.toUTCString()}`;
      } else {
        cookieString += `; expires=${options.expires.toUTCString()}`;
      }
    }

    // Set path (default to '/')
    cookieString += `; path=${options.path || '/'}`;

    // Set domain
    if (options.domain) {
      cookieString += `; domain=${options.domain}`;
    }

    // Set secure flag
    if (options.secure) {
      cookieString += '; secure';
    }

    // Set SameSite
    if (options.sameSite) {
      cookieString += `; SameSite=${options.sameSite}`;
    }

    document.cookie = cookieString;
  }

  /**
   * Delete a cookie
   */
  static delete(name: string, path: string = '/'): void {
    this.set(name, '', { expires: -1, path });
  }

  /**
   * Check if a cookie exists
   */
  static exists(name: string): boolean {
    return this.get(name) !== null;
  }

  /**
   * Get all cookies as an object
   */
  static getAll(): { [key: string]: string } {
    const cookies: { [key: string]: string } = {};
    const cookieArray = document.cookie.split(';');

    for (let cookie of cookieArray) {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookies[name] = decodeURIComponent(value);
      }
    }

    return cookies;
  }

  /**
   * Clear all cookies
   */
  static clear(): void {
    const cookies = this.getAll();
    for (let name in cookies) {
      this.delete(name);
    }
  }
}
