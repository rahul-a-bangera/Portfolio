"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("@azure/functions");
async function contactHandler(request, context) {
    if (request.method === "OPTIONS") {
        return {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            }
        };
    }
    try {
        const contactInfo = {
            email: process.env.CONTACT_EMAIL || "",
            phone: process.env.CONTACT_PHONE || "",
            socialLinks: {
                LinkedIn: process.env.CONTACT_LINKEDIN || "",
                GitHub: process.env.CONTACT_GITHUB || "",
                Twitter: process.env.CONTACT_TWITTER || ""
            }
        };
        return {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            },
            jsonBody: contactInfo
        };
    }
    catch (error) {
        context.error("Error fetching contact info:", error);
        return {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            jsonBody: { error: "Failed to fetch contact info" }
        };
    }
}
functions_1.app.http('contact', {
    methods: ['GET', 'OPTIONS'],
    authLevel: 'anonymous',
    route: 'contact',
    handler: contactHandler
});
