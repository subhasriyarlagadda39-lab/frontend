function ChartCard({ data }) {
  const maxJobs = Math.max(...data.map((item) => item.jobs))

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <h3 className="text-lg font-bold text-slate-800 mb-5">
        Service Demand
      </h3>

      <div className="space-y-5">
        {data.map((item) => (
          <div key={item.service}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">
                {item.service}
              </span>
              <span className="text-sm text-slate-500">
                {item.jobs} jobs
              </span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{
                  width: `${(item.jobs / maxJobs) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChartCard