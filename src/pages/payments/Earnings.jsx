import { useEffect, useState } from "react";

import { getAdminDashboard } from "../../services/api";

function Earnings() {
  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadEarnings();
  }, []);

  const loadEarnings = async () => {
    try {
      setLoading(true);

      const data =
        await getAdminDashboard();

      setDashboard(data);
    } catch (err) {
      setError(
        err.message ||
          "Failed to load earnings"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="p-4 md:p-8">
        Loading earnings...
      </main>
    );
  }

  return (
    <main className="p-4 md:p-8 space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Earnings
        </h1>

        <p className="text-slate-500 mt-1">
          Cooperative payment earnings overview.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-white border rounded-xl p-6">

          <p className="text-sm text-slate-500">
            Successful Payment Earnings
          </p>

          <p className="text-3xl font-bold text-green-600 mt-2">
            ₹
            {dashboard?.successfulPaymentEarnings ??
              0}
          </p>

        </div>

        <div className="bg-white border rounded-xl p-6">

          <p className="text-sm text-slate-500">
            Welfare Fund
          </p>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            ₹
            {dashboard?.welfareFundTotal ??
              0}
          </p>

        </div>

        <div className="bg-white border rounded-xl p-6">

          <p className="text-sm text-slate-500">
            Today's Scheduled Jobs
          </p>

          <p className="text-3xl font-bold text-slate-800 mt-2">
            {dashboard?.todaysScheduledJobs ??
              0}
          </p>

        </div>

      </div>

      <section className="bg-blue-50 border border-blue-100 rounded-xl p-5">

        <h2 className="font-bold">
          Earnings API
        </h2>

        <p className="text-sm text-slate-600 mt-2">
          Admin earnings are currently supplied
          through the admin dashboard API.
          The worker-only earnings endpoint is not
          used here because it requires ROLE_WORKER.
        </p>

      </section>

    </main>
  );
}

export default Earnings;