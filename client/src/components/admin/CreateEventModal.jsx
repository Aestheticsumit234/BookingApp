import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";
import { FaCalendarPlus, FaTimes } from "react-icons/fa";
import api from "../../utils/axios";

const CreateEventModal = ({ onClose, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "Music",
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
        toast.success("Event created successfully!");
        onRefresh();
        onClose();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0c0c0e] border border-white/10 w-full max-w-2xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden relative">
        <div className="px-6 py-4 border-b border-white/10 bg-[#0c0c0e] flex justify-between items-center z-20">
          <div className="flex items-center gap-3">
            <div className="text-indigo-500">
              <FaCalendarPlus size={16} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Create New Event
              </h2>
              <p className="text-[11px] text-gray-400">
                Deploy a new experience to the circuit.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
          >
            <FaTimes size={14} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <form
            id="createEventForm"
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Event Title
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Neo-Tech Summit Bhopal"
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all placeholder:text-gray-600 text-sm"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Category
                </label>
                <select
                  className="w-full bg-[#131316] border border-white/10 text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-indigo-500 transition-all cursor-pointer text-sm"
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

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Date & Time
                </label>
                <DatePicker
                  selected={formData.date ? new Date(formData.date) : null}
                  onChange={(date) => setFormData({ ...formData, date: date })}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  placeholderText="Select date and time"
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all text-sm cursor-pointer"
                  wrapperClassName="w-full"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Venue / Coordinates
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. MP Nagar Hub, Zone 1"
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all placeholder:text-gray-600 text-sm"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Ticket Price (₹)
                </label>
                <input
                  required
                  type="number"
                  min="0"
                  placeholder="0 for Free Entry"
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all placeholder:text-gray-600 text-sm"
                  value={formData.ticketPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, ticketPrice: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Inventory Capacity
                </label>
                <input
                  required
                  type="number"
                  min="1"
                  placeholder="e.g. 100 Seats"
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all placeholder:text-gray-600 text-sm"
                  value={formData.totalSeats}
                  onChange={(e) =>
                    setFormData({ ...formData, totalSeats: e.target.value })
                  }
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Event Briefing
                </label>
                <textarea
                  required
                  rows="2"
                  placeholder="Detail the operational parameters of this event..."
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all resize-none placeholder:text-gray-600 text-sm"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Cover Image URL
                </label>
                <input
                  required
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all placeholder:text-gray-600 text-sm"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                />
              </div>
            </div>
          </form>
        </div>

        <div className="px-6 py-4 border-t border-white/10 bg-[#0c0c0e] flex items-center justify-end gap-3 z-20">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-gray-400 hover:text-white bg-transparent hover:bg-white/5 rounded-lg transition-all"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="createEventForm"
            disabled={loading}
            className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 flex items-center gap-2 active:scale-95"
          >
            {loading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              "Publish Event"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;
