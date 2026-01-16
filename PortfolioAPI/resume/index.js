const resumeFunction = async function (context, req) {
const logPrefix = '[RESUME]';
    
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
        const resumeData = {
            personalInfo: {
                name: "Rahul A Bangera",
                title: "Full Stack Developer | Cloud Solutions Architect",
                email: process.env.CONTACT_EMAIL || "rahul.bangera.999@gmail.com",
                phone: process.env.CONTACT_PHONE || "+91 9663 885 365",
                location: "Bangalore, India",
                linkedin: process.env.CONTACT_LINKEDIN || "https://www.linkedin.com/in/rahul-bangera/",
                github: process.env.CONTACT_GITHUB || "https://github.com/rahul-a-bangera",
                website: "https://rahul-a.in"
            },
            summary: "Experienced Full Stack Developer with 5+ years of expertise in building scalable web applications using .NET, Angular, and Azure cloud services. Passionate about clean code, modern architecture, and delivering high-quality solutions.",
            skills: {
                frontend: ["Angular", "TypeScript", "JavaScript", "HTML5", "CSS3", "RxJS", "Material Design"],
                backend: [".NET Core", "C#", "ASP.NET", "Web API", "Entity Framework", "Node.js"],
                cloud: ["Azure", "Azure Functions", "Azure Static Web Apps", "Azure DevOps", "CI/CD"],
                database: ["SQL Server", "CosmosDB", "MongoDB", "PostgreSQL"],
                tools: ["Git", "Visual Studio", "VS Code", "Docker", "Postman"]
            },
            experience: [
                {
                    company: "Tech Solutions Inc.",
                    position: "Senior Full Stack Developer",
                    location: "Bangalore, India",
                    startDate: "2021-01",
                    endDate: "Present",
                    description: "Lead development of enterprise web applications using .NET Core and Angular",
                    achievements: [
                        "Architected and implemented microservices-based solutions on Azure",
                        "Reduced application load time by 40% through performance optimization",
                        "Mentored junior developers and conducted code reviews",
                        "Implemented CI/CD pipelines using Azure DevOps"
                    ]
                },
                {
                    company: "Digital Innovations Ltd.",
                    position: "Full Stack Developer",
                    location: "Bangalore, India",
                    startDate: "2019-06",
                    endDate: "2020-12",
                    description: "Developed and maintained multiple client-facing web applications",
                    achievements: [
                        "Built RESTful APIs using .NET Core and integrated with Angular frontend",
                        "Implemented authentication and authorization using JWT",
                        "Collaborated with cross-functional teams in Agile environment",
                        "Optimized database queries resulting in 30% performance improvement"
                    ]
                }
            ],
            education: [
                {
                    institution: "University of Technology",
                    degree: "Bachelor of Engineering in Computer Science",
                    location: "Karnataka, India",
                    graduationDate: "2019-05",
                    gpa: "8.5/10"
                }
            ],
            certifications: [
                {
                    name: "Microsoft Certified: Azure Developer Associate",
                    issuer: "Microsoft",
                    issueDate: "2022-06",
                    credentialId: "AZ-204"
                },
                {
                    name: "Angular - The Complete Guide",
                    issuer: "Udemy",
                    issueDate: "2021-03"
                }
            ],
            projects: [
                {
                    name: "Portfolio Website",
                    description: "Modern responsive portfolio built with Angular 19 and Azure Static Web Apps",
                    technologies: ["Angular", "TypeScript", "Azure", "Azure Functions"],
                    url: "https://rahul-a.in",
                    highlights: [
                        "Terminal-inspired cyberpunk design theme",
                        "Serverless API with Azure Functions",
                        "Responsive design with mobile-first approach",
                        "CI/CD with GitHub Actions"
                    ]
                },
                {
                    name: "E-Commerce Platform",
                    description: "Full-featured e-commerce solution with payment integration",
                    technologies: [".NET Core", "Angular", "SQL Server", "Azure"],
                    highlights: [
                        "Microservices architecture",
                        "Payment gateway integration",
                        "Real-time inventory management",
                        "Admin dashboard with analytics"
                    ]
                }
            ]
        };
        
        context.log(`${logPrefix} Returning resume data`);
        context.log(`${logPrefix} Data sections: ${Object.keys(resumeData).join(', ')}`);
        
        context.res = {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            },
            body: resumeData
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

module.exports = resumeFunction;
