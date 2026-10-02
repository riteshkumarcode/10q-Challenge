'use client';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from '@/src/compat/router';
import {
  Menu,
  Maximize2,
  Minimize2,
  User,
  LayoutGrid,
  GraduationCap,
  BookOpen,
  ClipboardList,
  BookMarked,
  HelpCircle,
  Video,
  FileText,
  Ticket,
  Bell,
  Edit3,
  Globe,
  MessageSquare,
  FileCheck,
  Receipt,
  Search,
  LogOut,
  Plus,
  ChevronRight,
  ChevronDown,
  Home,
  CheckCircle,
  CheckCircle2,
  TrendingUp,
  Award,
  Filter,
  Eye,
  Trash2,
  Edit,
  X,
  Send,
  Download,
  AlertCircle,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Code,
  RotateCcw,
  RotateCw,
  MoreVertical,
  CircleDot,
  Settings,
  List
} from 'lucide-react';
import { coursesData as initialCourses } from '../data/courses';
import { blogsData as initialBlogs } from '../data/blogs';
import { MASTER_QUESTION_BANK, SUBJECT_MASTER_LIST, CHAPTER_MASTER_LIST } from '../data/questionBank';

// Banner SVGs for Course Master cards matching screenshot 2
const bannerBitSat2026Crash = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><defs><linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23dc2626"/><stop offset="100%" stop-color="%237f1d1d"/></linearGradient></defs><rect width="800" height="450" fill="url(%23bg1)"/><rect x="30" y="30" width="360" height="50" rx="25" fill="%23000" opacity="0.6"/><text x="45" y="63" fill="%23fff" font-family="sans-serif" font-weight="900" font-size="24">Limited Seats - Enroll Now</text><text x="30" y="150" fill="%23fff" font-family="sans-serif" font-weight="900" font-size="52">BITSAT 2026</text><text x="30" y="215" fill="%23facc15" font-family="sans-serif" font-weight="900" font-size="46">Crash Course</text><rect x="30" y="245" width="280" height="55" rx="28" fill="%23991b1b"/><text x="65" y="282" fill="%23fff" font-family="sans-serif" font-weight="bold" font-size="30">Antim Batch</text><text x="30" y="335" fill="%23fef08a" font-family="sans-serif" font-weight="bold" font-size="20">Course Designed by BITSians</text><path d="M520 450 L520 220 L580 180 L640 220 L640 450 Z" fill="%23fde047" opacity="0.9"/><circle cx="580" cy="250" r="22" fill="%231e293b"/><path d="M580 235 L580 250 L590 250" stroke="%23fff" stroke-width="4" stroke-linecap="round"/><path d="M480 320 Q 550 280 620 340 T 780 320" fill="none" stroke="%23000" stroke-width="8"/><circle cx="510" cy="315" r="14" fill="%23eab308"/><circle cx="580" cy="310" r="14" fill="%23ef4444"/><circle cx="650" cy="335" r="14" fill="%2306b6d4"/><circle cx="720" cy="325" r="14" fill="%2322c55e"/></svg>`;

const bannerBitSat2026Master = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><defs><linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2316a34a"/><stop offset="100%" stop-color="%2314532d"/></linearGradient></defs><rect width="800" height="450" fill="url(%23bg2)"/><text x="30" y="110" fill="%23fff" font-family="sans-serif" font-weight="900" font-size="56">BITSAT 2026</text><text x="30" y="180" fill="%23facc15" font-family="sans-serif" font-weight="900" font-size="52">Master Course</text><rect x="30" y="215" width="460" height="65" rx="20" fill="%23fff"/><text x="50" y="258" fill="%2314532d" font-family="sans-serif" font-weight="900" font-size="28">Course by BITSians for future BITSians</text><path d="M560 450 L560 200 L620 160 L680 200 L680 450 Z" fill="%23fde047"/><circle cx="620" cy="230" r="22" fill="%231e293b"/><path d="M620 215 L620 230 L630 230" stroke="%23fff" stroke-width="4"/><path d="M500 360 Q 580 300 660 360 T 780 340" fill="none" stroke="%23000" stroke-width="8"/><circle cx="530" cy="345" r="14" fill="%23eab308"/><circle cx="600" cy="330" r="14" fill="%23ef4444"/><circle cx="670" cy="360" r="14" fill="%2306b6d4"/><circle cx="740" cy="345" r="14" fill="%2322c55e"/></svg>`;

const bannerBitSat2026Rapid = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><defs><linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%239333ea"/><stop offset="100%" stop-color="%23581c87"/></linearGradient></defs><rect width="800" height="450" fill="url(%23bg3)"/><text x="30" y="110" fill="%23fff" font-family="sans-serif" font-weight="900" font-size="56">BITSAT 2026</text><text x="30" y="180" fill="%23facc15" font-family="sans-serif" font-weight="900" font-size="46">Rapid Revision Course</text><rect x="30" y="215" width="460" height="65" rx="20" fill="%23fff"/><text x="50" y="258" fill="%23581c87" font-family="sans-serif" font-weight="900" font-size="28">Efficient Course for Last time prep</text><path d="M560 450 L560 200 L620 160 L680 200 L680 450 Z" fill="%23fde047"/><circle cx="620" cy="230" r="22" fill="%231e293b"/><path d="M500 360 Q 580 300 660 360 T 780 340" fill="none" stroke="%23000" stroke-width="8"/><circle cx="530" cy="345" r="14" fill="%23eab308"/><circle cx="600" cy="330" r="14" fill="%23ef4444"/></svg>`;

const bannerBitSat2027Champions = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><defs><linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e1b4b"/><stop offset="100%" stop-color="%23312e81"/></linearGradient></defs><rect width="800" height="450" fill="url(%23bg4)"/><text x="30" y="110" fill="%23fff" font-family="sans-serif" font-weight="900" font-size="56">BITSAT 2027</text><text x="30" y="180" fill="%23facc15" font-family="sans-serif" font-weight="900" font-size="44">Champions Course</text><rect x="30" y="215" width="340" height="180" rx="16" fill="%23fff" opacity="0.95"/><text x="50" y="250" fill="%231e1b4b" font-family="sans-serif" font-weight="bold" font-size="20">• Video Lectures</text><text x="210" y="250" fill="%231e1b4b" font-family="sans-serif" font-weight="bold" font-size="20">• Mock tests</text><text x="50" y="290" fill="%231e1b4b" font-family="sans-serif" font-weight="bold" font-size="20">• DPPs</text><text x="210" y="290" fill="%231e1b4b" font-family="sans-serif" font-weight="bold" font-size="20">• Short Notes</text><text x="50" y="330" fill="%231e1b4b" font-family="sans-serif" font-weight="bold" font-size="20">• Question bank</text><text x="210" y="330" fill="%231e1b4b" font-family="sans-serif" font-weight="bold" font-size="20">• Doubts Clearnace</text><path d="M560 450 L560 260 L620 220 L680 260 L680 450 Z" fill="%23fde047"/></svg>`;

const bannerBitSat2027Star = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><defs><linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23991b1b"/><stop offset="100%" stop-color="%23450a0a"/></linearGradient></defs><rect width="800" height="450" fill="url(%23bg5)"/><text x="30" y="110" fill="%23fff" font-family="sans-serif" font-weight="900" font-size="56">BITSAT 2027</text><text x="30" y="180" fill="%23facc15" font-family="sans-serif" font-weight="900" font-size="50">Star Program</text><rect x="30" y="215" width="460" height="85" rx="20" fill="%23fff"/><text x="50" y="268" fill="%237f1d1d" font-family="sans-serif" font-weight="900" font-size="26">Personal Mentorship + Complete Course material</text><path d="M560 450 L560 240 L620 200 L680 240 L680 450 Z" fill="%23fde047"/></svg>`;

export default function AdminDashboard({ initialTab = 'Exam Master' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Submenu Collapse State
  const [expandedMenus, setExpandedMenus] = useState({
    'Chapter Management': true,
    'Question Management': true,
    'Notification': true
  });

  const toggleMenuExpand = (menuName) => {
    setExpandedMenus((prev) => ({ ...prev, [menuName]: !prev[menuName] }));
  };

  // 1. EXAM MASTER STATE
  const [examList, setExamList] = useState([
    {
      id: 1,
      examName: 'BITSAT',
      slug: 'bitsat',
      description: 'BITSAT Entrance Exam preparation master course & test series.',
      metaTitle: 'BITSAT 2026 Entrance Prep | 10Q Challenge',
      metaDescription: 'Prepare for BITSAT 2026 with top BITSian mentors.'
    },
    {
      id: 2,
      examName: 'Comedk',
      slug: 'comedk',
      description: 'COMEDK UGET Engineering entrance preparation course.',
      metaTitle: 'COMEDK 2026 Test Series & Courses',
      metaDescription: 'Score top rank in COMEDK 2026.'
    },
    {
      id: 3,
      examName: 'JEE',
      slug: 'jee',
      description: 'JEE Main & Advanced comprehensive mentorship and question bank.',
      metaTitle: 'JEE Main & Advanced 2026 Mastery',
      metaDescription: 'Target IITs and NITs with 10Q Challenge.'
    },
    {
      id: 4,
      examName: 'Manipal (MET)',
      slug: 'manipal-met',
      description: 'Manipal Entrance Test (MET) crash course and test series.',
      metaTitle: 'MET 2026 Preparation Guide',
      metaDescription: 'Clear Manipal MET with top percentile.'
    },
    {
      id: 5,
      examName: 'VITEEE',
      slug: 'viteee',
      description: 'VITEEE speed accelerator and test series pack.',
      metaTitle: 'VITEEE 2026 Crash Course',
      metaDescription: 'Get admission in VIT Vellore.'
    }
  ]);
  const [examForm, setExamForm] = useState({ id: null, examName: '', slug: '', description: '', metaTitle: '', metaDescription: '' });
  const [examSearchTerm, setExamSearchTerm] = useState('');

  const handleSaveExam = (e) => {
    e.preventDefault();
    if (!examForm.examName.trim()) return;
    if (examForm.id) {
      setExamList(examList.map(item => item.id === examForm.id ? { ...examForm } : item));
    } else {
      const newId = examList.length ? Math.max(...examList.map(item => item.id)) + 1 : 1;
      setExamList([...examList, { ...examForm, id: newId, slug: examForm.slug || examForm.examName.toLowerCase().replace(/\s+/g, '-') }]);
    }
    setExamForm({ id: null, examName: '', slug: '', description: '', metaTitle: '', metaDescription: '' });
  };

  const handleEditExam = (exam) => {
    setExamForm(exam);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteExam = (id) => {
    if (window.confirm('Delete this exam?')) {
      setExamList(examList.filter(item => item.id !== id));
    }
  };

  // 2. SUBJECT MASTER STATE
  const [subjectList, setSubjectList] = useState([
    { id: 1, subjectCode: '101', subjectName: 'Physics' },
    { id: 2, subjectCode: '201', subjectName: 'Chemistry' },
    { id: 3, subjectCode: '301', subjectName: 'Maths' },
    { id: 4, subjectCode: '204', subjectName: 'LR & English' },
    { id: 5, subjectCode: '302', subjectName: 'Aptitude' },
    { id: 6, subjectCode: '102', subjectName: 'Bonus Questions' },
    { id: 7, subjectCode: '402', subjectName: 'Mock Tests' },
    { id: 8, subjectCode: '205', subjectName: 'All Subjects' }
  ]);
  const [subjectForm, setSubjectForm] = useState({ id: null, subjectCode: '', subjectName: '' });
  const [subjectSearchTerm, setSubjectSearchTerm] = useState('');

  const handleSaveSubject = (e) => {
    e.preventDefault();
    if (!subjectForm.subjectCode.trim() || !subjectForm.subjectName.trim()) return;
    if (subjectForm.id) {
      setSubjectList(subjectList.map(s => s.id === subjectForm.id ? { ...subjectForm } : s));
    } else {
      const newId = subjectList.length ? Math.max(...subjectList.map(s => s.id)) + 1 : 1;
      setSubjectList([...subjectList, { ...subjectForm, id: newId }]);
    }
    setSubjectForm({ id: null, subjectCode: '', subjectName: '' });
  };

  const handleEditSubject = (subject) => {
    setSubjectForm(subject);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteSubject = (id) => {
    if (window.confirm('Delete this subject?')) {
      setSubjectList(subjectList.filter(s => s.id !== id));
    }
  };

  // 3. CHAPTER MASTER TABBED STATE
  const [chapterActiveTab, setChapterActiveTab] = useState('Basic Information');
  const [chapterList, setChapterList] = useState([
    { id: 1, subject: 'Chemistry', chapterName: 'Alcohols Phenols and Ethers', description: 'Comprehensive study of organic oxygen compounds.', orderNumber: '1', enabled: true },
    { id: 2, subject: 'Chemistry', chapterName: 'Aldehydes Ketones and Carboxylic Acids', description: 'Carbonyl compounds and reactions.', orderNumber: '2', enabled: true },
    { id: 3, subject: 'Physics', chapterName: 'Alternating Current', description: 'AC circuits, transformers, and resonance.', orderNumber: '3', enabled: true },
    { id: 4, subject: 'Chemistry', chapterName: 'Amines', description: 'Nitrogen organic chemistry.', orderNumber: '4', enabled: true },
    { id: 5, subject: 'Maths', chapterName: 'Application of Derivatives', description: 'Tangents, normals, maxima, and minima.', orderNumber: '5', enabled: true },
    { id: 6, subject: 'Aptitude', chapterName: 'Aptitude', description: 'General aptitude and quantitative reasoning.', orderNumber: '6', enabled: true },
    { id: 7, subject: 'Maths', chapterName: 'Area under Curves', description: 'Definite integrals application.', orderNumber: '7', enabled: true },
    { id: 8, subject: 'Chemistry', chapterName: 'Atomic Structure', description: 'Quantum model, Bohr orbit, and electronic configuration.', orderNumber: '8', enabled: true },
    { id: 9, subject: 'Physics', chapterName: 'Basics', description: 'Vectors, units, and dimensions.', orderNumber: '9', enabled: true },
    { id: 10, subject: 'Maths', chapterName: 'Binomial Theorem', description: 'Binomial expansions and general term.', orderNumber: '10', enabled: true }
  ]);

  const [chapterForm, setChapterForm] = useState({
    id: null,
    subject: '',
    chapterName: '',
    description: '',
    orderNumber: '',
    enabled: true
  });
  const [chapterSearchTerm, setChapterSearchTerm] = useState('');

  const handleSaveChapter = (e) => {
    e.preventDefault();
    if (!chapterForm.chapterName.trim()) return;

    if (chapterForm.id) {
      setChapterList(chapterList.map(c => c.id === chapterForm.id ? { ...chapterForm } : c));
    } else {
      const newId = chapterList.length ? Math.max(...chapterList.map(c => c.id)) + 1 : 1;
      setChapterList([...chapterList, { ...chapterForm, id: newId }]);
    }

    setChapterForm({ id: null, subject: '', chapterName: '', description: '', orderNumber: '', enabled: true });
    setChapterActiveTab('Table');
  };

  const handleEditChapter = (chapter) => {
    setChapterForm({
      id: chapter.id,
      subject: chapter.subject || 'Physics',
      chapterName: chapter.chapterName || '',
      description: chapter.description || '',
      orderNumber: chapter.orderNumber || '1',
      enabled: chapter.enabled !== undefined ? chapter.enabled : true
    });
    setChapterActiveTab('Basic Information');
  };

  const handleDeleteChapter = (id) => {
    if (window.confirm('Are you sure you want to delete this chapter?')) {
      setChapterList(chapterList.filter(c => c.id !== id));
    }
  };

  // 4. CHAPTER TOPIC MASTER TABBED STATE (Matching Screenshots 1 & 2)
  const [topicActiveTab, setTopicActiveTab] = useState('Basic Information'); // 'Basic Information' or 'Table'
  const [topicList, setTopicList] = useState([
    { id: 1, subject: 'Physics', chapter: 'Rotational Motion', topicName: 'Torque & Angular Momentum', description: 'Concepts of torque, angular acceleration and conservation of angular momentum.', orderNumber: '1', enabled: true },
    { id: 2, subject: 'Physics', chapter: 'Electrostatics & Capacitance', topicName: 'Gauss Law & Electric Field', description: 'Electric flux, Gauss theorem applications and surface charge density.', orderNumber: '2', enabled: true },
    { id: 3, subject: 'Maths', chapter: 'Integration & Calculus', topicName: 'Definite Integrals by Substitution', description: 'Properties of definite integrals and substitution shortcuts.', orderNumber: '3', enabled: true },
    { id: 4, subject: 'Chemistry', chapter: 'Alcohols Phenols and Ethers', topicName: 'Reimer-Tiemann & Kolbe Reaction', description: 'Preparation and electrophilic substitution of phenols.', orderNumber: '4', enabled: true },
    { id: 5, subject: 'Chemistry', chapter: 'Aldehydes Ketones and Carboxylic Acids', topicName: 'Aldol Condensation & Cannizzaro', description: 'Nucleophilic addition and condensation reactions of carbonyls.', orderNumber: '5', enabled: true }
  ]);

  const [topicForm, setTopicForm] = useState({
    id: null,
    subject: '',
    chapter: '',
    topicName: '',
    description: '',
    orderNumber: '',
    enabled: true
  });
  const [topicSearchTerm, setTopicSearchTerm] = useState('');

  const handleSaveTopic = (e) => {
    e.preventDefault();
    if (!topicForm.topicName.trim()) return;

    if (topicForm.id) {
      setTopicList(topicList.map(t => t.id === topicForm.id ? { ...topicForm } : t));
    } else {
      const newId = topicList.length ? Math.max(...topicList.map(t => t.id)) + 1 : 1;
      setTopicList([...topicList, { ...topicForm, id: newId }]);
    }

    setTopicForm({ id: null, subject: '', chapter: '', topicName: '', description: '', orderNumber: '', enabled: true });
    setTopicActiveTab('Table'); // Auto switch to table tab after save
  };

  const handleEditTopic = (topic) => {
    setTopicForm({
      id: topic.id,
      subject: topic.subject || '',
      chapter: topic.chapter || '',
      topicName: topic.topicName || '',
      description: topic.description || '',
      orderNumber: topic.orderNumber || '1',
      enabled: topic.enabled !== undefined ? topic.enabled : true
    });
    setTopicActiveTab('Basic Information'); // Auto switch to form tab for edit
  };

  const handleDeleteTopic = (id) => {
    if (window.confirm('Are you sure you want to delete this chapter topic?')) {
      setTopicList(topicList.filter(t => t.id !== id));
    }
  };

  // 5. OBJECTIVE QUESTION STATE
  const [objectiveQuestionList, setObjectiveQuestionList] = useState(
    MASTER_QUESTION_BANK.filter(q => q.type === 'MCQ').map(q => ({
      id: q.id,
      subject: q.subject,
      chapter: q.chapter,
      question: q.questionText,
      optionA: q.options[0]?.text || '',
      optionB: q.options[1]?.text || '',
      optionC: q.options[2]?.text || '',
      optionD: q.options[3]?.text || '',
      correctOption: q.correctOption,
      difficulty: q.difficulty
    }))
  );
  const [objModalOpen, setObjModalOpen] = useState(false);
  const [objSubjectFilter, setObjSubjectFilter] = useState('');
  const [objQuestionForm, setObjQuestionForm] = useState({
    id: null,
    subject: 'Physics',
    chapter: 'Rotational Motion & Mechanics',
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: 'Option A',
    difficulty: 'Medium'
  });
  const [objSearchTerm, setObjSearchTerm] = useState('');

  const handleSaveObjQuestion = (e) => {
    e.preventDefault();
    if (!objQuestionForm.question.trim()) return;
    if (objQuestionForm.id) {
      setObjectiveQuestionList(objectiveQuestionList.map(q => q.id === objQuestionForm.id ? { ...objQuestionForm } : q));
    } else {
      const newId = objectiveQuestionList.length ? Math.max(...objectiveQuestionList.map(q => q.id)) + 1 : 1;
      setObjectiveQuestionList([...objectiveQuestionList, { ...objQuestionForm, id: newId }]);
    }
    setObjQuestionForm({
      id: null,
      subject: 'Physics',
      chapter: 'Rotational Motion & Mechanics',
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctOption: 'Option A',
      difficulty: 'Medium'
    });
    setObjModalOpen(false);
  };

  const handleEditObjQuestion = (q) => {
    setObjQuestionForm(q);
    setObjModalOpen(true);
  };

  const handleDeleteObjQuestion = (id) => {
    if (window.confirm('Are you sure you want to delete this objective question?')) {
      setObjectiveQuestionList(objectiveQuestionList.filter(q => q.id !== id));
    }
  };

  // 6. NUMERICAL QUESTION STATE
  const [numericalQuestionList, setNumericalQuestionList] = useState(
    MASTER_QUESTION_BANK.filter(q => q.type === 'NUMERICAL').map(q => ({
      id: q.id,
      subject: q.subject,
      chapter: q.chapter,
      question: q.questionText,
      numericalValue: q.numericalValue || '',
      tolerance: q.tolerance || '0.05',
      difficulty: q.difficulty
    }))
  );
  const [numModalOpen, setNumModalOpen] = useState(false);
  const [numSubjectFilter, setNumSubjectFilter] = useState('');
  const [numQuestionForm, setNumQuestionForm] = useState({
    id: null,
    subject: 'Physics',
    chapter: 'Rotational Motion',
    question: '',
    numericalValue: '',
    tolerance: '0.05',
    difficulty: 'Medium'
  });
  const [numSearchTerm, setNumSearchTerm] = useState('');

  const handleSaveNumQuestion = (e) => {
    e.preventDefault();
    if (!numQuestionForm.question.trim()) return;
    if (numQuestionForm.id) {
      setNumericalQuestionList(numericalQuestionList.map(q => q.id === numQuestionForm.id ? { ...numQuestionForm } : q));
    } else {
      const newId = numericalQuestionList.length ? Math.max(...numericalQuestionList.map(q => q.id)) + 1 : 1;
      setNumericalQuestionList([...numericalQuestionList, { ...numQuestionForm, id: newId }]);
    }
    setNumQuestionForm({
      id: null,
      subject: 'Physics',
      chapter: 'Rotational Motion',
      question: '',
      numericalValue: '',
      tolerance: '0.05',
      difficulty: 'Medium'
    });
    setNumModalOpen(false);
  };

  const handleEditNumQuestion = (q) => {
    setNumQuestionForm(q);
    setNumModalOpen(true);
  };

  const handleDeleteNumQuestion = (id) => {
    if (window.confirm('Are you sure you want to delete this numerical question?')) {
      setNumericalQuestionList(numericalQuestionList.filter(q => q.id !== id));
    }
  };

  // 7. COURSE MASTER STATE
  const [courseActiveTab, setCourseActiveTab] = useState('Table'); // 'Basic Information' or 'Table'
  const [courseList, setCourseList] = useState([
    {
      id: 1,
      title: 'BITSAT 2026 Crash Course (Antim Batch)',
      shortDescription: 'Limited Seats - Complete high-yield preparation designed by BITSians.',
      description: '<p>The ultimate end-to-end BITSAT preparation package with HD video lectures, chapter notes, and 30+ full mock tests.</p>',
      exam: 'BITSAT',
      originalPrice: '14999',
      discountedPrice: '4999',
      price: '4,999',
      expiryDate: '2026-07-31',
      enrolledStudent: '1420',
      displayIndex: '1',
      additionalDetails: 'Includes 1-on-1 mentorship & WhatsApp doubt support group.',
      image: bannerBitSat2026Crash,
      bannerImage: bannerBitSat2026Crash,
      altCourseImage: 'BITSAT 2026 Crash Course Thumbnail',
      altBannerImage: 'BITSAT 2026 Antim Batch Large Banner',
      scheduleFile: 'BITSAT_2026_Study_Schedule.pdf',
      slug: 'bitsat-2026-crash-course',
      metaTitle: 'BITSAT 2026 Crash Course - Antim Batch | 10Q Challenge',
      metaDescription: 'Join Antim Batch for BITSAT 2026 with BITSian mentors, video lectures & CBT mock tests.',
      courseLink: '/course-detail/bitsat-2026-crash-course',
      isShowInIndex: true,
      isActive: true,
      isShowInMentorship: false,
      isShowInTestSeries: false,
      mentor: 'Harshal Jain'
    },
    {
      id: 2,
      title: 'BITSAT 2026 Master Course',
      shortDescription: 'Course by BITSians for future BITSians with complete video library.',
      description: '<p>Comprehensive concept mastery across Physics, Chemistry, Maths, and LR & English.</p>',
      exam: 'BITSAT',
      originalPrice: '18999',
      discountedPrice: '6999',
      price: '6,999',
      expiryDate: '2026-08-15',
      enrolledStudent: '2890',
      displayIndex: '2',
      additionalDetails: 'Full recorded archive + live problem solving workshops.',
      image: bannerBitSat2026Master,
      bannerImage: bannerBitSat2026Master,
      altCourseImage: 'BITSAT 2026 Master Course Thumbnail',
      altBannerImage: 'BITSAT Master Banner',
      scheduleFile: 'BITSAT_Master_Roadmap.pdf',
      slug: 'bitsat-2026-master-course',
      metaTitle: 'BITSAT 2026 Master Course Prep | 10Q Challenge',
      metaDescription: 'Target 350+ in BITSAT 2026 with master concept lectures and DPP solutions.',
      courseLink: '/course-detail/bitsat-2026-master-course',
      isShowInIndex: true,
      isActive: true,
      isShowInMentorship: false,
      isShowInTestSeries: true,
      mentor: 'Kartik V'
    },
    {
      id: 3,
      title: 'BITSAT 2026 Rapid Revision Course',
      shortDescription: 'Efficient course for last time high-speed preparation.',
      description: '<p>Fast-track revision covering top weightage chapters in 45 days.</p>',
      exam: 'BITSAT',
      originalPrice: '9999',
      discountedPrice: '2999',
      price: '2,999',
      expiryDate: '2026-06-30',
      enrolledStudent: '1150',
      displayIndex: '3',
      additionalDetails: 'Includes 100 high-yield formula sheets and 15 mock tests.',
      image: bannerBitSat2026Rapid,
      bannerImage: bannerBitSat2026Rapid,
      altCourseImage: 'BITSAT Rapid Revision Thumbnail',
      altBannerImage: 'BITSAT Rapid Revision Banner',
      scheduleFile: 'Rapid_Revision_Schedule.pdf',
      slug: 'bitsat-2026-rapid-revision-course',
      metaTitle: 'BITSAT 2026 Rapid Revision Pack | 10Q Challenge',
      metaDescription: 'Score high in BITSAT with 45-day rapid revision sprints.',
      courseLink: '/course-detail/bitsat-2026-rapid-revision-course',
      isShowInIndex: true,
      isActive: true,
      isShowInMentorship: false,
      isShowInTestSeries: true,
      mentor: 'BITSians'
    },
    {
      id: 4,
      title: 'BITSAT 2027 Champions Course',
      shortDescription: '2-Year foundation batch for 11th moving to 12th aspirants.',
      description: '<p>Complete video lectures, mock tests, DPPs, short notes, question bank, and doubt clearance.</p>',
      exam: 'BITSAT',
      originalPrice: '24999',
      discountedPrice: '9999',
      price: '9,999',
      expiryDate: '2027-06-30',
      enrolledStudent: '820',
      displayIndex: '4',
      additionalDetails: 'Two years of continuous mentorship and chapter test series.',
      image: bannerBitSat2027Champions,
      bannerImage: bannerBitSat2027Champions,
      altCourseImage: 'BITSAT 2027 Champions Batch Thumbnail',
      altBannerImage: 'BITSAT 2027 Champions Large Banner',
      scheduleFile: 'BITSAT_2027_Champions_Plan.pdf',
      slug: 'bitsat-2027-champions-course',
      metaTitle: 'BITSAT 2027 Champions 2-Year Program | 10Q Challenge',
      metaDescription: 'Foundation to advance mastery for BITSAT 2027.',
      courseLink: '/course-detail/bitsat-2027-champions-course',
      isShowInIndex: true,
      isActive: true,
      isShowInMentorship: true,
      isShowInTestSeries: true,
      mentor: 'Harshal Jain'
    },
    {
      id: 5,
      title: '1-on-1 Personal Mentorship Program by BITSians',
      shortDescription: 'Personal mentorship + complete course material & weekly video strategy calls.',
      description: '<p>Dedicated BITS Pilani senior mentor assigned for daily accountability and test analysis.</p>',
      exam: 'BITSAT',
      originalPrice: '29999',
      discountedPrice: '14999',
      price: '14,999',
      expiryDate: '2026-08-31',
      enrolledStudent: '480',
      displayIndex: '5',
      additionalDetails: 'Direct 1-on-1 WhatsApp connection with your mentor.',
      image: bannerBitSat2027Star,
      bannerImage: bannerBitSat2027Star,
      altCourseImage: 'BITSAT Mentorship Thumbnail',
      altBannerImage: 'BITSAT Mentorship Large Banner',
      scheduleFile: 'Mentorship_Roadmap.pdf',
      slug: '1-on-1-personal-mentorship-program-by-bitsians',
      metaTitle: '1-on-1 BITSAT Mentorship Program | 10Q Challenge',
      metaDescription: 'Get personal guidance from top BITS Pilani rankers.',
      courseLink: '/mentorship-detail/1-on-1-personal-mentorship-program-by-bitsians',
      isShowInIndex: true,
      isActive: true,
      isShowInMentorship: true,
      isShowInTestSeries: false,
      mentor: 'Harshal Jain'
    }
  ]);

  const defaultCourseForm = {
    id: null,
    title: '',
    shortDescription: '',
    description: '',
    exam: 'BITSAT',
    originalPrice: '',
    discountedPrice: '',
    expiryDate: '',
    enrolledStudent: '',
    displayIndex: '1',
    additionalDetails: '',
    image: '',
    bannerImage: '',
    altCourseImage: '',
    altBannerImage: '',
    scheduleFile: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    courseLink: '',
    isShowInIndex: true,
    isActive: true,
    isShowInMentorship: false,
    isShowInTestSeries: false,
    mentor: 'Harshal Jain'
  };

  const [courseForm, setCourseForm] = useState(defaultCourseForm);
  const [courseSearchTerm, setCourseSearchTerm] = useState('');
  const [courseModalOpen, setCourseModalOpen] = useState(false);

  const handleSaveCourse = (e) => {
    e.preventDefault();
    if (!courseForm.title.trim()) return;

    const autoSlug = courseForm.slug || courseForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const priceFormatted = courseForm.discountedPrice || courseForm.originalPrice || '4999';

    if (courseForm.id) {
      setCourseList(courseList.map(c => c.id === courseForm.id ? { ...courseForm, slug: autoSlug, price: priceFormatted } : c));
    } else {
      const newId = courseList.length ? Math.max(...courseList.map(c => c.id)) + 1 : 1;
      const newCourse = {
        ...courseForm,
        id: newId,
        slug: autoSlug,
        price: priceFormatted,
        image: courseForm.image || bannerBitSat2026Master,
        bannerImage: courseForm.bannerImage || bannerBitSat2026Master
      };
      setCourseList([...courseList, newCourse]);
    }

    setCourseForm(defaultCourseForm);
    setCourseActiveTab('Table');
    setCourseModalOpen(false);
  };

  const handleEditCourse = (course) => {
    setCourseForm({ ...defaultCourseForm, ...course });
    setCourseActiveTab('Basic Information');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm('Are you sure you want to delete this course from the master catalogue?')) {
      setCourseList(courseList.filter(c => c.id !== id));
    }
  };

  // 8. VIDEO MASTER STATE
  const [videoActiveTab, setVideoActiveTab] = useState('Basic Information');
  const [videoCourseFilter, setVideoCourseFilter] = useState('');
  const [videoList, setVideoList] = useState([
    {
      id: 1,
      course: 'BITSAT 2026 Crash Course (Antim Batch)',
      subject: 'Physics',
      chapter: 'Rotational Motion',
      title: 'Torque & Angular Momentum Full Concept Lecture',
      description: 'Comprehensive video on rotational dynamics and moment of inertia.',
      videoLink: 'https://youtube.com/watch?v=sample1',
      orderNumber: '1',
      liveVideo: false,
      enabled: true
    },
    {
      id: 2,
      course: 'BITSAT 2026 Crash Course (Antim Batch)',
      subject: 'Chemistry',
      chapter: 'Alcohols Phenols and Ethers',
      title: 'Reimer-Tiemann & Kolbe Reaction One Shot',
      description: 'Full reaction mechanism and short tricks.',
      videoLink: 'https://youtube.com/watch?v=sample2',
      orderNumber: '2',
      liveVideo: true,
      enabled: true
    },
    {
      id: 3,
      course: 'BITSAT 2026 Master Course',
      subject: 'Maths',
      chapter: 'Integration & Calculus',
      title: 'Definite Integration Speed Shortcuts',
      description: 'Solve definite integrals in under 30 seconds.',
      videoLink: 'https://youtube.com/watch?v=sample3',
      orderNumber: '3',
      liveVideo: false,
      enabled: true
    }
  ]);
  const [videoForm, setVideoForm] = useState({
    id: null,
    course: 'BITSAT 2026 Crash Course (Antim Batch)',
    subject: 'Physics',
    chapter: 'Rotational Motion',
    title: '',
    description: '',
    videoLink: '',
    orderNumber: '1',
    liveVideo: false,
    enabled: true
  });
  const [videoSubjectFilter, setVideoSubjectFilter] = useState('');
  const [videoSearchTerm, setVideoSearchTerm] = useState('');

  const handleSaveVideo = (e) => {
    e.preventDefault();
    if (!videoForm.title.trim()) return;
    if (videoForm.id) {
      setVideoList(videoList.map(v => v.id === videoForm.id ? { ...videoForm } : v));
    } else {
      const newId = videoList.length ? Math.max(...videoList.map(v => v.id)) + 1 : 1;
      setVideoList([...videoList, { ...videoForm, id: newId }]);
    }
    setVideoForm({
      id: null,
      course: videoForm.course || 'BITSAT 2026 Crash Course (Antim Batch)',
      subject: 'Physics',
      chapter: 'Rotational Motion',
      title: '',
      description: '',
      videoLink: '',
      orderNumber: '1',
      liveVideo: false,
      enabled: true
    });
    setVideoActiveTab('Table');
  };

  const handleEditVideo = (video) => {
    setVideoForm(video);
    setVideoActiveTab('Basic Information');
  };

  const handleDeleteVideo = (id) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      setVideoList(videoList.filter(v => v.id !== id));
    }
  };

  // 9. DOCUMENT MASTER STATE
  const [docActiveTab, setDocActiveTab] = useState('Basic Information');
  const [docCourseFilter, setDocCourseFilter] = useState('');
  const [docList, setDocList] = useState([
    {
      id: 1,
      course: 'BITSAT 2026 Crash Course (Antim Batch)',
      subject: 'Physics',
      chapter: 'Rotational Motion',
      title: 'BITSAT Physics Formula Sheet 2026',
      description: 'Quick reference formulas for mechanics, electrodynamics, modern physics.',
      fileName: 'Physics_Formula_Sheet.pdf',
      orderNumber: '1',
      enabled: true
    },
    {
      id: 2,
      course: 'BITSAT 2026 Crash Course (Antim Batch)',
      subject: 'Chemistry',
      chapter: 'Alcohols Phenols and Ethers',
      title: 'Organic Chemistry Mind Map & Reaction Flowchart',
      description: 'All named reactions and reagents summarized.',
      fileName: 'Organic_Chemistry_Mindmap.pdf',
      orderNumber: '2',
      enabled: true
    },
    {
      id: 3,
      course: 'BITSAT 2026 Master Course',
      subject: 'Maths',
      chapter: 'Integration & Calculus',
      title: 'Calculus High Yield Question Bank with Solutions',
      description: '100 handpicked questions with step-by-step solutions.',
      fileName: 'Calculus_Question_Bank.pdf',
      orderNumber: '3',
      enabled: true
    }
  ]);
  const [docForm, setDocForm] = useState({
    id: null,
    course: 'BITSAT 2026 Crash Course (Antim Batch)',
    subject: 'Physics',
    chapter: 'Rotational Motion',
    title: '',
    description: '',
    fileName: '',
    orderNumber: '1',
    enabled: true
  });
  const [docSubjectFilter, setDocSubjectFilter] = useState('');
  const [docSearchTerm, setDocSearchTerm] = useState('');

  const handleSaveDoc = (e) => {
    e.preventDefault();
    if (!docForm.title.trim()) return;
    if (docForm.id) {
      setDocList(docList.map(d => d.id === docForm.id ? { ...docForm } : d));
    } else {
      const newId = docList.length ? Math.max(...docList.map(d => d.id)) + 1 : 1;
      setDocList([...docList, { ...docForm, id: newId }]);
    }
    setDocForm({
      id: null,
      course: docForm.course || 'BITSAT 2026 Crash Course (Antim Batch)',
      subject: 'Physics',
      chapter: 'Rotational Motion',
      title: '',
      description: '',
      fileName: '',
      orderNumber: '1',
      enabled: true
    });
    setDocActiveTab('Table');
  };

  const handleEditDoc = (doc) => {
    setDocForm(doc);
    setDocActiveTab('Basic Information');
  };

  const handleDeleteDoc = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocList(docList.filter(d => d.id !== id));
    }
  };

  // 10. COUPON MASTER STATE
  const [couponList, setCouponList] = useState([
    { id: 1, code: '24JuneBitsat500', validFrom: '01/Aug/2026', expiryDate: '30/Nov/2026', discount: '0%', usage: '0 / 5' },
    { id: 2, code: '22JuneBitsat600', validFrom: '22/Jun/2026', expiryDate: '12/Aug/2026', discount: '100%', usage: '10 / 0' },
    { id: 3, code: '7AugBitstar', validFrom: '07/Aug/2026', expiryDate: '05/Sep/2026', discount: '100%', usage: '5 / 0' },
    { id: 4, code: 'BIT5', validFrom: '14/Mar/2025', expiryDate: '30/Nov/2025', discount: '1999', usage: '10 / 0' },
    { id: 5, code: 'BITS25', validFrom: '04/Mar/2026', expiryDate: '21/May/2026', discount: '1500', usage: '1000 / 0' },
    { id: 6, code: 'BITS2560000', validFrom: '01/Sep/2026', expiryDate: '31/Dec/2026', discount: '1500', usage: '100 / 0' },
    { id: 7, code: 'BITS20', validFrom: '24/Dec/2025', expiryDate: '21/Jan/2026', discount: '1500', usage: '200 / 0' },
    { id: 8, code: 'BITS2000', validFrom: '01/Jan/2025', expiryDate: '15/Jan/2026', discount: '2000', usage: '20 / 0' },
    { id: 9, code: 'BITS1500', validFrom: '01/Jan/2024', expiryDate: '15/Jan/2024', discount: '1500', usage: '40 / 0' }
  ]);
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [couponForm, setCouponForm] = useState({
    id: null,
    code: '',
    validFrom: '',
    expiryDate: '',
    discount: '',
    usageAllowed: '10',
    usageUsed: '0'
  });
  const [couponSearchTerm, setCouponSearchTerm] = useState('');

  const handleSaveCoupon = (e) => {
    e.preventDefault();
    if (!couponForm.code.trim()) return;
    const formattedUsage = `${couponForm.usageAllowed || '10'} / ${couponForm.usageUsed || '0'}`;
    if (couponForm.id) {
      setCouponList(couponList.map(c => c.id === couponForm.id ? { ...couponForm, usage: formattedUsage } : c));
    } else {
      const newId = couponList.length ? Math.max(...couponList.map(c => c.id)) + 1 : 1;
      setCouponList([...couponList, { ...couponForm, id: newId, usage: formattedUsage }]);
    }
    setCouponForm({
      id: null,
      code: '',
      validFrom: '',
      expiryDate: '',
      discount: '',
      usageAllowed: '10',
      usageUsed: '0'
    });
    setCouponModalOpen(false);
  };

  const handleEditCoupon = (coupon) => {
    const parts = coupon.usage ? coupon.usage.split('/') : ['10', '0'];
    setCouponForm({
      ...coupon,
      usageAllowed: parts[0] ? parts[0].trim() : '10',
      usageUsed: parts[1] ? parts[1].trim() : '0'
    });
    setCouponModalOpen(true);
  };

  const handleDeleteCoupon = (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      setCouponList(couponList.filter(c => c.id !== id));
    }
  };

  // 10. BLOG MASTER STATE & HANDLERS MATCHING USER SCREENSHOT
  const [blogList, setBlogList] = useState(() => {
    return initialBlogs.map((b, idx) => ({
      id: b.id || idx + 1,
      exam: b.exam || 'BITSAT',
      title: b.title || 'BITSAT Preparation Strategy',
      slug: b.slug || 'bitsat-strategy',
      description: b.contentHtml || b.excerpt || '',
      smallImage: b.image || '',
      largeImage: b.image || '',
      altSmall: b.title || '',
      altLarge: b.title || '',
      metaTitle: b.title || '',
      metaDescription: b.excerpt || '',
      published: true
    }));
  });

  const [blogActiveTab, setBlogActiveTab] = useState('Basic Information');
  const [blogSearchTerm, setBlogSearchTerm] = useState('');

  const [blogForm, setBlogForm] = useState({
    id: null,
    exam: 'BITSAT',
    title: '',
    slug: '',
    description: '',
    smallImage: '',
    largeImage: '',
    altSmall: '',
    altLarge: '',
    metaTitle: '',
    metaDescription: '',
    published: true
  });

  const handleSaveBlog = (e) => {
    e.preventDefault();
    if (!blogForm.title.trim()) return;

    const newSlug = blogForm.slug.trim() || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    if (blogForm.id) {
      setBlogList(blogList.map(b => b.id === blogForm.id ? { ...blogForm, slug: newSlug } : b));
    } else {
      const newId = blogList.length ? Math.max(...blogList.map(b => b.id)) + 1 : 1;
      setBlogList([{ ...blogForm, id: newId, slug: newSlug }, ...blogList]);
    }

    setBlogForm({
      id: null,
      exam: 'BITSAT',
      title: '',
      slug: '',
      description: '',
      smallImage: '',
      largeImage: '',
      altSmall: '',
      altLarge: '',
      metaTitle: '',
      metaDescription: '',
      published: true
    });
    setBlogActiveTab('Table');
  };

  const handleEditBlog = (blog) => {
    setBlogForm({ ...blog });
    setBlogActiveTab('Basic Information');
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogList(blogList.filter(b => b.id !== id));
    }
  };

  const handleAddNewBlog = () => {
    setBlogForm({
      id: null,
      exam: 'BITSAT',
      title: '',
      slug: '',
      description: '',
      smallImage: '',
      largeImage: '',
      altSmall: '',
      altLarge: '',
      metaTitle: '',
      metaDescription: '',
      published: true
    });
    setBlogActiveTab('Basic Information');
  };

  // 11. SEO PAGE MASTER STATE & HANDLERS
  const [seoList, setSeoList] = useState([
    {
      id: 1,
      pageName: 'bitsat',
      metaTitle: 'BITSAT 2026 Entrance Prep & Test Series | 10Q Challenge',
      metaDescription: 'Comprehensive BITSAT 2026 preparation with mock tests and BITSian mentorship.'
    },
    {
      id: 2,
      pageName: 'comedk',
      metaTitle: 'COMEDK 2026 Test Series & Practice Courses | 10Q Challenge',
      metaDescription: 'Target top rank in COMEDK 2026 with curated question bank and mocks.'
    },
    {
      id: 3,
      pageName: 'jee',
      metaTitle: 'JEE Main & Advanced 2026 Preparation | 10Q Challenge',
      metaDescription: 'Master JEE Main & Advanced with chapterwise tests and video solutions.'
    },
    {
      id: 4,
      pageName: 'home',
      metaTitle: '10Q Challenge - Premier Online Exam Preparation Platform',
      metaDescription: 'India\'s leading test series and mentorship platform for engineering aspirants.'
    },
    {
      id: 5,
      pageName: 'blog',
      metaTitle: '10Q Challenge Blog - Preparation Tips, News & Strategies',
      metaDescription: 'Read latest exam updates, preparation strategies, and toppers advice.'
    },
    {
      id: 6,
      pageName: 'contact-us',
      metaTitle: 'Contact Us - 10Q Challenge Support',
      metaDescription: 'Get in touch with 10Q Challenge team for support and inquiries.'
    }
  ]);

  const [seoForm, setSeoForm] = useState({
    id: null,
    pageName: '',
    metaTitle: '',
    metaDescription: ''
  });

  const [seoSearchTerm, setSeoSearchTerm] = useState('');

  const handleSaveSeo = (e) => {
    e.preventDefault();
    if (!seoForm.pageName.trim()) return;

    if (seoForm.id) {
      setSeoList(seoList.map(s => s.id === seoForm.id ? { ...seoForm } : s));
    } else {
      const existing = seoList.find(s => s.pageName.toLowerCase() === seoForm.pageName.toLowerCase());
      if (existing) {
        setSeoList(seoList.map(s => s.id === existing.id ? { ...seoForm, id: existing.id } : s));
      } else {
        const newId = seoList.length ? Math.max(...seoList.map(s => s.id)) + 1 : 1;
        setSeoList([...seoList, { ...seoForm, id: newId }]);
      }
    }

    setSeoForm({ id: null, pageName: '', metaTitle: '', metaDescription: '' });
  };

  const handleEditSeo = (item) => {
    setSeoForm({ ...item });
  };

  // 12. NOTIFICATION STATE & HANDLERS
  const [siteNotifications, setSiteNotifications] = useState([
    {
      id: 1,
      title: 'BITSAT 2026 Crash Course Antim Batch Live',
      message: 'Enrollment for Antim batch is now open. Exclusive discount available.',
      target: 'All Visitors',
      date: '2026-09-07 10:00 AM'
    },
    {
      id: 2,
      title: 'System Maintenance Scheduled',
      message: 'Platform maintenance tonight from 2 AM to 4 AM IST.',
      target: 'All Users',
      date: '2026-09-06 08:30 PM'
    }
  ]);

  const [studentNotifications, setStudentNotifications] = useState([
    {
      id: 1,
      studentName: 'Rahul Sharma',
      studentEmail: 'rahul.s@gmail.com',
      title: 'Mock Test 5 Result Declared',
      message: 'Your BITSAT Full Syllabus Test 5 scorecard is ready. Score: 312/390.',
      status: 'Delivered',
      sentAt: '2026-09-07 09:15 AM'
    },
    {
      id: 2,
      studentName: 'Priya Verma',
      studentEmail: 'priya.v@gmail.com',
      title: 'Doubt Resolved by Mentor',
      message: 'Mentor Vivek answered your Physics Electromagnetism query.',
      status: 'Read',
      sentAt: '2026-09-07 08:45 AM'
    }
  ]);

  const [siteNotifForm, setSiteNotifForm] = useState({
    title: '',
    message: '',
    target: 'All Visitors'
  });

  const [studentNotifForm, setStudentNotifForm] = useState({
    studentEmail: '',
    title: '',
    message: ''
  });

  const handleSendSiteNotif = (e) => {
    e.preventDefault();
    if (!siteNotifForm.title.trim()) return;
    const newNotif = {
      id: siteNotifications.length + 1,
      ...siteNotifForm,
      date: new Date().toLocaleString()
    };
    setSiteNotifications([newNotif, ...siteNotifications]);
    setSiteNotifForm({ title: '', message: '', target: 'All Visitors' });
  };

  const handleSendStudentNotif = (e) => {
    e.preventDefault();
    if (!studentNotifForm.title.trim()) return;
    const newNotif = {
      id: studentNotifications.length + 1,
      studentName: studentNotifForm.studentEmail ? studentNotifForm.studentEmail.split('@')[0] : 'Student',
      studentEmail: studentNotifForm.studentEmail || 'all@students.com',
      title: studentNotifForm.title,
      message: studentNotifForm.message,
      status: 'Delivered',
      sentAt: new Date().toLocaleString()
    };
    setStudentNotifications([newNotif, ...studentNotifications]);
    setStudentNotifForm({ studentEmail: '', title: '', message: '' });
  };

  // 13. STUDENT INVOICES STATE
  const [invoiceList, setInvoiceList] = useState([
    {
      id: 1,
      invoiceNo: 'INV-2026-001',
      invoiceDate: '2026-04-12',
      studentName: 'Aarav Sharma',
      coupon: 'BITSAT10',
      invoiceAmount: '₹4,999',
      invoiceStatus: 'Paid'
    },
    {
      id: 2,
      invoiceNo: 'INV-2026-002',
      invoiceDate: '2026-04-10',
      studentName: 'Rohan Verma',
      coupon: '-',
      invoiceAmount: '₹3,499',
      invoiceStatus: 'Paid'
    },
    {
      id: 3,
      invoiceNo: 'INV-2026-003',
      invoiceDate: '2026-04-08',
      studentName: 'Ananya Gupta',
      coupon: 'EARLYBIRD',
      invoiceAmount: '₹2,999',
      invoiceStatus: 'Pending'
    },
    {
      id: 4,
      invoiceNo: 'INV-2026-004',
      invoiceDate: '2026-04-05',
      studentName: 'Kunal Patel',
      coupon: '-',
      invoiceAmount: '₹4,999',
      invoiceStatus: 'Paid'
    },
    {
      id: 5,
      invoiceNo: 'INV-2026-005',
      invoiceDate: '2026-04-01',
      studentName: 'Sneha Reddy',
      coupon: 'SPECIAL20',
      invoiceAmount: '₹3,999',
      invoiceStatus: 'Failed'
    }
  ]);
  const [invoiceCriteria, setInvoiceCriteria] = useState('All');
  const [invoiceSearch, setInvoiceSearch] = useState('');

  // 14. STUDENT ATTEMPTED TEST STATE
  const [attemptedTestList, setAttemptedTestList] = useState([
    {
      id: 1,
      studentName: 'Demo Student',
      courseName: 'System Architect',
      examName: 'CSPA Exam',
      marks: '61/390',
      attemptDate: '2011/04/25'
    },
    {
      id: 2,
      studentName: 'Rahul Sharma',
      courseName: 'BITSAT Antim Crash Course',
      examName: 'BITSAT Full Syllabus Mock 1',
      marks: '312/390',
      attemptDate: '2026/09/01'
    },
    {
      id: 3,
      studentName: 'Priya Verma',
      courseName: 'BITSAT 2026 Master Course',
      examName: 'Physics Chapter Test - Electromagnetism',
      marks: '85/100',
      attemptDate: '2026-09-03'
    },
    {
      id: 4,
      studentName: 'Amit Kumar',
      courseName: 'JEE Main 2026 Mastery',
      examName: 'Maths Full Mock Test 3',
      marks: '240/300',
      attemptDate: '2026-09-05'
    }
  ]);
  const [attemptedTestSearch, setAttemptedTestSearch] = useState('');

  // 15. STUDENT DOUBTS STATE
  const [doubtList, setDoubtList] = useState([
    {
      id: 1,
      doubtText: 'If search box value is clear then page 1 of category showing error when total results are less than limit or pagination is reset.',
      studentName: 'Pradeep Nanda',
      module: 'Video - Binomial Theorem',
      date: '24/Dec/2024 13:46',
      status: 'Pending',
      reply: ''
    },
    {
      id: 2,
      doubtText: 'In Q14 2020 question paper option c is correct or a? In solution option c is given but formula shows option a.',
      studentName: 'Rahul Sharma',
      module: 'Video - Binomial Theorem',
      date: '20/Dec/2024 15:30',
      status: 'Pending',
      reply: ''
    },
    {
      id: 3,
      doubtText: 'How to tackle negative marking in BITSAT English section when 2 options look very similar?',
      studentName: 'Ananya Gupta',
      module: 'Video - Chemistry Thermodynamics',
      date: '07/May/2024 18:54',
      status: 'Answered',
      reply: 'Focus on contextual tone and elimination strategy.'
    },
    {
      id: 4,
      doubtText: 'What is the cutoff for BITS Pilani CS branch in 2025 round 1 counselling?',
      studentName: 'Vikram Singh',
      module: 'Video - Physics Laws of Motion',
      date: '20/Aug/2024 10:22',
      status: 'Answered',
      reply: 'Cutoff score was 331 marks for Computer Science.'
    }
  ]);
  const [doubtSearch, setDoubtSearch] = useState('');
  const [selectedDoubt, setSelectedDoubt] = useState(null);
  const [doubtReplyInput, setDoubtReplyInput] = useState('');

  const handleReplyDoubt = (e) => {
    e.preventDefault();
    if (!selectedDoubt || !doubtReplyInput.trim()) return;
    setDoubtList(doubtList.map(d => d.id === selectedDoubt.id ? { ...d, status: 'Answered', reply: doubtReplyInput } : d));
    setSelectedDoubt(null);
    setDoubtReplyInput('');
  };

  const navigate = useNavigate();

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  const [globalAdminSearch, setGlobalAdminSearch] = useState('');
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);

  const menuGroups = [
    {
      title: 'OVERVIEW',
      items: [
        { name: 'Dashboard', icon: LayoutGrid, badge: 'Live', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
      ]
    },
    {
      title: 'PRODUCT CATALOG',
      items: [
        { name: 'Course Master', icon: BookOpen, count: courseList.length },
        { name: 'Exam Master', icon: GraduationCap, count: examList.length },
        { name: 'Subject Master', icon: ClipboardList, count: subjectList.length },
        {
          name: 'Chapter Management',
          icon: BookMarked,
          hasSub: true,
          subItems: [
            { name: 'Chapter Master' },
            { name: 'Chapter Topic Master' }
          ]
        }
      ]
    },
    {
      title: 'CONTENT & TESTS',
      items: [
        {
          name: 'Question Management',
          icon: HelpCircle,
          hasSub: true,
          subItems: [
            { name: 'Objective Question' },
            { name: 'Numerical Question' }
          ]
        },
        { name: 'Video Master', icon: Video, count: videoList.length },
        { name: 'Document Master', icon: FileText, count: docList.length }
      ]
    },
    {
      title: 'STUDENTS & CRM',
      items: [
        {
          name: 'Student Doubt',
          icon: MessageSquare,
          badge: doubtList.filter(d => d.status === 'Pending').length ? `${doubtList.filter(d => d.status === 'Pending').length} Pending` : null,
          badgeColor: 'bg-amber-100 text-amber-800'
        },
        { name: 'Student Attempted Test', icon: FileCheck, count: attemptedTestList.length },
        { name: 'Student Invoices', icon: Receipt, count: invoiceList.length }
      ]
    },
    {
      title: 'MARKETING & SEO',
      items: [
        { name: 'Coupon', icon: Ticket, count: couponList.length },
        { name: 'Blog Master', icon: Edit3, count: blogList.length },
        { name: 'SEO Page', icon: Globe, count: seoList.length },
        {
          name: 'Notification',
          icon: Bell,
          hasSub: true,
          subItems: [
            { name: 'Site Notification' },
            { name: 'Student Notification' }
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* SHOPIFY-STYLE TOP GLOBAL NAVBAR */}
      <header className="bg-white border-b border-slate-200/80 h-16 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-50 shadow-xs backdrop-blur-md bg-white/95">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
            title="Toggle Navigation Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center text-amber-400 font-black text-sm shadow-sm border border-slate-800">
              10Q
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-sm tracking-tight">10Q Challenge</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-slate-900 text-amber-400">ADMIN</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Enterprise Academic Control</p>
            </div>
          </Link>
        </div>

        {/* Global Instant Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses, questions, chapters, doubts, invoices... (Press /)"
              value={globalAdminSearch}
              onChange={(e) => setGlobalAdminSearch(e.target.value)}
              className="w-full pl-9 pr-12 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all shadow-2xs"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-3xs">
              /
            </span>
          </div>
        </div>

        {/* Right Action Icons & Harshal Jain Profile */}
        <div className="flex items-center space-x-3">
          {/* Quick Create Dropdown */}
          <div className="relative">
            <button
              onClick={() => setQuickCreateOpen(!quickCreateOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-950 text-amber-400 font-extrabold text-xs transition-all shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Create</span>
              <ChevronDown className="w-3 h-3 text-amber-300" />
            </button>

            {quickCreateOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                <button
                  onClick={() => { setActiveTab('Course Master'); setCourseModalOpen(true); setQuickCreateOpen(false); }}
                  className="w-full text-left px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                  <span>New Course Batch</span>
                </button>
                <button
                  onClick={() => { setActiveTab('Objective Question'); setObjModalOpen(true); setQuickCreateOpen(false); }}
                  className="w-full text-left px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Add MCQ Question</span>
                </button>
                <button
                  onClick={() => { setActiveTab('Video Master'); setVideoActiveTab('Basic Information'); setQuickCreateOpen(false); }}
                  className="w-full text-left px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Video className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Upload Video Lecture</span>
                </button>
                <button
                  onClick={() => { setActiveTab('Blog Master'); setBlogActiveTab('Basic Information'); setQuickCreateOpen(false); }}
                  className="w-full text-left px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Edit3 className="w-3.5 h-3.5 text-rose-600" />
                  <span>Write Blog Article</span>
                </button>
              </div>
            )}
          </div>

          <Link
            to="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-bold transition-all border border-slate-200/60"
          >
            <span>Live Site</span>
            <span>↗</span>
          </Link>

          <button
            onClick={toggleFullscreen}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Admin Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="p-1 sm:px-3 sm:py-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all flex items-center space-x-2.5"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-xs">
                HJ
              </div>
              <div className="text-left hidden md:block">
                <p className="text-xs font-bold text-slate-900 leading-none">Harshal Jain</p>
                <p className="text-[10px] text-emerald-600 font-bold leading-none mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Master Admin
                </p>
              </div>
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
                  <p className="text-xs font-extrabold text-slate-900">Harshal Jain</p>
                  <p className="text-[11px] text-amber-600 font-bold">Master Administrator</p>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">admin@10qchallenge.in</p>
                </div>
                <div className="py-1">
                  <Link to="/" className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium">
                    View Live Public Site
                  </Link>
                  <Link to="/student/dashboard" className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium">
                    Inspect Student LMS View
                  </Link>
                </div>
                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-bold flex items-center space-x-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* BODY WRAPPER: SHOPIFY-STYLE CATEGORIZED SIDEBAR + VIEWPORT */}
      <div className="flex flex-1 min-h-[calc(100vh-4rem)]">

        {/* LEFT SHOPIFY-STYLE SIDEBAR */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-16'
          } bg-white border-r border-slate-200/80 transition-all duration-200 flex flex-col justify-between flex-shrink-0 z-40 select-none`}
        >
          <div className="py-3 overflow-y-auto space-y-4">
            {menuGroups.map((group) => (
              <div key={group.title} className="px-3">
                {sidebarOpen ? (
                  <div className="px-3 pb-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    {group.title}
                  </div>
                ) : (
                  <div className="py-1 text-center text-[9px] text-slate-300">•</div>
                )}

                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.name || (item.subItems && item.subItems.some(s => s.name === activeTab));
                    const isExpanded = expandedMenus[item.name];

                    return (
                      <div key={item.name} className="w-full">
                        <button
                          onClick={() => {
                            if (item.hasSub) {
                              toggleMenuExpand(item.name);
                            } else {
                              setActiveTab(item.name);
                            }
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                            isActive
                              ? 'bg-slate-900 text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5 min-w-0">
                            <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                            {sidebarOpen && <span className="truncate">{item.name}</span>}
                          </div>

                          {sidebarOpen && (
                            <div className="flex items-center space-x-1.5">
                              {item.badge && (
                                <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-extrabold ${item.badgeColor || 'bg-slate-100 text-slate-700'}`}>
                                  {item.badge}
                                </span>
                              )}
                              {item.count !== undefined && !item.badge && (
                                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${isActive ? 'text-slate-300 bg-slate-800' : 'text-slate-400 bg-slate-100'}`}>
                                  {item.count}
                                </span>
                              )}
                              {item.hasSub && (
                                isExpanded ? (
                                  <ChevronDown className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                                ) : (
                                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                                )
                              )}
                            </div>
                          )}
                        </button>

                        {/* Submenu Accordion */}
                        {sidebarOpen && item.hasSub && isExpanded && item.subItems && (
                          <div className="mt-1 ml-4 pl-3 border-l border-slate-200 space-y-0.5 py-0.5">
                            {item.subItems.map((sub) => {
                              const isSubActive = activeTab === sub.name;
                              return (
                                <button
                                  key={sub.name}
                                  onClick={() => setActiveTab(sub.name)}
                                  className={`w-full flex items-center space-x-2 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                                    isSubActive
                                      ? 'bg-amber-50 text-amber-900 font-extrabold border border-amber-200'
                                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                  }`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${isSubActive ? 'bg-amber-500' : 'bg-slate-300'}`} />
                                  <span className="truncate">{sub.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Footer Status Banner */}
          {sidebarOpen && (
            <div className="p-3 m-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-700">Database</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Connected
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">10Q Challenge v3.4 Enterprise</p>
            </div>
          )}
        </aside>

        {/* MAIN VIEWPORT CONTENT */}
        <main className="flex-1 bg-[#F8FAFC] p-6 sm:p-8 overflow-y-auto min-w-0">

          {/* ========================================================= */}
          {/* SHOPIFY-LEVEL EXECUTIVE DASHBOARD OVERVIEW */}
          {/* ========================================================= */}
          {activeTab === 'Dashboard' && (
            <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in">
              {/* Header Welcome Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-amber-500/10 to-transparent blur-3xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold mb-2 border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Academic Operations • All Systems Operational</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    Welcome, Harshal Jain
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Here is your live revenue, student enrollment, doubt SLA, and academic catalog pulse.
                  </p>
                </div>

                <div className="flex items-center gap-2 relative z-10">
                  <button
                    onClick={() => { setActiveTab('Course Master'); setCourseModalOpen(true); }}
                    className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Course</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('Student Doubt')}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all border border-white/10 flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Review Doubts</span>
                  </button>
                </div>
              </div>

              {/* 4 Top KPI Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
                  <div className="flex items-center justify-between text-slate-500 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider">Gross Enrollment Revenue</span>
                    <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      <Receipt className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">₹18,42,800</div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold mt-2">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+24.6% vs last month</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
                  <div className="flex items-center justify-between text-slate-500 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider">Active Enrolled Learners</span>
                    <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">4,892</div>
                  <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-bold mt-2">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>+380 new this week</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
                  <div className="flex items-center justify-between text-slate-500 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider">CBT Tests Attempted</span>
                    <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                      <FileCheck className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">18,450</div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold mt-2">
                    <Award className="w-3.5 h-3.5" />
                    <span>Avg score 268/390 (BITSAT)</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
                  <div className="flex items-center justify-between text-slate-500 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider">Faculty Doubt Resolution</span>
                    <div className="w-9 h-9 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">98.4%</div>
                  <div className="flex items-center gap-1.5 text-xs text-rose-600 font-bold mt-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Avg reply SLA: 3.8 hours</span>
                  </div>
                </div>
              </div>

              {/* 2-Column Split: Recent Live Orders & Urgent Doubts Queue */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* LEFT: Recent Orders Table */}
                <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">Recent Student Orders &amp; Invoices</h3>
                      <p className="text-xs text-slate-500">Live transactions across BITSAT, JEE and Mentorship batches</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('Student Invoices')}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      View All Orders →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-bold">
                          <th className="py-2.5">Invoice</th>
                          <th className="py-2.5">Student</th>
                          <th className="py-2.5">Amount</th>
                          <th className="py-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {invoiceList.slice(0, 5).map((inv) => (
                          <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3 font-mono font-bold text-indigo-700">{inv.invoiceNo}</td>
                            <td className="py-3 font-bold text-slate-900">{inv.studentName}</td>
                            <td className="py-3 font-bold text-slate-900">{inv.invoiceAmount}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                inv.invoiceStatus === 'Paid'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : inv.invoiceStatus === 'Pending'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}>
                                {inv.invoiceStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* RIGHT: Urgent Doubts Queue */}
                <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">Student Doubts Queue</h3>
                      <p className="text-xs text-slate-500">Queries needing BITSian mentor resolution</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('Student Doubt')}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      Open Queue ({doubtList.filter(d => d.status === 'Pending').length}) →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {doubtList.slice(0, 3).map((doubt) => (
                      <div key={doubt.id} className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-900">{doubt.studentName}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                            doubt.status === 'Answered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {doubt.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed">
                          {doubt.doubtText}
                        </p>
                        <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                          <span>{doubt.module}</span>
                          <button
                            onClick={() => { setActiveTab('Student Doubt'); setSelectedDoubt(doubt); }}
                            className="font-bold text-indigo-600 hover:underline"
                          >
                            Reply Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Jump Academic Shortcuts */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h3 className="font-extrabold text-base text-slate-900">Academic Master Modules Hub</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {[
                    { title: 'Course Master', desc: '6 Batches', tab: 'Course Master', icon: BookOpen, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
                    { title: 'Question Bank', desc: 'MCQ & Numerical', tab: 'Objective Question', icon: HelpCircle, color: 'bg-amber-50 text-amber-700 border-amber-200' },
                    { title: 'Video Lectures', desc: 'Vimeo Streams', tab: 'Video Master', icon: Video, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                    { title: 'Document PDFs', desc: 'Notes & Formulae', tab: 'Document Master', icon: FileText, color: 'bg-blue-50 text-blue-700 border-blue-200' },
                    { title: 'Discount Coupons', desc: 'Promo Codes', tab: 'Coupon', icon: Ticket, color: 'bg-purple-50 text-purple-700 border-purple-200' },
                    { title: 'SEO Pages', desc: 'Meta Tags & URLs', tab: 'SEO Page', icon: Globe, color: 'bg-rose-50 text-rose-700 border-rose-200' },
                  ].map((shortcut) => {
                    const SIcon = shortcut.icon;
                    return (
                      <button
                        key={shortcut.title}
                        onClick={() => setActiveTab(shortcut.tab)}
                        className={`p-4 rounded-2xl border text-left transition-all hover:scale-102 hover:shadow-sm ${shortcut.color} flex flex-col justify-between`}
                      >
                        <SIcon className="w-5 h-5 mb-2" />
                        <div>
                          <div className="font-extrabold text-xs">{shortcut.title}</div>
                          <div className="text-[10px] opacity-80 mt-0.5">{shortcut.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* EXAM MASTER VIEW */}
          {activeTab === 'Exam Master' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Exam Master</h1>
                <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1">
                  <Home className="w-3.5 h-3.5 text-slate-400" />
                  <span>/</span>
                  <span className="text-slate-700 font-semibold uppercase">EXAM MASTER</span>
                </div>
              </div>

              {/* EXAM FORM */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wide">
                    {examForm.id ? 'Edit Exam' : 'Exam'}
                  </h3>
                </div>

                <form onSubmit={handleSaveExam} className="p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Exam<span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter Exam"
                      value={examForm.examName}
                      onChange={(e) => {
                        const val = e.target.value;
                        setExamForm({
                          ...examForm,
                          examName: val,
                          slug: examForm.id ? examForm.slug : val.toLowerCase().replace(/\s+/g, '-')
                        });
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Slug<span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter Slug"
                      value={examForm.slug}
                      onChange={(e) => setExamForm({ ...examForm, slug: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Exam Description
                    </label>

                    <div className="border border-slate-200 rounded-md overflow-hidden bg-white">
                      <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1.5 text-slate-600">
                        <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Source"><Code className="w-3.5 h-3.5" /></button>
                        <span className="w-px h-4 bg-slate-300 mx-0.5" />
                        <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Undo"><RotateCcw className="w-3.5 h-3.5" /></button>
                        <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Redo"><RotateCw className="w-3.5 h-3.5" /></button>
                        <span className="w-px h-4 bg-slate-300 mx-0.5" />
                        <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Bold"><Bold className="w-3.5 h-3.5" /></button>
                        <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Italic"><Italic className="w-3.5 h-3.5" /></button>
                        <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Underline"><Underline className="w-3.5 h-3.5" /></button>
                        <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Strikethrough"><Strikethrough className="w-3.5 h-3.5" /></button>
                      </div>

                      <textarea
                        rows={6}
                        placeholder="Enter exam description details..."
                        value={examForm.description}
                        onChange={(e) => setExamForm({ ...examForm, description: e.target.value })}
                        className="w-full p-3 text-xs focus:outline-none text-slate-800 resize-y"
                      />

                      <div className="h-2 bg-[#1e40af] w-full" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Meta Title"
                      value={examForm.metaTitle}
                      onChange={(e) => setExamForm({ ...examForm, metaTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Meta Description
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Meta Description"
                      value={examForm.metaDescription}
                      onChange={(e) => setExamForm({ ...examForm, metaDescription: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                    />
                  </div>

                  <div className="pt-2 flex items-center space-x-3">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold text-xs rounded-md shadow-sm transition-colors"
                    >
                      {examForm.id ? 'Update' : 'Save'}
                    </button>
                  </div>
                </form>
              </div>

              {/* EXAM TABLE */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 w-full sm:w-64">
                    <span className="text-xs font-medium text-slate-600">Search:</span>
                    <input
                      type="text"
                      value={examSearchTerm}
                      onChange={(e) => setExamSearchTerm(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">
                      <tr>
                        <th className="p-3 border-r border-slate-200 w-3/4">Exam</th>
                        <th className="p-3 text-center w-1/4">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium">
                      {examList
                        .filter(ex => ex.examName.toLowerCase().includes(examSearchTerm.toLowerCase()))
                        .map((ex) => (
                          <tr key={ex.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3 border-r border-slate-200 font-bold text-slate-800">
                              {ex.examName}
                            </td>
                            <td className="p-3 text-center space-x-2">
                              <button
                                onClick={() => handleEditExam(ex)}
                                className="p-1.5 border border-slate-300 hover:border-slate-500 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteExam(ex.id)}
                                className="p-1.5 border border-rose-200 hover:border-rose-400 rounded-md text-rose-600 hover:bg-rose-50 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* SUBJECT MASTER VIEW */}
          {activeTab === 'Subject Master' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Subject Master</h1>
                <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1">
                  <Home className="w-3.5 h-3.5 text-slate-400" />
                  <span>/</span>
                  <span className="text-slate-700 font-semibold">Subject Master</span>
                </div>
              </div>

              {/* SUBJECT FORM */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wide">
                    SUBJECTS
                  </h3>
                </div>

                <form onSubmit={handleSaveSubject} className="p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Subject Code</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter Subject code"
                      value={subjectForm.subjectCode}
                      onChange={(e) => setSubjectForm({ ...subjectForm, subjectCode: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Subject Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter Subject Name"
                      value={subjectForm.subjectName}
                      onChange={(e) => setSubjectForm({ ...subjectForm, subjectName: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                    />
                  </div>

                  <div className="pt-2 flex items-center space-x-3">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold text-xs rounded-md shadow-sm transition-colors"
                    >
                      {subjectForm.id ? 'Update' : 'Save'}
                    </button>
                  </div>
                </form>
              </div>

              {/* SUBJECT TABLE */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-full sm:w-64">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={subjectSearchTerm}
                      onChange={(e) => setSubjectSearchTerm(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">
                      <tr>
                        <th className="p-3 border-r border-slate-200 w-1/3">SUBJECT CODE</th>
                        <th className="p-3 border-r border-slate-200 w-1/2">SUBJECT NAME</th>
                        <th className="p-3 text-center w-1/6">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium">
                      {subjectList
                        .filter(s =>
                          s.subjectCode.toLowerCase().includes(subjectSearchTerm.toLowerCase()) ||
                          s.subjectName.toLowerCase().includes(subjectSearchTerm.toLowerCase())
                        )
                        .map((s) => (
                          <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3 border-r border-slate-200 font-mono text-slate-700">{s.subjectCode}</td>
                            <td className="p-3 border-r border-slate-200 font-bold text-slate-800">{s.subjectName}</td>
                            <td className="p-3 text-center space-x-2">
                              <button
                                onClick={() => handleEditSubject(s)}
                                className="p-1.5 border border-slate-300 hover:border-slate-500 rounded-full text-slate-700 hover:bg-slate-100 transition-colors inline-flex items-center justify-center"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteSubject(s.id)}
                                className="p-1.5 border border-rose-200 hover:border-rose-400 rounded-full text-rose-600 hover:bg-rose-50 transition-colors inline-flex items-center justify-center"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-xs text-slate-500">
                  <div>Showing 1 to {subjectList.length} of {subjectList.length} entries</div>
                  <div className="flex items-center space-x-1">
                    <button className="px-2.5 py-1 text-slate-400 border border-slate-200 rounded text-[11px] disabled:opacity-50">Previous</button>
                    <button className="px-2.5 py-1 bg-[#1d4ed8] text-white font-bold rounded text-[11px]">1</button>
                    <button className="px-2.5 py-1 text-slate-400 border border-slate-200 rounded text-[11px] disabled:opacity-50">Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CHAPTER MASTER TABBED VIEW */}
          {activeTab === 'Chapter Master' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Chapter</h1>
                <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1">
                  <Home className="w-3.5 h-3.5 text-slate-400" />
                  <span>/</span>
                  <span className="text-slate-700 font-semibold">Chapter Master</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wide">
                    Chapter
                  </h3>
                </div>

                <div className="flex border-b border-slate-200 bg-slate-50/50">
                  <button
                    type="button"
                    onClick={() => setChapterActiveTab('Basic Information')}
                    className={`flex items-center space-x-2 px-6 py-3 text-xs font-bold transition-colors ${
                      chapterActiveTab === 'Basic Information'
                        ? 'bg-[#1d4ed8] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Basic Information</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setChapterActiveTab('Table')}
                    className={`flex items-center space-x-2 px-6 py-3 text-xs font-bold transition-colors ${
                      chapterActiveTab === 'Table'
                        ? 'bg-[#1d4ed8] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>Table</span>
                  </button>
                </div>

                {chapterActiveTab === 'Basic Information' && (
                  <form onSubmit={handleSaveChapter} className="p-6 space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-800 mb-1">
                        SUBJECT
                      </label>
                      <select
                        value={chapterForm.subject}
                        onChange={(e) => setChapterForm({ ...chapterForm, subject: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                      >
                        <option value="">Select Subject</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Maths">Maths</option>
                        <option value="LR & English">LR & English</option>
                        <option value="Aptitude">Aptitude</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-800 mb-1">
                        CHAPTER NAME
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter Chapter Name"
                        value={chapterForm.chapterName}
                        onChange={(e) => setChapterForm({ ...chapterForm, chapterName: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-800 mb-1">
                        BRIEF DESCRIPTION
                      </label>

                      <div className="border border-slate-200 rounded overflow-hidden bg-white">
                        <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1.5 text-slate-600">
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Source"><Code className="w-3.5 h-3.5" /></button>
                          <span className="w-px h-4 bg-slate-300 mx-0.5" />
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Undo"><RotateCcw className="w-3.5 h-3.5" /></button>
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Redo"><RotateCw className="w-3.5 h-3.5" /></button>
                          <span className="w-px h-4 bg-slate-300 mx-0.5" />
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Bold"><Bold className="w-3.5 h-3.5" /></button>
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Italic"><Italic className="w-3.5 h-3.5" /></button>
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Underline"><Underline className="w-3.5 h-3.5" /></button>
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Strikethrough"><Strikethrough className="w-3.5 h-3.5" /></button>
                        </div>

                        <textarea
                          rows={6}
                          placeholder="Enter brief description..."
                          value={chapterForm.description}
                          onChange={(e) => setChapterForm({ ...chapterForm, description: e.target.value })}
                          className="w-full p-3 text-xs focus:outline-none text-slate-800 resize-y"
                        />

                        <div className="h-2 bg-[#1e40af] w-full" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-800 mb-1">
                        ORDER NUMBER
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Order Number"
                        value={chapterForm.orderNumber}
                        onChange={(e) => setChapterForm({ ...chapterForm, orderNumber: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                      />
                    </div>

                    <div className="flex items-center space-x-2 pt-1">
                      <input
                        type="checkbox"
                        id="enabledCheck"
                        checked={chapterForm.enabled}
                        onChange={(e) => setChapterForm({ ...chapterForm, enabled: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                      />
                      <label htmlFor="enabledCheck" className="text-xs font-semibold text-slate-700">
                        Enabled
                      </label>
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold text-xs rounded shadow-sm transition-colors"
                      >
                        {chapterForm.id ? 'Update' : 'Save'}
                      </button>
                    </div>
                  </form>
                )}

                {chapterActiveTab === 'Table' && (
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="relative w-full flex items-center">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={chapterSearchTerm}
                          onChange={(e) => setChapterSearchTerm(e.target.value)}
                          className="w-full pl-3 pr-10 py-2 border border-slate-200 rounded-l text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                        />
                        <button type="button" className="px-4 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-r">
                          <Search className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto border border-slate-200 rounded">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">
                          <tr>
                            <th className="p-3 border-r border-slate-200 w-3/4">CHAPTER</th>
                            <th className="p-3 text-center w-1/4">ACTION</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 font-medium">
                          {chapterList
                            .filter(c => c.chapterName.toLowerCase().includes(chapterSearchTerm.toLowerCase()))
                            .map((c) => (
                              <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="p-3 border-r border-slate-200 text-slate-800">
                                  {c.chapterName}
                                </td>
                                <td className="p-3 text-center space-x-2">
                                  <button
                                    onClick={() => handleEditChapter(c)}
                                    className="p-1.5 border border-slate-300 hover:border-slate-500 rounded-full text-slate-700 hover:bg-slate-100 transition-colors inline-flex items-center justify-center"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteChapter(c.id)}
                                    className="p-1.5 border border-rose-200 hover:border-rose-400 rounded-full text-rose-600 hover:bg-rose-50 transition-colors inline-flex items-center justify-center"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-xs text-slate-500">
                      <div>Showing 1 to {chapterList.length} of 174 entries</div>
                      <div className="flex items-center space-x-1">
                        <button className="px-2.5 py-1 text-slate-400 border border-slate-200 rounded text-[11px] disabled:opacity-50">Previous</button>
                        <button className="px-2.5 py-1 bg-[#1d4ed8] text-white font-bold rounded text-[11px]">1</button>
                        <button className="px-2.5 py-1 text-slate-400 border border-slate-200 rounded text-[11px]">2</button>
                        <button className="px-2.5 py-1 text-slate-400 border border-slate-200 rounded text-[11px]">Next</button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* CHAPTER TOPIC MASTER TABBED VIEW (MATCHING NEW SCREENSHOTS 1 & 2 FOR CHAPTER TOPIC) */}
          {activeTab === 'Chapter Topic Master' && (
            <div className="space-y-6">
              {/* Header Title & Breadcrumb */}
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Chapter Topic</h1>
                <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1">
                  <Home className="w-3.5 h-3.5 text-slate-400" />
                  <span>/</span>
                  <span className="text-slate-700 font-semibold">Chapter Topic</span>
                </div>
              </div>

              {/* CARD WITH TABBED NAVIGATION MATCHING SCREENSHOTS 1 & 2 */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wide">
                    Chapter Topic
                  </h3>
                </div>

                {/* TABS NAVIGATION BAR (Basic Information vs Table) */}
                <div className="flex border-b border-slate-200 bg-slate-50/50">
                  <button
                    type="button"
                    onClick={() => setTopicActiveTab('Basic Information')}
                    className={`flex items-center space-x-2 px-6 py-3 text-xs font-bold transition-colors ${
                      topicActiveTab === 'Basic Information'
                        ? 'bg-[#1d4ed8] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Basic Information</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTopicActiveTab('Table')}
                    className={`flex items-center space-x-2 px-6 py-3 text-xs font-bold transition-colors ${
                      topicActiveTab === 'Table'
                        ? 'bg-[#1d4ed8] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>Table</span>
                  </button>
                </div>

                {/* TAB 1 CONTENT: BASIC INFORMATION FORM (MATCHING SCREENSHOT 1) */}
                {topicActiveTab === 'Basic Information' && (
                  <form onSubmit={handleSaveTopic} className="p-6 space-y-5">
                    {/* ROW 1: 2 COLUMNS FOR SUBJECT & CHAPTER */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Subject
                        </label>
                        <select
                          value={topicForm.subject}
                          onChange={(e) => setTopicForm({ ...topicForm, subject: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                        >
                          <option value="">Select Subject</option>
                          <option value="Physics">Physics</option>
                          <option value="Chemistry">Chemistry</option>
                          <option value="Maths">Maths</option>
                          <option value="LR & English">LR & English</option>
                          <option value="Aptitude">Aptitude</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Chapter
                        </label>
                        <select
                          value={topicForm.chapter}
                          onChange={(e) => setTopicForm({ ...topicForm, chapter: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                        >
                          <option value="">Select Chapter</option>
                          <option value="Rotational Motion">Rotational Motion</option>
                          <option value="Electrostatics & Capacitance">Electrostatics & Capacitance</option>
                          <option value="Integration & Calculus">Integration & Calculus</option>
                          <option value="Alcohols Phenols and Ethers">Alcohols Phenols and Ethers</option>
                        </select>
                      </div>
                    </div>

                    {/* ROW 2: CHAPTER TOPIC NAME */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Chapter Topic Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter Chapter Topic Name"
                        value={topicForm.topicName}
                        onChange={(e) => setTopicForm({ ...topicForm, topicName: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                      />
                    </div>

                    {/* ROW 3: BRIEF DESCRIPTION WITH RICH TEXT TOOLBAR */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Brief Description
                      </label>

                      <div className="border border-slate-200 rounded overflow-hidden bg-white">
                        <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1.5 text-slate-600">
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Source"><Code className="w-3.5 h-3.5" /></button>
                          <span className="w-px h-4 bg-slate-300 mx-0.5" />
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Undo"><RotateCcw className="w-3.5 h-3.5" /></button>
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Redo"><RotateCw className="w-3.5 h-3.5" /></button>
                          <span className="w-px h-4 bg-slate-300 mx-0.5" />
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Bold"><Bold className="w-3.5 h-3.5" /></button>
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Italic"><Italic className="w-3.5 h-3.5" /></button>
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Underline"><Underline className="w-3.5 h-3.5" /></button>
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Strikethrough"><Strikethrough className="w-3.5 h-3.5" /></button>
                        </div>

                        <textarea
                          rows={6}
                          placeholder="Enter brief description..."
                          value={topicForm.description}
                          onChange={(e) => setTopicForm({ ...topicForm, description: e.target.value })}
                          className="w-full p-3 text-xs focus:outline-none text-slate-800 resize-y"
                        />

                        {/* Dark Blue Accent Line at bottom of editor */}
                        <div className="h-2 bg-[#1e40af] w-full" />
                      </div>
                    </div>

                    {/* ROW 4: ORDER NUMBER */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Order Number
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Order Number"
                        value={topicForm.orderNumber}
                        onChange={(e) => setTopicForm({ ...topicForm, orderNumber: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                      />
                    </div>

                    {/* ROW 5: ENABLED CHECKBOX */}
                    <div className="flex items-center space-x-2 pt-1">
                      <input
                        type="checkbox"
                        id="enabledTopicCheck"
                        checked={topicForm.enabled}
                        onChange={(e) => setTopicForm({ ...topicForm, enabled: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                      />
                      <label htmlFor="enabledTopicCheck" className="text-xs font-semibold text-slate-700">
                        Enabled
                      </label>
                    </div>

                    {/* SAVE / UPDATE BUTTON */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold text-xs rounded shadow-sm transition-colors"
                      >
                        {topicForm.id ? 'Update' : 'Save'}
                      </button>
                    </div>
                  </form>
                )}

                {/* TAB 2 CONTENT: TABLE VIEW (MATCHING SCREENSHOT 2) */}
                {topicActiveTab === 'Table' && (
                  <div className="p-6 space-y-4">
                    {/* Top Search Bar */}
                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={topicSearchTerm}
                        onChange={(e) => setTopicSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                      />
                    </div>

                    {/* Chapter Topic Table */}
                    <div className="overflow-x-auto border border-slate-200 rounded">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">
                          <tr>
                            <th className="p-3 border-r border-slate-200 w-3/4">Chapter Topic</th>
                            <th className="p-3 text-center w-1/4">ACTION</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 font-medium">
                          {topicList
                            .filter(t => t.topicName.toLowerCase().includes(topicSearchTerm.toLowerCase()))
                            .map((t) => (
                              <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="p-3 border-r border-slate-200 text-slate-800">
                                  {t.topicName}
                                </td>
                                <td className="p-3 text-center space-x-2">
                                  {/* Circular Edit Pencil Icon Button matching screenshot 2 */}
                                  <button
                                    onClick={() => handleEditTopic(t)}
                                    className="p-1.5 border border-slate-300 hover:border-slate-500 rounded-full text-slate-700 hover:bg-slate-100 transition-colors inline-flex items-center justify-center"
                                    title="Edit Chapter Topic"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  {/* Delete Icon Button */}
                                  <button
                                    onClick={() => handleDeleteTopic(t.id)}
                                    className="p-1.5 border border-rose-200 hover:border-rose-400 rounded-full text-rose-600 hover:bg-rose-50 transition-colors inline-flex items-center justify-center"
                                    title="Delete Chapter Topic"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Table Footer Bar matching screenshot 2 */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-xs text-slate-500">
                      <div>
                        Showing 1 to {topicList.length} of 57 entries
                      </div>

                      <div className="flex items-center space-x-1">
                        <button className="px-2.5 py-1 text-slate-400 border border-slate-200 rounded text-[11px] disabled:opacity-50">
                          Previous
                        </button>
                        <button className="px-2.5 py-1 bg-[#1d4ed8] text-white font-bold rounded text-[11px]">
                          1
                        </button>
                        <button className="px-2.5 py-1 text-slate-400 border border-slate-200 rounded text-[11px]">
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* SUBMENU PAGE 3: OBJECTIVE QUESTION (MATCHING SCREENSHOT 1) */}
          {activeTab === 'Objective Question' && (
            <div className="space-y-6">
              {/* Header Title, Breadcrumb & Top-Right Add Question Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight">Objective Question List</h1>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1">
                    <Home className="w-3.5 h-3.5 text-slate-400" />
                    <span>/</span>
                    <span className="text-slate-700 font-semibold">Questions</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setObjQuestionForm({
                      id: null,
                      subject: 'Physics',
                      chapter: 'Rotational Motion',
                      question: '',
                      optionA: '',
                      optionB: '',
                      optionC: '',
                      optionD: '',
                      correctOption: 'Option A',
                      difficulty: 'Medium'
                    });
                    setObjModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold text-xs rounded shadow-sm transition-colors self-start sm:self-auto"
                >
                  Add Question
                </button>
              </div>

              {/* CARD CONTAINER MATCHING SCREENSHOT 1 */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
                {/* SUBJECT SELECT DROPDOWN */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject
                  </label>
                  <select
                    value={objSubjectFilter}
                    onChange={(e) => setObjSubjectFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                  >
                    <option value="">Select Subject</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Maths">Maths</option>
                    <option value="LR & English">LR & English</option>
                    <option value="Aptitude">Aptitude</option>
                  </select>
                </div>

                {/* FULL WIDTH SEARCH INPUT WITH ATTACHED BLUE SEARCH BUTTON */}
                <div className="relative w-full flex items-center">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={objSearchTerm}
                    onChange={(e) => setObjSearchTerm(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border border-slate-200 rounded-l text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-r flex items-center justify-center"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>

                {/* TABLE MATCHING SCREENSHOT 1 */}
                <div className="overflow-x-auto border border-slate-200 rounded">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">
                      <tr>
                        <th className="p-3 border-r border-slate-200 w-3/4">QUESTIONS</th>
                        <th className="p-3 text-center w-1/4">
                          <div className="inline-flex items-center space-x-1">
                            <span>ACTION</span>
                            <span className="text-[10px] text-slate-400">⇅</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium">
                      {objectiveQuestionList
                        .filter(q =>
                          (!objSubjectFilter || q.subject === objSubjectFilter) &&
                          q.question.toLowerCase().includes(objSearchTerm.toLowerCase())
                        )
                        .map((q) => (
                          <tr key={q.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3 border-r border-slate-200 text-slate-800">
                              {q.question}
                            </td>
                            <td className="p-3 text-center space-x-2">
                              <button
                                onClick={() => handleEditObjQuestion(q)}
                                className="p-1.5 border border-slate-300 hover:border-slate-500 rounded-full text-slate-700 hover:bg-slate-100 transition-colors inline-flex items-center justify-center"
                                title="Edit Question"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteObjQuestion(q.id)}
                                className="p-1.5 border border-rose-200 hover:border-rose-400 rounded-full text-rose-600 hover:bg-rose-50 transition-colors inline-flex items-center justify-center"
                                title="Delete Question"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* TABLE FOOTER / PAGINATION MATCHING SCREENSHOT 1 */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-xs text-slate-500">
                  <div>
                    Showing 1 to {
                      objectiveQuestionList.filter(q =>
                        (!objSubjectFilter || q.subject === objSubjectFilter) &&
                        q.question.toLowerCase().includes(objSearchTerm.toLowerCase())
                      ).length
                    } of {objectiveQuestionList.length} entries
                  </div>

                  <div className="flex items-center space-x-1">
                    <button className="px-2.5 py-1 text-slate-400 border border-slate-200 rounded text-[11px] disabled:opacity-50">
                      Previous
                    </button>
                    <button className="px-2.5 py-1 bg-[#1d4ed8] text-white font-bold rounded text-[11px]">
                      1
                    </button>
                    <button className="px-2.5 py-1 text-slate-400 border border-slate-200 rounded text-[11px]">
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* MODAL FOR ADD / EDIT OBJECTIVE QUESTION */}
              {objModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <h3 className="font-bold text-slate-800 text-sm">
                        {objQuestionForm.id ? 'Edit Objective Question' : 'Add Objective Question'}
                      </h3>
                      <button
                        onClick={() => setObjModalOpen(false)}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveObjQuestion} className="p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                          <select
                            value={objQuestionForm.subject}
                            onChange={(e) => setObjQuestionForm({ ...objQuestionForm, subject: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                          >
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Maths">Maths</option>
                            <option value="LR & English">LR & English</option>
                            <option value="Aptitude">Aptitude</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Difficulty</label>
                          <select
                            value={objQuestionForm.difficulty}
                            onChange={(e) => setObjQuestionForm({ ...objQuestionForm, difficulty: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                          >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Question Prompt</label>
                        <div className="border border-slate-200 rounded overflow-hidden bg-white">
                          <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1.5 text-slate-600">
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Bold"><Bold className="w-3.5 h-3.5" /></button>
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Italic"><Italic className="w-3.5 h-3.5" /></button>
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Underline"><Underline className="w-3.5 h-3.5" /></button>
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Code"><Code className="w-3.5 h-3.5" /></button>
                          </div>
                          <textarea
                            rows={4}
                            required
                            placeholder="Enter question text..."
                            value={objQuestionForm.question}
                            onChange={(e) => setObjQuestionForm({ ...objQuestionForm, question: e.target.value })}
                            className="w-full p-3 text-xs focus:outline-none text-slate-800 resize-y"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">Option A</label>
                          <input
                            type="text"
                            placeholder="Enter Option A"
                            value={objQuestionForm.optionA}
                            onChange={(e) => setObjQuestionForm({ ...objQuestionForm, optionA: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">Option B</label>
                          <input
                            type="text"
                            placeholder="Enter Option B"
                            value={objQuestionForm.optionB}
                            onChange={(e) => setObjQuestionForm({ ...objQuestionForm, optionB: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">Option C</label>
                          <input
                            type="text"
                            placeholder="Enter Option C"
                            value={objQuestionForm.optionC}
                            onChange={(e) => setObjQuestionForm({ ...objQuestionForm, optionC: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">Option D</label>
                          <input
                            type="text"
                            placeholder="Enter Option D"
                            value={objQuestionForm.optionD}
                            onChange={(e) => setObjQuestionForm({ ...objQuestionForm, optionD: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Correct Answer Option</label>
                        <select
                          value={objQuestionForm.correctOption}
                          onChange={(e) => setObjQuestionForm({ ...objQuestionForm, correctOption: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                        >
                          <option value="Option A">Option A</option>
                          <option value="Option B">Option B</option>
                          <option value="Option C">Option C</option>
                          <option value="Option D">Option D</option>
                        </select>
                      </div>

                      <div className="pt-3 flex items-center justify-end space-x-3 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setObjModalOpen(false)}
                          className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold text-xs rounded shadow-sm"
                        >
                          {objQuestionForm.id ? 'Update Question' : 'Save Question'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SUBMENU PAGE 4: NUMERICAL QUESTION (MATCHING SCREENSHOT 2) */}
          {activeTab === 'Numerical Question' && (
            <div className="space-y-6">
              {/* Header Title, Breadcrumb & Top-Right Add Question Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight">Numerical Question List</h1>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1">
                    <Home className="w-3.5 h-3.5 text-slate-400" />
                    <span>/</span>
                    <span className="text-slate-700 font-semibold">Questions</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setNumQuestionForm({
                      id: null,
                      subject: 'Physics',
                      chapter: 'Rotational Motion',
                      question: '',
                      numericalValue: '',
                      tolerance: '0.05',
                      difficulty: 'Medium'
                    });
                    setNumModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold text-xs rounded shadow-sm transition-colors self-start sm:self-auto"
                >
                  Add Question
                </button>
              </div>

              {/* CARD CONTAINER MATCHING SCREENSHOT 2 */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
                {/* SUBJECT SELECT DROPDOWN */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject
                  </label>
                  <select
                    value={numSubjectFilter}
                    onChange={(e) => setNumSubjectFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                  >
                    <option value="">Select Subject</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Maths">Maths</option>
                    <option value="LR & English">LR & English</option>
                    <option value="Aptitude">Aptitude</option>
                  </select>
                </div>

                {/* FULL WIDTH SEARCH INPUT WITH ATTACHED BLUE SEARCH BUTTON */}
                <div className="relative w-full flex items-center">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={numSearchTerm}
                    onChange={(e) => setNumSearchTerm(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border border-slate-200 rounded-l text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-r flex items-center justify-center"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>

                {/* TABLE MATCHING SCREENSHOT 2 */}
                <div className="overflow-x-auto border border-slate-200 rounded">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">
                      <tr>
                        <th className="p-3 border-r border-slate-200 w-3/4">QUESTIONS</th>
                        <th className="p-3 text-center w-1/4">
                          <div className="inline-flex items-center space-x-1">
                            <span>ACTION</span>
                            <span className="text-[10px] text-slate-400">⇅</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium">
                      {numericalQuestionList
                        .filter(q =>
                          (!numSubjectFilter || q.subject === numSubjectFilter) &&
                          q.question.toLowerCase().includes(numSearchTerm.toLowerCase())
                        )
                        .map((q) => (
                          <tr key={q.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3 border-r border-slate-200 text-slate-800">
                              {q.question}
                            </td>
                            <td className="p-3 text-center space-x-2">
                              <button
                                onClick={() => handleEditNumQuestion(q)}
                                className="p-1.5 border border-slate-300 hover:border-slate-500 rounded-full text-slate-700 hover:bg-slate-100 transition-colors inline-flex items-center justify-center"
                                title="Edit Question"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteNumQuestion(q.id)}
                                className="p-1.5 border border-rose-200 hover:border-rose-400 rounded-full text-rose-600 hover:bg-rose-50 transition-colors inline-flex items-center justify-center"
                                title="Delete Question"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* TABLE FOOTER / PAGINATION MATCHING SCREENSHOT 2 */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-xs text-slate-500">
                  <div>
                    Showing 1 to {
                      numericalQuestionList.filter(q =>
                        (!numSubjectFilter || q.subject === numSubjectFilter) &&
                        q.question.toLowerCase().includes(numSearchTerm.toLowerCase())
                      ).length
                    } of {numericalQuestionList.length} entries
                  </div>

                  <div className="flex items-center space-x-1">
                    <button className="px-2.5 py-1 text-slate-400 border border-slate-200 rounded text-[11px] disabled:opacity-50">
                      Previous
                    </button>
                    <button className="px-2.5 py-1 bg-[#1d4ed8] text-white font-bold rounded text-[11px]">
                      1
                    </button>
                    <button className="px-2.5 py-1 text-slate-400 border border-slate-200 rounded text-[11px]">
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* MODAL FOR ADD / EDIT NUMERICAL QUESTION */}
              {numModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <h3 className="font-bold text-slate-800 text-sm">
                        {numQuestionForm.id ? 'Edit Numerical Question' : 'Add Numerical Question'}
                      </h3>
                      <button
                        onClick={() => setNumModalOpen(false)}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveNumQuestion} className="p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                          <select
                            value={numQuestionForm.subject}
                            onChange={(e) => setNumQuestionForm({ ...numQuestionForm, subject: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                          >
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Maths">Maths</option>
                            <option value="LR & English">LR & English</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Difficulty</label>
                          <select
                            value={numQuestionForm.difficulty}
                            onChange={(e) => setNumQuestionForm({ ...numQuestionForm, difficulty: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                          >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Question Prompt</label>
                        <div className="border border-slate-200 rounded overflow-hidden bg-white">
                          <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1.5 text-slate-600">
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Bold"><Bold className="w-3.5 h-3.5" /></button>
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Italic"><Italic className="w-3.5 h-3.5" /></button>
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Underline"><Underline className="w-3.5 h-3.5" /></button>
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Code"><Code className="w-3.5 h-3.5" /></button>
                          </div>
                          <textarea
                            rows={4}
                            required
                            placeholder="Enter numerical question prompt..."
                            value={numQuestionForm.question}
                            onChange={(e) => setNumQuestionForm({ ...numQuestionForm, question: e.target.value })}
                            className="w-full p-3 text-xs focus:outline-none text-slate-800 resize-y"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Numerical Answer Value</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 14.50"
                            value={numQuestionForm.numericalValue}
                            onChange={(e) => setNumQuestionForm({ ...numQuestionForm, numericalValue: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Tolerance Range (+/-)</label>
                          <input
                            type="text"
                            placeholder="e.g. 0.05"
                            value={numQuestionForm.tolerance}
                            onChange={(e) => setNumQuestionForm({ ...numQuestionForm, tolerance: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                          />
                        </div>
                      </div>

                      <div className="pt-3 flex items-center justify-end space-x-3 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setNumModalOpen(false)}
                          className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold text-xs rounded shadow-sm"
                        >
                          {numQuestionForm.id ? 'Update Question' : 'Save Question'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 7. COURSE MASTER VIEW (MATCHING USER SCREENSHOTS 1, 2 & 3) */}
          {/* ========================================================= */}
          {activeTab === 'Course Master' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Header Title & Breadcrumb */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Course Master</h1>
                  <nav className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                    <button onClick={() => setActiveTab('Dashboard')} className="hover:text-slate-900 flex items-center gap-1">
                      <Home className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <span>/</span>
                    <span className="text-slate-800 font-bold">
                      {courseActiveTab === 'Basic Information' ? 'Course Details' : 'Courses'}
                    </span>
                  </nav>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCourseForm(defaultCourseForm);
                      setCourseActiveTab('Basic Information');
                    }}
                    className="px-4 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center space-x-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Course</span>
                  </button>
                </div>
              </div>

              {/* CARD WITH TABBED NAVIGATION */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                {/* TABS NAVIGATION BAR (Basic Information vs Table) */}
                <div className="flex border-b border-slate-200 bg-slate-50/70">
                  <button
                    type="button"
                    onClick={() => setCourseActiveTab('Basic Information')}
                    className={`flex items-center space-x-2 px-6 py-3.5 text-xs font-extrabold transition-all ${
                      courseActiveTab === 'Basic Information'
                        ? 'bg-[#1d4ed8] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Basic Information &amp; Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCourseActiveTab('Table')}
                    className={`flex items-center space-x-2 px-6 py-3.5 text-xs font-extrabold transition-all ${
                      courseActiveTab === 'Table'
                        ? 'bg-[#1d4ed8] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <List className="w-4 h-4" />
                    <span>Courses Catalogue ({courseList.length})</span>
                  </button>
                </div>

                {/* TAB 1: BASIC INFORMATION & DETAILS FORM (MATCHING SCREENSHOTS 1, 2 & 3) */}
                {courseActiveTab === 'Basic Information' && (
                  <form onSubmit={handleSaveCourse} className="p-6 sm:p-8 space-y-8">
                    
                    {/* SECTION 1: BASIC INFORMATION (SCREENSHOT 1) */}
                    <div className="bg-slate-50/50 rounded-2xl border border-slate-200/80 p-5 sm:p-6 space-y-5">
                      <div className="border-b border-slate-200 pb-3">
                        <h3 className="font-black text-slate-900 text-xs sm:text-sm uppercase tracking-wider text-slate-800">
                          BASIC INFORMATION
                        </h3>
                      </div>

                      {/* COURSE TITLE */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                          COURSE TITLE <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Enter Course Title"
                          value={courseForm.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCourseForm({
                              ...courseForm,
                              title: val,
                              slug: courseForm.id ? courseForm.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                            });
                          }}
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-2xs"
                        />
                      </div>

                      {/* SHORT DESCRIPTION */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                          SHORT DESCRIPTION
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Short Description"
                          value={courseForm.shortDescription}
                          onChange={(e) => setCourseForm({ ...courseForm, shortDescription: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-2xs"
                        />
                      </div>

                      {/* COURSE DESCRIPTION (RICH WYSIWYG EDITOR) */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                          COURSE DESCRIPTION
                        </label>
                        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                          {/* Rich Text Toolbar Matching CKEditor in Screenshot 1 */}
                          <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1.5 text-slate-600 text-xs">
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Source Code"><Code className="w-3.5 h-3.5" /></button>
                            <span className="w-px h-4 bg-slate-300 mx-0.5" />
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Undo"><RotateCcw className="w-3.5 h-3.5" /></button>
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Redo"><RotateCw className="w-3.5 h-3.5" /></button>
                            <span className="w-px h-4 bg-slate-300 mx-0.5" />
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Bold"><Bold className="w-3.5 h-3.5" /></button>
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Italic"><Italic className="w-3.5 h-3.5" /></button>
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Underline"><Underline className="w-3.5 h-3.5" /></button>
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Strikethrough"><Strikethrough className="w-3.5 h-3.5" /></button>
                            <span className="w-px h-4 bg-slate-300 mx-0.5" />
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Align Left"><AlignLeft className="w-3.5 h-3.5" /></button>
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Align Center"><AlignCenter className="w-3.5 h-3.5" /></button>
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Align Right"><AlignRight className="w-3.5 h-3.5" /></button>
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Justify"><AlignJustify className="w-3.5 h-3.5" /></button>
                            <span className="w-px h-4 bg-slate-300 mx-0.5" />
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Insert Link"><LinkIcon className="w-3.5 h-3.5" /></button>
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Insert Image"><ImageIcon className="w-3.5 h-3.5" /></button>
                            <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Insert Table"><TableIcon className="w-3.5 h-3.5" /></button>
                          </div>

                          <textarea
                            rows={8}
                            placeholder="Enter detailed course syllabus, mentor overview, and feature breakdown..."
                            value={courseForm.description}
                            onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                            className="w-full p-4 text-xs font-normal focus:outline-none text-slate-800 resize-y leading-relaxed"
                          />
                          <div className="h-2 bg-[#1e40af] w-full" />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: DETAILS (SCREENSHOT 2 & 3) */}
                    <div className="bg-slate-50/50 rounded-2xl border border-slate-200/80 p-5 sm:p-6 space-y-5">
                      <div className="border-b border-slate-200 pb-3">
                        <h3 className="font-black text-slate-900 text-xs sm:text-sm uppercase tracking-wider text-slate-800">
                          DETAILS
                        </h3>
                      </div>

                      {/* EXAM DROPDOWN */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                          EXAM <span className="text-rose-500">*</span>
                        </label>
                        <select
                          required
                          value={courseForm.exam}
                          onChange={(e) => setCourseForm({ ...courseForm, exam: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-2xs"
                        >
                          <option value="">Select Exam</option>
                          {examList.map((exam) => (
                            <option key={exam.id} value={exam.examName}>
                              {exam.examName}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* ORIGINAL PRICE & DISCOUNTED PRICE */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                            ORIGINAL PRICE (₹) <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="number"
                            required
                            placeholder="Enter Original Price (e.g. 14999)"
                            value={courseForm.originalPrice}
                            onChange={(e) => setCourseForm({ ...courseForm, originalPrice: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-2xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                            DISCOUNTED PRICE (₹) <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="number"
                            required
                            placeholder="Enter Discounted Price (e.g. 4999)"
                            value={courseForm.discountedPrice}
                            onChange={(e) => setCourseForm({ ...courseForm, discountedPrice: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-2xs"
                          />
                        </div>
                      </div>

                      {/* EXPIRY DATE, ENROLLED STUDENT, DISPLAY INDEX */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                            EXPIRY DATE
                          </label>
                          <input
                            type="date"
                            value={courseForm.expiryDate}
                            onChange={(e) => setCourseForm({ ...courseForm, expiryDate: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-2xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                            ENROLLED STUDENT
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Enrolled Student (e.g. 1420)"
                            value={courseForm.enrolledStudent}
                            onChange={(e) => setCourseForm({ ...courseForm, enrolledStudent: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-2xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                            DISPLAY INDEX
                          </label>
                          <input
                            type="number"
                            placeholder="Enter Display Index (e.g. 1)"
                            value={courseForm.displayIndex}
                            onChange={(e) => setCourseForm({ ...courseForm, displayIndex: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-2xs"
                          />
                        </div>
                      </div>

                      {/* ADDITIONAL DETAILS */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                          ADDITIONAL DETAILS
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Additional Details (e.g. Includes 1-on-1 mentorship & WhatsApp doubt group)"
                          value={courseForm.additionalDetails}
                          onChange={(e) => setCourseForm({ ...courseForm, additionalDetails: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-2xs"
                        />
                      </div>

                      {/* COURSE IMAGE SMALL & BANNER IMAGE LARGE */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                            COURSE IMAGE Small
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const url = URL.createObjectURL(file);
                                  setCourseForm({ ...courseForm, image: url });
                                }
                              }}
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-800 hover:file:bg-slate-200"
                            />
                          </div>
                          {courseForm.image && (
                            <img
                              src={courseForm.image}
                              alt="Course Preview"
                              className="w-40 h-24 object-cover rounded-xl border border-slate-200 shadow-xs mt-2"
                            />
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                            BANNER IMAGE Large
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const url = URL.createObjectURL(file);
                                  setCourseForm({ ...courseForm, bannerImage: url });
                                }
                              }}
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-800 hover:file:bg-slate-200"
                            />
                          </div>
                          {courseForm.bannerImage && (
                            <img
                              src={courseForm.bannerImage}
                              alt="Banner Preview"
                              className="w-40 h-24 object-cover rounded-xl border border-slate-200 shadow-xs mt-2"
                            />
                          )}
                        </div>
                      </div>

                      {/* ALT TAGS */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                            Alt Tag Course Image
                          </label>
                          <input
                            type="text"
                            placeholder="Enter AltTag_CourseImage"
                            value={courseForm.altCourseImage}
                            onChange={(e) => setCourseForm({ ...courseForm, altCourseImage: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-2xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                            Alt Tag Banner Image
                          </label>
                          <input
                            type="text"
                            placeholder="Enter AltTag_BannerImage"
                            value={courseForm.altBannerImage}
                            onChange={(e) => setCourseForm({ ...courseForm, altBannerImage: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-2xs"
                          />
                        </div>
                      </div>

                      {/* COURSE SCHEDULE FILE */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                          Course Schedule File (PDF Roadmap)
                        </label>
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setCourseForm({ ...courseForm, scheduleFile: file.name });
                          }}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-800 hover:file:bg-slate-200"
                        />
                      </div>

                      {/* SLUG, META TITLE, META DESCRIPTION & COURSE LINK */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                            Course Slug <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter Slug (e.g. bitsat-2026-crash-course)"
                            value={courseForm.slug}
                            onChange={(e) => setCourseForm({ ...courseForm, slug: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-2xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                            Course Meta Title
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Meta Title for Google Search"
                            value={courseForm.metaTitle}
                            onChange={(e) => setCourseForm({ ...courseForm, metaTitle: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-2xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                            Course Meta Description
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Meta Description"
                            value={courseForm.metaDescription}
                            onChange={(e) => setCourseForm({ ...courseForm, metaDescription: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-2xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                            Course Link
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Course Link URL"
                            value={courseForm.courseLink}
                            onChange={(e) => setCourseForm({ ...courseForm, courseLink: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-2xs"
                          />
                        </div>
                      </div>

                      {/* 4 CHECKBOXES MATCHING SCREENSHOT 3 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                        <div className="flex items-center space-x-2.5">
                          <input
                            type="checkbox"
                            id="chkShowInIndex"
                            checked={courseForm.isShowInIndex}
                            onChange={(e) => setCourseForm({ ...courseForm, isShowInIndex: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                          />
                          <label htmlFor="chkShowInIndex" className="text-xs font-bold text-slate-800 cursor-pointer">
                            Show In Index (Homepage)
                          </label>
                        </div>

                        <div className="flex items-center space-x-2.5">
                          <input
                            type="checkbox"
                            id="chkActive"
                            checked={courseForm.isActive}
                            onChange={(e) => setCourseForm({ ...courseForm, isActive: e.target.checked })}
                            className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                          />
                          <label htmlFor="chkActive" className="text-xs font-bold text-slate-800 cursor-pointer">
                            Active (Published)
                          </label>
                        </div>

                        <div className="flex items-center space-x-2.5">
                          <input
                            type="checkbox"
                            id="chkShowInMentorship"
                            checked={courseForm.isShowInMentorship}
                            onChange={(e) => setCourseForm({ ...courseForm, isShowInMentorship: e.target.checked })}
                            className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                          />
                          <label htmlFor="chkShowInMentorship" className="text-xs font-bold text-slate-800 cursor-pointer">
                            Show In Mentorship
                          </label>
                        </div>

                        <div className="flex items-center space-x-2.5">
                          <input
                            type="checkbox"
                            id="chkShowInTestSeries"
                            checked={courseForm.isShowInTestSeries}
                            onChange={(e) => setCourseForm({ ...courseForm, isShowInTestSeries: e.target.checked })}
                            className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
                          />
                          <label htmlFor="chkShowInTestSeries" className="text-xs font-bold text-slate-800 cursor-pointer">
                            Show In TestSeries
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* BOX FOOTER & ACTION BUTTONS MATCHING SCREENSHOT 3 */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-[#0052cc] hover:bg-[#003e99] text-white font-extrabold text-xs rounded-xl shadow-sm transition-all"
                        >
                          {courseForm.id ? 'Update Course' : 'Save Course'}
                        </button>

                        {courseForm.id && (
                          <button
                            type="button"
                            onClick={() => handleDeleteCourse(courseForm.id)}
                            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all"
                          >
                            Delete
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setCourseForm(defaultCourseForm);
                            setCourseActiveTab('Table');
                          }}
                          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
                        >
                          Cancel
                        </button>
                      </div>

                      {/* Course Workflow Linking Shortcuts */}
                      {courseForm.id && (
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setVideoForm(prev => ({
                                ...prev,
                                course: courseForm.title,
                                subject: 'Physics',
                                chapter: 'Rotational Motion'
                              }));
                              setVideoCourseFilter(courseForm.title);
                              setActiveTab('Video Master');
                              setVideoActiveTab('Basic Information');
                            }}
                            className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-extrabold text-xs rounded-xl transition-all flex items-center gap-1.5"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Assign Videos ({videoList.filter(v => v.course === courseForm.title).length})</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setDocForm(prev => ({
                                ...prev,
                                course: courseForm.title,
                                subject: 'Physics',
                                chapter: 'Rotational Motion'
                              }));
                              setDocCourseFilter(courseForm.title);
                              setActiveTab('Document Master');
                              setDocActiveTab('Basic Information');
                            }}
                            className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-extrabold text-xs rounded-xl transition-all flex items-center gap-1.5"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Assign Notes (PDF) ({docList.filter(d => d.course === courseForm.title).length})</span>
                          </button>

                          <Link
                            to={`/course-detail/${courseForm.slug}`}
                            target="_blank"
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-950 text-amber-400 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                          >
                            <span>Preview Live Page</span>
                            <span>↗</span>
                          </Link>
                        </div>
                      )}
                    </div>

                  </form>
                )}

                {/* TAB 2: COURSE CATALOGUE & CARDS TABLE VIEW */}
                {courseActiveTab === 'Table' && (
                  <div className="p-6 sm:p-8 space-y-6">
                    {/* Search Bar */}
                    <div className="relative w-full">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search courses by title, exam, or slug..."
                        value={courseSearchTerm}
                        onChange={(e) => setCourseSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Courses Grid Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {courseList
                        .filter(c =>
                          c.title.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
                          c.exam.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
                          c.slug.toLowerCase().includes(courseSearchTerm.toLowerCase())
                        )
                        .map((course) => {
                          const assignedVideosCount = videoList.filter(v => v.course === course.title).length;
                          const assignedDocsCount = docList.filter(d => d.course === course.title).length;

                          return (
                            <div
                              key={course.id}
                              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all"
                            >
                              <div>
                                {/* Course Banner Thumbnail */}
                                <div className="relative aspect-[16/9] bg-slate-950 overflow-hidden">
                                  <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                                  />
                                  <div className="absolute top-2 left-2 flex items-center gap-1">
                                    <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-slate-900/90 text-amber-400 backdrop-blur-xs">
                                      {course.exam}
                                    </span>
                                    {course.isActive && (
                                      <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider bg-emerald-500 text-white shadow-xs">
                                        Active
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Details Body */}
                                <div className="p-4 space-y-3">
                                  <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                    {course.title}
                                  </h4>
                                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                    {course.shortDescription || 'Full course curriculum with video lectures, DPPs, and mock tests.'}
                                  </p>

                                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                                    <div>
                                      <span className="text-[10px] text-slate-400 block leading-none">Selling Price</span>
                                      <span className="font-black text-slate-900 text-sm">₹{course.discountedPrice || course.price}</span>
                                      {course.originalPrice && (
                                        <span className="text-[10px] text-slate-400 line-through ml-1.5">₹{course.originalPrice}</span>
                                      )}
                                    </div>
                                    <div className="text-right">
                                      <span className="text-[10px] text-slate-400 block leading-none">Enrolled</span>
                                      <span className="font-bold text-slate-700 text-xs">{course.enrolledStudent || '1200+'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons Bar */}
                              <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-1">
                                <button
                                  onClick={() => handleEditCourse(course)}
                                  className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition-colors flex items-center gap-1"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                  <span>Edit</span>
                                </button>

                                <button
                                  onClick={() => {
                                    setVideoForm(prev => ({
                                      ...prev,
                                      course: course.title,
                                      subject: 'Physics',
                                      chapter: 'Rotational Motion'
                                    }));
                                    setVideoCourseFilter(course.title);
                                    setActiveTab('Video Master');
                                    setVideoActiveTab('Basic Information');
                                  }}
                                  className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors flex items-center gap-1"
                                  title="Assign Videos to this course"
                                >
                                  <Video className="w-3.5 h-3.5" />
                                  <span>Videos ({assignedVideosCount})</span>
                                </button>

                                <button
                                  onClick={() => {
                                    setDocForm(prev => ({
                                      ...prev,
                                      course: course.title,
                                      subject: 'Physics',
                                      chapter: 'Rotational Motion'
                                    }));
                                    setDocCourseFilter(course.title);
                                    setActiveTab('Document Master');
                                    setDocActiveTab('Basic Information');
                                  }}
                                  className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold text-xs transition-colors flex items-center gap-1"
                                  title="Assign Documents & Notes to this course"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  <span>Notes ({assignedDocsCount})</span>
                                </button>

                                <Link
                                  to={`/course-detail/${course.slug}`}
                                  target="_blank"
                                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                                  title="Preview Landing Page"
                                >
                                  <Eye className="w-4 h-4" />
                                </Link>

                                <button
                                  onClick={() => handleDeleteCourse(course.id)}
                                  className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                                  title="Delete Course"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIDEO MASTER (MATCHING SCREENSHOTS 1 & 2 FOR VIDEOS) */}
          {activeTab === 'Video Master' && (
            <div className="space-y-6">
              {/* Header Title & Breadcrumb */}
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Videos</h1>
                <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1">
                  <Home className="w-3.5 h-3.5 text-slate-400" />
                  <span>/</span>
                  <span className="text-slate-700 font-semibold">Video Master</span>
                </div>
              </div>

              {/* CARD WITH TABBED NAVIGATION */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {/* TABS NAVIGATION BAR (Basic Information vs Table) */}
                <div className="flex border-b border-slate-200 bg-slate-50/50">
                  <button
                    type="button"
                    onClick={() => setVideoActiveTab('Basic Information')}
                    className={`flex items-center space-x-2 px-6 py-3 text-xs font-bold transition-colors ${
                      videoActiveTab === 'Basic Information'
                        ? 'bg-[#1d4ed8] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Basic Information</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVideoActiveTab('Table')}
                    className={`flex items-center space-x-2 px-6 py-3 text-xs font-bold transition-colors ${
                      videoActiveTab === 'Table'
                        ? 'bg-[#1d4ed8] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>Table</span>
                  </button>
                </div>

                {/* TAB 1: BASIC INFORMATION FORM (MATCHING SCREENSHOT 1) */}
                {videoActiveTab === 'Basic Information' && (
                  <form onSubmit={handleSaveVideo} className="p-6 space-y-5">
                    {/* ROW 0: COURSE SELECTION */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        COURSE / BATCH <span className="text-rose-500">*</span>
                      </label>
                      <select
                        required
                        value={videoForm.course}
                        onChange={(e) => setVideoForm({ ...videoForm, course: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 shadow-2xs"
                      >
                        <option value="">Select Course</option>
                        {courseList.map(c => (
                          <option key={c.id} value={c.title}>
                            {c.title} ({c.exam})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* ROW 1: SUBJECT & CHAPTER DROPDOWNS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                          SUBJECT <span className="text-rose-500">*</span>
                        </label>
                        <select
                          required
                          value={videoForm.subject}
                          onChange={(e) => setVideoForm({ ...videoForm, subject: e.target.value })}
                          className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 text-slate-800"
                        >
                          <option value="">Select Subject</option>
                          <option value="Physics">Physics</option>
                          <option value="Chemistry">Chemistry</option>
                          <option value="Maths">Maths</option>
                          <option value="LR & English">LR & English</option>
                          <option value="Aptitude">Aptitude</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                          CHAPTER <span className="text-rose-500">*</span>
                        </label>
                        <select
                          required
                          value={videoForm.chapter}
                          onChange={(e) => setVideoForm({ ...videoForm, chapter: e.target.value })}
                          className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 text-slate-800"
                        >
                          <option value="">Select Chapter</option>
                          <option value="Rotational Motion">Rotational Motion</option>
                          <option value="Alcohols Phenols and Ethers">Alcohols Phenols and Ethers</option>
                          <option value="Integration & Calculus">Integration & Calculus</option>
                          <option value="Electrostatics & Capacitance">Electrostatics & Capacitance</option>
                          <option value="Aldehydes Ketones and Carboxylic Acids">Aldehydes Ketones and Carboxylic Acids</option>
                        </select>
                      </div>
                    </div>

                    {/* ROW 2: VIDEO TITLE */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        VIDEO TITLE <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter Video Lecture Title"
                        value={videoForm.title}
                        onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 text-slate-800"
                      />
                    </div>

                    {/* ROW 3: BRIEF DESCRIPTION RICH TEXT EDITOR */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        BRIEF DESCRIPTION
                      </label>
                      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                        <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1.5 text-slate-600">
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Code"><Code className="w-3.5 h-3.5" /></button>
                          <span className="w-px h-4 bg-slate-300 mx-0.5" />
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Undo"><RotateCcw className="w-3.5 h-3.5" /></button>
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Redo"><RotateCw className="w-3.5 h-3.5" /></button>
                          <span className="w-px h-4 bg-slate-300 mx-0.5" />
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Bold"><Bold className="w-3.5 h-3.5" /></button>
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Italic"><Italic className="w-3.5 h-3.5" /></button>
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Underline"><Underline className="w-3.5 h-3.5" /></button>
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Strikethrough"><Strikethrough className="w-3.5 h-3.5" /></button>
                        </div>
                        <textarea
                          rows={4}
                          placeholder="Enter brief lecture synopsis, timestamps, and prerequisites..."
                          value={videoForm.description}
                          onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                          className="w-full p-3 text-xs focus:outline-none text-slate-800 resize-y"
                        />
                        <div className="h-2 bg-[#1e40af] w-full" />
                      </div>
                    </div>

                    {/* ROW 4: VIDEO LINK & ORDER NUMBER */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                          VIDEO LINK (URL / Vimeo / YouTube ID)
                        </label>
                        <input
                          type="text"
                          placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                          value={videoForm.videoLink}
                          onChange={(e) => setVideoForm({ ...videoForm, videoLink: e.target.value })}
                          className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:border-blue-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                          ORDER NUMBER
                        </label>
                        <input
                          type="number"
                          placeholder="Enter Order Number"
                          value={videoForm.orderNumber}
                          onChange={(e) => setVideoForm({ ...videoForm, orderNumber: e.target.value })}
                          className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    {/* ROW 5: CHECKBOXES */}
                    <div className="flex items-center space-x-8 pt-1">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="liveVideoCheck"
                          checked={videoForm.liveVideo}
                          onChange={(e) => setVideoForm({ ...videoForm, liveVideo: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                        />
                        <label htmlFor="liveVideoCheck" className="text-xs font-bold text-slate-700 cursor-pointer">
                          Live Video Stream
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="enabledVideoCheck"
                          checked={videoForm.enabled}
                          onChange={(e) => setVideoForm({ ...videoForm, enabled: e.target.checked })}
                          className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                        />
                        <label htmlFor="enabledVideoCheck" className="text-xs font-bold text-slate-700 cursor-pointer">
                          Enabled &amp; Published
                        </label>
                      </div>
                    </div>

                    {/* SAVE BUTTON */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors"
                      >
                        {videoForm.id ? 'Update Video' : 'Save Video'}
                      </button>
                    </div>
                  </form>
                )}

                {/* TAB 2: TABLE VIEW (MATCHING SCREENSHOT 2) */}
                {videoActiveTab === 'Table' && (
                  <div className="p-6 space-y-4">
                    {/* Filters Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                          FILTER BY COURSE
                        </label>
                        <select
                          value={videoCourseFilter}
                          onChange={(e) => setVideoCourseFilter(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                        >
                          <option value="">All Courses ({courseList.length})</option>
                          {courseList.map(c => (
                            <option key={c.id} value={c.title}>{c.title}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                          FILTER BY SUBJECT
                        </label>
                        <select
                          value={videoSubjectFilter}
                          onChange={(e) => setVideoSubjectFilter(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                        >
                          <option value="">All Subjects</option>
                          <option value="Physics">Physics</option>
                          <option value="Chemistry">Chemistry</option>
                          <option value="Maths">Maths</option>
                          <option value="LR & English">LR & English</option>
                          <option value="Aptitude">Aptitude</option>
                        </select>
                      </div>
                    </div>

                    <div className="relative w-full flex items-center">
                      <input
                        type="text"
                        placeholder="Search video lectures by title, chapter or course..."
                        value={videoSearchTerm}
                        onChange={(e) => setVideoSearchTerm(e.target.value)}
                        className="w-full pl-3 pr-10 py-2.5 border border-slate-200 rounded-l-xl text-xs font-semibold focus:outline-none focus:border-blue-500 text-slate-800"
                      />
                      <button
                        type="button"
                        className="px-4 py-2.5 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-r-xl flex items-center justify-center"
                      >
                        <Search className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="overflow-x-auto border border-slate-200 rounded-xl">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">
                          <tr>
                            <th className="p-3 border-r border-slate-200 w-1/3">VIDEO TITLE</th>
                            <th className="p-3 border-r border-slate-200 w-1/4">COURSE / SUBJECT</th>
                            <th className="p-3 border-r border-slate-200 w-1/4">CHAPTER</th>
                            <th className="p-3 text-center w-1/6">ACTION</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 font-medium">
                          {videoList
                            .filter(v =>
                              (!videoCourseFilter || v.course === videoCourseFilter) &&
                              (!videoSubjectFilter || v.subject === videoSubjectFilter) &&
                              (v.title.toLowerCase().includes(videoSearchTerm.toLowerCase()) ||
                               (v.chapter && v.chapter.toLowerCase().includes(videoSearchTerm.toLowerCase())) ||
                               (v.course && v.course.toLowerCase().includes(videoSearchTerm.toLowerCase())))
                            )
                            .map((v) => (
                              <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="p-3 border-r border-slate-200 text-slate-800 font-bold">
                                  <div className="flex items-center gap-2">
                                    <Video className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                    <span>{v.title}</span>
                                  </div>
                                </td>
                                <td className="p-3 border-r border-slate-200 text-slate-600">
                                  <div className="text-[11px] font-bold text-slate-900 truncate max-w-[200px]">{v.course || 'All Courses'}</div>
                                  <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-slate-100 text-slate-700">
                                    {v.subject}
                                  </span>
                                </td>
                                <td className="p-3 border-r border-slate-200 text-slate-700 font-medium">
                                  {v.chapter}
                                </td>
                                <td className="p-3 text-center space-x-2">
                                  <button
                                    onClick={() => handleEditVideo(v)}
                                    className="p-1.5 border border-slate-300 hover:border-slate-500 rounded-full text-slate-700 hover:bg-slate-100 transition-colors inline-flex items-center justify-center"
                                    title="Edit Video"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteVideo(v.id)}
                                    className="p-1.5 border border-rose-200 hover:border-rose-400 rounded-full text-rose-600 hover:bg-rose-50 transition-colors inline-flex items-center justify-center"
                                    title="Delete Video"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-xs text-slate-500">
                      <div>
                        Showing 1 to {
                          videoList.filter(v =>
                            (!videoCourseFilter || v.course === videoCourseFilter) &&
                            (!videoSubjectFilter || v.subject === videoSubjectFilter) &&
                            v.title.toLowerCase().includes(videoSearchTerm.toLowerCase())
                          ).length
                        } of {videoList.length} entries
                      </div>

                      <div className="flex items-center space-x-1">
                        <button className="px-2.5 py-1 text-slate-400 border border-slate-200 rounded text-[11px] disabled:opacity-50">
                          Previous
                        </button>
                        <button className="px-2.5 py-1 bg-[#1d4ed8] text-white font-bold rounded text-[11px]">
                          1
                        </button>
                        <button className="px-2.5 py-1 text-slate-400 border border-slate-200 rounded text-[11px]">
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DOCUMENT MASTER (MATCHING SCREENSHOT 3 FOR DOCUMENTS) */}
          {activeTab === 'Document Master' && (
            <div className="space-y-6">
              {/* Header Title & Breadcrumb */}
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Documents</h1>
                <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1">
                  <Home className="w-3.5 h-3.5 text-slate-400" />
                  <span>/</span>
                  <span className="text-slate-700 font-semibold">Document Master</span>
                </div>
              </div>

              {/* CARD WITH TABBED NAVIGATION */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {/* TABS NAVIGATION BAR (Basic Information vs Table) */}
                <div className="flex border-b border-slate-200 bg-slate-50/50">
                  <button
                    type="button"
                    onClick={() => setDocActiveTab('Basic Information')}
                    className={`flex items-center space-x-2 px-6 py-3 text-xs font-bold transition-colors ${
                      docActiveTab === 'Basic Information'
                        ? 'bg-[#1d4ed8] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Basic Information</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDocActiveTab('Table')}
                    className={`flex items-center space-x-2 px-6 py-3 text-xs font-bold transition-colors ${
                      docActiveTab === 'Table'
                        ? 'bg-[#1d4ed8] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>Table</span>
                  </button>
                </div>

                {/* TAB 1: BASIC INFORMATION FORM (MATCHING SCREENSHOT 3) */}
                {docActiveTab === 'Basic Information' && (
                  <form onSubmit={handleSaveDoc} className="p-6 space-y-5">
                    {/* ROW 0: COURSE SELECTION */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        COURSE / BATCH <span className="text-rose-500">*</span>
                      </label>
                      <select
                        required
                        value={docForm.course}
                        onChange={(e) => setDocForm({ ...docForm, course: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 shadow-2xs"
                      >
                        <option value="">Select Course</option>
                        {courseList.map(c => (
                          <option key={c.id} value={c.title}>
                            {c.title} ({c.exam})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* ROW 1: SUBJECT & CHAPTER DROPDOWNS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                          SUBJECT <span className="text-rose-500">*</span>
                        </label>
                        <select
                          required
                          value={docForm.subject}
                          onChange={(e) => setDocForm({ ...docForm, subject: e.target.value })}
                          className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 text-slate-800"
                        >
                          <option value="">Select Subject</option>
                          <option value="Physics">Physics</option>
                          <option value="Chemistry">Chemistry</option>
                          <option value="Maths">Maths</option>
                          <option value="LR & English">LR & English</option>
                          <option value="Aptitude">Aptitude</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                          CHAPTER <span className="text-rose-500">*</span>
                        </label>
                        <select
                          required
                          value={docForm.chapter}
                          onChange={(e) => setDocForm({ ...docForm, chapter: e.target.value })}
                          className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 text-slate-800"
                        >
                          <option value="">Select Chapter</option>
                          <option value="Rotational Motion">Rotational Motion</option>
                          <option value="Alcohols Phenols and Ethers">Alcohols Phenols and Ethers</option>
                          <option value="Integration & Calculus">Integration & Calculus</option>
                          <option value="Electrostatics & Capacitance">Electrostatics & Capacitance</option>
                          <option value="Aldehydes Ketones and Carboxylic Acids">Aldehydes Ketones and Carboxylic Acids</option>
                        </select>
                      </div>
                    </div>

                    {/* ROW 2: DOCUMENT TITLE */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        DOCUMENT / NOTES TITLE <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter DPP / Short Notes / Formula Sheet Title"
                        value={docForm.title}
                        onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 text-slate-800"
                      />
                    </div>

                    {/* ROW 3: BRIEF DESCRIPTION RICH TEXT EDITOR */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        BRIEF DESCRIPTION
                      </label>
                      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                        <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1.5 text-slate-600">
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Code"><Code className="w-3.5 h-3.5" /></button>
                          <span className="w-px h-4 bg-slate-300 mx-0.5" />
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Undo"><RotateCcw className="w-3.5 h-3.5" /></button>
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Redo"><RotateCw className="w-3.5 h-3.5" /></button>
                          <span className="w-px h-4 bg-slate-300 mx-0.5" />
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Bold"><Bold className="w-3.5 h-3.5" /></button>
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Italic"><Italic className="w-3.5 h-3.5" /></button>
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Underline"><Underline className="w-3.5 h-3.5" /></button>
                          <button type="button" className="p-1 hover:bg-slate-200 rounded" title="Strikethrough"><Strikethrough className="w-3.5 h-3.5" /></button>
                        </div>
                        <textarea
                          rows={4}
                          placeholder="Enter brief summary of document contents and key formulas..."
                          value={docForm.description}
                          onChange={(e) => setDocForm({ ...docForm, description: e.target.value })}
                          className="w-full p-3 text-xs focus:outline-none text-slate-800 resize-y"
                        />
                        <div className="h-2 bg-[#1e40af] w-full" />
                      </div>
                    </div>

                    {/* ROW 4: DOCUMENT FILE & ORDER NUMBER */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                          DOCUMENT PDF FILE
                        </label>
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setDocForm({ ...docForm, fileName: e.target.files[0].name });
                            }
                          }}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                          ORDER NUMBER
                        </label>
                        <input
                          type="number"
                          placeholder="Enter Order Number"
                          value={docForm.orderNumber}
                          onChange={(e) => setDocForm({ ...docForm, orderNumber: e.target.value })}
                          className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    {/* ROW 5: ENABLED CHECKBOX */}
                    <div className="flex items-center space-x-2 pt-1">
                      <input
                        type="checkbox"
                        id="enabledDocCheck"
                        checked={docForm.enabled}
                        onChange={(e) => setDocForm({ ...docForm, enabled: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                      />
                      <label htmlFor="enabledDocCheck" className="text-xs font-bold text-slate-700 cursor-pointer">
                        Enabled &amp; Downloadable
                      </label>
                    </div>

                    {/* SAVE BUTTON */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors"
                      >
                        {docForm.id ? 'Update Document' : 'Save Document'}
                      </button>
                    </div>
                  </form>
                )}

                {/* TAB 2: TABLE VIEW */}
                {docActiveTab === 'Table' && (
                  <div className="p-6 space-y-4">
                    {/* Filters Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                          FILTER BY COURSE
                        </label>
                        <select
                          value={docCourseFilter}
                          onChange={(e) => setDocCourseFilter(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                        >
                          <option value="">All Courses ({courseList.length})</option>
                          {courseList.map(c => (
                            <option key={c.id} value={c.title}>{c.title}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                          FILTER BY SUBJECT
                        </label>
                        <select
                          value={docSubjectFilter}
                          onChange={(e) => setDocSubjectFilter(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                        >
                          <option value="">All Subjects</option>
                          <option value="Physics">Physics</option>
                          <option value="Chemistry">Chemistry</option>
                          <option value="Maths">Maths</option>
                          <option value="LR & English">LR & English</option>
                          <option value="Aptitude">Aptitude</option>
                        </select>
                      </div>
                    </div>

                    <div className="relative w-full flex items-center">
                      <input
                        type="text"
                        placeholder="Search documents by title, chapter or course..."
                        value={docSearchTerm}
                        onChange={(e) => setDocSearchTerm(e.target.value)}
                        className="w-full pl-3 pr-10 py-2.5 border border-slate-200 rounded-l-xl text-xs font-semibold focus:outline-none focus:border-blue-500 text-slate-800"
                      />
                      <button
                        type="button"
                        className="px-4 py-2.5 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-r-xl flex items-center justify-center"
                      >
                        <Search className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="overflow-x-auto border border-slate-200 rounded-xl">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">
                          <tr>
                            <th className="p-3 border-r border-slate-200 w-1/3">DOCUMENT / NOTES</th>
                            <th className="p-3 border-r border-slate-200 w-1/4">COURSE / SUBJECT</th>
                            <th className="p-3 border-r border-slate-200 w-1/4">CHAPTER</th>
                            <th className="p-3 text-center w-1/6">ACTION</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 font-medium">
                          {docList
                            .filter(d =>
                              (!docCourseFilter || d.course === docCourseFilter) &&
                              (!docSubjectFilter || d.subject === docSubjectFilter) &&
                              (d.title.toLowerCase().includes(docSearchTerm.toLowerCase()) ||
                               (d.chapter && d.chapter.toLowerCase().includes(docSearchTerm.toLowerCase())) ||
                               (d.course && d.course.toLowerCase().includes(docSearchTerm.toLowerCase())))
                            )
                            .map((d) => (
                              <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="p-3 border-r border-slate-200 text-slate-800 font-bold">
                                  <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                    <span>{d.title}</span>
                                  </div>
                                </td>
                                <td className="p-3 border-r border-slate-200 text-slate-600">
                                  <div className="text-[11px] font-bold text-slate-900 truncate max-w-[200px]">{d.course || 'All Courses'}</div>
                                  <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-slate-100 text-slate-700">
                                    {d.subject}
                                  </span>
                                </td>
                                <td className="p-3 border-r border-slate-200 text-slate-700 font-medium">
                                  {d.chapter}
                                </td>
                                <td className="p-3 text-center space-x-2">
                                  <button
                                    onClick={() => handleEditDoc(d)}
                                    className="p-1.5 border border-slate-300 hover:border-slate-500 rounded-full text-slate-700 hover:bg-slate-100 transition-colors inline-flex items-center justify-center"
                                    title="Edit Document"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteDoc(d.id)}
                                    className="p-1.5 border border-rose-200 hover:border-rose-400 rounded-full text-rose-600 hover:bg-rose-50 transition-colors inline-flex items-center justify-center"
                                    title="Delete Document"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-xs text-slate-500">
                      <div>
                        Showing 1 to {
                          docList.filter(d =>
                            (!docCourseFilter || d.course === docCourseFilter) &&
                            (!docSubjectFilter || d.subject === docSubjectFilter) &&
                            d.title.toLowerCase().includes(docSearchTerm.toLowerCase())
                          ).length
                        } of {docList.length} entries
                      </div>

                      <div className="flex items-center space-x-1">
                        <button className="px-2.5 py-1 text-slate-400 border border-slate-200 rounded text-[11px] disabled:opacity-50">
                          Previous
                        </button>
                        <button className="px-2.5 py-1 bg-[#1d4ed8] text-white font-bold rounded text-[11px]">
                          1
                        </button>
                        <button className="px-2.5 py-1 text-slate-400 border border-slate-200 rounded text-[11px]">
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* COUPONS (MATCHING SCREENSHOT 4 FOR COUPON LIST) */}
          {activeTab === 'Coupon' && (
            <div className="space-y-6">
              {/* Header Title & Top Right Add Coupon Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight">Coupons</h1>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1">
                    <Home className="w-3.5 h-3.5 text-slate-400" />
                    <span>/</span>
                    <span className="text-slate-700 font-semibold">Coupon List</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCouponForm({
                      id: null,
                      code: '',
                      validFrom: '',
                      expiryDate: '',
                      discount: '',
                      usageAllowed: '10',
                      usageUsed: '0'
                    });
                    setCouponModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold text-xs rounded shadow-sm transition-colors self-start sm:self-auto"
                >
                  Add Coupon
                </button>
              </div>

              {/* CARD CONTAINER MATCHING SCREENSHOT 4 */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
                {/* SEARCH BAR WITH ATTACHED BLUE SEARCH BUTTON */}
                <div className="relative w-full flex items-center">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={couponSearchTerm}
                    onChange={(e) => setCouponSearchTerm(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border border-slate-200 rounded-l text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-r flex items-center justify-center"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>

                {/* TABLE MATCHING SCREENSHOT 4 */}
                <div className="overflow-x-auto border border-slate-200 rounded">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">
                      <tr>
                        <th className="p-3 border-r border-slate-200">
                          <div className="flex items-center justify-between">
                            <span>COUPON</span>
                            <span className="text-[10px] text-slate-400">⇅</span>
                          </div>
                        </th>
                        <th className="p-3 border-r border-slate-200">
                          <div className="flex items-center justify-between">
                            <span>VALID FROM</span>
                            <span className="text-[10px] text-slate-400">⇅</span>
                          </div>
                        </th>
                        <th className="p-3 border-r border-slate-200">
                          <div className="flex items-center justify-between">
                            <span>EXPIRY DATE</span>
                            <span className="text-[10px] text-slate-400">⇅</span>
                          </div>
                        </th>
                        <th className="p-3 border-r border-slate-200">
                          <div className="flex items-center justify-between">
                            <span>DISCOUNT</span>
                            <span className="text-[10px] text-slate-400">⇅</span>
                          </div>
                        </th>
                        <th className="p-3 border-r border-slate-200">
                          <div className="flex items-center justify-between">
                            <span>USAGE ALLOWED / USED</span>
                            <span className="text-[10px] text-slate-400">⇅</span>
                          </div>
                        </th>
                        <th className="p-3 text-center">
                          <div className="inline-flex items-center space-x-1">
                            <span>ACTION</span>
                            <span className="text-[10px] text-slate-400">⇅</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium">
                      {couponList
                        .filter(c => c.code.toLowerCase().includes(couponSearchTerm.toLowerCase()))
                        .map((c) => (
                          <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3 border-r border-slate-200 text-slate-900 font-semibold">
                              {c.code}
                            </td>
                            <td className="p-3 border-r border-slate-200 text-slate-600">
                              {c.validFrom}
                            </td>
                            <td className="p-3 border-r border-slate-200 text-slate-600">
                              {c.expiryDate}
                            </td>
                            <td className="p-3 border-r border-slate-200 text-slate-800 font-medium">
                              {c.discount}
                            </td>
                            <td className="p-3 border-r border-slate-200 text-slate-600">
                              {c.usage}
                            </td>
                            <td className="p-3 text-center space-x-2">
                              <button
                                onClick={() => handleEditCoupon(c)}
                                className="p-1.5 border border-slate-300 hover:border-slate-500 rounded-full text-slate-700 hover:bg-slate-100 transition-colors inline-flex items-center justify-center"
                                title="Edit Coupon"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteCoupon(c.id)}
                                className="p-1.5 border border-rose-200 hover:border-rose-400 rounded-full text-rose-600 hover:bg-rose-50 transition-colors inline-flex items-center justify-center"
                                title="Delete Coupon"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* TABLE FOOTER / PAGINATION MATCHING SCREENSHOT 4 */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-xs text-slate-500">
                  <div>
                    Showing 1 to {couponList.filter(c => c.code.toLowerCase().includes(couponSearchTerm.toLowerCase())).length} of {couponList.length} entries
                  </div>

                  <div className="flex items-center space-x-1">
                    <button className="px-2.5 py-1 text-slate-400 border border-slate-200 rounded text-[11px] disabled:opacity-50">
                      Previous
                    </button>
                    <button className="px-2.5 py-1 bg-[#1d4ed8] text-white font-bold rounded text-[11px]">
                      1
                    </button>
                    <button className="px-2.5 py-1 text-slate-400 border border-slate-200 rounded text-[11px]">
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* MODAL FOR ADD / EDIT COUPON */}
              {couponModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h3 className="font-bold text-slate-900 text-sm">
                        {couponForm.id ? 'Edit Coupon' : 'Add Coupon'}
                      </h3>
                      <button onClick={() => setCouponModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveCoupon} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Coupon Code*</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. BITS2026"
                          value={couponForm.code}
                          onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Valid From</label>
                          <input
                            type="text"
                            placeholder="e.g. 01/Aug/2026"
                            value={couponForm.validFrom}
                            onChange={(e) => setCouponForm({ ...couponForm, validFrom: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="e.g. 30/Nov/2026"
                            value={couponForm.expiryDate}
                            onChange={(e) => setCouponForm({ ...couponForm, expiryDate: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Discount Value</label>
                          <input
                            type="text"
                            placeholder="e.g. 100% or 1500"
                            value={couponForm.discount}
                            onChange={(e) => setCouponForm({ ...couponForm, discount: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Usage Limit</label>
                          <input
                            type="text"
                            placeholder="e.g. 10"
                            value={couponForm.usageAllowed}
                            onChange={(e) => setCouponForm({ ...couponForm, usageAllowed: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setCouponModalOpen(false)}
                          className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded hover:bg-slate-200"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#1d4ed8] text-white font-semibold text-xs rounded hover:bg-[#1e40af]"
                        >
                          {couponForm.id ? 'Update Coupon' : 'Save Coupon'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 10. BLOG MASTER */}
          {activeTab === 'Blog Master' && (
            <div className="space-y-6">
              {/* Header & Breadcrumb */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Blog</h2>
                  <div className="flex items-center space-x-1 text-xs text-slate-500 mt-1">
                    <span className="text-blue-600 font-semibold cursor-pointer" onClick={() => setActiveTab('Dashboard')}>Home</span>
                    <span>/</span>
                    <span>Blog Master</span>
                  </div>
                </div>
              </div>

              {/* Main Card Container */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                {/* Tabs Header Bar */}
                <div className="flex border-b border-slate-200 bg-slate-50/50">
                  <button
                    type="button"
                    onClick={() => setBlogActiveTab('Basic Information')}
                    className={`flex items-center space-x-2 px-6 py-3 text-xs font-semibold transition-all ${
                      blogActiveTab === 'Basic Information'
                        ? 'bg-[#0052cc] text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80"></span>
                    <span>Basic Information</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBlogActiveTab('Table')}
                    className={`flex items-center space-x-2 px-6 py-3 text-xs font-semibold transition-all ${
                      blogActiveTab === 'Table'
                        ? 'bg-[#0052cc] text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80"></span>
                    <span>Table</span>
                  </button>
                </div>

                {/* TAB 1: BASIC INFORMATION (FORM VIEW) */}
                {blogActiveTab === 'Basic Information' && (
                  <form onSubmit={handleSaveBlog} className="p-6 space-y-6">
                    {/* EXAM */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold tracking-wider text-slate-600 uppercase">
                        EXAM
                      </label>
                      <div className="relative">
                        <select
                          value={blogForm.exam}
                          onChange={(e) => setBlogForm({ ...blogForm, exam: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 appearance-none pr-8 cursor-pointer"
                        >
                          <option value="BITSAT">BITSAT Exam</option>
                          <option value="JEE Main">JEE Main</option>
                          <option value="JEE Advanced">JEE Advanced</option>
                          <option value="VITEEE">VITEEE</option>
                          <option value="MET">MET</option>
                          <option value="COMEDK">COMEDK</option>
                          <option value="General">General / Other</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-2.5 pointer-events-none" />
                      </div>
                    </div>

                    {/* BLOG TITLE */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold tracking-wider text-slate-600 uppercase">
                        BLOG TITLE
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter Blog Title"
                        value={blogForm.title}
                        onChange={(e) => {
                          const newTitle = e.target.value;
                          const autoSlug = blogForm.id ? blogForm.slug : newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                          setBlogForm({
                            ...blogForm,
                            title: newTitle,
                            slug: autoSlug,
                            metaTitle: blogForm.metaTitle || newTitle
                          });
                        }}
                        className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      />
                    </div>

                    {/* BLOG DESCRIPTION WITH TOOLBAR */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold tracking-wider text-slate-600 uppercase">
                        BLOG DESCRIPTION
                      </label>
                      <div className="border border-slate-300 rounded overflow-hidden shadow-xs">
                        {/* Editor Toolbar */}
                        <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1 text-slate-700 text-xs">
                          <div className="flex items-center space-x-1 border-r border-slate-300 pr-2 mr-1">
                            <button type="button" title="Source Code" className="p-1 hover:bg-slate-200 rounded text-slate-600 text-[11px] font-mono">Source</button>
                            <button type="button" title="Undo" className="p-1 hover:bg-slate-200 rounded text-slate-600">↺</button>
                            <button type="button" title="Redo" className="p-1 hover:bg-slate-200 rounded text-slate-600">↻</button>
                          </div>
                          
                          <div className="flex items-center space-x-1 border-r border-slate-300 pr-2 mr-1">
                            <button type="button" onClick={() => setBlogForm(f => ({ ...f, description: f.description + '<b></b>' }))} title="Bold" className="p-1 font-bold hover:bg-slate-200 rounded px-1.5">B</button>
                            <button type="button" onClick={() => setBlogForm(f => ({ ...f, description: f.description + '<i></i>' }))} title="Italic" className="p-1 italic hover:bg-slate-200 rounded px-1.5">I</button>
                            <button type="button" onClick={() => setBlogForm(f => ({ ...f, description: f.description + '<u></u>' }))} title="Underline" className="p-1 underline hover:bg-slate-200 rounded px-1.5">U</button>
                            <button type="button" onClick={() => setBlogForm(f => ({ ...f, description: f.description + '<s></s>' }))} title="Strikethrough" className="p-1 line-through hover:bg-slate-200 rounded px-1.5">S</button>
                          </div>

                          <div className="flex items-center space-x-1 border-r border-slate-300 pr-2 mr-1">
                            <button type="button" title="Align Left" className="p-1 hover:bg-slate-200 rounded">≡</button>
                            <button type="button" title="Align Center" className="p-1 hover:bg-slate-200 rounded">≡</button>
                            <button type="button" title="Align Right" className="p-1 hover:bg-slate-200 rounded">≡</button>
                          </div>

                          <div className="flex items-center space-x-1 border-r border-slate-300 pr-2 mr-1">
                            <button type="button" title="Insert Link" className="p-1 hover:bg-slate-200 rounded text-blue-600 font-semibold">🔗</button>
                            <button type="button" title="Insert Image" className="p-1 hover:bg-slate-200 rounded">🖼️</button>
                            <button type="button" title="Insert Table" className="p-1 hover:bg-slate-200 rounded">▦</button>
                          </div>

                          <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                            <span>Font: Standard</span>
                            <span>Size: Normal</span>
                          </div>
                        </div>

                        {/* Textarea Area */}
                        <textarea
                          rows={8}
                          placeholder="Enter Blog Description here..."
                          value={blogForm.description}
                          onChange={(e) => setBlogForm({ ...blogForm, description: e.target.value })}
                          className="w-full p-3 text-xs text-slate-800 focus:outline-none resize-y min-h-[160px]"
                        />
                        <div className="h-1 bg-[#0052cc]"></div>
                      </div>
                    </div>

                    {/* SUBSECTION: DETAILS */}
                    <div className="pt-4 border-t border-slate-100 space-y-4">
                      <h3 className="text-xs font-bold text-slate-700 tracking-wider uppercase">
                        DETAILS
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Blog Image Part Small */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-semibold text-slate-600">
                            Blog Image Part Small
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const url = URL.createObjectURL(file);
                                setBlogForm({ ...blogForm, smallImage: url });
                              }
                            }}
                            className="w-full text-xs text-slate-500 border border-slate-300 rounded file:mr-3 file:py-1.5 file:px-3 file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                          />
                          {blogForm.smallImage && (
                            <img src={blogForm.smallImage} alt="Small preview" className="h-12 w-auto object-cover rounded border border-slate-200 mt-1" />
                          )}
                        </div>

                        {/* Blog Image Part Large */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-semibold text-slate-600">
                            Blog Image Part Large
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const url = URL.createObjectURL(file);
                                setBlogForm({ ...blogForm, largeImage: url });
                              }
                            }}
                            className="w-full text-xs text-slate-500 border border-slate-300 rounded file:mr-3 file:py-1.5 file:px-3 file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                          />
                          {blogForm.largeImage && (
                            <img src={blogForm.largeImage} alt="Large preview" className="h-12 w-auto object-cover rounded border border-slate-200 mt-1" />
                          )}
                        </div>
                      </div>

                      {/* Alt Tag Description Small */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-semibold text-slate-600">
                          Alt Tag Description Small
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Alt Tag Description Small"
                          value={blogForm.altSmall}
                          onChange={(e) => setBlogForm({ ...blogForm, altSmall: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                        />
                      </div>

                      {/* Alt Tag Description Large */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-semibold text-slate-600">
                          Alt Tag Description Large
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Alt Tag Description Large"
                          value={blogForm.altLarge}
                          onChange={(e) => setBlogForm({ ...blogForm, altLarge: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                        />
                      </div>

                      {/* Blog Slug */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-semibold text-slate-600">
                          Blog Slug
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Enter Blog Slug"
                          value={blogForm.slug}
                          onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                        />
                      </div>

                      {/* Blog Meta Title */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-semibold text-slate-600">
                          Blog Meta Title
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Blog Title"
                          value={blogForm.metaTitle}
                          onChange={(e) => setBlogForm({ ...blogForm, metaTitle: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                        />
                      </div>

                      {/* Blog Meta Description */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-semibold text-slate-600">
                          Blog Meta Description
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Description"
                          value={blogForm.metaDescription}
                          onChange={(e) => setBlogForm({ ...blogForm, metaDescription: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                        />
                      </div>

                      {/* Publish Checkbox */}
                      <div className="flex items-center space-x-2 pt-1">
                        <input
                          type="checkbox"
                          id="blogPublishCheck"
                          checked={blogForm.published}
                          onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                        />
                        <label htmlFor="blogPublishCheck" className="text-xs text-slate-700 cursor-pointer select-none">
                          Publish
                        </label>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 flex items-center space-x-3">
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#0052cc] hover:bg-[#003e99] text-white font-semibold text-xs rounded transition-colors shadow-sm"
                      >
                        {blogForm.id ? 'Update Blog' : 'Save'}
                      </button>
                      {blogForm.id && (
                        <button
                          type="button"
                          onClick={() => {
                            handleAddNewBlog();
                          }}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded transition-colors"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>
                )}

                {/* TAB 2: TABLE VIEW */}
                {blogActiveTab === 'Table' && (
                  <div className="p-6 space-y-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                      {/* Search */}
                      <div className="flex items-center space-x-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                          <input
                            type="text"
                            placeholder="Search by title, exam, or slug..."
                            value={blogSearchTerm}
                            onChange={(e) => setBlogSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 pl-8"
                          />
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        </div>
                        {blogSearchTerm && (
                          <button
                            type="button"
                            onClick={() => setBlogSearchTerm('')}
                            className="text-xs text-slate-500 hover:text-slate-700 underline"
                          >
                            Clear
                          </button>
                        )}
                      </div>

                      {/* Add Blog Button */}
                      <button
                        type="button"
                        onClick={handleAddNewBlog}
                        className="flex items-center space-x-1.5 px-4 py-2 bg-[#0052cc] hover:bg-[#003e99] text-white text-xs font-semibold rounded shadow-sm transition-colors w-full md:w-auto justify-center"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Blog</span>
                      </button>
                    </div>

                    {/* Table */}
                    <div className="border border-slate-200 rounded-lg overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                            <th className="p-3 w-12 text-center">#</th>
                            <th className="p-3">Exam</th>
                            <th className="p-3">Blog Title</th>
                            <th className="p-3">Slug</th>
                            <th className="p-3 text-center">Status</th>
                            <th className="p-3 text-center w-28">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {blogList
                            .filter(b => 
                              b.title.toLowerCase().includes(blogSearchTerm.toLowerCase()) ||
                              b.exam.toLowerCase().includes(blogSearchTerm.toLowerCase()) ||
                              b.slug.toLowerCase().includes(blogSearchTerm.toLowerCase())
                            )
                            .map((blog, idx) => (
                              <tr key={blog.id} className="hover:bg-slate-50/70 transition-colors">
                                <td className="p-3 text-center text-slate-500 font-mono">{idx + 1}</td>
                                <td className="p-3 font-medium text-slate-700">{blog.exam}</td>
                                <td className="p-3 font-semibold text-slate-900 max-w-xs truncate">{blog.title}</td>
                                <td className="p-3 text-slate-500 font-mono text-[11px] max-w-xs truncate">{blog.slug}</td>
                                <td className="p-3 text-center">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                    blog.published !== false ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'
                                  }`}>
                                    {blog.published !== false ? 'Published' : 'Draft'}
                                  </span>
                                </td>
                                <td className="p-3 text-center">
                                  <div className="flex items-center justify-center space-x-1">
                                    <button
                                      type="button"
                                      onClick={() => handleEditBlog(blog)}
                                      title="Edit Blog"
                                      className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteBlog(blog.id)}
                                      title="Delete Blog"
                                      className="p-1 text-rose-600 hover:bg-rose-50 rounded transition-colors"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                    <a
                                      href={`/blog/${blog.slug}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      title="View Post"
                                      className="p-1 text-slate-600 hover:bg-slate-100 rounded transition-colors"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          {blogList.filter(b => 
                              b.title.toLowerCase().includes(blogSearchTerm.toLowerCase()) ||
                              b.exam.toLowerCase().includes(blogSearchTerm.toLowerCase()) ||
                              b.slug.toLowerCase().includes(blogSearchTerm.toLowerCase())
                            ).length === 0 && (
                            <tr>
                              <td colSpan={6} className="p-8 text-center text-slate-500">
                                No blog posts found. Click "Add New Blog" to create one.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination / Item Count footer */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                      <span>
                        Showing 1 to {blogList.length} of {blogList.length} entries
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 11. SEO PAGE MASTER */}
          {activeTab === 'SEO Page' && (
            <div className="space-y-6">
              {/* Header & Breadcrumb */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">SEO Page</h2>
                  <div className="flex items-center space-x-1 text-xs text-slate-500 mt-1">
                    <span className="text-blue-600 font-semibold cursor-pointer" onClick={() => setActiveTab('Dashboard')}>Home</span>
                    <span>/</span>
                    <span>SEO Page</span>
                  </div>
                </div>
              </div>

              {/* Top Card: SEO Page Form */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                {/* Header Banner Tab */}
                <div className="border-b border-slate-200 bg-slate-50/50">
                  <div className="inline-block bg-[#0052cc] text-white px-6 py-2.5 text-xs font-semibold">
                    SEO Page
                  </div>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSaveSeo} className="p-6 space-y-4">
                  {/* Page Name */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-600">
                      Page Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter Page Name"
                      value={seoForm.pageName}
                      onChange={(e) => setSeoForm({ ...seoForm, pageName: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* Page Meta Title */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-600">
                      Page Meta Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Page Meta Title"
                      value={seoForm.metaTitle}
                      onChange={(e) => setSeoForm({ ...seoForm, metaTitle: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* Page Meta Description */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-600">
                      Page Meta Description
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Page Meta Description"
                      value={seoForm.metaDescription}
                      onChange={(e) => setSeoForm({ ...seoForm, metaDescription: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* Update Button */}
                  <div className="pt-2 flex items-center space-x-3">
                    <button
                      type="submit"
                      className="px-5 py-2 border border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-semibold text-xs rounded transition-colors"
                    >
                      Update
                    </button>
                    {seoForm.id && (
                      <button
                        type="button"
                        onClick={() => setSeoForm({ id: null, pageName: '', metaTitle: '', metaDescription: '' })}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Bottom Card: Table View */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-4">
                {/* Search Bar */}
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={seoSearchTerm}
                    onChange={(e) => setSeoSearchTerm(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Table */}
                <div className="border border-slate-200 rounded-lg overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                        <th className="p-3">Page Name</th>
                        <th className="p-3 text-right pr-6">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {seoList
                        .filter(s => s.pageName.toLowerCase().includes(seoSearchTerm.toLowerCase()) || s.metaTitle.toLowerCase().includes(seoSearchTerm.toLowerCase()))
                        .map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="p-3 text-slate-700 font-medium">{item.pageName}</td>
                            <td className="p-3 text-right pr-6">
                              <button
                                type="button"
                                onClick={() => handleEditSeo(item)}
                                title="Edit SEO Details"
                                className="w-7 h-7 inline-flex items-center justify-center rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400 transition-colors"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      {seoList.filter(s => s.pageName.toLowerCase().includes(seoSearchTerm.toLowerCase())).length === 0 && (
                        <tr>
                          <td colSpan={2} className="p-6 text-center text-slate-500">
                            No SEO pages found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 12. SITE NOTIFICATION */}
          {activeTab === 'Site Notification' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Site Notification</h2>
                  <div className="flex items-center space-x-1 text-xs text-slate-500 mt-1">
                    <span className="text-blue-600 font-semibold cursor-pointer" onClick={() => setActiveTab('Dashboard')}>Home</span>
                    <span>/</span>
                    <span>Notification</span>
                    <span>/</span>
                    <span>Site Notification</span>
                  </div>
                </div>
              </div>

              {/* Form Card */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="border-b border-slate-200 bg-slate-50/50">
                  <div className="inline-block bg-[#0052cc] text-white px-6 py-2.5 text-xs font-semibold">
                    Broadcast Site Notification
                  </div>
                </div>
                <form onSubmit={handleSendSiteNotif} className="p-6 space-y-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-600">Notification Title</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter Title"
                      value={siteNotifForm.title}
                      onChange={(e) => setSiteNotifForm({ ...siteNotifForm, title: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-600">Notification Message</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Enter notification message to broadcast..."
                      value={siteNotifForm.message}
                      onChange={(e) => setSiteNotifForm({ ...siteNotifForm, message: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-600">Target Audience</label>
                    <select
                      value={siteNotifForm.target}
                      onChange={(e) => setSiteNotifForm({ ...siteNotifForm, target: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600 flex cursor-pointer"
                    >
                      <option value="All Visitors">All Visitors & Enrolled Students</option>
                      <option value="Registered Users Only">Registered Users Only</option>
                      <option value="Enrolled Course Students">Enrolled Course Students</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0052cc] hover:bg-[#003e99] text-white font-semibold text-xs rounded transition-colors"
                  >
                    Send Site Notification
                  </button>
                </form>
              </div>

              {/* Sent Notifications History */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-4">
                <h3 className="text-xs font-bold text-slate-700 tracking-wider uppercase">Sent Site Notifications</h3>
                <div className="border border-slate-200 rounded-lg overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                        <th className="p-3">#</th>
                        <th className="p-3">Title</th>
                        <th className="p-3">Message</th>
                        <th className="p-3">Target</th>
                        <th className="p-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {siteNotifications.map((notif, idx) => (
                        <tr key={notif.id} className="hover:bg-slate-50/70">
                          <td className="p-3 text-slate-500 font-mono">{idx + 1}</td>
                          <td className="p-3 font-semibold text-slate-900">{notif.title}</td>
                          <td className="p-3 text-slate-600 max-w-md truncate">{notif.message}</td>
                          <td className="p-3 text-slate-700">{notif.target}</td>
                          <td className="p-3 text-slate-500 font-mono text-[11px]">{notif.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 13. STUDENT NOTIFICATION */}
          {activeTab === 'Student Notification' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Student Notification</h2>
                  <div className="flex items-center space-x-1 text-xs text-slate-500 mt-1">
                    <span className="text-blue-600 font-semibold cursor-pointer" onClick={() => setActiveTab('Dashboard')}>Home</span>
                    <span>/</span>
                    <span>Notification</span>
                    <span>/</span>
                    <span>Student Notification</span>
                  </div>
                </div>
              </div>

              {/* Form Card */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="border-b border-slate-200 bg-slate-50/50">
                  <div className="inline-block bg-[#0052cc] text-white px-6 py-2.5 text-xs font-semibold">
                    Send Student Direct Notification
                  </div>
                </div>
                <form onSubmit={handleSendStudentNotif} className="p-6 space-y-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-600">Student Email / ID (Leave blank for all students)</label>
                    <input
                      type="email"
                      placeholder="e.g. student@gmail.com"
                      value={studentNotifForm.studentEmail}
                      onChange={(e) => setStudentNotifForm({ ...studentNotifForm, studentEmail: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-600">Notification Title</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter Notification Title"
                      value={studentNotifForm.title}
                      onChange={(e) => setStudentNotifForm({ ...studentNotifForm, title: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-600">Message Content</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Enter detailed notification content..."
                      value={studentNotifForm.message}
                      onChange={(e) => setStudentNotifForm({ ...studentNotifForm, message: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0052cc] hover:bg-[#003e99] text-white font-semibold text-xs rounded transition-colors"
                  >
                    Send to Student
                  </button>
                </form>
              </div>

              {/* Sent Student Notifications History */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-4">
                <h3 className="text-xs font-bold text-slate-700 tracking-wider uppercase">Sent Student Notifications Log</h3>
                <div className="border border-slate-200 rounded-lg overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                        <th className="p-3">#</th>
                        <th className="p-3">Student Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Title</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Sent At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {studentNotifications.map((notif, idx) => (
                        <tr key={notif.id} className="hover:bg-slate-50/70">
                          <td className="p-3 text-slate-500 font-mono">{idx + 1}</td>
                          <td className="p-3 font-semibold text-slate-900">{notif.studentName}</td>
                          <td className="p-3 text-slate-500 font-mono text-[11px]">{notif.studentEmail}</td>
                          <td className="p-3 text-slate-800 font-medium">{notif.title}</td>
                          <td className="p-3">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {notif.status}
                            </span>
                          </td>
                          <td className="p-3 text-slate-500 font-mono text-[11px]">{notif.sentAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 14. STUDENT INVOICES */}
          {activeTab === 'Student Invoices' && (
            <div className="space-y-6">
              {/* Header & Breadcrumbs */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Invoice List</h2>
                  <div className="flex items-center space-x-1 text-xs text-slate-500 mt-1">
                    <span className="text-blue-600 font-semibold cursor-pointer" onClick={() => setActiveTab('Dashboard')}>Home</span>
                    <span>-</span>
                    <span>Invoice List</span>
                  </div>
                </div>
              </div>

              {/* Main Card */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-6">
                {/* Criteria Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Criteria</label>
                  <div className="relative">
                    <select
                      value={invoiceCriteria}
                      onChange={(e) => setInvoiceCriteria(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600 appearance-none pr-8 cursor-pointer"
                    >
                      <option value="All">All</option>
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Failed">Failed</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-2.5 pointer-events-none" />
                  </div>
                </div>

                {/* Search Bar with Blue Search Button */}
                <div className="flex items-center space-x-0 border border-slate-300 rounded overflow-hidden">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={invoiceSearch}
                    onChange={(e) => setInvoiceSearch(e.target.value)}
                    className="w-full px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  />
                  <button type="button" className="px-4 py-2 bg-[#0052cc] hover:bg-[#003e99] text-white transition-colors flex items-center justify-center">
                    <Search className="w-4 h-4" />
                  </button>
                </div>

                {/* Table */}
                <div className="border-t border-slate-100 pt-4 overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50/70 text-slate-700 font-bold border-b border-slate-200">
                        <th className="p-3">Invoice No</th>
                        <th className="p-3">Invoice Date</th>
                        <th className="p-3">Student Name</th>
                        <th className="p-3">Coupon</th>
                        <th className="p-3">Invoice Amount</th>
                        <th className="p-3">Invoice Status</th>
                        <th className="p-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {invoiceList
                        .filter(inv => invoiceCriteria === 'All' || inv.invoiceStatus === invoiceCriteria)
                        .filter(inv => 
                          inv.invoiceNo.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
                          inv.studentName.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
                          inv.coupon.toLowerCase().includes(invoiceSearch.toLowerCase())
                        )
                        .map((inv) => (
                          <tr key={inv.id} className="hover:bg-slate-50/70">
                            <td className="p-3 font-semibold text-slate-900 font-mono">{inv.invoiceNo}</td>
                            <td className="p-3 text-slate-500 font-mono text-[11px]">{inv.invoiceDate}</td>
                            <td className="p-3 font-medium text-slate-800">{inv.studentName}</td>
                            <td className="p-3 text-slate-500 font-mono text-[11px]">{inv.coupon}</td>
                            <td className="p-3 font-semibold text-slate-900">{inv.invoiceAmount}</td>
                            <td className="p-3">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                inv.invoiceStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                inv.invoiceStatus === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}>
                                {inv.invoiceStatus}
                              </span>
                            </td>
                            <td className="p-3 text-center">
                              <button type="button" title="View Invoice" className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                                <Eye className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer Pagination */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Showing 1 to {invoiceList.length} of {invoiceList.length} entries</span>
                  <div className="flex items-center space-x-1">
                    <button type="button" className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-600 rounded text-xs hover:bg-slate-200">Previous</button>
                    <button type="button" className="px-3 py-1 bg-[#0052cc] text-white font-semibold rounded text-xs">1</button>
                    <button type="button" className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-600 rounded text-xs hover:bg-slate-200">Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 15. STUDENT ATTEMPTED TEST */}
          {activeTab === 'Student Attempted Test' && (
            <div className="space-y-6">
              {/* Header & Breadcrumbs */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Attempted Test</h2>
                  <div className="flex items-center space-x-1 text-xs text-slate-500 mt-1">
                    <span className="text-blue-600 font-semibold cursor-pointer" onClick={() => setActiveTab('Dashboard')}>Home</span>
                    <span>-</span>
                    <span>Attempted Test</span>
                  </div>
                </div>
              </div>

              {/* Main Card */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-4">
                {/* Header row inside card */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-xs font-semibold text-slate-700">Your performances</h3>
                  <div className="relative w-64">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={attemptedTestSearch}
                      onChange={(e) => setAttemptedTestSearch(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 pr-8"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50/70 text-slate-700 font-bold border-b border-slate-200">
                        <th className="p-3">Student Name</th>
                        <th className="p-3">Course Name</th>
                        <th className="p-3">Exam Name</th>
                        <th className="p-3">Marks</th>
                        <th className="p-3">Attempt date</th>
                        <th className="p-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {attemptedTestList
                        .filter(t =>
                          t.studentName.toLowerCase().includes(attemptedTestSearch.toLowerCase()) ||
                          t.courseName.toLowerCase().includes(attemptedTestSearch.toLowerCase()) ||
                          t.examName.toLowerCase().includes(attemptedTestSearch.toLowerCase())
                        )
                        .map((test) => (
                          <tr key={test.id} className="hover:bg-slate-50/70">
                            <td className="p-3 font-semibold text-slate-900">{test.studentName}</td>
                            <td className="p-3 text-slate-700 font-medium">{test.courseName}</td>
                            <td className="p-3 text-slate-700 font-medium">{test.examName}</td>
                            <td className="p-3 font-bold text-blue-600 font-mono">{test.marks}</td>
                            <td className="p-3 text-slate-500 font-mono text-[11px]">{test.attemptDate}</td>
                            <td className="p-3 text-center">
                              <button type="button" title="View Scorecard" className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                                <Eye className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer Pagination */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                  <span>Showing 1 to 10 of 57 entries</span>
                  <div className="flex items-center space-x-1">
                    <button type="button" className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-600 rounded text-xs hover:bg-slate-200">Previous</button>
                    <button type="button" className="px-3 py-1 bg-[#0052cc] text-white font-semibold rounded text-xs">1</button>
                    <button type="button" className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-600 rounded text-xs hover:bg-slate-200">2</button>
                    <button type="button" className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-600 rounded text-xs hover:bg-slate-200">Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 16. STUDENT DOUBTS */}
          {activeTab === 'Student Doubt' && (
            <div className="space-y-6">
              {/* Header & Breadcrumbs */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Doubts</h2>
                  <div className="flex items-center space-x-1 text-xs text-slate-500 mt-1">
                    <span className="text-blue-600 font-semibold cursor-pointer" onClick={() => setActiveTab('Dashboard')}>Home</span>
                    <span>-</span>
                    <span>Doubts</span>
                  </div>
                </div>
              </div>

              {/* Search input */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search doubts by student, topic, or question..."
                    value={doubtSearch}
                    onChange={(e) => setDoubtSearch(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600 pl-8"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                </div>
              </div>

              {/* Doubt cards list matching Screenshot 3 */}
              <div className="space-y-4">
                {doubtList
                  .filter(d => 
                    d.doubtText.toLowerCase().includes(doubtSearch.toLowerCase()) ||
                    d.studentName.toLowerCase().includes(doubtSearch.toLowerCase()) ||
                    d.module.toLowerCase().includes(doubtSearch.toLowerCase())
                  )
                  .map((doubt) => (
                    <div key={doubt.id} className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden space-y-3 p-4">
                      {/* Doubt text */}
                      <p className="text-xs text-slate-800 leading-relaxed font-sans">
                        {doubt.doubtText}
                      </p>

                      {/* View button */}
                      <div>
                        <button
                          type="button"
                          onClick={() => setSelectedDoubt(doubt)}
                          className="px-4 py-1.5 bg-[#0052cc] hover:bg-[#003e99] text-white text-xs font-semibold rounded shadow-xs transition-colors"
                        >
                          VIEW
                        </button>
                      </div>

                      {/* Reply preview if answered */}
                      {doubt.reply && (
                        <div className="bg-blue-50/60 border-l-2 border-blue-600 p-2.5 text-xs text-slate-700 rounded-r">
                          <span className="font-semibold text-blue-700">Answer: </span>
                          {doubt.reply}
                        </div>
                      )}

                      {/* Grey Footer metadata banner matching screenshot */}
                      <div className="bg-slate-100/90 rounded px-3 py-1.5 flex flex-wrap items-center justify-between text-[11px] text-slate-600 gap-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="flex items-center space-x-1">
                            <User className="w-3 h-3 text-slate-400" />
                            <span className="font-medium text-slate-700">{doubt.studentName}</span>
                          </span>
                          <span>|</span>
                          <span className="flex items-center space-x-1">
                            <BookOpen className="w-3 h-3 text-slate-400" />
                            <span>{doubt.module}</span>
                          </span>
                          <span>|</span>
                          <span className="font-mono text-[10px] text-slate-500">{doubt.date}</span>
                        </div>
                        <div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            doubt.status === 'Answered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {doubt.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Reply Modal */}
              {selectedDoubt && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h3 className="font-bold text-slate-900 text-sm">Respond to Doubt</h3>
                      <button type="button" onClick={() => setSelectedDoubt(null)} className="text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs text-slate-800 space-y-1">
                      <p className="font-semibold text-slate-900">{selectedDoubt.studentName}:</p>
                      <p>{selectedDoubt.doubtText}</p>
                    </div>
                    <form onSubmit={handleReplyDoubt} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Your Answer / Resolution</label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Type answer or solution details here..."
                          value={doubtReplyInput}
                          onChange={(e) => setDoubtReplyInput(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                        <button type="button" onClick={() => setSelectedDoubt(null)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded hover:bg-slate-200">
                          Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-[#0052cc] text-white font-semibold text-xs rounded hover:bg-[#003e99]">
                          Submit Answer
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* FALLBACK FOR OTHER TABS */}
          {!['Exam Master', 'Subject Master', 'Chapter Master', 'Chapter Topic Master', 'Objective Question', 'Numerical Question', 'Course Master', 'Video Master', 'Document Master', 'Coupon', 'Blog Master', 'SEO Page', 'Site Notification', 'Student Notification', 'Student Invoices', 'Student Attempted Test', 'Student Doubt', 'Dashboard'].includes(activeTab) && (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">{activeTab} Management</h3>
              <p className="text-slate-500 text-xs">
                Manage settings and data entries for {activeTab}.
              </p>
              <button
                onClick={() => setActiveTab('Dashboard')}
                className="px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-lg"
              >
                Back to Dashboard
              </button>
            </div>
          )}

        </main>

      </div>

      {/* MODAL FOR ADD / EDIT COURSE */}
      {courseModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">
                {courseForm.id ? 'Edit Course' : 'Add New Course'}
              </h3>
              <button onClick={() => setCourseModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Course Title*</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BITSAT 2026 Crash Course"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Price (₹)*</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 14,999"
                  value={courseForm.price}
                  onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setCourseModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1d4ed8] text-white font-semibold text-xs rounded hover:bg-[#1e40af]"
                >
                  {courseForm.id ? 'Update Course' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
