/**
 * Portfolio API - Cloudflare Workers
 * Main entry point for all API endpoints
 */

import { handleContact } from './handlers/contact';
import { handleResume } from './handlers/resume';
import { handleBlog } from './handlers/blog';
import { handleAssets } from './handlers/assets';
import { handleProfile } from './handlers/profile';

// CORS headers configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// Handle CORS preflight requests
function handleOptions(): Response {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// Main request handler
export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }

    try {
      // Route requests to appropriate handlers
      if (path === '/profile' || path === '/api/profile') {
        return await handleProfile(request, env, corsHeaders);
      } else if (path === '/contact' || path === '/api/contact') {
        return await handleContact(request, env, corsHeaders);
      } else if (path.startsWith('/resume') || path.startsWith('/api/resume')) {
        return await handleResume(request, env, corsHeaders);
      } else if (path.startsWith('/blog') || path.startsWith('/api/blog')) {
        return await handleBlog(request, env, corsHeaders);
      } else if (path.startsWith('/assets') || path.startsWith('/api/assets')) {
        return await handleAssets(request, env, corsHeaders);
      } else {
        return new Response(
          JSON.stringify({
            error: 'Not Found',
            message: 'The requested endpoint does not exist',
            availableEndpoints: ['/profile', '/contact', '/resume', '/blog', '/assets'],
          }),
          {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        );
      }
    } catch (error: any) {
      console.error('Error handling request:', error);
      return new Response(
        JSON.stringify({
          error: 'Internal Server Error',
          message: error.message || 'An unexpected error occurred',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }
  },
};
