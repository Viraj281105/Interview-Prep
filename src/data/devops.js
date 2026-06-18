export const devopsData = [
  {
    id: 'containers',
    title: 'Containers & Orchestration',
    icon: '🐳',
    summary: 'Packaging applications with Docker and scaling them with Kubernetes.',
    concepts: ['Docker', 'Images vs Containers', 'Dockerfile', 'Kubernetes (K8s)', 'Pods', 'Deployments', 'Services', 'Ingress'],
    questions: [
      {
        id: 'dev-001',
        question: 'What is the difference between a Virtual Machine and a Container?',
        difficulty: 'medium',
        answer: 'A Virtual Machine (VM) includes the app, necessary binaries/libraries, and an entire guest operating system, all running on top of a hypervisor. A container includes the app and its dependencies but shares the host OS kernel with other containers. This makes containers much more lightweight, faster to start, and less resource-intensive.',
        codeLanguage: 'text'
      },
      {
        id: 'dev-002',
        question: 'Explain the Docker architecture.',
        difficulty: 'hard',
        answer: 'Docker uses a client-server architecture. The Docker Client talks to the Docker Daemon (dockerd), which does the heavy lifting of building, running, and distributing containers. They communicate via REST API. Docker Registries (like Docker Hub) store images. An Image is a read-only template with instructions to create a container. A Container is a runnable instance of an image.',
        codeLanguage: 'text'
      },
      {
        id: 'dev-003',
        question: 'What is a Pod in Kubernetes?',
        difficulty: 'medium',
        answer: 'A Pod is the smallest, most basic deployable object in Kubernetes. It represents a single instance of a running process in your cluster. A Pod can contain one or more containers (tightly coupled) that share the same network namespace (IP address and ports) and storage volumes. They are ephemeral and meant to be replaced if they fail.',
        codeLanguage: 'text'
      },
      {
        id: 'dev-004',
        question: 'Explain K8s Deployments vs Services.',
        difficulty: 'hard',
        answer: 'A Deployment manages the creation and scaling of Pods. It ensures the desired number of Pod replicas are running and handles rolling updates. Because Pods are ephemeral and their IP addresses change, a Service provides a stable, abstract IP address and DNS name to load-balance traffic across a logical set of Pods.',
        codeLanguage: 'text'
      }
    ]
  },
  {
    id: 'cicd',
    title: 'CI/CD & Cloud',
    icon: '☁️',
    summary: 'Continuous Integration, Continuous Deployment, Infrastructure as Code, and Cloud providers.',
    concepts: ['CI/CD Pipelines', 'GitHub Actions', 'Jenkins', 'Terraform', 'AWS', 'S3', 'EC2', 'Serverless'],
    questions: [
      {
        id: 'dev-005',
        question: 'What is CI/CD?',
        difficulty: 'easy',
        answer: 'Continuous Integration (CI) is the practice of automatically building and testing code every time a developer commits changes. Continuous Deployment/Delivery (CD) automatically deploys the successfully tested code to a staging or production environment. This ensures rapid, reliable software release cycles.',
        codeLanguage: 'text'
      },
      {
        id: 'dev-006',
        question: 'What is Infrastructure as Code (IaC)?',
        difficulty: 'medium',
        answer: 'IaC is the process of managing and provisioning computing infrastructure (networks, VMs, load balancers) through machine-readable definition files (like Terraform, CloudFormation, or Ansible playbooks) rather than physical hardware configuration or interactive configuration tools. It enables version control, reproducibility, and automation for infrastructure.',
        codeLanguage: 'hcl'
      },
      {
        id: 'dev-007',
        question: 'Explain Serverless computing.',
        difficulty: 'medium',
        answer: 'Serverless (e.g., AWS Lambda) allows developers to build and run applications without managing servers. The cloud provider automatically provisions, scales, and manages the infrastructure required to run the code. You only pay for the exact compute time consumed (down to milliseconds) rather than pre-purchasing capacity.',
        codeLanguage: 'text'
      }
    ]
  }
];
