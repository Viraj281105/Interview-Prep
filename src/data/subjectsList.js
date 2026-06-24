import { Code, Database, Server, Layout, Users } from 'lucide-react';

export const subjectsList = [
  { 
    id: 'dsa', 
    title: 'Data Structures & Algorithms', 
    icon: 'Code', 
    desc: 'Arrays, Trees, Graphs, DP, and more.', 
    color: 'text-brand-indigo', 
    bg: 'bg-brand-indigo/10',
    moduleIds: ['dsa-arrays', 'dsa-linkedlists', 'dsa-trees', 'dsa-dp', 'dsa-sorting', 'dsa-heaps']
  },
  { 
    id: 'system-design', 
    title: 'System Design', 
    icon: 'Server', 
    desc: 'Scalable architectures, Load balancing.', 
    color: 'text-brand-violet', 
    bg: 'bg-brand-violet/10',
    moduleIds: ['core-sys-design', 'projects-system-design']
  },
  { 
    id: 'react', 
    title: 'React & Frontend', 
    icon: 'Layout', 
    desc: 'Hooks, State Management, Performance.', 
    color: 'text-brand-cyan', 
    bg: 'bg-brand-cyan/10',
    moduleIds: ['react', 'frontend-js', 'frontend-css', 'frontend-perf']
  },
  { 
    id: 'sql', 
    title: 'SQL', 
    icon: 'Database', 
    desc: 'Complex queries, Joins, Indexing.', 
    color: 'text-orange-500', 
    bg: 'bg-orange-500/10',
    moduleIds: ['db-sql']
  },
  { 
    id: 'dbms', 
    title: 'Database Management (DBMS)', 
    icon: 'Database', 
    desc: 'ACID, PostgreSQL, NoSQL, Redis.', 
    color: 'text-amber-600', 
    bg: 'bg-amber-600/10',
    moduleIds: ['db-postgres', 'db-nosql', 'db-redis']
  },
  { 
    id: 'oop', 
    title: 'Object Oriented Programming', 
    icon: 'Code', 
    desc: 'Java, C++, Python, TypeScript.', 
    color: 'text-rose-500', 
    bg: 'bg-rose-500/10',
    moduleIds: ['java', 'cpp', 'python', 'ts']
  },
  { 
    id: 'os', 
    title: 'Operating Systems', 
    icon: 'Server', 
    desc: 'Processes, Threads, Memory Management.', 
    color: 'text-emerald-500', 
    bg: 'bg-emerald-500/10',
    moduleIds: ['core-os']
  },
  { 
    id: 'cn', 
    title: 'Computer Networks', 
    icon: 'Server', 
    desc: 'TCP/IP, OSI Model, DNS, HTTP/HTTPS.', 
    color: 'text-blue-500', 
    bg: 'bg-blue-500/10',
    moduleIds: ['core-networking']
  },
  { 
    id: 'behavioral', 
    title: 'Behavioral & Leadership', 
    icon: 'Users', 
    desc: 'STAR method, cultural fit, conflict resolution.', 
    color: 'text-brand-pink', 
    bg: 'bg-brand-pink/10',
    moduleIds: ['hr-common', 'hr-behavioral', 'hr-leadership']
  },
];
