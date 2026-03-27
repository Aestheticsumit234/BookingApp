import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest.url !== "/auth/me"
    ) {
      Cookies.remove("token");
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      if (typeof window !== "undefined") {
        const path = window.location.pathname;

        if (!["/login", "/register", "/"].includes(path)) {
          toast.error("SYSTEM: Session Expired. Re-authenticating...");
          window.location.href = "/login";
        }
      }
    }

    if (error.response && error.response.status >= 500) {
      toast.error("ZION: Protocol Failure (Server Error)");
    }

    return Promise.reject(error);
  },
);

export default api;
