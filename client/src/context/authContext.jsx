import { createContext, useEffect, useState } from "react";
import api from "../utils/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showApp, setShowApp] = useState(false);
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const { data } = await api.get("/auth/me");
          if (data.success) {
            setUser(data.user);
          }
        }
      } catch (error) {
        localStorage.removeItem("user");
        setUser(null);
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
          setTimeout(() => setShowApp(true), 400);
          return 100;
        }

        let increment = 0;
        if (loading) {
          increment = prev < 70 ? 0.8 : 0.2;
        } else {
          increment = 4;
        }
        return prev + increment;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [loading]);

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
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, verifyOTP, loading, registerUser }}
    >
      {!loading ? (
        children
      ) : (
        <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-9999">
          <div className="w-full max-w-70 flex flex-col items-center">
            <div className="relative mb-12">
              <h1 className="zion-loader-text text-white italic font-black text-8xl tracking-tighter">
                Z<span className="text-indigo-500">.</span>
              </h1>
            </div>

            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-indigo-500 transition-all duration-200 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="mt-6 flex flex-col items-center gap-1">
              <span className="text-gray-400 text-sm font-semibold tracking-widest uppercase">
                Zion Workspace
              </span>
              <span className="text-gray-600 text-[10px] tracking-tight">
                Initializing secure session...
              </span>
            </div>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};
