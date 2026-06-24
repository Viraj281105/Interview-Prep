import { supabase, isBackendAvailable } from './supabase';

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

/**
 * Logs a specific user action into the user_history table.
 * @param {string} userId
 * @param {string} actionType - e.g., 'topic_viewed', 'quiz_completed', 'mock_taken'
 * @param {object} metadata - any relevant details like { topicId: 'sql-joins' }
 */
export async function logAction(userId, actionType, metadata = {}) {
  if (!userId) return;
  if (!isBackendAvailable()) {
    const history = localGet(`history-${userId}`, []);
    history.unshift({ action_type: actionType, metadata, created_at: new Date().toISOString() });
    localSet(`history-${userId}`, history.slice(0, 100)); // Keep last 100
    return;
  }
  
  try {
    await supabase.from('user_history').insert({
      user_id: userId,
      action_type: actionType,
      metadata: metadata
    });
  } catch (e) {
    console.error('Failed to log action:', e);
  }
}

export async function getUserHistory(userId) {
  if (!userId) return [];
  if (!isBackendAvailable()) return localGet(`history-${userId}`, []);

  const { data, error } = await supabase
    .from('user_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
}

/**
 * Starts a study session.
 * @returns {string} sessionId
 */
export async function startStudySession(userId, focusAreas = []) {
  if (!userId) return null;
  if (!isBackendAvailable()) {
    const session = { id: Date.now().toString(), user_id: userId, start_time: new Date().toISOString(), focus_areas: focusAreas };
    localSet(`active-session-${userId}`, session);
    return session.id;
  }

  try {
    const { data, error } = await supabase.from('study_sessions').insert({
      user_id: userId,
      focus_areas: focusAreas,
      start_time: new Date().toISOString()
    }).select().single();
    
    if (error) throw error;
    return data.id;
  } catch (e) {
    console.error('Failed to start study session:', e);
    return null;
  }
}

/**
 * Ends an active study session.
 */
export async function endStudySession(sessionId, durationMinutes) {
  if (!sessionId) return;
  if (!isBackendAvailable()) {
    return; // Simplified for local
  }

  try {
    await supabase.from('study_sessions').update({
      end_time: new Date().toISOString(),
      duration_minutes: durationMinutes
    }).eq('id', sessionId);
  } catch (e) {
    console.error('Failed to end study session:', e);
  }
}

/**
 * Get recent study sessions for analytics
 */
export async function getStudySessions(userId) {
  if (!userId) return [];
  if (!isBackendAvailable()) return [];

  const { data, error } = await supabase
    .from('study_sessions')
    .select('*')
    .eq('user_id', userId)
    .not('end_time', 'is', null)
    .order('start_time', { ascending: false })
    .limit(50);
    
  if (error) throw error;
  return data;
}
