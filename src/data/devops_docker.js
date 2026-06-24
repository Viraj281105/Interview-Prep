export const dockerData = {
  id: 'devops-docker',
  title: 'Containers & Docker',
  icon: '🐳',
  summary: 'Containerization, images, volumes, networking, and Docker Compose.',
  concepts: ['Containers vs VMs', 'Images', 'Dockerfile', 'Volumes', 'Docker Compose', 'Networking', 'Namespaces & Cgroups'],
  
  learningLinks: [
    { title: 'Docker Tutorial', url: 'https://docs.docker.com/get-started/' },
    { title: 'Kubernetes Basics', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/' }
  ],
  questions: [
    { id: 'doc-001', question: 'What is Docker?', difficulty: 'easy', type: 'theory', answer: 'An open-source platform that automates the deployment, scaling, and management of applications inside lightweight, portable, self-sufficient containers.' },
    { id: 'doc-002', question: 'Containers vs Virtual Machines.', difficulty: 'medium', type: 'theory', answer: 'VMs abstract physical hardware; each VM requires a full Guest OS (heavy, slow boot, high memory overhead). Containers abstract the OS; they share the host\'s OS kernel and isolate applications using Linux Namespaces and Cgroups (lightweight, fast boot, low overhead).' },
    { id: 'doc-003', question: 'What are Linux Namespaces?', difficulty: 'hard', type: 'theory', answer: 'A Linux kernel feature that isolates and virtualizes system resources (Process IDs, Hostnames, User IDs, Network interfaces, IPC) for a collection of processes. This is what gives a container the illusion of being its own independent machine.' },
    { id: 'doc-004', question: 'What are Linux Cgroups (Control Groups)?', difficulty: 'hard', type: 'theory', answer: 'A Linux kernel feature that limits, accounts for, and isolates the resource usage (CPU, memory, disk I/O, network) of a collection of processes. It prevents one container from consuming all the host\'s resources.' },
    { id: 'doc-005', question: 'What is a Docker Image?', difficulty: 'easy', type: 'theory', answer: 'A read-only, immutable template containing instructions for creating a Docker container. It includes the application code, runtime, libraries, environment variables, and config files.' },
    { id: 'doc-006', question: 'What is a Docker Container?', difficulty: 'easy', type: 'theory', answer: 'A runnable instance of a Docker image. It is an isolated process running on the host machine. If an image is a class, a container is an instance of that class.' },
    { id: 'doc-007', question: 'How do Docker Image Layers work?', difficulty: 'medium', type: 'theory', answer: 'Images are built from a series of read-only layers representing instructions in the Dockerfile. Layers are cached. If you change a layer, all subsequent layers must be rebuilt. Containers add a thin, writable "container layer" on top of the image layers.' },
    { id: 'doc-008', question: 'What is Union File System (UnionFS)?', difficulty: 'hard', type: 'theory', answer: 'The underlying technology Docker uses to manage layers. It allows files and directories of separate file systems (branches) to be transparently overlaid, forming a single coherent file system. When a container writes a file, it uses Copy-On-Write to copy it from the read-only layer to the writable container layer.' },
    { id: 'doc-009', question: 'What is a Dockerfile?', difficulty: 'easy', type: 'theory', answer: 'A plain text document containing all the commands a user could call on the command line to assemble an image. It automates the image creation process.' },
    { id: 'doc-010', question: 'Explain the difference between `COPY` and `ADD` in a Dockerfile.', difficulty: 'medium', type: 'theory', answer: '`COPY` only copies files/directories from the local host into the image. `ADD` does the same but also supports downloading from URLs and automatically extracting local tar archives into the image. `COPY` is generally preferred for clarity unless extraction is specifically needed.' },
    { id: 'doc-011', question: 'Explain the difference between `CMD` and `ENTRYPOINT`.', difficulty: 'medium', type: 'theory', answer: 'Both define what runs when the container starts. `ENTRYPOINT` defines the executable to run (harder to override, makes the container run like a standard CLI tool). `CMD` provides default arguments to the `ENTRYPOINT` or the default command to run if no `ENTRYPOINT` is defined (easily overridden via `docker run`).' },
    { id: 'doc-012', question: 'How do you optimize a Dockerfile for build speed and size?', difficulty: 'medium', type: 'practical', answer: '1. Use lightweight base images (Alpine). 2. Order commands logically (infrequently changed layers like `npm install` before frequently changed layers like `COPY . .`) to maximize caching. 3. Use Multi-stage builds. 4. Use a `.dockerignore` file. 5. Chain commands with `&&` to reduce layer count.' },
    { id: 'doc-013', question: 'Write a basic Dockerfile for a Node.js app.', difficulty: 'easy', type: 'practical', answer: 'Standard multi-step Dockerfile.', code: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]` },
    { id: 'doc-014', question: 'What is a Multi-stage Build?', difficulty: 'medium', type: 'theory', answer: 'A technique using multiple `FROM` statements in a single Dockerfile. You can use one stage to build/compile the app (which needs heavy tools like compilers/SDKs), and then copy *only* the compiled artifacts into a fresh, minimal final image stage. This drastically reduces the final image size.' },
    { id: 'doc-015', question: 'Write a Multi-stage Dockerfile for a Go application.', difficulty: 'medium', type: 'practical', answer: 'Compile in a builder image, run in an alpine image.', code: `# Stage 1: Build
FROM golang:1.20-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o myapp main.go

# Stage 2: Run
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/myapp .
CMD ["./myapp"]` },
    { id: 'doc-016', question: 'What is `.dockerignore`?', difficulty: 'easy', type: 'practical', answer: 'A file that tells the Docker CLI which files/directories to ignore when copying context to the daemon (e.g., `node_modules`, `.git`, `.env`). It prevents sending large unnecessary files, speeds up builds, and prevents secrets from being baked into the image.' },
    { id: 'doc-017', question: 'What happens to data inside a container when the container is deleted?', difficulty: 'easy', type: 'theory', answer: 'By default, the data is permanently lost. Data written to the container\'s writable layer is deleted along with the container. To persist data, you must use Volumes or Bind Mounts.' },
    { id: 'doc-018', question: 'Docker Volumes vs Bind Mounts.', difficulty: 'medium', type: 'theory', answer: 'Volumes: Stored in a part of the host filesystem managed by Docker (`/var/lib/docker/volumes/`). Best for persistent DB data, isolated from the host OS, easily backed up. Bind Mounts: Map any file/directory from the host OS into the container. Good for development (live-reloading code), but relies on host directory structure.' },
    { id: 'doc-019', question: 'How do you create and attach a Docker Volume?', difficulty: 'easy', type: 'practical', answer: 'Create: `docker volume create my-vol`. Attach when running: `docker run -v my-vol:/app/data my-image` (or using the newer `--mount` syntax).' },
    { id: 'doc-020', question: 'What is a `tmpfs` mount?', difficulty: 'hard', type: 'theory', answer: 'A mount that stores data in the host\'s RAM rather than on disk. It is completely temporary and never written to the host filesystem. Good for security (storing sensitive keys temporarily) or high-performance temporary caching where persistence isn\'t needed.' },
    { id: 'doc-021', question: 'Explain the default Docker Network drivers.', difficulty: 'medium', type: 'theory', answer: '1. `bridge`: Default. Private internal network created on the host; containers on the same bridge can communicate. 2. `host`: Removes network isolation; container uses the host\'s network directly. 3. `none`: Disables networking. 4. `overlay`: Used in Docker Swarm to connect multiple Docker daemons across different hosts.' },
    { id: 'doc-022', question: 'How do two containers communicate with each other?', difficulty: 'medium', type: 'practical', answer: 'Create a custom bridge network (`docker network create my-net`), then run both containers attached to that network (`docker run --network my-net ...`). They can now communicate using their container names as DNS hostnames (e.g., `ping db-container`).' },
    { id: 'doc-023', question: 'What does exposing a port actually do?', difficulty: 'easy', type: 'theory', answer: 'The `EXPOSE` instruction in a Dockerfile functions as documentation; it doesn\'t actually publish the port. To make a port accessible from the host/outside world, you must use the `-p hostPort:containerPort` flag during `docker run`.' },
    { id: 'doc-024', question: 'What is Docker Compose?', difficulty: 'easy', type: 'theory', answer: 'A tool for defining and running multi-container Docker applications. You use a YAML file (`docker-compose.yml`) to configure your application\'s services, networks, and volumes, then create and start everything with a single command (`docker-compose up`).' },
    { id: 'doc-025', question: 'Write a basic `docker-compose.yml` for a Node app and Postgres.', difficulty: 'medium', type: 'practical', answer: 'Define services, ports, environment variables, and volumes.', code: `version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      - DB_HOST=db
  db:
    image: postgres:14
    environment:
      - POSTGRES_PASSWORD=secret
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:` },
    { id: 'doc-026', question: 'What does `depends_on` do in Docker Compose?', difficulty: 'medium', type: 'theory', answer: 'It expresses dependency order. `docker-compose up` will start services in dependency order (e.g., start the DB before the app). However, it only waits for the container to start, NOT for the application inside it (like Postgres) to be "ready" to accept connections.' },
    { id: 'doc-027', question: 'How do you handle a container needing to wait for a DB to be "ready"?', difficulty: 'hard', type: 'practical', answer: '1. App-level retry logic (best practice: app tries to connect, catches error, waits 2s, tries again). 2. Use a wait script in the container\'s entrypoint (like `wait-for-it.sh` or `dockerize`) to poll the DB port until it accepts connections before starting the app.' },
    { id: 'doc-028', question: 'What is Docker Swarm?', difficulty: 'medium', type: 'theory', answer: 'Docker\'s native clustering and orchestration tool. It turns a pool of Docker hosts into a single, virtual Docker host. It provides high availability, load balancing, and scaling. (Largely superseded by Kubernetes in the enterprise).' },
    { id: 'doc-029', question: 'How do you clean up unused Docker resources?', difficulty: 'easy', type: 'practical', answer: 'Run `docker system prune`. This removes all stopped containers, all dangling networks, unused anonymous volumes, and all dangling images. Add `-a` to also remove unused but non-dangling images.' },
    { id: 'doc-030', question: 'What is a Dangling Image?', difficulty: 'easy', type: 'theory', answer: 'An image that has no name/tag (shows up as `<none>:<none>`). This happens when you build a new version of an image with the same name and tag as an existing image; the old image loses its tag and becomes dangling.' },
    { id: 'doc-031', question: 'How do you run a container in the background?', difficulty: 'easy', type: 'practical', answer: 'Use the `-d` (detached) flag. `docker run -d my-image`. The container will run in the background and print the container ID to the terminal.' },
    { id: 'doc-032', question: 'How do you access the shell of a running container?', difficulty: 'easy', type: 'practical', answer: 'Use the `exec` command with interactive/tty flags. `docker exec -it <container_id> /bin/sh` (or `/bin/bash`).' },
    { id: 'doc-033', question: 'What is the Docker Daemon?', difficulty: 'medium', type: 'theory', answer: 'The background service (`dockerd`) running on the host OS. It listens for Docker API requests and manages Docker objects like images, containers, networks, and volumes. The Docker Client CLI communicates with the Daemon.' },
    { id: 'doc-034', question: 'How can a Docker container run as a non-root user?', difficulty: 'medium', type: 'practical', answer: 'By default, containers run as root. For security, create a user in the Dockerfile and use the `USER` instruction to switch to it before the `CMD`.', code: `FROM node:alpine
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY . .
RUN chown -R appuser:appgroup /app
USER appuser
CMD ["node", "app.js"]` },
    { id: 'doc-035', question: 'What is Docker Context?', difficulty: 'hard', type: 'theory', answer: 'A mechanism to manage connections to multiple Docker Daemons. You can have a context for your local daemon, and another context pointing to a remote daemon (via SSH or TLS). You switch contexts (`docker context use remote`) to execute CLI commands against different hosts.' },
    { id: 'doc-036', question: 'What is Docker Buildx?', difficulty: 'hard', type: 'theory', answer: 'A CLI plugin that extends the `docker build` command with the full support of the features provided by Moby BuildKit builder toolkit. Crucially, it allows building multi-platform images (e.g., targeting both `linux/amd64` and `linux/arm64` like Apple Silicon) concurrently.' },
    { id: 'doc-037', question: 'How do you pass Environment Variables to a container?', difficulty: 'easy', type: 'practical', answer: '1. In Dockerfile using `ENV key=value`. 2. At runtime using the `-e` flag: `docker run -e DB_PASS=secret image`. 3. At runtime using an env file: `docker run --env-file ./env.list image`.' },
    { id: 'doc-038', question: 'What is the difference between `ARG` and `ENV` in a Dockerfile?', difficulty: 'medium', type: 'theory', answer: '`ARG` defines build-time variables. They are only available during the `docker build` process and are not persisted in the final image. `ENV` defines runtime variables. They are available during the build AND persist as environment variables when the container runs.' },
    { id: 'doc-039', question: 'How does Docker handle Logging?', difficulty: 'medium', type: 'theory', answer: 'By default, Docker captures standard output (`stdout`) and standard error (`stderr`) of the container\'s main process and routes them to the `json-file` logging driver. You view them via `docker logs`. Drivers can be changed (e.g., syslog, fluentd, splunk, awslogs).' },
    { id: 'doc-040', question: 'What happens if a container\'s main process (PID 1) exits?', difficulty: 'easy', type: 'theory', answer: 'The container itself will exit. A container\'s lifecycle is inextricably tied to the lifecycle of its PID 1 process. If you run a background script and the main command finishes, the container dies.' },
    { id: 'doc-041', question: 'Why shouldn\'t you run multiple services (DB + Web) in one container?', difficulty: 'medium', type: 'theory', answer: 'It violates the "separation of concerns" microservices philosophy. It makes scaling impossible (you can\'t scale the web app without also spinning up another DB instance), makes logging/monitoring complex, and makes upgrades difficult. Use Docker Compose instead.' },
    { id: 'doc-042', question: 'What is an Orphaned Volume?', difficulty: 'easy', type: 'theory', answer: 'A volume that is no longer attached to any container. Over time, these can consume significant disk space. Cleaned up via `docker volume prune`.' },
    { id: 'doc-043', question: 'What is Docker Hub?', difficulty: 'easy', type: 'theory', answer: 'Docker\'s official cloud-based registry service where you can find, share, and store Docker images. You can push custom images there or pull public base images (like `node`, `ubuntu`, `postgres`).' },
    { id: 'doc-044', question: 'How do you gracefully stop a container?', difficulty: 'medium', type: 'theory', answer: 'Use `docker stop <container>`. This sends a `SIGTERM` signal to PID 1, giving the app time to clean up connections and exit gracefully. If it doesn\'t exit within a grace period (default 10s), Docker sends `SIGKILL` to force quit. `docker kill` sends `SIGKILL` immediately.' },
    { id: 'doc-045', question: 'What is a "Distroless" image?', difficulty: 'hard', type: 'theory', answer: 'Images provided by Google that contain ONLY your application and its runtime dependencies. They do not contain package managers, shells (no `sh` or `bash`), or any other programs you would expect in a standard Linux distribution. Massively reduces attack surface.' },
    { id: 'doc-046', question: 'How does container port mapping work internally?', difficulty: 'hard', type: 'theory', answer: 'Docker uses `iptables` rules on the Linux host. When you map `-p 8080:80`, Docker adds a NAT (Network Address Translation) rule to the host\'s firewall that forwards incoming traffic on port 8080 to the container\'s internal IP address on port 80.' },
    { id: 'doc-047', question: 'How do you check a container\'s resource usage?', difficulty: 'easy', type: 'practical', answer: 'Use the `docker stats` command. It provides a live stream of CPU, memory usage, network I/O, and block I/O for all running containers.' },
    { id: 'doc-048', question: 'What are Healthchecks in Docker?', difficulty: 'medium', type: 'practical', answer: 'A Dockerfile instruction (`HEALTHCHECK`) or Compose setting that tells Docker how to test if a container is still working. Docker executes the command periodically. If it fails consecutively, the container is marked as "unhealthy". Useful for orchestrators to know when to restart.' },
    { id: 'doc-049', question: 'How do you backup a Docker Volume?', difficulty: 'medium', type: 'practical', answer: 'Spin up a temporary container, mount the volume you want to backup, mount a host directory, and run `tar` to archive the volume data into the host directory.', code: `docker run --rm -v my-vol:/volume -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz -C /volume .` },
    { id: 'doc-050', question: 'What is the purpose of the `.docker/config.json` file?', difficulty: 'medium', type: 'theory', answer: 'It stores Docker client configurations, primarily authentication credentials (or pointers to credential helpers) for Docker registries you have logged into using `docker login`.' }
  ]
};
