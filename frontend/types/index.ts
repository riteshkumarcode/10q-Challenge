export type CourseCategory =
  | 'CRASH_COURSE'
  | 'TEST_SERIES'
  | 'MENTORSHIP'
  | 'FULL_COURSE';

export interface Lesson {
  id: number;
  chapterId?: number;
  title: string;
  vimeoVideoId?: string;
  durationMinutes?: number;
  durationSeconds?: number;
  isFreePreview?: boolean;
  pdfNotesUrl?: string;
}

export interface Chapter {
  id: number;
  title: string;
  name?: string;
  sequenceOrder?: number;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  description?: string;
  fullDescriptionHtml?: string;
  discountPrice: number;
  originalPrice: number;
  price?: number;
  examTag: string;
  category: CourseCategory | string;
  rating: number;
  reviewCount: number;
  enrolledCount: number;
  thumbnailUrl: string;
  bannerUrl?: string;
  isBestseller?: boolean;
  isFeatured?: boolean;
  features: string[];
  chapters?: Chapter[];
}

export interface QuestionOption {
  key: string;
  text: string;
}

export interface Question {
  id: number;
  subject: string;
  chapter?: string;
  type: 'MCQ' | 'NUMERICAL' | string;
  questionText: string;
  options: QuestionOption[];
  correctOption?: string;
  marksPositive: number;
  marksNegative: number;
  explanation?: string;
}

export interface TestPaper {
  id: number;
  title: string;
  examTag?: string;
  durationMinutes: number;
  totalMarks: number;
  totalQuestions?: number;
  questions?: Question[];
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  category: string;
  summary: string;
  contentHtml: string;
  featuredImage?: string;
  authorName: string;
  authorRole?: string;
  readTimeMinutes: number;
  publishedAt: string;
  isPublished: boolean;
  tags: string[];
}

export interface Testimonial {
  id: number;
  studentName: string;
  college?: string;
  exam?: string;
  score?: string;
  rating: number;
  content: string;
  avatarUrl?: string;
}

export interface Faculty {
  id: number;
  name: string;
  qualification: string;
  specialization: string;
  experienceYears: number;
  studentsMentored: number;
  avatarUrl: string;
}

export interface Doubt {
  id: number;
  studentId: number | string;
  studentName: string;
  courseId: number;
  courseTitle: string;
  lessonId?: number;
  lessonTitle?: string;
  queryText: string;
  timestampMinutes?: string;
  screenshotUrl?: string;
  status: 'PENDING' | 'RESOLVED' | string;
  facultyName?: string;
  solutionText?: string;
  createdAt: string;
  solvedAt?: string;
}

export interface OrderItem {
  courseId: number;
  courseTitle: string;
  price: number;
}

export interface Order {
  id: number | string;
  orderNumber: string;
  studentId?: number | string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  items: OrderItem[];
  subtotalAmount: number;
  discountAmount: number;
  totalAmount: number;
  couponCode?: string;
  paymentGateway: string;
  gatewayTxnId?: string;
  paymentStatus: string;
  createdAt: string;
}

export interface User {
  id: number | string;
  fullName: string;
  email: string;
  mobileNumber?: string;
  role: 'STUDENT' | 'ADMIN' | 'FACULTY' | string;
  targetExam?: string;
  avatarUrl?: string;
}

export interface Coupon {
  id: number;
  code: string;
  discountType: 'PERCENTAGE' | 'FLAT' | string;
  discountValue: number;
  minOrderAmount: number;
  description?: string;
  isActive: boolean;
}

export interface Exam {
  id: number;
  name: string;
  fullName: string;
  slug: string;
  description: string;
  totalMarks?: number;
  durationMinutes?: number;
}
