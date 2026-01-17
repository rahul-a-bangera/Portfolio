# Project Scripts

This folder contains utility scripts for development, testing, and deployment.

## Development Scripts

### `quick-start.bat` / `quick-start.ps1`
Quick start script to get the development environment running.
- **Platform**: Windows (PowerShell/Batch)
- **Usage**: `.\quick-start.bat` or `.\quick-start.ps1`

### `setup-local-dev.ps1` / `setup-local-dev.sh`
Sets up the local development environment.
- **Platform**: Cross-platform (PowerShell/Bash)
- **Usage**: 
  - Windows: `.\setup-local-dev.ps1`
  - Linux/Mac: `./setup-local-dev.sh`

### `start-dev.ps1`
Starts the full development environment (frontend + backend).
- **Platform**: Windows (PowerShell)
- **Usage**: `.\start-dev.ps1`

### `start-backend.ps1`
Starts only the backend API server.
- **Platform**: Windows (PowerShell)
- **Usage**: `.\start-backend.ps1`

## Testing Scripts

### `test-api.ps1`
Basic API endpoint testing script.
- **Platform**: Windows (PowerShell)
- **Usage**: `.\test-api.ps1`

### `test-profile-api.ps1`
Tests the `/profile` API endpoint specifically.
- **Platform**: Windows (PowerShell)
- **Usage**: `.\test-profile-api.ps1`

### `test-all-api-endpoints.ps1`
Comprehensive test for all API endpoints.
- **Platform**: Windows (PowerShell)
- **Usage**: `.\test-all-api-endpoints.ps1`
- **Tests**: `/profile`, `/contact`, `/resume`, `/blog`, `/assets`

---

**Note**: When running PowerShell scripts, you may need to set the execution policy:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
