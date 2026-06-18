export const backendData = [
  {
    id: 'nodejs',
    title: 'Node.js',
    icon: '🟢',
    summary: 'JavaScript runtime built on Chrome V8, enabling server-side development with non-blocking I/O and event-driven architecture.',
    concepts: ['Event Loop', 'Callback Queue', 'Streams', 'Cluster Module', 'Middleware', 'Package Management (npm/yarn)', 'Process Management', 'Asynchronous Patterns'],
    questions: [
      {
        id: 'node-001',
        question: 'Explain the Node.js event loop and how it handles I/O.',
        difficulty: 'hard',
        answer: 'The event loop is a single-threaded loop that processes callbacks from the poll, check, and timers phases. I/O operations are delegated to the libuv thread-pool; once completed, their callbacks are queued and executed on the main thread, guaranteeing non-blocking behavior.',
        code: "// Simple HTTP server using the event loop\nconst http = require('http');\nhttp.createServer((req, res) => {\n  res.end('Hello World');\n}).listen(3000);\n\n// The callback is queued in the event loop, not executed immediately",
        codeLanguage: 'javascript'
      },
      {
        id: 'node-002',
        question: 'What is the difference between process.nextTick() and setImmediate()?',
        difficulty: 'medium',
        answer: 'process.nextTick() queues a micro-task that runs after the current operation completes, before I/O callbacks. setImmediate() queues a macro-task that runs on the check phase, after I/O callbacks. nextTick can starve the I/O loop if used excessively.',
        code: "process.nextTick(() => console.log('nextTick'));\nsetImmediate(() => console.log('setImmediate'));\n// Output order: nextTick then setImmediate",
        codeLanguage: 'javascript'
      },
      {
        id: 'node-003',
        question: 'How do streams work in Node.js?',
        difficulty: 'medium',
        answer: 'Streams are collections of data that might not be available all at once and don\'t have to fit in memory. They are instances of EventEmitter. There are 4 types: Readable, Writable, Duplex, and Transform. They are essential for handling large files or continuous data flows like network sockets.',
        code: "const fs = require('fs');\nconst readableStream = fs.createReadStream('large-file.txt');\nconst writableStream = fs.createWriteStream('output.txt');\n\n// Piping data from read to write stream\nreadableStream.pipe(writableStream);",
        codeLanguage: 'javascript'
      },
      {
        id: 'node-004',
        question: 'What is the Cluster module in Node.js and why is it used?',
        difficulty: 'hard',
        answer: 'Node.js runs in a single thread. The cluster module allows you to create child processes (workers) that run simultaneously and share the same server port. This helps take advantage of multi-core systems. The master process listens for connections and distributes them across the workers using a round-robin approach.',
        code: "const cluster = require('cluster');\nconst http = require('http');\nconst numCPUs = require('os').cpus().length;\n\nif (cluster.isMaster) {\n  for (let i = 0; i < numCPUs; i++) cluster.fork();\n} else {\n  http.createServer((req, res) => res.end('Hello')).listen(8000);\n}",
        codeLanguage: 'javascript'
      },
      {
        id: 'node-005',
        question: 'Explain how Node.js handles memory management and garbage collection.',
        difficulty: 'hard',
        answer: 'Node.js uses V8\'s garbage collector, a generational GC. Memory is divided into New Space (short-lived objects, collected by Scavenger) and Old Space (long-lived objects, collected by Mark-Sweep/Mark-Compact). Memory leaks often occur from global variables, unclosed closures, or forgotten event listeners.',
        codeLanguage: 'javascript'
      },
      {
        id: 'node-006',
        question: 'What are Worker Threads in Node.js?',
        difficulty: 'hard',
        answer: 'Worker Threads (introduced in v10.5.0) are useful for performing CPU-intensive JavaScript operations. Unlike the cluster module which creates entirely new processes, worker threads share memory (via SharedArrayBuffer) and run within the same process, reducing overhead. They do not help with I/O intensive work, which the native async I/O handles better.',
        code: "const { Worker, isMainThread, parentPort } = require('worker_threads');\n\nif (isMainThread) {\n  const worker = new Worker(__filename);\n  worker.on('message', msg => console.log(msg));\n} else {\n  parentPort.postMessage('Hello from Worker!');\n}",
        codeLanguage: 'javascript'
      },
      {
        id: 'node-007',
        question: 'How does require() resolve modules?',
        difficulty: 'medium',
        answer: 'require() follows these steps: 1. Resolving (finding absolute file path). 2. Loading (determining file content based on extension). 3. Wrapping (putting code inside an IIFE to give it local scope, __dirname, etc.). 4. Evaluating (V8 execution). 5. Caching (caching the module for future require calls).',
        codeLanguage: 'javascript'
      }
    ]
  },
  {
    id: 'express',
    title: 'Express.js & Web APIs',
    icon: '⚡',
    summary: 'Minimalist web framework for Node.js that provides routing, middleware, and HTTP utilities.',
    concepts: ['Routing', 'Middleware Stack', 'Error Handling', 'Request/Response Lifecycle', 'Router Modularization', 'Static File Serving', 'Security'],
    questions: [
      {
        id: 'express-001',
        question: 'How does middleware chaining work in Express?',
        difficulty: 'easy',
        answer: 'Each middleware receives (req, res, next). Calling next() passes control to the subsequent middleware. Order matters; early middlewares can modify req/res before later ones. If next() is not called and the response is not sent, the request hangs.',
        code: "const express = require('express');\nconst app = express();\n\napp.use((req, res, next) => {\n  console.log('Logger');\n  next();\n});\n\napp.get('/users', (req, res) => {\n  res.send('User list');\n});\n\napp.listen(3000);",
        codeLanguage: 'javascript'
      },
      {
        id: 'express-002',
        question: 'How do you handle errors centrally in Express?',
        difficulty: 'medium',
        answer: 'Express uses a special error-handling middleware that takes 4 arguments: (err, req, res, next). It must be placed at the very end of the middleware stack. Any synchronous error or error passed to next(err) will bypass regular middleware and hit this error handler.',
        code: "app.get('/error', (req, res, next) => {\n  const err = new Error('Something broke!');\n  next(err);\n});\n\n// Error handling middleware (must have 4 args)\napp.use((err, req, res, next) => {\n  console.error(err.message);\n  res.status(500).send('Internal Server Error');\n});",
        codeLanguage: 'javascript'
      },
      {
        id: 'express-003',
        question: 'What is the difference between app.use() and app.all()?',
        difficulty: 'medium',
        answer: 'app.use() mounts a middleware for any HTTP method on a path (and its sub-paths). app.all() is used to map logic to a specific path for ALL HTTP methods exactly (no sub-paths by default).',
        codeLanguage: 'javascript'
      },
      {
        id: 'express-004',
        question: 'How would you secure an Express application?',
        difficulty: 'hard',
        answer: '1. Use Helmet.js to set secure HTTP headers. 2. Use CORS properly. 3. Use express-rate-limit to prevent brute-force attacks. 4. Validate and sanitize inputs using express-validator. 5. Prevent SQL/NoSQL injection. 6. Disable X-Powered-By header. 7. Use HTTPS.',
        code: "const helmet = require('helmet');\nconst rateLimit = require('express-rate-limit');\n\napp.use(helmet());\napp.disable('x-powered-by');\n\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 100 // limit each IP to 100 requests per windowMs\n});\napp.use(limiter);",
        codeLanguage: 'javascript'
      }
    ]
  },
  {
    id: 'rest-graphql',
    title: 'API Design (REST & GraphQL)',
    icon: '🌐',
    summary: 'Design principles for web APIs, contrasting RESTful architecture with GraphQL graph queries.',
    concepts: ['RESTful Methods', 'Idempotency', 'Status Codes', 'HATEOAS', 'GraphQL Queries', 'Mutations', 'Resolvers', 'N+1 Problem'],
    questions: [
      {
        id: 'api-001',
        question: 'Explain Idempotency in REST APIs.',
        difficulty: 'medium',
        answer: 'An idempotent operation produces the same result no matter how many times it is executed. GET, PUT, and DELETE are idempotent (deleting a resource 10 times has the same end state as 1 time). POST is NOT idempotent, as calling it multiple times creates multiple resources. PATCH is usually not idempotent.',
        codeLanguage: 'javascript'
      },
      {
        id: 'api-002',
        question: 'What is the N+1 problem in GraphQL and how do you solve it?',
        difficulty: 'hard',
        answer: 'The N+1 problem occurs when a query fetches a list of N items, and the resolver for a nested field makes an additional database query for each item, resulting in N+1 total queries. It is solved using DataLoader, which batches and caches requests into a single bulk query (e.g., fetching all authors by an array of IDs at once).',
        codeLanguage: 'javascript'
      },
      {
        id: 'api-003',
        question: 'What is HATEOAS in REST?',
        difficulty: 'hard',
        answer: 'Hypermedia as the Engine of Application State (HATEOAS) is a constraint of the REST architecture. A client interacts with a network application entirely through hypermedia provided dynamically by the application servers. The response includes links to related resources and actions, allowing the client to navigate the API without hardcoding URLs.',
        codeLanguage: 'json'
      }
    ]
  }
];
