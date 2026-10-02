import {
  Course,
  Blog,
  Exam,
  Question,
  TestPaper,
  Doubt,
  Order,
  User,
  Coupon,
} from '@/types';
import {
  MOCK_COURSES,
  MOCK_BLOGS,
  MOCK_EXAMS,
  MOCK_QUESTIONS,
  MOCK_TEST_PAPERS,
  MOCK_DOUBTS,
  MOCK_ORDERS,
  MOCK_COUPONS,
} from './data';

const STORAGE_KEYS = {
  COURSES: '10q_courses_data',
  BLOGS: '10q_blogs_data',
  DOUBTS: '10q_doubts_data',
  ORDERS: '10q_orders_data',
  QUESTIONS: '10q_questions_data',
  TESTS: '10q_tests_data',
};

function getFromStorage<T>(key: string, initialData: T): T {
  if (typeof window === 'undefined') return initialData;
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(item);
  } catch (e) {
    return initialData;
  }
}

function setToStorage<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Storage write error:', e);
  }
}

export const api = {
  // COURSES
  async getCourses(): Promise<Course[]> {
    return getFromStorage<Course[]>(STORAGE_KEYS.COURSES, MOCK_COURSES);
  },

  async getCourseById(id: number): Promise<Course | null> {
    const courses = await this.getCourses();
    return courses.find((c) => c.id === id) || null;
  },

  async getCourseBySlug(slug: string): Promise<Course | null> {
    const courses = await this.getCourses();
    return courses.find((c) => c.slug.toLowerCase() === slug.toLowerCase()) || null;
  },

  async createCourse(course: Course): Promise<Course> {
    const courses = await this.getCourses();
    const updated = [course, ...courses];
    setToStorage(STORAGE_KEYS.COURSES, updated);
    return course;
  },

  // EXAMS
  async getExams(): Promise<Exam[]> {
    return MOCK_EXAMS;
  },

  // BLOGS
  async getBlogs(): Promise<Blog[]> {
    return getFromStorage<Blog[]>(STORAGE_KEYS.BLOGS, MOCK_BLOGS);
  },

  async getBlogBySlug(slug: string): Promise<Blog | null> {
    const blogs = await this.getBlogs();
    return blogs.find((b) => b.slug.toLowerCase() === slug.toLowerCase()) || null;
  },

  async createBlog(blog: Blog): Promise<Blog> {
    const blogs = await this.getBlogs();
    const updated = [blog, ...blogs];
    setToStorage(STORAGE_KEYS.BLOGS, updated);
    return blog;
  },

  // QUESTIONS
  async getQuestions(): Promise<Question[]> {
    return getFromStorage<Question[]>(STORAGE_KEYS.QUESTIONS, MOCK_QUESTIONS);
  },

  // TEST PAPERS
  async getTestPapers(): Promise<TestPaper[]> {
    return getFromStorage<TestPaper[]>(STORAGE_KEYS.TESTS, MOCK_TEST_PAPERS);
  },

  async getTestPaperById(id: number): Promise<TestPaper | null> {
    const tests = await this.getTestPapers();
    return tests.find((t) => t.id === id) || null;
  },

  // DOUBTS
  async getDoubts(studentId?: number | string): Promise<Doubt[]> {
    const doubts = getFromStorage<Doubt[]>(STORAGE_KEYS.DOUBTS, MOCK_DOUBTS);
    if (studentId) {
      return doubts.filter((d) => String(d.studentId) === String(studentId));
    }
    return doubts;
  },

  async createDoubt(payload: {
    studentId: number | string;
    studentName: string;
    courseId: number;
    courseTitle: string;
    lessonId?: number;
    lessonTitle?: string;
    queryText: string;
    timestampMinutes?: string;
    screenshotUrl?: string;
  }): Promise<Doubt> {
    const doubts = await this.getDoubts();
    const newDoubt: Doubt = {
      id: Date.now(),
      studentId: payload.studentId,
      studentName: payload.studentName,
      courseId: payload.courseId,
      courseTitle: payload.courseTitle,
      lessonId: payload.lessonId,
      lessonTitle: payload.lessonTitle,
      queryText: payload.queryText,
      timestampMinutes: payload.timestampMinutes,
      screenshotUrl: payload.screenshotUrl,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    const updated = [newDoubt, ...doubts];
    setToStorage(STORAGE_KEYS.DOUBTS, updated);
    return newDoubt;
  },

  async resolveDoubt(
    doubtId: number,
    solutionText: string,
    facultyName: string
  ): Promise<Doubt> {
    const doubts = await this.getDoubts();
    let updatedDoubt: Doubt | null = null;

    const updated = doubts.map((d) => {
      if (d.id === doubtId) {
        updatedDoubt = {
          ...d,
          solutionText,
          facultyName,
          status: 'RESOLVED',
          solvedAt: new Date().toISOString(),
        };
        return updatedDoubt;
      }
      return d;
    });

    setToStorage(STORAGE_KEYS.DOUBTS, updated);
    return updatedDoubt || doubts[0];
  },

  // ORDERS
  async getOrders(studentId?: number | string): Promise<Order[]> {
    const orders = getFromStorage<Order[]>(STORAGE_KEYS.ORDERS, MOCK_ORDERS);
    if (studentId) {
      return orders.filter((o) => String(o.studentId) === String(studentId));
    }
    return orders;
  },

  async createOrder(payload: {
    studentId: number | string;
    studentName: string;
    studentEmail: string;
    studentPhone?: string;
    items: { courseId: number; courseTitle: string; price: number }[];
    subtotalAmount: number;
    discountAmount: number;
    totalAmount: number;
    couponCode?: string;
    paymentGateway: string;
    gatewayTxnId?: string;
  }): Promise<Order> {
    const orders = await this.getOrders();
    const newOrder: Order = {
      id: Date.now(),
      orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
      studentId: payload.studentId,
      studentName: payload.studentName,
      studentEmail: payload.studentEmail,
      studentPhone: payload.studentPhone,
      items: payload.items,
      subtotalAmount: payload.subtotalAmount,
      discountAmount: payload.discountAmount,
      totalAmount: payload.totalAmount,
      couponCode: payload.couponCode,
      paymentGateway: payload.paymentGateway || 'PayU',
      gatewayTxnId: payload.gatewayTxnId || `10Q_TXN_${Date.now()}`,
      paymentStatus: 'SUCCESS',
      createdAt: new Date().toISOString(),
    };

    const updated = [newOrder, ...orders];
    setToStorage(STORAGE_KEYS.ORDERS, updated);
    return newOrder;
  },

  // COUPONS
  async getCoupons(): Promise<Coupon[]> {
    return MOCK_COUPONS;
  },

  async validateCoupon(
    code: string,
    subtotal: number
  ): Promise<{ valid: boolean; discount: number; coupon?: Coupon; message?: string }> {
    const coupons = await this.getCoupons();
    const match = coupons.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive
    );

    if (!match) {
      return { valid: false, discount: 0, message: 'Invalid coupon code.' };
    }

    if (subtotal < match.minOrderAmount) {
      return {
        valid: false,
        discount: 0,
        message: `Minimum order amount of ₹${match.minOrderAmount} required for this coupon.`,
      };
    }

    const discount =
      match.discountType === 'PERCENTAGE'
        ? Math.round((subtotal * match.discountValue) / 100)
        : match.discountValue;

    return { valid: true, discount, coupon: match };
  },
};

export const apiService = api;
