/**
 * Resume API Handler
 * Returns resume/CV data
 */

export async function handleResume(
  request: Request,
  env: any,
  corsHeaders: Record<string, string>
): Promise<Response> {
  if (request.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Method Not Allowed' }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }

  try {
    const resumeData = {
      personalInfo: {
        name: 'Rahul A Bangera',
        title: 'Full Stack Developer | Cloud Solutions Architect',
        email: env.CONTACT_EMAIL || 'rahul.bangera.999@gmail.com',
        phone: env.CONTACT_PHONE || '+91 9663 885 365',
        location: 'Bangalore, India',
        linkedin: env.CONTACT_LINKEDIN || 'https://www.linkedin.com/in/rahul-bangera/',
        github: env.CONTACT_GITHUB || 'https://github.com/rahul-a-bangera',
        website: 'https://rahul-a.in',
      },
      summary:
        'Experienced Full Stack Developer with 5+ years of expertise in building scalable web applications using .NET, Angular, and Azure cloud services. Passionate about clean code, modern architecture, and delivering high-quality solutions.',
      skills: {
        frontend: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'RxJS', 'Material Design'],
        backend: ['.NET Core', 'C#', 'ASP.NET', 'Web API', 'Entity Framework', 'Node.js'],
        cloud: ['Azure', 'Cloudflare Workers', 'Azure Functions', 'Azure DevOps', 'CI/CD'],
        database: ['SQL Server', 'CosmosDB', 'MongoDB', 'PostgreSQL'],
        tools: ['Git', 'Visual Studio', 'VS Code', 'Docker', 'Postman'],
      },
      experience: [
        {
          company: 'Tech Solutions Inc.',
          position: 'Senior Full Stack Developer',
          location: 'Bangalore, India',
          startDate: '2021-01',
          endDate: 'Present',
          description: 'Lead development of enterprise web applications using .NET Core and Angular',
          achievements: [
            'Architected and implemented microservices-based solutions on Azure',
            'Reduced application load time by 40% through performance optimization',
            'Mentored junior developers and conducted code reviews',
            'Implemented CI/CD pipelines using Azure DevOps',
          ],
        },
        {
          company: 'Digital Innovations Ltd.',
          position: 'Full Stack Developer',
          location: 'Bangalore, India',
          startDate: '2019-06',
          endDate: '2020-12',
          description: 'Developed and maintained multiple client-facing web applications',
          achievements: [
            'Built RESTful APIs using .NET Core and integrated with Angular frontend',
            'Implemented authentication and authorization using JWT',
            'Collaborated with cross-functional teams in Agile environment',
            'Optimized database queries resulting in 30% performance improvement',
          ],
        },
      ],
      education: [
        {
          institution: 'University of Technology',
          degree: 'Bachelor of Engineering in Computer Science',
          location: 'Karnataka, India',
          graduationDate: '2019-05',
          gpa: '8.5/10',
        },
      ],
      certifications: [
        {
          name: 'Microsoft Certified: Azure Developer Associate',
          issuer: 'Microsoft',
          issueDate: '2022-06',
          credentialId: 'AZ-204',
        },
        {
          name: 'Angular - The Complete Guide',
          issuer: 'Udemy',
          issueDate: '2021-03',
        },
      ],
      projects: [
        {
          name: 'Portfolio Website',
          description: 'Modern responsive portfolio built with Angular 19 and Cloudflare Workers',
          technologies: ['Angular', 'TypeScript', 'Cloudflare Workers', 'GitHub Pages'],
          url: 'https://rahul-a.in',
          github: 'https://github.com/rahul-a-bangera/Portfolio',
        },
      ],
    };

    return new Response(JSON.stringify(resumeData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error('Error in resume handler:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal Server Error',
        message: error.message,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
}
