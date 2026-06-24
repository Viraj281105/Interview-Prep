// Database service layer — abstracts Supabase queries with localStorage fallback
import { supabase, isBackendAvailable } from './supabase';

// ──────────────────────────────────────────────
// Helper: run a Supabase query or fall back to localStorage
// ──────────────────────────────────────────────

const localGet = (key, fallback = null) => {
  try {
    const data = localStorage.getItem(`pm3-${key}`);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

const localSet = (key, value) => {
  try {
    localStorage.setItem(`pm3-${key}`, JSON.stringify(value));
  } catch (e) {
    console.warn('localStorage write failed:', e);
  }
};

// ──────────────────────────────────────────────
// User Profile
// ──────────────────────────────────────────────

export async function getUserProfile(userId) {
  if (!isBackendAvailable()) {
    return localGet(`profile-${userId}`, { displayName: 'Guest', xp: 0, level: 1 });
  }
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateUserProfile(userId, updates) {
  if (!isBackendAvailable()) {
    const current = localGet(`profile-${userId}`, {});
    localSet(`profile-${userId}`, { ...current, ...updates });
    return { ...current, ...updates };
  }
  const { data, error } = await supabase
    .from('profiles')
    .upsert({ id: userId, ...updates })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ──────────────────────────────────────────────
// Progress
// ──────────────────────────────────────────────

export async function saveProgress(userId, questionId, subjectId) {
  if (!isBackendAvailable()) {
    const progress = localGet(`progress-${userId}`, []);
    progress.push({ questionId, subjectId, completedAt: new Date().toISOString() });
    localSet(`progress-${userId}`, progress);
    return;
  }
  const { error } = await supabase
    .from('progress')
    .insert({ user_id: userId, question_id: questionId, subject_id: subjectId });
  if (error) throw error;
}

export async function getProgress(userId) {
  if (!isBackendAvailable()) {
    const progress = localGet(`progress-${userId}`, []);
    return progress.map(p => p.questionId);
  }
  const { data, error } = await supabase
    .from('progress')
    .select('question_id')
    .eq('user_id', userId);
  if (error) throw error;
  return data.map(p => p.question_id);
}

// ──────────────────────────────────────────────
// Quiz Attempts
// ──────────────────────────────────────────────

export async function saveQuizAttempt(userId, attemptData) {
  if (!isBackendAvailable()) {
    const attempts = localGet(`quiz-attempts-${userId}`, []);
    attempts.unshift({ ...attemptData, createdAt: new Date().toISOString() });
    localSet(`quiz-attempts-${userId}`, attempts.slice(0, 50));
    return;
  }
  const { error } = await supabase
    .from('quiz_attempts')
    .insert({
      user_id: userId,
      quiz_id: attemptData.quizId,
      score: attemptData.score,
      total: attemptData.total,
      duration: attemptData.duration,
    });
  if (error) throw error;
}

export async function getQuizAttempts(userId) {
  if (!isBackendAvailable()) return localGet(`quiz-attempts-${userId}`, []);
  const { data, error } = await supabase
    .from('quiz_attempts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(50);
  if (error) throw error;
  return data.map(d => ({
    quizId: d.quiz_id,
    score: d.score,
    total: d.total,
    duration: d.duration,
    date: d.created_at
  }));
}

// ──────────────────────────────────────────────
// Mock Interviews
// ──────────────────────────────────────────────

export async function saveMockInterviewResult(userId, interviewData) {
  if (!isBackendAvailable()) {
    const interviews = localGet(`mock-interviews-${userId}`, []);
    interviews.unshift({ ...interviewData, createdAt: new Date().toISOString() });
    localSet(`mock-interviews-${userId}`, interviews.slice(0, 100));
    return;
  }
  const { error } = await supabase
    .from('mock_interviews')
    .insert({
      user_id: userId,
      type: interviewData.type,
      score: interviewData.score,
      feedback: interviewData.feedback,
      duration: interviewData.duration,
    });
  if (error) throw error;
}

export async function getMockInterviews(userId) {
  if (!isBackendAvailable()) return localGet(`mock-interviews-${userId}`, []);
  const { data, error } = await supabase
    .from('mock_interviews')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) throw error;
  return data.map(d => ({
    id: d.id,
    type: d.type,
    score: d.score,
    feedback: d.feedback,
    duration: d.duration,
    date: d.created_at
  }));
}

// ──────────────────────────────────────────────
// Bookmarks
// ──────────────────────────────────────────────

export async function getBookmarks(userId) {
  if (!isBackendAvailable()) {
    return localGet(`bookmarks-${userId}`, []);
  }
  const { data, error } = await supabase
    .from('bookmarks')
    .select('question_id')
    .eq('user_id', userId);
  if (error) throw error;
  return data.map(b => b.question_id);
}

// ──────────────────────────────────────────────
// Notes
// ──────────────────────────────────────────────

export async function saveUserNote(userId, topicId, content) {
  if (!isBackendAvailable()) {
    const notes = localGet(`notes-${userId}`, {});
    notes[topicId] = content;
    localSet(`notes-${userId}`, notes);
    return;
  }
  const { error } = await supabase
    .from('notes')
    .upsert({
      user_id: userId,
      topic_id: topicId,
      content,
      updated_at: new Date().toISOString(),
    });
  if (error) throw error;
}

export async function getNotes(userId) {
  if (!isBackendAvailable()) return localGet(`notes-${userId}`, {});
  const { data, error } = await supabase
    .from('notes')
    .select('topic_id, content')
    .eq('user_id', userId);
  if (error) throw error;
  
  const notesObj = {};
  data.forEach(n => {
    notesObj[n.topic_id] = n.content;
  });
  return notesObj;
}
