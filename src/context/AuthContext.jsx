import { createContext, useContext, useState, useMemo } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [username, setUsername] = useState(() => localStorage.getItem("username"));
  const [role, setRole] = useState(() => localStorage.getItem("role") || "");

  const login = (token, username, userRole) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("role", userRole);

    setToken(token);
    setUsername(username);
    setRole(userRole)
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    setToken(null);
    setUsername(null);
    setRole(null);
  }

  const value = useMemo(() => ({
    token,
    username,
    role,
    login,
    logout
  }), [token, username, role]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const useIsAdmin = () => {
  const { user } = useAuth();
  return user?.role === "ADMIN";
};
