# 🚀 PrepMaster 3.0: The Intelligent Interview Coach

> Master Technical Interviews with Structured Learning, Mock Interviews, and AI-Powered Personalization.

PrepMaster 3.0 is a modern, AI-powered interview preparation platform designed to help students and software engineering aspirants prepare smarter for technical interviews, placements, and internships. 

Moving beyond generic learning platforms, PrepMaster 3.0 acts as a **Personalized Interview Coach**, using dynamic recommendation engines, advanced user history tracking, and AI-driven insights to tailor the experience to your specific career goals.

---

## 🌟 Vision

Interview preparation is often messy and overwhelming. Students usually switch between scattered notes, random YouTube videos, coding platforms, interview experiences, and last-minute revision sheets.

PrepMaster solves that problem by bringing everything into one place. 

The goal is simple: **Prepare smarter. Revise better. Perform confidently.**

---

## ✨ Features

### 🤖 Intelligent Personalization Engine
- **AI Coach Insights**: Get real-time, personalized feedback on your learning trajectory based on your history and mock interview scores.
- **Smart Recommendations**: Dynamic suggestions for your next topic, quiz, or mock interview based on your career goals (e.g., Frontend, Backend, Data Science) and recent activity.
- **Advanced User History**: Every quiz taken, topic read, and mock interview completed is tracked and analyzed to build your unique learning profile.

### 📚 Structured Subject Learning
Comprehensive preparation across all major interview subjects:
- Data Structures & Algorithms (DSA)
- SQL & Database Management Systems (DBMS)
- Object Oriented Programming (OOP)
- Operating Systems (OS) & Computer Networks (CN)
- HR / Behavioral Interviews
- System Design

### 📊 Profile System 2.0 & Analytics
Track your preparation journey with a premium, robust dashboard.
- **Rich User Profiles**: Manage your career goals, technical skills, academic details, professional experience, certifications, and project portfolio.
- **Resume Management**: Upload and manage multiple tailored resumes.
- **Prep Analytics**: Topic completion percentage, streak tracking, radar charts for subject mastery, and mock performance trend lines.
- **Full Persistence**: Powered by Supabase for real-time data sync and secure authentication.

### 🧠 Interactive Learning & Mock Engine
- **Flashcards & Quizzes**: Active recall and spaced repetition built-in.
- **Mock Interview Engine**: Simulate real interview rounds (Behavioral, DSA, System Design) under pressure with a local webcam interface and a built-in code editor.
- **AI Evaluator**: Receive instant, actionable feedback and scores on your mock interview performance, complete with strength/weakness analysis and ideal answer frameworks.

---

## 🏗️ Architecture & Tech Stack

**Frontend Architecture**:
- **Framework**: React 18 & Vite
- **Styling**: Tailwind CSS & Framer Motion for rich, glassmorphic UI and fluid animations.
- **State Management**: Zustand for global application state (offline-first architecture).
- **Data Visualization**: Recharts for dynamic performance graphs.

**Backend & Data Layer**:
- **Database**: Supabase (PostgreSQL) with advanced Row Level Security (RLS).
- **Authentication**: Supabase Auth (Email/Password, OAuth).
- **Storage**: Supabase Storage for resume and asset management.

**AI Layer**:
- **Intelligence**: Integrated with LLMs (Groq API / Llama 3) for real-time interview evaluation and dynamic roadmap generation.
- **Local Fallbacks**: Advanced heuristics ensure the platform works even when APIs are offline.

---

## ⚡ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Viraj281105/Interview-Prep.git
   cd Interview-Prep
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Supabase and Groq credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GROQ_API_KEY=your_groq_api_key
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

---

## 🎨 Design Philosophy

PrepMaster is built with a premium, modern design language focused on usability and engagement:
- **Glassmorphism**: Elegant translucent panels over vibrant gradients.
- **Micro-interactions**: Every click and hover provides satisfying, physics-based feedback using Framer Motion.
- **Dark Mode First**: A sleek, high-contrast dark mode tailored for long coding and reading sessions, with full light mode support.

---

## 👨‍💻 Author

**Viraj Jadhao**
Computer Engineering Student | AI/ML Enthusiast | Full Stack Developer
- Interested in AI Systems, Full Stack Development, and Product Design.

## ⭐ Support

If you found this project useful:
- Star this repository
- Share it with others
- Open PRs to contribute!

> Built to help students prepare smarter, perform better, and crack interviews with confidence.
