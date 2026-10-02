# 01 - Old System Audit & Technical Assessment

## 1. Executive Summary
The legacy **10Q Challenge** platform (`https://10qchallenge.in/`) is a split-architecture e-learning and test-prep web platform. It was constructed using two distinct Microsoft .NET applications:
1. **eLearningWebAPIMVC5**: A legacy ASP.NET Web API 2 application (.NET Framework 4.8) providing REST endpoints for database operations, student management, course delivery, test series execution, doubts, and payment processing.
2. **eLearning (App)**: An ASP.NET Core MVC application (.NET 8.0) serving server-rendered Razor views coupled with extensive client-side jQuery and vanilla JavaScript AJAX calls back to the Web API backend.

While the application supports critical business workflows (Courses, Test Series, Doubts, Invoices, PayU Checkout, Blogs, and basic SEO meta tags), the codebase suffers from severe architectural fragmentation, security vulnerabilities, performance bottlenecks, and maintainability hurdles that impede scaling.

---

## 2. Technology Stack Breakdown

| Component | Legacy Technology | Target Framework / Version | Status / Notes |
|---|---|---|---|
| **Backend Web API** | ASP.NET Web API 2 | .NET Framework 4.8 | Monolithic, legacy OWIN/System.Web hosting |
| **Frontend Web App** | ASP.NET Core MVC | .NET 8.0 (`net8.0`) | Razor Views + jQuery AJAX architecture |
| **Database Access** | ADO.NET (Raw SQL) | `System.Data.SqlClient` 4.8.6 | Inline SQL string concatenation, no ORM |
| **Database Engine** | Microsoft SQL Server | T-SQL | Multiple stored procedures and inline queries |
| **Authentication** | Custom JWT Token | `System.IdentityModel.Tokens.Jwt` | Hardcoded symmetric key, insecure storage |
| **Payment Gateway** | PayU (Hosted Form & Webhook) | Custom SHA-512 Form Post | Incomplete verification, hardcoded endpoints |
| **Video Delivery** | Vimeo / Direct iframe | Raw iframe embed | Unrestricted iframe injection, no DRM abstraction |
| **Rich Text Editor** | CKEditor 4 / Summernote | Legacy JS plugins | XSS vulnerability vectors |
| **Client UI Framework**| Bootstrap 4 / AdminLTE-like | Custom CSS + SCSS | Heavy CSS bundles, unoptimized assets |
| **Logging** | Serilog & Text File Loggers | `Serilog.AspNetCore` 6.1.0 | Logs errors only, file sink in app directory |

---

## 3. Architecture & Codebase Inspection

### 3.1 Backend Architecture (`eLearningWebAPIMVC5`)
- **Structure**:
  - `Controllers/`: 27 API Controllers inheriting from `System.Web.Http.ApiController`.
  - `DataLayer/`: 27 Data Access classes (`clsDL*`) executing ADO.NET queries against `SqlConnection`.
  - `Models/`: 35 Data models / DTOs (`clsBL*`) representing domain entities and request payloads.
  - `App_Start/`: `WebApiConfig.cs` enabling CORS and attribute routing.
- **Data Access Pattern**:
  - Direct SQL queries constructed with string concatenation and parameters.
  - No repository pattern or unit of work.
  - Frequent instantiation of `SqlConnection` per method call with manual transaction management (`SqlTransaction`).

### 3.2 Frontend Architecture (`eLearning_App`)
- **Structure**:
  - `Controllers/`: 15 MVC Controllers handling route resolution, view rendering, and thin proxy actions.
  - `Views/`: 10 View directories (`Admin`, `Chapter`, `Coupon`, `ExamMaster`, `Link`, `Login`, `Payment`, `Shared`, `Site`, `Student`).
  - `Services/`: `MetaService.cs`, `PaymentService.cs`, `ExamService.cs`, `CourseService.cs`.
  - `wwwroot/jsCode/`: 53 client-side JavaScript files executing asynchronous `fetch()` calls to the API.
- **Client-Server Communication**:
  - Hybrid model: MVC controller renders the HTML container layout, while client-side JS (`DOMContentLoaded`) fires AJAX requests to the Web API to fetch and render JSON payloads via innerHTML string template interpolation.

---

## 4. Key Critical Findings & Technical Debt

1. **Security - Hardcoded Secrets**:
   - JWT Secret Key hardcoded in `JwtAuthorizeAttribute.cs`: `"hEMn3MZp7rpta5MAhEMn4KYp9rpuB5MB"`.
   - PayU keys and test endpoints scattered across configuration files.
2. **Security - Insecure Authentication & Authorization**:
   - Student Token key stored in browser `localStorage.getItem('userid')` and sent as a raw HTTP header `Token`.
   - Admin routes rely on client-side role checks and cookie reading without robust claim-based authorization middleware.
3. **Database - Lack of Relational Constraints & Schema Inconsistencies**:
   - Soft-delete flags (`IsDeleted`, `IsEnabled`, `IsActive`) inconsistently applied.
   - Heavy reliance on magic string `searchcriteria` in DataLayer queries (e.g. `site_blog_all`, `masterblog`, `bloglistindex_site`).
4. **SEO & Performance Weaknesses**:
   - Dynamic page content (Course details, blogs, exam details) populated via client-side JavaScript AJAX after initial page load, preventing search engine bots from parsing complete markup on first render.
   - Large unminified vendor asset libraries loaded globally on every page load.
5. **Payment Gateway Fragility**:
   - Incomplete idempotency handling: duplicate webhook callbacks could trigger redundant database updates.
   - Lack of cryptographic server-to-server transaction verification before activating enrollments.
