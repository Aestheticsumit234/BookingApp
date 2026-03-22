import { useContext } from "react";
import {
  FaArrowRight,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaTicketAlt,
  FaUserCheck,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleProtectedClick = (path) => {
    user ? navigate(path) : navigate("/login");
  };

  return (
    <div className="bg-[#09090b] min-h-screen text-zinc-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <section className="relative pt-32 pb-24 px-6 lg:pt-24 lg:pb-32 overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-100 bg-indigo-600/20 blur-[120px] rounded-[100%] pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 backdrop-blur-md px-5 py-2 rounded-full text-xs font-semibold text-zinc-300 mb-8 shadow-2xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Currently Active in Bhopal Node
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
          Curated Experiences. <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-violet-500 ">
            Uncompromised Security.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          The definitive platform to discover and reserve Bhopal's top-tier
          tech, music, and cultural events. End-to-end encrypted bookings across
          MP Nagar, Arera Colony, and prime venues.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
          <button
            onClick={() => handleProtectedClick("/events")}
            className="w-full sm:w-auto bg-white  text-zinc-950 hover:bg-zinc-200 px-8 py-4 rounded font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-3 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] cursor-pointer"
          >
            <FaTicketAlt className="text-lg " /> Browse Events
          </button>
          <button
            onClick={() => handleProtectedClick("/dashboard")}
            className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white px-8 py-4 rounded font-bold text-sm transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            My Bookings
          </button>
        </div>
      </section>

      <section className="border-y border-zinc-800/50 bg-zinc-900/20 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-zinc-800/50">
          <StatBlock value="100%" label="OTP Secured" />
          <StatBlock value="Manual" label="Admin Verification" />
          <StatBlock value="Bhopal" label="Exclusive Venues" />
          <StatBlock value="24/7" label="System Uptime" />
        </div>
      </section>

      <section className="py-32 px-6 max-w-6xl mx-auto relative">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
            How Zion Protects You
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            We've built a custom security architecture to ensure your bookings
            are safe, verified, and completely scam-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<FaShieldAlt />}
            title="Email OTP Authentication"
            desc="Before any ticket is generated, our system sends a 6-digit cryptographic OTP to your registered email. No OTP, no booking."
            gradient="from-blue-500/20 to-indigo-500/20"
            iconColor="text-indigo-400"
          />
          <FeatureCard
            icon={<FaUserCheck />}
            title="Admin Verification"
            desc="Your booking goes into a 'Pending' state. Our Bhopal-based admins manually verify the transaction and venue capacity before final approval."
            gradient="from-emerald-500/20 to-teal-500/20"
            iconColor="text-emerald-400"
          />
          <FeatureCard
            icon={<FaMapMarkerAlt />}
            title="Hyper-Local Nodes"
            desc="We don't show generic events. Zion is currently locked to Bhopal, meaning you only see high-quality, verified events happening near you."
            gradient="from-amber-500/20 to-orange-500/20"
            iconColor="text-amber-400"
          />
        </div>
      </section>

      <section className="py-24 px-6 mb-12">
        <div className="max-w-5xl mx-auto bg-linear-to-br from-indigo-900 via-indigo-950 to-[#09090b] border border-indigo-500/20 rounded p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-125 h-125 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 relative z-10 tracking-tight">
            Ready to secure your spot?
          </h2>
          <p className="text-indigo-200/70 mb-12 max-w-xl mx-auto relative z-10 text-lg">
            Join thousands of users in Bhopal who trust Zion for their weekend
            experiences. Create an account to get started.
          </p>

          <Link
            to="/register"
            className="inline-flex items-center gap-3 bg-white text-zinc-950 px-10 py-5 rounded font-bold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95 relative z-10"
          >
            Create Free Account <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

const StatBlock = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center">
    <p className="text-4xl font-black text-white tracking-tighter mb-2">
      {value}
    </p>
    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
      {label}
    </p>
  </div>
);

const FeatureCard = ({ icon, title, desc, gradient, iconColor }) => (
  <div className="bg-white/2 border border-white/5 p-10 rounded hover:bg-white/4 transition-colors duration-500 group">
    <div
      className={`w-16 h-16 rounded bg-linear-to-br ${gradient} flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500`}
    >
      <div className={`text-2xl ${iconColor}`}>{icon}</div>
    </div>
    <h3 className="text-xl font-bold text-zinc-100 mb-4">{title}</h3>
    <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default Home;
