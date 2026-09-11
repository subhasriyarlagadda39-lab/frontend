function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-2">
            {value}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {subtitle}
          </p>
        </div>

        <div className="text-2xl bg-slate-100 rounded-lg p-3">
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatCard