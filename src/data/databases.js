export const databasesData = [
  {
    id: 'databases',
    title: 'Databases',
    icon: '🗄️',
    summary: 'Design, query, and optimization of relational and NoSQL data stores.',
    concepts: ['SQL', 'Normalization', 'Indexing', 'ACID', 'CAP', 'Sharding', 'Replication', 'Transactions', 'MongoDB', 'PostgreSQL'],
    questions: [
      { id: 'db-001', question: 'What is database normalization and why is it important?', difficulty: 'easy', answer: 'Normalization structures a relational database to reduce redundancy and improve data integrity by organizing data into tables based on functional dependencies. It eliminates update anomalies and simplifies maintenance.', code: '', codeLanguage: '' },
      { id: 'db-002', question: 'Explain the differences between a primary key and a foreign key.', difficulty: 'easy', answer: 'A primary key uniquely identifies each row in its own table. A foreign key references a primary key in another table, establishing a relationship between the two tables.', code: '', codeLanguage: '' },
      { id: 'db-003', question: 'When would you choose a NoSQL database over a relational one?', difficulty: 'medium', answer: 'When you need flexible schemas, horizontal scalability, high write throughput, or to store hierarchical or document-oriented data (e.g., JSON). Use cases include real-time analytics, caching layers, and content management.', code: '', codeLanguage: '' },
      { id: 'db-004', question: 'What is an index and how does it improve query performance?', difficulty: 'medium', answer: 'An index is a data structure (commonly a B‑tree) that allows the database engine to locate rows efficiently without scanning the whole table. It speeds up SELECT queries on indexed columns but adds overhead on INSERT/UPDATE/DELETE.', code: '', codeLanguage: '' },
      { id: 'db-005', question: 'Describe the ACID properties of transactions.', difficulty: 'hard', answer: 'Atomicity – all operations in a transaction succeed or all fail. Consistency – transaction brings DB from one valid state to another, preserving invariants. Isolation – concurrent transactions do not interfere; their intermediate states are invisible. Durability – once committed, changes survive crashes.', code: '', codeLanguage: '' }
    ]
  }
];
