import { useEffect, useState } from "react";

import {
  getDashboard,
  refundPayment,
} from "../../services/adminApi";

function Payments() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refundId, setRefundId] = useState("");
  const [refundLoading, setRefundLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const data = await getDashboard();

      setDashboard(data);
    } catch (err) {
      setError(
        err.message || "Failed to load payment information"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRefund = async () => {
    if (!refundId.trim()) {
      setError("Please enter a payment ID.");
      return;
    }

    try {
      setRefundLoading(true);
      setError("");
      setMessage("");

      await refundPayment(refundId.trim());

      setMessage(
        `Payment ${refundId} refund request completed successfully.`
      );

      setRefundId("");
    } catch (err) {
      setError(
        err.message || "Failed to refund payment"
      );
    } finally {
      setRefundLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="p-4 md:p-8">
        <p>Loading payment information...</p>
      </main>
    );
  }

  const earnings =
    dashboard?.todaySuccessfulPaymentEarnings ??
    dashboard?.successfulPaymentEarnings ??
    dashboard?.todayEarnings ??
    dashboard?.earnings ??
    0;

  return (
    <main className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Payments
        </h1>

        <p className="text-slate-500 mt-1">
          Monitor successful payment earnings and refunds.
        </p>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <section className="bg-white border rounded-xl p-6">
          <p className="text-sm text-slate-500">
            Successful Payment Earnings
          </p>

          <p className="text-3xl font-bold text-green-600 mt-2">
            ₹{earnings}
          </p>
        </section>

        <section className="bg-white border rounded-xl p-6">
          <p className="text-sm text-slate-500">
            Today's Scheduled Jobs
          </p>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            {dashboard?.todayScheduledJobs ?? 0}
          </p>
        </section>

        <section className="bg-white border rounded-xl p-6">
          <p className="text-sm text-slate-500">
            Welfare Fund
          </p>

          <p className="text-3xl font-bold text-purple-600 mt-2">
            ₹
            {dashboard?.welfareFundTotal ??
              dashboard?.welfareFund ??
              0}
          </p>
        </section>
      </div>

      <section className="bg-white border rounded-xl p-6">
        <h2 className="text-lg font-bold text-slate-800">
          Refund Payment
        </h2>

        <p className="text-sm text-slate-500 mt-1 mb-5">
          Enter a payment ID to request a refund.
        </p>

        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={refundId}
            onChange={(e) => setRefundId(e.target.value)}
            placeholder="Enter payment ID"
            className="flex-1 border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={handleRefund}
            disabled={refundLoading}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50"
          >
            {refundLoading ? "Processing..." : "Refund Payment"}
          </button>
        </div>
      </section>

      <section className="bg-white border rounded-xl p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-5">
          Payment Summary
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between border-b pb-3">
            <span className="text-slate-500">
              Successful Payment Earnings
            </span>

            <span className="font-semibold">
              ₹{earnings}
            </span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="text-slate-500">
              Scheduled Jobs
            </span>

            <span className="font-semibold">
              {dashboard?.todayScheduledJobs ?? 0}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Welfare Fund
            </span>

            <span className="font-semibold text-green-600">
              ₹
              {dashboard?.welfareFundTotal ??
                dashboard?.welfareFund ??
                0}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Payments;