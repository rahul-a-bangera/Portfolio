import { Context, HttpRequest } from "@azure/functions";

module.exports = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('=== Resume Function Started ===');
    context.log('Method:', req.method);
    context.log('URL:', req.url);
    
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
        context.log('Building resume data object...');
        
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

        context.log('Resume data object created successfully');
        context.log('Object keys:', Object.keys(resumeData).join(', '));
        context.log('Setting response...');

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
        
        context.log('Response set successfully');
        context.log('Status:', context.res.status);
        context.log('=== Resume Function Completed Successfully ===');
    } catch (error) {
        context.log.error('=== ERROR in Resume Function ===');
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
                error: "Failed to fetch resume data",
                details: error.message,
                timestamp: new Date().toISOString()
            }
        };
        context.log.error('Error response set');
    }
}
