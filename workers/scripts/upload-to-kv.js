#!/usr/bin/env node

/**
 * Upload Portfolio Data to Cloudflare KV
 * 
 * This script uploads all portfolio data (resume, blog posts, contact info) to Cloudflare KV.
 * Run this script to populate your KV namespace with real data.
 * 
 * Usage: node upload-to-kv.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('[INFO] Starting KV upload process...\n');

// Read data files
const resumeData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/resume.json'), 'utf8'));
const blogPosts = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/blog-posts.json'), 'utf8'));
const contactInfo = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/contact.json'), 'utf8'));

const NAMESPACE = 'PORTFOLIO_DATA';

/**
 * Upload a key-value pair to KV
 */
function uploadToKV(key, value) {
  try {
    const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
    
    // Write to temporary file
    const tempFile = path.join(__dirname, `temp-${key.replace(/[:/]/g, '-')}.json`);
    fs.writeFileSync(tempFile, jsonValue);
    
    // Upload using wrangler
    const command = `npx wrangler kv:key put --binding=${NAMESPACE} "${key}" --path="${tempFile}" --preview false`;
    execSync(command, { stdio: 'inherit' });
    
    // Clean up temp file
    fs.unlinkSync(tempFile);
    
    console.log(`[SUCCESS] Uploaded: ${key}`);
    return true;
  } catch (error) {
    console.error(`[ERROR] Failed to upload ${key}:`, error.message);
    return false;
  }
}

async function main() {
  let successCount = 0;
  let failCount = 0;

  console.log('[INFO] Uploading resume data in separate sections...');
  
  // Upload personal info + short summary (for home page)
  const resumePersonal = {
    personalInfo: resumeData.personalInfo,
    shortSummary: resumeData.shortSummary
  };
  if (uploadToKV('resume:personal', resumePersonal)) {
    successCount++;
  } else {
    failCount++;
  }

  // Upload full summary (for resume page - Summary tab)
  if (uploadToKV('resume:summary', { summary: resumeData.summary })) {
    successCount++;
  } else {
    failCount++;
  }

  // Upload skills (for resume page - Skills tab)
  if (uploadToKV('resume:skills', { skills: resumeData.skills })) {
    successCount++;
  } else {
    failCount++;
  }

  // Upload tools (for resume page - Tools tab)
  if (uploadToKV('resume:tools', { tools: resumeData.tools })) {
    successCount++;
  } else {
    failCount++;
  }

  // Upload experience (for resume page - Experience tab)
  if (uploadToKV('resume:experience', { experience: resumeData.experience })) {
    successCount++;
  } else {
    failCount++;
  }

  // Upload education (for resume page - Education tab)
  if (uploadToKV('resume:education', { education: resumeData.education })) {
    successCount++;
  } else {
    failCount++;
  }

  // Also upload complete resume data for backward compatibility
  if (uploadToKV('resume:data', resumeData)) {
    successCount++;
  } else {
    failCount++;
  }

  console.log('\n[INFO] Uploading contact info...');
  if (uploadToKV('contact:info', contactInfo)) {
    successCount++;
  } else {
    failCount++;
  }

  console.log('\n[INFO] Uploading blog posts...');
  
  // Upload individual blog posts
  for (const post of blogPosts) {
    if (uploadToKV(`blog:${post.slug}`, post)) {
      successCount++;
    } else {
      failCount++;
    }
  }

  // Upload all blog posts list
  if (uploadToKV('blog:all', blogPosts)) {
    successCount++;
  } else {
    failCount++;
  }

  console.log('\n' + '='.repeat(50));
  console.log(`[INFO] Upload complete!`);
  console.log(`[SUCCESS] Uploaded: ${successCount} items`);
  if (failCount > 0) {
    console.log(`[ERROR] Failed: ${failCount} items`);
  }
  console.log('='.repeat(50) + '\n');

  console.log('[INFO] Resume sections uploaded:');
  console.log('  - resume:personal (for home page)');
  console.log('  - resume:summary (Summary tab)');
  console.log('  - resume:skills (Skills tab)');
  console.log('  - resume:tools (Tools tab)');
  console.log('  - resume:experience (Experience tab)');
  console.log('  - resume:education (Education tab)');
  console.log('  - resume:data (complete data - backward compatibility)');
  console.log('\n[INFO] Next steps:');
  console.log('1. Verify uploads in Cloudflare Dashboard');
  console.log('2. Deploy workers: npm run deploy');
  console.log('3. Test API endpoints');
}

main().catch(console.error);
