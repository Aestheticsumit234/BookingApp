import { FaCheck, FaCheckDouble } from "react-icons/fa";

const BookingTable = ({
  pendingBookings,
  confirmedBookings,
  loading,
  onConfirm,
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="bg-[#0d1117] border border-slate-800 rounded overflow-hidden shadow-2xl h-fit">
      <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
        <h3 className="text-lg font-black text-white uppercase tracking-tighter italic">
          Event <span className="text-amber-500">Queue</span>
        </h3>
        <span className="bg-amber-500/10 text-amber-500 text-[10px] px-3 py-1 rounded font-bold">
          {pendingBookings.length} Pending
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[9px] text-slate-500 uppercase font-black tracking-widest bg-slate-900/80 border-b border-slate-800/50">
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Asset</th>
              <th className="px-6 py-4 text-right">Approve</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {loading ? (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-12 text-center text-slate-500 italic text-xs tracking-widest uppercase font-bold animate-pulse"
                >
                  Decrypting...
                </td>
              </tr>
            ) : pendingBookings.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-12 text-center text-slate-500 font-medium text-sm"
                >
                  No pending requests. Queue is clear.
                </td>
              </tr>
            ) : (
              pendingBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-slate-800/30 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-200 text-sm truncate max-w-30">
                      {booking.userId?.name}
                    </p>
                    <p className="text-[9px] text-slate-500 font-mono mt-0.5 truncate max-w-30">
                      {booking.userId?.email}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-indigo-400 font-semibold text-xs truncate max-w-30">
                      {booking.eventId?.title}
                    </p>
                    <p className="text-[9px] text-slate-500 uppercase font-bold mt-0.5">
                      ₹{booking.eventId?.ticketPrice || booking.amount}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onConfirm(booking._id)}
                      className="bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white p-2.5 rounded-lg transition-all border border-slate-700 hover:border-emerald-500"
                      title="Confirm Pass"
                    >
                      <FaCheck size={12} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>

    {/* Right side ka page */}
    <div className="bg-[#0d1117] border border-slate-800 rounded overflow-hidden shadow-2xl h-fit opacity-90 hover:opacity-100 transition-opacity">
      <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
        <h3 className="text-lg font-black text-white uppercase tracking-tighter italic">
          Verified <span className="text-indigo-500">Vault</span>
        </h3>
        <span className="bg-indigo-500/10 text-indigo-400 text-[10px] px-3 py-1 rounded font-bold">
          {confirmedBookings.length} Approved
        </span>
      </div>
      <div className="overflow-x-auto max-h-125 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[9px] text-slate-500 uppercase font-black tracking-widest bg-slate-900/80 border-b border-slate-800/50">
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Asset</th>
              <th className="px-6 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {loading ? (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-12 text-center text-slate-500 italic text-xs tracking-widest uppercase font-bold animate-pulse"
                >
                  Decrypting...
                </td>
              </tr>
            ) : confirmedBookings.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-12 text-center text-slate-500 font-medium text-sm"
                >
                  No verified passes yet.
                </td>
              </tr>
            ) : (
              confirmedBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-300 text-sm truncate max-w-30">
                      {booking.userId?.name}
                    </p>
                    <p className="text-[9px] text-slate-600 font-mono mt-0.5 truncate max-w-30">
                      {booking.userId?.email}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-400 font-medium text-xs truncate max-w-30">
                      {booking.eventId?.title}
                    </p>
                    <p className="text-[9px] text-slate-600 uppercase font-bold mt-0.5">
                      ID: ZN-{booking._id.slice(-4).toUpperCase()}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-emerald-500">
                      <FaCheckDouble size={10} /> Verified
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
