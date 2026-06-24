import { supabase } from '../services/supabase';

// Helper to shuffle and pick N items
function getRandomItems(array, n) {
  if (!array || array.length === 0) return [];
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(n, array.length));
}

// Map the mock interview "type" to topic IDs in the database
const TYPE_TO_TOPICS = {
  'behavioral': ['hr-behavioral', 'hr-leadership', 'hr-common'],
  'dsa': ['dsa-arrays', 'dsa-trees', 'dsa-dp', 'dsa-sorting', 'dsa-heaps', 'dsa-linkedlists'],
  'system-design': ['core-sys-design', 'projects-sys-design'],
  'db-sql': ['sql', 'nosql', 'postgres', 'redis'],
  'core-os': ['core-os'],
  'frontend': ['react', 'css', 'javascript', 'web-perf'],
  'backend': ['nodejs', 'python', 'java', 'express', 'api-design', 'spring-boot', 'microservices'],
  'devops': ['devops-docker', 'devops-kubernetes', 'devops-cicd']
};

export async function generateMockQuestions(type) {
  const fallbackQuestions = [
    "Tell me about yourself.",
    "Why do you want to work here?",
    "What is your greatest strength and weakness?",
    "Describe a challenging bug you fixed recently."
  ];

  try {
    const topicIds = TYPE_TO_TOPICS[type] || [type];
    
    // Fetch all questions for these topics
    const { data, error } = await supabase
      .from('questions')
      .select('id, content')
      .in('topic_id', topicIds);
      
    if (error || !data || data.length === 0) {
      console.warn("Could not fetch mock questions, returning fallbacks.", error);
      return getRandomItems(fallbackQuestions, 3);
    }
    
    // Pick 3 random questions
    const selected = getRandomItems(data, 3);
    return selected.map(q => q.content);
    
  } catch (err) {
    console.error("Error generating mock questions:", err);
    return getRandomItems(fallbackQuestions, 3);
  }
}
