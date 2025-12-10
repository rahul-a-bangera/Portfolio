# Portfolio Website - Quick Start Guide

## Project Overview
This is a modern portfolio website with:
- **Angular 17** frontend with TypeScript and Material Design
- **.NET 8.0** backend with C# Web API
- Single-page application with smooth scroll navigation
- Responsive design with beautiful Material UI components

## Folder Structure
```
Portfolio/
├── PortfolioBackend/         → .NET Core Web API
├── PortfolioFrontend/        → Angular Application
├── PortfolioSolution.sln     → Visual Studio Solution File
├── README.md                 → Detailed documentation
└── SETUP.md                  → This file
```

## Prerequisites
- **.NET 8.0 SDK** (Download: https://dotnet.microsoft.com/download)
- **Node.js v18+** (Download: https://nodejs.org)
- **Angular CLI** (Install after Node.js)
- **Visual Studio 2022** (Optional, but recommended)

## Step 1: Install Angular CLI (First Time Only)
Open PowerShell and run:
```powershell
npm install -g @angular/cli
```

## Step 2: Running the Backend (.NET)

### Option A: Using Command Line
```powershell
cd c:\Users\rahul\VS CODE\Portfolio\PortfolioBackend
dotnet restore
dotnet run
```
✅ Backend will run at: http://localhost:5091

### Option B: Using Visual Studio
1. Open `PortfolioSolution.sln` in Visual Studio 2022
2. Right-click on solution → Select "Build Solution"
3. Right-click on `PortfolioBackend` → Select "Set as Startup Project"
4. Press **F5** to run

## Step 3: Running the Frontend (Angular)

Open a **NEW PowerShell** window and run:
```powershell
cd c:\Users\rahul\VS CODE\Portfolio\PortfolioFrontend
npm install
ng serve
```
✅ Frontend will run at: http://localhost:4200

## Step 4: Access the Application
Open your browser and go to:
```
http://localhost:4200
```

## Website Features

### 🏠 Home Section
- Welcome message with introduction
- Profile card with name and role
- Beautiful gradient background

### 📄 Resume Section
- **Summary Tab**: Professional summary and download resume button
- **Skills Tab**: List of technical skills with icons
- **Tools Tab**: Development tools and technologies
- **Experience Tab**: Work history with company details
- **Education Tab**: Educational background

### 📝 Blog Section
- Blog post cards with titles and summaries
- Publication dates and author information
- "Read More" buttons to view full posts

### 📧 Contact Section
- Email address with quick link
- Phone number with tel link
- Social media links (LinkedIn, GitHub, Twitter)
- Professional gradient background

### 🎯 Navigation
- Sticky header with navigation links
- Smooth scroll to each section
- Responsive design for all screen sizes

## API Endpoints

### Backend runs on: http://localhost:5091

#### Blog Posts
- **GET** `/api/blog` → Fetch all blog posts
- **GET** `/api/blog/{slug}` → Fetch specific blog post

#### Resume
- **GET** `/api/resume` → Fetch resume data

#### Contact
- **GET** `/api/contact` → Fetch contact information

## Customizing Content

### 1. Update Resume Data
File: `PortfolioBackend/Controllers/ResumeController.cs`

```csharp
// Add your skills
Skills = new List<string>
{
    "Your Skill Here",
    "Another Skill"
}
```

### 2. Update Blog Posts
File: `PortfolioBackend/Controllers/BlogController.cs`

Add new blog posts to the `blogs` list with title, content, etc.

### 3. Update Contact Info
File: `PortfolioBackend/Controllers/ContactController.cs`

```csharp
Email = "your.email@example.com",
Phone = "+1 (555) 123-4567",
SocialLinks = new Dictionary<string, string>
{
    { "LinkedIn", "https://your-profile" },
    { "GitHub", "https://github.com/yourprofile" }
}
```

## Troubleshooting

### Backend fails to start?
```powershell
# Clear and restore
cd PortfolioBackend
dotnet clean
dotnet restore
dotnet run
```

### Frontend npm errors?
```powershell
cd PortfolioFrontend
rm -r node_modules
npm cache clean --force
npm install
ng serve
```

### Port already in use?
```powershell
# Change frontend port
ng serve --port 4300

# Change backend port in appsettings.json
# Update frontend apiUrl from 5091 to new port
```

## Deployment

### Build for Production

Backend:
```powershell
cd PortfolioBackend
dotnet publish -c Release
```

Frontend:
```powershell
cd PortfolioFrontend
ng build --configuration production
```

Output:
- Backend: `PortfolioBackend/bin/Release/net8.0/publish`
- Frontend: `PortfolioFrontend/dist/portfolio-frontend`

## Key Technologies

| Technology | Purpose | Version |
|-----------|---------|---------|
| Angular | Frontend Framework | 17.0.0 |
| TypeScript | Programming Language | 5.2.0 |
| Angular Material | UI Components | 17.0.0 |
| .NET | Backend Framework | 8.0 |
| C# | Backend Language | Latest |
| ASP.NET Core | Web Framework | 8.0 |
| RxJS | Reactive Programming | 7.8.0 |

## Material Design Components Used

- ✅ MatToolbar - Navigation header
- ✅ MatCard - Content containers
- ✅ MatButton - Action buttons
- ✅ MatIcon - Material icons
- ✅ MatTabs - Tabbed content
- ✅ MatList - List displays

## Next Steps

1. ✅ Customize content in controllers
2. ✅ Add your own blog posts
3. ✅ Update contact information
4. ✅ Customize colors in component styles
5. ✅ Deploy to your hosting provider

## Need Help?

- Angular Docs: https://angular.io/docs
- .NET Docs: https://docs.microsoft.com/dotnet
- Material Design: https://material.angular.io

---

**Ready to go?** Start with Step 1 above!
