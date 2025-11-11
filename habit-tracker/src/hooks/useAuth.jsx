import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => localStorage.getItem("accessToken") || null,
  );
  const [userId, setUserId] = useState(
    () => localStorage.getItem("userId") || null,
  );

  useEffect(() => {
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const { data } = await apiClient.post("/login", { email, password });

      setToken(data.accessToken);
      setUserId(data.user.id);

      apiClient.defaults.headers.common["Authorization"] =
        `Bearer ${data.accessToken}`;

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userId", data.user.id);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const { data } = await apiClient.post("/register", { email, password });

      setToken(data.accessToken);
      setUserId(data.user.id);
      apiClient.defaults.headers.common["Authorization"] =
        `Bearer ${data.accessToken}`;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userId", data.user.id);
    } catch (error) {
      console.error("Register failed", error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");

    delete apiClient.defaults.headers.common["Authorization"];
  };

  const isAuthenticated = !!token;

  const value = {
    token,
    userId,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
