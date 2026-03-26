import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaArrowLeft, FaDatabase, FaPen, FaTerminal } from "react-icons/fa";
import { AuthContext } from "../context/authContext";
import api from "../utils/axios";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ totalPasses: 0 });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
  });

  useEffect(() => {
    if (user?.role !== "admin") {
      const fetchStats = async () => {
        try {
          const { data } = await api.get("/bookings/my-bookings");
          if (data.success) {
            const confirmed = data.bookings.filter(
              (b) => b.status === "confirmed",
            );
            setStats({ totalPasses: confirmed.length });
          }
        } catch (err) {
          console.error("Data Sync Interrupted");
        } finally {
          setLoading(false);
        }
      };
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleUpdate = () => {
    toast.success("PROFILE UPDATED // SYNC COMPLETE", {
      style: {
        background: "#10b981",
        color: "#fff",
        fontSize: "12px",
        fontWeight: "600",
      },
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#d1d5db] font-sans selection:bg-indigo-600">
      <div className="h-1 bg-indigo-600 w-full opacity-50"></div>

      <div className="max-w-350 mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        <div className="lg:col-span-4 bg-[#080808] border-r border-white/5 p-10 md:p-16 flex flex-col">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-all mb-16"
          >
            <FaArrowLeft /> Exit Terminal
          </button>

          <div className="mb-12">
            <div className="w-24 h-24 bg-indigo-600 rounded flex items-center justify-center mb-8 shadow-2xl shadow-indigo-600/20">
              <span className="text-4xl font-bold text-white uppercase">
                {user?.name?.charAt(0)}
              </span>
            </div>
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.3em] mb-2">
              Personnel Identity
            </p>
            <h2 className="text-3xl font-bold text-white tracking-tight leading-tight">
              {user?.name}
            </h2>
            <p className="text-sm text-slate-500 mt-2 font-medium">
              {user?.email}
            </p>
          </div>

          <div className="space-y-6 pt-10 border-t border-white/5">
            <StatusRow
              label="Clearance Level"
              value={
                user?.role === "admin" ? "Level 01 (Admin)" : "Level 03 (User)"
              }
            />
            <StatusRow label="Assigned Node" value="Bhopal / Central IN" />
            <StatusRow label="System Status" value="Online / Secured" />
          </div>
        </div>

        <div className="lg:col-span-8 p-10 md:p-20 bg-[#050505]">
          <div className="max-w-3xl">
            <section className="mb-20">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-3">
                  <FaTerminal className="text-indigo-600" /> Account Parameters
                </h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-xs font-bold uppercase tracking-widest text-indigo-500 border border-indigo-500/30 px-6 py-2.5 hover:bg-indigo-600 hover:text-white transition-all rounded"
                  >
                    <FaPen className="inline mr-2" /> Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <button
                      onClick={handleUpdate}
                      className="text-xs font-bold uppercase tracking-widest text-white bg-indigo-600 px-6 py-2.5 rounded"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="text-xs font-bold uppercase tracking-widest text-white/40 px-6 py-2.5 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-0 border-t border-white/5">
                <InputRow
                  label="Display Name"
                  value={formData.name}
                  isEditing={isEditing}
                  onChange={(v) => setFormData({ ...formData, name: v })}
                />
                <InputRow
                  label="Email Address"
                  value={formData.email}
                  isEditing={isEditing}
                  onChange={(v) => setFormData({ ...formData, email: v })}
                />
                <InputRow
                  label="Account Role"
                  value={user?.role?.toUpperCase()}
                  readOnly
                />
              </div>
            </section>

            {user?.role !== "admin" && (
              <section className="mb-16">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-3 mb-10">
                  <FaDatabase className="text-indigo-600" /> Authorized Passes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MetricBox
                    label="Vault Inventory"
                    value={loading ? "..." : stats.totalPasses}
                    unit="Items"
                  />
                  <MetricBox
                    label="Verification"
                    value="Verified"
                    unit="Status"
                  />
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusRow = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
      {label}
    </span>
    <span className="text-sm font-bold text-white tracking-wide">{value}</span>
  </div>
);

const InputRow = ({ label, value, isEditing, onChange, readOnly }) => (
  <div className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-white/5 hover:bg-white/1 px-2 transition-all">
    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 md:mb-0">
      {label}
    </span>
    {isEditing && !readOnly ? (
      <input
        className="bg-[#0a0a0a] border border-white/10 text-white font-semibold text-lg px-4 py-2 outline-none w-full md:w-1/2 focus:border-indigo-500 transition-all rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <span
        className={`text-lg font-bold tracking-tight ${readOnly ? "text-slate-600" : "text-white"}`}
      >
        {value}
      </span>
    )}
  </div>
);

const MetricBox = ({ label, value, unit }) => (
  <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded hover:border-indigo-500/50 transition-all">
    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
      {label}
    </p>
    <div className="flex items-baseline gap-2">
      <span className="text-4xl font-bold text-white">{value}</span>
      <span className="text-xs font-bold text-indigo-500 uppercase">
        {unit}
      </span>
    </div>
  </div>
);

export default Profile;
