import { Code, Database, Server, Users, Cpu, Globe, Layers, MessageSquare } from 'lucide-react';

// Subject metadata — defines the subjects shown on the Subjects page
// Each id maps to one or more data modules from src/data/
export const SUBJECTS = [
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    icon: Code,
    desc: 'Arrays, Trees, Graphs, DP, Sorting, and more.',
    color: 'text-brand-indigo',
    bg: 'bg-brand-indigo/10',
    dataModuleIds: ['dsa-arrays', 'dsa-trees', 'dsa-dp', 'dsa-sorting', 'dsa-heaps', 'dsa-linkedlists'],
  },
  {
    id: 'sql',
    title: 'SQL & Database',
    icon: Database,
    desc: 'Complex queries, Joins, Indexing, Transactions.',
    color: 'text-brand-cyan',
    bg: 'bg-brand-cyan/10',
    dataModuleIds: ['db-sql', 'db-postgres', 'db-nosql', 'db-redis'],
  },
  {
    id: 'dbms',
    title: 'DBMS Concepts',
    icon: Database,
    desc: 'ER Model, Normalization, ACID, Concurrency.',
    color: 'text-brand-purple',
    bg: 'bg-brand-purple/10',
    dataModuleIds: ['db-sql', 'db-nosql'],
  },
  {
    id: 'system-design',
    title: 'System Design',
    icon: Server,
    desc: 'Scaling, Load Balancing, Caching, CDNs.',
    color: 'text-brand-violet',
    bg: 'bg-brand-violet/10',
    dataModuleIds: ['core-system-design', 'projects-system-design'],
  },
  {
    id: 'os',
    title: 'Operating Systems',
    icon: Cpu,
    desc: 'Processes, Threads, Scheduling, Virtual Memory.',
    color: 'text-brand-pink',
    bg: 'bg-brand-pink/10',
    dataModuleIds: ['core-os'],
  },
  {
    id: 'cn',
    title: 'Computer Networks',
    icon: Globe,
    desc: 'TCP/IP, HTTP, DNS, Network Layers.',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    dataModuleIds: ['core-network'],
  },
  {
    id: 'oop',
    title: 'Object Oriented Programming',
    icon: Layers,
    desc: 'Classes, Inheritance, Polymorphism, SOLID.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    dataModuleIds: ['lang-java', 'lang-cpp', 'lang-python'],
  },
  {
    id: 'hr',
    title: 'HR & Behavioral',
    icon: MessageSquare,
    desc: 'Behavioral questions, STAR method, Leadership.',
    color: 'text-brand-lavender',
    bg: 'bg-brand-lavender/10',
    dataModuleIds: ['hr-behavioral', 'hr-leadership', 'hr-common'],
  },
];

// Quick lookup by ID
export const SUBJECT_MAP = Object.fromEntries(SUBJECTS.map(s => [s.id, s]));
