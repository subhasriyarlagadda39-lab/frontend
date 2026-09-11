import { useEffect, useState } from "react";

import { getWorkers } from "../../services/adminApi";

function Workers() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadWorkers();
  }, []);

  const loadWorkers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getWorkers();

      console.log("Workers API response:", data);

      if (Array.isArray(data)) {
        setWorkers(data);
      } else if (Array.isArray(data?.workers)) {
        setWorkers(data.workers);
      } else if (Array.isArray(data?.data)) {
        setWorkers(data.data);
      } else {
        setWorkers([]);
      }
    } catch (err) {
      console.error("Workers API error:", err);
      setError(err.message || "Failed to load workers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Workers
          </h1>

          <p className="text-slate-500 mt-1">
            Manage cooperative workers
          </p>
        </div>

        <button
          type="button"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          + Add Worker
        </button>
      </div>

      {loading && (
        <div className="bg-white border rounded-xl p-6">
          <p>Loading workers...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
          <p className="font-semibold text-red-600">
            Workers API Error
          </p>

          <p className="text-red-500 mt-1">
            {error}
          </p>

          <button
            type="button"
            onClick={loadWorkers}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="bg-white border rounded-xl overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="text-lg font-bold text-slate-800">
              Worker List
            </h2>
          </div>

          {workers.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No workers found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Phone</th>
                    <th className="text-left p-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {workers.map((worker, index) => (
                    <tr
                      key={worker.id || worker.workerId || index}
                      className="border-t"
                    >
                      <td className="p-4">
                        {worker.name || "-"}
                      </td>

                      <td className="p-4">
                        {worker.email || "-"}
                      </td>

                      <td className="p-4">
                        {worker.phone || "-"}
                      </td>

                      <td className="p-4">
                        {worker.status || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default Workers;