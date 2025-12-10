using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.Models;

namespace PortfolioBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogController : ControllerBase
    {
        private static readonly List<BlogPost> blogs = new()
        {
            new BlogPost
            {
                Id = 1,
                Title = "Building Scalable Retail POS Systems with .NET Core",
                Slug = "building-retail-pos-systems",
                Summary = "Insights on designing and implementing high-performance POS applications using .NET Core and microservices architecture.",
                Content = "Building a robust POS system requires careful consideration of performance, reliability, and scalability. This post explores the architecture and best practices...",
                CreatedDate = DateTime.Now.AddDays(-10),
                Author = "Rahul A"
            },
            new BlogPost
            {
                Id = 2,
                Title = "Payment Integration in E-Commerce: Walley, Adyen, and Vipps",
                Slug = "payment-integration-guide",
                Summary = "A comprehensive guide to integrating multiple payment providers in your .NET applications with OAuth2 and JWT.",
                Content = "Payment integration is a critical component of modern e-commerce applications. Learn how to securely integrate with leading payment providers...",
                CreatedDate = DateTime.Now.AddDays(-7),
                Author = "Rahul A"
            },
            new BlogPost
            {
                Id = 3,
                Title = "Leveraging Azure Services for Cloud-Native Applications",
                Slug = "azure-cloud-native",
                Summary = "Discover how to build and deploy cloud-native applications using Azure App Services, Service Bus, and Application Insights.",
                Content = "Azure provides a comprehensive platform for building and deploying modern cloud applications. This guide covers key Azure services and their implementation...",
                CreatedDate = DateTime.Now.AddDays(-5),
                Author = "Rahul A"
            },
            new BlogPost
            {
                Id = 4,
                Title = "SQL Server Query Optimization Techniques",
                Slug = "sql-query-optimization",
                Summary = "Learn advanced query optimization techniques to improve database performance and reduce server load.",
                Content = "Database performance is crucial for application responsiveness. Explore indexing strategies, execution plans, and optimization techniques...",
                CreatedDate = DateTime.Now.AddDays(-3),
                Author = "Rahul A"
            },
            new BlogPost
            {
                Id = 5,
                Title = "From VB.NET WinForms to Modern .NET Core: Migration Strategies",
                Slug = "vbnet-to-dotnet-migration",
                Summary = "Best practices for migrating legacy VB.NET WinForms applications to modern .NET Core architectures.",
                Content = "Many organizations maintain legacy VB.NET WinForms applications. This post discusses migration strategies and considerations...",
                CreatedDate = DateTime.Now.AddDays(-1),
                Author = "Rahul A"
            }
        };

        [HttpGet]
        public ActionResult<List<BlogPost>> GetBlogs()
        {
            return Ok(blogs);
        }

        [HttpGet("{slug}")]
        public ActionResult<BlogPost> GetBlogBySlug(string slug)
        {
            var blog = blogs.FirstOrDefault(b => b.Slug == slug);
            if (blog == null)
                return NotFound();
            return Ok(blog);
        }
    }
}
