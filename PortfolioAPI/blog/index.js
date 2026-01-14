"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = blogHandler;
async function blogHandler(request, context) {
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
        const blogPosts = [
            {
                id: 1,
                slug: "getting-started-angular-19",
                title: "Getting Started with Angular 19",
                description: "Explore the new features and improvements in Angular 19, including standalone components, signals, and performance enhancements.",
                content: "Angular 19 brings exciting new features...",
                author: "Rahul A Bangera",
                publishDate: "2024-01-15",
                tags: ["Angular", "TypeScript", "Web Development"],
                imageUrl: "/assets/blog/angular-19.jpg",
                readTime: "8 min read",
                featured: true
            },
            {
                id: 2,
                slug: "building-restful-apis-dotnet-core",
                title: "Building RESTful APIs with .NET Core",
                description: "Learn best practices for designing and implementing RESTful APIs using .NET Core and Entity Framework.",
                content: ".NET Core provides a robust framework...",
                author: "Rahul A Bangera",
                publishDate: "2024-01-10",
                tags: [".NET", "API", "Backend Development"],
                imageUrl: "/assets/blog/dotnet-api.jpg",
                readTime: "12 min read",
                featured: true
            },
            {
                id: 3,
                slug: "microservices-azure-guide",
                title: "Microservices Architecture on Azure",
                description: "A comprehensive guide to building and deploying microservices on Azure using Azure Kubernetes Service and Azure Functions.",
                content: "Microservices architecture has become...",
                author: "Rahul A Bangera",
                publishDate: "2024-01-05",
                tags: ["Azure", "Microservices", "Cloud", "Architecture"],
                imageUrl: "/assets/blog/azure-microservices.jpg",
                readTime: "15 min read",
                featured: false
            },
            {
                id: 4,
                slug: "css-grid-vs-flexbox",
                title: "CSS Grid vs Flexbox: When to Use Each",
                description: "Understanding the differences between CSS Grid and Flexbox and choosing the right layout system for your project.",
                content: "Both CSS Grid and Flexbox are powerful...",
                author: "Rahul A Bangera",
                publishDate: "2024-01-01",
                tags: ["CSS", "Frontend", "Web Design"],
                imageUrl: "/assets/blog/css-layout.jpg",
                readTime: "6 min read",
                featured: false
            },
            {
                id: 5,
                slug: "web-performance-optimization",
                title: "Web Performance Optimization Techniques",
                description: "Practical tips and techniques to improve your web application's performance and user experience.",
                content: "Performance is crucial for modern web applications...",
                author: "Rahul A Bangera",
                publishDate: "2023-12-28",
                tags: ["Performance", "Optimization", "Web Development"],
                imageUrl: "/assets/blog/performance.jpg",
                readTime: "10 min read",
                featured: false
            }
        ];
        const slug = request.params.slug;
        if (slug) {
            const post = blogPosts.find(p => p.slug === slug);
            if (!post) {
                return {
                    status: 404,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    jsonBody: { error: "Blog post not found" }
                };
            }
            return {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization"
                },
                jsonBody: post
            };
        }
        else {
            return {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization"
                },
                jsonBody: blogPosts
            };
        }
    }
    catch (error) {
        context.error("Error fetching blog data:", error);
        return {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            jsonBody: { error: "Failed to fetch blog data" }
        };
    }
}
