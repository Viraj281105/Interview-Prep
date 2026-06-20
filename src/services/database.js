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
