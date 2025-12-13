# Blog System - Markdown-Based

## Overview

The blog system reads markdown files from `src/assets/blog/` directory. Each blog post is a separate `.md` file with frontmatter metadata.

## Adding a New Blog Post

### Step 1: Create Markdown File

Create a new `.md` file in `PortfolioFrontend/src/assets/blog/` with the following structure:

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

Your blog content goes here in markdown format.

## Section Heading

More content...

### Subsection

Even more content...

```code
// Code examples
```

- Bullet points
- More bullets

1. Numbered lists
2. More numbers
```

### Step 2: Update Service

Add your new file to the `blogFiles` array in `src/app/services/markdown-blog.service.ts`:

```typescript
private blogFiles = [
  'getting-started-angular-19.md',
  'building-restful-apis-dotnet-core.md',
  'css-grid-vs-flexbox.md',
  'web-performance-optimization.md',
  'microservices-azure-guide.md',
  'your-new-blog-post.md'  // Add here
];
```

### Step 3: Build and Deploy

```bash
npm run build
```

That's it! Your new blog post will automatically appear on the site.

## Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | The blog post title |
| `slug` | string | Yes | URL-friendly identifier |
| `summary` | string | Yes | Short description for card view |
| `author` | string | Yes | Author name |
| `date` | string | Yes | Publication date (YYYY-MM-DD) |
| `category` | string | No | Blog category (Angular, .NET, etc.) |
| `tags` | array | No | Array of tags for the post |
| `readTime` | number | No | Estimated read time in minutes |

## Categories

Categories are automatically extracted from blog posts and appear as filter chips. Current categories:
- Angular
- .NET
- Web Design
- Performance
- Azure

## Features

### ? Automatic Pagination
- Shows pagination only when there are more than 4 posts
- 4 posts per page
- Click page numbers to navigate

### ? Category Filtering
- Filter by category (Angular, .NET, etc.)
- "All" shows all posts
- Post count updates dynamically

### ? Sorting
- Posts automatically sorted by date (newest first)

### ? Read Time
- Displays estimated read time from frontmatter
- Defaults to 5 minutes if not specified

## Markdown Support

The system supports standard markdown:
- Headers (h1-h6)
- **Bold** and *italic* text
- `inline code`
- Code blocks with syntax highlighting
- Lists (ordered and unordered)
- Links
- Blockquotes
- And more!

## File Naming Convention

Use kebab-case for file names:
- `getting-started-angular-19.md` ?
- `Getting Started With Angular 19.md` ?

## Best Practices

1. **Keep summaries concise** - 1-2 sentences max
2. **Use descriptive slugs** - Match the file name
3. **Add relevant tags** - Helps with searchability
4. **Estimate read time** - Use ~200 words per minute
5. **Use proper markdown** - Headers, lists, code blocks
6. **Add code examples** - Makes technical posts clearer
7. **Proofread** - Check spelling and grammar

## Example Blog Post Structure

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

Hooks revolutionized React development...

## useState Hook

The useState hook allows you to...

```javascript
const [count, setCount] = useState(0);
```

## useEffect Hook

The useEffect hook handles side effects...

## Conclusion

Hooks make React development more intuitive...
```

## Troubleshooting

### Blog post not showing up?
1. Check file is in `src/assets/blog/`
2. Verify frontmatter format (use triple dashes ---)
3. Ensure file is added to `blogFiles` array
4. Rebuild the project

### Category not appearing?
- Make sure the `category` field is in frontmatter
- Category names are automatically uppercased

### Pagination not showing?
- Pagination only shows when you have more than 4 posts
- Check `postsPerPage` setting in blog.component.ts

## Future Enhancements

Potential improvements:
- [ ] Markdown rendering with syntax highlighting
- [ ] Blog post detail page
- [ ] Search functionality
- [ ] Related posts
- [ ] Social sharing buttons
- [ ] Comments system
- [ ] RSS feed

---

**Last Updated**: December 13, 2024
