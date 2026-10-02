using System;
using Microsoft.EntityFrameworkCore;
using _10QChallenge.Domain.Entities;

namespace _10QChallenge.Infrastructure.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users => Set<User>();
        public DbSet<Exam> Exams => Set<Exam>();
        public DbSet<Course> Courses => Set<Course>();
        public DbSet<Chapter> Chapters => Set<Chapter>();
        public DbSet<Lesson> Lessons => Set<Lesson>();
        public DbSet<Question> Questions => Set<Question>();
        public DbSet<TestPaper> TestPapers => Set<TestPaper>();
        public DbSet<Blog> Blogs => Set<Blog>();
        public DbSet<Doubt> Doubts => Set<Doubt>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<OrderItem> OrderItems => Set<OrderItem>();
        public DbSet<Coupon> Coupons => Set<Coupon>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.Email).HasMaxLength(150).IsRequired();
                entity.Property(e => e.FullName).HasMaxLength(100).IsRequired();
            });

            // Course configuration
            modelBuilder.Entity<Course>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Slug).IsUnique();
                entity.Property(e => e.DiscountPrice).HasColumnType("decimal(18,2)");
                entity.Property(e => e.OriginalPrice).HasColumnType("decimal(18,2)");
                entity.Property(e => e.Rating).HasColumnType("decimal(3,2)");

                entity.HasOne(e => e.Exam)
                      .WithMany(e => e.Courses)
                      .HasForeignKey(e => e.ExamId)
                      .OnDelete(DeleteBehavior.SetNull);
            });

            // Chapter & Lesson hierarchy
            modelBuilder.Entity<Chapter>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.Course)
                      .WithMany(c => c.Chapters)
                      .HasForeignKey(e => e.CourseId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Lesson>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.Chapter)
                      .WithMany(c => c.Lessons)
                      .HasForeignKey(e => e.ChapterId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Order & Items
            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.OrderNumber).IsUnique();
                entity.Property(e => e.SubtotalAmount).HasColumnType("decimal(18,2)");
                entity.Property(e => e.DiscountAmount).HasColumnType("decimal(18,2)");
                entity.Property(e => e.TotalAmount).HasColumnType("decimal(18,2)");

                entity.HasOne(e => e.Student)
                      .WithMany(u => u.Orders)
                      .HasForeignKey(e => e.StudentId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
                entity.HasOne(e => e.Order)
                      .WithMany(o => o.Items)
                      .HasForeignKey(e => e.OrderId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Doubt configuration
            modelBuilder.Entity<Doubt>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.Student)
                      .WithMany(u => u.Doubts)
                      .HasForeignKey(e => e.StudentId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Blog configuration
            modelBuilder.Entity<Blog>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Slug).IsUnique();
            });

            // Coupon configuration
            modelBuilder.Entity<Coupon>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Code).IsUnique();
                entity.Property(e => e.DiscountValue).HasColumnType("decimal(18,2)");
                entity.Property(e => e.MinOrderAmount).HasColumnType("decimal(18,2)");
            });
        }
    }
}
