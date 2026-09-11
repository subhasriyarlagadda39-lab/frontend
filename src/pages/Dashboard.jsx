import { useEffect, useState } from "react";

import {
  getDashboard,
  getDashboardDemand,
} from "../services/adminApi";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [demand, setDemand] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      // Get dashboard data
      const dashboardData = await getDashboard();

      console.log(
        "Dashboard API response:",
        dashboardData
      );

      // Get service demand data
      const demandData = await getDashboardDemand();

      console.log(
        "Demand API response:",
        demandData
      );

      // Save dashboard data
      setDashboard(dashboardData);

      // Handle different possible demand response formats
      if (Array.isArray(demandData)) {
        setDemand(demandData);
      } else if (
        Array.isArray(demandData?.demand)
      ) {
        setDemand(demandData.demand);
      } else if (
        Array.isArray(demandData?.data)
      ) {
        setDemand(demandData.data);
      } else {
        setDemand([]);
      }
    } catch (err) {
      console.error(
        "Dashboard error:",
        err
      );

      setError(
        err.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <p className="mt-4 text-slate-500">
          Loading dashboard data...
        </p>
      </main>
    );
  }

  return (
    <main className="p-4 md:p-8 space-y-6">

      {/* ==============================
          HEADER
      ============================== */}

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-1">
          Manage your cooperative services
        </p>
      </div>


      {/* ==============================
          ERROR
      ============================== */}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-5">

          <p className="font-semibold text-red-600">
            Dashboard API Error
          </p>

          <p className="text-red-500 mt-1">
            {error}
          </p>

          <button
            type="button"
            onClick={loadDashboard}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>

        </div>
      )}


      {/* ==============================
          STAT CARDS
      ============================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Total Workers */}

        <div className="bg-white border rounded-xl p-6">

          <p className="text-sm text-slate-500">
            Total Workers
          </p>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            {dashboard?.totalWorkers ?? 0}
          </p>

        </div>


        {/* Active Workers */}

        <div className="bg-white border rounded-xl p-6">

          <p className="text-sm text-slate-500">
            Active Workers
          </p>

          <p className="text-3xl font-bold text-green-600 mt-2">
            {dashboard?.activeWorkers ?? 0}
          </p>

        </div>


        {/* Available Workers */}

        <div className="bg-white border rounded-xl p-6">

          <p className="text-sm text-slate-500">
            Available Workers
          </p>

          <p className="text-3xl font-bold text-purple-600 mt-2">
            {dashboard?.availableWorkers ?? 0}
          </p>

        </div>


        {/* Today's Jobs */}

        <div className="bg-white border rounded-xl p-6">

          <p className="text-sm text-slate-500">
            Today's Jobs
          </p>

          <p className="text-3xl font-bold text-orange-600 mt-2">
            {dashboard?.todaysJobs ?? 0}
          </p>

        </div>

      </div>


      {/* ==============================
          EARNINGS + WELFARE
      ============================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Total Earnings */}

        <div className="bg-white border rounded-xl p-6">

          <p className="text-sm text-slate-500">
            Today's Earnings
          </p>

          <p className="text-3xl font-bold text-green-600 mt-2">
            ₹{dashboard?.totalEarnings ?? 0}
          </p>

        </div>


        {/* Welfare Fund */}

        <div className="bg-white border rounded-xl p-6">

          <p className="text-sm text-slate-500">
            Welfare Fund
          </p>

          <p className="text-3xl font-bold text-pink-600 mt-2">
            ₹{dashboard?.welfareFund ?? 0}
          </p>

        </div>

      </div>


      {/* ==============================
          SERVICE DEMAND
      ============================== */}

      <section className="bg-white border rounded-xl p-6">

        <h2 className="text-lg font-bold text-slate-800 mb-5">
          Service Demand
        </h2>

        {demand.length === 0 ? (

          <p className="text-slate-500">
            No service demand data available.
          </p>

        ) : (

          <div className="space-y-5">

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

              const percentage = Math.min(
                Number(count) * 10,
                100
              );

              return (

                <div key={index}>

                  <div className="flex justify-between mb-2">

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
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </section>


      {/* ==============================
          DEBUG API RESPONSE
      ============================== */}

      <section className="bg-white border rounded-xl p-6">

        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Dashboard API Response
        </h2>

        <pre className="bg-slate-100 rounded-lg p-4 overflow-auto text-sm">
          {JSON.stringify(
            dashboard,
            null,
            2
          )}
        </pre>

      </section>

    </main>
  );
}

export default Dashboard;