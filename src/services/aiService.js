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

    // Basic heuristic grading for mock realism
    const wordCount = answer.split(/\s+/).length;
    let score = 0;
    let strengths = [];
    let weaknesses = [];
    let feedback = "";

    if (wordCount < 10) {
      score = 3;
      weaknesses.push("Answer is too brief", "Lacks technical depth");
      feedback = "Your answer was very short. In a real interview, you should elaborate on your thought process and provide specific details.";
    } else if (wordCount < 30) {
      score = 6;
      strengths.push("Concise");
      weaknesses.push("Could expand on edge cases", "Needs more detailed explanation");
      feedback = "Good start, but you missed some important edge cases. Always try to mention time/space complexity if applicable.";
    } else {
      score = Math.min(10, 7 + Math.floor(Math.random() * 3));
      strengths.push("Detailed explanation", "Good coverage of the topic");
      if (score < 10) weaknesses.push("Could be structured more clearly");
      feedback = "Excellent answer! You covered the main points well and provided sufficient detail.";
    }

    if (type === 'dsa' && !answer.includes('O(') && !answer.toLowerCase().includes('complexity')) {
      weaknesses.push("Did not mention Big-O complexity");
      score = Math.max(0, score - 2);
    }

    if (type === 'behavioral' && (!answer.toLowerCase().includes('result') || !answer.toLowerCase().includes('action'))) {
      weaknesses.push("Did not fully follow the STAR method");
      feedback += " Try to structure your behavioral answers using the STAR (Situation, Task, Action, Result) method.";
    }

    return {
      score,
      strengths,
      weaknesses,
      feedback,
      idealAnswer: "An ideal answer would explicitly state the core concept, discuss trade-offs, and correctly analyze time/space complexity (if technical) or use the STAR method (if behavioral)."
    };
  },

  /**
   * Generate a dynamic follow-up question
   */
  generateFollowUp: async (previousQuestion, answer, type) => {
    await simulateLatency();
    
    if (type === 'dsa') {
      return "How would your solution change if the input size was 100x larger and couldn't fit in memory?";
    } else if (type === 'system-design') {
      return "What happens if the primary database node goes down during a peak traffic event?";
    } else {
      return "Can you give me a specific example of when that approach failed, and what you learned from it?";
    }
  },

  /**
   * Generate a personalized prep roadmap
   */
  generateRoadmap: async (targetCompanies, skillLevel, prepTimeWeeks) => {
    await simulateLatency();

    const weeks = [];
    const topics = [
      "Arrays & Strings", "Two Pointers", "Sliding Window", 
      "Linked Lists", "Trees & Graphs", "Dynamic Programming", 
      "System Design Fundamentals", "Behavioral & Leadership"
    ];

    for (let i = 0; i < prepTimeWeeks; i++) {
      const isReviewWeek = i === prepTimeWeeks - 1;
      weeks.push({
        week: i + 1,
        title: isReviewWeek ? "Review & Mock Interviews" : `Mastering ${topics[i % topics.length]}`,
        focus: isReviewWeek ? "Full-length mock loops and weak area targeting" : `Deep dive into ${topics[i % topics.length]} patterns often asked at ${targetCompanies[0] || 'Top Tech'}`,
        tasks: [
          `Complete 5 ${skillLevel} level LeetCode questions`,
          isReviewWeek ? "Do 2 full mock interview loops" : "Review foundational concepts for 1 hour",
          `Read 2 interview experiences for ${targetCompanies.join(', ') || 'MAANG'}`
        ]
      });
    }

    return {
      title: `${prepTimeWeeks}-Week ${skillLevel} Prep Plan for ${targetCompanies.join(', ') || 'MAANG'}`,
      summary: `This roadmap is tailored for a ${skillLevel} engineer targeting ${targetCompanies.join(', ') || 'top tech companies'}. It prioritizes high-ROI topics based on their recent interview patterns.`,
      weeks
    };
  }
};
