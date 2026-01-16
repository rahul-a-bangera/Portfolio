/**
 * Contact API Handler
 * Returns contact information
 */

export async function handleContact(
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
    const contactInfo = {
      email: env.CONTACT_EMAIL || 'rahul.bangera.999@gmail.com',
      phone: env.CONTACT_PHONE || '+91 9663885365',
      socialLinks: {
        LinkedIn: env.CONTACT_LINKEDIN || 'https://www.linkedin.com/in/rahul-bangera/',
        GitHub: env.CONTACT_GITHUB || 'https://github.com/rahul-a-bangera',
        Twitter: env.CONTACT_TWITTER || '',
      },
    };

    return new Response(JSON.stringify(contactInfo), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error('Error in contact handler:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal Server Error',
        message: error.message,
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
