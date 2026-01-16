/**
 * Assets API Handler
 * Serves binary assets (PDF, images) from Cloudflare KV
 */

export async function handleAssets(
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
    const assetType = pathParts[pathParts.length - 1];

    let kvKey = '';
    
    // Determine which asset to fetch
    if (assetType === 'resume' || assetType === 'resume.pdf') {
      kvKey = 'assets:resume';
    } else if (assetType === 'profile' || assetType === 'profile.jpg' || assetType === 'profile.png') {
      kvKey = 'assets:profile';
    } else {
      return new Response(
        JSON.stringify({ 
          error: 'Not Found', 
          message: 'Asset not found',
          availableAssets: ['resume', 'profile']
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

    // Fetch asset from KV
    const asset = await env.PORTFOLIO_DATA.get(kvKey, 'json');

    if (!asset) {
      console.error(`[ERROR] Asset not found in KV: ${kvKey}`);
      return new Response(
        JSON.stringify({ 
          error: 'Not Found', 
          message: `Asset not available: ${assetType}` 
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

    // Decode base64 data
    const binaryData = Uint8Array.from(atob(asset.data), c => c.charCodeAt(0));

    // Return binary response with appropriate headers
    return new Response(binaryData, {
      status: 200,
      headers: {
        'Content-Type': asset.mimeType,
        'Content-Length': binaryData.length.toString(),
        'Content-Disposition': `inline; filename="${asset.filename}"`,
        'Cache-Control': 'public, max-age=86400, s-maxage=604800', // Cache for 1 day (client) / 7 days (edge)
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error('[ERROR] Assets handler error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal Server Error', 
        message: 'Failed to fetch asset' 
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
