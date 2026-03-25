import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaArrowLeft, FaEnvelope, FaKey, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your registered email.");

    setLoading(true);
    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      if (data.success) {
        toast.success(data.message);
        setStep(2);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) return toast.error("Please fill all fields.");
    if (newPassword.length < 6)
      return toast.error("Password must be at least 6 characters.");

    setLoading(true);
    try {
      const { data } = await api.post("/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP or Reset Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      toast.loading("Dispatching new cipher...", { id: "resend" });
      const { data } = await api.post("/auth/resend-otp", {
        email,
        action: "password_reset",
      });
      toast.success(data.message, { id: "resend" });
    } catch (err) {
      toast.error("Network error. Try again later.", { id: "resend" });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans flex items-center justify-center p-6 relative overflow-hidden selection:bg-indigo-500/30">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
            <FaLock className="text-xl" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white mb-2">
            {step === 1 ? "Account Recovery" : "Set New Password"}
          </h2>
          <p className="text-zinc-400 text-sm font-medium">
            {step === 1
              ? "Enter your email to receive a secure reset cipher."
              : `Cipher sent to ${email}.`}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                Registered Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#050507] border border-zinc-800 text-white rounded-lg py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-indigo-500 transition-all"
                  placeholder="agent@zion.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? "Encrypting Request..." : "Send Reset Cipher"}
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleResetPassword}
            className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300"
          >
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                Security Cipher (OTP)
              </label>
              <input
                type="text"
                required
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-[#050507] border border-zinc-800 text-white rounded-lg py-3 px-4 text-center text-xl font-mono tracking-[0.5em] focus:outline-none focus:border-indigo-500 transition-all"
                placeholder="000000"
              />

              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  disabled={resendLoading}
                  onClick={handleResendOTP}
                  className="text-[9px] text-indigo-400 hover:text-indigo-300 uppercase tracking-widest font-black transition-colors disabled:opacity-50"
                >
                  {resendLoading ? "Sending..." : "Resend Cipher"}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                New Password
              </label>
              <div className="relative">
                <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#050507] border border-zinc-800 text-white rounded-lg py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-indigo-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white hover:bg-zinc-200 text-black py-3.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? "Updating Vault..." : "Reset Password"}
            </button>
          </form>
        )}

        <div className="mt-8 text-center border-t border-zinc-800/50 pt-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors"
          >
            <FaArrowLeft /> Back to Login Matrix
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
