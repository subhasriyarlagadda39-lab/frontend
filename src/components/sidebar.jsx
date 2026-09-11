const menuItems = [
  "Dashboard",
  "Workers",
  "Bookings",
  "Payments",
  "Analytics",
  "Welfare Fund",
]

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-5 hidden md:block">
      <h1 className="text-2xl font-bold mb-2">Co-op Services</h1>
      <p className="text-slate-400 text-sm mb-8">Admin Panel</p>

      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={item}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${
              index === 0
                ? "bg-blue-600"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar