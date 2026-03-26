import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashBoard from "./pages/AdminDashBoard";
import EventDetails from "./pages/EventDetails";
import Events from "./pages/Events";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PaymentFailed from "./pages/PaymentFailed";
import PaymentSucess from "./pages/PaymentSucess";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import VerifyAccount from "./pages/VerifyAccount.jsx";

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-[#05070a] min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/events" element={<Events />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/payment-success" element={<PaymentSucess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
          </Route>

          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="/admin" element={<AdminDashBoard />} />
          </Route>

          <Route
            path="*"
            element={
              <div className="relative text-white text-center py-64 overflow-hidden bg-[#05070a]">
                <h1 className="flex flex-col items-center justify-center text-9xl font-black italic opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none">
                  <span>404</span>
                  <span className="text-4xl uppercase mt-4 tracking-[0.5em]">
                    Terminal Offline
                  </span>
                </h1>
                <p className="relative z-10 text-slate-500 font-bold uppercase tracking-widest text-xs">
                  The requested node does not exist in Zion.
                </p>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
