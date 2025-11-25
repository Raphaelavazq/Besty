-- ============================================
-- B1 Bestie Database Schema for Supabase
-- Created: 23 November 2025
-- ============================================

-- 1. PROFILES TABLE (User information)
-- Links to Supabase auth.users, stores additional B1 Bestie data
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  bundesland TEXT NOT NULL, -- CRITICAL: Determines which state-specific questions appear in exam
  native_language TEXT DEFAULT 'de',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only see and edit their own profile
CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- ============================================

-- 2. QUESTION PROGRESS TABLE (Tracks all 460 Einbürgerungstest questions per user)
-- Supports confidence ratings and spaced repetition algorithm
CREATE TABLE IF NOT EXISTS public.question_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL, -- 1-460 (BAMF question IDs from questions.json)
  
  -- Confidence rating system (😊 Easy, 🤔 Medium, 😓 Hard)
  confidence_level TEXT DEFAULT 'new' CHECK (confidence_level IN ('new', 'easy', 'medium', 'hard')),
  marked_for_review BOOLEAN DEFAULT false,
  
  -- Statistics
  times_seen INTEGER DEFAULT 0,
  times_correct INTEGER DEFAULT 0,
  times_wrong INTEGER DEFAULT 0,
  
  -- Spaced repetition (for future review scheduling)
  next_review_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  review_interval_days INTEGER DEFAULT 1,
  
  -- Timestamps
  last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Each user can only have one progress record per question
  UNIQUE(user_id, question_id)
);

-- Enable Row Level Security
ALTER TABLE public.question_progress ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only access their own progress
CREATE POLICY "Users can view own progress" 
  ON public.question_progress FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" 
  ON public.question_progress FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" 
  ON public.question_progress FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own progress" 
  ON public.question_progress FOR DELETE 
  USING (auth.uid() = user_id);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_question_progress_user_id ON public.question_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_question_progress_confidence ON public.question_progress(user_id, confidence_level);
CREATE INDEX IF NOT EXISTS idx_question_progress_review_date ON public.question_progress(user_id, next_review_date);
CREATE INDEX IF NOT EXISTS idx_question_progress_marked ON public.question_progress(user_id, marked_for_review) WHERE marked_for_review = true;

-- ============================================

-- 3. EXAM SIMULATIONS TABLE (33-question practice exams)
-- Stores complete exam results with all questions and answers
CREATE TABLE IF NOT EXISTS public.exam_simulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Results
  score INTEGER NOT NULL, -- 0-33
  passed BOOLEAN NOT NULL, -- true if score >= 17 (51%)
  
  -- Timing
  time_taken_seconds INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Detailed data stored as JSON
  questions_data JSONB, -- All 33 questions with answers, confidence ratings, and user selections
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.exam_simulations ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own simulations" 
  ON public.exam_simulations FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own simulations" 
  ON public.exam_simulations FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own simulations" 
  ON public.exam_simulations FOR DELETE 
  USING (auth.uid() = user_id);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_exam_simulations_user_id ON public.exam_simulations(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_simulations_completed_at ON public.exam_simulations(user_id, completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_exam_simulations_passed ON public.exam_simulations(user_id, passed);

-- ============================================

-- 4. STUDY SESSIONS TABLE (General activity tracking)
-- Tracks study time across all B1 Bestie features
CREATE TABLE IF NOT EXISTS public.study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Session details
  session_type TEXT NOT NULL, -- 'fragenkatalog', 'hoeren', 'lesen', 'schreiben', 'sprechen', 'probetest'
  questions_studied INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  duration_seconds INTEGER,
  
  -- Timestamps
  session_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own sessions" 
  ON public.study_sessions FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" 
  ON public.study_sessions FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_study_sessions_user_id ON public.study_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_study_sessions_date ON public.study_sessions(user_id, session_date DESC);
CREATE INDEX IF NOT EXISTS idx_study_sessions_type ON public.study_sessions(user_id, session_type);

-- ============================================
-- END OF SCHEMA
-- ============================================

-- Verification queries (run these after to verify tables were created):
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
-- SELECT * FROM public.profiles LIMIT 1;
-- SELECT * FROM public.question_progress LIMIT 1;
-- SELECT * FROM public.exam_simulations LIMIT 1;
-- SELECT * FROM public.study_sessions LIMIT 1;
