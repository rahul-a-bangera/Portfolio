"use strict";
console.log('[CONTACT] Module loaded at', new Date().toISOString());
module.exports = async function (context, req) {
    console.log('[CONTACT] Function invoked at', new Date().toISOString());
    console.log('[CONTACT] Request method:', req.method);
    console.log('[CONTACT] Context object exists:', !!context);
    console.log('[CONTACT] Context.log exists:', !!context.log);
    try {
        context.log('[CONTACT] Context.log works! Starting execution...');
        context.log('[CONTACT] Method:', req.method);
        if (req.method === "OPTIONS") {
            context.log('[CONTACT] Handling OPTIONS request');
            context.res = {
                status: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization"
                }
            };
            context.log('[CONTACT] OPTIONS response set');
            return;
        }
        context.log('[CONTACT] Processing GET request...');
        const contactInfo = {
            email: process.env.CONTACT_EMAIL || "rahul.bangera.999@gmail.com",
            phone: process.env.CONTACT_PHONE || "+91 9663885365",
            socialLinks: {
                LinkedIn: process.env.CONTACT_LINKEDIN || "https://www.linkedin.com/in/rahul-bangera/",
                GitHub: process.env.CONTACT_GITHUB || "https://github.com/rahul-a-bangera",
                Twitter: process.env.CONTACT_TWITTER || ""
            }
        };
        context.log('[CONTACT] Data created successfully');
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
        context.log('[CONTACT] Response set, status:', context.res.status);
        context.log('[CONTACT] Function completed successfully');
    }
    catch (error) {
        console.error('[CONTACT] CATCH ERROR:', error);
        context.log('[CONTACT] ERROR:', error?.message || 'Unknown error');
        context.res = {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: {
                error: "Failed to fetch contact info",
                details: error?.message || 'Unknown error'
            }
        };
    }
};
