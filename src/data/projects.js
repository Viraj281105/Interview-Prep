export const projectsData = [
  {
    id: 'projects',
    title: 'Projects & System Design',
    icon: '🚀',
    summary: 'Designing, building, and scaling real‑world applications; architecture trade‑offs and best practices.',
    concepts: ['Scalability', 'Microservices', 'Event‑Driven Architecture', 'CAP Theorem', 'Load Balancing', 'Caching Strategies', 'Database Sharding', 'Message Queues', 'System Monitoring', 'High Availability'],
    questions: [
      {
        id: 'proj-001',
        question: 'How would you design a URL shortening service like bit.ly?',
        difficulty: 'hard',
        answer: 'Key components: API service to generate short URLs, a datastore mapping short codes to long URLs, a redirection service, and analytics. Use a hash (e.g., base‑62) or sequential ID converted to a short string. Store mappings in a fast key‑value store (Redis) with persistence (PostgreSQL). Ensure uniqueness, handle collisions, provide rate limiting, and use CDN for redirection latency. Optional features: custom aliases, analytics, expiration, and replication for high availability.',
        code: "// Example short code generation\nfunction encode(num){\n  const chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';\n  let short='';\n  while(num>0){\n    short = chars[num % 62] + short;\n    num = Math.floor(num/62);\n  }\n  return short;\n}\n",
        codeLanguage: 'javascript'
      },
      {
        id: 'proj-002',
        question: 'What are the trade‑offs between using a monolithic architecture vs microservices?',
        difficulty: 'medium',
        answer: 'Monoliths are simpler to develop, test, and deploy, with lower operational overhead and easier transactional consistency. Microservices provide independent deployment, scaling per service, technology heterogeneity, and fault isolation, but increase complexity: inter‑service communication, distributed tracing, data consistency, operational overhead, and testing challenges.',
        code: '',
        codeLanguage: ''
      },
      {
        id: 'proj-003',
        question: 'How would you implement rate limiting for an API using Redis?',
        difficulty: 'medium',
        answer: 'Use a sliding window or token bucket algorithm stored in Redis. For a fixed window, increment a key per IP and set an expiration of the window (e.g., 1 minute). If the count exceeds the limit, reject requests. Pseudo‑code using INCR and EXPIRE ensures atomicity.',
        code: "// Fixed‑window rate limit\nconst limit = 100;\nconst windowSec = 60;\nconst key = `rate:${ip}`;\nconst count = await redis.incr(key);\nif (count === 1) await redis.expire(key, windowSec);\nif (count > limit) { /* reject */ }",
        codeLanguage: 'javascript'
      }
    ]
  }
];
