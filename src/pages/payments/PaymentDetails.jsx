import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getPayment,
  refundPayment,
}from "../../services/adminApi";

function PaymentDetails() {
  const { paymentId } = useParams();
  const navigate = useNavigate();

  const [payment, setPayment] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadPayment();
  }, [paymentId]);

  const loadPayment = async () => {
    try {
      setLoading(true);

      const data =
        await getPayment(paymentId);

      setPayment(data);
    } catch (err) {
      setError(
        err.message ||
          "Failed to load payment"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRefund = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to refund this payment?"
    );

    if (!confirmed) return;

    try {
      await refundPayment(paymentId);

      alert(
        "Payment refunded successfully."
      );

      await loadPayment();
    } catch (err) {
      alert(
        err.message || "Refund failed"
      );
    }
  };

  if (loading) {
    return (
      <main className="p-4 md:p-8">
        Loading payment...
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-4 md:p-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 md:p-8 space-y-6">

      <button
        onClick={() => navigate("/payments")}
        className="text-blue-600"
      >
        ← Back to Payments
      </button>

      <section className="bg-white rounded-xl border shadow-sm p-6">

        <div className="flex justify-between">

          <div>

            <h1 className="text-2xl font-bold">
              Payment Details
            </h1>

            <p className="text-slate-500 mt-1">
              Payment #{paymentId}
            </p>

          </div>

          {payment?.status !==
            "REFUNDED" && (
            <button
              onClick={handleRefund}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Refund
            </button>
          )}

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

          {Object.entries(payment || {}).map(
            ([key, value]) => (
              <div key={key}>

                <p className="text-sm text-slate-500">
                  {key}
                </p>

                <p className="font-medium mt-1">
                  {typeof value === "object"
                    ? JSON.stringify(value)
                    : String(value ?? "-")}
                </p>

              </div>
            )
          )}

        </div>

      </section>

    </main>
  );
}

export default PaymentDetails;