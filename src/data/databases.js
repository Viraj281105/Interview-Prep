export const databasesData = [
  {
    id: 'sql',
    title: 'Relational Databases (SQL)',
    icon: '🐘',
    summary: 'Structured Query Language databases like PostgreSQL and MySQL, emphasizing ACID properties and structured schemas.',
    concepts: ['ACID', 'Normalization', 'Joins', 'Indexes', 'Transactions', 'Isolation Levels', 'B-Trees', 'Foreign Keys'],
    questions: [
      {
        id: 'sql-001',
        question: 'What are the ACID properties?',
        difficulty: 'medium',
        answer: 'Atomicity (all operations in a transaction succeed or all fail), Consistency (database remains in a valid state before and after), Isolation (concurrent transactions do not interfere with each other), Durability (committed transactions persist even in case of a system failure).',
        codeLanguage: 'sql'
      },
      {
        id: 'sql-002',
        question: 'Explain Database Normalization and its normal forms.',
        difficulty: 'hard',
        answer: 'Normalization minimizes redundancy and dependency. 1NF: Atomic values, unique rows. 2NF: 1NF + no partial dependencies (non-key attributes depend on the whole primary key). 3NF: 2NF + no transitive dependencies (non-key attributes depend only on the primary key, not on other non-key attributes). BCNF: Stricter 3NF where every determinant is a candidate key.',
        codeLanguage: 'sql'
      },
      {
        id: 'sql-003',
        question: 'What is an Index and how does it work?',
        difficulty: 'medium',
        answer: 'An index is a data structure (typically a B-Tree or Hash table) that improves the speed of data retrieval operations at the cost of additional space and slower writes. It stores a sorted version of the indexed column(s) mapping to row pointers, reducing the need for full table scans.',
        codeLanguage: 'sql'
      },
      {
        id: 'sql-004',
        question: 'Explain the different types of JOINs.',
        difficulty: 'easy',
        answer: 'INNER JOIN: Returns rows that have matching values in both tables. LEFT (OUTER) JOIN: Returns all rows from the left table, and matched rows from the right (or NULL if no match). RIGHT JOIN: Opposite of Left. FULL (OUTER) JOIN: Returns all rows when there is a match in either left or right table. CROSS JOIN: Cartesian product of both tables.',
        codeLanguage: 'sql'
      },
      {
        id: 'sql-005',
        question: 'What are Transaction Isolation Levels?',
        difficulty: 'hard',
        answer: 'They control how changes made by one transaction become visible to others. 1. Read Uncommitted (dirty reads allowed). 2. Read Committed (no dirty reads, but non-repeatable reads possible). 3. Repeatable Read (no dirty/non-repeatable reads, but phantom reads possible). 4. Serializable (highest isolation, completely sequential execution, no phantoms).',
        codeLanguage: 'sql'
      }
    ]
  },
  {
    id: 'nosql',
    title: 'NoSQL Databases',
    icon: '🍃',
    summary: 'Non-relational databases like MongoDB, Cassandra, and Redis designed for flexible schemas, high availability, and horizontal scaling.',
    concepts: ['CAP Theorem', 'Document Stores', 'Key-Value Stores', 'Column-Family Stores', 'Graph Databases', 'Eventual Consistency', 'Sharding'],
    questions: [
      {
        id: 'nosql-001',
        question: 'What is the CAP Theorem?',
        difficulty: 'medium',
        answer: 'CAP theorem states a distributed data store can only guarantee two out of three: Consistency (all nodes see the same data at the same time), Availability (every request receives a response, without guarantee of latest data), Partition tolerance (system continues to operate despite network partitions). During a network partition, you must choose between C and A.',
        codeLanguage: 'text'
      },
      {
        id: 'nosql-002',
        question: 'When should you choose NoSQL over SQL?',
        difficulty: 'medium',
        answer: 'Choose NoSQL when dealing with unstructured or semi-structured data, requiring rapid agile development without a fixed schema, needing massive horizontal scaling (sharding) out of the box, or when write-throughput requirements exceed the capacity of a single SQL node. SQL is better for complex queries, strict consistency, and heavily structured data.',
        codeLanguage: 'text'
      },
      {
        id: 'nosql-003',
        question: 'Explain Sharding vs Replication.',
        difficulty: 'medium',
        answer: 'Replication (master-slave or master-master) involves keeping copies of the same data on multiple nodes for high availability, fault tolerance, and read scaling. Sharding (partitioning) involves splitting a single dataset across multiple nodes so each node holds only a portion of the data, primarily for write scaling and handling massive datasets.',
        codeLanguage: 'text'
      },
      {
        id: 'nosql-004',
        question: 'How does Redis achieve high performance?',
        difficulty: 'hard',
        answer: 'Redis is an in-memory data store, meaning it avoids disk I/O latency for operations. It uses a single-threaded event loop architecture written in C, which avoids context switching and lock overhead for concurrent operations. It uses efficient underlying data structures (like skip lists for sorted sets). Persistence is handled via asynchronous snapshots (RDB) or append-only files (AOF).',
        codeLanguage: 'text'
      }
    ]
  },
  {
    id: 'postgres',
    title: 'PostgreSQL Deep Dive',
    icon: '🗄️',
    summary: 'Advanced concepts specifically for PostgreSQL, the world\'s most advanced open source database.',
    concepts: ['MVCC', 'Vacuuming', 'JSONB', 'CTEs', 'Window Functions', 'EXPLAIN ANALYZE', 'Materialized Views'],
    questions: [
      {
        id: 'pg-001',
        question: 'What is MVCC (Multi-Version Concurrency Control) in PostgreSQL?',
        difficulty: 'hard',
        answer: 'MVCC allows multiple transactions to occur simultaneously without interfering with each other. Instead of locking rows for reading, Postgres keeps multiple versions of a row when it is updated or deleted. Readers don\'t block writers, and writers don\'t block readers. Each transaction sees a consistent snapshot of the database from the moment it began.',
        codeLanguage: 'sql'
      },
      {
        id: 'pg-002',
        question: 'Why does PostgreSQL need the VACUUM process?',
        difficulty: 'hard',
        answer: 'Because of MVCC, when a row is updated or deleted, the old version (dead tuple) isn\'t immediately removed from disk; it\'s just marked as invisible to new transactions. The VACUUM process reclaims this space making it available for future inserts, and prevents transaction ID wraparound. Autovacuum usually handles this automatically in the background.',
        codeLanguage: 'sql'
      },
      {
        id: 'pg-003',
        question: 'What are Window Functions and how are they different from GROUP BY?',
        difficulty: 'medium',
        answer: 'Window functions perform a calculation across a set of table rows that are somehow related to the current row (e.g., running total, ranking). Unlike aggregate functions with GROUP BY, which collapse rows into a single output row, window functions do NOT cause rows to become grouped into a single output row — the rows retain their separate identities.',
        code: "SELECT \n  department,\n  salary,\n  RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank\nFROM employees;",
        codeLanguage: 'sql'
      },
      {
        id: 'pg-004',
        question: 'Explain the difference between a View and a Materialized View.',
        difficulty: 'medium',
        answer: 'A standard View is basically a saved query; the underlying query is executed every time the view is referenced. A Materialized View physically stores the result of the query on disk. This makes reads much faster for complex queries, but the data must be manually or asynchronously refreshed (e.g., REFRESH MATERIALIZED VIEW) to stay up to date.',
        codeLanguage: 'sql'
      }
    ]
  },
  {
    id: 'redis',
    title: 'Redis In-Depth',
    icon: '⚡',
    summary: 'Advanced usage of Redis beyond simple caching: pub/sub, Lua scripting, and persistence.',
    concepts: ['Pub/Sub', 'Sorted Sets', 'AOF vs RDB', 'Eviction Policies', 'Transactions (MULTI/EXEC)', 'Redis Cluster'],
    questions: [
      {
        id: 'red-001',
        question: 'What are the main Redis eviction policies?',
        difficulty: 'medium',
        answer: 'When Redis reaches its maxmemory limit, it evicts keys based on the configured policy. Examples: noeviction (returns errors on write), allkeys-lru (evicts least recently used among all keys), volatile-lru (evicts least recently used among keys with an expiration set), allkeys-lfu (least frequently used), and volatile-ttl (evicts keys with the shortest remaining time to live).',
        codeLanguage: 'text'
      },
      {
        id: 'red-002',
        question: 'How do Redis Transactions work?',
        difficulty: 'hard',
        answer: 'Redis uses MULTI, EXEC, DISCARD, and WATCH for transactions. Unlike RDBMS, Redis transactions do not support rollbacks if a command fails during execution (only if there\'s a syntax error before EXEC). Once EXEC is called, all commands in the block are executed sequentially without interruption by other clients. WATCH provides optimistic locking.',
        codeLanguage: 'text'
      },
      {
        id: 'red-003',
        question: 'Explain Redis RDB vs AOF persistence.',
        difficulty: 'hard',
        answer: 'RDB (Redis Database) takes point-in-time snapshots of your dataset at specified intervals. It is compact and great for backups, but you can lose minutes of data in a crash. AOF (Append Only File) logs every write operation received by the server. It provides much better durability (up to every second or every query) but results in a larger file size and slower restart times.',
        codeLanguage: 'text'
      }
    ]
  }
];
