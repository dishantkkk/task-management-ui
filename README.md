# 📋 Task Management UI

A modern, responsive **React.js frontend** for the Task Management System. Integrates seamlessly with a Spring Boot backend to provide a full task management workflow with JWT-based authentication, admin dashboard, task filters, email flows, and Kubernetes-ready deployment.

---

## ⚙️ Tech Stack

| Layer            | Technology                          |
|------------------|--------------------------------------|
| UI Framework     | React 18+                            |
| Styling          | Tailwind CSS 3+                      |
| Routing          | React Router DOM                     |
| State Mgmt       | Local state + Axios Interceptors     |
| Auth             | JWT-based (stored in localStorage)   |
| Backend API      | Spring Boot 3.5.x                    |
| Deployment       | Docker, Kubernetes (Minikube)        |

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

- ✅ User Login (JWT)
- ✅ Email verification (with resend)
- ✅ Forgot password and reset flow
- ✅ View task list (sortable, filterable)
- ✅ Inline task drawer with complete/edit/delete
- ✅ Flag/Unflag task status
- ✅ Create/Edit/Delete tasks
- ✅ Priority and due date visual indicators

### 🎨 UI/UX

- Fully responsive layout (mobile + desktop)
- Smooth transitions via Framer Motion
- Tailwind-based component design
- Toggleable dark mode support

### 🛠️ Dev Features

- Clear API separation with Axios instance
- Environment-driven backend URL config
- `vite.config.js` for build-time optimizations

---

## 🧑‍💼 Admin Features

- View user list (role-based)
- Admin dashboard metrics (task/user stats)
- Admin-only access to `/admin` routes
- Separate Admin panel UI components

---

## 🐳 Docker + Minikube Deployment

### Frontend Image Build Script:

```bash
./deploy-frontend.sh
```
This script:
- Builds Vite project (`npm run build`)
- Creates Docker image with Nginx
- Pushes image to Docker Hub
- Applies Kubernetes manifests in `k8s/`
- Port-forwards the frontend service to `localhost:3000`

> 🌐 Accessible at: `http://localhost:3000` (via port-forward)

---

## 🔧 Environment Variables

You can create a `.env` file:

```env
VITE_BACKEND_BASE_URL=http://localhost:8080/v1/api
```

Ensure this is reflected in `api.js`:

```js
const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_BASE_URL });
```

---

## 🧪 Testing

- Unit tests planned using React Testing Library
- Future: Cypress E2E tests and CI/CD pipeline

---

## 🔮 Planned Enhancements

- ✅ Fixed CORS + environment config
- 🌐 i18n support (multi-language UI)
- ✉️ Email + in-app notifications
- 📅 Calendar view for due dates
- 📊 User dashboard with analytics
- 💬 Task comments with collaboration

---

## 🙌 Contributions

Feel free to fork the project, create issues, and raise PRs!

---
