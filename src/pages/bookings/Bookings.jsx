import { useEffect, useState } from "react";

import {
  getBookings,
  getBooking,
  getWorkers,
  createJob,
} from "../../services/adminApi";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState("");

  const [loading, setLoading] = useState(true);
  const [workersLoading, setWorkersLoading] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getBookings();

      if (Array.isArray(data)) {
        setBookings(data);
      } else if (Array.isArray(data?.bookings)) {
        setBookings(data.bookings);
      } else if (Array.isArray(data?.content)) {
        setBookings(data.content);
      } else if (Array.isArray(data?.data)) {
        setBookings(data.data);
      } else {
        setBookings([]);
      }
    } catch (err) {
      setError(
        err.message || "Failed to load bookings"
      );
    } finally {
      setLoading(false);
    }
  };

  const loadWorkers = async () => {
    try {
      setWorkersLoading(true);

      const data = await getWorkers();

      if (Array.isArray(data)) {
        setWorkers(data);
      } else if (Array.isArray(data?.workers)) {
        setWorkers(data.workers);
      } else if (Array.isArray(data?.content)) {
        setWorkers(data.content);
      } else if (Array.isArray(data?.data)) {
        setWorkers(data.data);
      } else {
        setWorkers([]);
      }
    } catch (err) {
      setError(
        err.message || "Failed to load workers"
      );
    } finally {
      setWorkersLoading(false);
    }
  };

  const handleViewBooking = async (booking) => {
    try {
      setError("");

      const bookingId =
        booking.id ??
        booking.bookingId;

      if (!bookingId) {
        setSelectedBooking(booking);
        return;
      }

      const data = await getBooking(bookingId);

      setSelectedBooking(data);
    } catch (err) {
      setError(
        err.message || "Failed to load booking details"
      );
    }
  };

  const openAssignModal = async (booking) => {
    setSelectedBooking(booking);
    setSelectedWorker("");
    setMessage("");
    setError("");

    setShowBookingModal(true);

    await loadWorkers();
  };

  const handleAssignWorker = async () => {
    if (!selectedBooking) {
      setError("Please select a booking.");
      return;
    }

    if (!selectedWorker) {
      setError("Please select a worker.");
      return;
    }

    const bookingId =
      selectedBooking.id ??
      selectedBooking.bookingId;

    if (!bookingId) {
      setError("Booking ID is missing.");
      return;
    }

    try {
      setError("");
      setMessage("");

      await createJob({
        bookingId: Number(bookingId),
        workerId: Number(selectedWorker),
      });

      setMessage(
        "Worker assigned successfully."
      );

      setShowBookingModal(false);
      setSelectedWorker("");

      await loadBookings();
    } catch (err) {
      setError(
        err.message || "Failed to assign worker"
      );
    }
  };

  const getBookingId = (booking) => {
    return (
      booking.id ??
      booking.bookingId ??
      "-"
    );
  };

  const getCustomerName = (booking) => {
    return (
      booking.customerName ??
      booking.customer?.name ??
      booking.customer?.fullName ??
      "-"
    );
  };

  const getServiceName = (booking) => {
    return (
      booking.serviceName ??
      booking.service?.name ??
      booking.service ??
      "-"
    );
  };

  const getStatus = (booking) => {
    return (
      booking.status ??
      booking.bookingStatus ??
      "-"
    );
  };

  const getDate = (booking) => {
    return (
      booking.date ??
      booking.bookingDate ??
      booking.scheduledDate ??
      "-"
    );
  };

  const getWorkerName = (booking) => {
    return (
      booking.workerName ??
      booking.worker?.name ??
      "-"
    );
  };

  if (loading) {
    return (
      <main className="p-4 md:p-8">
        <p>Loading bookings...</p>
      </main>
    );
  }

  return (
    <main className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Bookings
          </h1>

          <p className="text-slate-500 mt-1">
            View bookings and assign workers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedBooking(null);
            setSelectedWorker("");
            setMessage("");
            setError("");
            setShowBookingModal(true);
            loadWorkers();
          }}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700"
        >
          Assign Worker
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {message && (
        <div className="bg-green-50 border border-green-200 text-green-600 p-4 rounded-lg">
          {message}
        </div>
      )}

      <section className="bg-white border rounded-xl overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold text-slate-800">
            All Bookings
          </h2>
        </div>

        {bookings.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No bookings available.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Booking ID
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Customer
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Service
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Date
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Worker
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking, index) => (
                  <tr
                    key={
                      booking.id ??
                      booking.bookingId ??
                      index
                    }
                    className="border-b last:border-b-0 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-medium text-slate-800">
                      #{getBookingId(booking)}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {getCustomerName(booking)}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {getServiceName(booking)}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {getDate(booking)}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {getWorkerName(booking)}
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        {getStatus(booking)}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleViewBooking(booking)
                          }
                          className="px-3 py-2 text-sm rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            openAssignModal(booking)
                          }
                          className="px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        >
                          Assign
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selectedBooking && !showBookingModal && (
        <section className="bg-white border rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-800">
              Booking Details
            </h2>

            <button
              type="button"
              onClick={() => setSelectedBooking(null)}
              className="text-slate-500 hover:text-slate-800"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Object.entries(selectedBooking).map(
              ([key, value]) => (
                <div
                  key={key}
                  className="border rounded-lg p-4"
                >
                  <p className="text-sm text-slate-500">
                    {key}
                  </p>

                  <p className="font-medium mt-1 text-slate-800">
                    {typeof value === "object" &&
                    value !== null
                      ? JSON.stringify(value)
                      : String(value ?? "-")}
                  </p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {showBookingModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-slate-800">
                Assign Worker
              </h2>

              <button
                type="button"
                onClick={() =>
                  setShowBookingModal(false)
                }
                className="text-slate-500 hover:text-slate-800 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Booking
                </label>

                <div className="border rounded-lg p-3 bg-slate-50">
                  {selectedBooking
                    ? `Booking #${getBookingId(
                        selectedBooking
                      )}`
                    : "Select a booking from the table"}
                </div>
              </div>

              {!selectedBooking && (
                <div>
                  <p className="text-sm text-slate-500">
                    To assign a worker, first click the
                    <strong> Assign </strong>
                    button for a booking in the table.
                  </p>
                </div>
              )}

              {selectedBooking && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Worker
                  </label>

                  {workersLoading ? (
                    <p className="text-sm text-slate-500">
                      Loading workers...
                    </p>
                  ) : workers.length === 0 ? (
                    <p className="text-sm text-red-600">
                      No workers available.
                    </p>
                  ) : (
                    <select
                      value={selectedWorker}
                      onChange={(e) =>
                        setSelectedWorker(e.target.value)
                      }
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">
                        Select a worker
                      </option>

                      {workers.map((worker, index) => (
                        <option
                          key={
                            worker.id ??
                            worker.workerId ??
                            index
                          }
                          value={
                            worker.id ??
                            worker.workerId
                          }
                        >
                          {worker.name ??
                            worker.fullName ??
                            `Worker ${
                              worker.id ??
                              worker.workerId ??
                              index + 1
                            }`}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setShowBookingModal(false)
                  }
                  className="px-5 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                {selectedBooking && (
                  <button
                    type="button"
                    onClick={handleAssignWorker}
                    disabled={
                      workersLoading ||
                      workers.length === 0
                    }
                    className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    Assign Worker
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Bookings;