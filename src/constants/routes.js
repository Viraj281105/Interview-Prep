// Centralized route definitions
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  SUBJECTS: '/subjects',
  SUBJECT_DETAIL: '/subjects/:id',
  TOPIC: '/topic/:topicId',
  QUIZ: '/quiz',
  QUIZ_ACTIVE: '/quiz/:quizId',
  COMPANIES: '/companies',
  COMPANY_PROFILE: '/companies/:id',
  MOCK: '/mock',
  AI: '/ai',
  LEADERBOARD: '/leaderboard',
  ANALYTICS: '/analytics',
  PREMIUM: '/premium',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  ACHIEVEMENTS: '/achievements',
};

// Navigation links for navbar
export const NAV_LINKS = [
  { name: 'Dashboard', path: ROUTES.DASHBOARD },
  { name: 'Subjects', path: ROUTES.SUBJECTS },
  { name: 'Companies', path: ROUTES.COMPANIES },
  { name: 'Mock Interview', path: ROUTES.MOCK },
  { name: 'Quiz', path: ROUTES.QUIZ },
];

// Mobile-only nav links (includes all destinations)
export const MOBILE_NAV_LINKS = [
  { name: 'Dashboard', path: ROUTES.DASHBOARD },
  { name: 'Subjects', path: ROUTES.SUBJECTS },
  { name: 'Companies', path: ROUTES.COMPANIES },
  { name: 'Mock Interview', path: ROUTES.MOCK },
  { name: 'Quiz', path: ROUTES.QUIZ },
  { name: 'AI Assistant', path: ROUTES.AI },
  { name: 'Leaderboard', path: ROUTES.LEADERBOARD },
  { name: 'Profile', path: ROUTES.PROFILE },
  { name: 'Settings', path: ROUTES.SETTINGS },
];
