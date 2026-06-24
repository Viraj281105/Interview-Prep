const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');

const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.js') && !['index.js', 'subjectsList.js', 'mock_companies.js', 'mock_mcq.js', 'programmingLanguages.js'].includes(f));

for (const file of files) {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Check if learningLinks already exists
  if (content.includes('learningLinks:')) {
    continue;
  }

  // Create links based on filename
  let links = [];
  if (file.includes('dsa')) {
    links = [
      { title: 'GeeksforGeeks DSA', url: 'https://www.geeksforgeeks.org/data-structures/' },
      { title: 'LeetCode Explore', url: 'https://leetcode.com/explore/' }
    ];
  } else if (file.includes('db_') || file.includes('database')) {
    links = [
      { title: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/' },
      { title: 'Use The Index, Luke', url: 'https://use-the-index-luke.com/' }
    ];
  } else if (file.includes('core_os')) {
    links = [
      { title: 'OS Concepts (GeeksforGeeks)', url: 'https://www.geeksforgeeks.org/operating-systems/' }
    ];
  } else if (file.includes('core_network')) {
    links = [
      { title: 'Computer Networking Basics', url: 'https://www.cloudflare.com/learning/network-layer/what-is-the-network-layer/' }
    ];
  } else if (file.includes('lang_')) {
    links = [
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/' },
      { title: 'W3Schools', url: 'https://www.w3schools.com/' }
    ];
  } else if (file.includes('core_system_design') || file.includes('projects_sys')) {
    links = [
      { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' },
      { title: 'ByteByteGo', url: 'https://bytebytego.com/' }
    ];
  } else if (file.includes('hr_')) {
    links = [
      { title: 'STAR Method Guide', url: 'https://www.themuse.com/advice/star-interview-method' }
    ];
  } else if (file.includes('frontend')) {
    links = [
      { title: 'React Docs', url: 'https://react.dev/' },
      { title: 'Frontend Masters', url: 'https://frontendmasters.com/' }
    ];
  } else if (file.includes('backend')) {
    links = [
      { title: 'Node.js Docs', url: 'https://nodejs.org/en/docs/' },
      { title: 'Spring Boot Guide', url: 'https://spring.io/guides' }
    ];
  } else if (file.includes('devops')) {
    links = [
      { title: 'Docker Tutorial', url: 'https://docs.docker.com/get-started/' },
      { title: 'Kubernetes Basics', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/' }
    ];
  } else if (file.includes('ai_ml')) {
    links = [
      { title: 'Machine Learning Crash Course', url: 'https://developers.google.com/machine-learning/crash-course' }
    ];
  } else {
    links = [
      { title: 'FreeCodeCamp', url: 'https://www.freecodecamp.org/' }
    ];
  }

  const linksString = `\n  learningLinks: [\n${links.map(l => `    { title: '${l.title}', url: '${l.url}' }`).join(',\n')}\n  ],`;

  // Insert before 'questions: ['
  content = content.replace(/(\s*)(questions:\s*\[)/, `$1${linksString}$1$2`);

  // Ensure concepts array exists, if not add it
  if (!content.includes('concepts:')) {
    content = content.replace(/(\s*)(learningLinks:)/, `$1concepts: ['General Theory', 'Best Practices', 'Practical Application'],$1$2`);
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated ${file}`);
}
