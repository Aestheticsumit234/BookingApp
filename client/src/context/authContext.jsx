import { createContext, useEffect, useState } from "react";
import api from "../utils/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const checkUserStatus = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!token || !storedUser) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/me");
        if (data.success) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    checkUserStatus();
  }, []);

  useEffect(() => {
    let timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + (loading ? (prev < 80 ? 1 : 0.2) : 5);
      });
    }, 20);
    return () => clearInterval(timer);
  }, [loading]);

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        setUser(data.user);
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

  const registerUser = async (userData) => {
    try {
      setLoading(true);
      const { data } = await api.post("/auth/register", userData);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      setLoading(true);
      const { data } = await api.post("/auth/verify-otp", { email, otp });
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        setUser(data.user);
      }
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        verifyOTP,
        loading,
        registerUser,
        progress,
      }}
    >
      {!loading ? (
        children
      ) : (
        <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-9999">
          <div className="w-full max-w-70 flex flex-col items-center px-10">
            <h1 className="text-white italic font-black text-8xl tracking-tighter mb-12">
              Z<span className="text-indigo-500">.</span>
            </h1>
            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-indigo-500 transition-all duration-200 shadow-[0_0_15px_rgba(99,102,241,0.6)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-white/40 text-[10px] uppercase tracking-widest mt-6 animate-pulse">
              Synchronizing Vault...
            </p>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};
