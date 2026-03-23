import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../utils/axios";

import BookingCard from "../components/BookingCard";
import QrModal from "../components/QrModal";

const UserDashboard = () => {
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
    <div className="min-h-screen bg-[#05070a] text-slate-300 p-6 md:p-12 font-sans selection:bg-indigo-500">
      <div className="max-w-5xl mx-auto relative">
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-800/50 pb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
              ZION <span className="text-indigo-500">PASSES</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-2">
              Verified Digital Assets • Bhopal Node
            </p>
          </div>
          <Link
            to="/events"
            className="text-[10px] font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-400 flex items-center gap-2 transition-all mt-6 md:mt-0"
          >
            Browse Events <FaArrowRight />
          </Link>
        </header>

        <div className="space-y-10">
          {loading ? (
            <div className="text-center py-20 animate-pulse text-[10px] font-bold tracking-widest text-slate-600">
              SYNCHRONIZING WITH BLOCKCHAIN...
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/20 rounded-3xl border border-slate-800 border-dashed">
              <p className="text-slate-500 text-sm font-medium">
                No active passes found in your vault.
              </p>
            </div>
          ) : (
            bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onShowQr={() => setSelectedQrBooking(booking)}
                onCancel={() => handleCancel(booking._id)}
              />
            ))
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
