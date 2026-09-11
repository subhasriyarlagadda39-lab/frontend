import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getWorker,
  getWorkerDetails,
  activateWorker,
  deactivateWorker,
} from "../../services/api";

function WorkerDetails() {
  const { workerId } = useParams();
  const navigate = useNavigate();

  const [worker, setWorker] = useState(null);
  const [details, setDetails] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadWorker();
  }, [workerId]);

  const loadWorker = async () => {
    try {
      setLoading(true);
      setError("");

      const [workerData, detailsData] =
        await Promise.all([
          getWorker(workerId),
          getWorkerDetails(workerId),
        ]);

      setWorker(workerData);
      setDetails(detailsData);
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Failed to load worker details"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async () => {
    try {
      await activateWorker(workerId);

      alert("Worker activated");

      await loadWorker();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeactivate = async () => {
    try {
      await deactivateWorker(workerId);

      alert("Worker deactivated");

      await loadWorker();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <main className="p-4 md:p-8">
        <p>Loading worker...</p>
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

  const status =
    worker?.status ||
    worker?.workerStatus ||
    "INACTIVE";

  const skills = Array.isArray(worker?.skills)
    ? worker.skills
    : [];

  return (
    <main className="p-4 md:p-8 space-y-6">

      <button
        onClick={() => navigate("/workers")}
        className="text-blue-600"
      >
        ← Back to Workers
      </button>

      <section className="bg-white rounded-xl border shadow-sm p-6">

        <div className="flex flex-col md:flex-row md:justify-between gap-5">

          <div>

            <h1 className="text-2xl font-bold text-slate-800">
              {worker?.name}
            </h1>

            <p className="text-slate-500 mt-1">
              {worker?.email}
            </p>

            <p className="text-slate-500">
              {worker?.phone}
            </p>

          </div>

          <div className="flex gap-3">

            {status === "ACTIVE" ? (
              <button
                onClick={handleDeactivate}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg"
              >
                Deactivate
              </button>
            ) : (
              <button
                onClick={handleActivate}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Activate
              </button>
            )}

          </div>

        </div>

      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <section className="bg-white rounded-xl border shadow-sm p-5">

          <h2 className="text-lg font-bold mb-4">
            Worker Information
          </h2>

          <div className="space-y-3">

            <p>
              <strong>ID:</strong>{" "}
              {worker?.workerId ||
                worker?.id ||
                workerId}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {worker?.location || "-"}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {status}
            </p>

            <p>
              <strong>Availability:</strong>{" "}
              {worker?.availabilityStatus ||
                worker?.availability ||
                "-"}
            </p>

          </div>

        </section>

        <section className="bg-white rounded-xl border shadow-sm p-5">

          <h2 className="text-lg font-bold mb-4">
            Skills
          </h2>

          <div className="flex flex-wrap gap-2">

            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
                >
                  {typeof skill === "string"
                    ? skill
                    : skill.skillName ||
                      skill.name}
                </span>
              ))
            ) : (
              <p className="text-slate-500">
                No skills available.
              </p>
            )}

          </div>

        </section>

      </div>

      <section className="bg-white rounded-xl border shadow-sm p-5">

        <h2 className="text-lg font-bold mb-4">
          Additional Details
        </h2>

        {details ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {Object.entries(details).map(
              ([key, value]) => (
                <div key={key}>
                  <p className="text-sm text-slate-500">
                    {key}
                  </p>

                  <p className="font-medium">
                    {typeof value === "object"
                      ? JSON.stringify(value)
                      : String(value ?? "-")}
                  </p>
                </div>
              )
            )}

          </div>
        ) : (
          <p className="text-slate-500">
            No additional details available.
          </p>
        )}

      </section>

    </main>
  );
}

export default WorkerDetails;