import { QRCodeSVG } from "qrcode.react";
import { FaTimes } from "react-icons/fa";

const QrModal = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="bg-[#0c0c0e] border border-white/10 rounded-3xl p-8 max-w-sm w-full shadow-2xl shadow-indigo-500/10 relative flex flex-col items-center text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white bg-white/5 p-2 rounded-full transition-colors"
        >
          <FaTimes size={14} />
        </button>

        <h3 className="text-lg font-black text-white uppercase italic tracking-tighter mb-1">
          {booking.eventId?.title}
        </h3>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-8">
          Scan at Venue Entrance
        </p>

        <div className="bg-white p-5 rounded-3xl shadow-inner mb-8">
          <QRCodeSVG
            value={booking._id}
            size={180}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"H"}
          />
        </div>

        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">
          Pass Identifier
        </p>
        <p className="text-sm font-mono text-white tracking-widest">
          ZN-{booking._id.slice(-6).toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default QrModal;
