// Mock interview slice — interview history and scores
export const createMockSlice = (set, get) => ({
  mockInterviews: [], // Format: [{ id, type, date, duration, score, feedback }]

  saveMockInterview: (interviewData) => {
    set((state) => ({
      mockInterviews: [
        {
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
          ...interviewData
        },
        ...state.mockInterviews
      ].slice(0, 100) // Keep last 100 interviews
    }));
    // Reward +150 XP on mock interview completion
    get().logActivity(150);
  },
});
