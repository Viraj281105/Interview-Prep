export const projectsData = [
  {
    id: 'system-design',
    title: 'System Design & Architecture',
    icon: '🏗️',
    summary: 'Designing, building, and scaling real-world distributed systems, focusing on architecture trade-offs and best practices.',
    concepts: ['Scalability', 'Microservices', 'Event-Driven Architecture', 'Load Balancing', 'Caching Strategies', 'Database Sharding', 'Message Queues', 'Consistent Hashing', 'Rate Limiting', 'CDN'],
    questions: [
      {
        id: 'sys-001',
        question: 'Explain the difference between Vertical and Horizontal Scaling.',
        difficulty: 'easy',
        answer: 'Vertical Scaling (Scale Up) means adding more power (CPU, RAM) to an existing machine. It is simpler but has a hard limit and can cause downtime during upgrades. Horizontal Scaling (Scale Out) means adding more machines into your pool of resources. It provides near-infinite scaling and redundancy but requires complex distributed system management (load balancers, stateless servers, etc.).',
        codeLanguage: 'text'
      },
      {
        id: 'sys-002',
        question: 'How does a Load Balancer work?',
        difficulty: 'medium',
        answer: 'A load balancer distributes incoming network traffic across multiple servers to ensure no single server bears too much demand. This improves responsiveness and availability. It can work at Layer 4 (Transport, using IP/Port) or Layer 7 (Application, using HTTP headers/cookies). Routing algorithms include Round Robin, Least Connections, and IP Hash.',
        codeLanguage: 'text'
      },
      {
        id: 'sys-003',
        question: 'What are the common Caching Strategies?',
        difficulty: 'hard',
        answer: '1. Cache-Aside: Application checks cache first; if miss, reads from DB, puts in cache. (Good for read-heavy). 2. Write-Through: App writes data to cache AND DB simultaneously. (Slower writes, but consistent). 3. Write-Behind (Write-Back): App writes to cache only, which immediately acknowledges. Cache asynchronously writes to DB. (Fast writes, risk of data loss if cache crashes).',
        codeLanguage: 'text'
      },
      {
        id: 'sys-004',
        question: 'What is Consistent Hashing and why is it useful?',
        difficulty: 'hard',
        answer: 'Consistent Hashing is a distributed hashing scheme that operates independently of the number of servers or objects in a distributed hash table. It places servers and data keys on a virtual ring. When a server is added or removed, only a small fraction (K/N keys) needs to be remapped, compared to traditional modulo hashing where almost all keys would shift. Crucial for dynamic caches and databases like Cassandra.',
        codeLanguage: 'text'
      },
      {
        id: 'sys-005',
        question: 'How would you design a URL shortening service like bit.ly?',
        difficulty: 'hard',
        answer: 'Key components: API service to generate short URLs, a datastore mapping short codes to long URLs, a redirection service, and analytics. Use a hash (e.g., base-62 encoding of a unique DB auto-increment ID or Snowflake ID). Store mappings in a fast key-value store (Redis/Memcached) backed by a persistent DB (PostgreSQL). Ensure uniqueness, handle collisions, provide rate limiting, and use CDN for redirection latency.',
        codeLanguage: 'javascript'
      },
      {
        id: 'sys-006',
        question: 'What are Message Queues and why do we use them?',
        difficulty: 'medium',
        answer: 'Message queues (like RabbitMQ, Kafka, SQS) provide asynchronous communication and decoupling between microservices. They buffer requests during traffic spikes, ensuring background tasks (like sending emails or video processing) are reliably executed without blocking the main web thread. Kafka is specifically used as an append-only distributed event streaming platform for high-throughput data pipelines.',
        codeLanguage: 'text'
      },
      {
        id: 'sys-007',
        question: 'How would you implement Rate Limiting for an API?',
        difficulty: 'hard',
        answer: 'Use Redis to store request counts. Common algorithms: 1. Token Bucket: Tokens are added at a constant rate; requests consume tokens. 2. Leaky Bucket: Requests are queued and processed at a constant rate. 3. Fixed Window: Increment counter per IP per minute (flawed at window boundaries). 4. Sliding Window Log/Counter: Smooths out bursts by keeping timestamps or merging previous window weights. Implement this at the API Gateway level.',
        codeLanguage: 'text'
      }
    ]
  }
];
