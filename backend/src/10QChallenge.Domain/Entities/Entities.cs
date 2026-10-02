using System;
using System.Collections.Generic;

namespace _10QChallenge.Domain.Entities
{
    public enum UserRole
    {
        Student = 1,
        Faculty = 2,
        Admin = 3,
        SuperAdmin = 4
    }

    public enum QuestionType
    {
        MCQ = 1,
        Numerical = 2
    }

    public enum DoubtStatus
    {
        Pending = 1,
        Resolved = 2
    }

    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string? MobileNumber { get; set; }
        public UserRole Role { get; set; } = UserRole.Student;
        public string? TargetExam { get; set; }
        public bool IsEmailVerified { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Order> Orders { get; set; } = new List<Order>();
        public ICollection<Doubt> Doubts { get; set; } = new List<Doubt>();
    }

    public class Exam
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int TotalMarks { get; set; } = 390;
        public int DurationMinutes { get; set; } = 180;
        public bool IsActive { get; set; } = true;

        public ICollection<Course> Courses { get; set; } = new List<Course>();
    }

    public class Course
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string ShortDescription { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal DiscountPrice { get; set; }
        public decimal OriginalPrice { get; set; }
        public string ExamTag { get; set; } = "BITSAT";
        public string Category { get; set; } = "CRASH_COURSE";
        public decimal Rating { get; set; } = 4.9m;
        public int ReviewCount { get; set; } = 0;
        public int EnrolledCount { get; set; } = 0;
        public string ThumbnailUrl { get; set; } = string.Empty;
        public bool IsBestseller { get; set; } = true;
        public bool IsActive { get; set; } = true;

        public int? ExamId { get; set; }
        public Exam? Exam { get; set; }

        public ICollection<Chapter> Chapters { get; set; } = new List<Chapter>();
    }

    public class Chapter
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public Course? Course { get; set; }
        public string Title { get; set; } = string.Empty;
        public int SequenceOrder { get; set; } = 1;

        public ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
    }

    public class Lesson
    {
        public int Id { get; set; }
        public int ChapterId { get; set; }
        public Chapter? Chapter { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? VimeoVideoId { get; set; }
        public int DurationMinutes { get; set; } = 45;
        public bool IsFreePreview { get; set; } = false;
        public string? PdfNotesUrl { get; set; }
    }

    public class Question
    {
        public int Id { get; set; }
        public string Subject { get; set; } = "Physics";
        public string Chapter { get; set; } = string.Empty;
        public QuestionType Type { get; set; } = QuestionType.MCQ;
        public string QuestionText { get; set; } = string.Empty;
        public string OptionA { get; set; } = string.Empty;
        public string OptionB { get; set; } = string.Empty;
        public string OptionC { get; set; } = string.Empty;
        public string OptionD { get; set; } = string.Empty;
        public string CorrectOption { get; set; } = "A";
        public int MarksPositive { get; set; } = 3;
        public int MarksNegative { get; set; } = 1;
        public string Explanation { get; set; } = string.Empty;
    }

    public class TestPaper
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string ExamTag { get; set; } = "BITSAT";
        public int DurationMinutes { get; set; } = 180;
        public int TotalMarks { get; set; } = 390;
        public int TotalQuestions { get; set; } = 130;
    }

    public class Blog
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public string ContentHtml { get; set; } = string.Empty;
        public string FeaturedImage { get; set; } = string.Empty;
        public string AuthorName { get; set; } = string.Empty;
        public string AuthorRole { get; set; } = string.Empty;
        public int ReadTimeMinutes { get; set; } = 6;
        public DateTime PublishedAt { get; set; } = DateTime.UtcNow;
        public bool IsPublished { get; set; } = true;
        public string TagsCsv { get; set; } = string.Empty;
    }

    public class Doubt
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public User? Student { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public int CourseId { get; set; }
        public string CourseTitle { get; set; } = string.Empty;
        public int? LessonId { get; set; }
        public string? LessonTitle { get; set; }
        public string QueryText { get; set; } = string.Empty;
        public string? TimestampMinutes { get; set; }
        public string? ScreenshotUrl { get; set; }
        public DoubtStatus Status { get; set; } = DoubtStatus.Pending;
        public string? FacultyName { get; set; }
        public string? SolutionText { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? SolvedAt { get; set; }
    }

    public class Order
    {
        public int Id { get; set; }
        public string OrderNumber { get; set; } = string.Empty;
        public int StudentId { get; set; }
        public User? Student { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public string StudentEmail { get; set; } = string.Empty;
        public string? StudentPhone { get; set; }
        public decimal SubtotalAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TotalAmount { get; set; }
        public string? CouponCode { get; set; }
        public string PaymentGateway { get; set; } = "PayU";
        public string? GatewayTxnId { get; set; }
        public string PaymentStatus { get; set; } = "SUCCESS";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
    }

    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public int CourseId { get; set; }
        public string CourseTitle { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }

    public class Coupon
    {
        public int Id { get; set; }
        public string Code { get; set; } = string.Empty;
        public string DiscountType { get; set; } = "FLAT";
        public decimal DiscountValue { get; set; }
        public decimal MinOrderAmount { get; set; }
        public string Description { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }
}
