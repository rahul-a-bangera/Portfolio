using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.Models;

namespace PortfolioBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ContactController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public ActionResult<ContactInfo> GetContactInfo()
        {
            var contact = new ContactInfo
            {
                Email = _configuration["ContactInfo:Email"] ?? string.Empty,
                Phone = _configuration["ContactInfo:Phone"] ?? string.Empty,
                SocialLinks = new Dictionary<string, string>
                {
                    { "LinkedIn", _configuration["ContactInfo:LinkedIn"] ?? string.Empty },
                    { "GitHub", _configuration["ContactInfo:GitHub"] ?? string.Empty },
                    { "Twitter", _configuration["ContactInfo:Twitter"] ?? string.Empty }
                }
            };

            return Ok(contact);
        }
    }
}
