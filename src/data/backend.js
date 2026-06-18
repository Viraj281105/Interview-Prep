export const backendData = [
  {
    id: 'nodejs',
    title: 'Node.js',
    icon: '🟢',
    summary: 'JavaScript runtime built on Chrome V8, enabling server‑side development with non‑blocking I/O and event‑driven architecture.',
    concepts: ['Event Loop', 'Callback Queue', 'Streams', 'Cluster Module', 'Middleware', 'Package Management (npm/yarn)', 'Process Management', 'Asynchronous Patterns'],
    questions: [
      {
        id: 'node-001',
        question: 'Explain the Node.js event loop and how it handles I/O.',
        difficulty: 'hard',
        answer: 'The event loop is a single‑threaded loop that processes callbacks from the poll, check, and timers phases. I/O operations are delegated to the libuv thread‑pool; once completed, their callbacks are queued and executed on the main thread, guaranteeing non‑blocking behavior.',
        code: "// Simple HTTP server using the event loop\nconst http = require('http');\nhttp.createServer((req, res) => {\n  res.end('Hello World');\n}).listen(3000);\n\n// The callback is queued in the event loop, not executed immediately",
        codeLanguage: 'javascript'
      },
      {
        id: 'node-002',
        question: 'What is the difference between process.nextTick() and setImmediate()?',
        difficulty: 'medium',
        answer: 'process.nextTick() queues a micro‑task that runs after the current operation completes, before I/O callbacks. setImmediate() queues a macro‑task that runs on the check phase, after I/O callbacks. nextTick can starve the I/O loop if used excessively.',
        code: "process.nextTick(() => console.log('nextTick'));\nsetImmediate(() => console.log('setImmediate'));\n// Output order: nextTick then setImmediate",
        codeLanguage: 'javascript'
      }
    ]
  },
  {
    id: 'express',
    title: 'Express.js',
    icon: '⚡',
    summary: 'Minimalist web framework for Node.js that provides routing, middleware, and HTTP utilities.',
    concepts: ['Routing', 'Middleware Stack', 'Error Handling', 'Request/Response Lifecycle', 'Router Modularization', 'Static File Serving'],
    questions: [
      {
        id: 'express-001',
        question: 'How does middleware chaining work in Express?',
        difficulty: 'easy',
        answer: 'Each middleware receives (req, res, next). Calling next() passes control to the subsequent middleware. Order matters; early middlewares can modify req/res before later ones.',
        code: "const express = require('express');\nconst app = express();\n\napp.use((req, res, next) => {\n  console.log('Logger');\n  next();\n});\n\napp.get('/users', (req, res) => {\n  res.send('User list');\n});\n\napp.listen(3000);",
        codeLanguage: 'javascript'
      }
    ]
  }
];
