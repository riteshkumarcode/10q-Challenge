# 08 - Old Blog Inventory & Content Audit

## 1. Blog Architecture in Legacy System
The legacy blog system is database-driven and stored in the table `tblEL_MasterBlog`.
In the codebase, blog assets and images are organized under `wwwroot/site/assets/img/blog/` (49 high-resolution images).

### 1.1 Blog Schema Attributes
| Legacy Field | Data Type | Purpose in New Next.js CMS |
|---|---|---|
| `MasterBlogID` | `INT (PK)` | Historical database identifier for migration mapping |
| `MasterExamID` | `INT (FK)` | Relational link to Exam Category (`tblEL_MasterExam`) |
| `BlogTitle` | `VARCHAR(100)` | Primary H1 Title / Article Heading |
| `BlogDescription` | `VARCHAR(MAX)` | Complete HTML article content (paragraphs, headings, links, embeds) |
| `BlogImagePath_Small` | `VARCHAR(50)` | Thumbnail / Card listing featured image |
| `BlogImagePath_Large` | `VARCHAR(50)` | Full-width Hero Header featured image |
| `AltTag_Description_Small`| `VARCHAR(50)` | Image `alt` text for thumbnail SEO |
| `AltTag_Description_Large`| `VARCHAR(50)` | Image `alt` text for hero banner SEO |
| `BlogSlug` | `VARCHAR(200)` | **Critical URL Identifier** (Maps to `/blog-detail/{blogslug}`) |
| `BlogMetaTag` | `VARCHAR(200)` | SEO Title tag & Meta Keywords |
| `BlogMetaDescription` | `VARCHAR(300)` | Search Engine Meta Description |
| `PublishedDate` | `DATETIME` | Article Original Publication Date |
| `PublishedBy` | `INT` | Author ID / Reference |
| `IsPublished` | `BIT` | Publication Status flag (1=Live, 0=Draft) |
| `EntryDate` | `DATETIME` | Audit timestamp |
| `UpdateDate` | `DATETIME` | Audit timestamp for updated schema |

---

## 2. Discovered Blog Media Assets in Workspace
The repository contains 49 image assets in `wwwroot/site/assets/img/blog/` associated with legacy articles, including:
- `blog-1.jpg` through `blog-42.jpg`
- `blog-04.jpg`, `blog-detail-image.jpg`
- `image-8.jpg`, `image-9.jpg`
- `recent-blog-1.jpg`, `recent-blog-2.jpg`, `recent-blog-3.jpg`

---

## 3. Migration Requirements for 100% Blog Fidelity
1. **Zero Content Loss**: Every single blog post existing in `tblEL_MasterBlog` MUST be extracted into the new Microsoft SQL Server / Entity Framework database.
2. **Slug Invariance**: Every `BlogSlug` must remain identical to guarantee zero 404 errors for indexed blog posts.
3. **Image Path Normalization**: Images stored under relative directory paths will be normalized and migrated to Next.js optimized public/CDN storage with WebP/AVIF formatting while retaining legacy file references.
4. **HTML Content Sanitization**: Sanitize rich text markup to remove deprecated CKEditor styling while preserving semantic elements (`<h2>`, `<h3>`, `<p>`, `<ul>`, `<ol>`, `<table>`, `<blockquote>`, `<a>`, `<img>`).
5. **Schema.org Structured Data**: Automatically generate `Article` or `BlogPosting` JSON-LD structured data for every migrated post.
