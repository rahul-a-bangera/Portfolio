using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.Models;

namespace PortfolioBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResumeController : ControllerBase
    {
        [HttpGet]
        public ActionResult<ResumeData> GetResume()
        {
            var resume = new ResumeData
            {
                Summary = "Software Engineer with 4+ years of experience working with .NET technologies, including C#, .NET Core, VB.NET, WinForms, and SQL, along with hands-on exposure to microservices, payment integrations, and Azure cloud services. Skilled in building and maintaining applications in the retail, financial, and accounting domains. Strong in problem-solving, debugging, and delivering reliable solutions under tight timelines.",
                Skills = new List<string>
                {
                    "C#",
                    ".NET Core",
                    ".NET Framework",
                    "VB.NET",
                    "SQL Server",
                    "Microservices",
                    "REST APIs",
                    "OAuth2",
                    "JWT Authentication",
                    "WinForms",
                    "Retail POS Systems",
                    "Payment Integrations",
                    "Problem Solving",
                    "Debugging"
                },
                Tools = new List<string>
                {
                    "Azure App Services",
                    "Azure Service Bus",
                    "Azure Storage",
                    "Azure App Insights",
                    "Visual Studio",
                    "Git",
                    "TFS",
                    "SQL Server Management Studio",
                    "Postman",
                    "Walley",
                    "Adyen",
                    "Vipps"
                },
                Companies = new List<CompanyExperience>
                {
                    new CompanyExperience
                    {
                        CompanyName = "EG India",
                        Position = "Software Developer",
                        StartDate = "11/2024",
                        EndDate = "Present",
                        Description = "Contribute 80% of work to developing and maintaining services using C#, .NET Framework, and .NET Core within a microservices architecture. Build and enhance Retail Point of Sale (POS) applications and APIs using REST principles, OAuth2, and JWT-based authentication. Implement and support payment integrations including onboarding Nordic providers such as Walley, Adyen, and Vipps. Work with Azure services for deployment, monitoring, configuration, and cloud operations. Independently manage a legacy VB.NET WinForms POS application in the remaining 20% of time."
                    },
                    new CompanyExperience
                    {
                        CompanyName = "WINMAN SOFTWARE INDIA LLP",
                        Position = "Senior Programming Engineer",
                        StartDate = "08/2021",
                        EndDate = "10/2024",
                        Description = "Developed core modules for a new accounting software and enhanced financial products like E-Proceeding using VB.NET, SQL Server, and Visual Studio. Led requirement gathering and user-focused design discussions with senior management. Performed SQL Server query optimization to reduce server load and improve performance. Conducted code reviews, guided team members, and managed data integrity. Oversaw special project execution from planning through delivery."
                    }
                },
                Education = new List<EducationInfo>
                {
                    new EducationInfo
                    {
                        Institution = "Sahyadri College of Engineering & Management",
                        Degree = "Bachelor of Technology",
                        Field = "Information Science & Engineering",
                        GraduationYear = "2021"
                    }
                }
            };

            return Ok(resume);
        }
    }
}
