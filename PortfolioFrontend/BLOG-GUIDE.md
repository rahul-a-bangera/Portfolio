# Blog System - Markdown-Based

## Overview

The blog system reads markdown files from `src/assets/blog/` directory. Each blog post is a separate `.md` file with frontmatter metadata.

## Adding a New Blog Post

### ? Super Simple - Just 2 Steps!

#### **Step 1: Create Your Markdown File**

Create a new `.md` file in `PortfolioFrontend/src/assets/blog/` with this structure:

```markdown
---
title: "Your Blog Post Title"
slug: "your-blog-post-slug"
summary: "A brief summary of your blog post that appears in the card view."
author: "Your Name"
date: "2024-12-15"
category: "Angular"
tags: ["Angular", "TypeScript", "Web Development"]
readTime: 5
---

# Your Blog Post Title

Your blog content goes here in markdown format...

## Section Heading

More content...
```

**Important**: 
- The frontmatter MUST be between `---` markers
- Use the filename (without .md) as your slug for consistency
- Example: `my-awesome-post.md` ? slug: `"my-awesome-post"`

#### **Step 2: Register the Filename**

Add your filename (without `.md`) to the array in `src/app/services/markdown-blog.service.ts`:

```typescript
private blogFiles = [
  'getting-started-angular-19',
  'building-restful-apis-dotnet-core',
  'css-grid-vs-flexbox',
  'web-performance-optimization',
  'microservices-azure-guide',
  'your-new-post'  // ? Add your filename here (without .md)
];
```

#### **Step 3: Build and Deploy**

```bash
npm run build
```

That's it! Your new blog post will automatically appear! ?

---

## Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | The blog post title |
| `slug` | string | Yes | URL-friendly identifier (should match filename) |
| `summary` | string | Yes | Short description for card view |
| `author` | string | Yes | Author name |
| `date` | string | Yes | Publication date (YYYY-MM-DD) |
| `category` | string | No | Blog category (Angular, .NET, etc.) |
| `tags` | array | No | Array of tags for the post |
| `readTime` | number | No | Estimated read time in minutes |

## File Naming Convention

Use kebab-case for file names:
- ? `getting-started-angular-19.md`
- ? `my-awesome-post.md`
- ? `Getting Started With Angular 19.md`
- ? `My Awesome Post.md`

**Rule**: Filename (without .md) should match the `slug` in frontmatter

## Example Complete Blog Post

```markdown
---
title: "Understanding React Hooks"
slug: "understanding-react-hooks"
summary: "A comprehensive guide to React Hooks, including useState, useEffect, and custom hooks."
author: "Rahul A"
date: "2024-12-15"
category: "React"
tags: ["React", "JavaScript", "Hooks", "Frontend"]
readTime: 8
---

# Understanding React Hooks

Hooks revolutionized React development by allowing functional components to use state and lifecycle features.

## useState Hook

The `useState` hook allows you to add state to functional components:

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

## useEffect Hook

The `useEffect` hook handles side effects in your components:

\`\`\`javascript
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
\`\`\`

## Custom Hooks

You can create your own hooks to reuse stateful logic:

\`\`\`javascript
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return width;
}
\`\`\`

## Conclusion

Hooks make React development more intuitive and help you write cleaner, more reusable code.
```

## Categories

Categories are automatically extracted from blog posts and appear as filter chips. Current categories:
- Angular
- .NET
- Web Design
- Performance
- Azure

## Features

### ? Automatic Pagination
- Shows pagination only when there are more than the page limit
- 6 posts per page (desktop), 2 posts per page (mobile)
- Click page numbers to navigate

### ? Category Filtering
- Filter by category (Angular, .NET, etc.)
- Click category again to deselect and show all posts
- Post count updates dynamically

### ? Sorting
- Posts automatically sorted by date (newest first)

### ? Full Markdown Support
- Headers (h1-h6)
- **Bold** and *italic* text
- `inline code`
- Code blocks with language highlighting
- Lists (ordered and unordered)
- Links
- Blockquotes
- Tables
- Images
- Horizontal rules

### ? Blog Detail Page
- Opens in new tab when clicking "Read More"
- Beautiful terminal green themed layout
- Proper markdown rendering
- Back button to close tab

## Markdown Styling

The rendered blog posts include custom styling:
- Terminal green theme
- Syntax highlighted code blocks
- Styled tables and blockquotes
- Responsive images
- Clean typography

## Troubleshooting

### Blog post not showing up?
1. ? Check file is in `src/assets/blog/`
2. ? Verify frontmatter format (between `---` markers)
3. ? Ensure filename is added to `blogFiles` array in `markdown-blog.service.ts`
4. ? Check slug matches filename
5. ? Rebuild the project: `npm run build`

### Frontmatter showing in content?
- Make sure frontmatter is properly enclosed in `---` markers
- There should be a blank line after the closing `---`
- The parser extracts everything between the first two `---` as metadata

### Category not appearing?
- Make sure the `category` field is in frontmatter
- Category names are automatically uppercased in filters

### Pagination not showing?
- Pagination only shows when you have more posts than `postsPerPage`
- Desktop: 6 posts per page
- Mobile: 2 posts per page

## Quick Reference

### Add a New Post (2 Steps):

1. **Create**: `src/assets/blog/my-new-post.md`
2. **Register**: Add `'my-new-post'` to `blogFiles` array

### Blog Post Template:

```markdown
---
title: "Post Title"
slug: "post-slug"
summary: "Brief description"
author: "Author Name"
date: "YYYY-MM-DD"
category: "Category"
tags: ["tag1", "tag2"]
readTime: 5
---

# Content starts here
```

---

**Last Updated**: December 13, 2024  
**Version**: 2.0 (Simplified frontmatter parsing)
