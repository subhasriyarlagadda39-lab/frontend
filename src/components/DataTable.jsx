import StatusBadge from "./statusbadge"

function DataTable({ bookings }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-slate-500">
            <th className="p-3">Booking ID</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Worker</th>
            <th className="p-3">Service</th>
            <th className="p-3">Price</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b hover:bg-slate-50">
              <td className="p-3 font-medium">{booking.id}</td>
              <td className="p-3">{booking.customer}</td>
              <td className="p-3">{booking.worker}</td>
              <td className="p-3">{booking.service}</td>
              <td className="p-3 font-medium">{booking.price}</td>
              <td className="p-3">
                <StatusBadge status={booking.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable