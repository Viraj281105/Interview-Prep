import fs from 'fs';
import { subjectsList } from '../src/data/subjectsList.js';
import { allDataModules } from '../src/data/index.js';
import { mockCompanies } from '../src/data/mock_companies.js';

let sql = `-- PrepMaster V1.0 Data Seed
-- Run this in your Supabase SQL Editor.

`;

// Escape string for SQL
const escapeSQL = (str) => {
  if (typeof str !== 'string') return 'NULL';
  return "'" + str.replace(/'/g, "''") + "'";
};

// 1. Subjects
sql += `-- Subjects\n`;
for (const subject of subjectsList) {
  sql += `INSERT INTO public.subjects (id, title, icon, description, color, bg) VALUES (
    ${escapeSQL(subject.id)}, 
    ${escapeSQL(subject.title)}, 
    ${escapeSQL(subject.icon?.name || 'Box')}, 
    ${escapeSQL(subject.desc)}, 
    ${escapeSQL(subject.color)}, 
    ${escapeSQL(subject.bg)}
  ) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;\n`;
}
sql += `\n`;

// Map modules to subjects
const topicToSubjectMap = {};
subjectsList.forEach(sub => {
  sub.moduleIds.forEach(modId => {
    topicToSubjectMap[modId] = sub.id;
  });
});

// 2. Topics
sql += `-- Topics\n`;
let orderIndex = 0;
for (const module of allDataModules) {
  const subjectId = topicToSubjectMap[module.id] || null;
  sql += `INSERT INTO public.topics (id, subject_id, title, description, order_index) VALUES (
    ${escapeSQL(module.id)},
    ${subjectId ? escapeSQL(subjectId) : 'NULL'},
    ${escapeSQL(module.title)},
    ${escapeSQL(module.description || '')},
    ${orderIndex++}
  ) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;\n`;
}
sql += `\n`;

// 3. Questions
sql += `-- Questions\n`;
for (const module of allDataModules) {
  for (const q of module.questions) {
    const companyTagsArray = "ARRAY[" + (q.companyTags || []).map(t => escapeSQL(t)).join(', ') + "]::TEXT[]";
    const hintsArray = "ARRAY[" + (q.hints || []).map(t => escapeSQL(t)).join(', ') + "]::TEXT[]";

    sql += `INSERT INTO public.questions (id, topic_id, title, difficulty, company_tags, content, solution, hints) VALUES (
      ${escapeSQL(q.id)},
      ${escapeSQL(module.id)},
      ${escapeSQL(q.title || q.question)},
      ${escapeSQL(q.difficulty || 'Medium')},
      ${companyTagsArray},
      ${escapeSQL(q.problem || '')},
      ${escapeSQL(q.solution || q.answer || '')},
      ${hintsArray}
    ) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;\n`;
  }
}
sql += `\n`;

// 4. Companies
sql += `-- Companies\n`;
for (const c of mockCompanies) {
  const tagsArray = "ARRAY[" + (c.tags || []).map(t => escapeSQL(t)).join(', ') + "]::TEXT[]";
  const hiringProcessJson = escapeSQL(JSON.stringify(c.hiringProcess || []));

  sql += `INSERT INTO public.companies (id, name, type, difficulty, color, tags, description, experience_count, hiring_process) VALUES (
    ${escapeSQL(c.id)},
    ${escapeSQL(c.name)},
    ${escapeSQL(c.type)},
    ${escapeSQL(c.difficulty)},
    ${escapeSQL(c.color)},
    ${tagsArray},
    ${escapeSQL(c.description || '')},
    ${c.experienceCount || 0},
    ${hiringProcessJson}::JSONB
  ) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;\n`;
}
sql += `\n`;

fs.writeFileSync('./supabase/seed.sql', sql);
console.log('✅ Generated supabase/seed.sql');
