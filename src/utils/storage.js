const COMPLETED_KEY = 'viraj_tech_mastery_completed';

export function getCompletedQuestions() {
  try {
    const data = localStorage.getItem(COMPLETED_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading completed questions from localStorage', e);
    return [];
  }
}

export function toggleCompletedQuestion(id) {
  try {
    const completed = getCompletedQuestions();
    let newCompleted;
    if (completed.includes(id)) {
      newCompleted = completed.filter(qId => qId !== id);
    } else {
      newCompleted = [...completed, id];
    }
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(newCompleted));
    return newCompleted;
  } catch (e) {
    console.error('Error saving completed question to localStorage', e);
    return [];
  }
}

export function isQuestionCompleted(id) {
  return getCompletedQuestions().includes(id);
}
