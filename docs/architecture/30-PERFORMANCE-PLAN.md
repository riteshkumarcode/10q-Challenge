# 30 - Performance Optimization & Core Web Vitals Plan

## 1. Performance Target Metrics (Core Web Vitals)
- **Largest Contentful Paint (LCP)**: `< 1.8 seconds` on 4G / Desktop.
- **First Input Delay (FID) / Interaction to Next Paint (INP)**: `< 100 milliseconds`.
- **Cumulative Layout Shift (CLS)**: `< 0.05`.
- **Lighthouse Performance Score**: `90+` across Mobile and Desktop.

---

## 2. Frontend Optimization Strategies (Next.js)
1. **Server-Side Rendering (SSR) & Incremental Static Regeneration (ISR)**: Pre-render marketing, exam, course, and blog pages on the server to deliver instant HTML to clients and search crawlers.
2. **Next.js Image Optimization (`next/image`)**:
   - Automatic conversion to WebP and AVIF.
   - Dynamic responsive image resizing with `srcset`.
   - Priority loading (`priority`) for Above-the-Fold hero images.
   - Explicit `width` and `height` dimensions to prevent Cumulative Layout Shift (CLS).
3. **Lazy Loading of Heavy Third-Party Assets**:
   - Vimeo iframe player loaded on-demand via dynamic `next/dynamic` component import when student opens a video lesson.
   - KaTeX math renderer loaded only on question and test pages.
4. **Code Splitting & Bundle Minimization**:
   - Modular CSS using Tailwind CSS with automatic purge of unused utility classes.
   - Route-based chunk splitting minimizing initial JavaScript execution payload.

---

## 3. Backend & Database Optimization Strategies (ASP.NET Core & SQL Server)
1. **EF Core AsNoTracking**: Read-only queries executed with `.AsNoTracking()` to reduce memory allocation.
2. **Database Indexes**: Composite non-clustered indexes on all foreign keys (`CourseId`, `SubjectId`, `LessonId`, `UserId`) and search slugs (`Slug`, `ExamSlug`).
3. **Response Caching & In-Memory Cache**:
   - `IMemoryCache` for static lookup entities (Exams list, active categories, site settings) with 1-hour expiration.
   - Automatic cache invalidation upon admin modification.
