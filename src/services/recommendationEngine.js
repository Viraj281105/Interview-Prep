import { getUserHistory } from './historyService';
import { getUserProfile } from './database';
import { allDataModules } from '../data';
import { mockQuizzes } from '../data/mock_mcq';

export const RECO_TYPES = {
  CONTINUE: 'CONTINUE',
  PRACTICE: 'PRACTICE',
  NEW_TOPIC: 'NEW_TOPIC',
  MOCK: 'MOCK'
};

export async function generateRecommendations(userId, completedQuestions = []) {
  if (!userId) return getDefaultRecommendations();

  try {
    // Fetch History & Profile
    const history = await getUserHistory(userId);
    const profile = await getUserProfile(userId);

    // If no history, return defaults based on profile or generic
    if (!history || history.length === 0) {
      return getProfileBasedDefaults(profile);
    }

    const recos = [];
    const usedIds = new Set();

    // 1. CONTINUE: Find most recently viewed topic that isn't fully complete
    const recentTopicViews = history.filter(h => h.action_type === 'topic_viewed');
    if (recentTopicViews.length > 0) {
      for (const view of recentTopicViews) {
        const topicId = view.metadata?.topicId;
        if (!topicId || usedIds.has(topicId)) continue;
        
        const module = allDataModules.find(m => m.id === topicId);
        if (!module) continue;

        // Check if fully completed
        const total = module.questions?.length || 0;
        const completed = module.questions?.filter(q => completedQuestions.includes(q.id)).length || 0;
        
        if (completed < total && total > 0) {
          recos.push({
            type: RECO_TYPES.CONTINUE,
            id: module.id,
            title: `Continue: ${module.title}`,
            description: `You are ${Math.round((completed/total)*100)}% done with this module. Keep going!`,
            icon: module.icon || '📚',
            link: `/topic/${module.id}`,
            priority: 10
          });
          usedIds.add(topicId);
          break; // Just one continue
        }
      }
    }

    // 2. PRACTICE: Recommend a quiz based on a recently completed or viewed topic
    const recentTopics = [...new Set(recentTopicViews.map(v => v.metadata?.topicId).filter(Boolean))];
    const recommendedQuiz = mockQuizzes.find(q => !usedIds.has(q.id) && recentTopics.some(t => q.id.includes(t.split('_')[0])));
    
    if (recommendedQuiz) {
      recos.push({
        type: RECO_TYPES.PRACTICE,
        id: recommendedQuiz.id,
        title: `Quiz: ${recommendedQuiz.title}`,
        description: `Test your knowledge on recently studied topics.`,
        icon: recommendedQuiz.icon || '📝',
        link: `/quiz/${recommendedQuiz.id}`,
        priority: 8
      });
      usedIds.add(recommendedQuiz.id);
    }

    // 3. MOCK INTERVIEW: If they haven't taken a mock recently, or scored low
    const recentMocks = history.filter(h => h.action_type === 'mock_taken');
    if (recentMocks.length === 0 || (recentMocks[0] && recentMocks[0].metadata?.score < 70)) {
      const mockType = recentMocks.length > 0 ? recentMocks[0].metadata?.type : 'dsa';
      recos.push({
        type: RECO_TYPES.MOCK,
        id: 'mock_reco',
        title: `Mock Interview: ${mockType.toUpperCase()}`,
        description: recentMocks.length === 0 ? "You haven't tried a mock interview yet. See where you stand!" : "Your last score was below 70. Try again to improve your performance.",
        icon: '🎥',
        link: `/mock`,
        priority: 9
      });
      usedIds.add('mock_reco');
    }

    // Fill to 3 items with new topics based on goals
    if (recos.length < 3) {
      const primaryStack = profile?.primary_stack || [];
      const suggestedModules = allDataModules.filter(m => !usedIds.has(m.id) && primaryStack.some(tech => m.title.toLowerCase().includes(tech.toLowerCase())));
      
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

    // Fallback fill
    if (recos.length < 3) {
      const fallbackDefaults = getDefaultRecommendations();
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
    return getDefaultRecommendations();
  }
}

function getDefaultRecommendations() {
  return [
    {
      type: RECO_TYPES.NEW_TOPIC,
      id: 'dsa_arrays',
      title: 'Master Arrays',
      description: 'The most common data structure in interviews.',
      icon: '📊',
      link: '/topic/dsa_arrays',
      priority: 1
    },
    {
      type: RECO_TYPES.MOCK,
      id: 'mock_dsa',
      title: 'DSA Mock Interview',
      description: 'Test your algorithmic skills under pressure.',
      icon: '🎥',
      link: '/mock',
      priority: 1
    },
    {
      type: RECO_TYPES.PRACTICE,
      id: 'quiz_react',
      title: 'React Fundamentals Quiz',
      description: 'Quick 10-question assessment.',
      icon: '📝',
      link: '/quiz/frontend_react',
      priority: 1
    }
  ];
}

function getProfileBasedDefaults(profile) {
  const defaults = getDefaultRecommendations();
  if (profile?.primary_stack?.includes('Python')) {
    defaults[0] = {
      type: RECO_TYPES.NEW_TOPIC,
      id: 'lang_python',
      title: 'Python Deep Dive',
      description: 'Master Python internals for your interviews.',
      icon: '🐍',
      link: '/topic/lang_python',
      priority: 2
    };
  }
  return defaults;
}
