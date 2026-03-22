import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaRocket, FaTimes } from "react-icons/fa";
import api from "../../utils/axios";

const CreateEventModal = ({ onClose, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "Other",
    totalSeats: "",
    ticketPrice: "",
    imageUrl: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/events/create-event", formData);
      if (data.success) {
        toast.success("Event deployed to Zion network");
        onRefresh();
        onClose();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Deployment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100 flex items-center justify-center p-6">
      <div className="bg-[#0f1115] border border-slate-800 w-full max-w-2xl rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Deployment Console
            </h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-medium">
              Add new experience to Bhopal node
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors p-2 bg-slate-900 rounded-lg"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <Input
            label="Event Title"
            value={formData.title}
            onChange={(v) => setFormData({ ...formData, title: v })}
            placeholder="e.g. Techno Night"
          />

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
              Category
            </label>
            <select
              className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-sm focus:border-indigo-500 outline-none text-slate-300 font-medium"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              {["Music", "Sports", "Tech", "Art", "Business", "Other"].map(
                (c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
              Brief Description
            </label>
            <textarea
              required
              rows="2"
              className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-sm outline-none focus:border-indigo-500 text-slate-300"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="What's the vibe?"
            />
          </div>

          <Input
            label="Date & Time"
            type="datetime-local"
            value={formData.date}
            onChange={(v) => setFormData({ ...formData, date: v })}
          />
          <Input
            label="Venue"
            value={formData.location}
            onChange={(v) => setFormData({ ...formData, location: v })}
            placeholder="e.g. Sayaji, Bhopal"
          />
          <Input
            label="Price (₹)"
            type="number"
            value={formData.ticketPrice}
            onChange={(v) => setFormData({ ...formData, ticketPrice: v })}
          />
          <Input
            label="Capacity"
            type="number"
            value={formData.totalSeats}
            onChange={(v) => setFormData({ ...formData, totalSeats: v })}
          />

          <div className="md:col-span-2">
            <Input
              label="Cover Image URL"
              value={formData.imageUrl}
              onChange={(v) => setFormData({ ...formData, imageUrl: v })}
              placeholder="https://unsplash.com/..."
            />
          </div>

          <button
            disabled={loading}
            className="md:col-span-2 bg-indigo-600 hover:bg-indigo-500 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] mt-4 transition-all shadow-xl shadow-indigo-500/10 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              "PROCESSING..."
            ) : (
              <>
                <FaRocket className="text-[10px]" /> Confirm Deployment
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, type = "text", value, onChange, placeholder = "" }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
      {label}
    </label>
    <input
      required
      type={type}
      placeholder={placeholder}
      className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-sm outline-none focus:border-indigo-500 transition-all text-slate-300 font-medium"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default CreateEventModal;
