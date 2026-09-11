import { useEffect, useState } from "react";

import {
  getWelfare,
  getWelfareSummary,
} from "../../services/adminApi";

function Welfare() {
  const [welfare, setWelfare] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadWelfare();
  }, []);

  const loadWelfare = async () => {
    try {
      setLoading(true);
      setError("");

      const [welfareData, summaryData] = await Promise.all([
        getWelfare(),
        getWelfareSummary(),
      ]);

      setWelfare(welfareData);
      setSummary(summaryData);
    } catch (err) {
      setError(
        err.message || "Failed to load welfare data"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="p-4 md:p-8">
        <p>Loading welfare information...</p>
      </main>
    );
  }

  return (
    <main className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Welfare Fund
        </h1>

        <p className="text-slate-500 mt-1">
          View cooperative welfare information.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <section className="bg-white border rounded-xl p-6">
          <p className="text-sm text-slate-500">
            Welfare Total
          </p>

          <p className="text-3xl font-bold text-green-600 mt-2">
            ₹
            {summary?.total ??
              summary?.totalAmount ??
              welfare?.total ??
              welfare?.amount ??
              0}
          </p>
        </section>

        <section className="bg-white border rounded-xl p-6">
          <p className="text-sm text-slate-500">
            Contributions
          </p>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            {summary?.count ??
              summary?.totalPayments ??
              0}
          </p>
        </section>

        <section className="bg-white border rounded-xl p-6">
          <p className="text-sm text-slate-500">
            Status
          </p>

          <p className="text-xl font-bold mt-2">
            Active
          </p>
        </section>
      </div>

      <section className="bg-white border rounded-xl p-6">
        <h2 className="text-lg font-bold mb-5">
          Welfare Information
        </h2>

        {welfare ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Object.entries(welfare).map(
              ([key, value]) => (
                <div key={key}>
                  <p className="text-sm text-slate-500">
                    {key}
                  </p>

                  <p className="font-medium mt-1">
                    {typeof value === "object" &&
                    value !== null
                      ? JSON.stringify(value)
                      : String(value ?? "-")}
                  </p>
                </div>
              )
            )}
          </div>
        ) : (
          <p className="text-slate-500">
            No welfare data available.
          </p>
        )}
      </section>
    </main>
  );
}

export default Welfare;