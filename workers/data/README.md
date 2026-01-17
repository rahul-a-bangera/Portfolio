# Portfolio Data

This folder contains your personal portfolio data that will be stored in Cloudflare KV.

## Important: Privacy First!

**These data files should NOT be committed to Git!**

They are listed in `.gitignore` to prevent accidental commits of personal information.

---

## Required Files

Create these files from templates before deploying:

1. **`resume.json`** - Your complete resume/CV data
2. **`blog-posts.json`** - Your blog posts
3. **`contact.json`** - Your contact information

---

## Quick Setup

### Step 1: Copy Templates

```bash
cp templates/resume-template.json resume.json
cp templates/blog-template.json blog-posts.json
cp templates/contact-template.json contact.json
```

### Step 2: Edit Files

Edit each file with your personal information:
- Replace "Your Name" with your actual name
- Update email, phone, links
- Add your experience, education, projects
- Write your blog posts

### Step 3: Upload to Cloudflare KV

```bash
cd ../
node scripts/upload-to-kv.js
```

---

## Template Files

All template files are in the `templates/` folder:
- `profile-template.json` - Profile data (name and specialist content)
- `resume-template.json` - Resume data structure
- `blog-template.json` - Blog posts structure
- `contact-template.json` - Contact info structure

---

## Verification

After creating your files, verify they exist:

```bash
ls -la
# Should show:
# resume.json
# blog-posts.json  
# contact.json
```

---

## Security Notes

? **DO:**
- Keep these files in `.gitignore`
- Upload data to Cloudflare KV
- Use template files as reference
- Store backups securely offline

? **DON'T:**
- Commit personal data to Git
- Share these files publicly
- Include sensitive information
- Push to public repositories

---

## Need Help?

See: `../misc/11-KV-MIGRATION-GUIDE.md` for complete setup instructions.
