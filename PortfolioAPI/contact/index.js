const contactFunction = async function (context, req) {
    const logPrefix = '[CONTACT]';
    
    context.log(`${logPrefix} Function triggered`);
    context.log(`${logPrefix} Method: ${req.method}`);
    
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        context.log(`${logPrefix} Handling OPTIONS preflight`);
        context.res = {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            },
            body: null
        };
        return;
    }

    // Handle GET request
    try {
        context.log(`${logPrefix} Processing GET request`);
        
        const contactInfo = {
            email: process.env.CONTACT_EMAIL || "rahul.bangera.999@gmail.com",
            phone: process.env.CONTACT_PHONE || "+91 9663885365",
            socialLinks: {
                LinkedIn: process.env.CONTACT_LINKEDIN || "https://www.linkedin.com/in/rahul-bangera/",
                GitHub: process.env.CONTACT_GITHUB || "https://github.com/rahul-a-bangera",
                Twitter: process.env.CONTACT_TWITTER || ""
            }
        };

        context.log(`${logPrefix} Returning contact data`);

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
        
        context.log(`${logPrefix} Success`);
    } catch (error) {
        context.log.error(`${logPrefix} Error: ${error.message}`);
        context.log.error(`${logPrefix} Stack: ${error.stack}`);
        
        context.res = {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: { 
                error: "Internal server error",
                message: error.message
            }
        };
    }
};

module.exports = contactFunction;
