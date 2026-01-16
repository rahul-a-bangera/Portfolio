/**
 * Blog API Handler
 * Fetches blog posts from Cloudflare KV
 */

export async function handleBlog(
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
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const slug = pathParts[pathParts.length - 1];

    // Get specific blog post by slug
    if (slug && slug !== 'blog') {
      const post = await env.PORTFOLIO_DATA.get(`blog:${slug}`, 'json');

      if (!post) {
        console.error(`[ERROR] Blog post not found: ${slug}`);
        return new Response(
          JSON.stringify({ 
            error: 'Not Found', 
            message: `Blog post '${slug}' not found` 
          }),
          { 
            status: 404, 
            headers: { 'Content-Type': 'application/json', ...corsHeaders } 
          }
        );
      }

      return new Response(JSON.stringify(post), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600, s-maxage=7200',
          ...corsHeaders,
        },
      });
    }

    // Get all blog posts
    const allPosts = await env.PORTFOLIO_DATA.get('blog:all', 'json');

    if (!allPosts) {
      console.error('[ERROR] Blog posts not found in KV');
      return new Response(
        JSON.stringify({ 
          error: 'Not Found', 
          message: 'No blog posts available' 
        }),
        { 
          status: 404, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    return new Response(JSON.stringify(allPosts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=1800, s-maxage=3600',
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error('[ERROR] Blog handler error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal Server Error', 
        message: 'Failed to fetch blog posts' 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }
}
