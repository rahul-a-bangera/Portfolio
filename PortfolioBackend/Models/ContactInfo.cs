namespace PortfolioBackend.Models
{
    public class ContactInfo
    {
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public Dictionary<string, string> SocialLinks { get; set; } = new();
    }
}
