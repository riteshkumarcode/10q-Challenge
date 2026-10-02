# 18 - REST API Architecture & Endpoint Specification

## 1. RESTful API Design Principles
- **Base URL**: `https://api.10qchallenge.in/api/v1`
- **Authentication**: JWT Bearer Tokens in `Authorization: Bearer <token>` header with HTTP-only refresh tokens.
- **Standardized Response Envelope**:
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully.",
  "errors": null,
  "statusCode": 200,
  "timestamp": "2026-09-30T02:15:00Z"
}
```
- **Error Response Envelope**:
```json
{
  "success": false,
  "data": null,
  "message": "Validation failed.",
  "errors": ["The Field 'Email' is required."],
  "statusCode": 400,
  "timestamp": "2026-09-30T02:15:00Z"
}
```

---

## 2. API Endpoint Matrix

### 2.1 Authentication & Profile (`/api/v1/auth`, `/api/v1/profile`)
- `POST /api/v1/auth/register`: Register new student.
- `POST /api/v1/auth/login`: Authenticate and return JWT access token + refresh token.
- `POST /api/v1/auth/refresh-token`: Issue new JWT access token.
- `POST /api/v1/auth/forgot-password`: Send password reset email with secure one-time token.
- `POST /api/v1/auth/reset-password`: Reset password using token.
- `GET /api/v1/profile`: Retrieve authenticated user profile.
- `PUT /api/v1/profile`: Update profile info.

### 2.2 Public Catalog & Marketing (`/api/v1/public`)
- `GET /api/v1/public/home`: Aggregate homepage payload (Hero, Featured Exams, Courses, Testimonials, Recent Blogs).
- `GET /api/v1/public/exams`: List all active exams.
- `GET /api/v1/public/exams/{slug}`: Exam hub details with related courses, test series, mentorship, and FAQs.
- `GET /api/v1/public/courses`: Searchable, paginated course directory with exam and type filters.
- `GET /api/v1/public/courses/{slug}`: Full course landing payload (Overview, Curriculum outline, Faculty, FAQs, Testimonials).
- `GET /api/v1/public/blogs`: Paginated blog list with search and exam filtering.
- `GET /api/v1/public/blogs/{slug}`: Full blog post payload, author, related articles, and SEO schema.
- `GET /api/v1/public/seo/{path}`: Dynamic metadata for given route path.

### 2.3 Checkout & Payment Gateway (`/api/v1/checkout`, `/api/v1/payments`)
- `POST /api/v1/checkout/apply-coupon`: Validate promo code and calculate discount amount.
- `POST /api/v1/checkout/create-order`: Create pending order and compute server-side PayU hash parameters.
- `POST /api/v1/payments/payu/callback`: Server-to-server webhook callback from PayU with SHA-512 hash validation.
- `POST /api/v1/payments/verify/{orderId}`: Server-side cryptographic status verification with PayU API.

### 2.4 Student Classroom & Learning (`/api/v1/student`)
- `GET /api/v1/student/dashboard`: Enrolled courses, resume learning card, and progress stats.
- `GET /api/v1/student/courses`: Enrolled course roster.
- `GET /api/v1/student/courses/{courseId}/curriculum`: Full authorized curriculum tree (Subjects -> Chapters -> Lessons).
- `GET /api/v1/student/lessons/{lessonId}`: Lesson video/document data (validates enrollment).
- `POST /api/v1/student/progress/complete`: Mark lesson as studied / completed.
- `GET /api/v1/student/doubts`: List student doubts with pagination and status filters.
- `POST /api/v1/student/doubts`: Raise new contextual doubt on lesson or question.
- `POST /api/v1/student/doubts/{doubtId}/reply`: Add reply to doubt thread.
- `GET /api/v1/student/invoices`: Order and invoice history.
- `GET /api/v1/student/invoices/{orderId}/download`: Generate GST PDF invoice.

### 2.5 Assessment & Test Series (`/api/v1/student/tests`)
- `GET /api/v1/student/tests/{paperId}/start`: Initiate test attempt session and return randomized questions.
- `POST /api/v1/student/tests/{attemptId}/submit`: Submit answers and compute immediate scorecard.
- `GET /api/v1/student/tests/{attemptId}/result`: Fetch detailed scorecard, question review, solutions, and percentiles.

### 2.6 Admin Operations (`/api/v1/admin`)
- Full CRUD controllers for `Exams`, `Courses`, `Subjects`, `Chapters`, `Lessons`, `Questions`, `TestPapers`, `Blogs`, `Coupons`, `Doubts`, `SEO`, `Redirects`, `Orders`, and `Users`.
