"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contactHandler = async function (context, req) {
    if (req.method === "OPTIONS") {
        context.res = {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            }
        };
        return;
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
    }
    catch (error) {
        context.log.error("Error fetching contact info:", error);
        context.res = {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: { error: "Failed to fetch contact info" }
        };
    }
};
exports.default = contactHandler;
