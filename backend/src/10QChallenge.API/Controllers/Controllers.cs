using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _10QChallenge.Domain.Entities;
using _10QChallenge.Infrastructure.Persistence;
using _10QChallenge.Infrastructure.Services;

namespace _10QChallenge.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public AuthController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
            {
                // Demo fallback response
                return Ok(new
                {
                    token = "demo_jwt_token_10q_challenge",
                    user = new { id = 101, fullName = "Aarav Sharma", email = request.Email, role = "Student" }
                });
            }
            return Ok(new
            {
                token = "demo_jwt_token_10q_challenge",
                user = new { id = user.Id, fullName = user.FullName, email = user.Email, role = user.Role.ToString() }
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var user = new User
            {
                FullName = request.FullName,
                Email = request.Email,
                MobileNumber = request.MobileNumber,
                TargetExam = request.TargetExam ?? "BITSAT",
                Role = UserRole.Student,
                CreatedAt = DateTime.UtcNow
            };
            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok(new
            {
                token = "demo_jwt_token_10q_challenge",
                user = new { id = user.Id, fullName = user.FullName, email = user.Email, role = "Student" }
            });
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class CoursesController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public CoursesController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetCourses([FromQuery] string? examTag, [FromQuery] string? category)
        {
            var query = _db.Courses.Include(c => c.Chapters).ThenInclude(ch => ch.Lessons).AsQueryable();

            if (!string.IsNullOrEmpty(examTag) && examTag != "ALL")
                query = query.Where(c => c.ExamTag == examTag);

            if (!string.IsNullOrEmpty(category) && category != "ALL")
                query = query.Where(c => c.Category == category);

            var list = await query.ToListAsync();
            return Ok(list);
        }

        [HttpGet("{slug}")]
        public async Task<IActionResult> GetCourseBySlug(string slug)
        {
            var course = await _db.Courses
                .Include(c => c.Chapters)
                .ThenInclude(ch => ch.Lessons)
                .FirstOrDefaultAsync(c => c.Slug == slug);

            if (course == null) return NotFound(new { message = "Course not found" });
            return Ok(course);
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly IPayUService _payUService;
        private readonly ApplicationDbContext _db;

        public PaymentsController(IPayUService payUService, ApplicationDbContext db)
        {
            _payUService = payUService;
            _db = db;
        }

        [HttpPost("initiate")]
        public IActionResult InitiatePayment([FromBody] PaymentInitiateRequest request)
        {
            string key = "PAYU_MERCHANT_KEY";
            string salt = "PAYU_MERCHANT_SALT";
            string txnId = $"10Q_{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}";

            string hash = _payUService.GenerateForwardHash(
                key,
                txnId,
                request.Amount,
                request.ProductInfo,
                request.StudentName,
                request.StudentEmail,
                salt
            );

            return Ok(new
            {
                key,
                txnid = txnId,
                amount = request.Amount,
                productinfo = request.ProductInfo,
                firstname = request.StudentName,
                email = request.StudentEmail,
                phone = request.StudentPhone,
                hash,
                surl = "https://10qchallenge.in/payment-success",
                furl = "https://10qchallenge.in/payment-failure"
            });
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> PayUWebhook([FromForm] PayUWebhookPayload payload)
        {
            string key = "PAYU_MERCHANT_KEY";
            string salt = "PAYU_MERCHANT_SALT";

            bool isValid = _payUService.VerifyReverseHash(
                payload.Status,
                payload.Email,
                payload.FirstName,
                payload.ProductInfo,
                payload.Amount,
                payload.TxnId,
                key,
                salt,
                payload.Hash
            );

            if (!isValid)
            {
                return BadRequest(new { message = "Cryptographic signature verification failed" });
            }

            var order = await _db.Orders.FirstOrDefaultAsync(o => o.GatewayTxnId == payload.TxnId);
            if (order != null)
            {
                order.PaymentStatus = payload.Status == "success" ? "SUCCESS" : "FAILED";
                await _db.SaveChangesAsync();
            }

            return Ok(new { status = "verified", txnId = payload.TxnId });
        }
    }

    // Supporting Request DTOs
    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class RegisterRequest
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? MobileNumber { get; set; }
        public string? TargetExam { get; set; }
        public string Password { get; set; } = string.Empty;
    }

    public class PaymentInitiateRequest
    {
        public decimal Amount { get; set; }
        public string ProductInfo { get; set; } = string.Empty;
        public string StudentName { get; set; } = string.Empty;
        public string StudentEmail { get; set; } = string.Empty;
        public string StudentPhone { get; set; } = string.Empty;
    }

    public class PayUWebhookPayload
    {
        public string Status { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string ProductInfo { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string TxnId { get; set; } = string.Empty;
        public string Hash { get; set; } = string.Empty;
    }
}
