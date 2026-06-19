const fs = require('fs');
const path = require('path');
const dir = './src/data';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && f !== 'index.js');
const results = [];

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  // Find each topic block by splitting on the pattern
  const idMatches = [...content.matchAll(/id:\s*'([^']+)',\s*\n\s*title:\s*'([^']+)'/g)];
  
  idMatches.forEach((match, idx) => {
    const topicId = match[1];
    const topicTitle = match[2];
    const startIdx = match.index;
    const endIdx = idx + 1 < idMatches.length ? idMatches[idx + 1].index : content.length;
    const block = content.substring(startIdx, endIdx);
    
    const qCount = (block.match(/question:/g) || []).length;
    const codeCount = (block.match(/\bcode:/g) || []).length;
    
    // Count by difficulty
    const easy = (block.match(/difficulty:\s*'easy'/g) || []).length;
    const medium = (block.match(/difficulty:\s*'medium'/g) || []).length;
    const hard = (block.match(/difficulty:\s*'hard'/g) || []).length;
    const expert = (block.match(/difficulty:\s*'expert'/g) || []).length;
    
    // Count by type
    const theory = (block.match(/type:\s*'theory'/g) || []).length;
    const practical = (block.match(/type:\s*'practical'/g) || []).length;
    const noType = qCount - theory - practical;

    results.push({ file: f, topicId, topicTitle, qCount, codeCount, easy, medium, hard, expert, theory, practical, noType });
  });
});

console.log('');
console.log('FILE'.padEnd(26) + 'TOPIC'.padEnd(42) + 'Qs  CODE  E  M  H  X  THY PRC NO-T');
console.log('='.repeat(110));

let totalQ = 0, totalCode = 0;
let fileGroup = '';
results.forEach(r => {
  if (r.file !== fileGroup) {
    if (fileGroup) console.log('');
    fileGroup = r.file;
  }
  totalQ += r.qCount;
  totalCode += r.codeCount;
  console.log(
    r.file.padEnd(26) +
    r.topicTitle.substring(0, 40).padEnd(42) +
    String(r.qCount).padStart(2) + 
    String(r.codeCount).padStart(5) +
    String(r.easy).padStart(4) +
    String(r.medium).padStart(3) +
    String(r.hard).padStart(3) +
    String(r.expert).padStart(3) +
    String(r.theory).padStart(5) +
    String(r.practical).padStart(4) +
    String(r.noType).padStart(5)
  );
});
console.log('='.repeat(110));
console.log('TOTAL TOPICS: ' + results.length);
console.log('TOTAL QUESTIONS: ' + totalQ);
console.log('TOTAL CODE EXAMPLES: ' + totalCode);
console.log('');
console.log('TARGET: 50+ questions per topic (75-100 for major topics)');
console.log('');

// Gap analysis
console.log('--- GAP ANALYSIS (sorted by deficit) ---');
results
  .map(r => ({ ...r, target: 50, deficit: 50 - r.qCount }))
  .sort((a, b) => b.deficit - a.deficit)
  .forEach(r => {
    const status = r.qCount >= 50 ? 'OK' : r.qCount >= 30 ? 'NEEDS MORE' : 'CRITICAL';
    console.log(
      `[${status.padEnd(10)}] ${r.topicTitle.substring(0, 38).padEnd(40)} ${r.qCount}/${r.target}  (need +${Math.max(0, r.deficit)})`
    );
  });
