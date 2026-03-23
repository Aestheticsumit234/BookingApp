import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const BookingCard = ({ booking, onShowQr, onCancel }) => {
  return (
    <div className="relative group">
      <div className="flex flex-col md:flex-row bg-[#0d1117] border border-slate-800 rounded-3xl overflow-hidden hover:border-indigo-500/40 transition-all duration-500 shadow-2xl">
        <div className="md:w-1/3 relative h-48 md:h-auto bg-slate-900">
          <img
            src={booking.eventId?.imageUrl}
            className="w-full h-full max-h-56 object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 grayscale group-hover:grayscale-0"
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

          <div className="w-full flex flex-col space-y-3">
            <button
              onClick={onShowQr}
              className="w-full bg-white text-black py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all cursor-pointer active:scale-95"
            >
              Show Access Code
            </button>
            <button
              onClick={onCancel}
              className="w-full text-slate-600 hover:text-red-500 text-[9px] font-black uppercase tracking-widest transition-colors py-2 cursor-pointer"
            >
              Revoke Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
