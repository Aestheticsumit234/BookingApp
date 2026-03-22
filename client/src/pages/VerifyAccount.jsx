import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaFingerprint } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const VerifyAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyOTP } = useContext(AuthContext);

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await verifyOTP(email, otp);

      if (data.success) {
        toast.success("Identity Verified. Proceeding...");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or Expired Code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    toast.success("A new code has been sent to your email.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030303] font-sans selection:bg-indigo-500/30">
      <div className="w-full max-w-90 bg-[#0a0a0c] border border-white/5 rounded p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <div className="w-14 h-14 bg-white/3 border border-white/10 rounded flex items-center justify-center mx-auto mb-6 shadow-inner">
            <FaFingerprint className="text-indigo-400 text-2xl animate-pulse" />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight mb-2">
            Verification
          </h2>
          <p className="text-xs text-zinc-500 font-medium leading-relaxed">
            Enter the 6-digit code sent to <br />
            <span className="text-zinc-300">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div>
            <input
              type="text"
              maxLength="6"
              className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-indigo-500 text-white text-center text-4xl font-black tracking-[0.4em] py-2 outline-none transition-colors placeholder:text-zinc-800"
              placeholder="••••••"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              autoFocus
            />
          </div>

          <button
            disabled={loading || otp.length !== 6}
            className={`w-full bg-white hover:bg-zinc-200 text-black font-black py-4 rounded transition-all shadow-lg active:scale-95 text-[11px] uppercase tracking-[0.2em] ${
              loading || otp.length !== 6 ? "opacity-30 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Verifying..." : "Confirm"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center relative z-10">
          <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">
            Didn&apos;t receive the code?{" "}
            <button
              onClick={handleResend}
              className="text-indigo-400 hover:text-white transition-colors"
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
