/**
 * Profile API Handler
 * Fetches profile data (name and specialist content) from Cloudflare KV
 * Implements caching for optimal performance
 */

export async function handleProfile(
  request: Request,
  env: any,
  corsHeaders: Record<string, string>
): Promise<Response> {
  if (request.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Method Not Allowed' }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }

  try {
    const kvKey = 'profile:data';
    const cacheMaxAge = 3600; // 1 hour cache

    // Fetch profile data from KV
    const data = await env.PORTFOLIO_DATA.get(kvKey, 'json');

    if (!data) {
      console.error(`[ERROR] Profile data not found in KV: ${kvKey}`);
      
      // Return default fallback data
      const fallbackData = {
        name: 'Rahul A Bangera',
        specialistContent: 'Software Developer | .NET & Azure Specialist'
      };

      return new Response(JSON.stringify(fallbackData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300, s-maxage=600', // Short cache for fallback
          'X-Data-Source': 'fallback',
          ...corsHeaders,
        },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, max-age=${cacheMaxAge}, s-maxage=${cacheMaxAge * 2}`,
        'X-Data-Source': 'kv',
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error('[ERROR] Profile handler error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal Server Error', 
        message: 'Failed to fetch profile data' 
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
}
