-- ============================================================================
-- 10Q CHALLENGE PRODUCTION DATABASE SCHEMA (MS SQL SERVER 2019 / 2022)
-- Entity Framework Core & ASP.NET Core Clean Architecture Compatible
-- ============================================================================

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = '10QChallengeDb')
BEGIN
    CREATE DATABASE [10QChallengeDb];
END
GO

USE [10QChallengeDb];
GO

-- ============================================================================
-- 1. IDENTITY, USERS & ROLES
-- ============================================================================

IF OBJECT_ID('dbo.UserRoles', 'U') IS NOT NULL DROP TABLE dbo.UserRoles;
IF OBJECT_ID('dbo.StudentProfiles', 'U') IS NOT NULL DROP TABLE dbo.StudentProfiles;
IF OBJECT_ID('dbo.FacultyProfiles', 'U') IS NOT NULL DROP TABLE dbo.FacultyProfiles;
IF OBJECT_ID('dbo.AuditLogs', 'U') IS NOT NULL DROP TABLE dbo.AuditLogs;
IF OBJECT_ID('dbo.Roles', 'U') IS NOT NULL DROP TABLE dbo.Roles;
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL DROP TABLE dbo.Users;

CREATE TABLE dbo.Users (
    Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NOT NULL,
    PhoneNumber NVARCHAR(20) NULL,
    PasswordHash NVARCHAR(500) NOT NULL,
    IsEmailVerified BIT NOT NULL DEFAULT 0,
    IsPhoneVerified BIT NOT NULL DEFAULT 0,
    EmailVerificationCode NVARCHAR(100) NULL,
    PasswordResetToken NVARCHAR(200) NULL,
    PasswordResetTokenExpiry DATETIME2 NULL,
    RefreshToken NVARCHAR(500) NULL,
    RefreshTokenExpiry DATETIME2 NULL,
    AvatarUrl NVARCHAR(500) NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    IsDeleted BIT NOT NULL DEFAULT 0,
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_Users PRIMARY KEY CLUSTERED (Id)
);

CREATE UNIQUE NONCLUSTERED INDEX IX_Users_Email ON dbo.Users(Email) WHERE IsDeleted = 0;
CREATE NONCLUSTERED INDEX IX_Users_PhoneNumber ON dbo.Users(PhoneNumber);

CREATE TABLE dbo.Roles (
    Id INT IDENTITY(1,1) NOT NULL,
    Name NVARCHAR(50) NOT NULL,
    Description NVARCHAR(200) NULL,
    CONSTRAINT PK_Roles PRIMARY KEY CLUSTERED (Id)
);

CREATE UNIQUE NONCLUSTERED INDEX IX_Roles_Name ON dbo.Roles(Name);

CREATE TABLE dbo.UserRoles (
    UserId UNIQUEIDENTIFIER NOT NULL,
    RoleId INT NOT NULL,
    AssignedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_UserRoles PRIMARY KEY CLUSTERED (UserId, RoleId),
    CONSTRAINT FK_UserRoles_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE,
    CONSTRAINT FK_UserRoles_Roles FOREIGN KEY (RoleId) REFERENCES dbo.Roles(Id) ON DELETE CASCADE
);

CREATE TABLE dbo.StudentProfiles (
    UserId UNIQUEIDENTIFIER NOT NULL,
    TargetExam NVARCHAR(50) NULL,
    TargetYear INT NULL,
    CurrentClass NVARCHAR(50) NULL,
    State NVARCHAR(100) NULL,
    City NVARCHAR(100) NULL,
    ReferralCode NVARCHAR(50) NULL,
    ReferredBy NVARCHAR(50) NULL,
    Bio NVARCHAR(500) NULL,
    CONSTRAINT PK_StudentProfiles PRIMARY KEY CLUSTERED (UserId),
    CONSTRAINT FK_StudentProfiles_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE
);

CREATE TABLE dbo.FacultyProfiles (
    Id INT IDENTITY(1,1) NOT NULL,
    FullName NVARCHAR(100) NOT NULL,
    Designation NVARCHAR(100) NOT NULL,
    AlmaMater NVARCHAR(150) NULL,
    Bio NVARCHAR(MAX) NULL,
    PhotoUrl NVARCHAR(500) NULL,
    DisplayOrder INT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_FacultyProfiles PRIMARY KEY CLUSTERED (Id)
);

-- ============================================================================
-- 2. ACADEMIC & CURRICULUM CORE
-- ============================================================================

IF OBJECT_ID('dbo.CourseFaqs', 'U') IS NOT NULL DROP TABLE dbo.CourseFaqs;
IF OBJECT_ID('dbo.LessonResources', 'U') IS NOT NULL DROP TABLE dbo.LessonResources;
IF OBJECT_ID('dbo.Lessons', 'U') IS NOT NULL DROP TABLE dbo.Lessons;
IF OBJECT_ID('dbo.Chapters', 'U') IS NOT NULL DROP TABLE dbo.Chapters;
IF OBJECT_ID('dbo.Subjects', 'U') IS NOT NULL DROP TABLE dbo.Subjects;
IF OBJECT_ID('dbo.CourseFaculty', 'U') IS NOT NULL DROP TABLE dbo.CourseFaculty;
IF OBJECT_ID('dbo.Courses', 'U') IS NOT NULL DROP TABLE dbo.Courses;
IF OBJECT_ID('dbo.Exams', 'U') IS NOT NULL DROP TABLE dbo.Exams;

CREATE TABLE dbo.Exams (
    Id INT IDENTITY(1,1) NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    Slug NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    HeroHeading NVARCHAR(200) NULL,
    HeroSubheading NVARCHAR(500) NULL,
    IconUrl NVARCHAR(500) NULL,
    BannerUrl NVARCHAR(500) NULL,
    DisplayOrder INT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1,
    IsDeleted BIT NOT NULL DEFAULT 0,
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_Exams PRIMARY KEY CLUSTERED (Id)
);

CREATE UNIQUE NONCLUSTERED INDEX IX_Exams_Slug ON dbo.Exams(Slug) WHERE IsDeleted = 0;

CREATE TABLE dbo.Courses (
    Id INT IDENTITY(1,1) NOT NULL,
    ExamId INT NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    Slug NVARCHAR(200) NOT NULL,
    ShortDescription NVARCHAR(500) NULL,
    FullDescriptionHtml NVARCHAR(MAX) NULL,
    Price DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    OriginalPrice DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    DiscountPercent DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    ValidityDays INT NOT NULL DEFAULT 365,
    ExpiryDate DATETIME2 NULL,
    EnrolledStudentCount INT NOT NULL DEFAULT 0,
    ThumbnailUrl NVARCHAR(500) NULL,
    BannerUrl NVARCHAR(500) NULL,
    AltTagThumbnail NVARCHAR(200) NULL,
    AltTagBanner NVARCHAR(200) NULL,
    TrailerVimeoId NVARCHAR(100) NULL,
    TrailerVideoUrl NVARCHAR(500) NULL,
    IsFeatured BIT NOT NULL DEFAULT 0,
    IsShowInIndex BIT NOT NULL DEFAULT 1,
    IsMentorship BIT NOT NULL DEFAULT 0,
    IsTestSeries BIT NOT NULL DEFAULT 0,
    IsPublished BIT NOT NULL DEFAULT 1,
    DisplayOrder INT NOT NULL DEFAULT 0,
    IsDeleted BIT NOT NULL DEFAULT 0,
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_Courses PRIMARY KEY CLUSTERED (Id),
    CONSTRAINT FK_Courses_Exams FOREIGN KEY (ExamId) REFERENCES dbo.Exams(Id)
);

CREATE UNIQUE NONCLUSTERED INDEX IX_Courses_Slug ON dbo.Courses(Slug) WHERE IsDeleted = 0;
CREATE NONCLUSTERED INDEX IX_Courses_ExamId ON dbo.Courses(ExamId);

CREATE TABLE dbo.CourseFaculty (
    CourseId INT NOT NULL,
    FacultyId INT NOT NULL,
    CONSTRAINT PK_CourseFaculty PRIMARY KEY CLUSTERED (CourseId, FacultyId),
    CONSTRAINT FK_CourseFaculty_Courses FOREIGN KEY (CourseId) REFERENCES dbo.Courses(Id) ON DELETE CASCADE,
    CONSTRAINT FK_CourseFaculty_FacultyProfiles FOREIGN KEY (FacultyId) REFERENCES dbo.FacultyProfiles(Id) ON DELETE CASCADE
);

CREATE TABLE dbo.CourseFaqs (
    Id INT IDENTITY(1,1) NOT NULL,
    CourseId INT NOT NULL,
    Question NVARCHAR(500) NOT NULL,
    AnswerHtml NVARCHAR(MAX) NOT NULL,
    DisplayOrder INT NOT NULL DEFAULT 0,
    IsDeleted BIT NOT NULL DEFAULT 0,
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_CourseFaqs PRIMARY KEY CLUSTERED (Id),
    CONSTRAINT FK_CourseFaqs_Courses FOREIGN KEY (CourseId) REFERENCES dbo.Courses(Id) ON DELETE CASCADE
);

CREATE NONCLUSTERED INDEX IX_CourseFaqs_CourseId ON dbo.CourseFaqs(CourseId);

CREATE TABLE dbo.Subjects (
    Id INT IDENTITY(1,1) NOT NULL,
    CourseId INT NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    Code NVARCHAR(50) NULL,
    IconUrl NVARCHAR(500) NULL,
    DisplayOrder INT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1,
    IsDeleted BIT NOT NULL DEFAULT 0,
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_Subjects PRIMARY KEY CLUSTERED (Id),
    CONSTRAINT FK_Subjects_Courses FOREIGN KEY (CourseId) REFERENCES dbo.Courses(Id) ON DELETE CASCADE
);

CREATE NONCLUSTERED INDEX IX_Subjects_CourseId ON dbo.Subjects(CourseId);

CREATE TABLE dbo.Chapters (
    Id INT IDENTITY(1,1) NOT NULL,
    SubjectId INT NOT NULL,
    Name NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    DisplayOrder INT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1,
    IsDeleted BIT NOT NULL DEFAULT 0,
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_Chapters PRIMARY KEY CLUSTERED (Id),
    CONSTRAINT FK_Chapters_Subjects FOREIGN KEY (SubjectId) REFERENCES dbo.Subjects(Id) ON DELETE CASCADE
);

CREATE NONCLUSTERED INDEX IX_Chapters_SubjectId ON dbo.Chapters(SubjectId);

CREATE TABLE dbo.Lessons (
    Id INT IDENTITY(1,1) NOT NULL,
    ChapterId INT NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    BriefDescription NVARCHAR(MAX) NULL,
    LessonType NVARCHAR(50) NOT NULL DEFAULT 'Video', -- Video, Document, Quiz, Live
    VimeoVideoId NVARCHAR(100) NULL,
    VideoUrl NVARCHAR(500) NULL,
    DurationSeconds INT NOT NULL DEFAULT 0,
    DocumentUrl NVARCHAR(500) NULL,
    IsLiveSession BIT NOT NULL DEFAULT 0,
    LiveSessionTime DATETIME2 NULL,
    LiveStreamJoinUrl NVARCHAR(500) NULL,
    IsFreePreview BIT NOT NULL DEFAULT 0,
    DisplayOrder INT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1,
    IsDeleted BIT NOT NULL DEFAULT 0,
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_Lessons PRIMARY KEY CLUSTERED (Id),
    CONSTRAINT FK_Lessons_Chapters FOREIGN KEY (ChapterId) REFERENCES dbo.Chapters(Id) ON DELETE CASCADE
);

CREATE NONCLUSTERED INDEX IX_Lessons_ChapterId ON dbo.Lessons(ChapterId);

CREATE TABLE dbo.LessonResources (
    Id INT IDENTITY(1,1) NOT NULL,
    LessonId INT NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    ResourceUrl NVARCHAR(500) NOT NULL,
    ResourceType NVARCHAR(50) NOT NULL DEFAULT 'PDF', -- PDF, FormulaSheet, Assignment
    FileSizeBytes BIGINT NOT NULL DEFAULT 0,
    DisplayOrder INT NOT NULL DEFAULT 0,
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_LessonResources PRIMARY KEY CLUSTERED (Id),
    CONSTRAINT FK_LessonResources_Lessons FOREIGN KEY (LessonId) REFERENCES dbo.Lessons(Id) ON DELETE CASCADE
);

-- ============================================================================
-- 3. ASSESSMENT & QUESTION BANK ENGINE
-- ============================================================================

IF OBJECT_ID('dbo.TestAttemptDetails', 'U') IS NOT NULL DROP TABLE dbo.TestAttemptDetails;
IF OBJECT_ID('dbo.TestAttempts', 'U') IS NOT NULL DROP TABLE dbo.TestAttempts;
IF OBJECT_ID('dbo.TestPaperQuestions', 'U') IS NOT NULL DROP TABLE dbo.TestPaperQuestions;
IF OBJECT_ID('dbo.TestPapers', 'U') IS NOT NULL DROP TABLE dbo.TestPapers;
IF OBJECT_ID('dbo.Questions', 'U') IS NOT NULL DROP TABLE dbo.Questions;

CREATE TABLE dbo.Questions (
    Id INT IDENTITY(1,1) NOT NULL,
    SubjectId INT NULL,
    ChapterId INT NULL,
    QuestionType INT NOT NULL DEFAULT 1, -- 1: Single Choice MCQ, 2: Numerical
    QuestionTextHtml NVARCHAR(MAX) NOT NULL,
    OptionA NVARCHAR(MAX) NULL,
    OptionB NVARCHAR(MAX) NULL,
    OptionC NVARCHAR(MAX) NULL,
    OptionD NVARCHAR(MAX) NULL,
    CorrectOption NVARCHAR(10) NULL, -- 'A', 'B', 'C', 'D'
    NumericalAnswer DECIMAL(18,4) NULL,
    NumericalTolerance DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
    Difficulty INT NOT NULL DEFAULT 2, -- 1: Easy, 2: Medium, 3: Hard
    ExplanationHtml NVARCHAR(MAX) NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    IsDeleted BIT NOT NULL DEFAULT 0,
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_Questions PRIMARY KEY CLUSTERED (Id),
    CONSTRAINT FK_Questions_Subjects FOREIGN KEY (SubjectId) REFERENCES dbo.Subjects(Id),
    CONSTRAINT FK_Questions_Chapters FOREIGN KEY (ChapterId) REFERENCES dbo.Chapters(Id)
);

CREATE TABLE dbo.TestPapers (
    Id INT IDENTITY(1,1) NOT NULL,
    CourseId INT NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    DurationMinutes INT NOT NULL DEFAULT 180,
    TotalMarks DECIMAL(18,2) NOT NULL DEFAULT 390.00,
    MarksPerCorrect DECIMAL(18,2) NOT NULL DEFAULT 3.00,
    NegativeMarks DECIMAL(18,2) NOT NULL DEFAULT 1.00,
    TotalQuestions INT NOT NULL DEFAULT 130,
    BonusQuestions INT NOT NULL DEFAULT 12,
    InstructionsHeaderHtml NVARCHAR(MAX) NULL,
    InstructionsFooterHtml NVARCHAR(MAX) NULL,
    DisplayOrder INT NOT NULL DEFAULT 0,
    IsFreeTest BIT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1,
    IsDeleted BIT NOT NULL DEFAULT 0,
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_TestPapers PRIMARY KEY CLUSTERED (Id),
    CONSTRAINT FK_TestPapers_Courses FOREIGN KEY (CourseId) REFERENCES dbo.Courses(Id) ON DELETE CASCADE
);

CREATE TABLE dbo.TestPaperQuestions (
    Id INT IDENTITY(1,1) NOT NULL,
    TestPaperId INT NOT NULL,
    QuestionId INT NOT NULL,
    SectionName NVARCHAR(100) NOT NULL DEFAULT 'Main', -- Physics, Chemistry, Mathematics, English, LR
    SortOrder INT NOT NULL DEFAULT 0,
    IsBonusQuestion BIT NOT NULL DEFAULT 0,
    CONSTRAINT PK_TestPaperQuestions PRIMARY KEY CLUSTERED (Id),
    CONSTRAINT FK_TestPaperQuestions_TestPapers FOREIGN KEY (TestPaperId) REFERENCES dbo.TestPapers(Id) ON DELETE CASCADE,
    CONSTRAINT FK_TestPaperQuestions_Questions FOREIGN KEY (QuestionId) REFERENCES dbo.Questions(Id) ON DELETE CASCADE
);

CREATE TABLE dbo.TestAttempts (
    Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    TestPaperId INT NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    StartTime DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    EndTime DATETIME2 NULL,
    TotalObtainedMarks DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    TotalAttempted INT NOT NULL DEFAULT 0,
    TotalCorrect INT NOT NULL DEFAULT 0,
    TotalWrong INT NOT NULL DEFAULT 0,
    AccuracyPercentage DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    Status INT NOT NULL DEFAULT 0, -- 0: InProgress, 1: Submitted, 2: AutoSubmitted, 3: Terminated
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_TestAttempts PRIMARY KEY CLUSTERED (Id),
    CONSTRAINT FK_TestAttempts_TestPapers FOREIGN KEY (TestPaperId) REFERENCES dbo.TestPapers(Id) ON DELETE CASCADE,
    CONSTRAINT FK_TestAttempts_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE
);

CREATE NONCLUSTERED INDEX IX_TestAttempts_UserId ON dbo.TestAttempts(UserId);

CREATE TABLE dbo.TestAttemptDetails (
    Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    TestAttemptId UNIQUEIDENTIFIER NOT NULL,
    QuestionId INT NOT NULL,
    QNo INT NOT NULL,
    IsAttempted BIT NOT NULL DEFAULT 0,
    SelectedOption NVARCHAR(10) NULL,
    GivenNumericalAnswer NVARCHAR(100) NULL,
    IsCorrect INT NOT NULL DEFAULT 0, -- 1: Correct, -1: Wrong, 0: Unattempted
    IsBookmarked BIT NOT NULL DEFAULT 0,
    TimeSpentSeconds INT NOT NULL DEFAULT 0,
    CONSTRAINT PK_TestAttemptDetails PRIMARY KEY CLUSTERED (Id),
    CONSTRAINT FK_TestAttemptDetails_TestAttempts FOREIGN KEY (TestAttemptId) REFERENCES dbo.TestAttempts(Id) ON DELETE CASCADE,
    CONSTRAINT FK_TestAttemptDetails_Questions FOREIGN KEY (QuestionId) REFERENCES dbo.Questions(Id)
);

-- ============================================================================
-- 4. E-COMMERCE, PAYU & INVOICING
-- ============================================================================

IF OBJECT_ID('dbo.Enrollments', 'U') IS NOT NULL DROP TABLE dbo.Enrollments;
IF OBJECT_ID('dbo.Payments', 'U') IS NOT NULL DROP TABLE dbo.Payments;
IF OBJECT_ID('dbo.OrderItems', 'U') IS NOT NULL DROP TABLE dbo.OrderItems;
IF OBJECT_ID('dbo.Orders', 'U') IS NOT NULL DROP TABLE dbo.Orders;
IF OBJECT_ID('dbo.Coupons', 'U') IS NOT NULL DROP TABLE dbo.Coupons;

CREATE TABLE dbo.Coupons (
    Id INT IDENTITY(1,1) NOT NULL,
    Code NVARCHAR(50) NOT NULL,
    DiscountType NVARCHAR(20) NOT NULL DEFAULT 'Percentage', -- Percentage, Flat
    DiscountValue DECIMAL(18,2) NOT NULL,
    MinOrderAmount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    MaxDiscountAmount DECIMAL(18,2) NULL,
    SpecificCourseId INT NULL,
    ValidFrom DATETIME2 NOT NULL,
    ExpiresAt DATETIME2 NOT NULL,
    UsageLimit INT NOT NULL DEFAULT 1000,
    TimesUsed INT NOT NULL DEFAULT 0,
    Description NVARCHAR(500) NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    IsDeleted BIT NOT NULL DEFAULT 0,
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_Coupons PRIMARY KEY CLUSTERED (Id)
);

CREATE UNIQUE NONCLUSTERED INDEX IX_Coupons_Code ON dbo.Coupons(Code) WHERE IsDeleted = 0;

CREATE TABLE dbo.Orders (
    Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    OrderNumber NVARCHAR(50) NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    CouponId INT NULL,
    GrossAmount DECIMAL(18,2) NOT NULL,
    DiscountAmount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    TaxableAmount DECIMAL(18,2) NOT NULL,
    TaxPercent DECIMAL(5,2) NOT NULL DEFAULT 18.00,
    TaxAmount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    RoundOffAmount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    NetAmount DECIMAL(18,2) NOT NULL,
    Status NVARCHAR(50) NOT NULL DEFAULT 'Pending', -- Pending, Success, Failed, Cancelled, Refunded
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_Orders PRIMARY KEY CLUSTERED (Id),
    CONSTRAINT FK_Orders_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id),
    CONSTRAINT FK_Orders_Coupons FOREIGN KEY (CouponId) REFERENCES dbo.Coupons(Id)
);

CREATE UNIQUE NONCLUSTERED INDEX IX_Orders_OrderNumber ON dbo.Orders(OrderNumber);
CREATE NONCLUSTERED INDEX IX_Orders_UserId ON dbo.Orders(UserId);

CREATE TABLE dbo.OrderItems (
    Id INT IDENTITY(1,1) NOT NULL,
    OrderId UNIQUEIDENTIFIER NOT NULL,
    CourseId INT NOT NULL,
    CourseMRP DECIMAL(18,2) NOT NULL,
    GrossAmount DECIMAL(18,2) NOT NULL,
    DiscountAmount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    TaxableAmount DECIMAL(18,2) NOT NULL,
    TaxAmount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    NetAmount DECIMAL(18,2) NOT NULL,
    CONSTRAINT PK_OrderItems PRIMARY KEY CLUSTERED (Id),
    CONSTRAINT FK_OrderItems_Orders FOREIGN KEY (OrderId) REFERENCES dbo.Orders(Id) ON DELETE CASCADE,
    CONSTRAINT FK_OrderItems_Courses FOREIGN KEY (CourseId) REFERENCES dbo.Courses(Id)
);

CREATE TABLE dbo.Payments (
    Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    OrderId UNIQUEIDENTIFIER NOT NULL,
    PaymentGateway NVARCHAR(50) NOT NULL DEFAULT 'PayU',
    MerchantTxnId NVARCHAR(100) NOT NULL,
    GatewayTxnId NVARCHAR(100) NULL, -- mihpayid
    PaymentMode NVARCHAR(50) NULL, -- CC, DC, UPI, NB
    Amount DECIMAL(18,2) NOT NULL,
    Currency NVARCHAR(10) NOT NULL DEFAULT 'INR',
    Status NVARCHAR(50) NOT NULL DEFAULT 'Initiated', -- Initiated, Success, Failed, Cancelled
    BankRefNum NVARCHAR(100) NULL,
    ErrorCode NVARCHAR(50) NULL,
    ErrorMessage NVARCHAR(500) NULL,
    RawResponseJson NVARCHAR(MAX) NULL,
    VerifiedAtUtc DATETIME2 NULL,
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_Payments PRIMARY KEY CLUSTERED (Id),
    CONSTRAINT FK_Payments_Orders FOREIGN KEY (OrderId) REFERENCES dbo.Orders(Id) ON DELETE CASCADE
);

CREATE UNIQUE NONCLUSTERED INDEX IX_Payments_MerchantTxnId ON dbo.Payments(MerchantTxnId);

CREATE TABLE dbo.Enrollments (
    Id INT IDENTITY(1,1) NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    CourseId INT NOT NULL,
    OrderId UNIQUEIDENTIFIER NOT NULL,
    GrantedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    ExpiresAtUtc DATETIME2 NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    CONSTRAINT PK_Enrollments PRIMARY KEY CLUSTERED (Id),
    CONSTRAINT FK_Enrollments_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id),
    CONSTRAINT FK_Enrollments_Courses FOREIGN KEY (CourseId) REFERENCES dbo.Courses(Id),
    CONSTRAINT FK_Enrollments_Orders FOREIGN KEY (OrderId) REFERENCES dbo.Orders(Id)
);

CREATE UNIQUE NONCLUSTERED INDEX IX_Enrollments_User_Course ON dbo.Enrollments(UserId, CourseId);

-- ============================================================================
-- 5. PROGRESS, DOUBTS & CMS
-- ============================================================================

IF OBJECT_ID('dbo.LessonProgress', 'U') IS NOT NULL DROP TABLE dbo.LessonProgress;
IF OBJECT_ID('dbo.DoubtMessages', 'U') IS NOT NULL DROP TABLE dbo.DoubtMessages;
IF OBJECT_ID('dbo.Doubts', 'U') IS NOT NULL DROP TABLE dbo.Doubts;
IF OBJECT_ID('dbo.BlogPosts', 'U') IS NOT NULL DROP TABLE dbo.BlogPosts;
IF OBJECT_ID('dbo.SeoMetadata', 'U') IS NOT NULL DROP TABLE dbo.SeoMetadata;
IF OBJECT_ID('dbo.RedirectRules', 'U') IS NOT NULL DROP TABLE dbo.RedirectRules;
IF OBJECT_ID('dbo.SiteNotifications', 'U') IS NOT NULL DROP TABLE dbo.SiteNotifications;

CREATE TABLE dbo.LessonProgress (
    Id INT IDENTITY(1,1) NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    LessonId INT NOT NULL,
    IsCompleted BIT NOT NULL DEFAULT 1,
    LastWatchedSeconds INT NOT NULL DEFAULT 0,
    CompletedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_LessonProgress PRIMARY KEY CLUSTERED (Id),
    CONSTRAINT FK_LessonProgress_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE,
    CONSTRAINT FK_LessonProgress_Lessons FOREIGN KEY (LessonId) REFERENCES dbo.Lessons(Id) ON DELETE CASCADE
);

CREATE UNIQUE NONCLUSTERED INDEX IX_LessonProgress_User_Lesson ON dbo.LessonProgress(UserId, LessonId);

CREATE TABLE dbo.Doubts (
    Id INT IDENTITY(1,1) NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    CourseId INT NULL,
    SubjectId INT NULL,
    ChapterId INT NULL,
    LessonId INT NULL,
    QuestionId INT NULL,
    Title NVARCHAR(200) NOT NULL,
    QuestionText NVARCHAR(MAX) NOT NULL,
    AttachmentUrl NVARCHAR(500) NULL,
    Status NVARCHAR(50) NOT NULL DEFAULT 'Open', -- Open, InReview, Answered, Closed
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_Doubts PRIMARY KEY CLUSTERED (Id),
    CONSTRAINT FK_Doubts_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE,
    CONSTRAINT FK_Doubts_Courses FOREIGN KEY (CourseId) REFERENCES dbo.Courses(Id),
    CONSTRAINT FK_Doubts_Lessons FOREIGN KEY (LessonId) REFERENCES dbo.Lessons(Id)
);

CREATE TABLE dbo.DoubtMessages (
    Id INT IDENTITY(1,1) NOT NULL,
    DoubtId INT NOT NULL,
    SenderUserId UNIQUEIDENTIFIER NOT NULL,
    MessageHtml NVARCHAR(MAX) NOT NULL,
    AttachmentUrl NVARCHAR(500) NULL,
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_DoubtMessages PRIMARY KEY CLUSTERED (Id),
    CONSTRAINT FK_DoubtMessages_Doubts FOREIGN KEY (DoubtId) REFERENCES dbo.Doubts(Id) ON DELETE CASCADE,
    CONSTRAINT FK_DoubtMessages_Users FOREIGN KEY (SenderUserId) REFERENCES dbo.Users(Id)
);

CREATE TABLE dbo.BlogPosts (
    Id INT IDENTITY(1,1) NOT NULL,
    ExamId INT NULL,
    Title NVARCHAR(200) NOT NULL,
    Slug NVARCHAR(200) NOT NULL,
    Excerpt NVARCHAR(500) NULL,
    ContentHtml NVARCHAR(MAX) NOT NULL,
    ThumbnailUrl NVARCHAR(500) NULL,
    BannerUrl NVARCHAR(500) NULL,
    AltTagThumbnail NVARCHAR(200) NULL,
    AltTagBanner NVARCHAR(200) NULL,
    AuthorName NVARCHAR(100) NOT NULL DEFAULT '10Q Challenge Team',
    AuthorPhotoUrl NVARCHAR(500) NULL,
    ReadingTimeMinutes INT NOT NULL DEFAULT 5,
    Status NVARCHAR(50) NOT NULL DEFAULT 'Published', -- Draft, Scheduled, Published, Archived
    PublishedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    IsPublished BIT NOT NULL DEFAULT 1,
    IsDeleted BIT NOT NULL DEFAULT 0,
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_BlogPosts PRIMARY KEY CLUSTERED (Id),
    CONSTRAINT FK_BlogPosts_Exams FOREIGN KEY (ExamId) REFERENCES dbo.Exams(Id)
);

CREATE UNIQUE NONCLUSTERED INDEX IX_BlogPosts_Slug ON dbo.BlogPosts(Slug) WHERE IsDeleted = 0;
CREATE NONCLUSTERED INDEX IX_BlogPosts_ExamId ON dbo.BlogPosts(ExamId);

CREATE TABLE dbo.SeoMetadata (
    Id INT IDENTITY(1,1) NOT NULL,
    Path NVARCHAR(300) NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(500) NOT NULL,
    Keywords NVARCHAR(500) NULL,
    CanonicalUrl NVARCHAR(500) NULL,
    Robots NVARCHAR(100) NOT NULL DEFAULT 'index, follow',
    OgTitle NVARCHAR(200) NULL,
    OgDescription NVARCHAR(500) NULL,
    OgImageUrl NVARCHAR(500) NULL,
    OgType NVARCHAR(50) NOT NULL DEFAULT 'website',
    TwitterCard NVARCHAR(50) NOT NULL DEFAULT 'summary_large_image',
    StructuredDataJson NVARCHAR(MAX) NULL,
    UpdatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_SeoMetadata PRIMARY KEY CLUSTERED (Id)
);

CREATE UNIQUE NONCLUSTERED INDEX IX_SeoMetadata_Path ON dbo.SeoMetadata(Path);

CREATE TABLE dbo.RedirectRules (
    Id INT IDENTITY(1,1) NOT NULL,
    SourcePath NVARCHAR(300) NOT NULL,
    TargetPath NVARCHAR(300) NOT NULL,
    StatusCode INT NOT NULL DEFAULT 301,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_RedirectRules PRIMARY KEY CLUSTERED (Id)
);

CREATE UNIQUE NONCLUSTERED INDEX IX_RedirectRules_SourcePath ON dbo.RedirectRules(SourcePath);

CREATE TABLE dbo.SiteNotifications (
    Id INT IDENTITY(1,1) NOT NULL,
    Message NVARCHAR(500) NOT NULL,
    LinkUrl NVARCHAR(500) NULL,
    ShowFrom DATETIME2 NOT NULL,
    ShowTo DATETIME2 NOT NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_SiteNotifications PRIMARY KEY CLUSTERED (Id)
);

PRINT '10Q Challenge Database Schema successfully created.';
GO
