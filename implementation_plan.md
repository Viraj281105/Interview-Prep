# Interview Preparation Platform Upgrade Plan

This plan outlines the systematic transformation of your static Interview Prep portal into a modern, scalable, interactive Next.js/React application powered by Firebase/Supabase. We will tackle the execution in 7 distinct phases, prioritizing the MVP first.

## User Review Required

> [!IMPORTANT]
> **Database & Backend Choice**: The existing stack is Vite + React. To support backend features securely (especially AI and user progress), we should integrate **Firebase** (Firestore + Auth) as it works seamlessly with React and allows rapid iteration. If you prefer Supabase or a custom Node.js/FastAPI backend, please specify. I'll use Firebase in the plan.
> 
> **Routing**: Since you already have a Vite app, we can stick to React Router for Single Page App (SPA) architecture, or migrate to Next.js for SSR/SEO benefits. Staying with Vite is faster to implement the MVP. The plan below assumes we stick to your current Vite + React stack but heavily refactor for production scale. If you strictly want Next.js, let me know!

## Phase 1: Foundation Upgrade (MVP Core)

Goal: Build the base platform, modern UI, routing, and user dashboard.

**Folder Structure**:
```text
src/
├── components/
│   ├── layout/ (Navbar, Sidebar, Footer, Layout)
│   ├── ui/ (Button, Card, Input, Modal - reusable Tailwind components)
│   └── dashboard/ (StatsCard, ProgressChart, StreakBadge)
├── pages/
│   ├── Home.jsx (Landing Page)
│   ├── Dashboard.jsx
│   ├── Subjects.jsx
│   ├── SubjectDetail.jsx
│   ├── Profile.jsx
│   └── Settings.jsx
├── context/ (ThemeContext, AuthContext)
├── services/ (firebase.js, auth.js)
└── utils/ (theme.js, constants.js)
```

**Components Required**:
- `Navbar` (Sticky, responsive, theme toggle)
- `HeroSection` (Landing page intro with CTA)
- `SubjectCard` (Visual card for DSA, OOP, etc.)
- `ProgressBar`, `ThemeToggle`, `GlobalSearch`

**Database Models (Firestore Collections)**:
- `Users`: `{ uid, email, displayName, photoURL, createdAt, themePreferences }`
- `UserStats`: `{ uid, topicsCompleted, questionsSolved, mockScoreAverage, currentStreak, lastActive }`

**API Endpoints / DB Queries**:
- `GET /users/{uid}`: Fetch user profile
- `GET /userStats/{uid}`: Fetch dashboard metrics
- `POST /users/auth`: Login/Register

**Implementation Steps**:
1. Setup Firebase Auth & Firestore.
2. Setup React Router with protected and public routes.
3. Implement `ThemeContext` for robust Dark/Light mode using Tailwind's `dark:` classes.
4. Build the Home (Landing) page with Framer Motion animations.
5. Build the Dashboard and Subject listing pages.

---

## Phase 2: Interactive Learning

Goal: Transition from static reading to active practice (Flashcards, Quizzes, Revision).

**Folder Structure**:
```text
src/
├── components/
│   ├── practice/ (Flashcard, FlashcardDeck, QuizEngine, QuestionBank)
├── pages/
│   └── PracticeArea.jsx
```

**Components Required**:
- `Flashcard` (Framer motion flip animation)
- `QuizModal` (Timer, Options, Score summary)
- `QuestionFilterBar` (Filter by Company, Difficulty, Topic)
- `RevisionScheduler` (1/3/7 day plan generator)

**Database Models**:
- `Questions`: `{ id, category, type (MCQ, Short), difficulty, text, options, answer, explanation, companyTags }`
- `UserProgress`: `{ uid, questionId, status (solved, failed), lastAttempted }`

**API Endpoints / DB Queries**:
- `GET /questions?category=X&difficulty=Y`: Fetch questions
- `PUT /userProgress/{uid}_{qId}`: Update question status

**Implementation Steps**:
1. Ingest existing data (DSA, SQL, DBMS notes) into the `Questions` collection.
2. Build the `FlashcardDeck` with intuitive swiping/flipping.
3. Build the `QuizEngine` handling MCQ, Multi-select, and Short Answer.
4. Create the revision scheduling logic based on user history.

---

## Phase 3: Company Specific Prep

Goal: Company-focused interview prep with real experiences.

**Folder Structure**:
```text
src/
├── pages/
│   ├── CompaniesList.jsx
│   └── CompanyProfile.jsx
├── components/
│   └── companies/ (CompanyCard, InterviewExperienceList, SubmitExperienceForm)
```

**Components Required**:
- `CompanyCard` (Logo, name, difficulty badge)
- `ExperienceAccordion` (Round-by-round breakdown)
- `SubmissionForm` (For users to add their experiences)

**Database Models**:
- `Companies`: `{ id, name, logo, tags, avgDifficulty }`
- `InterviewExperiences`: `{ id, companyId, uid, role, rounds: [], questionsAsked, outcome, timestamp }`

**API Endpoints / DB Queries**:
- `GET /companies`: List all companies
- `GET /interviewExperiences?companyId=X`: Fetch reports for a company
- `POST /interviewExperiences`: Submit a new report

**Implementation Steps**:
1. Create the companies directory page.
2. Build the company detail view showcasing the hiring process and standard OA rounds.
3. Implement the Interview Experience submission form.

---

## Phase 4: Mock Interview Engine

Goal: Simulate real timed technical and HR interviews.

**Folder Structure**:
```text
src/
├── pages/
│   └── MockInterviewSession.jsx
├── components/
│   └── mock/ (MockSetup, ActiveInterview, PostInterviewReport)
```

**Components Required**:
- `MockSetupModal` (Select topics, duration, difficulty)
- `TimerComponent` (Countdown)
- `ResultDashboard` (Charts for Accuracy, Confidence)

**Database Models**:
- `MockSessions`: `{ id, uid, topics, difficulty, startTime, endTime, questions: [], finalScore }`

**API Endpoints / DB Queries**:
- `POST /mockSessions/generate`: Create a random set of questions based on parameters
- `PUT /mockSessions/{id}/submit`: Calculate and save final score

**Implementation Steps**:
1. Build the random question generator logic to mix topics (e.g., 5 SQL + 3 OOP + 2 HR).
2. Build the active session UI (full screen, distraction-free).
3. Implement the scoring and evaluation logic.

---

## Phase 5: AI Features (The "Insane" Phase)

Goal: AI-powered feedback, resume analysis, and custom roadmaps.

**Folder Structure**:
```text
src/
├── services/
│   └── aiService.js (Handles calls to OpenAI/Gemini)
├── components/
│   └── ai/ (AIChat, ResumeUploader, RoadmapVisualizer)
```

**Components Required**:
- `ChatInterface` (For AI Interviewer)
- `FileUploader` (For resumes)
- `RoadmapTimeline` (Visual 30-day plan)

**Database Models**:
- `Roadmaps`: `{ id, uid, targetCompany, timeframe, dailyPlan: [] }`

**API Endpoints (Requires a secure backend, e.g., Firebase Cloud Functions)**:
- `POST /api/ai/evaluate-answer`: Send user text to LLM, return score/feedback
- `POST /api/ai/analyze-resume`: Extract text from PDF, return ATS score
- `POST /api/ai/generate-roadmap`: Generate personalized prep schedule

**Implementation Steps**:
1. Setup a Node.js/Firebase Cloud Function to safely interact with LLM APIs (never expose keys in frontend).
2. Build the AI Answer Evaluator (integrate into Phase 2/4).
3. Implement PDF parsing for the AI Resume Analyzer.
4. Generate custom roadmaps and save them to the user's dashboard.

---

## Phase 6 & 7: Advanced & Premium Features

**Features included**:
- Daily Challenges & Global Leaderboard.
- Personal Notes System (WYSIWYG editor).
- Stripe Integration for Premium (Paid mocks, mentorship).
- Heatmap / Activity Calendar (GitHub-style contribution graph).

**Implementation Steps**:
- Add `DailyChallenge` fetching logic (rotates every 24h).
- Implement `react-activity-calendar` or similar for heatmaps.
- Integrate Stripe Checkout for premium subscriptions.
- Add Offline mode (PWA via Vite-PWA plugin).

---

## Next Steps

1. **Review this plan**: Does the technology stack (Vite + Firebase) and architecture look good to you?
2. **Approval**: Once you approve, I will begin executing **Phase 1** (Setting up folder structures, Firebase configuration, modern layouts, and the Dashboard).
