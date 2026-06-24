import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import { subjectsList } from './src/data/subjectsList.js';
import { allDataModules } from './src/data/index.js';
import { mockCompanies } from './src/data/mock_companies.js';

import WebSocket from 'ws';

const envFile = fs.readFileSync('.env.local', 'utf8');
let supabaseUrl = '';
let supabaseKey = '';

envFile.split('\n').forEach(line => {
  if (line.startsWith('VITE_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim();
  if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].trim();
});

global.WebSocket = WebSocket;

const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

async function seed() {
  console.log('🌱 Starting Supabase Seeding Process...');

  // 1. Seed Subjects
  console.log(`Processing ${subjectsList.length} subjects...`);
  for (const subject of subjectsList) {
    const { error } = await supabase.from('subjects').upsert({
      id: subject.id,
      title: subject.title,
      description: subject.desc,
      icon: subject.icon,
      bg: subject.bg,
      color: subject.color
    }, { onConflict: 'id' });
    if (error) console.error(`Error inserting subject ${subject.id}:`, error.message);
  }

  // 2. Seed Topics and Questions
  console.log(`Processing ${allDataModules.length} topics...`);
  let topicOrder = 0;
  for (const module of allDataModules) {
    // Find parent subject
    const parentSubject = subjectsList.find(s => s.moduleIds.includes(module.id));
    const subjectId = parentSubject ? parentSubject.id : null;

    if (!subjectId) {
      console.warn(`Warning: Topic ${module.id} has no parent subject, inserting with null.`);
    }

    const { error: topicError } = await supabase.from('topics').upsert({
      id: module.id,
      subject_id: subjectId || null,
      title: module.title,
      description: module.description || '',
      order_index: topicOrder++
    }, { onConflict: 'id' });

    if (topicError) {
      console.error(`Error inserting topic ${module.id}:`, topicError.message);
      continue;
    }

    // Insert questions for this topic
    if (module.questions && module.questions.length > 0) {
      const questionsToInsert = module.questions.map((q, i) => ({
        id: q.id || `${module.id}-q${i}`,
        topic_id: module.id,
        title: q.title || q.question || 'Untitled Question',
        difficulty: q.difficulty || 'Medium',
        company_tags: q.companyTags || [],
        content: q.question || q.problem || '',
        solution: q.answer || q.solution || '',
        hints: q.hints || []
      }));

      const { error: qError } = await supabase.from('questions').upsert(questionsToInsert, { onConflict: 'id' });
      if (qError) console.error(`Error inserting questions for ${module.id}:`, qError.message);
    }
  }

  // 3. Seed Companies
  console.log(`Processing ${mockCompanies.length} companies...`);
  for (const company of mockCompanies) {
    const { error } = await supabase.from('companies').upsert({
      id: company.id,
      name: company.name,
      type: company.type,
      logo: company.logo,
      color: company.color,
      bg: company.bg,
      experience_count: company.experienceCount,
      hiring_process: company.hiringProcess
      // Omitted missing columns: stats, popular_roles, experiences to prevent schema cache errors
    }, { onConflict: 'id' });

    if (error) console.error(`Error inserting company ${company.id}:`, error.message);
  }

  console.log('✅ Seeding completed!');
}

seed().catch(console.error);
