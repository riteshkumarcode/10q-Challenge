# 23 - Doubt Clearance System Architecture

## 1. Doubt Resolution Workflow

```mermaid
sequenceDiagram
    autonumber
    actor Student as Student
    participant Portal as Student Classroom
    participant API as ASP.NET Core API
    participant DB as SQL Server
    actor Mentor as Mentor / Admin

    Student->>Portal: Watching Lesson / Attempting Test
    Student->>Portal: Click "Raise Doubt"
    Portal->>API: POST /api/v1/student/doubts (LessonId, SubjectId, Text, Attachment)
    API->>DB: Insert Doubt (Status: Open)
    API-->>Portal: Return Doubt ID & Success Toast
    Mentor->>API: GET /api/v1/admin/doubts?status=Open
    Mentor->>API: POST /api/v1/admin/doubts/{doubtId}/reply (Text, Solution Image)
    API->>DB: Insert DoubtMessage & Update Doubt Status to Answered
    Student->>Portal: View Real-time Response & Reply if Clarification Needed
    Student->>Portal: Mark Doubt as Resolved (Status: Closed)
```

---

## 2. Feature Capabilities
- **Contextual Attachment**: Automatically captures the exact Course, Subject, Chapter, and Lesson (or Question ID) where the student initiated the query.
- **Rich Media**: Supports Markdown text, mathematical equations, and screenshot/PDF upload attachments.
- **Admin Filtering**: Instructors can filter doubts by Subject (Physics, Chemistry, Math), Course, Urgency, and Status (Open, In Review, Answered, Closed).
