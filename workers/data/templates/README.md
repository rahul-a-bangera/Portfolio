# Portfolio Data Templates

These template files help you structure your personal data for the portfolio.

## How to Use

1. **Copy template to parent directory:**
   ```bash
   cp resume-template.json ../resume.json
   cp blog-template.json ../blog-posts.json
   cp contact-template.json ../contact.json
   ```

2. **Edit with your information:**
   - Replace all placeholder text
   - Update URLs, emails, phone numbers
   - Add your experience, projects, blog posts

3. **Upload to Cloudflare KV:**
   ```bash
   cd ../../
   node scripts/upload-to-kv.js
   ```

---

## Template Files

### `resume-template.json`
Complete resume structure including:
- Personal information
- Professional summary
- Skills (frontend, backend, cloud, database, tools)
- Work experience
- Education
- Certifications
- Projects

### `blog-template.json`
Blog post structure including:
- Post metadata (id, slug, title)
- Description and content
- Author and publish date
- Tags and categories
- Featured image and read time

### `contact-template.json`
Contact information including:
- Email address
- Phone number
- Social media links (LinkedIn, GitHub, Twitter)

---

## Tips

**For Resume:**
- Be specific about achievements
- Quantify results when possible (e.g., "Reduced load time by 40%")
- Use action verbs
- Keep bullet points concise

**For Blog Posts:**
- Write engaging titles
- Use descriptive slugs (URL-friendly)
- Include relevant tags
- Add estimated read time
- Use markdown for formatting

**For Contact:**
- Use professional email
- Include country code for phone
- Keep social links updated
- Only include active profiles

---

## Validation

Before uploading, check:
- [ ] All JSON files are valid (no syntax errors)
- [ ] Email addresses are correct
- [ ] Phone numbers include country code
- [ ] URLs are complete and working
- [ ] No placeholder text remains
- [ ] All dates are in YYYY-MM format

---

## Privacy Note

? These template files are safe to commit to Git  
? Your actual data files should be in `.gitignore`

Always keep personal data out of version control!
