import { FaCheckDouble, FaExternalLinkAlt } from "react-icons/fa";

const BookingTable = ({ bookings, loading }) => (
  <div className="w-full">
    <div className="bg-[#0d1117] border border-slate-800 rounded overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-black text-white uppercase tracking-tighter italic">
            Verified <span className="text-indigo-500">Vault</span>
          </h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
            Real-time Transaction Logs
          </p>
        </div>
        <span className="bg-indigo-500/10 text-indigo-400 text-[10px] px-4 py-1.5 rounded-full border border-indigo-500/20 font-black uppercase tracking-widest">
          {bookings.length} Issued
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] bg-slate-900/80 border-b border-slate-800/50">
              <th className="px-8 py-5">Client Identity</th>
              <th className="px-8 py-5">Asset / Event</th>
              <th className="px-8 py-5">Value</th>
              <th className="px-8 py-5">Transaction ID</th>
              <th className="px-8 py-5 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 italic text-[10px] tracking-[0.3em] uppercase font-bold">
                      Decrypting Vault...
                    </p>
                  </div>
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-8 py-20 text-center text-slate-500 font-medium text-sm italic"
                >
                  Vault is empty. No verified transactions detected.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-indigo-500/2 transition-colors group border-b border-slate-800/30"
                >
                  <td className="px-8 py-5">
                    <p className="font-black text-slate-200 text-sm tracking-tight uppercase">
                      {booking.userId?.name}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                      {booking.userId?.email}
                    </p>
                  </td>

                  <td className="px-8 py-5">
                    <p className="text-indigo-400 font-bold text-xs uppercase tracking-wide">
                      {booking.eventId?.title}
                    </p>
                    <p className="text-[9px] text-slate-600 font-bold mt-1 uppercase">
                      Node: {booking.eventId?.location || "Global"}
                    </p>
                  </td>

                  <td className="px-8 py-5">
                    <p className="text-white font-black text-sm italic">
                      ₹{booking.amount || booking.eventId?.ticketPrice}
                    </p>
                  </td>

                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-slate-500 group-hover:text-slate-300 transition-colors">
                      <p className="text-[10px] font-mono">
                        {booking.razorpay_payment_id || "ZN-MOCK-TX"}
                      </p>
                      <FaExternalLinkAlt
                        size={8}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </td>

                  <td className="px-8 py-5 text-right">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <FaCheckDouble size={10} />
                      <span className="text-[9px] font-black uppercase tracking-widest">
                        Verified
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default BookingTable;
