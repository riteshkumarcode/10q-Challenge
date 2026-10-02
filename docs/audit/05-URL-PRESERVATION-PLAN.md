# 05 - URL Preservation & Redirect Strategy

## 1. Core Principles for Migration
1. **Preserve Exact Canonical URLs**: All indexed public URLs (Homepage, Exam Landings, Course Catalog, Course Details, Blogs, and Blog Details) MUST be preserved byte-for-byte in the new Next.js App Router structure.
2. **Eliminate Duplicate Aliases**: Legacy routes with multiple endpoints pointing to identical views (such as `/login` vs `/sign-in` or `/register` vs `/sign-up`) will standardize on the primary SEO-recognized URL with permanent `301 Moved Permanently` redirects for aliases.
3. **No Redirect Chains**: Any redirected URL must resolve in exactly 1 hop (`HTTP 301` -> Final 200 OK target).
4. **Preserve Query Parameters & Hash Anchors**: Any incoming query parameters or UTM tracking parameters must be passed through cleanly during redirection.

---

## 2. URL Preservation Matrix

| Old Legacy URL | Proposed New URL | Status Code | Redirect Type | Justification / Notes |
|---|---|---|---|---|
| `/` | `/` | `200 OK` | Native App Router | Homepage canonical target |
| `/about` | `/about` | `200 OK` | Native App Router | Main About page |
| `/contact` | `/contact` | `200 OK` | Native App Router | Main Contact page |
| `/blog` | `/blog` | `200 OK` | Native App Router | Blog listing hub |
| `/blog-detail/:slug` | `/blog-detail/:slug` | `200 OK` | Dynamic Route | **Critical SEO preservation**: All existing indexed blog URLs remain unchanged |
| `/exam/:slug` | `/exam/:slug` | `200 OK` | Dynamic Route | Exam landing pages (e.g. `/exam/bitsat`, `/exam/jee`) |
| `/testseries/:slug` | `/testseries/:slug` | `200 OK` | Dynamic Route | Test series category pages |
| `/mentorship/:slug` | `/mentorship/:slug` | `200 OK` | Dynamic Route | Mentorship category pages |
| `/course-all` | `/course-all` | `200 OK` | Native App Router | Complete course directory |
| `/course-detail/:slug`| `/course-detail/:slug`| `200 OK` | Dynamic Route | **Critical conversion target**: Existing course landing pages |
| `/cart` | `/cart` | `200 OK` | Client Route | Shopping cart |
| `/checkout` | `/checkout` | `200 OK` | Client Route | Secure checkout |
| `/login` | `/login` | `200 OK` | Client Route | Primary authentication gateway |
| `/sign-in` | `/login` | `301 Moved Permanently` | Server-Side 301 | Legacy alias cleanup |
| `/login/sign-in` | `/login` | `301 Moved Permanently` | Server-Side 301 | Legacy duplicate path cleanup |
| `/register` | `/register` | `200 OK` | Client Route | Primary registration gateway |
| `/sign-up` | `/register` | `301 Moved Permanently` | Server-Side 301 | Legacy alias cleanup |
| `/forget-password` | `/forget-password` | `200 OK` | Client Route | Password reset |
| `/verifymail/:code` | `/verifymail/:code` | `200 OK` | Dynamic Route | Email verification link handler |
| `/payment-success` | `/payment-success` | `200 OK` | App Route | PayU return landing page |
| `/payment-failure` | `/payment-failure` | `200 OK` | App Route | PayU failure landing page |

---

## 3. Student & Admin Route Standardization

To provide a modern, organized SaaS architecture while preserving functionality:
- **Student Portal Routes**:
  - Legacy `/student-index` -> Modern `/student/dashboard` (with 301 from `/student-index`)
  - Legacy `/student-course-list` -> `/student/courses` (with 301 from `/student-course-list`)
  - Legacy `/course-data/:id` -> `/student/courses/:id`
  - Legacy `/course-recorded-session/:id` -> `/student/courses/:id/recorded`
  - Legacy `/course-live-session/:id` -> `/student/courses/:id/live`
  - Legacy `/course-study-material/:id` -> `/student/courses/:id/materials`
  - Legacy `/test-series-list/:id` -> `/student/courses/:id/tests`
  - Legacy `/student-test/:paperId` -> `/student/test/:paperId`
  - Legacy `/student-doubt` -> `/student/doubts`
  - Legacy `/invoice-list` -> `/student/invoices`
- **Admin Portal Routes**:
  - Grouped under clean `/admin/*` subpaths (e.g. `/admin/courses`, `/admin/exams`, `/admin/blogs`, `/admin/doubts`, `/admin/orders`, `/admin/seo`).

---

## 4. Next.js 301 Redirect Rules Specification (`next.config.js`)
```javascript
module.exports = {
  async redirects() {
    return [
      {
        source: '/sign-in',
        destination: '/login',
        permanent: true,
      },
      {
        source: '/login/sign-in',
        destination: '/login',
        permanent: true,
      },
      {
        source: '/sign-up',
        destination: '/register',
        permanent: true,
      },
      {
        source: '/student-index',
        destination: '/student/dashboard',
        permanent: true,
      },
      {
        source: '/student-course-list',
        destination: '/student/courses',
        permanent: true,
      },
      {
        source: '/course-list',
        destination: '/course-all',
        permanent: true,
      }
    ];
  },
};
```
