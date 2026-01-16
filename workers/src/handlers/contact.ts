/**
 * Contact API Handler
 * Fetches contact information from Cloudflare KV
 */

export async function handleContact(
  request: Request,
  env: any,
  corsHeaders: Record<string, string>
): Promise<Response> {
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    // Fetch contact info from KV
    const contactInfo = await env.PORTFOLIO_DATA.get('contact:info', 'json');

    if (!contactInfo) {
      console.error('[ERROR] Contact info not found in KV');
      return new Response(
        JSON.stringify({ 
          error: 'Not Found', 
          message: 'Contact information not available' 
        }),
        { 
          status: 404, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    return new Response(JSON.stringify(contactInfo), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600, s-maxage=7200',
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error('[ERROR] Contact handler error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal Server Error', 
        message: 'Failed to fetch contact information' 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }
}
