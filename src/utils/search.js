export function fuzzySearch(query, items, keys = ['question', 'answer']) {
  if (!query || query.trim() === '') return items;
  
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  
  return items.filter(item => {
    const searchText = keys
      .map(key => {
        const val = item[key];
        return typeof val === 'string' ? val : '';
      })
      .join(' ')
      .toLowerCase();
    
    return terms.every(term => searchText.includes(term));
  });
}

export function filterByDifficulty(items, difficulty) {
  if (!difficulty || difficulty === 'all') return items;
  return items.filter(item => item.difficulty === difficulty);
}

export function filterByCompletion(items, filter, isComplete) {
  if (!filter || filter === 'all') return items;
  if (filter === 'completed') return items.filter(item => isComplete(item.id));
  if (filter === 'pending') return items.filter(item => !isComplete(item.id));
  return items;
}

export function getAllQuestions(dataModules) {
  const allQuestions = [];
  for (const mod of dataModules) {
    for (const topic of mod.topics) {
      for (const q of topic.questions) {
        allQuestions.push({
          ...q,
          topicTitle: topic.title,
          sectionTitle: mod.sectionTitle,
          sectionPath: mod.path,
        });
      }
    }
  }
  return allQuestions;
}
