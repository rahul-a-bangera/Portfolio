using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.Models;

namespace PortfolioBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        [HttpGet]
        public ActionResult<ContactInfo> GetContactInfo()
        {
            var contact = new ContactInfo
            {
                Email = "rahul.bangera.999@gmail.com",
                Phone = "+91 9663 885 365",
                SocialLinks = new Dictionary<string, string>
                {
                    { "LinkedIn", "https://linkedin.com/in/rahul-bangera" },
                    { "GitHub", "https://github.com/rahul-bangera" },
                    { "Twitter", "https://twitter.com/rahul_bangera" }
                }
            };

            return Ok(contact);
        }
    }
}
