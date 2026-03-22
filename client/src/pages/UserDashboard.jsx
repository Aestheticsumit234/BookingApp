import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaArrowRight, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../utils/axios";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div className="max-w-5xl mx-auto">
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
            className="text-[10px] font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-400 flex items-center gap-2 transition-all"
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
              <div key={booking._id} className="relative group">
                <div className="flex flex-col md:flex-row bg-[#0d1117] border border-slate-800 rounded-3xl overflow-hidden hover:border-indigo-500/40 transition-all duration-500 shadow-2xl">
                  <div className="md:w-1/3 relative h-48 md:h-auto bg-slate-900">
                    <img
                      src={booking.eventId?.imageUrl}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 grayscale group-hover:grayscale-0"
                      alt="event"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0d1117] via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6">
                      <span className="text-[9px] font-black bg-indigo-600 text-white px-3 py-1 rounded-md uppercase tracking-widest">
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 p-8 md:p-10 border-r border-slate-800 border-dashed relative">
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#05070a] rounded-full border border-slate-800 hidden md:block"></div>
                    <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-[#05070a] rounded-full border border-slate-800 hidden md:block"></div>

                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-6">
                      {booking.eventId?.title}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        <FaMapMarkerAlt className="text-indigo-500" />{" "}
                        {booking.eventId?.location}
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        <FaCalendarAlt className="text-indigo-500" />{" "}
                        {new Date(booking.eventId?.date).toDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="md:w-64 p-8 bg-slate-900/30 flex flex-col items-center justify-center text-center">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">
                      Pass ID
                    </p>
                    <p className="text-xs font-mono text-slate-400 mb-6">
                      ZN-{booking._id.slice(-6).toUpperCase()}
                    </p>

                    <div className="w-full space-y-3">
                      <button className="w-full bg-white text-black py-3 rounded-xl text-[9px] font-black uppercase tracking-widest  hover:bg-indigo-500 hover:text-white transition-all cursor-pointer">
                        View QR Code
                      </button>
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="w-full text-slate-600 hover:text-red-500 text-[9px] font-black uppercase tracking-widest transition-colors py-2 cursor-pointer"
                      >
                        Revoke Access
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
