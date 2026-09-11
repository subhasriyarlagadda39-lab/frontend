import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import { loginUser } from "../services/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");

      return savedUser
        ? JSON.parse(savedUser)
        : null;
    } catch {
      return null;
    }
  });

  // LOGIN
  const login = async (email, password) => {
    // Call authApi.js
    const data = await loginUser(email, password);

    // Check token
    if (!data?.token) {
      throw new Error(
        "Login response did not contain a token."
      );
    }

    // Only ADMIN can enter admin dashboard
    if (data?.user?.role !== "ADMIN") {
      throw new Error(
        "This login is only for an ADMIN account."
      );
    }

    // Save token
    localStorage.setItem(
      "token",
      data.token
    );

    // Save user
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    // Update React state
    setToken(data.token);
    setUser(data.user);

    return data;
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
}