import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaCalendarAlt,
  FaEdit,
  FaMapMarkerAlt,
  FaSearch,
  FaTicketAlt,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import api from "../utils/axios";

const Events = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const url = filter ? `/events?location=${filter}` : "/events";
      const { data } = await api.get(url);
      if (data.success) setEvents(data.events);
    } catch (err) {
      toast.error("Sync failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this asset?")) return;
    try {
      await api.delete(`/events/delete-event/${id}`);
      toast.success("Removed");
      fetchEvents();
    } catch (err) {
      toast.error("Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-300 p-4 md:p-8 font-sans selection:bg-indigo-500">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 border-b border-slate-800/40 pb-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase">
              LIVE <span className="text-indigo-500">EVENTS</span>
            </h1>
            <p className="text-[9px] text-slate-500 font-bold tracking-[0.3em] uppercase mt-1">
              Bhopal Node • Premium Access
            </p>
          </div>

          <div className="relative w-full md:w-72 group">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 text-xs" />
            <input
              type="text"
              placeholder="Filter location..."
              className="w-full bg-[#0d1117] border border-slate-800 rounded py-2.5 pl-10 pr-4 text-[10px] font-bold uppercase tracking-widest focus:border-indigo-500 outline-none transition-all"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>

        {filter && (
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
            Showing results for: <span className="text-white">{filter}</span>
          </p>
        )}

        {events.length === 0 && !loading && (
          <div className="text-center py-10 italic text-3xl font-bold tracking-widest text-slate-600">
            No events found for <span className="text-white">{filter}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-10 italic text-[10px] tracking-widest text-slate-600">
              DECRYPTING...
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event._id}
                className="group bg-[#0d1117] border border-slate-800 rounded overflow-hidden hover:border-indigo-500/30 transition-all duration-300 relative"
              >
                {user?.role === "admin" && (
                  <div className="absolute top-3 right-3 z-20 flex gap-2">
                    <button className="bg-black/50 backdrop-blur-md p-2 rounded-lg hover:text-indigo-400 transition-all">
                      <FaEdit size={10} />
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-black/50 backdrop-blur-md p-2 rounded-lg hover:text-red-500 transition-all"
                    >
                      <FaTrash size={10} />
                    </button>
                  </div>
                )}

                <div className="h-44 relative overflow-hidden">
                  <img
                    src={event.imageUrl}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 grayscale group-hover:grayscale-0"
                    alt="img"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0d1117] via-transparent to-transparent"></div>
                  <div className="absolute top-2 left-2 bg-indigo-600 px-2 py-0.5  text-[8px] font-black uppercase tracking-widest italic">
                    {event.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-4 truncate">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-6 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-indigo-500" />{" "}
                      {event.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-indigo-500" />{" "}
                      {new Date(event.date).toDateString()}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaTicketAlt className="text-indigo-500" />{" "}
                      {event.availableSeats} LEFT
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                    <p className="text-2xl font-black text-white italic tracking-tighter">
                      ₹{event.ticketPrice}
                    </p>
                    <Link
                      to={`/event/${event._id}`}
                      className="bg-white text-black hover:bg-indigo-600 hover:text-white px-5 py-2 rounded text-[9px] font-black uppercase tracking-widest transition-all"
                    >
                      Book Now
                    </Link>
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

export default Events;
