# Portfolio Website

A modern, single-page portfolio website built with Angular (frontend) and C# .NET (backend), featuring Material Design components.

## Features

- **Responsive Design**: Built with Angular Material for beautiful, responsive UI
- **Single Page Application**: Smooth navigation with auto-scrolling sections
- **Multiple Sections**:
  - **Home**: Introduction with profile card
  - **Resume**: Tabbed interface with summary, skills, tools, experience, and education
  - **Blog**: Blog posts with cards and links
  - **Contact**: Contact information with social media links

## Tech Stack

### Backend
- **.NET 8.0**: ASP.NET Core Web API
- **C#**: Backend logic and API endpoints
- **CORS**: Configured for Angular frontend communication

### Frontend
- **Angular 17**: Latest Angular framework
- **TypeScript**: Strongly-typed JavaScript
- **Angular Material**: Material Design components
- **RxJS**: Reactive programming with Observables
- **HttpClient**: API communication

## Project Structure

```
Portfolio/
├── PortfolioBackend/               # .NET Core Backend
│   ├── Controllers/                # API Endpoints
│   │   ├── BlogController.cs
│   │   ├── ResumeController.cs
│   │   └── ContactController.cs
│   ├── Models/                     # Data Models
│   │   ├── BlogPost.cs
│   │   ├── ResumeData.cs
│   │   └── ContactInfo.cs
│   ├── Program.cs                  # Application startup
│   ├── appsettings.json
│   └── PortfolioBackend.csproj
│
├── PortfolioFrontend/              # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/         # Angular Components
│   │   │   │   ├── header.component.ts
│   │   │   │   ├── home.component.ts
│   │   │   │   ├── resume.component.ts
│   │   │   │   ├── blog.component.ts
│   │   │   │   └── contact.component.ts
│   │   │   ├── services/           # API Services
│   │   │   │   ├── blog.service.ts
│   │   │   │   ├── resume.service.ts
│   │   │   │   └── contact.service.ts
│   │   │   ├── models/             # TypeScript Interfaces
│   │   │   │   ├── blog-post.model.ts
│   │   │   │   ├── resume.model.ts
│   │   │   │   └── contact.model.ts
│   │   │   └── app.component.ts    # Root Component
│   │   ├── main.ts                 # Entry point
│   │   └── index.html
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
└── PortfolioSolution.sln           # Visual Studio Solution
```

## Setup Instructions

### Prerequisites
- .NET 8.0 SDK
- Node.js (v18 or higher)
- Angular CLI

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd PortfolioBackend
   ```

2. Restore NuGet packages:
   ```bash
   dotnet restore
   ```

3. Run the backend:
   ```bash
   dotnet run
   ```
   The API will be available at `http://localhost:5091`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd PortfolioFrontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   ng serve
   ```
   The application will be available at `http://localhost:4200`

### Running in Visual Studio

1. Open `PortfolioSolution.sln` in Visual Studio 2022
2. Right-click on the solution and select "Build Solution"
3. Set `PortfolioBackend` as the startup project
4. Press F5 to run

## API Endpoints

### Blog Endpoints
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/{slug}` - Get a specific blog post

### Resume Endpoints
- `GET /api/resume` - Get resume data

### Contact Endpoints
- `GET /api/contact` - Get contact information

## Material Design Components Used

- MatToolbar - Header navigation
- MatCard - Content cards
- MatButton - Interactive buttons
- MatIcon - Icon library
- MatTabs - Resume sections
- MatList - List displays
- MatTab - Tabbed content

## Customization

### Adding New Blog Posts
Edit the `BlogController.cs` in the backend to add new blog posts to the static list.

### Updating Resume Content
Modify the `ResumeController.cs` to update your resume data (skills, experience, education).

### Changing Contact Information
Update the `ContactController.cs` with your actual contact details and social media links.

## Building for Production

### Backend
```bash
cd PortfolioBackend
dotnet publish -c Release
```

### Frontend
```bash
cd PortfolioFrontend
ng build --configuration production
```

## License

This project is open source and available under the MIT License.

## Author

Your Name - Full Stack Developer

---

Feel free to customize this portfolio to match your personal brand and information!
