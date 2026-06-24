import { supabase, isBackendAvailable } from '../services/supabase';

export const createDataSlice = (set, get) => ({
  subjectsList: [],
  allDataModules: [],
  mockCompanies: [],
  isDataLoaded: false,
  isDataLoading: false,

  fetchCoreData: async () => {
    if (get().isDataLoaded || get().isDataLoading) return;
    set({ isDataLoading: true });
    
    try {
      if (!isBackendAvailable()) {
        console.warn('Backend unavailable, falling back to static data');
        // Dynamic import fallback to avoid circular deps initially
        const { subjectsList: staticSubjects } = await import('../data/subjectsList');
        const { allDataModules: staticModules } = await import('../data/index');
        const { mockCompanies: staticCompanies } = await import('../data/mock_companies');
        set({
          subjectsList: staticSubjects,
          allDataModules: staticModules,
          mockCompanies: staticCompanies,
          isDataLoaded: true,
          isDataLoading: false
        });
        return;
      }

      // Fetch from Supabase
      const [subjectsRes, topicsRes, questionsRes, companiesRes] = await Promise.all([
        supabase.from('subjects').select('*'),
        supabase.from('topics').select('*').order('order_index'),
        supabase.from('questions').select('*'),
        supabase.from('companies').select('*')
      ]);

      if (subjectsRes.error) throw subjectsRes.error;
      if (topicsRes.error) throw topicsRes.error;
      if (questionsRes.error) throw questionsRes.error;
      if (companiesRes.error) throw companiesRes.error;

      // Fallback if Supabase is connected but tables are empty (Phase 1 Bug Fix)
      if (subjectsRes.data.length === 0 || topicsRes.data.length === 0) {
        console.warn('Backend tables are empty, falling back to static data');
        const { subjectsList: staticSubjects } = await import('../data/subjectsList');
        const { allDataModules: staticModules } = await import('../data/index');
        const { mockCompanies: staticCompanies } = await import('../data/mock_companies');
        set({
          subjectsList: staticSubjects,
          allDataModules: staticModules,
          mockCompanies: staticCompanies,
          isDataLoaded: true,
          isDataLoading: false
        });
        return;
      }

      // Reconstruct subjectsList
      const reconstructedSubjects = subjectsRes.data.map(sub => ({
        ...sub,
        desc: sub.description,
        icon: sub.icon, // Needs mapping to actual component later if necessary, but UI handles string name? Wait, UI expects Lucide component...
        moduleIds: topicsRes.data.filter(t => t.subject_id === sub.id).map(t => t.id)
      }));

      // Reconstruct allDataModules
      const reconstructedModules = topicsRes.data.map(topic => ({
        id: topic.id,
        title: topic.title,
        description: topic.description,
        questions: questionsRes.data.filter(q => q.topic_id === topic.id).map(q => ({
          id: q.id,
          title: q.title,
          difficulty: q.difficulty,
          companyTags: q.company_tags,
          problem: q.content,
          solution: q.solution,
          hints: q.hints
        }))
      }));

      // Reconstruct companies
      const reconstructedCompanies = companiesRes.data.map(c => ({
        ...c,
        experienceCount: c.experience_count,
        hiringProcess: c.hiring_process
      }));

      set({
        subjectsList: reconstructedSubjects,
        allDataModules: reconstructedModules,
        mockCompanies: reconstructedCompanies,
        isDataLoaded: true,
        isDataLoading: false
      });
      console.log('✅ Core data successfully loaded from Supabase!');

    } catch (error) {
      console.error('Failed to load core data from DB:', error);
      set({ isDataLoading: false });
    }
  }
});
