import { Context, HttpRequest } from "@azure/functions";

module.exports = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Contact function triggered');
    
    // Handle CORS preflight
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
            email: process.env.CONTACT_EMAIL || "rahul.bangera.999@gmail.com",
            phone: process.env.CONTACT_PHONE || "+91 9663885365",
            socialLinks: {
                LinkedIn: process.env.CONTACT_LINKEDIN || "https://www.linkedin.com/in/rahul-bangera/",
                GitHub: process.env.CONTACT_GITHUB || "https://github.com/rahul-a-bangera",
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
    } catch (error) {
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
}
