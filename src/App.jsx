import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "./components/Layout";
import PrivateRoute from "./routes/PrivateRoute";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const TaskListPage = lazy(() => import("./pages/TaskListPage"));
const AddTaskPage = lazy(() => import("./pages/AddTaskPage"));
const EditTaskPage = lazy(() => import("./pages/EditTaskPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const VerifyPage = lazy(() =>  import("./pages/VerifyPage"));
const ResendVerificationPage = lazy(() =>  import("./pages/ResendVerificationPage"));
const ForgotPasswordPage = lazy(() =>import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));

// Page transition wrapper
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <Suspense
          fallback={
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
            </div>
          }
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="/resend-verification" element={<ResendVerificationPage />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute><DashboardPage /></PrivateRoute>}
            />
            <Route
              path="/tasks"
              element={<PrivateRoute><TaskListPage /></PrivateRoute>}
            />
            <Route
              path="/add-task"
              element={<PrivateRoute><AddTaskPage /></PrivateRoute>}
            />
            <Route
              path="/edit/:id"
              element={<PrivateRoute><EditTaskPage /></PrivateRoute>}
            />
            <Route
              path="/profile"
              element={<PrivateRoute><ProfilePage /></PrivateRoute>}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
};

export default App;
