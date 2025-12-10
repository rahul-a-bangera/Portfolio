# Portfolio Project Files and Structure

## Backend (.NET C# Project)

### Controllers
- **BlogController.cs** - Manages blog post endpoints
- **ResumeController.cs** - Manages resume data endpoint
- **ContactController.cs** - Manages contact information endpoint

### Models
- **BlogPost.cs** - Blog post data model
- **ResumeData.cs** - Resume and experience data model
- **ContactInfo.cs** - Contact information model

### Configuration Files
- **Program.cs** - Application startup and middleware configuration
- **appsettings.json** - Application settings
- **appsettings.Development.json** - Development-specific settings
- **PortfolioBackend.csproj** - Project file with NuGet dependencies
- **.gitignore** - Git ignore rules for backend

## Frontend (Angular Project)

### Components
- **header.component.ts** - Navigation header with smooth scroll
- **home.component.ts** - Home section with introduction and profile card
- **resume.component.ts** - Resume with Material tabs
- **blog.component.ts** - Blog section with post cards
- **contact.component.ts** - Contact section with social links
- **app.component.ts** - Root component

### Services
- **blog.service.ts** - Blog API service
- **resume.service.ts** - Resume API service
- **contact.service.ts** - Contact API service

### Models (TypeScript Interfaces)
- **blog-post.model.ts** - Blog post interface
- **resume.model.ts** - Resume data interface
- **contact.model.ts** - Contact info interface

### Configuration Files
- **angular.json** - Angular CLI configuration
- **tsconfig.json** - TypeScript configuration
- **tsconfig.app.json** - Application-specific TypeScript config
- **package.json** - NPM dependencies
- **index.html** - HTML entry point
- **main.ts** - Angular bootstrap file
- **styles.css** - Global styles
- **.gitignore** - Git ignore rules for frontend

## Root Files
- **PortfolioSolution.sln** - Visual Studio solution file
- **README.md** - Comprehensive project documentation
- **SETUP.md** - Quick start guide
- **.gitignore** - Root-level git ignore file
- **STRUCTURE.md** - This file

## How to Use

1. **Development**: Follow SETUP.md instructions to run locally
2. **Customization**: Edit content in Backend controllers
3. **Deployment**: Run `dotnet publish` and `ng build` commands
4. **Source Control**: All .gitignore files properly configured

## Key Features Implemented

✅ Single Page Application (SPA)
✅ Sticky Navigation Header
✅ Smooth Scrolling Between Sections
✅ Material Design UI Components
✅ Responsive Layout
✅ TypeScript for type safety
✅ C# Backend API
✅ CORS Enabled for Cross-Origin Requests
✅ Standalone Angular Components (Angular 17 style)
✅ Service-based API calls with RxJS Observables
