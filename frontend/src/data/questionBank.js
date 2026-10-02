/**
 * 10Q Challenge - Master Subject-Wise Question Bank & Mock Test Repository
 * Complete high-yield question archive for BITSAT, JEE Main, COMEDK, MET, and VITEEE
 */

export const SUBJECT_MASTER_LIST = [
  { id: 1, subjectCode: '101', subjectName: 'Physics', totalQuestions: 45 },
  { id: 2, subjectCode: '201', subjectName: 'Chemistry', totalQuestions: 45 },
  { id: 3, subjectCode: '301', subjectName: 'Mathematics', totalQuestions: 50 },
  { id: 4, subjectCode: '204', subjectName: 'English Proficiency', totalQuestions: 25 },
  { id: 5, subjectCode: '302', subjectName: 'Logical Reasoning', totalQuestions: 25 },
  { id: 6, subjectCode: '102', subjectName: 'Bonus Section (BITSAT)', totalQuestions: 12 },
];

export const CHAPTER_MASTER_LIST = [
  // Physics Chapters
  { id: 101, subject: 'Physics', chapterName: 'Rotational Motion & Mechanics', weightage: 'High' },
  { id: 102, subject: 'Physics', chapterName: 'Electrostatics & Capacitance', weightage: 'High' },
  { id: 103, subject: 'Physics', chapterName: 'Current Electricity & Magnetism', weightage: 'High' },
  { id: 104, subject: 'Physics', chapterName: 'Oscillations & Simple Harmonic Motion', weightage: 'Medium' },
  { id: 105, subject: 'Physics', chapterName: 'Thermodynamics & Kinetic Theory', weightage: 'High' },
  { id: 106, subject: 'Physics', chapterName: 'Ray Optics & Wave Optics', weightage: 'High' },
  { id: 107, subject: 'Physics', chapterName: 'Modern Physics & Semiconductors', weightage: 'Very High' },

  // Chemistry Chapters
  { id: 201, subject: 'Chemistry', chapterName: 'Alcohols, Phenols and Ethers', weightage: 'High' },
  { id: 202, subject: 'Chemistry', chapterName: 'Aldehydes, Ketones & Carboxylic Acids', weightage: 'High' },
  { id: 203, subject: 'Chemistry', chapterName: 'Chemical Kinetics & Radioactivity', weightage: 'High' },
  { id: 204, subject: 'Chemistry', chapterName: 'Thermodynamics & Thermochemistry', weightage: 'Medium' },
  { id: 205, subject: 'Chemistry', chapterName: 'Coordination Compounds & d-Block', weightage: 'High' },
  { id: 206, subject: 'Chemistry', chapterName: 'Chemical Bonding & Molecular Structure', weightage: 'Very High' },
  { id: 207, subject: 'Chemistry', chapterName: 'Electrochemistry & Solutions', weightage: 'High' },

  // Mathematics Chapters
  { id: 301, subject: 'Mathematics', chapterName: 'Definite & Indefinite Integration', weightage: 'Very High' },
  { id: 302, subject: 'Mathematics', chapterName: 'Differential Calculus & Maxima-Minima', weightage: 'Very High' },
  { id: 303, subject: 'Mathematics', chapterName: 'Vectors & 3D Geometry', weightage: 'High' },
  { id: 304, subject: 'Mathematics', chapterName: 'Matrices & Determinants', weightage: 'High' },
  { id: 305, subject: 'Mathematics', chapterName: 'Probability & Statistics', weightage: 'High' },
  { id: 306, subject: 'Mathematics', chapterName: 'Coordinate Geometry (Conics & Circles)', weightage: 'Very High' },
  { id: 307, subject: 'Mathematics', chapterName: 'Complex Numbers & Quadratic Equations', weightage: 'Medium' },

  // English & LR Chapters
  { id: 401, subject: 'English Proficiency', chapterName: 'Vocabulary, Synonyms & Antonyms', weightage: 'Medium' },
  { id: 402, subject: 'English Proficiency', chapterName: 'Grammar, Error Spotting & Sentence Correction', weightage: 'High' },
  { id: 403, subject: 'English Proficiency', chapterName: 'Reading Comprehension & Cloze Test', weightage: 'High' },
  { id: 501, subject: 'Logical Reasoning', chapterName: 'Number Series & Pattern Completion', weightage: 'High' },
  { id: 502, subject: 'Logical Reasoning', chapterName: 'Syllogisms & Verbal Logic', weightage: 'Medium' },
  { id: 503, subject: 'Logical Reasoning', chapterName: 'Direction Sense & Blood Relations', weightage: 'Medium' },
];

export const MASTER_QUESTION_BANK = [
  // ==========================================
  // PHYSICS QUESTIONS
  // ==========================================
  {
    id: 1001,
    subject: 'Physics',
    chapter: 'Electrostatics & Capacitance',
    type: 'MCQ',
    exam: 'BITSAT',
    difficulty: 'Medium',
    questionText: 'Two point charges $+q$ and $-q$ are placed at a distance $d$ apart in vacuum. What is the net electric field at the midpoint between them?',
    options: [
      { key: 'Option A', text: 'Zero' },
      { key: 'Option B', text: '$\\frac{8kq}{d^2}$ towards $-q$' },
      { key: 'Option C', text: '$\\frac{4kq}{d^2}$ towards $+q$' },
      { key: 'Option D', text: '$\\frac{2kq}{d^2}$ towards $-q$' }
    ],
    correctOption: 'Option B',
    marksPositive: 3,
    marksNegative: 1,
    explanation: 'Distance from each charge to midpoint is $r = d/2$. Electric field from $+q$ points toward $-q$: $E_1 = \\frac{kq}{(d/2)^2} = \\frac{4kq}{d^2}$. Electric field from $-q$ also pulls towards itself: $E_2 = \\frac{4kq}{d^2}$. Total Field $E = E_1 + E_2 = \\frac{8kq}{d^2}$ towards $-q$.'
  },
  {
    id: 1002,
    subject: 'Physics',
    chapter: 'Electrostatics & Capacitance',
    type: 'MCQ',
    exam: 'BITSAT',
    difficulty: 'Hard',
    questionText: 'A parallel plate capacitor of capacitance $C$ is charged to potential $V$ and then disconnected from the battery. If a dielectric slab of constant $K = 4$ is completely inserted between the plates, what is the new electrostatic energy stored?',
    options: [
      { key: 'Option A', text: '$4 U_0$' },
      { key: 'Option B', text: '$U_0 / 4$' },
      { key: 'Option C', text: '$2 U_0$' },
      { key: 'Option D', text: '$U_0$' }
    ],
    correctOption: 'Option B',
    marksPositive: 3,
    marksNegative: 1,
    explanation: 'When disconnected from the battery, charge $Q$ remains constant. Initial energy $U_0 = \\frac{Q^2}{2C}$. With dielectric, capacitance becomes $C\' = KC = 4C$. New energy $U = \\frac{Q^2}{2(4C)} = \\frac{U_0}{4}$.'
  },
  {
    id: 1003,
    subject: 'Physics',
    chapter: 'Oscillations & Simple Harmonic Motion',
    type: 'MCQ',
    exam: 'BITSAT',
    difficulty: 'Medium',
    questionText: 'A particle executes simple harmonic motion with amplitude $A$ and period $T$. What is the minimum time taken by the particle to travel from the mean position to $x = \\frac{A}{\\sqrt{2}}$?',
    options: [
      { key: 'Option A', text: '$T / 4$' },
      { key: 'Option B', text: '$T / 8$' },
      { key: 'Option C', text: '$T / 6$' },
      { key: 'Option D', text: '$T / 12$' }
    ],
    correctOption: 'Option B',
    marksPositive: 3,
    marksNegative: 1,
    explanation: 'Equation of motion: $x = A\\sin(\\omega t)$. At $x = A/\\sqrt{2} \\implies \\sin(\\omega t) = 1/\\sqrt{2} \\implies \\omega t = \\pi/4$. Substituting $\\omega = 2\\pi/T \\implies \\frac{2\\pi}{T} t = \\frac{\\pi}{4} \\implies t = \\frac{T}{8}$.'
  },
  {
    id: 1004,
    subject: 'Physics',
    chapter: 'Current Electricity & Magnetism',
    type: 'NUMERICAL',
    exam: 'JEE Main',
    difficulty: 'Medium',
    questionText: 'Two resistors of resistances $R_1 = 6\\,\\Omega$ and $R_2 = 12\\,\\Omega$ are connected in parallel across a $24\\,\\text{V}$ battery with internal resistance $0\\,\\Omega$. Calculate the total current (in Amperes) supplied by the battery.',
    numericalValue: '6',
    tolerance: '0.05',
    marksPositive: 3,
    marksNegative: 0,
    explanation: 'Parallel equivalent resistance: $R_{eq} = \\frac{R_1 R_2}{R_1 + R_2} = \\frac{6 \\times 12}{6 + 12} = \\frac{72}{18} = 4\\,\\Omega$. Total Current $I = \\frac{V}{R_{eq}} = \\frac{24}{4} = 6\\,\\text{A}$.'
  },
  {
    id: 1005,
    subject: 'Physics',
    chapter: 'Rotational Motion & Mechanics',
    type: 'MCQ',
    exam: 'BITSAT',
    difficulty: 'Hard',
    questionText: 'A solid cylinder of mass $M$ and radius $R$ rolls down an inclined plane of angle $\\theta$ without slipping. The acceleration of its center of mass is:',
    options: [
      { key: 'Option A', text: '$g \\sin\\theta$' },
      { key: 'Option B', text: '$\\frac{2}{3} g \\sin\\theta$' },
      { key: 'Option C', text: '$\\frac{1}{2} g \\sin\\theta$' },
      { key: 'Option D', text: '$\\frac{3}{5} g \\sin\\theta$' }
    ],
    correctOption: 'Option B',
    marksPositive: 3,
    marksNegative: 1,
    explanation: 'For pure rolling down an incline, acceleration $a = \\frac{g \\sin\\theta}{1 + I/(MR^2)}$. For a solid cylinder, $I = \\frac{1}{2} MR^2$. Therefore, $a = \\frac{g \\sin\\theta}{1 + 1/2} = \\frac{2}{3} g \\sin\\theta$.'
  },
  {
    id: 1006,
    subject: 'Physics',
    chapter: 'Modern Physics & Semiconductors',
    type: 'MCQ',
    exam: 'BITSAT',
    difficulty: 'Easy',
    questionText: 'If the de Broglie wavelength of an electron is $0.1227\\,\\text{nm}$, what is its accelerating potential in Volts?',
    options: [
      { key: 'Option A', text: '$100\\,\\text{V}$' },
      { key: 'Option B', text: '$50\\,\\text{V}$' },
      { key: 'Option C', text: '$10\\,\\text{V}$' },
      { key: 'Option D', text: '$200\\,\\text{V}$' }
    ],
    correctOption: 'Option A',
    marksPositive: 3,
    marksNegative: 1,
    explanation: 'Formula for electron wavelength: $\\lambda = \\frac{1.227}{\\sqrt{V}}\\,\\text{nm}$. Given $\\lambda = 0.1227\\,\\text{nm} \\implies \\sqrt{V} = \\frac{1.227}{0.1227} = 10 \\implies V = 100\\,\\text{V}$.'
  },

  // ==========================================
  // CHEMISTRY QUESTIONS
  // ==========================================
  {
    id: 2001,
    subject: 'Chemistry',
    chapter: 'Chemical Kinetics & Radioactivity',
    type: 'MCQ',
    exam: 'BITSAT',
    difficulty: 'Medium',
    questionText: 'For a first-order chemical reaction, the time required for 99.9% completion is approximately how many times the half-life period ($t_{1/2}$)?',
    options: [
      { key: 'Option A', text: '5 times' },
      { key: 'Option B', text: '10 times' },
      { key: 'Option C', text: '3.3 times' },
      { key: 'Option D', text: '7 times' }
    ],
    correctOption: 'Option B',
    marksPositive: 3,
    marksNegative: 1,
    explanation: 'For 99.9% completion: $[A] = 0.001 [A]_0 = 10^{-3} [A]_0$. $t_{99.9\\%} = \\frac{2.303}{k} \\log\\left(\\frac{[A]_0}{10^{-3}[A]_0}\\right) = \\frac{2.303 \\times 3}{k}$. Since $t_{1/2} = \\frac{2.303 \\times 0.3010}{k}$, ratio $= \\frac{3}{0.3010} \\approx 10$.'
  },
  {
    id: 2002,
    subject: 'Chemistry',
    chapter: 'Alcohols, Phenols and Ethers',
    type: 'MCQ',
    exam: 'BITSAT',
    difficulty: 'Medium',
    questionText: 'Which of the following alcohols reacts fastest with Lucas Reagent (conc. $\\text{HCl} + \\text{ZnCl}_2$) at room temperature?',
    options: [
      { key: 'Option A', text: '1-Butanol' },
      { key: 'Option B', text: '2-Butanol' },
      { key: 'Option C', text: '2-Methylpropan-2-ol (tert-butyl alcohol)' },
      { key: 'Option D', text: 'Propan-1-ol' }
    ],
    correctOption: 'Option C',
    marksPositive: 3,
    marksNegative: 1,
    explanation: 'Lucas test proceeds via $S_N1$ carbocation mechanism. Tertiary alcohols form the most stable $3^\\circ$ carbocation and give immediate turbidity at room temperature.'
  },
  {
    id: 2003,
    subject: 'Chemistry',
    chapter: 'Chemical Bonding & Molecular Structure',
    type: 'MCQ',
    exam: 'BITSAT',
    difficulty: 'Easy',
    questionText: 'What is the geometry and hybridization of the central Xenon atom in $\\text{XeF}_4$?',
    options: [
      { key: 'Option A', text: 'Square Planar, $sp^3d^2$' },
      { key: 'Option B', text: 'Tetrahedral, $sp^3$' },
      { key: 'Option C', text: 'Octahedral, $sp^3d^2$' },
      { key: 'Option D', text: 'See-saw, $sp^3d$' }
    ],
    correctOption: 'Option A',
    marksPositive: 3,
    marksNegative: 1,
    explanation: 'Xenon has 8 valence electrons. In $\\text{XeF}_4$, there are 4 bond pairs and 2 lone pairs (Steric Number = 6 $\\implies sp^3d^2$). Due to the two axial lone pairs repelling equally, the molecular shape is Square Planar.'
  },
  {
    id: 2004,
    subject: 'Chemistry',
    chapter: 'Electrochemistry & Solutions',
    type: 'NUMERICAL',
    exam: 'JEE Main',
    difficulty: 'Medium',
    questionText: 'Calculate the pH of a $10^{-3}\\,\\text{M}\\;\\text{HCl}$ aqueous solution at $25^\\circ\\text{C}$.',
    numericalValue: '3',
    tolerance: '0.01',
    marksPositive: 3,
    marksNegative: 0,
    explanation: '$\\text{HCl}$ is a strong acid completely dissociated: $[\\text{H}^+] = 10^{-3}\\,\\text{M}$. $\\text{pH} = -\\log_{10}[\\text{H}^+] = -\\log_{10}(10^{-3}) = 3$.'
  },
  {
    id: 2005,
    subject: 'Chemistry',
    chapter: 'Coordination Compounds & d-Block',
    type: 'MCQ',
    exam: 'BITSAT',
    difficulty: 'Hard',
    questionText: 'The spin-only magnetic moment of $[\\text{Fe(CN)}_6]^{3-}$ complex ion in Bohr Magnetons (BM) is approximately:',
    options: [
      { key: 'Option A', text: '$1.73\\,\\text{BM}$' },
      { key: 'Option B', text: '$5.92\\,\\text{BM}$' },
      { key: 'Option C', text: '$2.84\\,\\text{BM}$' },
      { key: 'Option D', text: '$4.90\\,\\text{BM}$' }
    ],
    correctOption: 'Option A',
    marksPositive: 3,
    marksNegative: 1,
    explanation: '$\\text{Fe}^{3+}$ has $d^5$ configuration. $\\text{CN}^-$ is a strong field ligand causing pairing: $t_{2g}^5 e_g^0$, leaving $n = 1$ unpaired electron. Magnetic moment $\\mu = \\sqrt{n(n+2)} = \\sqrt{1(3)} = \\sqrt{3} \\approx 1.732\\,\\text{BM}$.'
  },

  // ==========================================
  // MATHEMATICS QUESTIONS
  // ==========================================
  {
    id: 3001,
    subject: 'Mathematics',
    chapter: 'Definite & Indefinite Integration',
    type: 'MCQ',
    exam: 'BITSAT',
    difficulty: 'Medium',
    questionText: 'Evaluate the definite integral: $I = \\int_{0}^{\\pi/2} \\frac{\\sin^3 x}{\\sin^3 x + \\cos^3 x}\\,dx$.',
    options: [
      { key: 'Option A', text: '$\\pi$' },
      { key: 'Option B', text: '$\\pi / 2$' },
      { key: 'Option C', text: '$\\pi / 4$' },
      { key: 'Option D', text: '$0$' }
    ],
    correctOption: 'Option C',
    marksPositive: 3,
    marksNegative: 1,
    explanation: 'Using Kings Property $\\int_0^a f(x)dx = \\int_0^a f(a-x)dx$: $I = \\int_0^{\\pi/2} \\frac{\\cos^3 x}{\\cos^3 x + \\sin^3 x}\\,dx$. Adding both integrals: $2I = \\int_0^{\\pi/2} 1\\,dx = [x]_0^{\\pi/2} = \\frac{\\pi}{2} \\implies I = \\frac{\\pi}{4}$.'
  },
  {
    id: 3002,
    subject: 'Mathematics',
    chapter: 'Vectors & 3D Geometry',
    type: 'MCQ',
    exam: 'BITSAT',
    difficulty: 'Medium',
    questionText: 'If $\\vec{a} = 2\\hat{i} + \\hat{j} - \\hat{k}$ and $\\vec{b} = \\hat{i} - 2\\hat{j} + \\lambda\\hat{k}$ are mutually perpendicular vectors, find the value of $\\lambda$.',
    options: [
      { key: 'Option A', text: '$0$' },
      { key: 'Option B', text: '$2$' },
      { key: 'Option C', text: '$-2$' },
      { key: 'Option D', text: '$1$' }
    ],
    correctOption: 'Option A',
    marksPositive: 3,
    marksNegative: 1,
    explanation: 'Perpendicular vectors have dot product $\\vec{a} \\cdot \\vec{b} = 0$. $(2)(1) + (1)(-2) + (-1)(\\lambda) = 0 \\implies 2 - 2 - \\lambda = 0 \\implies -\\lambda = 0 \\implies \\lambda = 0$.'
  },
  {
    id: 3003,
    subject: 'Mathematics',
    chapter: 'Matrices & Determinants',
    type: 'NUMERICAL',
    exam: 'BITSAT',
    difficulty: 'Easy',
    questionText: 'If $A$ is a $3 \\times 3$ square matrix and $\\det(A) = 4$, find the value of $\\det(2A)$.',
    numericalValue: '32',
    tolerance: '0',
    marksPositive: 3,
    marksNegative: 0,
    explanation: 'For an $n \\times n$ matrix, $\\det(kA) = k^n \\det(A)$. Here $n = 3, k = 2$: $\\det(2A) = 2^3 \\times 4 = 8 \\times 4 = 32$.'
  },
  {
    id: 3004,
    subject: 'Mathematics',
    chapter: 'Probability & Statistics',
    type: 'MCQ',
    exam: 'BITSAT',
    difficulty: 'Medium',
    questionText: 'Two fair dice are thrown simultaneously. What is the probability that the sum of the numbers appearing on the dice is at least 10?',
    options: [
      { key: 'Option A', text: '$1/6$' },
      { key: 'Option B', text: '$1/12$' },
      { key: 'Option C', text: '$5/36$' },
      { key: 'Option D', text: '$1/4$' }
    ],
    correctOption: 'Option A',
    marksPositive: 3,
    marksNegative: 1,
    explanation: 'Favorable outcomes for sum $\\ge 10$: Sum 10: $(4,6), (5,5), (6,4)$ (3 pairs); Sum 11: $(5,6), (6,5)$ (2 pairs); Sum 12: $(6,6)$ (1 pair). Total favorable $= 6$. Total sample space $= 36$. Probability $= 6/36 = 1/6$.'
  },
  {
    id: 3005,
    subject: 'Mathematics',
    chapter: 'Differential Calculus & Maxima-Minima',
    type: 'MCQ',
    exam: 'BITSAT',
    difficulty: 'Medium',
    questionText: 'Find the minimum value of $f(x) = x^2 + \\frac{16}{x}$ for all $x > 0$.',
    options: [
      { key: 'Option A', text: '$12$' },
      { key: 'Option B', text: '$8$' },
      { key: 'Option C', text: '$16$' },
      { key: 'Option D', text: '$6$' }
    ],
    correctOption: 'Option A',
    marksPositive: 3,
    marksNegative: 1,
    explanation: 'Differentiating: $f\'(x) = 2x - \\frac{16}{x^2} = 0 \\implies 2x^3 = 16 \\implies x^3 = 8 \\implies x = 2$. Minimum value $f(2) = 2^2 + \\frac{16}{2} = 4 + 8 = 12$.'
  },

  // ==========================================
  // ENGLISH & LOGICAL REASONING
  // ==========================================
  {
    id: 4001,
    subject: 'English Proficiency',
    chapter: 'Vocabulary, Synonyms & Antonyms',
    type: 'MCQ',
    exam: 'BITSAT',
    difficulty: 'Easy',
    questionText: 'Select the word closest in meaning (SYNONYM) to **EPHEMERAL**:',
    options: [
      { key: 'Option A', text: 'Short-lived / Transient' },
      { key: 'Option B', text: 'Eternal / Everlasting' },
      { key: 'Option C', text: 'Courageous' },
      { key: 'Option D', text: 'Gigantic' }
    ],
    correctOption: 'Option A',
    marksPositive: 3,
    marksNegative: 1,
    explanation: 'Ephemeral means lasting for a very short time; transient or fleeting.'
  },
  {
    id: 4002,
    subject: 'English Proficiency',
    chapter: 'Grammar, Error Spotting & Sentence Correction',
    type: 'MCQ',
    exam: 'BITSAT',
    difficulty: 'Medium',
    questionText: 'Identify the part of the sentence with a grammatical error: "Neither the teacher (A) / nor the students (B) / was present in the auditorium (C) / No error (D)"',
    options: [
      { key: 'Option A', text: 'Part (A)' },
      { key: 'Option B', text: 'Part (B)' },
      { key: 'Option C', text: 'Part (C)' },
      { key: 'Option D', text: 'Part (D)' }
    ],
    correctOption: 'Option C',
    marksPositive: 3,
    marksNegative: 1,
    explanation: 'In "neither... nor" constructions, the verb agrees with the subject closer to it. "Students" is plural, so the verb must be "were present", not "was present".'
  },
  {
    id: 5001,
    subject: 'Logical Reasoning',
    chapter: 'Number Series & Pattern Completion',
    type: 'MCQ',
    exam: 'BITSAT',
    difficulty: 'Easy',
    questionText: 'Find the next number in the sequence: $3, 7, 15, 31, 63, \\,?$',
    options: [
      { key: 'Option A', text: '127' },
      { key: 'Option B', text: '125' },
      { key: 'Option C', text: '120' },
      { key: 'Option D', text: '131' }
    ],
    correctOption: 'Option A',
    marksPositive: 3,
    marksNegative: 1,
    explanation: 'Pattern: $x_n = 2x_{n-1} + 1$. Next number is $2(63) + 1 = 126 + 1 = 127$.'
  },
  {
    id: 5002,
    subject: 'Logical Reasoning',
    chapter: 'Direction Sense & Blood Relations',
    type: 'MCQ',
    exam: 'BITSAT',
    difficulty: 'Medium',
    questionText: 'A man walks $5\\,\\text{km}$ North, turns right and walks $3\\,\\text{km}$, then turns right and walks $5\\,\\text{km}$. How far is he from his initial starting point?',
    options: [
      { key: 'Option A', text: '$3\\,\\text{km}$ East' },
      { key: 'Option B', text: '$5\\,\\text{km}$ West' },
      { key: 'Option C', text: '$8\\,\\text{km}$ South' },
      { key: 'Option D', text: '$0\\,\\text{km}$' }
    ],
    correctOption: 'Option A',
    marksPositive: 3,
    marksNegative: 1,
    explanation: 'North $+5\\,\\text{km}$, East $+3\\,\\text{km}$, South $-5\\,\\text{km}$. Net displacement in North-South is $0$. Remaining displacement is $3\\,\\text{km}$ East.'
  },

  // ==========================================
  // BITSAT BONUS SECTION QUESTIONS (12 BONUS)
  // ==========================================
  {
    id: 6001,
    subject: 'Bonus Section (BITSAT)',
    chapter: 'Physics Bonus',
    type: 'MCQ',
    exam: 'BITSAT',
    difficulty: 'Hard',
    questionText: '[BONUS QUESTION] A convex lens of focal length $20\\,\\text{cm}$ is cut into two equal halves along its principal axis. If the two halves are separated by $2\\,\\text{mm}$, how many real images of a point object placed on the axis will be formed?',
    options: [
      { key: 'Option A', text: '1' },
      { key: 'Option B', text: '2' },
      { key: 'Option C', text: '4' },
      { key: 'Option D', text: 'Infinite' }
    ],
    correctOption: 'Option B',
    marksPositive: 3,
    marksNegative: 1,
    explanation: 'Cutting the lens longitudinally along the principal axis creates two independent lenses, each with its own displaced optic axis. Hence, each half forms its own distinct real image, giving 2 separate images.'
  },
  {
    id: 6002,
    subject: 'Bonus Section (BITSAT)',
    chapter: 'Mathematics Bonus',
    type: 'MCQ',
    exam: 'BITSAT',
    difficulty: 'Hard',
    questionText: '[BONUS QUESTION] If $\\omega$ is a complex cube root of unity, evaluate $(1 - \\omega + \\omega^2)^5 + (1 + \\omega - \\omega^2)^5$.',
    options: [
      { key: 'Option A', text: '$32$' },
      { key: 'Option B', text: '$-32$' },
      { key: 'Option C', text: '$64$' },
      { key: 'Option D', text: '$0$' }
    ],
    correctOption: 'Option A',
    marksPositive: 3,
    marksNegative: 1,
    explanation: 'Since $1 + \\omega + \\omega^2 = 0$: $1 + \\omega^2 = -\\omega \\implies (-2\\omega)^5 = -32\\omega^5 = -32\\omega^2$. Also $1 + \\omega = -\\omega^2 \\implies (-2\\omega^2)^5 = -32\\omega^{10} = -32\\omega$. Sum $= -32(\\omega^2 + \\omega) = -32(-1) = 32$.'
  }
];
