import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaArrowRight, FaTicketAlt, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import api from "../utils/axios";

import BookingCard from "../components/BookingCard";
import QrModal from "../components/QrModal";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQrBooking, setSelectedQrBooking] = useState(null);

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/bookings/my-bookings");
      if (data.success) setBookings(data.bookings);
    } catch (err) {
      toast.error("Sync failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Confirm cancellation of this access?")) return;
    try {
      await api.delete(`/bookings/${id}`);
      toast.success("Access revoked");
      fetchMyBookings();
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-300 p-6 md:p-16 font-sans selection:bg-indigo-500">
      <div className="max-w-6xl mx-auto relative">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 border-b border-white/5 pb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-500 mb-2">
              <FaUserCircle className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                Authorized Access
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl  tracking-tighter text-white uppercase italic leading-none">
              Welcome,{" "}
              <span className="text-indigo-600">
                {user?.name?.split(" ")[0] || "Agent"}
              </span>
            </h1>
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.3em] flex items-center gap-2">
              <FaTicketAlt className="text-indigo-500/50" /> Your Secured Event
              Passes
            </p>
          </div>

          <Link
            to="/events"
            className="group text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-indigo-500 flex items-center gap-3 transition-all mt-8 md:mt-0 bg-white/5 px-6 py-4 rounded-full border border-white/5 hover:border-indigo-500/30"
          >
            Book Events{" "}
            <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[10px] font-bold tracking-[0.5em] text-slate-600 uppercase">
                Synchronizing Vault...
              </p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-24 bg-white/2 rounded-3xl border border-white/5 border-dashed">
              <p className="text-slate-500 text-sm font-medium italic">
                Vault is empty. No active passes detected.
              </p>
              <Link
                to="/events"
                className="text-indigo-500 text-[10px] font-bold uppercase tracking-widest mt-4 inline-block hover:underline"
              >
                Initialize First Booking
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {bookings.map((booking) => (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  onShowQr={() => setSelectedQrBooking(booking)}
                  onCancel={() => handleCancel(booking._id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <QrModal
        booking={selectedQrBooking}
        onClose={() => setSelectedQrBooking(null)}
      />
    </div>
  );
};

export default UserDashboard;
