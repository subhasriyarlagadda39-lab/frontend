function Header() {
  return (
    <header className="bg-white border-b px-4 md:px-8 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          Admin Dashboard
        </h2>
        <p className="text-sm text-slate-500">
          Manage cooperative services
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="text-xl">🔔</button>

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            A
          </div>
          <span className="hidden sm:block font-medium">
            Admin
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header