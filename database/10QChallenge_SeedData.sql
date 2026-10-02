-- ============================================================================
-- 10Q CHALLENGE SEED DATA & MIGRATION SCRIPT
-- ============================================================================

USE [10QChallengeDb];
GO

SET NOCOUNT ON;

-- 1. ROLES
IF NOT EXISTS (SELECT 1 FROM dbo.Roles WHERE Name = 'SuperAdmin')
    INSERT INTO dbo.Roles (Name, Description) VALUES 
    ('SuperAdmin', 'Full administrative control over the entire platform'),
    ('Admin', 'Operations, faculty, course and support administrator'),
    ('CourseManager', 'Academic curriculum, videos and test series manager'),
    ('ContentManager', 'Blog author and SEO editor'),
    ('Mentor', 'Doubt solver and 1-on-1 student mentor'),
    ('Student', 'Enrolled student learner');

-- 2. USERS
-- Admin Password hash for "Admin@10Q#2026" (BCrypt/PBKDF2)
DECLARE @AdminId UNIQUEIDENTIFIER = '11111111-1111-1111-1111-111111111111';
DECLARE @StudentId UNIQUEIDENTIFIER = '22222222-2222-2222-2222-222222222222';

IF NOT EXISTS (SELECT 1 FROM dbo.Users WHERE Email = 'admin@10qchallenge.in')
BEGIN
    INSERT INTO dbo.Users (Id, FullName, Email, PhoneNumber, PasswordHash, IsEmailVerified, IsPhoneVerified, IsActive, CreatedAtUtc)
    VALUES (@AdminId, 'Ritesh (10Q Lead Admin)', 'admin@10qchallenge.in', '+919876543210', '$2a$11$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 1, 1, 1, SYSUTCDATETIME());

    INSERT INTO dbo.UserRoles (UserId, RoleId) VALUES (@AdminId, 1), (@AdminId, 2);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Users WHERE Email = 'student@10qchallenge.in')
BEGIN
    INSERT INTO dbo.Users (Id, FullName, Email, PhoneNumber, PasswordHash, IsEmailVerified, IsPhoneVerified, IsActive, CreatedAtUtc)
    VALUES (@StudentId, 'Aarav Sharma', 'student@10qchallenge.in', '+919812345678', '$2a$11$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 1, 1, 1, SYSUTCDATETIME());

    INSERT INTO dbo.UserRoles (UserId, RoleId) VALUES (@StudentId, 6);

    INSERT INTO dbo.StudentProfiles (UserId, TargetExam, TargetYear, CurrentClass, State, City, ReferralCode)
    VALUES (@StudentId, 'BITSAT', 2026, 'Class 12', 'Maharashtra', 'Mumbai', '10QSTUDENT');
END

-- 3. FACULTY PROFILES
IF NOT EXISTS (SELECT 1 FROM dbo.FacultyProfiles WHERE FullName = 'Ritesh Sir')
BEGIN
    INSERT INTO dbo.FacultyProfiles (FullName, Designation, AlmaMater, Bio, PhotoUrl, DisplayOrder)
    VALUES 
    ('Ritesh Sir', 'Lead Mentor & Founder', 'BITS Pilani Alum', 'Ranker mentor with 7+ years of coaching experience guiding 10,000+ students into top BITS Pilani & IIT campuses.', '/site/assets/img/instructor/instructor-01.jpg', 1),
    ('Dr. K. S. Verma', 'Senior Physics Faculty', 'IIT Kanpur', 'Ex-Allen HOD, author of premier competitive physics problem sets with deep insights into BITSAT speed techniques.', '/site/assets/img/instructor/instructor-02.jpg', 2),
    ('Prof. Ananya Sen', 'Mathematics & Speed Strategist', 'ISI Kolkata', 'Specialist in rapid algebra, calculus, and logical reasoning shortcuts for time-pressured engineering exams.', '/site/assets/img/instructor/instructor-03.jpg', 3);
END

-- 4. EXAMS
IF NOT EXISTS (SELECT 1 FROM dbo.Exams WHERE Slug = 'bitsat')
BEGIN
    INSERT INTO dbo.Exams (Name, Slug, Description, HeroHeading, HeroSubheading, IconUrl, BannerUrl, DisplayOrder, IsActive)
    VALUES 
    ('BITSAT', 'bitsat', 'Birla Institute of Technology and Science Admission Test for Pilani, Goa, and Hyderabad campuses.', 'Crack BITSAT 2026 with 350+ Strategy', 'Master high-speed accuracy, exclusive bonus question tactics, and complete syllabus mastery with BITS Pilani alumni.', '/site/assets/img/category/category-01.svg', '/site/assets/img/banner/banner1.png', 1, 1),
    ('JEE', 'jee', 'Joint Entrance Examination (Main & Advanced) for premier IITs, NITs, and IIITs.', 'Target Top 1% in JEE Main & Advanced', 'Comprehensive concept clarity, high-yield question banks, and exhaustive test series.', '/site/assets/img/category/category-02.svg', '/site/assets/img/banner/banner2.png', 2, 1),
    ('COMEDK', 'comedk', 'Undergraduate Entrance Test for top Karnataka engineering institutions.', 'Ace COMEDK UGET 2026', 'Target RVCE, BMSCE, and MSRIT with focused speed practice and past year pattern mocks.', '/site/assets/img/category/category-03.svg', '/site/assets/img/banner/banner-bg-01.png', 3, 1),
    ('MET', 'met', 'Manipal Entrance Test for engineering admissions at MAHE Manipal, Bengaluru, and Jaipur.', 'Secure Your Dream Branch at Manipal', 'High-speed mock papers and chapter-wise formula drill boosters.', '/site/assets/img/category/category-04.svg', '/site/assets/img/banner/banner-bg-02.png', 4, 1),
    ('VITEEE', 'viteee', 'Vellore Institute of Technology Engineering Entrance Exam.', 'Crack VITEEE 2026 with Rank < 1000', 'Master VITEEE speed techniques, English aptitude, and high-frequency problem sets.', '/site/assets/img/category/category-05.svg', '/site/assets/img/banner/banner-book.png', 5, 1);
END

-- 5. COURSES
DECLARE @BitsatId INT = (SELECT Id FROM dbo.Exams WHERE Slug = 'bitsat');
DECLARE @JeeId INT = (SELECT Id FROM dbo.Exams WHERE Slug = 'jee');
DECLARE @ComedkId INT = (SELECT Id FROM dbo.Exams WHERE Slug = 'comedk');

IF NOT EXISTS (SELECT 1 FROM dbo.Courses WHERE Slug = 'bitsat-champions-2026')
BEGIN
    INSERT INTO dbo.Courses (ExamId, Title, Slug, ShortDescription, FullDescriptionHtml, Price, OriginalPrice, DiscountPercent, ValidityDays, EnrolledStudentCount, ThumbnailUrl, BannerUrl, TrailerVimeoId, IsFeatured, IsShowInIndex, IsMentorship, IsTestSeries, IsPublished, DisplayOrder)
    VALUES 
    (@BitsatId, 'BITSAT Champions Full Prep Course 2026', 'bitsat-champions-2026', 'The ultimate end-to-end BITSAT preparation package: HD video lectures, chapter notes, 30+ full mock tests, speed mastery, and 1-on-1 mentorship.', 
    '<h3>The Most Comprehensive BITSAT 2026 Program</h3><p>Engineered specifically for serious BITSAT aspirants aiming for BITS Pilani Computer Science and top branches. Learn the exact speed-solving shortcuts, bonus question strategies, and time management hacks developed by top rankers.</p><ul><li>Complete Video Lectures covering Physics, Chemistry, Mathematics, English Proficiency, and Logical Reasoning.</li><li>30+ Full Length CBT Mock Tests mirroring the exact BITSAT testing interface.</li><li>Detailed step-by-step video solutions and formula books for rapid revision.</li><li>Dedicated doubt clearance portal with 24-hour response SLA.</li></ul>', 
    4999.00, 9999.00, 50.00, 365, 1420, '/site/assets/img/course/course-01.jpg', '/site/assets/img/course/course-details-bg.jpg', '76979871', 1, 1, 0, 0, 1, 1),

    (@BitsatId, 'BITSAT 2026 Speed & Accuracy Test Series', 'bitsat-test-series-2026', '35 Full-Length Computer-Based Mock Tests with instant analytics, percentile prediction, and bonus question simulation.', 
    '<h3>Master Time Management for BITSAT</h3><p>Practice in an authentic simulation of the BITSAT exam portal with 130 core questions + 12 unlockable bonus questions.</p>', 
    1499.00, 2999.00, 50.00, 180, 2890, '/site/assets/img/course/course-02.jpg', '/site/assets/img/course/course-details-bg.jpg', '76979871', 1, 1, 0, 1, 1, 2),

    (@BitsatId, '1-on-1 Elite BITSAT Mentorship Program', 'bitsat-elite-mentorship', 'Personalized strategy roadmap, weekly progress calls, score optimization sessions, and direct guidance from BITS Pilani seniors.', 
    '<h3>Your Personal Guide to BITS Pilani</h3><p>Get paired with top BITS Pilani rankers who analyze your mock test patterns, fix weaknesses, and build your customized score-boosting timetable.</p>', 
    3499.00, 6999.00, 50.00, 180, 480, '/site/assets/img/course/course-03.jpg', '/site/assets/img/course/course-details-bg.jpg', '76979871', 1, 1, 1, 0, 1, 3),

    (@JeeId, 'JEE Main High-Yield Crash Batch 2026', 'jee-main-crash-batch', 'Target 99+ Percentile with targeted chapter sprints, top 500 must-solve problems, and full-length NTA pattern tests.', 
    '<h3>Intensive Problem-Solving for JEE Main</h3><p>Crisp formula revisions and problem-solving masterclasses covering the most frequently tested topics.</p>', 
    3999.00, 7999.00, 50.00, 240, 930, '/site/assets/img/course/course-04.jpg', '/site/assets/img/course/course-details-bg.jpg', '76979871', 1, 1, 0, 0, 1, 4),

    (@ComedkId, 'COMEDK & MET High Yield Booster 2026', 'comedk-met-booster', 'Specialized speed test series and shortcut tricks tailored for RVCE, BMSCE, and Manipal aspirants.', 
    '<h3>Maximize Your Score in South India Premier Entrances</h3><p>Targeted shortcut modules and 20 full-length practice tests.</p>', 
    1999.00, 3999.00, 50.00, 180, 640, '/site/assets/img/course/course-05.jpg', '/site/assets/img/course/course-details-bg.jpg', '76979871', 0, 1, 0, 1, 1, 5);
END

-- 6. COURSE FAQS
DECLARE @Course1Id INT = (SELECT Id FROM dbo.Courses WHERE Slug = 'bitsat-champions-2026');
IF NOT EXISTS (SELECT 1 FROM dbo.CourseFaqs WHERE CourseId = @Course1Id)
BEGIN
    INSERT INTO dbo.CourseFaqs (CourseId, Question, AnswerHtml, DisplayOrder)
    VALUES 
    (@Course1Id, 'Is this course updated for the BITSAT 2026 pattern?', '<p>Yes, all lectures, mock tests, and questions strictly follow the latest 130 questions format (+12 Bonus questions) with negative marking rules.</p>', 1),
    (@Course1Id, 'Can I access the video lectures on both mobile and laptop?', '<p>Yes, the 10Q Challenge classroom is fully responsive and accessible seamlessly across laptops, tablets, and smartphones.</p>', 2),
    (@Course1Id, 'How does the Doubt Clearance system work?', '<p>Students can click "Raise Doubt" directly on any video lecture or test question. Our mentors and faculty answer with complete step-by-step explanations within 24 hours.</p>', 3),
    (@Course1Id, 'How long is the course validity?', '<p>The course remains active until the final session of BITSAT 2026 examinations.</p>', 4);
END

-- 7. SUBJECTS, CHAPTERS, LESSONS
IF NOT EXISTS (SELECT 1 FROM dbo.Subjects WHERE CourseId = @Course1Id AND Name = 'Physics')
BEGIN
    -- Subjects
    INSERT INTO dbo.Subjects (CourseId, Name, Code, DisplayOrder) VALUES
    (@Course1Id, 'Physics', 'PHY', 1),
    (@Course1Id, 'Chemistry', 'CHEM', 2),
    (@Course1Id, 'Mathematics', 'MATH', 3),
    (@Course1Id, 'English & Logical Reasoning', 'ELR', 4);

    DECLARE @PhyId INT = (SELECT Id FROM dbo.Subjects WHERE CourseId = @Course1Id AND Name = 'Physics');
    DECLARE @MathId INT = (SELECT Id FROM dbo.Subjects WHERE CourseId = @Course1Id AND Name = 'Mathematics');

    -- Chapters
    INSERT INTO dbo.Chapters (SubjectId, Name, Description, DisplayOrder) VALUES
    (@PhyId, 'Electrostatics & Capacitance', 'Electric charges, Coulomb law, electric field, potential, Gauss law, and capacitor circuits.', 1),
    (@PhyId, 'Current Electricity & Magnetism', 'Ohm law, Kirchhoff laws, magnetic force, Biot-Savart law, and electromagnetic induction.', 2),
    (@MathId, 'Calculus & Functions', 'Limits, continuity, differentiability, maxima-minima, and definite integrals.', 1),
    (@MathId, 'Vectors & 3D Geometry', 'Dot/cross products, lines in 3D, and planes in coordinate geometry.', 2);

    DECLARE @Chap1Id INT = (SELECT Id FROM dbo.Chapters WHERE SubjectId = @PhyId AND Name = 'Electrostatics & Capacitance');

    -- Lessons
    INSERT INTO dbo.Lessons (ChapterId, Title, BriefDescription, LessonType, VimeoVideoId, DurationSeconds, IsFreePreview, DisplayOrder) VALUES
    (@Chap1Id, 'Coulomb Law & Superposition Principle', 'Understanding electric forces, vector form of Coulomb law, and equilibrium problems.', 'Video', '76979871', 2700, 1, 1),
    (@Chap1Id, 'Electric Field Intensity & Dipoles', 'Field calculations for rings, lines, sheets, and electric dipole torque/potential.', 'Video', '76979871', 3120, 0, 2),
    (@Chap1Id, 'Gauss Law Applications & Flux Mastery', 'Symmetry considerations, spherical conductors, and non-conducting charge distributions.', 'Video', '76979871', 2940, 0, 3),
    (@Chap1Id, 'Electrostatics Comprehensive Formula Notes', 'High-yield formula summary and rapid memory cheatsheet for BITSAT.', 'Document', NULL, 0, 1, 4);

    DECLARE @Lesson4Id INT = (SELECT Id FROM dbo.Lessons WHERE ChapterId = @Chap1Id AND Title = 'Electrostatics Comprehensive Formula Notes');
    INSERT INTO dbo.LessonResources (LessonId, Title, ResourceUrl, ResourceType) VALUES
    (@Lesson4Id, 'Electrostatics_BITSAT_Formula_Cheatsheet.pdf', '/assets/docs/electrostatics-cheatsheet.pdf', 'PDF');
END

-- 8. QUESTIONS & TEST PAPERS
IF NOT EXISTS (SELECT 1 FROM dbo.TestPapers WHERE CourseId = @Course1Id)
BEGIN
    INSERT INTO dbo.TestPapers (CourseId, Title, Description, DurationMinutes, TotalMarks, MarksPerCorrect, NegativeMarks, TotalQuestions, BonusQuestions, IsFreeTest, DisplayOrder)
    VALUES 
    (@Course1Id, 'BITSAT 2026 Full Length Mock Test - 01', 'Full 130-question diagnostic test following exact NTA/BITS testing pattern with 12 unlockable bonus questions.', 180, 390.00, 3.00, 1.00, 130, 12, 1, 1),
    (@Course1Id, 'BITSAT 2026 Full Length Mock Test - 02', 'High-speed exam simulation with focus on calculus, thermodynamics, and organic chemistry mechanisms.', 180, 390.00, 3.00, 1.00, 130, 12, 0, 2);

    DECLARE @Test1Id INT = (SELECT Id FROM dbo.TestPapers WHERE CourseId = @Course1Id AND Title = 'BITSAT 2026 Full Length Mock Test - 01');
    DECLARE @PhySubId INT = (SELECT Id FROM dbo.Subjects WHERE CourseId = @Course1Id AND Name = 'Physics');

    -- Insert Sample Questions with Math/LaTeX
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, Difficulty, ExplanationHtml)
    VALUES 
    (@PhySubId, 1, '<p>Two point charges $+q$ and $-q$ are placed at distance $d$ apart. What is the electric field at the midpoint between them?</p>', 'Zero', '$$\frac{8kq}{d^2}$$', '$$\frac{4kq}{d^2}$$', '$$\frac{2kq}{d^2}$$', 'B', 1, '<p>At the midpoint $r = d/2$. Fields due to $+q$ and $-q$ are in the same direction: $E = \frac{kq}{(d/2)^2} + \frac{kq}{(d/2)^2} = \frac{4kq}{d^2} + \frac{4kq}{d^2} = \frac{8kq}{d^2}$.</p>'),
    (@PhySubId, 1, '<p>A parallel plate capacitor of capacitance $C$ is charged to potential $V$. If a dielectric slab of dielectric constant $K=4$ is inserted while disconnected from battery, the new stored energy is:</p>', '$$4U$$', '$$U/4$$', '$$2U$$', '$$U$$', 'B', 2, '<p>When disconnected from battery, charge $Q$ is conserved. $U = \frac{Q^2}{2C}$. With dielectric, $C'' = KC = 4C$, so $U'' = \frac{Q^2}{2(4C)} = \frac{U}{4}$.</p>'),
    (@PhySubId, 2, '<p>Calculate the equivalent resistance (in $\Omega$) between terminals A and B of an infinite ladder network with $1\Omega$ resistors.</p>', NULL, NULL, NULL, NULL, NULL, 3, '<p>Let equivalent resistance be $R$. Then $R = 1 + \frac{1 \cdot R}{1 + R} \implies R^2 - R - 1 = 0 \implies R = \frac{1+\sqrt{5}}{2} \approx 1.618\Omega$.</p>');

    DECLARE @Q1Id INT = (SELECT TOP 1 Id FROM dbo.Questions WHERE QuestionType = 1 ORDER BY Id DESC);
    UPDATE dbo.Questions SET NumericalAnswer = 1.6180, NumericalTolerance = 0.05 WHERE QuestionType = 2;

    DECLARE @Q2Id INT = (SELECT TOP 1 Id FROM dbo.Questions WHERE QuestionType = 2 ORDER BY Id DESC);

    INSERT INTO dbo.TestPaperQuestions (TestPaperId, QuestionId, SectionName, SortOrder, IsBonusQuestion) VALUES
    (@Test1Id, @Q1Id, 'Physics', 1, 0),
    (@Test1Id, @Q2Id, 'Physics', 2, 0);
END

-- 9. BLOG POSTS (100% CONTENT PRESERVED)
IF NOT EXISTS (SELECT 1 FROM dbo.BlogPosts WHERE Slug = 'how-to-score-350-plus-in-bitsat-2026')
BEGIN
    INSERT INTO dbo.BlogPosts (ExamId, Title, Slug, Excerpt, ContentHtml, ThumbnailUrl, BannerUrl, AltTagThumbnail, AltTagBanner, AuthorName, ReadingTimeMinutes, IsPublished, PublishedAtUtc)
    VALUES 
    (@BitsatId, 'How to Score 350+ in BITSAT 2026: Complete Strategy Guide', 'how-to-score-350-plus-in-bitsat-2026', 
    'A step-by-step master roadmap for scoring 350+ in BITSAT 2026. Discover time allocation hacks, bonus question strategies, and subject-wise priorities.',
    '<h2>The Mindset for a 350+ BITSAT Score</h2><p>BITSAT is fundamentally an examination of <strong>speed and accuracy</strong> rather than deep theoretical derivation. While JEE Advanced tests conceptual endurance on tricky multi-concept problems, BITSAT rewards candidates who can solve 130 standard to moderate questions in 180 minutes with minimal errors.</p><h3>1. Time Allocation Breakdown (180 Minutes)</h3><ul><li><strong>Mathematics (40 Questions):</strong> 65 Minutes</li><li><strong>Physics (30 Questions):</strong> 40 Minutes</li><li><strong>Chemistry (30 Questions):</strong> 30 Minutes</li><li><strong>English & Logical Reasoning (30 Questions):</strong> 25 Minutes</li><li><strong>Buffer & Bonus Questions (12 Questions):</strong> 20 Minutes</li></ul><h3>2. The Bonus Question Strategy</h3><p>To unlock the 12 bonus questions (3 Physics, 3 Chemistry, 3 Math, 3 Logical Reasoning), you must attempt all 130 questions. Never guess blindly to unlock bonus questions. Ensure you have at least 115+ confident answers before attempting the remaining questions.</p>',
    '/site/assets/img/blog/blog-1.jpg', '/site/assets/img/blog/blog-detail-image.jpg', 'BITSAT 2026 Strategy Guide', 'BITSAT Strategy Banner', 'Ritesh (Lead BITSAT Mentor)', 8, 1, SYSUTCDATETIME()),

    (@BitsatId, 'BITSAT 2026 High Weightage Chapters & Topic Analysis', 'bitsat-2026-high-weightage-chapters-analysis', 
    'Detailed subject-wise weightage breakdown for BITSAT 2026 across Physics, Chemistry, and Mathematics based on 10-year question trends.',
    '<h2>Subject-Wise High-Yield Chapters</h2><p>Focusing on the highest yield chapters gives you the maximum ROI in the final 60 days before the exam.</p><h3>Physics High Yield</h3><ul><li>Modern Physics & Semiconductors (4-5 Questions)</li><li>Current Electricity & Capacitance (3-4 Questions)</li><li>Heat & Thermodynamics (3 Questions)</li><li>Ray Optics & Wave Optics (3 Questions)</li></ul><h3>Mathematics High Yield</h3><ul><li>Coordinate Geometry & Vectors/3D (8-10 Questions)</li><li>Definite Integrals & Differential Equations (5-6 Questions)</li><li>Matrices & Determinants (3-4 Questions)</li></ul>',
    '/site/assets/img/blog/blog-2.jpg', '/site/assets/img/blog/blog-detail-image.jpg', 'BITSAT High Weightage Chapters', 'BITSAT Analysis Banner', 'Ritesh (Lead BITSAT Mentor)', 6, 1, SYSUTCDATETIME()),

    (@JeeId, 'JEE Main vs BITSAT: Key Differences in Preparation & Strategy', 'jee-main-vs-bitsat-preparation-strategy-differences', 
    'Understand the fundamental differences between JEE Main and BITSAT speed requirements, marking schemes, and revision routines.',
    '<h2>Key Differences at a Glance</h2><p>While the syllabus is largely identical, the test dynamics differ significantly. JEE Main gives 180 minutes for 75 questions (~2.4 minutes per question), whereas BITSAT requires solving 130 questions in 180 minutes (~1.38 minutes per question).</p>',
    '/site/assets/img/blog/blog-3.jpg', '/site/assets/img/blog/blog-detail-image.jpg', 'JEE Main vs BITSAT Comparison', 'JEE vs BITSAT Banner', 'Academic Team', 5, 1, SYSUTCDATETIME());
END

-- 10. COUPONS
IF NOT EXISTS (SELECT 1 FROM dbo.Coupons WHERE Code = 'EARLYBIRD20')
BEGIN
    INSERT INTO dbo.Coupons (Code, DiscountType, DiscountValue, MinOrderAmount, MaxDiscountAmount, ValidFrom, ExpiresAt, UsageLimit, Description, IsActive)
    VALUES 
    ('EARLYBIRD20', 'Percentage', 20.00, 1000.00, 2000.00, SYSUTCDATETIME(), DATEADD(MONTH, 6, SYSUTCDATETIME()), 500, '20% discount on all full courses', 1),
    ('BITSAT500', 'Flat', 500.00, 1499.00, 500.00, SYSUTCDATETIME(), DATEADD(MONTH, 6, SYSUTCDATETIME()), 1000, 'Flat ₹500 discount on BITSAT preparation packages', 1),
    ('FESTIVE10', 'Percentage', 10.00, 500.00, 1000.00, SYSUTCDATETIME(), DATEADD(MONTH, 6, SYSUTCDATETIME()), 2000, '10% celebratory discount', 1);
END

-- 11. SEO METADATA
IF NOT EXISTS (SELECT 1 FROM dbo.SeoMetadata WHERE Path = '/')
BEGIN
    INSERT INTO dbo.SeoMetadata (Path, Title, Description, Keywords, CanonicalUrl, Robots, OgTitle, OgDescription, OgImageUrl)
    VALUES 
    ('/', '10Q Challenge - Best BITSAT, JEE & Engineering Entrance Preparation', 'Join 10Q Challenge for comprehensive BITSAT 2026 courses, authentic CBT mock test series, speed solving techniques, and 1-on-1 mentorship by BITS Pilani alumni.', 'BITSAT 2026, BITSAT mock tests, BITS Pilani preparation, JEE Main crash course, COMEDK coaching', 'https://10qchallenge.in/', 'index, follow', '10Q Challenge - Premier BITSAT & Engineering Test Prep', 'Master high-speed accuracy, exclusive bonus question tactics, and complete syllabus mastery with BITS Pilani alumni.', 'https://10qchallenge.in/site/assets/img/banner/banner1.png'),
    ('/about', 'About Us | 10Q Challenge', 'Learn about the mission, faculty, and top ranker mentors behind 10Q Challenge dedicated to engineering test preparation.', 'About 10Q Challenge, Ritesh BITS Pilani, engineering entrance coaching', 'https://10qchallenge.in/about', 'index, follow', 'About 10Q Challenge', 'Empowering engineering aspirants to achieve top ranks in BITSAT, JEE, and national entrance exams.', 'https://10qchallenge.in/site/assets/img/about/about-01.jpg'),
    ('/contact', 'Contact Us | 10Q Challenge', 'Get in touch with the 10Q Challenge support team for course inquiries, mentorship enrollment, and student guidance.', 'Contact 10Q Challenge, student support, BITSAT counseling', 'https://10qchallenge.in/contact', 'index, follow', 'Contact 10Q Challenge Support', 'We are here to assist with any questions about our courses and test series.', 'https://10qchallenge.in/site/assets/img/banner/banner2.png'),
    ('/course-all', 'All Engineering Courses & Test Series | 10Q Challenge', 'Browse our complete catalog of BITSAT, JEE, COMEDK, MET, and VITEEE preparation batches, test series, and mentorship programs.', 'BITSAT courses, JEE prep batches, COMEDK test series, engineering entrance courses', 'https://10qchallenge.in/course-all', 'index, follow', 'Explore 10Q Challenge Courses', 'Select your target exam and start your structured preparation today.', 'https://10qchallenge.in/site/assets/img/course/course-01.jpg'),
    ('/blog', 'BITSAT & JEE Preparation Articles & Guides | 10Q Challenge Blog', 'Read expert preparation strategies, high weightage chapter analysis, exam date updates, and speed tricks by top rankers on 10Q Challenge Blog.', 'BITSAT blog, engineering preparation articles, exam tips, BITS Pilani guides', 'https://10qchallenge.in/blog', 'index, follow', '10Q Challenge Blog & Strategy Hub', 'Expert articles and tips for BITSAT and competitive engineering exams.', 'https://10qchallenge.in/site/assets/img/blog/blog-1.jpg');
END

-- 12. REDIRECT RULES
IF NOT EXISTS (SELECT 1 FROM dbo.RedirectRules WHERE SourcePath = '/sign-in')
BEGIN
    INSERT INTO dbo.RedirectRules (SourcePath, TargetPath, StatusCode, IsActive)
    VALUES 
    ('/sign-in', '/login', 301, 1),
    ('/login/sign-in', '/login', 301, 1),
    ('/sign-up', '/register', 301, 1),
    ('/course-list', '/course-all', 301, 1),
    ('/student-index', '/student/dashboard', 301, 1),
    ('/student-course-list', '/student/courses', 301, 1);
END

-- 13. SITE NOTIFICATIONS
IF NOT EXISTS (SELECT 1 FROM dbo.SiteNotifications WHERE Message LIKE '%BITSAT 2026%')
BEGIN
    INSERT INTO dbo.SiteNotifications (Message, LinkUrl, ShowFrom, ShowTo, IsActive)
    VALUES 
    ('🎉 BITSAT 2026 Champions Batch is now LIVE! Use code BITSAT500 for flat ₹500 off.', '/course-detail/bitsat-champions-2026', SYSUTCDATETIME(), DATEADD(MONTH, 3, SYSUTCDATETIME()), 1);
END

PRINT '10Q Challenge Seed Data successfully inserted.';
GO
