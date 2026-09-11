function StatusBadge({ status }) {
  const styles = {
    Completed: "bg-green-100 text-green-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Accepted: "bg-purple-100 text-purple-700",
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  )
}

export default StatusBadge