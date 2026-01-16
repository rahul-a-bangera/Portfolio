"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = async function (context, req) {
    context.log('=== Contact Function Started ===');
    context.log('Method:', req.method);
    context.log('URL:', req.url);
    context.log('Headers:', JSON.stringify(req.headers));
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
        context.log('Checking environment variables...');
        context.log('CONTACT_EMAIL exists:', !!process.env.CONTACT_EMAIL);
        context.log('CONTACT_PHONE exists:', !!process.env.CONTACT_PHONE);
        const contactInfo = {
            email: process.env.CONTACT_EMAIL || "rahul.bangera.999@gmail.com",
            phone: process.env.CONTACT_PHONE || "+91 9663885365",
            socialLinks: {
                LinkedIn: process.env.CONTACT_LINKEDIN || "https://www.linkedin.com/in/rahul-bangera/",
                GitHub: process.env.CONTACT_GITHUB || "https://github.com/rahul-a-bangera",
                Twitter: process.env.CONTACT_TWITTER || ""
            }
        };
        context.log('Contact info object created successfully');
        context.log('Setting response...');
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
        context.log('Response set successfully');
        context.log('Status:', context.res.status);
        context.log('=== Contact Function Completed Successfully ===');
    }
    catch (error) {
        context.log.error('=== ERROR in Contact Function ===');
        context.log.error('Error type:', error.constructor.name);
        context.log.error('Error message:', error.message);
        context.log.error('Error stack:', error.stack);
        context.res = {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: {
                error: "Failed to fetch contact info",
                details: error.message,
                timestamp: new Date().toISOString()
            }
        };
        context.log.error('Error response set');
    }
};
