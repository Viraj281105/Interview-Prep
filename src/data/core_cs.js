export const coreCsData = [
  {
    id: 'os',
    title: 'Operating Systems',
    icon: '🖥️',
    summary: 'Core OS concepts including processes, threads, memory management, and concurrency.',
    concepts: ['Processes vs Threads', 'Context Switching', 'Deadlocks', 'Mutex & Semaphores', 'Virtual Memory', 'Paging vs Segmentation'],
    questions: [
      {
        id: 'os-001',
        question: 'What is the difference between a Process and a Thread?',
        difficulty: 'medium',
        answer: 'A Process is an executing instance of an application with its own independent memory space. A Thread is the smallest sequence of programmed instructions managed by a scheduler, running within a process. Threads within the same process share the same memory space (data and heap segments), but have their own stack and registers. Context switching between threads is much faster than between processes.',
        codeLanguage: 'text'
      },
      {
        id: 'os-002',
        question: 'What is a Deadlock and what are the 4 Coffman conditions?',
        difficulty: 'hard',
        answer: 'A deadlock occurs when two or more threads hold resources and wait indefinitely for resources held by each other. The 4 necessary conditions are: 1. Mutual Exclusion (resources cannot be shared). 2. Hold and Wait (processes hold resources while waiting for others). 3. No Preemption (resources cannot be forcibly taken). 4. Circular Wait (a closed chain of processes waiting on each other).',
        codeLanguage: 'text'
      },
      {
        id: 'os-003',
        question: 'Explain Virtual Memory and Paging.',
        difficulty: 'hard',
        answer: 'Virtual Memory is an abstraction that gives an application the illusion of having a contiguous, isolated memory space, even if physical RAM is fragmented or full (using disk swap). Paging divides virtual memory into fixed-size "pages" and physical memory into "frames". The OS (with the MMU) maps pages to frames. A Page Fault occurs when a program accesses a page not currently in physical RAM, requiring the OS to fetch it from disk.',
        codeLanguage: 'text'
      },
      {
        id: 'os-004',
        question: 'What is the difference between a Mutex and a Semaphore?',
        difficulty: 'medium',
        answer: 'A Mutex (Mutual Exclusion) provides locking mechanism to ensure only ONE thread can access a critical section at a time. The thread that locks it must unlock it. A Semaphore is a signaling mechanism containing a counter. A binary semaphore acts like a mutex (0 or 1). A counting semaphore allows a specified number of threads (N) to access a resource pool simultaneously. Wait() decrements, Signal() increments.',
        codeLanguage: 'c'
      }
    ]
  },
  {
    id: 'networking',
    title: 'Networking',
    icon: '🌐',
    summary: 'Internet protocols, OSI model, and how data moves across the web.',
    concepts: ['OSI Model', 'TCP/IP', 'HTTP/HTTPS', 'DNS', 'WebSockets', 'TCP Handshake', 'BGP'],
    questions: [
      {
        id: 'net-001',
        question: 'Explain the 7 layers of the OSI Model.',
        difficulty: 'hard',
        answer: '1. Physical (Cables, bits). 2. Data Link (MAC addresses, switches, frames). 3. Network (IP addresses, routers, packets). 4. Transport (TCP/UDP, ports, segments). 5. Session (establishing/terminating connections). 6. Presentation (encryption, compression, data formats). 7. Application (HTTP, FTP, SMTP, closest to user).',
        codeLanguage: 'text'
      },
      {
        id: 'net-002',
        question: 'Describe the TCP 3-way handshake.',
        difficulty: 'medium',
        answer: 'Used to establish a reliable connection. 1. SYN: Client sends a SYN (synchronize) packet to the server to initiate connection. 2. SYN-ACK: Server receives SYN, allocates buffers, and replies with a SYN-ACK (acknowledge). 3. ACK: Client receives SYN-ACK, allocates buffers, and sends an ACK back to the server. Connection is established.',
        codeLanguage: 'text'
      },
      {
        id: 'net-003',
        question: 'What happens when you type a URL into a browser?',
        difficulty: 'hard',
        answer: '1. Browser checks cache for DNS record; if missing, calls OS, then DNS resolver. 2. DNS resolution finds the IP address. 3. Browser initiates TCP connection (3-way handshake) with the server. 4. If HTTPS, TLS handshake occurs for encryption. 5. Browser sends HTTP GET request. 6. Server handles request and sends HTTP response. 7. Browser parses HTML, fetches assets (CSS, JS, images), builds DOM/CSSOM, and renders the page.',
        codeLanguage: 'text'
      },
      {
        id: 'net-004',
        question: 'How does HTTPS provide security?',
        difficulty: 'medium',
        answer: 'HTTPS uses TLS (Transport Layer Security) to encrypt HTTP requests and responses. It relies on asymmetric public key infrastructure (PKI). The server provides a digital certificate (issued by a trusted CA) containing its public key. Client and server use asymmetric encryption to securely exchange a symmetric session key. The symmetric key is then used for fast, secure data encryption for the rest of the session.',
        codeLanguage: 'text'
      }
    ]
  }
];
