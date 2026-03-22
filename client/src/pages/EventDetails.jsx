import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaArrowLeft, FaFingerprint } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/axios";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/events/${id}`);
        setEvent(data.event);
      } catch (err) {
        toast.error("System: Asset not found");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleBookingRequest = async () => {
    setBookingLoading(true);
    try {
      await api.post("/bookings/send-otp");
      setShowOtpModal(true);
      toast.success("Security Code Dispatched");
    } catch (err) {
      toast.error("Relay Failure");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      const { data } = await api.post("/bookings", { eventId: id, otp });
      if (data.success) {
        toast.success("Access Pending Approval");
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error("Invalid Cipher");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="w-1 h-12 bg-indigo-600 animate-pulse"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#080808] text-[#a0a0a0] font-sans selection:bg-white selection:text-black pb-20">
      <div className="relative h-112.5 w-full bg-black overflow-hidden">
        <img
          src={event.imageUrl}
          className="w-full h-full object-cover opacity-40  transition-all duration-1000  hover:opacity-60"
          alt="hero"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#080808] via-transparent to-transparent"></div>

        <div className="absolute bottom-12 flex flex-col  md:gap-36 left-3 md:left-24 max-w-4xl">
          <button
            onClick={() => navigate(-1)}
            className="text-[10px] font-bold hidden uppercase tracking-[0.4em] text-indigo-500 mb-8 sm:flex items-center gap-2 hover:text-white transition-all"
          >
            <FaArrowLeft size={10} /> Back to Circuit
          </button>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-3">
              {event.category} // Bhopal Node
            </p>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none italic">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 mt-16">
        <div className="lg:col-span-8 space-y-12">
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-6 border-l-2 border-indigo-600 pl-4">
              Briefing
            </h2>
            <p className="text-xl text-white/80 font-medium leading-relaxed max-w-2xl italic">
              "{event.description}"
            </p>
          </section>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 border-t border-white/5 pt-10">
            <Spec label="Venue" value={event.location} />
            <Spec
              label="Timeline"
              value={new Date(event.date).toDateString()}
            />
            <Spec
              label="Inventory"
              value={`${event.availableSeats} Passes Left`}
            />
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-[#0f0f0f] border border-white/5 p-10 rounded-sm sticky top-24">
            <div className="mb-10">
              <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em] mb-2">
                Access Valuation
              </p>
              <h3 className="text-5xl font-black text-white tracking-tighter italic">
                ₹{event.ticketPrice}
              </h3>
            </div>

            <button
              onClick={handleBookingRequest}
              disabled={event.availableSeats < 1 || bookingLoading}
              className="w-full bg-white text-black py-5 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-indigo-600 hover:text-white transition-all duration-500 disabled:opacity-10"
            >
              {event.availableSeats < 1
                ? "EXHAUSTED"
                : bookingLoading
                  ? "PROCESSING..."
                  : "SECURE PASS"}
            </button>

            <div className="mt-8 pt-8 border-t border-white/5">
              <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] flex items-center justify-between">
                Protocol: <span>ZION-v2-AUTH</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {showOtpModal && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <FaFingerprint className="text-indigo-600 text-4xl mx-auto mb-8 animate-pulse" />
            <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-2 italic">
              Verify Identity
            </h2>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-12">
              Cipher sent to registered email
            </p>

            <form onSubmit={handleConfirmBooking} className="space-y-12">
              <input
                type="text"
                maxLength="6"
                required
                autoFocus
                className="w-full bg-transparent border-b border-white/10 text-white text-6xl font-black tracking-[0.5em] text-center outline-none focus:border-white transition-all pb-6"
                placeholder="000000"
                onChange={(e) => setOtp(e.target.value)}
              />
              <div className="flex flex-col gap-6">
                <button
                  type="submit"
                  className="w-full bg-white text-black py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-indigo-600 hover:text-white transition-all"
                >
                  Confirm Reservation
                </button>
                <button
                  type="button"
                  onClick={() => setShowOtpModal(false)}
                  className="text-[9px] font-black text-white/20 uppercase tracking-widest hover:text-white transition-colors"
                >
                  Abort
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Spec = ({ label, value }) => (
  <div>
    <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em] mb-2">
      {label}
    </p>
    <p className="text-xs font-black text-white uppercase tracking-tight">
      {value}
    </p>
  </div>
);

export default EventDetails;
