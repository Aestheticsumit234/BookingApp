import { createContext, useEffect, useState } from "react";
import api from "../utils/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      // 1. Hint check: Kya user ne pehle login kiya tha?
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setLoading(false);
        setUser(null);
        return;
      }

      try {
        // 2. Agar storedUser hai, toh backend se fresh data mangao
        // Backend cookie khud check kar lega (ensure withCredentials: true in axios)
        const { data } = await api.get("/auth/me");

        if (data.success) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      } catch (error) {
        console.log("Session expired or invalid cookie");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      if (error.response?.status === 403) {
        return {
          unverified: true,
          message: error.response.data.message,
          email,
        };
      }
      throw error;
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      const { data } = await api.post("/auth/verify-otp", { email, otp });
      return data;
    } catch (error) {
      throw error;
    }
  };

  const registerUser = async (userData) => {
    try {
      const { data } = await api.post("/auth/register", userData);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout API Error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      // Browser khud cookie clear karega backend ki instructions par
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, verifyOTP, loading, registerUser }}
    >
      {!loading ? (
        children
      ) : (
        <div className="bg-gray-900 h-screen flex items-center justify-center">
          <div className="text-white italic font-black text-4xl animate-pulse tracking-tighter">
            ZION<span className="text-indigo-500">.</span>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};
