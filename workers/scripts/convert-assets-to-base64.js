#!/usr/bin/env node

/**
 * Convert Assets to Base64 for KV Storage
 * 
 * Converts PDF resume and profile picture to base64 strings
 * for storage in Cloudflare KV.
 * 
 * Usage: node convert-assets-to-base64.js
 */

const fs = require('fs');
const path = require('path');

console.log('[INFO] Converting assets to base64...\n');

// Paths to assets
const RESUME_PDF_PATH = path.join(__dirname, '../../PortfolioFrontend/src/assets/resume.pdf');
const PROFILE_IMAGE_PATH = path.join(__dirname, '../../PortfolioFrontend/src/assets/profile.jpg');
const OUTPUT_DIR = path.join(__dirname, '../data');

// Function to convert file to base64
function fileToBase64(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`[WARNING] File not found: ${filePath}`);
      return null;
    }
    
    const fileBuffer = fs.readFileSync(filePath);
    const base64String = fileBuffer.toString('base64');
    const fileSize = fileBuffer.length;
    const base64Size = base64String.length;
    
    console.log(`[SUCCESS] Converted: ${path.basename(filePath)}`);
    console.log(`  - Original size: ${(fileSize / 1024).toFixed(2)} KB`);
    console.log(`  - Base64 size: ${(base64Size / 1024).toFixed(2)} KB`);
    
    return base64String;
  } catch (error) {
    console.error(`[ERROR] Failed to convert ${filePath}:`, error.message);
    return null;
  }
}

// Function to detect MIME type
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.pdf': 'application/pdf',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp'
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

async function main() {
  const assets = {};

  // Convert resume PDF
  console.log('[INFO] Converting resume PDF...');
  const resumeBase64 = fileToBase64(RESUME_PDF_PATH);
  if (resumeBase64) {
    assets.resume = {
      filename: 'resume.pdf',
      mimeType: getMimeType(RESUME_PDF_PATH),
      data: resumeBase64,
      size: resumeBase64.length
    };
  }

  // Convert profile picture
  console.log('\n[INFO] Converting profile picture...');
  const profileBase64 = fileToBase64(PROFILE_IMAGE_PATH);
  if (profileBase64) {
    assets.profile = {
      filename: path.basename(PROFILE_IMAGE_PATH),
      mimeType: getMimeType(PROFILE_IMAGE_PATH),
      data: profileBase64,
      size: profileBase64.length
    };
  }

  // Save to JSON file
  if (Object.keys(assets).length > 0) {
    const outputPath = path.join(OUTPUT_DIR, 'assets.json');
    fs.writeFileSync(outputPath, JSON.stringify(assets, null, 2));
    console.log('\n' + '='.repeat(50));
    console.log(`[SUCCESS] Assets saved to: ${outputPath}`);
    console.log('='.repeat(50) + '\n');
    
    console.log('[INFO] Assets ready for KV upload:');
    Object.keys(assets).forEach(key => {
      const asset = assets[key];
      console.log(`  - ${key}: ${asset.filename} (${(asset.size / 1024).toFixed(2)} KB, ${asset.mimeType})`);
    });
    
    console.log('\n[INFO] Next steps:');
    console.log('1. Run: node scripts/upload-to-kv.js');
    console.log('2. Assets will be uploaded to KV as:');
    console.log('   - assets:resume (resume PDF)');
    console.log('   - assets:profile (profile picture)');
  } else {
    console.error('\n[ERROR] No assets were converted successfully.');
    process.exit(1);
  }
}

main().catch(console.error);
