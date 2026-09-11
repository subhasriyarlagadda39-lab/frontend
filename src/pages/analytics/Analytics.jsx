import { useEffect, useState } from "react";

import {
  getDashboard,
  getDashboardDemand,
} from "../../services/adminApi";

function Analytics() {
  const [dashboard, setDashboard] = useState(null);
  const [demand, setDemand] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const [dashboardData, demandData] = await Promise.all([
        getDashboard(),
        getDashboardDemand(),
      ]);

      setDashboard(dashboardData);

      if (Array.isArray(demandData)) {
        setDemand(demandData);
      } else if (Array.isArray(demandData?.demand)) {
        setDemand(demandData.demand);
      } else if (Array.isArray(demandData?.data)) {
        setDemand(demandData.data);
      } else {
        setDemand([]);
      }
    } catch (err) {
      setError(
        err.message || "Failed to load analytics data"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="p-4 md:p-8">
        <p>Loading analytics...</p>
      </main>
    );
  }

  return (
    <main className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Analytics
        </h1>

        <p className="text-slate-500 mt-1">
          View cooperative platform performance and demand.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <section className="bg-white border rounded-xl p-6">
          <p className="text-sm text-slate-500">
            Total Workers
          </p>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            {dashboard?.totalWorkers ?? 0}
          </p>
        </section>

        <section className="bg-white border rounded-xl p-6">
          <p className="text-sm text-slate-500">
            Active Workers
          </p>

          <p className="text-3xl font-bold text-green-600 mt-2">
            {dashboard?.activeWorkers ?? 0}
          </p>
        </section>

        <section className="bg-white border rounded-xl p-6">
          <p className="text-sm text-slate-500">
            Today's Jobs
          </p>

          <p className="text-3xl font-bold text-purple-600 mt-2">
            {dashboard?.todayScheduledJobs ?? 0}
          </p>
        </section>

        <section className="bg-white border rounded-xl p-6">
          <p className="text-sm text-slate-500">
            Today's Earnings
          </p>

          <p className="text-3xl font-bold text-orange-600 mt-2">
            ₹
            {dashboard?.todaySuccessfulPaymentEarnings ??
              dashboard?.todayEarnings ??
              0}
          </p>
        </section>
      </div>

      <section className="bg-white border rounded-xl p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-5">
          Service Demand
        </h2>

        {demand.length === 0 ? (
          <p className="text-slate-500">
            No demand data available.
          </p>
        ) : (
          <div className="space-y-4">
            {demand.map((item, index) => {
              const service =
                item.service ||
                item.serviceName ||
                item.name ||
                `Service ${index + 1}`;

              const count =
                item.count ??
                item.bookingCount ??
                item.demand ??
                item.total ??
                0;

              return (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-slate-700">
                      {service}
                    </span>

                    <span className="text-sm text-slate-500">
                      {count}
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{
                        width: `${Math.min(
                          Number(count) * 10,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="bg-white border rounded-xl p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-5">
          Dashboard Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="border rounded-lg p-4">
            <p className="text-sm text-slate-500">
              Available Workers
            </p>

            <p className="text-2xl font-bold mt-1">
              {dashboard?.availableWorkers ?? 0}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-sm text-slate-500">
              Welfare Fund
            </p>

            <p className="text-2xl font-bold text-green-600 mt-1">
              ₹
              {dashboard?.welfareFundTotal ??
                dashboard?.welfareFund ??
                0}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Analytics;