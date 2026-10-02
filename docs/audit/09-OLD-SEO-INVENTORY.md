# 09 - Old SEO Inventory & Technical Evaluation

## 1. Legacy SEO Architecture
The legacy application utilized a hybrid metadata injection approach:
1. **`tblEL_SEOPage` Table**: Stored metadata for static pages (`PageName`, `PageMetaTag`, `PageMetaDescription`).
2. **`MetaService.cs`**: Query service fetching metadata from `tblEL_SEOPage` and passing it to Razor layouts via `BaseViewModel`.
3. **`_SiteLayout.cshtml`**: Razor layout rendering basic tags:
   - `<title>@(string.IsNullOrWhiteSpace(Model?.metatag) ? "10Q Challenge" : Model.metatag)</title>`
   - `<meta name="description" content="@Model?.metadescription">`
   - `<link rel="canonical" href="@($"{Context.Request.Scheme}://{Context.Request.Host}{Context.Request.Path}")" />`
   - `<meta name="robots" content="index, follow">`
4. **Entity-Specific SEO Columns**:
   - `tblEL_MasterExam`: `ExamMetaTag`, `ExamMetaDescription`
   - `tblEL_MasterCourse`: `CourseMetaTag`, `CourseMetaDescription`, `AltTagCourseImage`, `AltTagBannerImage`
   - `tblEL_MasterBlog`: `BlogMetaTag`, `BlogMetaDescription`, `AltTag_Description_Small`, `AltTag_Description_Large`

---

## 2. Weaknesses in Legacy SEO Implementation
1. **No Open Graph / Twitter Card Tags**: Absence of `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card` prevented rich sharing on WhatsApp, Telegram, LinkedIn, and Twitter/X.
2. **Lack of Structured Data (JSON-LD)**: No schema markup was implemented for `Course`, `Article`, `Organization`, `BreadcrumbList`, or `FAQPage`.
3. **Client-Side Rendering Dependency**: Because course syllabus, FAQ lists, and blog details were loaded via client-side AJAX (`fetch()`) in `DOMContentLoaded`, Googlebot often indexed sparse initial HTML rather than the rich content.
4. **No Dynamic XML Sitemap Engine**: The system had no dynamic `sitemap.xml` endpoint to notify search engines of newly published courses or blogs.
5. **No Robots.txt Management**: No configurable `robots.txt` existed to prevent indexing of `/student/*`, `/admin/*`, or payment callback pages.

---

## 3. SEO Upgrade Strategy for Redevelopment
In the new Next.js App Router + ASP.NET Core API architecture:
- **Server-Side Rendering (SSR) & Static Site Generation (SSG)**: All public pages (Homepage, Exams, Courses, Blogs) will be rendered server-side with full HTML content on initial request.
- **Next.js Metadata API**: Implement dynamic `generateMetadata()` for all dynamic routes (`/course-detail/[slug]`, `/blog-detail/[slug]`, `/exam/[slug]`).
- **Comprehensive JSON-LD Schemas**:
  - `Organization` & `WebSite` on Homepage.
  - `Course` schema with provider and syllabus data on Course Detail.
  - `Article` schema with publisher, author, datePublished, and dateModified on Blog Detail.
  - `BreadcrumbList` on all nested hierarchy pages.
  - `FAQPage` schema on courses containing verified FAQs.
- **Dynamic Sitemap & Robots Engine**: Next.js native `app/sitemap.ts` and `app/robots.ts` generating real-time XML sitemaps from backend APIs.
