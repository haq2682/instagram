# Instagram Clone

> A full-stack, production-style Instagram clone with a real-time chat system, OAuth login, and a complete cloud-native DevOps pipeline (Docker → GitHub Actions → Trivy → ArgoCD → Kubernetes, provisioned with Terraform and Ansible, observed with Prometheus/Grafana).

**Short summary:** This project re-implements the core Instagram experience — feed, posts (images/videos), comments & threaded replies, likes, stories-style profile browsing, saved posts, real-time direct messaging, follow requests, notifications, and account settings (privacy, blocked users, close friends) — on a MERN-adjacent stack (MongoDB, Express 5, React 19, Node.js) with Socket.IO for real-time features. Beyond the application itself, the repository is built as a DevOps learning/reference project: every layer of the deployment path is codified, from bare-metal dependency installation (Ansible) to infrastructure provisioning (Terraform) to container builds and vulnerability scanning (GitHub Actions + Trivy) to GitOps continuous delivery (ArgoCD) on Kubernetes, with autoscaling, network policies, and full metrics/dashboarding (Prometheus + Grafana).

---

## Table of Contents

1. [About the Project](#about-the-project)
2. [Feature List](#feature-list)
3. [Tech Stack](#tech-stack)
4. [Minimum System Requirements](#minimum-system-requirements)
5. [Architecture Diagrams](#architecture-diagrams)
   - [Infrastructure Architecture](#infrastructure-architecture)
   - [DevOps Pipeline Architecture](#devops-pipeline-architecture)
6. [Project File Structure](#project-file-structure)
7. [Environment Setup](#environment-setup)
   - [Local Development](#local-development)
   - [Docker Compose Setup](#docker-compose-setup)
   - [Environment Variables](#environment-variables)
   - [Kubernetes / GitOps Setup](#kubernetes--gitops-setup)
8. [Available Scripts](#available-scripts)
9. [Monitoring & Observability](#monitoring--observability)
10. [Security Notes](#security-notes)
11. [Contributing](#contributing)

---

## About the Project

Instagram Clone is a social media web application that mirrors Instagram's core social-networking loop: users sign up (locally, or via Google/Facebook OAuth), build a profile, follow/unfollow other users (with public/private account support and follow-request approval), post images and videos, engage via likes/comments/threaded replies, save posts, message each other in real time (including group chats, media attachments, typing indicators, delivered/seen receipts), and manage their account through granular privacy, notification, blocking, and close-friends settings.

The application is split into two independently deployable services:
- **Frontend** — a React 19 single-page application built with Vite, served in production via Nginx, which also acts as a reverse proxy to the backend for API/WebSocket traffic.
- **Backend** — a Node.js/Express 5 REST + WebSocket API backed by MongoDB (via Mongoose), handling auth, media uploads, video compression, real-time chat (Socket.IO), and exposing Prometheus-compatible metrics.

Around the application, the repo also ships a complete, opinionated DevOps pipeline used to provision infrastructure, build and scan container images, and continuously deliver the app to a Kubernetes cluster using GitOps — making this a useful reference for both the application layer and the platform/DevOps layer of a modern web product.

## Feature List

**Authentication & Accounts**
- Email/password registration and login with hashed passwords (bcrypt) and JWT-based sessions
- OAuth login via Google and Facebook (Passport.js strategies)
- Email verification flow
- Forgot/reset password flow
- Persistent sessions backed by MongoDB (`connect-mongo`)

**Social Graph**
- Follow / unfollow users
- Private accounts with follow request → accept/decline/cancel workflow
- Remove followers
- Close Friends list
- Block / unblock users
- User search and "suggested users"

**Posts & Media**
- Create posts with multiple images/videos (carousel/slider support)
- Video upload with server-side compression (FFmpeg)
- Like posts, comments, and replies
- Threaded comments with replies
- Save posts to a personal collection
- Share posts
- Report posts/comments
- Explore/discovery feed and dedicated post page with zoom/pan viewer

**Real-Time Messaging**
- One-to-one and group chats (Socket.IO)
- Group admin management (make/remove admin)
- Media messages (image/video) with automatic video compression
- Message replies, likes, delivered/seen receipts
- Typing indicators and online/offline presence
- Unseen message counters (global and per-room)
- Emoji picker support

**Notifications & Settings**
- In-app notifications
- Notification preference settings
- Account privacy toggle (public/private)
- Help/support section
- Light/Dark theme switcher

**Platform / DevOps**
- Prometheus metrics endpoint (`/metrics`) with custom HTTP request counters/histograms and default Node.js process metrics
- Health check endpoint (`/health`) used by Kubernetes probes
- Fully containerized frontend and backend (multi-stage Docker builds)
- CI pipeline: automated tests, linting, Docker builds, and Trivy vulnerability scanning
- GitOps continuous delivery via ArgoCD (auto-sync, self-heal, auto-prune) with ArgoCD Image Updater
- Kubernetes manifests for Deployments, Services, Ingress, HPA/VPA, PodDisruptionBudgets, NetworkPolicies, PVCs, and a custom StorageClass, managed via Kustomize
- Infrastructure-as-Code with Terraform (namespaces, ArgoCD, Prometheus stack via Helm)
- Automated host/cluster provisioning with Ansible (Docker, kubeadm/Minikube, Helm, Terraform, ArgoCD CLI)
- Cluster observability via kube-prometheus-stack (Prometheus + Grafana), scraping app metrics through a `ServiceMonitor`

## Tech Stack

### Frontend
| Technology | Why it was used |
|---|---|
| **React 19** | Component-driven UI with the latest concurrent rendering features for a snappy, app-like feed/chat experience. |
| **Vite** | Near-instant dev server start and HMR, and significantly faster production builds than a Webpack-based CRA setup — replaced Create React App for this reason. |
| **Redux Toolkit + Redux Persist** | Predictable global state (auth/session, notification bar) that survives page reloads without re-fetching. |
| **React Router v7** | Client-side routing for the SPA (feed, profile, explore, messages, settings, etc.). |
| **Tailwind CSS + NextUI (HeroUI) + Framer Motion** | Utility-first styling for rapid UI iteration, a pre-built accessible component layer, and smooth micro-animations (modals, transitions, loaders). |
| **Socket.IO Client** | Real-time bidirectional communication for chat, typing indicators, presence, and live notification counts. |
| **Formik** | Form state and validation for auth and settings forms. |
| **Axios** | HTTP client for REST calls to the backend API. |
| **Vitest + Testing Library** | Fast, Vite-native unit/component testing that shares config with the build tool (no separate Jest transform pipeline). |

### Backend
| Technology | Why it was used |
|---|---|
| **Node.js + Express 5** | Lightweight, battle-tested HTTP server for a JSON REST API, with first-class middleware support for auth, sessions, and static file/upload serving. |
| **MongoDB + Mongoose** | Flexible, document-oriented schema is a natural fit for nested/social data (posts with media, threaded comments/replies, chats with delivered/seen sub-collections) that would require many joins in a relational model. |
| **Socket.IO** | Enables real-time chat, presence, typing indicators, and delivery/read receipts over WebSockets with automatic fallback. |
| **Passport.js (Local, Google OAuth, Facebook OAuth)** | Standardized, pluggable authentication strategy layer supporting both credential-based and social login without hand-rolling OAuth flows. |
| **JWT + express-session + connect-mongo** | Stateless API auth (JWT) combined with server-side session persistence in MongoDB for OAuth/session-based flows. |
| **bcrypt** | Industry-standard one-way password hashing. |
| **Multer + GridFS-Stream** | Multipart file upload handling and large media storage/streaming through MongoDB GridFS. |
| **fluent-ffmpeg (FFmpeg)** | Server-side video compression/transcoding before storing chat/post video attachments, keeping storage and bandwidth costs down. |
| **prom-client** | Exposes a `/metrics` endpoint in Prometheus exposition format for cluster-native scraping and alerting. |

### DevOps & Infrastructure
| Technology | Why it was used |
|---|---|
| **Docker (multi-stage builds)** | Small, reproducible production images — dependency install and build stages are discarded, leaving a minimal Alpine/Nginx runtime image. |
| **GitHub Actions** | CI pipeline that runs tests/lint, then builds and pushes Docker images, gated by test success. |
| **Trivy** | Automated container vulnerability scanning on every image build to catch known CVEs before deployment. |
| **Kubernetes (Kustomize)** | Declarative, environment-overlay-friendly orchestration of Deployments, Services, Ingress, autoscalers, and network policy for both tiers. |
| **ArgoCD (+ Image Updater)** | GitOps continuous delivery — the cluster state is continuously reconciled against this Git repo (`.k8s/bases`), with automated pruning, self-healing, and image auto-updates. |
| **Terraform** | Reproducible provisioning of Kubernetes namespaces and cluster add-ons (ArgoCD, Prometheus stack) via the Kubernetes and Helm providers, instead of manual `kubectl`/`helm` commands. |
| **Ansible** | Idempotent, one-command bootstrap of a host into a full container/Kubernetes toolchain (Docker, kubeadm, kubectl, Minikube, Helm, Terraform, ArgoCD CLI) — removes manual environment drift between machines. |
| **Prometheus + Grafana (kube-prometheus-stack)** | Cluster and application-level metrics collection, alerting rules, and dashboards, scraping the app's custom `/metrics` endpoint via a `ServiceMonitor`. |
| **Nginx** | Serves the built frontend as static assets and reverse-proxies API/WebSocket routes to the backend service inside the cluster, avoiding CORS/cross-origin complexity in production. |

## Minimum System Requirements

### Local Development (running frontend + backend + MongoDB directly)
| Resource | Minimum | Recommended |
|---|---|---|
| CPU | 2 cores | 4 cores |
| RAM | 4 GB | 8 GB |
| Disk | 2 GB free | 5 GB free (node_modules, uploads, media) |
| Node.js | v20.x | v20.x LTS |
| MongoDB | v6+ (local) or MongoDB Atlas | v7+ |
| Network | Outbound access for Google/Facebook OAuth and MongoDB Atlas | — |

### Full DevOps Pipeline (Minikube cluster running ArgoCD, Prometheus/Grafana, and both app tiers)
| Resource | Minimum | Recommended |
|---|---|---|
| CPU | 4 cores | 8 cores |
| RAM | 8 GB | 16 GB |
| Disk | 20 GB free | 40 GB+ free |
| Kubernetes | v1.34+ (Minikube, Docker driver) | v1.35 |
| Helm | v3.x | v3.x (latest) |
| Terraform | v1.5+ | latest 1.x |

> Per-pod requests/limits are defined in [`.k8s/bases/deployment.yaml`](.k8s/bases/deployment.yaml): each frontend/backend pod requests `100m` CPU / `128Mi` RAM and is capped at `2` CPU / `2Gi` RAM, with 3–10 replicas per tier under the HPA ([`.k8s/bases/hpa.yaml`](.k8s/bases/hpa.yaml)). At minimum replica count (3+3 pods) budget for at least **600m CPU / 768Mi RAM** just for app pods, before ArgoCD, Prometheus, and Grafana overhead.

## Architecture Diagrams

### Infrastructure Architecture

> _Placeholder — insert the project's infrastructure architecture diagram here (e.g., exported from draw.io, Excalidraw, or Lucidchart), showing the Minikube cluster, `dev`/`staging`/`argocd`/`monitoring` namespaces, frontend/backend Deployments + Services + Ingress, PVCs/StorageClass, MongoDB Atlas, and NetworkPolicy boundaries._
>
> ```
> [ Diagram image goes here: docs/diagrams/infrastructure-architecture.png ]
> ```

### DevOps Pipeline Architecture

> _Placeholder — insert the CI/CD pipeline diagram here, showing: Git push → GitHub Actions (test/lint → Docker build → Trivy scan → push to DockerHub) → ArgoCD (Git-watched auto-sync on `.k8s/bases`) → Kubernetes (Kustomize-applied manifests) → Prometheus/Grafana scraping `/metrics`._
>
> ```
> [ Diagram image goes here: docs/diagrams/devops-pipeline-architecture.png ]
> ```

## Project File Structure

```
instagram/
├── .ansible/                    # Host/cluster provisioning (Ansible)
│   ├── install-deps.yaml        # Top-level playbook: Docker, K8s, Helm, ArgoCD CLI, Terraform
│   ├── inventory.ini            # Ansible inventory (target hosts)
│   └── deps/                    # Per-tool install tasks (docker, kubernetes, helm, terraform, argocd)
│
├── .docker/                     # Container build definitions
│   ├── backend/Dockerfile       # Multi-stage Node.js backend image
│   └── frontend/
│       ├── Dockerfile           # Multi-stage Vite build -> Nginx runtime image
│       └── nginx.conf           # Reverse proxy rules (API/WebSocket -> backend service)
│
├── .github/workflows/
│   └── ci.yaml                  # CI: test/lint -> Docker build (frontend+backend) -> Trivy scan -> push
│
├── .k8s/                        # Kubernetes manifests
│   ├── argocd/argocd.yaml       # ArgoCD Application (GitOps source of truth)
│   ├── bases/                   # Kustomize base: Deployments, Services, Ingress, HPA/VPA,
│   │                             #   NetworkPolicy, PDB, PVC, StorageClass, ServiceMonitor,
│   │                             #   configs.env / secrets.env (Kustomize generators)
│   └── monitoring/monitoring.yaml # Ingress for Prometheus & Grafana UIs
│
├── terraform/                   # Infrastructure as Code
│   ├── provider.tf              # Kubernetes + Helm providers (Minikube context)
│   ├── namespace.tf             # dev / staging / argocd / monitoring namespaces
│   ├── resource.tf              # Helm releases: ArgoCD, ArgoCD Image Updater, kube-prometheus-stack
│   └── main.tf                  # Terraform/provider version constraints
│
├── controllers/                 # Express route handlers (business logic)
│   ├── authController.js        # Register, login, logout, email verification
│   ├── googleAuthController.js  # Google OAuth callback handling
│   ├── facebookAuthController.js# Facebook OAuth callback handling
│   ├── userController.js        # Profile, follow/unfollow, follow requests, search
│   ├── postController.js        # Create/find/like/save/share posts
│   ├── commentController.js     # Comments + likes
│   ├── replyController.js       # Threaded replies + likes
│   ├── chatController.js        # Chat rooms, groups, admin management
│   └── settingsController.js    # Privacy + notification settings
│
├── routes/                      # Express route definitions (mounted in index.js)
├── models/                      # Mongoose schemas (User, Post, Comment, Chat, Message, ...)
├── db_config/db.js              # MongoDB connection setup (Mongoose)
├── sockets/chatSocket.js        # Socket.IO real-time chat/presence/typing logic
├── uploads/                     # Local media upload storage (mounted as a volume in K8s)
├── index.js                     # Express app entrypoint (REST API + Socket.IO server + /metrics)
│
├── src/                         # React frontend source
│   ├── assets/                  # CSS, icons, static JS assets
│   ├── components/              # Reusable UI components
│   │   ├── Auth/                # Login / Signup forms
│   │   ├── Message/             # Chat UI (rooms, groups, message list, input)
│   │   ├── Navigation/          # Sidebar / bottom navigation bar
│   │   ├── Post/                # Post card, comments, video player, share/report modals
│   │   └── Settings/            # Privacy, blocked users, close friends, notifications, help
│   ├── pages/                   # Route-level pages (Feed, Explore, Profile, Search, Saved, ...)
│   └── redux/                   # Redux Toolkit slices (auth, notification bar)
│
├── public/                      # Static public assets (favicon, manifest, icons)
├── index.html                   # Vite HTML entrypoint
├── vite.config.js               # Vite dev server, proxy, and Vitest config
├── tailwind.config.js           # Tailwind CSS theme configuration
├── postcss.config.js            # PostCSS (Tailwind + Autoprefixer)
├── eslint.config.mjs            # ESLint rules
├── .env / .env.docker           # Environment variables (local / Docker — gitignored)
└── package.json                 # Frontend + backend dependencies and npm scripts
```

## Environment Setup

### Local Development

**Prerequisites:** Node.js 20.x, npm, a MongoDB instance (local or Atlas), Google/Facebook OAuth app credentials.

```bash
# 1. Clone and install dependencies
git clone https://github.com/haq2682/instagram.git
cd instagram
npm install

# 2. Create your .env file (see Environment Variables below)
cp .env.example .env   # or create .env manually using the table below

# 3. Run the backend API (Express + Socket.IO) on port 8000
node index.js

# 4. In a separate terminal, run the frontend dev server (Vite) on port 3000
npm run dev
```

The Vite dev server proxies `/auth`, `/googleAuth`, `/facebookAuth`, `/settings`, `/user`, `/api`, and `/uploads` to `http://localhost:8000` (see [`vite.config.js`](vite.config.js)), so the frontend and backend can be developed against each other without CORS configuration.

### Docker Compose Setup

Both services build via multi-stage Dockerfiles under `.docker/`:

```bash
# Backend image (Node 20 Alpine + FFmpeg)
docker build -f .docker/backend/Dockerfile -t instagram-backend .

# Frontend image (Vite build -> Nginx Alpine runtime)
docker build -f .docker/frontend/Dockerfile -t instagram-frontend .

docker run --env-file .env.docker -p 8000:8000 instagram-backend
docker run -p 80:80 instagram-frontend
```

### Environment Variables

These variables are consumed by the backend (`index.js`, `db_config/db.js`, `sockets/chatSocket.js`, auth controllers) and, where prefixed `VITE_`, by the Vite-built frontend. In the DevOps pipeline they are supplied to Kubernetes pods via a Kustomize-generated ConfigMap/Secret (see [`.k8s/bases/configs.env`](.k8s/bases/configs.env), [`.k8s/bases/secrets.env`](.k8s/bases/secrets.env), and [`.k8s/bases/kustomization.yaml`](.k8s/bases/kustomization.yaml)), rather than being baked into the Docker image at build time.

| Variable | Description | Where it's used |
|---|---|---|
| `EXPRESS_PORT` | Port the Express server listens on | Backend |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth app credentials | Backend (Passport Google strategy) — K8s Secret |
| `FACEBOOK_CLIENT_ID` / `FACEBOOK_CLIENT_SECRET` | Facebook OAuth app credentials | Backend (Passport Facebook strategy) — K8s Secret |
| `VITE_GOOGLE_AUTH_URI` | Backend endpoint the frontend redirects to for Google login | Frontend — K8s ConfigMap |
| `VITE_FACEBOOK_AUTH_URI` | Backend endpoint the frontend redirects to for Facebook login | Frontend — K8s ConfigMap |
| `JWT_SECRET` | Signing secret for JSON Web Tokens | Backend — K8s Secret |
| `SESSION_SECRET` | Signing secret for Express sessions | Backend — K8s Secret |
| `MONGODB_URI` | MongoDB Atlas (or cluster) connection string | Backend — K8s Secret |
| `OFFLINE_MONGODB_URI` | Local MongoDB connection string (offline/dev fallback) | Backend (local dev only) |
| `BACK_END_URL` | Publicly reachable backend URL | Backend/Frontend — K8s ConfigMap |
| `FRONT_END_URL` | Publicly reachable frontend URL (also used as Socket.IO CORS origin) | Backend/Frontend — K8s ConfigMap |
| `VITE_SOCKET_CLIENT_URL` | WebSocket URL the frontend connects to for Socket.IO | Frontend — K8s ConfigMap |

> **Security note:** `.env` and `.env.docker` are gitignored and must never be committed. In the Kubernetes pipeline, secrets live in `.k8s/bases/secrets.env` (consumed via a Kustomize `secretGenerator`) — treat that file the same way and keep it out of version control in any real deployment (e.g., inject it via a sealed-secrets/external-secrets operator or CI secret store rather than committing plaintext).

### Kubernetes / GitOps Setup

The full pipeline runs on a Minikube cluster and is bootstrapped in three layers:

```bash
# 1. Provision the host + Kubernetes toolchain (Docker, kubeadm, kubectl, Minikube, Helm, Terraform, ArgoCD CLI)
ansible-playbook -i .ansible/inventory.ini .ansible/install-deps.yaml

# 2. Provision cluster namespaces + platform add-ons (ArgoCD, ArgoCD Image Updater, kube-prometheus-stack)
cd terraform
terraform init
terraform apply

# 3. Point ArgoCD at this repository (GitOps continuous delivery)
kubectl apply -f .k8s/argocd/argocd.yaml
```

From here, ArgoCD watches the `.k8s/bases` path on the `main` branch and continuously reconciles the cluster (`prune: true`, `selfHeal: true`) — pushing to `main` after CI passes is the only deployment step needed. The Kustomize base (`.k8s/bases/kustomization.yaml`) applies the Deployments, Services, Ingress, HPA, PDBs, NetworkPolicies, PVCs/StorageClass, and the ServiceMonitor, and generates the app's ConfigMap/Secret from `configs.env` / `secrets.env`.

## Available Scripts

Run from the project root:

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite frontend dev server on `http://localhost:3000` |
| `npm run build` | Build the production frontend bundle into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run the Vitest test suite |
| `npm run lint` | Lint `src/` with ESLint |
| `node index.js` | Start the Express + Socket.IO backend on `EXPRESS_PORT` (default `8000`) |

## Monitoring & Observability

- The backend exposes Prometheus-format metrics at **`/metrics`**, including default Node.js process metrics plus custom `http_requests_total` (Counter) and `http_request_duration_seconds` (Histogram) series labeled by method/route/status.
- A Kubernetes `ServiceMonitor` ([`.k8s/bases/monitoring.yaml`](.k8s/bases/monitoring.yaml)) scrapes this endpoint every 30s for the Prometheus Operator.
- `kube-prometheus-stack` (Prometheus + Grafana) is installed cluster-wide via Terraform/Helm, and both UIs are exposed through dedicated Ingress hosts ([`.k8s/monitoring/monitoring.yaml`](.k8s/monitoring/monitoring.yaml)).
- A lightweight **`/health`** endpoint backs the Kubernetes startup/readiness/liveness probes for the backend Deployment.

## Security Notes

- Passwords are hashed with bcrypt; sessions are signed and stored server-side in MongoDB.
- `NetworkPolicy` resources restrict backend egress to DNS, HTTPS (443), MongoDB (27017), and an internal Redis tier only, and restrict backend ingress to the frontend tier.
- Every Docker image built in CI is scanned with **Trivy** before being considered deployable.
- Real OAuth/JWT/session secrets must **never** be committed — see [Environment Variables](#environment-variables). Rotate any credentials that have ever been placed in a tracked file.

## Contributing

1. Fork the repository and create a feature branch.
2. Follow the existing code style (`npm run lint` before committing).
3. Ensure `npm test` passes.
4. Open a pull request against `main` — the CI pipeline (test, lint, Docker build, Trivy scan) must pass before merge.
