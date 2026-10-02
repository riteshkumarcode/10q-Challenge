import {
  Course,
  Blog,
  Exam,
  Faculty,
  Testimonial,
  Question,
  TestPaper,
  Doubt,
  Order,
  Coupon,
} from '@/types';

export const MOCK_EXAMS: Exam[] = [
  {
    id: 1,
    name: 'BITSAT',
    fullName: 'Birla Institute of Technology and Science Admission Test',
    slug: 'bitsat',
    description:
      'Premier entrance exam for BITS Pilani, Goa & Hyderabad campuses. Speed-accuracy oriented with 130 questions + 12 bonus questions.',
    totalMarks: 390,
    durationMinutes: 180,
  },
  {
    id: 2,
    name: 'JEE Main',
    fullName: 'Joint Entrance Examination (Main)',
    slug: 'jee-main',
    description:
      'National entrance examination conducted by NTA for admission to NITs, IIITs, CFTIs and qualifying for JEE Advanced.',
    totalMarks: 300,
    durationMinutes: 180,
  },
  {
    id: 3,
    name: 'JEE Advanced',
    fullName: 'Joint Entrance Examination (Advanced)',
    slug: 'jee-advanced',
    description:
      'The gateway to premier Indian Institutes of Technology (IITs) featuring deep multi-concept problem solving.',
    totalMarks: 360,
    durationMinutes: 360,
  },
  {
    id: 4,
    name: 'COMEDK',
    fullName: 'Consortium of Medical, Engineering and Dental Colleges of Karnataka',
    slug: 'comedk',
    description:
      'State-level entrance exam for top Karnataka engineering colleges including RVCE, BMSCE, and MSRIT.',
    totalMarks: 180,
    durationMinutes: 180,
  },
  {
    id: 5,
    name: 'MET',
    fullName: 'Manipal Entrance Test',
    slug: 'met',
    description:
      'Online entrance test for admissions into Manipal Academy of Higher Education (MAHE) engineering campuses.',
    totalMarks: 240,
    durationMinutes: 120,
  },
  {
    id: 6,
    name: 'VITEEE',
    fullName: 'VIT Engineering Entrance Examination',
    slug: 'viteee',
    description:
      'Computer-based test for admission to B.Tech programs across Vellore, Chennai, AP, and Bhopal campuses.',
    totalMarks: 125,
    durationMinutes: 150,
  },
];

export const MOCK_FACULTY: Faculty[] = [
  {
    id: 1,
    name: 'Ritesh Sharma',
    qualification: 'BITS Pilani Alum (B.E. Computer Science)',
    specialization: 'Speed Mathematics, Short-Tricks & Exam Strategy',
    experienceYears: 8,
    studentsMentored: 12000,
    avatarUrl: '/site/assets/images/faculty-ritesh.jpg',
  },
  {
    id: 2,
    name: 'Dr. Vivek Agrawal',
    qualification: 'Ph.D. Physics (IIT Delhi)',
    specialization: 'Mechanics, Electrodynamics & Speed Approximations',
    experienceYears: 12,
    studentsMentored: 15000,
    avatarUrl: '/site/assets/images/faculty-vivek.jpg',
  },
  {
    id: 3,
    name: 'Prof. Neha Singhal',
    qualification: 'M.Sc. Chemistry (BITS Pilani)',
    specialization: 'Organic Reaction Mechanisms & Physical Chemistry Shortcut Tables',
    experienceYears: 9,
    studentsMentored: 9500,
    avatarUrl: '/site/assets/images/faculty-neha.jpg',
  },
];

export const MOCK_COURSES: Course[] = [
  {
    id: 1,
    title: 'BITSAT 2025: Master Crash Course & Speed Blueprint',
    slug: 'bitsat-master-crash-course',
    shortDescription:
      'Comprehensive high-yield video crash course covering Physics, Chemistry, Maths, English & Logical Reasoning with 10Q shortcut methods.',
    description:
      'Engineered specifically for BITSAT rankers. Master 130 questions in 180 minutes with exclusive option-elimination hacks, 12-bonus question triggers, and full-length simulated mock tests.',
    discountPrice: 4999,
    originalPrice: 9999,
    examTag: 'BITSAT',
    category: 'CRASH_COURSE',
    rating: 4.9,
    reviewCount: 1420,
    enrolledCount: 8450,
    thumbnailUrl: '/site/assets/images/course-bitsat-crash.jpg',
    isBestseller: true,
    isFeatured: true,
    features: [
      '120+ Hours High-Definition Speed Lectures',
      'Exclusive BITSAT English & Logical Reasoning Mastery Module',
      '20 Full-Length Computer-Based Mock Tests with Instant Rank Analysis',
      'Downloadable Formula Cheatsheets & Lecture Notes (PDF)',
      'Direct 24/7 Doubt Resolution by BITS Pilani Mentors',
    ],
    chapters: [
      {
        id: 1,
        title: 'Physics High-Yield Mechanics & Dimensional Shortcuts',
        sequenceOrder: 1,
        lessons: [
          {
            id: 101,
            title: 'Kinematics & Projectile Speed Hacks (Solve in 30s)',
            vimeoVideoId: '76979871',
            durationMinutes: 45,
            isFreePreview: true,
            pdfNotesUrl: '/site/assets/docs/kinematics-shortcuts.pdf',
          },
          {
            id: 102,
            title: 'Work, Power, Energy & Conservative Force Theorems',
            vimeoVideoId: '76979871',
            durationMinutes: 52,
            isFreePreview: false,
            pdfNotesUrl: '/site/assets/docs/wpe-notes.pdf',
          },
          {
            id: 103,
            title: 'Rotational Dynamics: Moment of Inertia Tricks',
            vimeoVideoId: '76979871',
            durationMinutes: 60,
            isFreePreview: false,
            pdfNotesUrl: '/site/assets/docs/rotation-notes.pdf',
          },
        ],
      },
      {
        id: 2,
        title: 'Speed Mathematics: Calculus & Coordinate Geometry',
        sequenceOrder: 2,
        lessons: [
          {
            id: 201,
            title: 'Definite Integration Properties & Area Under Curves',
            vimeoVideoId: '76979871',
            durationMinutes: 50,
            isFreePreview: false,
            pdfNotesUrl: '/site/assets/docs/calculus-notes.pdf',
          },
          {
            id: 202,
            title: 'Conic Sections: Tangent & Normal Direct Formulae',
            vimeoVideoId: '76979871',
            durationMinutes: 55,
            isFreePreview: false,
            pdfNotesUrl: '/site/assets/docs/conics-notes.pdf',
          },
        ],
      },
      {
        id: 3,
        title: 'English Proficiency & Logical Reasoning (Guaranteed 75+ Marks)',
        sequenceOrder: 3,
        lessons: [
          {
            id: 301,
            title: 'Grammar Rules, Spotting Errors & Vocabulary Lists',
            vimeoVideoId: '76979871',
            durationMinutes: 40,
            isFreePreview: true,
            pdfNotesUrl: '/site/assets/docs/english-notes.pdf',
          },
          {
            id: 302,
            title: 'Non-Verbal Series, Syllogisms & Pattern Completion',
            vimeoVideoId: '76979871',
            durationMinutes: 42,
            isFreePreview: false,
            pdfNotesUrl: '/site/assets/docs/lr-notes.pdf',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'BITSAT Master 20 CBT Mock Test Series',
    slug: 'bitsat-test-series',
    shortDescription:
      'Exact exam interface replica with 20 Full-Length Mocks, 12 Bonus Question unlocking logic, All-India Rank predict, and deep chapter diagnostics.',
    description:
      'Experience the exact speed pressure before exam day. Every test is timed for 180 minutes with instant KaTeX math solutions and subject-wise accuracy analysis.',
    discountPrice: 1999,
    originalPrice: 4499,
    examTag: 'BITSAT',
    category: 'TEST_SERIES',
    rating: 4.9,
    reviewCount: 2150,
    enrolledCount: 12400,
    thumbnailUrl: '/site/assets/images/course-bitsat-test.jpg',
    isBestseller: true,
    isFeatured: true,
    features: [
      '20 Full-Length BITSAT Mock Papers (130 Qs + 12 Bonus)',
      '45 Chapter-Wise Practice Speed Drill Tests',
      'All India Percentile & BITS Campus Predictor',
      'Instant KaTeX LaTeX Step-by-Step Solutions',
      'Unlimited Re-take attempts till Session 2 Exam',
    ],
    chapters: [],
  },
  {
    id: 3,
    title: '1-on-1 Elite Mentorship by BITS Pilani Top Rankers',
    slug: 'bitsat-mentorship',
    shortDescription:
      'Personalized roadmap, weekly 1-on-1 strategy video calls, mock test analysis, and daily WhatsApp accountability by BITS Pilani seniors.',
    description:
      'Eliminate doubts, stress, and poor strategy. Get paired with an experienced BITS Pilani mentor who scored 340+ in BITSAT to guide your daily timetable, weak-topic remediation, and college branch selection.',
    discountPrice: 5999,
    originalPrice: 11999,
    examTag: 'BITSAT',
    category: 'MENTORSHIP',
    rating: 5.0,
    reviewCount: 380,
    enrolledCount: 950,
    thumbnailUrl: '/site/assets/images/course-mentorship.jpg',
    isBestseller: false,
    isFeatured: true,
    features: [
      'Dedicated BITS Pilani Senior Mentor Assigned',
      'Weekly 45-Min 1-on-1 Video Strategy Calls',
      'Customized Daily & Weekly Study Time-Tables',
      'In-Depth Error Log Review of Every CBT Mock Test',
      '24/7 Priority WhatsApp Chat for Doubts & Mental Conditioning',
    ],
    chapters: [],
  },
  {
    id: 4,
    title: 'JEE Main 2025 Rank Booster Crash Program',
    slug: 'jee-main-crash-course',
    shortDescription:
      'Intensive 60-day sprint covering top 70% weightage topics in Physics, Chemistry, and Mathematics for 99+ Percentile.',
    description:
      'Accelerate your JEE Main rank with high-yield problem sets, pyq trend analysis (2019-2024), and NTA-style numerical value questions.',
    discountPrice: 4499,
    originalPrice: 8999,
    examTag: 'JEE Main',
    category: 'CRASH_COURSE',
    rating: 4.8,
    reviewCount: 980,
    enrolledCount: 6200,
    thumbnailUrl: '/site/assets/images/course-jee-crash.jpg',
    isBestseller: false,
    isFeatured: false,
    features: [
      '90+ Hours Live & Recorded Video Lessons',
      'Past 5-Year Chapter-wise NTA PYQ Video Solutions',
      '15 Full Syllabus NTA Mock Tests with Keypad Support',
      'Formula & Concept Flashcards for Quick Revision',
    ],
    chapters: [],
  },
  {
    id: 5,
    title: 'COMEDK UGET 2025 Speed Mastery Course',
    slug: 'comedk-speed-mastery',
    shortDescription:
      'Target top Bangalore colleges (RVCE, BMS, MSRIT) with 180 questions in 180 minutes speed solving techniques.',
    description:
      'Master the high-speed formula without negative marking. Dedicated practice sets and 15 full CBT mock tests for COMEDK.',
    discountPrice: 2499,
    originalPrice: 4999,
    examTag: 'COMEDK',
    category: 'CRASH_COURSE',
    rating: 4.8,
    reviewCount: 640,
    enrolledCount: 3800,
    thumbnailUrl: '/site/assets/images/course-comedk.jpg',
    isBestseller: false,
    isFeatured: false,
    features: [
      '50+ High-Yield Video Lessons',
      '15 Full Mock Tests for COMEDK Pattern',
      'Speed Elimination Techniques with Zero Negative Marking Hacks',
    ],
    chapters: [],
  },
  {
    id: 6,
    title: 'MET (Manipal) 2025 Complete Prep Pack',
    slug: 'met-prep-pack',
    shortDescription:
      'Focused preparation for MAHE Manipal, Bangalore, and Jaipur campuses with chapter-wise drills and mock tests.',
    description:
      'Crack the Manipal Entrance Test with tailored question sets, English communication modules, and full-length CBT mocks.',
    discountPrice: 2499,
    originalPrice: 4999,
    examTag: 'MET',
    category: 'TEST_SERIES',
    rating: 4.7,
    reviewCount: 420,
    enrolledCount: 2900,
    thumbnailUrl: '/site/assets/images/course-met.jpg',
    isBestseller: false,
    isFeatured: false,
    features: [
      '10 Full-Length MET Computer Based Mock Tests',
      'Detailed Subject Wise Diagnostic Analysis',
      'Complete Formula & Shortcuts PDF Bundle',
    ],
    chapters: [],
  },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    studentName: 'Siddharth Nair',
    college: 'BITS Pilani (Pilani Campus) - Computer Science',
    exam: 'BITSAT 2024',
    score: '352 / 390',
    rating: 5,
    content:
      '10Q Challenge was the game-changer for my preparation. The speed-solving hacks and authentic CBT test series helped me unlock the 12 bonus questions on exam day with 20 minutes to spare!',
  },
  {
    id: 2,
    studentName: 'Pooja Agarwal',
    college: 'BITS Pilani (Goa Campus) - Electronics & Instrumentation',
    exam: 'BITSAT 2024',
    score: '324 / 390',
    rating: 5,
    content:
      'The English Proficiency and Logical Reasoning module alone gave me an extra 40 marks that other coachings never focused on. The faculty doubt resolution was lightning fast.',
  },
  {
    id: 3,
    studentName: 'Aditya Kulkarni',
    college: 'BITS Pilani (Hyderabad Campus) - Computer Science',
    exam: 'BITSAT 2024',
    score: '338 / 390',
    rating: 5,
    content:
      'Having a personal BITS Pilani mentor keep me accountable through weekly calls kept my panic away. I recommend 10Q Challenge to every serious engineering aspirant.',
  },
];

export const MOCK_BLOGS: Blog[] = [
  {
    id: 1,
    title: 'BITSAT 2025: How to Score 340+ Marks in 60 Days (Comprehensive Blueprint)',
    slug: 'bitsat-2025-score-340-plus-strategy',
    category: 'BITSAT Strategy',
    summary:
      'A step-by-step master plan for BITSAT: Time allocation per subject, speed shortcuts, and the secret technique to unlock 12 bonus questions without negative marks.',
    contentHtml: `
      <h2>The Reality of BITSAT vs JEE</h2>
      <p>While JEE Main tests depth and calculation persistence, <strong>BITSAT tests pure speed, accuracy, and mental agility</strong>. You have 180 minutes to solve 130 questions, meaning you have only 83 seconds per question.</p>
      
      <h2>1. The Ideal Section Time Allocation</h2>
      <ul>
        <li><strong>Physics (30 Questions):</strong> 40 Minutes</li>
        <li><strong>Chemistry (30 Questions):</strong> 30 Minutes</li>
        <li><strong>Mathematics (40 Questions):</strong> 55 Minutes</li>
        <li><strong>English Proficiency (10 Questions):</strong> 10 Minutes</li>
        <li><strong>Logical Reasoning (20 Questions):</strong> 20 Minutes</li>
        <li><strong>Buffer & Bonus Questions (12 Questions):</strong> 25 Minutes</li>
      </ul>

      <h2>2. The 12 Bonus Questions Strategy</h2>
      <p>Never unlock bonus questions unless you have attempted all 130 standard questions with at least 85% confidence. Once unlocked, you cannot return to edit previous answers.</p>

      <h2>3. Why English & Logical Reasoning Is Your Goldmine</h2>
      <p>30 questions (90 marks) come from English and LR. Most aspirants focus solely on PCM and neglect this section, costing them a seat at BITS Pilani CS.</p>
    `,
    featuredImage: '/site/assets/images/banner1.jpg',
    authorName: 'Ritesh Sharma',
    authorRole: 'BITS Pilani Alum & Founder',
    readTimeMinutes: 7,
    publishedAt: '2025-01-15T10:00:00Z',
    isPublished: true,
    tags: ['BITSAT 2025', 'Speed Strategy', 'Bonus Questions', 'BITS Pilani'],
  },
  {
    id: 2,
    title: 'BITSAT 2025 Chapter-Wise Weightage & High-Yield Analysis',
    slug: 'bitsat-chapter-wise-weightage',
    category: 'Exam Updates',
    summary:
      'Detailed statistical breakdown of the highest-weightage topics in Physics, Chemistry, and Mathematics based on 10 years of BITSAT trends.',
    contentHtml: `
      <h2>Physics High Weightage Chapters</h2>
      <p>Mechanics, Current Electricity, Optics, Modern Physics, and Thermodynamics account for over 65% of the Physics section.</p>
      
      <h2>Mathematics High Weightage Chapters</h2>
      <p>Calculus (Differential & Integral), Vectors & 3D Geometry, Probability, and Coordinate Geometry make up nearly 70% of questions.</p>
    `,
    featuredImage: '/site/assets/images/banner2.jpg',
    authorName: 'Dr. Vivek Agrawal',
    authorRole: 'Senior Physics Faculty',
    readTimeMinutes: 5,
    publishedAt: '2025-02-01T12:30:00Z',
    isPublished: true,
    tags: ['Syllabus', 'Weightage', 'BITSAT Physics', 'Maths'],
  },
  {
    id: 3,
    title: 'How to Eliminate Negative Marking in Computer Based Tests',
    slug: 'eliminate-negative-marking-cbt',
    category: 'Study Habits',
    summary:
      'Master the 50-50 elimination rule, dimensional checking, and intelligent option substitution to turn negative scores into +3 marks.',
    contentHtml: `
      <h2>The Danger of Blind Guessing</h2>
      <p>In BITSAT, every wrong answer costs you 1 mark ($-\\frac{1}{3}$ of a correct question). Blind guessing four questions results in a net penalty of -4 marks.</p>
      
      <h2>Dimensional Analysis Elimination</h2>
      <p>For complicated physics numericals, always verify if the units of options match the requested quantity before attempting lengthy integrations.</p>
    `,
    featuredImage: '/site/assets/images/course-bitsat-test.jpg',
    authorName: 'Prof. Neha Singhal',
    authorRole: 'Master Faculty',
    readTimeMinutes: 6,
    publishedAt: '2025-02-20T08:00:00Z',
    isPublished: true,
    tags: ['Negative Marking', 'CBT Hacks', 'Mock Tests'],
  },
];

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    subject: 'Physics',
    chapter: 'Oscillations & SHM',
    type: 'MCQ',
    questionText:
      'A particle executes simple harmonic motion with amplitude $A$ and time period $T$. What is the minimum time taken by the particle to travel from the mean position to $x = \\frac{A}{\\sqrt{2}}$?',
    options: [
      { key: 'A', text: '$\\frac{T}{4}$' },
      { key: 'B', text: '$\\frac{T}{8}$' },
      { key: 'C', text: '$\\frac{T}{6}$' },
      { key: 'D', text: '$\\frac{T}{12}$' },
    ],
    correctOption: 'B',
    marksPositive: 3,
    marksNegative: 1,
    explanation:
      'Displacement equation: $x = A\\sin(\\omega t)$. At $x = \\frac{A}{\\sqrt{2}}$, $\\sin(\\omega t) = \\frac{1}{\\sqrt{2}} \\implies \\omega t = \\frac{\\pi}{4}$. Since $\\omega = \\frac{2\\pi}{T}$, we get $\\frac{2\\pi}{T} t = \\frac{\\pi}{4} \\implies t = \\frac{T}{8}$.',
  },
  {
    id: 2,
    subject: 'Mathematics',
    chapter: 'Definite Integration',
    type: 'MCQ',
    questionText:
      'Evaluate the definite integral: $I = \\int_{0}^{\\pi/2} \\frac{\\sin^3 x}{\\sin^3 x + \\cos^3 x} dx$.',
    options: [
      { key: 'A', text: '$\\pi$' },
      { key: 'B', text: '$\\frac{\\pi}{2}$' },
      { key: 'C', text: '$\\frac{\\pi}{4}$' },
      { key: 'D', text: '$0$' },
    ],
    correctOption: 'C',
    marksPositive: 3,
    marksNegative: 1,
    explanation:
      'Using Kings Property: $I = \\int_{0}^{\\pi/2} \\frac{\\cos^3 x}{\\cos^3 x + \\sin^3 x} dx$. Adding both equations: $2I = \\int_{0}^{\\pi/2} 1 dx = \\frac{\\pi}{2} \\implies I = \\frac{\\pi}{4}$.',
  },
  {
    id: 3,
    subject: 'Chemistry',
    chapter: 'Chemical Kinetics',
    type: 'MCQ',
    questionText:
      'For a first order reaction, the time required for 99.9% completion is approximately how many times the half-life period ($t_{1/2}$)?',
    options: [
      { key: 'A', text: '5 times' },
      { key: 'B', text: '10 times' },
      { key: 'C', text: '3 times' },
      { key: 'D', text: '7 times' },
    ],
    correctOption: 'B',
    marksPositive: 3,
    marksNegative: 1,
    explanation:
      'For 99.9% completion, remaining concentration is 0.1% = $10^{-3} [A]_0$. $t_{99.9\\%} = \\frac{2.303}{k} \\log(10^3) = \\frac{3 \\times 2.303}{k}$. Since $t_{1/2} = \\frac{0.693}{k} = \\frac{2.303 \\times 0.3010}{k}$, we get $t_{99.9\\%} \\approx 10 \\times t_{1/2}$.',
  },
  {
    id: 4,
    subject: 'Physics',
    chapter: 'Current Electricity',
    type: 'NUMERICAL',
    questionText:
      'Two resistors of resistances $R_1 = 6\\,\\Omega$ and $R_2 = 12\\,\\Omega$ are connected in parallel across a $24\\,\\text{V}$ battery. Calculate the total current (in Amperes) drawn from the battery.',
    options: [],
    correctOption: '6',
    marksPositive: 3,
    marksNegative: 0,
    explanation:
      'Equivalent resistance $R_{eq} = \\frac{R_1 R_2}{R_1 + R_2} = \\frac{6 \\times 12}{6 + 12} = 4\\,\\Omega$. Current $I = \\frac{V}{R_{eq}} = \\frac{24}{4} = 6\\,\\text{A}$.',
  },
  {
    id: 5,
    subject: 'Logical Reasoning',
    chapter: 'Number Series',
    type: 'MCQ',
    questionText: 'Find the next number in the given series: $3, 7, 15, 31, 63, \\,?$',
    options: [
      { key: 'A', text: '127' },
      { key: 'B', text: '125' },
      { key: 'C', text: '120' },
      { key: 'D', text: '131' },
    ],
    correctOption: 'A',
    marksPositive: 3,
    marksNegative: 1,
    explanation: 'Pattern: $x_{n} = 2x_{n-1} + 1$. Next term = $2(63) + 1 = 127$.',
  },
];

export const MOCK_TEST_PAPERS: TestPaper[] = [
  {
    id: 1,
    title: 'BITSAT 2025 Full-Length Mock Test 01 (Official CBT Simulator)',
    examTag: 'BITSAT',
    durationMinutes: 180,
    totalMarks: 390,
    totalQuestions: 130,
    questions: MOCK_QUESTIONS,
  },
  {
    id: 2,
    title: 'BITSAT 2025 Full-Length Mock Test 02',
    examTag: 'BITSAT',
    durationMinutes: 180,
    totalMarks: 390,
    totalQuestions: 130,
    questions: MOCK_QUESTIONS,
  },
  {
    id: 3,
    title: 'JEE Main 2025 Full Mock Exam 01',
    examTag: 'JEE Main',
    durationMinutes: 180,
    totalMarks: 300,
    totalQuestions: 75,
    questions: MOCK_QUESTIONS,
  },
];

export const MOCK_DOUBTS: Doubt[] = [
  {
    id: 1,
    studentId: 101,
    studentName: 'Aarav Sharma',
    courseId: 1,
    courseTitle: 'BITSAT 2025: Master Crash Course',
    lessonId: 101,
    lessonTitle: 'Kinematics & Projectile Speed Hacks',
    queryText:
      'In lecture 1 at 18:45, why did we take the horizontal projectile range as $R = \\frac{u^2 \\sin(2\\theta)}{g}$ without considering air resistance? Does BITSAT ever test non-zero drag coefficient equations?',
    timestampMinutes: '18:45',
    status: 'RESOLVED',
    facultyName: 'Ritesh Sharma (BITS Pilani)',
    solutionText:
      'Great question Aarav! For BITSAT, air resistance is strictly neglected unless explicitly specified with a drag force function $F_d = -kv$. You should always default to ideal projectile kinematics to save calculation time.',
    createdAt: '2025-02-10T14:20:00Z',
    solvedAt: '2025-02-10T15:05:00Z',
  },
  {
    id: 2,
    studentId: 101,
    studentName: 'Aarav Sharma',
    courseId: 1,
    courseTitle: 'BITSAT 2025: Master Crash Course',
    lessonId: 201,
    lessonTitle: 'Definite Integration Properties',
    queryText:
      'Can we apply Kings property $\\int_a^b f(x) dx = \\int_a^b f(a+b-x) dx$ directly when piecewise modulus functions are present?',
    timestampMinutes: '24:10',
    status: 'RESOLVED',
    facultyName: 'Ritesh Sharma (BITS Pilani)',
    solutionText:
      'Yes, Kings property holds for all continuous or piecewise continuous integrable functions. However, for modulus functions $|x - c|$, it is safer to split the integral at the critical point $x = c$ first.',
    createdAt: '2025-02-12T09:15:00Z',
    solvedAt: '2025-02-12T10:00:00Z',
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 1,
    orderNumber: 'ORD-89421',
    studentId: 101,
    studentName: 'Aarav Sharma',
    studentEmail: 'student@10qchallenge.in',
    studentPhone: '+91 98765 43210',
    items: [
      {
        courseId: 1,
        courseTitle: 'BITSAT 2025: Master Crash Course & Speed Blueprint',
        price: 4999,
      },
    ],
    subtotalAmount: 4999,
    discountAmount: 500,
    totalAmount: 4499,
    couponCode: 'BITSAT500',
    paymentGateway: 'PayU',
    gatewayTxnId: '10Q_PAYU_984210',
    paymentStatus: 'SUCCESS',
    createdAt: '2025-02-01T11:30:00Z',
  },
];

export const MOCK_COUPONS: Coupon[] = [
  {
    id: 1,
    code: 'BITSAT500',
    discountType: 'FLAT',
    discountValue: 500,
    minOrderAmount: 1999,
    description: 'Flat ₹500 discount on all BITSAT prep courses',
    isActive: true,
  },
  {
    id: 2,
    code: 'CRACK10Q',
    discountType: 'PERCENTAGE',
    discountValue: 15,
    minOrderAmount: 999,
    description: '15% instant discount for early bird rankers',
    isActive: true,
  },
  {
    id: 3,
    code: 'FIRST100',
    discountType: 'FLAT',
    discountValue: 1000,
    minOrderAmount: 4999,
    description: 'Flat ₹1,000 off on 1-on-1 Mentorship programs',
    isActive: true,
  },
];

// Alias exports to ensure compatibility with legacy or alternate import conventions
export const INITIAL_COURSES = MOCK_COURSES;
export const INITIAL_BLOGS = MOCK_BLOGS;
export const INITIAL_EXAMS = MOCK_EXAMS;
export const INITIAL_QUESTIONS = MOCK_QUESTIONS;
export const INITIAL_TEST_PAPER = MOCK_TEST_PAPERS[0];
export const INITIAL_TEST_PAPERS = MOCK_TEST_PAPERS;
export const INITIAL_DOUBTS = MOCK_DOUBTS;
export const INITIAL_ORDERS = MOCK_ORDERS;
export const INITIAL_COUPONS = MOCK_COUPONS;
export const INITIAL_FACULTY = MOCK_FACULTY;
export const INITIAL_TESTIMONIALS = MOCK_TESTIMONIALS;
