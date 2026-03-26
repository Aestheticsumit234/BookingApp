import { useContext, useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaCaretDown,
  FaSignOutAlt,
  FaTimes,
  FaUserAlt,
  FaUserCircle,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    setIsProfileOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
  ];

  return (
    <nav className="bg-[#0a0c10] border-b border-white/5 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="logo"
              className="w-8 h-8 rounded bg-indigo-600 p-1"
            />
            <span className="text-white text-xl font-black tracking-tighter uppercase italic">
              Zion
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-indigo-500 ${
                  location.pathname === link.path
                    ? "text-indigo-500"
                    : "text-slate-400"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-8 pl-8 border-l border-white/10">
                <Link
                  to={user.role === "admin" ? "/admin" : "/dashboard"}
                  className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-white ${
                    location.pathname.includes("dashboard") ||
                    location.pathname.includes("admin")
                      ? "text-white"
                      : "text-slate-400"
                  }`}
                >
                  Dashboard
                </Link>

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-all focus:outline-none"
                  >
                    <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-indigo-500">
                      <FaUserCircle className="text-lg" />
                    </div>
                    <FaCaretDown
                      className={`text-[10px] transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-[#0f1115] border border-white/10 rounded-xl shadow-2xl py-2 animate-in fade-in zoom-in duration-200">
                      <div className="px-4 py-3 border-b border-white/5 mb-1">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          Signed in as
                        </p>
                        <p className="text-xs font-bold text-white truncate">
                          {user.name}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-white/5 hover:text-indigo-400 transition-all"
                      >
                        <FaUserAlt size={12} /> Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-500/5 transition-all"
                      >
                        <FaSignOutAlt size={12} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link
                  to="/login"
                  className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-black text-[10px] px-6 py-2.5 rounded-full font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-lg shadow-white/5"
                >
                  Join Zion
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0a0c10] border-t border-white/5 px-6 py-8 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-xs font-black uppercase tracking-widest text-slate-400"
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-white/5" />
          {user ? (
            <div className="space-y-6">
              <Link
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                onClick={() => setIsOpen(false)}
                className="block text-xs font-black uppercase tracking-widest text-indigo-500"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="block text-xs font-black uppercase tracking-widest text-slate-300"
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-xs font-black uppercase tracking-widest text-red-500"
              >
                Terminate Session
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center py-3 text-xs font-black uppercase tracking-widest text-white border border-white/10 rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center py-3 bg-white text-black text-xs font-black uppercase tracking-widest rounded-lg"
              >
                Join Zion
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
