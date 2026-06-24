/**
 * AI Service
 * 
 * Note: This is an advanced Mock AI service designed to simulate the behavior and latency
 * of a real Large Language Model (LLM) like Google Gemini or OpenAI GPT-4. 
 * 
 * To upgrade to a real LLM, simply replace the mock implementations below with standard
 * fetch calls to the respective API, using the same return signatures.
 */

// Simulate network latency (between 1.5s and 3s)
const simulateLatency = () => new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));

export const aiService = {
  /**
   * Evaluate a user's answer to an interview question
   */
  evaluateAnswer: async (question, answer, type) => {
    await simulateLatency();

    const ansLower = answer.toLowerCase();
    const wordCount = answer.split(/\s+/).length;
    let score = 0;
    let strengths = [];
    let weaknesses = [];
    let feedback = "";
    let idealAnswer = "";

    // 1. Base Score on length and detail
    if (wordCount < 15) {
      score = 4;
      weaknesses.push("Answer is too brief and lacks depth.");
      feedback = "Your answer was extremely short. In a technical interview, you must elaborate on the 'why' and 'how', not just state a fact.";
    } else if (wordCount < 40) {
      score = 6;
      strengths.push("Direct and concise.");
      weaknesses.push("Could expand on edge cases and deeper mechanics.", "Needs more detailed explanation.");
      feedback = "Good start, but you missed deeper architectural details. Always try to mention trade-offs or alternatives.";
    } else {
      score = Math.min(10, 7 + Math.floor(Math.random() * 3));
      strengths.push("Detailed explanation.", "Good coverage of the core topic.");
      if (score < 10) weaknesses.push("Could be structured more clearly to avoid rambling.");
      feedback = "Excellent answer! You covered the main points well and provided sufficient technical depth.";
    }

    // 2. Subject-specific checks
    if (type === 'dsa') {
      idealAnswer = "An ideal answer explicitly states the core data structure used, walks through an example, and analyzes Time (Big-O) and Space complexity.";
      if (!ansLower.includes('o(') && !ansLower.includes('complexity') && !ansLower.includes('time') && !ansLower.includes('space')) {
        weaknesses.push("Did not mention Big-O complexity.");
        feedback += " You completely forgot to mention the time and space complexity, which is an automatic red flag in FAANG interviews.";
        score = Math.max(0, score - 2);
      } else {
        strengths.push("Mentioned algorithmic complexity.");
      }
    } 
    else if (type === 'db-sql') {
      idealAnswer = "An ideal answer discusses the query plan, indexing strategies (B-Trees), table locking, and isolation levels.";
      if (!ansLower.includes('index') && !ansLower.includes('join') && !ansLower.includes('normaliz')) {
        weaknesses.push("Failed to mention database indexing or schema design trade-offs.");
        score = Math.max(0, score - 1);
      } else {
        strengths.push("Correctly identified database optimization techniques.");
      }
    }
    else if (type === 'core-os') {
      idealAnswer = "An ideal answer discusses concurrency (threads vs processes), memory management (paging/virtual memory), or locks (mutex/semaphores).";
      if (!ansLower.includes('thread') && !ansLower.includes('memory') && !ansLower.includes('process') && !ansLower.includes('lock')) {
        weaknesses.push("Missed core OS terminology (e.g., threads, paging, locks).");
        score = Math.max(0, score - 1);
      }
    }
    else if (type === 'system-design') {
      idealAnswer = "An ideal answer covers the API design, database schema, scaling bottlenecks (Load Balancers, Caching, Sharding), and trade-offs (CAP theorem).";
      if (!ansLower.includes('scale') && !ansLower.includes('cache') && !ansLower.includes('database') && !ansLower.includes('load balanc')) {
        weaknesses.push("Did not address system scaling or bottlenecks.");
        score = Math.max(0, score - 2);
      }
    }
    else if (type === 'behavioral') {
      idealAnswer = "An ideal answer uses the STAR method (Situation, Task, Action, Result) and highlights measurable impact or lessons learned.";
      if (!ansLower.includes('result') && !ansLower.includes('action') && !ansLower.includes('learn')) {
        weaknesses.push("Did not fully follow the STAR method or highlight the actual result.");
        feedback += " Try to structure your behavioral answers using the STAR (Situation, Task, Action, Result) method and focus heavily on the 'Result'.";
        score = Math.max(0, score - 1);
      } else {
        strengths.push("Followed a structured storytelling approach.");
      }
    } else {
      idealAnswer = "An ideal answer directly addresses the core concepts, discusses alternatives, and provides real-world examples.";
    }

    // Ensure score is at least 1
    score = Math.max(1, score);

    return {
      score, // out of 10
      strengths,
      weaknesses,
      feedback,
      idealAnswer
    };
  },

  /**
   * Generate a dynamic follow-up question
   */
  generateFollowUp: async (previousQuestion, answer, type) => {
    await simulateLatency();
    
    if (type === 'dsa') return "How would your solution change if the input size was 100x larger and couldn't fit in memory?";
    if (type === 'system-design') return "What happens if the primary database node goes down during a peak traffic event?";
    if (type === 'db-sql') return "How would this query perform if the table had 1 billion rows? Would your index still work efficiently?";
    if (type === 'core-os') return "Can you explain how this concept might lead to a deadlock or a race condition?";
    return "Can you give me a specific example of when that approach failed, and what you learned from it?";
  },

  generateRoadmap: async (targetCompanies, skillLevel, prepTimeWeeks) => {
    const groqKey = import.meta.env.VITE_GROQ_API_KEY;
    
    // Dynamically fetch company data to weight the roadmap
    const { mockCompanies } = await import('../data/mock_companies.js');
    const matchedCompanies = targetCompanies.map(tc => {
      return mockCompanies.find(c => c.name.toLowerCase() === tc.toLowerCase() || c.id === tc.toLowerCase());
    }).filter(Boolean);

    let companyContext = "";
    let aggregatedTags = [];
    if (matchedCompanies.length > 0) {
      companyContext = matchedCompanies.map(c => `Company: ${c.name}, Tags: ${c.tags.join(', ')}, Difficulty: ${c.difficulty}`).join('. ');
      matchedCompanies.forEach(c => aggregatedTags.push(...c.tags));
    }

    if (groqKey) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${groqKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" },
            messages: [
              {
                role: "system",
                content: `You are an expert technical interviewer and career coach. Return a JSON object with the exact following structure:
{
  "title": "String",
  "summary": "String",
  "weeks": [
    { "week": Number, "title": "String", "focus": "String", "tasks": ["String", "String", "String"] }
  ]
}
The output MUST be valid JSON.`
              },
              {
                role: "user",
                content: `Create a ${prepTimeWeeks}-week technical interview preparation roadmap for a ${skillLevel} software engineer targeting these companies: ${targetCompanies.length > 0 ? targetCompanies.join(', ') : 'top tech companies'}. ${companyContext ? 'Use this data to tailor the plan: ' + companyContext : ''} Ensure tasks are realistic for the week.`
              }
            ]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices[0].message.content;
          return JSON.parse(content);
        } else {
          console.error("Groq API error, falling back to local heuristics", await response.text());
        }
      } catch (error) {
        console.error("Failed to connect to Groq, falling back to local heuristics:", error);
      }
    }

    // --- FALLBACK: Dynamic Local Heuristics ---
    await simulateLatency();

    let topics = [];
    
    if (aggregatedTags.length > 0) {
      // Weight topics based on tags
      const uniqueTags = [...new Set(aggregatedTags)];
      topics = uniqueTags.slice(0, Math.max(5, prepTimeWeeks)).map(t => `Focus: ${t}`);
      
      // Ensure basics are covered based on difficulty
      const isHard = matchedCompanies.some(c => c.difficulty === 'Hard' || c.difficulty === 'Expert');
      if (isHard) {
        topics.push("Advanced System Design", "Hard Dynamic Programming");
      }
    } else {
      topics = ["Arrays & Hashmaps", "Two Pointers", "Trees", "System Design Basics", "Behavioral & STAR Method"];
    }

    if (skillLevel === 'Beginner') {
      topics.unshift("Basic Data Structures", "Big-O Notation");
    } else if (skillLevel === 'Advanced') {
      topics = topics.map(t => t.includes('Focus:') ? t : "Advanced " + t);
      topics.push("System Architecture Deep Dive");
    }

    const weeks = [];
    for (let i = 0; i < prepTimeWeeks; i++) {
      const isReviewWeek = i === prepTimeWeeks - 1;
      const topic = topics[i % topics.length];
      
      weeks.push({
        week: i + 1,
        title: isReviewWeek ? "Review & Full Mock Loops" : `Mastering ${topic}`,
        focus: isReviewWeek ? "Simulating high-pressure onsite loops." : `Deep dive into ${topic} patterns asked by ${targetCompanies[0] || 'top companies'}.`,
        tasks: [
          `Complete 5 ${skillLevel} level questions related to ${topic}`,
          isReviewWeek ? "Do 2 full mock interview loops back-to-back" : "Read 1 architecture blog post or engineering article",
          `Do a 45-minute timed mock interview for ${topic}`
        ]
      });
    }

    return {
      title: `${prepTimeWeeks}-Week ${skillLevel} Prep Plan for ${targetCompanies.join(', ') || 'MAANG'}`,
      summary: `This roadmap is dynamically tailored for a ${skillLevel} engineer targeting ${targetCompanies.join(', ') || 'top tech companies'}. It prioritizes high-ROI topics based on actual company tags and hiring patterns.`,
      weeks
    };
  },

  /**
   * Generate AI insights based on user history and performance
   */
  generateInsights: async (history, profile, avgMockScore) => {
    const groqKey = import.meta.env.VITE_GROQ_API_KEY;
    const historySummary = history?.slice(0, 10).map(h => `${h.action_type}: ${h.metadata?.topicTitle || h.metadata?.quizTitle || h.metadata?.type || ''}`).join(', ');

    if (groqKey && history && history.length > 0) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${groqKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content: "You are an expert, encouraging tech interview coach. Based on the user's recent activity, write a short, punchy 2-sentence insight. Focus on what they are doing well and one specific area they should focus on next. Don't use markdown."
              },
              {
                role: "user",
                content: `User Goal: ${profile?.career_goals || 'Software Engineer'}. Avg Mock Score: ${avgMockScore}/100. Recent activity: ${historySummary}`
              }
            ]
          })
        });

        if (response.ok) {
          const data = await response.json();
          return data.choices[0].message.content.trim();
        }
      } catch (error) {
        console.error("Failed to connect to Groq for insights:", error);
      }
    }

    // --- FALLBACK ---
    await simulateLatency();
    
    if (!history || history.length === 0) {
      return "Welcome to PrepMaster! Start taking quizzes and mock interviews, and I'll analyze your performance to give you personalized coaching.";
    }

    if (avgMockScore > 0 && avgMockScore < 70) {
      return `I noticed your average mock score is ${avgMockScore}. Keep practicing your weak areas, particularly System Design and complex DSA, to boost your confidence.`;
    }

    if (avgMockScore >= 80) {
      return `You're crushing it! With an average mock score of ${avgMockScore}, you're showing great technical depth. Make sure to brush up on behavioral questions using the STAR method.`;
    }

    return `You've been active lately, which is the key to interview success! Based on your recent study sessions, I recommend doing a full Mock Interview to test your knowledge under pressure.`;
  }
};
