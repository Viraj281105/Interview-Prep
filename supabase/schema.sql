-- ============================================
-- PrepMaster 3.0 — Supabase Database Schema
-- ============================================
-- Run this in the Supabase SQL Editor to set up all tables.
-- Requires Supabase Auth to be enabled.

-- ──────────────────────────────────────────
-- 1. Profiles (extends auth.users)
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT DEFAULT '',
  phone_number TEXT,
  dob DATE,
  city TEXT,
  country TEXT,
  college_name TEXT,
  degree TEXT,
  branch TEXT,
  year_of_study INTEGER,
  current_semester INTEGER,
  cgpa NUMERIC(4,2),
  tenth_percentage NUMERIC(5,2),
  twelfth_percentage NUMERIC(5,2),
  graduation_year INTEGER,
  target_role TEXT DEFAULT 'Software Engineer',
  target_companies TEXT[] DEFAULT '{}',
  primary_stack TEXT[] DEFAULT '{}',
  preferred_domains TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  settings JSONB DEFAULT '{}',
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_active_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', NULL)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ──────────────────────────────────────────
-- 2. Core Data: Subjects, Topics, Questions
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.subjects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  color TEXT,
  bg TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.topics (
  id TEXT PRIMARY KEY,
  subject_id TEXT REFERENCES public.subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_topics_subject ON public.topics(subject_id);

CREATE TABLE IF NOT EXISTS public.questions (
  id TEXT PRIMARY KEY,
  topic_id TEXT REFERENCES public.topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  difficulty TEXT,
  company_tags TEXT[] DEFAULT '{}',
  content TEXT,
  solution TEXT,
  hints TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_questions_topic ON public.questions(topic_id);

-- ──────────────────────────────────────────
-- 3. Companies & Daily Challenges
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT,
  difficulty TEXT,
  color TEXT,
  tags TEXT[] DEFAULT '{}',
  description TEXT,
  experience_count INTEGER DEFAULT 0,
  hiring_process JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.daily_challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  question_id TEXT REFERENCES public.questions(id) ON DELETE CASCADE,
  xp_reward INTEGER DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ──────────────────────────────────────────
-- 4. Progress (completed questions)
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  question_id TEXT NOT NULL,
  subject_id TEXT,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

CREATE INDEX IF NOT EXISTS idx_progress_user ON public.progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_subject ON public.progress(subject_id);

-- ──────────────────────────────────────────
-- 3. Bookmarks
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  question_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON public.bookmarks(user_id);

-- ──────────────────────────────────────────
-- 4. Notes
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  topic_id TEXT NOT NULL,
  content TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, topic_id)
);

CREATE INDEX IF NOT EXISTS idx_notes_user ON public.notes(user_id);

-- ──────────────────────────────────────────
-- 5. Quiz Attempts
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  quiz_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  duration INTEGER, -- seconds
  answers JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_user ON public.quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_date ON public.quiz_attempts(created_at DESC);

-- ──────────────────────────────────────────
-- 6. Mock Interviews
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.mock_interviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL, -- 'behavioral', 'dsa', 'system-design', etc.
  mode TEXT, -- 'technical', 'role-based', 'behavioral'
  company_id TEXT, -- optional company-specific mock
  score INTEGER,
  feedback TEXT,
  duration INTEGER, -- seconds
  questions_answered JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mock_user ON public.mock_interviews(user_id);
CREATE INDEX IF NOT EXISTS idx_mock_date ON public.mock_interviews(created_at DESC);

-- ──────────────────────────────────────────
-- 7. Achievements
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_key TEXT NOT NULL,
  label TEXT NOT NULL,
  description TEXT,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_key)
);

CREATE INDEX IF NOT EXISTS idx_achievements_user ON public.achievements(user_id);

-- ──────────────────────────────────────────
-- 8. Activity Heatmap
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
  xp_earned INTEGER DEFAULT 0,
  questions_completed INTEGER DEFAULT 0,
  quizzes_taken INTEGER DEFAULT 0,
  mocks_taken INTEGER DEFAULT 0,
  UNIQUE(user_id, activity_date)
);

CREATE INDEX IF NOT EXISTS idx_activity_user_date ON public.activity_log(user_id, activity_date DESC);

-- ──────────────────────────────────────────
-- 9. Analytics / Stats Snapshot
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  subject_id TEXT NOT NULL,
  total_questions INTEGER DEFAULT 0,
  completed_questions INTEGER DEFAULT 0,
  avg_quiz_score NUMERIC(5,2) DEFAULT 0,
  last_activity TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, subject_id)
);

CREATE INDEX IF NOT EXISTS idx_analytics_user ON public.analytics(user_id);

-- ──────────────────────────────────────────
-- 10. User Projects
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  project_name TEXT NOT NULL,
  description TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  github_link TEXT,
  live_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_user_projects_user ON public.user_projects(user_id);

-- ──────────────────────────────────────────
-- 11. User Experience
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT DEFAULT 'Internship', -- 'Internship', 'Full-time', 'Part-time'
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  duration TEXT,
  responsibilities TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_user_experience_user ON public.user_experience(user_id);

-- ──────────────────────────────────────────
-- 12. User Certifications
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_certifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date DATE,
  credential_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_user_certifications_user ON public.user_certifications(user_id);

-- ──────────────────────────────────────────
-- 13. User Resumes
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_user_resumes_user ON public.user_resumes(user_id);

-- ──────────────────────────────────────────
-- 14. User History Engine (Phase 3)
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  action_type TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_user_history_user ON public.user_history(user_id);

CREATE TABLE IF NOT EXISTS public.study_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  start_time TIMESTAMPTZ DEFAULT NOW(),
  end_time TIMESTAMPTZ,
  duration_minutes INTEGER DEFAULT 0,
  focus_areas TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_study_sessions_user ON public.study_sessions(user_id);

CREATE TABLE IF NOT EXISTS public.recommendation_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  recommendation_type TEXT,
  recommendation_target TEXT,
  reason TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_recommendation_logs_user ON public.recommendation_logs(user_id);

-- ──────────────────────────────────────────
-- 15. User Achievements (External)
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON public.user_achievements(user_id);

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================
-- Enable RLS on all tables

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendation_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Core Data: Public Read Access
CREATE POLICY "Public read subjects" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Public read topics" ON public.topics FOR SELECT USING (true);
CREATE POLICY "Public read questions" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Public read companies" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Public read daily_challenges" ON public.daily_challenges FOR SELECT USING (true);


-- Progress: users can manage their own progress
CREATE POLICY "Users can manage own progress" ON public.progress
  FOR ALL USING (auth.uid() = user_id);

-- Bookmarks: users can manage their own bookmarks
CREATE POLICY "Users can manage own bookmarks" ON public.bookmarks
  FOR ALL USING (auth.uid() = user_id);

-- Notes: users can manage their own notes
CREATE POLICY "Users can manage own notes" ON public.notes
  FOR ALL USING (auth.uid() = user_id);

-- Quiz attempts: users can manage their own attempts
CREATE POLICY "Users can manage own quiz attempts" ON public.quiz_attempts
  FOR ALL USING (auth.uid() = user_id);

-- Mock interviews: users can manage their own interviews
CREATE POLICY "Users can manage own mock interviews" ON public.mock_interviews
  FOR ALL USING (auth.uid() = user_id);

-- Achievements: users can manage their own achievements
CREATE POLICY "Users can manage own achievements" ON public.achievements
  FOR ALL USING (auth.uid() = user_id);

-- Activity log: users can manage their own activity
CREATE POLICY "Users can manage own activity log" ON public.activity_log
  FOR ALL USING (auth.uid() = user_id);

-- Analytics: users can manage their own analytics
CREATE POLICY "Users can manage own analytics" ON public.analytics
  FOR ALL USING (auth.uid() = user_id);

-- User Profiles data: users can manage their own
CREATE POLICY "Users can manage own projects" ON public.user_projects FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own experience" ON public.user_experience FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own certifications" ON public.user_certifications FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own resumes" ON public.user_resumes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own external achievements" ON public.user_achievements FOR ALL USING (auth.uid() = user_id);

-- User History Engine: users can manage their own
CREATE POLICY "Users can manage own history" ON public.user_history FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own study sessions" ON public.study_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own recommendation logs" ON public.recommendation_logs FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- Updated_at trigger for profiles
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
