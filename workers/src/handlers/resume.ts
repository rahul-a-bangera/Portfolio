/**
 * Resume API Handler
 * Fetches resume/CV data from Cloudflare KV
 * Supports endpoints for different resume sections for optimized loading
 */

export async function handleResume(
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
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const section = pathParts[pathParts.length - 1];

    let kvKey = 'resume:data';
    let cacheMaxAge = 3600;

    // Determine which section to fetch
    if (section === 'personal') {
      kvKey = 'resume:personal';
    } else if (section === 'summary') {
      kvKey = 'resume:summary';
    } else if (section === 'skills') {
      kvKey = 'resume:skills';
    } else if (section === 'tools') {
      kvKey = 'resume:tools';
    } else if (section === 'experience') {
      kvKey = 'resume:experience';
    } else if (section === 'education') {
      kvKey = 'resume:education';
    }
    // else defaults to 'resume:data' for full resume

    // Fetch data from KV
    const data = await env.PORTFOLIO_DATA.get(kvKey, 'json');

    if (!data) {
      console.error(`[ERROR] Resume data not found in KV: ${kvKey}`);
      return new Response(
        JSON.stringify({ 
          error: 'Not Found', 
          message: `Resume data not available: ${section}` 
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

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, max-age=${cacheMaxAge}, s-maxage=${cacheMaxAge * 2}`,
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error('[ERROR] Resume handler error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal Server Error', 
        message: 'Failed to fetch resume data' 
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
