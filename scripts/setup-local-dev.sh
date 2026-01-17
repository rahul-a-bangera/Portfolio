#!/bin/bash

# Local Development Setup Script
# Copies template files to local data directory

echo ""
echo "==========================================================="
echo "   Portfolio - Local Development Setup"
echo "==========================================================="

TEMPLATE_DIR="PortfolioFrontend/src/assets/data/local/templates"
LOCAL_DIR="PortfolioFrontend/src/assets/data/local"

echo ""
echo "[INFO] Setting up local development data..."

# Check if template directory exists
if [ ! -d "$TEMPLATE_DIR" ]; then
    echo "[ERROR] Template directory not found: $TEMPLATE_DIR"
    exit 1
fi

# Create local directory if it doesn't exist
if [ ! -d "$LOCAL_DIR" ]; then
    echo "[INFO] Creating local data directory..."
    mkdir -p "$LOCAL_DIR"
fi

# Copy template files
templates=("profile-template.json" "contact-template.json" "resume-template.json")
copied=0
skipped=0

for template in "${templates[@]}"; do
    source_path="$TEMPLATE_DIR/$template"
    target_name="${template//-template/}"
    target_path="$LOCAL_DIR/$target_name"
    
    if [ -f "$target_path" ]; then
        echo "[SKIP] File already exists: $target_name"
        ((skipped++))
    else
        cp "$source_path" "$target_path"
        echo "[SUCCESS] Created: $target_name"
        ((copied++))
    fi
done

echo ""
echo "==========================================================="
echo "   Setup Complete!"
echo "==========================================================="

echo ""
echo "[INFO] Summary:"
echo "  Files created: $copied"
echo "  Files skipped: $skipped"

echo ""
echo "[ACTION] Next Steps:"
echo "  1. Edit files in: $LOCAL_DIR"
echo "     - profile.json (name and specialist content)"
echo "     - contact.json (email, phone, links)"
echo "     - resume.json (complete resume data)"
echo ""
echo "  2. Run the app:"
echo "     cd PortfolioFrontend"
echo "     npm start"
echo ""
echo "  3. Open browser:"
echo "     http://localhost:4200"

echo ""
echo "[INFO] Your data is NOT tracked in Git (privacy protected!)"
echo "==========================================================="
echo ""
