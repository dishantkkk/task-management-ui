# 📋 Task Management UI

A modern, responsive **React.js frontend** for the Task Management System, built with Tailwind CSS and JWT-based authentication. It integrates with the Spring Boot backend to provide full task CRUD, inline interactions, and a clean user experience.

## ⚙️ Tech Stack

- React 18+
- Tailwind CSS 3+
- Axios for API calls
- React Router DOM for navigation
- JWT-based authentication (via `localStorage`)
- Backend: Spring Boot (JWT + Role-based Auth)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-management-ui.git
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

Visit `http://localhost:5173` in your browser.

## 🔑 Authentication Flow

- JWT token is received after login and stored in `localStorage`
- Axios interceptor attaches the token to each API request
- Protected routes are guarded based on login status

## 📦 Features

- ✅ Login with username/password
- ✅ View tasks (list, view inline)
- ✅ Add, edit, delete tasks
- ✅ Toggle flag (completed/uncompleted)
- ✅ Fully responsive UI
- ✅ Tailwind styling with dark mode-ready structure

## 🔧 Backend Requirements

Ensure the backend API is running at: `http://localhost:8080/v1/api`

## 🔮 Future Improvements

- Add user registration page
- Global toast notifications
- Task filters (date, flag)
- PWA support and offline mode
- Unit tests using React Testing Library
