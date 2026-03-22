import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaPlus, FaShieldAlt, FaSignOutAlt } from "react-icons/fa";
import AdminStats from "../components/admin/AdminStats";
import BookingTable from "../components/admin/BookingTable";
import CreateEventModal from "../components/admin/CreateEventModal";
import { AuthContext } from "../context/authContext";
import api from "../utils/axios";

const AdminDashBoard = () => {
  const { user, logout } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({ totalBookings: 0, pendingCount: 0 });

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/bookings/all-bookings");
      if (data.success) {
        setBookings(data.bookings.filter((b) => b.status === "pending"));
        setStats({
          totalBookings: data.bookings.length,
          pendingCount: data.bookings.filter((b) => b.status === "pending")
            .length,
        });
      }
    } catch (err) {
      toast.error("Sync failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleConfirm = async (id) => {
    try {
      await api.put(`/bookings/${id}/confirm`, { paymentStatus: "paid" });
      toast.success("Verified");
      fetchAllData();
    } catch (err) {
      toast.error("Error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-200 p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <nav className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <FaShieldAlt className="text-white text-xl" />
            </div>
            <h2 className="text-lg font-bold text-white uppercase tracking-tight">
              Zion <span className="text-indigo-500">Core</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm font-bold hidden md:block">{user?.name}</p>
            <button
              onClick={logout}
              className="p-3 bg-slate-800 rounded-xl hover:text-red-500 border border-slate-700 transition-all"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </nav>

        <AdminStats stats={stats} />

        <div className="mb-8 flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/10"
          >
            <FaPlus /> NEW EVENT
          </button>
        </div>

        <BookingTable
          bookings={bookings}
          loading={loading}
          onConfirm={handleConfirm}
        />
      </div>

      {showModal && (
        <CreateEventModal
          onClose={() => setShowModal(false)}
          onRefresh={fetchAllData}
        />
      )}
    </div>
  );
};

export default AdminDashBoard;
