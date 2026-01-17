@echo off
REM Portfolio Website Quick Start Script

echo.
echo ========================================
echo Portfolio Website - Quick Start
echo ========================================
echo.

echo Step 1: Installing Frontend Dependencies...
cd /d "c:\Users\rahul\VS CODE\Portfolio\PortfolioFrontend"
if not exist "node_modules" (
    echo Installing npm packages...
    call npm install
) else (
    echo npm packages already installed
)

cd /d "c:\Users\rahul\VS CODE\Portfolio"
echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next Steps:
echo.
echo 1. Start Backend (.NET):
echo    cd PortfolioBackend
echo    dotnet run
echo.
echo 2. In a NEW PowerShell window, start Frontend (Angular):
echo    cd PortfolioFrontend
echo    ng serve
echo.
echo 3. Open your browser:
echo    http://localhost:4200
echo.
echo For more details, see SETUP.md
echo.
pause
