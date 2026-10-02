# 07 - Old Feature Inventory & Functional Matrix

## 1. Feature Map by Domain

### 1.1 Public Marketing & Discovery
- **Dynamic Homepage**: Hero banners, exam tabs, popular courses, recent blog articles, student testimonials, static statistics counters.
- **Exam Hubs**: Dedicated exam landing pages for `BITSAT`, `JEE`, `COMEDK`, `MET`, `VITEEE` with exam description, curated course recommendations, and test series.
- **Mentorship Hubs**: Filtered view displaying mentorship-flagged courses (`IsShowInMentorship = 1`).
- **Test Series Hubs**: Filtered view displaying test-series-flagged courses (`IsShowInTestSeries = 1`).
- **Course Detail Landing**: Hero information, pricing breakdown, discount badges, intro video trailer, full HTML syllabus description, course FAQs accordion.
- **Blog Hub & Reader**: Paginated list of blog articles filtered by exam category, search keyword filter, rich article viewer with large header banner, publication date, and SEO meta tags.

### 1.2 Cart, Checkout & Payment Gateway
- **Multi-Item Cart**: Add/remove course items to cart stored in browser storage.
- **Coupon Validation Engine**: Apply percentage or flat discount coupons (`tblEL_MasterCoupon`) validating expiration dates, usage limits, and course specificity.
- **PayU Gateway Integration**:
  - Generation of unique transaction GUID (`PGTransactionID`).
  - Creation of pending order and invoice records (`tblEL_InvoiceMain`, `tblEL_InvoiceDetail`, `tblEL_PGTransaction`).
  - Redirection to PayU hosted checkout form (`https://secure.payu.in/_payment`).
  - Handling of `payment-success` and `payment-failure` callbacks.
  - Automatic enrollment insertion upon success into `tblEL_LinkStudent_Course`.

### 1.3 Student Learning Experience (LMS)
- **Student Dashboard**: Quick statistics on enrolled courses, progress indicators for video lectures watched and study PDFs viewed.
- **Course Room (Curriculum Navigation)**:
  - Subject tabs -> Chapter collapsible accordions -> Video lessons / Document PDFs.
  - Vimeo iframe video player.
  - Document viewer for downloadable and inline PDF study materials.
  - Activity tracking (`tblEL_LinkStudentStudy`) marking videos and documents as completed.
- **Doubt Clearance System**:
  - Contextual doubt submission directly from video player or document view.
  - Doubt message thread with admin replies (`tblEL_DoubtReply`).
  - Status tracking (Open / Closed).
- **Computer-Based Test (CBT) Engine**:
  - Test instructions screen with exam rules, scoring parameters, and bonus question rules.
  - Full timed test interface with question palette, single choice selection, numerical input, bookmarking, and timer countdown.
  - Automated scorecard generation (`tblEL_StudentExamPaperMain`, `tblEL_StudentExamPaperDetail`).
  - Question-by-question review with detailed solutions and explanations.
  - Difficulty analysis and topic performance breakdown.
- **Invoices & Receipts**: View, download, and print tax invoices.

### 1.4 Administrative CMS & Operations
- **Course Management**: Create, edit, publish/unpublish courses, configure pricing and marketing copy.
- **Curriculum Builder**: Associate Subjects, Chapters, Topics, Videos, and Documents to Courses.
- **Question Bank CMS**: MCQ question creator with 4 options and solution explanation; Numerical question creator with decimal tolerance.
- **Test Paper Assembler**: Create timed test series, assign questions with drag-and-drop sort index, set bonus questions.
- **Blog CMS**: CKEditor rich text article composer, image uploader, slug generator, meta tags editor, publish scheduler.
- **SEO Manager**: Configure page titles, meta descriptions, and keywords for static and dynamic site routes.
- **Coupon Manager**: Create promo codes with percentage/flat discounts, usage caps, and expiration windows.
- **Doubt Desk**: Review student doubts across questions, videos, and documents with rich reply capabilities.
- **Student & Sales Auditing**: View student roster, purchase history, payment status, and test attempts.
