import { FaCheckCircle, FaRupeeSign, FaTicketAlt } from "react-icons/fa";

const AdminStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
      <div className="bg-[#0d1117] border border-slate-800 p-6  shadow-xl flex items-center gap-5 hover:border-slate-700 transition-colors">
        <div className="p-4 bg-slate-800/50 rounded text-slate-400">
          <FaTicketAlt size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
            Total Passes
          </p>
          <p className="text-3xl  text-white">{stats.totalBookings}</p>
        </div>
      </div>

      <div className="bg-[#0d1117] border border-slate-800 p-6  shadow-xl flex items-center gap-5 hover:border-indigo-500/30 transition-colors">
        <div className="p-4 bg-indigo-500/10 rounded text-indigo-500">
          <FaCheckCircle size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
            Verified Entries
          </p>
          <p className="text-3xl  text-white">{stats.confirmedCount}</p>
        </div>
      </div>

      <div className="bg-[#0d1117] border border-emerald-500/20 p-6 rounded shadow-xl shadow-emerald-500/5 flex items-center gap-5 relative overflow-hidden group">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-400 relative z-10">
          <FaRupeeSign size={24} />
        </div>
        <div className="relative z-10">
          <p className="text-[10px] font-black text-emerald-500/70 uppercase tracking-widest mb-1">
            Total Revenue
          </p>
          <p className="text-2xl  text-white tracking-tighter">
            ₹{stats.totalRevenue?.toLocaleString() || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
