import { supabase } from '../services/supabase';

// Helper to shuffle and pick N items
function getRandomItems(array, n) {
  if (!array || array.length === 0) return [];
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(n, array.length));
}

// Map the mock interview "type" to topic IDs in the database
const TYPE_TO_TOPICS = {
  'behavioral': ['hr-behavioral', 'hr-leadership'],
  'dsa': ['dsa-arrays', 'dsa-strings', 'dsa-linked-lists', 'dsa-trees', 'dsa-graphs', 'dsa-dp'],
  'system-design': ['core-sys-design'],
  'db-sql': ['db-sql', 'db-nosql'],
  'core-os': ['core-os'],
  'frontend': ['frontend-html-css', 'frontend-js', 'frontend-react'],
  'backend': ['backend-node', 'backend-python', 'backend-java', 'backend-apis'],
  'devops': ['devops-git', 'devops-docker', 'devops-k8s', 'devops-ci-cd']
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
      .select('id, question')
      .in('topic_id', topicIds);
      
    if (error || !data || data.length === 0) {
      console.warn("Could not fetch mock questions, returning fallbacks.", error);
      return getRandomItems(fallbackQuestions, 3);
    }
    
    // Pick 3 random questions
    const selected = getRandomItems(data, 3);
    return selected.map(q => q.question);
    
  } catch (err) {
    console.error("Error generating mock questions:", err);
    return getRandomItems(fallbackQuestions, 3);
  }
}
