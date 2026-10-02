# 02 - Old File Structure & Code Organization

## 1. Root Repository Layout
```text
d:\10q challenge website new and final by ritesh\
├── eLearningWebAPIMVC5-20260929T195414Z-1-001.zip  (Backend API archive)
├── eLearning-20260929T195451Z-1-001.zip            (Frontend App archive 1)
├── elearning-20260929T195431Z-1-001.zip            (Frontend App archive 2 - Identical)
└── legacy_code/
    ├── eLearningWebAPIMVC5/                        (ASP.NET 4.8 Web API)
    └── eLearning_App/                              (ASP.NET Core 8.0 MVC App)
```

---

## 2. Backend Project: `eLearningWebAPIMVC5`
```text
eLearningWebAPIMVC5/
├── eLearningWebAPIMVC5.sln
└── eLearningWebAPIMVC5/
    ├── App_Start/
    │   └── WebApiConfig.cs             (CORS, JsonFormatter, Route Config)
    ├── Controllers/                    (27 Web API Controllers)
    │   ├── AdminController.cs
    │   ├── DocumentUploadController.cs
    │   ├── DoubtController.cs
    │   ├── DoubtReplyController.cs
    │   ├── EditorController.cs
    │   ├── InvoiceController.cs
    │   ├── LinkController.cs
    │   ├── MasterBlogController.cs
    │   ├── MasterChapterController.cs
    │   ├── MasterChapterTopicController.cs
    │   ├── MasterCouponController.cs
    │   ├── MasterCourseController.cs
    │   ├── MasterCourseFAQController.cs
    │   ├── MasterDocumentController.cs
    │   ├── MasterExamController.cs
    │   ├── MasterQuestionController.cs
    │   ├── MasterSubjectController.cs
    │   ├── MasterVideoController.cs
    │   ├── NotificationController.cs
    │   ├── PaymentController.cs
    │   ├── SEOPageController.cs
    │   ├── SiteNotificationController.cs
    │   ├── StudentController.cs
    │   ├── StudentDashboardController.cs
    │   ├── TestSeriesController.cs
    │   ├── TokenController.cs
    │   ├── UploadController.cs
    │   └── UserController.cs
    ├── DataLayer/                      (27 ADO.NET SQL Access Classes)
    │   ├── clsDLAdminNotification.cs
    │   ├── clsDLDoubt.cs
    │   ├── clsDLDoubtReply.cs
    │   ├── clsDLInvoiceMain.cs
    │   ├── clsDLLinkCourseDocument.cs
    │   ├── clsDLLinkCourseSubject.cs
    │   ├── clsDLLinkCourseVideo.cs
    │   ├── clsDLLinkExamPaperQuestion.cs
    │   ├── clsDLLinkStudentCourse.cs
    │   ├── clsDLLinkStudentStudy.cs
    │   ├── clsDLMasterBlog.cs
    │   ├── clsDLMasterChapter.cs
    │   ├── clsDLMasterChapterTopic.cs
    │   ├── clsDLMasterCoupon.cs
    │   ├── clsDLMasterCourse.cs
    │   ├── clsDLMasterCourseFAQ.cs
    │   ├── clsDLMasterDocument.cs
    │   ├── clsDLMasterExam.cs
    │   ├── clsDLMasterQuestion.cs
    │   ├── clsDLMasterStudent.cs
    │   ├── clsDLMasterSubject.cs
    │   ├── clsDLMasterVideo.cs
    │   ├── clsDLSEOPage.cs
    │   ├── clsDLSiteNotification.cs
    │   ├── clsDLStudentDashboard.cs
    │   ├── clsDLStudentDocument.cs
    │   ├── clsDLStudentExam.cs
    │   └── clsDLTestSeries.cs
    ├── Models/                         (35 Data Transfer & Domain Models)
    │   ├── clsBLAnswerSubmission.cs
    │   ├── clsBLBookmarkQuestion.cs
    │   ├── clsBLDoubt.cs
    │   ├── clsBLDoubtReply.cs
    │   ├── clsBLExamAttemptSummary.cs
    │   ├── clsBLInvoiceDetail.cs
    │   ├── clsBLInvoiceMain.cs
    │   ├── clsBLLinkCourseDocument.cs
    │   ├── clsBLLinkCourseSubject.cs
    │   ├── clsBLLinkCourseVideo.cs
    │   ├── clsBLLinkExamPaperQuestion.cs
    │   ├── clsBLLinkStudentCourse.cs
    │   ├── clsBLLinkStudentStudy.cs
    │   ├── clsBLMasterBlog.cs
    │   ├── clsBLMasterChapter.cs
    │   ├── clsBLMasterChapterTopic.cs
    │   ├── clsBLMasterCoupon.cs
    │   ├── clsBLMasterCourse.cs
    │   ├── clsBLMasterCourseFAQ.cs
    │   ├── clsBLMasterDocument.cs
    │   ├── clsBLMasterExam.cs
    │   ├── clsBLMasterQuestion.cs
    │   ├── clsBLMasterStudent.cs
    │   ├── clsBLMasterSubject.cs
    │   ├── clsBLMasterVideo.cs
    │   ├── clsBLNotificationAdmin.cs
    │   ├── clsBLPaymentResponse.cs
    │   ├── clsBLSEOPage.cs
    │   ├── clsBLSiteNotification.cs
    │   ├── clsBLStudentDashboard.cs
    │   ├── clsBLStudentTestSeriesDetail.cs
    │   ├── clsBLStudentTestSeriesMain.cs
    │   ├── clsBLTestSeries.cs
    │   ├── clsDataResponse.cs
    │   └── PaymentRequest.cs
    ├── packages.config
    └── Web.config
```

---

## 3. Frontend Project: `eLearning_App`
```text
eLearning_App/eLearning/
├── Program.cs                         (Entry point, Dependency Injection, Middleware)
├── appsettings.json
├── eLearning.csproj
├── Controllers/                       (15 MVC Presentation Controllers)
│   ├── AdminController.cs
│   ├── ChapterController.cs
│   ├── CouponController.cs
│   ├── CredentialController.cs
│   ├── ErrorController.cs
│   ├── ExamMasterController.cs
│   ├── FileProxyController.cs
│   ├── LinkController.cs
│   ├── LoginController.cs
│   ├── PaymentController.cs
│   ├── ProxyController.cs
│   ├── SiteController.cs
│   ├── StudentController.cs
│   └── SubjectMasterController.cs
├── Services/
│   ├── CourseService.cs
│   ├── ExamService.cs
│   ├── MetaService.cs
│   └── PaymentService.cs
├── Helpers/
│   └── JwtAuthorizeAttribute.cs
├── Views/
│   ├── Admin/                         (28 Admin Razor Views)
│   ├── Chapter/                       (5 Chapter Views)
│   ├── Coupon/                        (4 Coupon Views)
│   ├── ExamMaster/                    (2 Exam Views)
│   ├── Link/                          (5 Link Association Views)
│   ├── Login/                         (2 Auth Views)
│   ├── Payment/                       (3 Payment Callback Views)
│   ├── Shared/                        (_SiteLayout, _StudentLayout, _AdminLayout)
│   ├── Site/                          (14 Public Marketing Views)
│   └── Student/                       (24 Student Learning Views)
└── wwwroot/
    ├── jsCode/                        (53 Client-Side AJAX Interaction Files)
    ├── site/                          (Public theme assets, css, img, plugins)
    ├── student/                       (Student & Admin theme assets, css, vendor)
    └── pdf-viewer.html
```
