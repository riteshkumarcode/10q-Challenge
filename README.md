# 10Q Challenge — Premier BITSAT, JEE & Engineering Exam Prep Platform

![10Q Challenge Platform Banner](/frontend/public/site/assets/images/og-banner.jpg)

> **Official Website:** [https://10qchallenge.in/](https://10qchallenge.in/)  
> **Target Exams:** BITSAT, JEE Main, JEE Advanced, COMEDK, MET (Manipal), VITEEE.

---

## 1. Project Overview & Architecture

The 10Q Challenge platform is a high-performance EdTech platform built with a modern, decoupled architecture:
- **Frontend**: Next.js 14+ (App Router), React 19, TypeScript, Tailwind CSS, KaTeX LaTeX math formula rendering, and Vimeo Player SDK.
- **Backend API**: ASP.NET Core 8.0 Web API Clean Architecture (`API`, `Application`, `Domain`, `Infrastructure`).
- **Database**: Microsoft SQL Server with 28 normalized tables (3NF), composite indexes, and seed data.
- **Payment Gateway**: PayU Payment Integration with SHA-512 cryptographic forward & reverse hash validation.

---

## 2. Key Features

### 🌟 High-Conversion Public Website
- **Target Exam Hubs**: Dedicated landing pages for BITSAT, JEE Main, JEE Advanced, COMEDK, MET, and VITEEE.
- **Interactive Course Catalog**: Filter courses by Exam, Category (Crash Course, Test Series, Mentorship), and sort by price/rating.
- **Rich Course Detail Pages**: Curriculum modules accordion with duration badges, faculty profiles, demo video modals, and sticky checkout bars.
- **SEO & 301 Permanent Redirects**: Automated XML sitemap generation (`/sitemap.xml`), `robots.txt`, dynamic metadata, and 301 redirects for all legacy URLs.
- **Knowledge & Strategy Hub**: Rich blog guides with KaTeX math formula rendering, reading time, and author bios.

### 🎓 Student LMS Learning Platform (`/student/*`)
- **Interactive Classroom**: HD Vimeo video player with speed controls (0.75x–2.0x), timestamp bookmarking, downloadable lecture notes (PDF), and lesson checklist.
- **Authentic CBT Test Series Engine**: Exact NTA & BITSAT examination simulator interface featuring 130 questions + 12 bonus question logic, countdown timer, question palette matrix, numerical keypad, and instant scorecards.
- **1-on-1 Faculty Doubt Hub**: Submit doubts with video timestamps and screenshot attachments. Get step-by-step verified LaTeX solutions.
- **GST Invoices & Receipts**: Printable PDF tax receipts for all enrolled courses.

### 🛡️ Admin Operations CMS (`/admin/*`)
- **Operations Dashboard**: Real-time revenue analytics, active student tracking, and PayU order auditing.
- **Course & Curriculum Builder**: Create and edit courses, manage chapter playlists, pricing, and Vimeo IDs.
- **LaTeX Question Bank**: Create and edit single MCQ & numerical questions with live KaTeX preview.
- **Doubt Moderation Center**: Review student queries and publish mathematical solutions.
- **Blog & SEO CMS**: Publish articles and manage 301 redirect rules.

---

## 3. Getting Started & Running Locally

### Prerequisites
- Node.js v20+ & npm
- .NET 8.0 SDK (optional for backend API)
- Docker & Docker Compose (optional for containerized deployment)

### A. Run Frontend Locally:
```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```
Open **`http://localhost:3000`** in your browser.

- **Demo Student Login**: Sign in as `student@10qchallenge.in` or click **Student Demo** on `/login`.
- **Demo Admin CMS Login**: Sign in as `admin@10qchallenge.in` or click **Admin Demo** on `/login`.

### B. Run Full Stack with Docker:
```bash
docker-compose up --build -d
```
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/swagger`
- SQL Server: `localhost:1433`

---

## 4. Database Setup & Migrations

To apply database tables and seed data to SQL Server:
```sql
-- 1. Execute schema creation
sqlcmd -S localhost -U sa -P YourStrong@Pass123! -i database/10QChallenge_DbSchema.sql

-- 2. Execute seed data (exams, courses, blogs, questions)
sqlcmd -S localhost -U sa -P YourStrong@Pass123! -i database/10QChallenge_SeedData.sql
```

---

## 5. Security & Payment Integrity
- **PayU SHA-512 Verification**: Forward hash computed on backend (`Key|TxnId|Amount|ProductInfo|Name|Email|...|Salt`). Inbound webhook strictly verifies reverse hash (`Salt|Status|...|Key`). Salt is never exposed to browser.
- **Zero URL Loss Guarantee**: All legacy URLs (`/sign-in`, `/sign-up`, `/course-list`, `/student-index`) configured with HTTP 301 permanent redirects in `frontend/next.config.ts`.
