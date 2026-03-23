import { useContext, useEffect, useState } from "react";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaFire,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import api from "../utils/axios";

const TrendingDrops = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setEventsLoading(true);
        const { data } = await api.get("/events");
        if (data.success) {
          setUpcomingEvents(data.events.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to load events", error);
      } finally {
        setEventsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleProtectedClick = (path) => {
    user ? navigate(path) : navigate("/login");
  };

  return (
    <section className="py-32 px-6 max-w-6xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-zinc-800/50 pb-6 gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Trending <span className="text-indigo-400">Drops</span>
          </h2>
          <p className="text-zinc-500 mt-2 text-sm font-medium">
            Reserve your spot before the queue fills up.
          </p>
        </div>
        <Link
          to="/events"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
        >
          View All Matrix <FaArrowRight />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {eventsLoading ? (
          [1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-100 bg-zinc-900/50 border border-zinc-800/50 rounded animate-pulse"
            ></div>
          ))
        ) : upcomingEvents.length === 0 ? (
          <div className="col-span-3 py-20 text-center border border-zinc-800/50 rounded bg-zinc-900/20">
            <p className="text-zinc-500 font-medium text-sm">
              No upcoming drops currently active.
            </p>
          </div>
        ) : (
          upcomingEvents.map((event) => {
            const isSoldOut = event.availableSeats === 0;
            const isAlmostFull =
              event.availableSeats > 0 && event.availableSeats <= 10;

            return (
              <div
                key={event._id}
                className="group relative flex flex-col bg-zinc-900/40 border border-zinc-800/80 rounded overflow-hidden hover:border-indigo-500/50 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.2)]"
              >
                {isSoldOut ? (
                  <div className="absolute top-4 right-4 z-20 bg-black/90 text-zinc-500 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded border border-zinc-800">
                    SOLD OUT
                  </div>
                ) : isAlmostFull ? (
                  <div className="absolute top-4 right-4 z-20 bg-red-500/90 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded flex items-center gap-1.5 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)] border border-red-400/50">
                    <FaFire /> Only {event.availableSeats} Left
                  </div>
                ) : null}

                <div className="relative h-56 overflow-hidden bg-zinc-950">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${isSoldOut ? "grayscale opacity-40" : "group-hover:scale-105 opacity-80 group-hover:opacity-100"}`}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#09090b] via-[#09090b]/40 to-transparent"></div>
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-zinc-950/80 border border-zinc-700 text-zinc-300 px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest">
                      {event.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 relative z-10 -mt-6">
                  <h3
                    className={`text-xl font-bold tracking-tight mb-4 line-clamp-2 ${isSoldOut ? "text-zinc-500" : "text-zinc-100"}`}
                  >
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-6 text-xs text-zinc-400 font-medium">
                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="text-indigo-400" />
                      {new Date(event.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-indigo-400" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto pt-5 border-t border-zinc-800/80 flex items-center justify-between">
                    <div>
                      <p
                        className={`text-lg font-bold ${isSoldOut ? "text-zinc-600" : "text-white"}`}
                      >
                        {event.ticketPrice > 0
                          ? `₹${event.ticketPrice}`
                          : "FREE"}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleProtectedClick(`/event/${event._id}`)
                      }
                      disabled={isSoldOut}
                      className={`px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${
                        isSoldOut
                          ? "bg-zinc-900 text-zinc-700 cursor-not-allowed border border-zinc-800"
                          : "bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95"
                      }`}
                    >
                      {isSoldOut ? "Closed" : "Get Pass"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default TrendingDrops;
