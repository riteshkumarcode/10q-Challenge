# 04 - Old URL Inventory & Endpoint Catalog

## 1. Public Facing URLs (SEO-Critical)

| Old URL Pattern | Page Type | Controller | Action | Dynamic Parameters | Indexable | Canonical Target | SEO Importance | Migration Action |
|---|---|---|---|---|---|---|---|---|
| `/` | Homepage | SiteController | `index` | None | Yes | `https://10qchallenge.in/` | **Critical** | Preserve URL exactly |
| `/about` | About Us | SiteController | `about` | None | Yes | `https://10qchallenge.in/about` | High | Preserve URL exactly |
| `/contact` | Contact Us | SiteController | `contact` | None | Yes | `https://10qchallenge.in/contact` | High | Preserve URL exactly |
| `/blog` | Blog Index | SiteController | `blog` | None | Yes | `https://10qchallenge.in/blog` | **Critical** | Preserve URL exactly |
| `/blog-detail/{blogslug}` | Blog Post Detail | SiteController | `blogdetail` | `blogslug` (string) | Yes | `https://10qchallenge.in/blog-detail/{slug}` | **Critical** | Preserve URL exactly |
| `/exam/{examslug}` | Exam Landing | SiteController | `exam` | `examslug` (string) | Yes | `https://10qchallenge.in/exam/{slug}` | **Critical** | Preserve URL exactly |
| `/testseries/{examslug}` | Test Series Exam | SiteController | `testseries` | `examslug` (string) | Yes | `https://10qchallenge.in/testseries/{slug}` | **Critical** | Preserve URL exactly |
| `/mentorship/{examslug}` | Mentorship Exam | SiteController | `mentorship` | `examslug` (string) | Yes | `https://10qchallenge.in/mentorship/{slug}` | **Critical** | Preserve URL exactly |
| `/course-all` | All Courses Catalog | SiteController | `courseall` | None | Yes | `https://10qchallenge.in/course-all` | **Critical** | Preserve URL exactly |
| `/course-detail/{courseslug}` | Course Detail | SiteController | `coursedetail` | `courseslug` (string) | Yes | `https://10qchallenge.in/course-detail/{slug}` | **Critical** | Preserve URL exactly |
| `/cart` | Shopping Cart | SiteController | `cart` | None | No (Noindex) | `https://10qchallenge.in/cart` | Medium | Preserve URL exactly |
| `/checkout` | Checkout Page | SiteController | `checkout` | None | No (Noindex) | `https://10qchallenge.in/checkout` | Medium | Preserve URL exactly |
| `/login` / `/sign-in` | Student Login | SiteController / LoginController | `login` / `signin` | None | No (Noindex) | `https://10qchallenge.in/login` | Medium | Preserve `/login`, 301 redirect `/sign-in` |
| `/register` / `/sign-up` | Student Registration | SiteController / LoginController | `register` / `signup` | None | No (Noindex) | `https://10qchallenge.in/register` | Medium | Preserve `/register`, 301 redirect `/sign-up` |
| `/forget-password` | Password Reset Request | SiteController | `forgetpassword` | None | No (Noindex) | `https://10qchallenge.in/forget-password` | Medium | Preserve URL exactly |
| `/verifymail/{verificationcode}` | Email Verification | SiteController | `verifymail` | `verificationcode` (string) | No (Noindex) | `https://10qchallenge.in/verifymail/{code}` | Medium | Preserve URL exactly |
| `/payment-success` | Payment Callback Success | PaymentController | `paymentsuccess` | Form POST | No (Noindex) | `https://10qchallenge.in/payment-success` | Medium | Preserve URL exactly |
| `/payment-failure` | Payment Callback Failure | PaymentController | `paymentfailure` | Form POST | No (Noindex) | `https://10qchallenge.in/payment-failure` | Medium | Preserve URL exactly |
| `/error/404` | 404 Error Page | ErrorController | `Error404` | None | No (Noindex) | None | Medium | Preserve standard 404 handler |

---

## 2. Student Portal URLs (Authenticated)

| Old URL Pattern | Feature Area | Controller | Action | Dynamic Parameters |
|---|---|---|---|---|
| `/student-index` | Student Dashboard | StudentController | `studentindex` | None |
| `/student-course-list` | My Enrolled Courses | StudentController | `studentcourselist` | None |
| `/course-data/{courseid}` | Course Overview / Portal Hub | StudentController | `coursedata` | `courseid` (int) |
| `/course-recorded-session/{courseid}` | Recorded Lectures & Videos | StudentController | `courserecordedsession` | `courseid` (int) |
| `/course-live-session/{courseid}` | Live Classes & Streams | StudentController | `courselivesession` | `courseid` (int) |
| `/course-study-material/{courseid}` | Study Material & PDFs | StudentController | `coursestudymaterial` | `courseid` (int) |
| `/test-series-list/{courseid}` | Course Test Series List | StudentController | `testserieslist` | `courseid` (int) |
| `/student-test-instruction/{courseid}/{exampaperid}` | Test Instructions | StudentController | `studenttestinstruction` | `courseid` (int), `exampaperid` (int) |
| `/student-test/{exampaperid}` | Test Player / Exam Engine | StudentController | `studenttest` | `exampaperid` (int) |
| `/attempted-test` | Historical Test Attempts | StudentController | `attemptedTest` | None |
| `/test-result/{studentexampaperid}` | Test Result / Score Card | StudentController | `testresult` | `studentexampaperid` (string/guid) |
| `/test-analysis/{exampaperid}` | Test Analytics & Performance | StudentController | `testanalysis` | `exampaperid` (string) |
| `/bookmark-question` | Bookmarked Questions | StudentController | `bookmarkquestion` | None |
| `/student-doubt` | Doubt History & Raise Doubt | StudentController | `studentdoubt` | None |
| `/student-doubt-answer/{doubtid}` | Doubt Discussion Thread | StudentController | `studentdoubtanswer` | `doubtid` (int) |
| `/invoice-list` | Orders & Invoice History | StudentController | `invoicelist` | None |
| `/invoice-view/{invoiceid}` | Invoice View / Print | StudentController | `invoiceview` | `invoiceid` (int) |
| `/student-cart` | Internal Student Cart | StudentController | `studentcart` | None |

---

## 3. Admin Portal URLs (Administrative Access)

| Old URL Pattern | Feature Area | Controller | Action | Dynamic Parameters |
|---|---|---|---|---|
| `/admin` | Admin Dashboard | AdminController | `Index` | None |
| `/course-master-list` | Course Directory | AdminController | `coursemasterlist` | None |
| `/course-master` | Create Course | AdminController | `coursemaster` | None |
| `/course-master/{courseid}` | Edit Course | AdminController | `coursemaster` | `courseid` (int) |
| `/course-faq/{courseid}/{coursename}` | Course FAQs | AdminController | `coursefaq` | `courseid` (int), `coursename` (string) |
| `/link-course-subject/{courseid}/{coursename}` | Subject Linker | LinkController | `linkcoursesubject` | `courseid` (int), `coursename` (string) |
| `/link-course-video/{courseid}/{coursename}` | Video Linker | LinkController | `linkcoursevideo` | `courseid` (int), `coursename` (string) |
| `/link-course-document/{courseid}/{coursename}` | Document Linker | LinkController | `linkcoursedocument` | `courseid` (int), `coursename` (string) |
| `/link-exampaper-question/{courseid}/{exampaperid}/{exampapername}` | Paper Question Linker | LinkController | `linkexampaperquestion` | `courseid`, `exampaperid`, `exampapername` |
| `/exam-master` | Exam Management | ExamMasterController | `ExamMaster` | None |
| `/subject-master` | Subject Management | SubjectMasterController | `SubjectMaster` | None |
| `/chapter` / `/chapter-list` | Chapter Management | ChapterController | `chapter` / `chapterlist` | None |
| `/chapter-topic` | Chapter Topic Management | ChapterController | `chaptertopic` | None |
| `/question-list/{questiontype}` | Question Bank | AdminController | `questionlist` | `questiontype` (int) |
| `/question-master` / `/question-master/{id}` | MCQ Question Editor | AdminController | `questionmaster` | `questionid` (int) |
| `/numeric-question-master` / `/{id}` | Numerical Question Editor | AdminController | `numericquestionmaster` | `questionid` (int) |
| `/question-view/{questionid}` | Question Viewer | AdminController | `questionview` | `questionid` (int) |
| `/test-series-master/{courseid}/{name}` | Test Series Manager | AdminController | `testseriesmaster` | `courseid` (int), `coursename` (string) |
| `/video-master` | Video Asset Bank | AdminController | `videomaster` | None |
| `/document-master` | PDF / Document Bank | AdminController | `documentmaster` | None |
| `/coupon-list` | Discount Coupon List | CouponController | `couponlist` | None |
| `/coupon-master` / `/{couponcode}` | Coupon Editor | CouponController | `couponmaster` | `couponcode` (string) |
| `/admin-blog` | Blog CMS Editor | AdminController | `adminblog` | None |
| `/admin-seopage` | SEO Meta Management | AdminController | `adminseopage` | None |
| `/admin-notification-list` / `/{id}` | Course Announcements | AdminController | `adminnotificationlist` | `notificationid` (int) |
| `/admin-site-notification` | Site Banner Alerts | AdminController | `adminsitenotification` | None |
| `/admin-student-doubt` / `/{doubtid}` | Doubt Moderation | AdminController | `adminstudentdoubt` | `doubtid` (int) |
| `/student-attempted-test` | Attempt Monitoring | AdminController | `studentattemptedtest` | None |
| `/admin-student-invoice` | Order / Billing Admin | AdminController | `adminstudentinvoice` | None |
