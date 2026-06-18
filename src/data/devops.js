export const devopsData = [
  {
    id: 'devops',
    title: 'DevOps & Site Reliability Engineering',
    icon: '⚙️',
    summary: 'Practices, tools, and concepts for continuous delivery, automation, and reliability of software systems.',
    concepts: ['CI/CD', 'Infrastructure as Code', 'Containers', 'Kubernetes', 'Monitoring', 'Logging', 'GitOps', 'Terraform', 'Ansible', 'Site Reliability Engineering'],
    questions: [
      {
        id: 'devops-001',
        question: 'What is the difference between continuous integration, continuous delivery, and continuous deployment?',
        difficulty: 'easy',
        answer: 'Continuous Integration (CI) automatically builds and tests code on each commit. Continuous Delivery (CD) ensures the codebase is always in a deployable state and can be released with a manual approval step. Continuous Deployment automates the release step as well, deploying every change that passes tests to production automatically.',
        code: '',
        codeLanguage: ''
      },
      {
        id: 'devops-002',
        question: 'Explain how Kubernetes implements service discovery and load balancing.',
        difficulty: 'medium',
        answer: 'Kubernetes creates a DNS entry for each Service (ClusterIP) that resolves to a virtual IP. kube-proxy routes traffic to the Service IP and forwards it to one of the backing Pods using iptables or IPVS, providing load balancing across Pod endpoints. For external traffic, a LoadBalancer Service or Ingress controller can expose the Service and perform L7 routing.',
        code: "apiVersion: v1\nkind: Service\nmetadata:\n  name: my-service\nspec:\n  selector:\n    app: my-app\n  ports:\n    - protocol: TCP\n      port: 80\n      targetPort: 8080",
        codeLanguage: 'yaml'
      },
      {
        id: 'devops-003',
        question: 'What is infrastructure as code (IaC) and why is it important?',
        difficulty: 'easy',
        answer: 'IaC means defining and managing infrastructure (servers, networks, databases) with declarative or imperative code (e.g., Terraform, CloudFormation). It enables version control, reproducibility, automated provisioning, and reduces manual configuration drift, leading to faster, more reliable deployments.',
        code: "resource \"aws_instance\" \"example\" {\n  ami           = \"ami-0c55b159cbfafe1f0\"\n  instance_type = \"t2.micro\"\n}\n",
        codeLanguage: 'hcl'
      }
    ]
  }
];
