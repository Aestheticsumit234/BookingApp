import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { FaArrowRight, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        toast.success("Authentication successful");
        if (result.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }

      if (result.unverified) {
        toast.error("Identity verification required");
        navigate("/verify-account", { state: { email: formData.email } });
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid credentials. Access denied.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#030303] text-zinc-300 font-sans selection:bg-indigo-500/30 selection:text-white">
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-16 relative overflow-hidden bg-black border-r border-white/5">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-violet-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

        <div className="relative z-10">
          <Link
            to="/"
            className="text-3xl font-black text-white italic tracking-tighter hover:opacity-80 transition-opacity"
          >
            ZION<span className="text-indigo-600">.</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-6">
            Bhopal Node Active
          </p>
          <h1 className="text-4xl font-black text-white leading-[1.1] tracking-tight mb-6">
            Unlock the city's most exclusive circuit.
          </h1>
          <p className="text-sm font-medium text-zinc-500 leading-relaxed">
            Zion is a heavily secured, invite-quality ecosystem. Authenticate
            your identity to access premium tech and cultural experiences.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-600">
          <span>System v3.2</span>
          <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
          <span>End-to-End Encrypted</span>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative">
        <div className="absolute top-8 left-8 lg:hidden">
          <Link
            to="/"
            className="text-2xl font-black text-white italic tracking-tighter"
          >
            ZION<span className="text-indigo-600">.</span>
          </Link>
        </div>

        <div className="w-full max-w-100">
          <div className="mb-12">
            <h2 className="text-3xl font-black text-white tracking-tight mb-2">
              Welcome back
            </h2>
            <p className="text-sm text-zinc-500 font-medium">
              Enter your credentials to access your vault.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-zinc-600 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-[#0a0a0c] border border-zinc-800 text-white rounded py-3.5 pl-11 pr-4 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-zinc-700"
                  placeholder="name@example.com"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-bold text-indigo-500 hover:text-indigo-400 transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-zinc-600 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  type="password"
                  id="password"
                  className="w-full bg-[#0a0a0c] border border-zinc-800 text-white rounded py-3.5 pl-11 pr-4 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-zinc-700"
                  placeholder="••••••••"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <button
              disabled={loading}
              className={`group w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-200 text-black font-black py-4 rounded transition-all shadow-lg active:scale-95 text-xs uppercase tracking-[0.2em] mt-8 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  Initialize Session{" "}
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-zinc-900 text-center">
            <p className="text-sm text-zinc-500 font-medium">
              Don't have an identity yet?{" "}
              <Link
                to="/register"
                className="text-white font-bold hover:underline underline-offset-4 decoration-indigo-500 transition-all"
              >
                Request Access
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
