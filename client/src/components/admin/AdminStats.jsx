import { FaChartBar, FaClock } from "react-icons/fa";

const StatCard = ({ label, val, icon }) => (
  <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
    <div className="flex justify-between items-center mb-3 text-slate-500 uppercase tracking-widest text-[10px] font-bold">
      {label} {icon}
    </div>
    <p className="text-3xl font-bold text-white tracking-tighter">{val}</p>
  </div>
);

const AdminStats = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
    <StatCard
      label="Pending Verification"
      val={stats.pendingCount}
      icon={<FaClock className="text-indigo-500" />}
    />
    <StatCard
      label="Total Transactions"
      val={stats.totalBookings}
      icon={<FaChartBar className="text-indigo-500" />}
    />
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
        System Health
      </span>
      <div className="flex items-center gap-2 mt-2">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        <h3 className="text-xl font-bold text-white uppercase tracking-tighter">
          Operational
        </h3>
      </div>
    </div>
  </div>
);

export default AdminStats;
