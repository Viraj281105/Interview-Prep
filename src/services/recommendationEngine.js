import { getUserHistory } from './historyService';
import { getUserProfile } from './database';
import { useAppStore } from '../store';

export const RECO_TYPES = {
  CONTINUE: 'CONTINUE',
  PRACTICE: 'PRACTICE',
  NEW_TOPIC: 'NEW_TOPIC',
  MOCK: 'MOCK',
  WEAK_AREA: 'WEAK_AREA'
};

export async function generateRecommendations(userId, completedQuestions = []) {
  if (!userId) return getDynamicDefaults();

  try {
    const history = await getUserHistory(userId);
    const profile = await getUserProfile(userId);
    const storeState = useAppStore.getState();
    const quizScores = storeState.quizScores || {};
    const allTopics = storeState.topics || [];

    if (!allTopics.length) {
       return []; // Data not loaded yet
    }

    if (!history || history.length === 0) {
      return getProfileBasedDefaults(profile, allTopics);
    }

    const recos = [];
    const usedIds = new Set();

    // 1. WEAK AREAS: Find subjects where quiz score is low (< 70%)
    const weakQuizzes = Object.entries(quizScores)
      .map(([id, data]) => ({ id, percent: (data.score / data.total) * 100, subject: data.subject }))
      .filter(q => q.percent < 70)
      .sort((a, b) => a.percent - b.percent);

    if (weakQuizzes.length > 0) {
      const weak = weakQuizzes[0];
      recos.push({
        type: RECO_TYPES.WEAK_AREA,
        id: `weak-${weak.id}`,
        title: `Review: ${weak.subject || 'Weak Topic'}`,
        description: `Your last quiz score was ${Math.round(weak.percent)}%. Review the material to improve!`,
        icon: '📈',
        link: `/topic/${weak.id.replace('quiz-', '')}`, // Best effort mapping
        priority: 10
      });
      usedIds.add(`weak-${weak.id}`);
    }

    // 2. CONTINUE: Find most recently viewed topic
    const recentTopicViews = history.filter(h => h.action_type === 'topic_viewed');
    if (recentTopicViews.length > 0) {
      for (const view of recentTopicViews) {
        const topicId = view.metadata?.topicId;
        if (!topicId || usedIds.has(topicId)) continue;
        
        const module = allTopics.find(m => m.id === topicId);
        if (!module) continue;

        recos.push({
          type: RECO_TYPES.CONTINUE,
          id: module.id,
          title: `Continue: ${module.title}`,
          description: `Pick up where you left off. Review your notes and practice questions.`,
          icon: module.icon || '📚',
          link: `/topic/${module.id}`,
          priority: 9
        });
        usedIds.add(topicId);
        break; 
      }
    }

    // 3. PRACTICE: Recommend taking a quiz on a recent topic
    const recentTopics = [...new Set(recentTopicViews.map(v => v.metadata?.topicId).filter(Boolean))];
    if (recentTopics.length > 0) {
      const topicToTest = recentTopics[0];
      const mod = allTopics.find(m => m.id === topicToTest);
      if (mod && !usedIds.has(`practice-${topicToTest}`)) {
        recos.push({
          type: RECO_TYPES.PRACTICE,
          id: `practice-${topicToTest}`,
          title: `Quiz: ${mod.title}`,
          description: `Test your knowledge on recently studied topics.`,
          icon: '⚡',
          link: `/quiz`, // Directs them to the Quiz Engine to configure
          priority: 8
        });
        usedIds.add(`practice-${topicToTest}`);
      }
    }

    // 4. MOCK INTERVIEW
    const recentMocks = history.filter(h => h.action_type === 'mock_taken');
    if (recentMocks.length === 0 || (recentMocks[0] && recentMocks[0].metadata?.score < 70)) {
      const mockType = recentMocks.length > 0 ? recentMocks[0].metadata?.type : 'dsa';
      if (!usedIds.has('mock_reco')) {
        recos.push({
          type: RECO_TYPES.MOCK,
          id: 'mock_reco',
          title: `Mock Interview: ${mockType.toUpperCase()}`,
          description: recentMocks.length === 0 ? "You haven't tried a mock interview yet. See where you stand!" : "Your last score was below 70. Try again to improve.",
          icon: '🎥',
          link: `/mock`,
          priority: 7
        });
        usedIds.add('mock_reco');
      }
    }

    // 5. NEW TOPIC (Fill to 3 items)
    if (recos.length < 3) {
      const primaryStack = profile?.primary_stack || [];
      const suggestedModules = allTopics.filter(m => !usedIds.has(m.id) && primaryStack.some(tech => m.title.toLowerCase().includes(tech.toLowerCase())));
      
      for (const mod of suggestedModules) {
        if (recos.length >= 3) break;
        recos.push({
          type: RECO_TYPES.NEW_TOPIC,
          id: mod.id,
          title: `Learn: ${mod.title}`,
          description: `Based on your tech stack: ${primaryStack.join(', ')}`,
          icon: mod.icon || '🌟',
          link: `/topic/${mod.id}`,
          priority: 5
        });
        usedIds.add(mod.id);
      }
    }

    if (recos.length < 3) {
      const fallbackDefaults = getDynamicDefaults(allTopics);
      for (const def of fallbackDefaults) {
        if (recos.length >= 3) break;
        if (!usedIds.has(def.id)) {
          recos.push(def);
          usedIds.add(def.id);
        }
      }
    }

    return recos.sort((a, b) => b.priority - a.priority).slice(0, 3);
  } catch (e) {
    console.error('Recommendation engine error:', e);
    return getDynamicDefaults();
  }
}

function getDynamicDefaults(allTopics = []) {
  if (allTopics.length === 0) {
     allTopics = useAppStore.getState().topics || [];
  }
  
  const defaults = [];
  
  // Safe fallback if topics haven't loaded yet
  const firstTopic = allTopics.length > 0 ? allTopics[0] : { id: 'dsa-arrays', title: 'Arrays', icon: '📊' };
  
  defaults.push({
    type: RECO_TYPES.NEW_TOPIC,
    id: firstTopic.id,
    title: `Master ${firstTopic.title}`,
    description: 'A fundamental topic that appears in most interviews.',
    icon: firstTopic.icon || '📊',
    link: `/topic/${firstTopic.id}`,
    priority: 1
  });

  defaults.push({
    type: RECO_TYPES.MOCK,
    id: 'mock_dsa',
    title: 'DSA Mock Interview',
    description: 'Test your algorithmic skills under pressure.',
    icon: '🎥',
    link: '/mock',
    priority: 1
  });

  defaults.push({
    type: RECO_TYPES.PRACTICE,
    id: 'quiz-random',
    title: 'Take a Random Quiz',
    description: 'Quick assessment across various topics.',
    icon: '📝',
    link: '/quiz',
    priority: 1
  });

  return defaults;
}

function getProfileBasedDefaults(profile, allTopics) {
  const defaults = getDynamicDefaults(allTopics);
  
  if (profile?.primary_stack && profile.primary_stack.length > 0 && allTopics.length > 0) {
    const mainTech = profile.primary_stack[0];
    const match = allTopics.find(t => t.title.toLowerCase().includes(mainTech.toLowerCase()));
    
    if (match) {
      defaults[0] = {
        type: RECO_TYPES.NEW_TOPIC,
        id: match.id,
        title: `${match.title} Deep Dive`,
        description: `Master ${mainTech} for your upcoming interviews.`,
        icon: match.icon || '💻',
        link: `/topic/${match.id}`,
        priority: 2
      };
    }
  }
  return defaults;
}

