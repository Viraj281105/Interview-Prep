import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';
import { subjectsList } from '../src/data/subjectsList.js';
import { allDataModules } from '../src/data/index.js';
import { mockCompanies } from '../src/data/mock_companies.js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY; // Service role key would be better for seeding, but anon key works if RLS allows or we use service role

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in environment.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
  global: { WebSocket },
  realtime: { transport: WebSocket } // Add this
});

async function seed() {
  console.log('🌱 Starting Database Seed...');

  // 1. Seed Subjects
  console.log('Seeding subjects...');
  for (const subject of subjectsList) {
    const { error } = await supabase.from('subjects').upsert({
      id: subject.id,
      title: subject.title,
      icon: subject.icon.name || 'Box', // We can't store React components in DB easily, just store name or empty
      description: subject.desc,
      color: subject.color,
      bg: subject.bg
    });
    if (error) console.error(`Error inserting subject ${subject.id}:`, error.message);
  }

  // Map modules to subjects
  const topicToSubjectMap = {};
  subjectsList.forEach(sub => {
    sub.moduleIds.forEach(modId => {
      topicToSubjectMap[modId] = sub.id;
    });
  });

  // 2. Seed Topics and Questions
  console.log('Seeding topics and questions...');
  let orderIndex = 0;
  for (const module of allDataModules) {
    const subjectId = topicToSubjectMap[module.id] || null;
    
    // Insert Topic
    const { error: topicErr } = await supabase.from('topics').upsert({
      id: module.id,
      subject_id: subjectId,
      title: module.title,
      description: module.description || '',
      order_index: orderIndex++
    });
    if (topicErr) {
      console.error(`Error inserting topic ${module.id}:`, topicErr.message);
      continue;
    }

    // Insert Questions
    const questionsToInsert = module.questions.map(q => ({
      id: q.id,
      topic_id: module.id,
      title: q.title || q.question,
      difficulty: q.difficulty || 'Medium',
      company_tags: q.companyTags || [],
      content: q.problem || '',
      solution: q.solution || q.answer || '',
      hints: q.hints || []
    }));

    if (questionsToInsert.length > 0) {
      const { error: qErr } = await supabase.from('questions').upsert(questionsToInsert);
      if (qErr) console.error(`Error inserting questions for topic ${module.id}:`, qErr.message);
    }
  }

  // 3. Seed Companies
  console.log('Seeding companies...');
  const companiesToInsert = mockCompanies.map(c => ({
    id: c.id,
    name: c.name,
    type: c.type,
    difficulty: c.difficulty,
    color: c.color,
    tags: c.tags || [],
    description: c.description || '',
    experience_count: c.experienceCount || 0,
    hiring_process: c.hiringProcess || []
  }));

  if (companiesToInsert.length > 0) {
    const { error: cErr } = await supabase.from('companies').upsert(companiesToInsert);
    if (cErr) console.error('Error inserting companies:', cErr.message);
  }

  console.log('✅ Seeding Complete!');
}

seed().catch(console.error);
