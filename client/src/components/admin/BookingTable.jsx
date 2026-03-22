import { FaCheck } from "react-icons/fa";

const BookingTable = ({ bookings, loading, onConfirm }) => (
  <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
    <div className="p-8 border-b border-slate-800 bg-slate-900/30">
      <h3 className="text-xl font-bold text-white tracking-tight">
        Queue Management
      </h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-[10px] text-slate-500 uppercase tracking-[0.15em] bg-slate-900/80">
            <th className="px-8 py-5">Client Identity</th>
            <th className="px-8 py-5">Event Target</th>
            <th className="px-8 py-5 text-right">Approval</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {loading ? (
            <tr>
              <td
                colSpan="3"
                className="px-8 py-16 text-center text-slate-500 italic text-sm"
              >
                Synchronizing data...
              </td>
            </tr>
          ) : bookings.length === 0 ? (
            <tr>
              <td
                colSpan="3"
                className="px-8 py-16 text-center text-slate-500 font-medium"
              >
                Queue is empty
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr
                key={booking._id}
                className=" hover:bg-indigo-500/2 transition-colors"
              >
                <td className="px-8 py-6">
                  <p className="font-bold text-slate-200">
                    {booking.userId?.name}
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                    {booking.userId?.email}
                  </p>
                </td>
                <td className="px-8 py-6">
                  <p className="text-indigo-400 font-semibold">
                    {booking.eventId?.title}
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold mt-0.5">
                    ₹{booking.amount}
                  </p>
                </td>
                <td className="px-8 py-6 text-right">
                  <button
                    onClick={() => onConfirm(booking._id)}
                    className="bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white p-3 rounded-xl transition-all border border-slate-700"
                  >
                    <FaCheck size={14} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default BookingTable;
