# 📋 Task Management UI

A modern, responsive **React.js frontend** for the Task Management System. Integrates seamlessly with a Spring Boot backend to provide a full task management workflow with JWT-based authentication, email verification, admin dashboard, task filters, and CI/CD deployment via Jenkins and Kubernetes.

---

## ⚙️ Tech Stack

| Layer            | Technology                          |
|------------------|--------------------------------------|
| UI Framework     | React 18+                            |
| Styling          | Tailwind CSS 3+                      |
| Routing          | React Router DOM                     |
| State Mgmt       | Local state + Axios Interceptors     |
| Auth             | JWT-based (stored in localStorage)   |
| Animations       | Framer Motion                        |
| Backend API      | Spring Boot 3.5.x                    |
| Deployment       | Docker, Kubernetes (Minikube)        |
| CI/CD            | Jenkins + Docker + Jenkinsfile       |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dishantkkk/task-management-ui.git
cd task-management-ui
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the development server

```bash
npm run dev
# or
yarn dev
```

Visit [`http://localhost:5173`](http://localhost:5173) in your browser.

---

## 🔑 Authentication Flow

- JWT token received on login is stored in `localStorage`
- Axios interceptors attach token to each outgoing request
- Protected routes are wrapped with custom route guards

---

## 📦 Features

### 🧑‍💻 User Features

- ✅ User Login & JWT-based auth
- ✅ Email verification (with resend link)
- ✅ Forgot Password & Reset flow
- ✅ View Task List (search + filters + sort)
- ✅ Inline Task Drawer (expand/edit/delete)
- ✅ Flag/Unflag, Mark Complete, Delete
- ✅ Add/Edit tasks with due date & priority
- ✅ Visual cues for due-soon and completed tasks

### 🎨 UI/UX

- Responsive design (Mobile + Desktop)
- Smooth animations via Framer Motion
- Drawer-based task interactions (non-modal)
- Theme toggle for Light/Dark mode
- Accessible color schemes

### 🧑‍💼 Admin Features

- View all users (Admin-only)
- View task/user metrics (Admin Dashboard)
- Separate admin route protection and components

### 🔧 Developer Features

- Axios instance with interceptors
- `.env` driven API base URL
- Optimized Vite config (`vite.config.js`)
- Modular folder structure
- Auto format via ESLint/Prettier

---

## 🐳 Docker + Kubernetes Deployment

### Frontend Docker Image & Deploy Script

```bash
./deploy-frontend.sh
```

This script:

- Builds the production Vite app (`npm run build`)
- Creates a Docker image with Nginx
- Pushes image to Docker Hub
- Applies Kubernetes manifests from `k8s/`
- Port-forwards frontend service to `localhost:3000`

> 🌐 Accessible at: [http://localhost:3000](http://localhost:3000)

### Port Forwarding (Minikube):

```bash
kubectl port-forward svc/taskmanager-frontend-service 3000:80
```

---

## 🔧 Environment Variables

Create a `.env` file:

```env
VITE_BACKEND_BASE_URL=http://localhost:8080/v1/api
```

Ensure `api.js` uses it correctly:

```js
const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_BASE_URL });
```

---

## ⚙️ Jenkins CI/CD Pipeline

- ✅ `Jenkinsfile` defined for CI pipeline
- Auto builds Docker image on push
- Pushes frontend image to Docker Hub
- Deploys to Minikube cluster via `kubectl`
- Logs available in Jenkins console output

> Make sure Jenkins has access to:
> - Docker daemon
> - Kubernetes context (from `~/.kube/config`)
> - DockerHub credentials via Jenkins credentials

---

## 🧪 Testing (Planned)

- React Testing Library for unit tests
- Cypress for E2E (Future)
- GitHub Actions or Jenkins pipeline for test automation

---

## 🔮 Planned Enhancements

- 🌍 Multi-language (i18n) support
- 📅 Calendar View of tasks
- 📬 In-app & email notifications
- 📊 Analytics Dashboard (user/task stats)
- 💬 Collaborative comments/notes on tasks

---

## 🙌 Contributions

Feel free to fork the project, create issues, and raise PRs!

---
