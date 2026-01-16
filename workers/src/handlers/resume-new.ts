/**
 * Resume API Handler
 * Fetches resume/CV data from Cloudflare KV
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
    // Fetch resume data from KV
    const resumeData = await env.PORTFOLIO_DATA.get('resume:data', 'json');

    if (!resumeData) {
      console.error('[ERROR] Resume data not found in KV');
      return new Response(
        JSON.stringify({ 
          error: 'Not Found', 
          message: 'Resume data not available. Please contact the administrator.' 
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

    return new Response(JSON.stringify(resumeData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600, s-maxage=7200',
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
