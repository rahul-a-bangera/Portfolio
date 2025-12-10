namespace PortfolioBackend.Models
{
    public class ResumeData
    {
        public string Summary { get; set; } = string.Empty;
        public List<string> Skills { get; set; } = new();
        public List<string> Tools { get; set; } = new();
        public List<CompanyExperience> Companies { get; set; } = new();
        public List<EducationInfo> Education { get; set; } = new();
    }

    public class CompanyExperience
    {
        public string CompanyName { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public string StartDate { get; set; } = string.Empty;
        public string EndDate { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }

    public class EducationInfo
    {
        public string Institution { get; set; } = string.Empty;
        public string Degree { get; set; } = string.Empty;
        public string Field { get; set; } = string.Empty;
        public string GraduationYear { get; set; } = string.Empty;
    }
}
