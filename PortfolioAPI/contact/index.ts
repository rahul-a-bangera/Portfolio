interface Context {
    log: any;
    res?: {
        status: number;
        headers?: Record<string, string>;
        body?: any;
    };
}

interface HttpRequest {
    method?: string;
    url?: string;
    headers?: Record<string, string>;
    query?: Record<string, string>;
    params?: Record<string, string>;
    body?: any;
}

module.exports = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('=== Contact Function Started ===');
    context.log('Method:', req.method);
    
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        context.log('Handling OPTIONS request (CORS preflight)');
        context.res = {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            }
        };
        context.log('OPTIONS response set, returning');
        return;
    }

    try {
        context.log('Processing GET request...');
        
        const contactInfo = {
            email: process.env.CONTACT_EMAIL || "rahul.bangera.999@gmail.com",
            phone: process.env.CONTACT_PHONE || "+91 9663885365",
            socialLinks: {
                LinkedIn: process.env.CONTACT_LINKEDIN || "https://www.linkedin.com/in/rahul-bangera/",
                GitHub: process.env.CONTACT_GITHUB || "https://github.com/rahul-a-bangera",
                Twitter: process.env.CONTACT_TWITTER || ""
            }
        };

        context.log('Contact info created successfully');

        context.res = {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            },
            body: contactInfo
        };
        
        context.log('=== Contact Function Completed Successfully ===');
    } catch (error: any) {
        context.log('=== ERROR in Contact Function ===');
        context.log('Error:', error.message);
        
        context.res = {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: { 
                error: "Failed to fetch contact info",
                details: error.message
            }
        };
    }
}
