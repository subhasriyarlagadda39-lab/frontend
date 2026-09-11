import { useMemo, useState } from "react";

const initialTransactions = [
  {
    id: "WF001",
    description: "Worker welfare contribution",
    type: "Contribution",
    amount: 15,
    date: "2026-09-08",
    status: "Completed",
  },
  {
    id: "WF002",
    description: "Worker welfare contribution",
    type: "Contribution",
    amount: 20,
    date: "2026-09-08",
    status: "Completed",
  },
  {
    id: "WF003",
    description: "Emergency assistance",
    type: "Expense",
    amount: 500,
    date: "2026-09-07",
    status: "Completed",
  },
  {
    id: "WF004",
    description: "Worker welfare contribution",
    type: "Contribution",
    amount: 12,
    date: "2026-09-07",
    status: "Completed",
  },
  {
    id: "WF005",
    description: "Training support",
    type: "Expense",
    amount: 300,
    date: "2026-09-06",
    status: "Completed",
  },
  {
    id: "WF006",
    description: "Worker welfare contribution",
    type: "Contribution",
    amount: 16,
    date: "2026-09-06",
    status: "Completed",
  },
];

function WelfareFund() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Modal state
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  // Form state
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Emergency Assistance");

  // Calculate totals automatically
  const totalContributions = useMemo(() => {
    return transactions
      .filter((item) => item.type === "Contribution")
      .reduce((total, item) => total + item.amount, 0);
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter((item) => item.type === "Expense")
      .reduce((total, item) => total + item.amount, 0);
  }, [transactions]);

  const availableFund = totalContributions - totalExpenses;

  const filteredTransactions = transactions.filter((item) => {
    return typeFilter === "All" || item.type === typeFilter;
  });

  // Add new expense
  const handleAddExpense = (e) => {
    e.preventDefault();

    if (!description.trim() || !amount || Number(amount) <= 0) {
      alert("Please enter a valid description and amount.");
      return;
    }

    const newExpense = {
      id: `WF${String(transactions.length + 1).padStart(3, "0")}`,
      description: `${category}: ${description}`,
      type: "Expense",
      amount: Number(amount),
      date: new Date().toISOString().split("T")[0],
      status: "Completed",
    };

    setTransactions((prev) => [newExpense, ...prev]);

    // Clear form
    setDescription("");
    setAmount("");
    setCategory("Emergency Assistance");

    // Close modal
    setShowExpenseModal(false);
  };

  return (
    <main style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Welfare Fund</h2>
          <p style={styles.subtitle}>
            Manage cooperative welfare contributions and expenses
          </p>
        </div>

        <button
          style={styles.primaryButton}
          onClick={() => setShowExpenseModal(true)}
        >
          + Record Expense
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div style={styles.statsGrid}>
        <StatCard
          title="Available Fund"
          value={`₹${availableFund.toLocaleString()}`}
          icon="💰"
        />

        <StatCard
          title="This Month"
          value="₹1,180"
          icon="📅"
        />

        <StatCard
          title="Total Contributions"
          value={`₹${totalContributions.toLocaleString()}`}
          icon="➕"
        />

        <StatCard
          title="Total Expenses"
          value={`₹${totalExpenses.toLocaleString()}`}
          icon="➖"
        />
      </div>

      {/* FUND OVERVIEW */}
      <section style={styles.card}>
        <div style={styles.sectionHeader}>
          <div>
            <h3 style={styles.cardTitle}>Fund Overview</h3>
            <p style={styles.cardSubtitle}>
              Current welfare fund status
            </p>
          </div>

          <span style={styles.transparentBadge}>
            ✓ Transparent
          </span>
        </div>

        <div style={styles.overviewGrid}>

          <div style={styles.overviewBox}>
            <p style={styles.overviewLabel}>Available Balance</p>
            <h2 style={styles.balance}>
              ₹{availableFund.toLocaleString()}
            </h2>
          </div>

          <div style={styles.overviewBox}>
            <p style={styles.overviewLabel}>Contributions</p>
            <h2 style={styles.contribution}>
              ₹{totalContributions.toLocaleString()}
            </h2>
          </div>

          <div style={styles.overviewBox}>
            <p style={styles.overviewLabel}>Expenses</p>
            <h2 style={styles.expense}>
              ₹{totalExpenses.toLocaleString()}
            </h2>
          </div>

        </div>
      </section>

      {/* TRANSACTIONS */}
      <section style={styles.card}>

        <div style={styles.sectionHeader}>
          <div>
            <h3 style={styles.cardTitle}>Recent Transactions</h3>
            <p style={styles.cardSubtitle}>
              Track all welfare fund transactions
            </p>
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={styles.select}
          >
            <option value="All">All Transactions</option>
            <option value="Contribution">Contributions</option>
            <option value="Expense">Expenses</option>
          </select>
        </div>

        <div style={styles.tableContainer}>
          <table style={styles.table}>

            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>

                  <td style={styles.td}>
                    <strong>{transaction.id}</strong>
                  </td>

                  <td style={styles.td}>
                    {transaction.description}
                  </td>

                  <td style={styles.td}>
                    <span
                      style={
                        transaction.type === "Contribution"
                          ? styles.contributionBadge
                          : styles.expenseBadge
                      }
                    >
                      {transaction.type}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <strong>
                      ₹{transaction.amount.toLocaleString()}
                    </strong>
                  </td>

                  <td style={styles.td}>
                    {transaction.date}
                  </td>

                  <td style={styles.td}>
                    <span style={styles.statusBadge}>
                      {transaction.status}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <button
                      style={styles.viewButton}
                      onClick={() =>
                        setSelectedTransaction(transaction)
                      }
                    >
                      View
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </section>

      {/* WELFARE ACTIVITIES */}
      <section style={styles.card}>

        <h3 style={styles.cardTitle}>Welfare Activities</h3>

        <div style={styles.activityGrid}>

          <Activity
            title="Emergency Assistance"
            amount="₹500"
            icon="🚑"
          />

          <Activity
            title="Training Support"
            amount="₹300"
            icon="🎓"
          />

          <Activity
            title="Worker Support"
            amount="₹250"
            icon="🤝"
          />

        </div>
      </section>

      {/* VIEW TRANSACTION MODAL */}
      {selectedTransaction && (
        <div style={styles.modalOverlay}>

          <div style={styles.modal}>

            <div style={styles.modalHeader}>
              <h3>Transaction Details</h3>

              <button
                style={styles.closeButton}
                onClick={() => setSelectedTransaction(null)}
              >
                ✕
              </button>
            </div>

            <div style={styles.detailRow}>
              <span>ID</span>
              <strong>{selectedTransaction.id}</strong>
            </div>

            <div style={styles.detailRow}>
              <span>Description</span>
              <strong>{selectedTransaction.description}</strong>
            </div>

            <div style={styles.detailRow}>
              <span>Type</span>
              <strong>{selectedTransaction.type}</strong>
            </div>

            <div style={styles.detailRow}>
              <span>Amount</span>
              <strong>
                ₹{selectedTransaction.amount.toLocaleString()}
              </strong>
            </div>

            <div style={styles.detailRow}>
              <span>Date</span>
              <strong>{selectedTransaction.date}</strong>
            </div>

          </div>
        </div>
      )}

      {/* RECORD EXPENSE MODAL */}
      {showExpenseModal && (
        <div style={styles.modalOverlay}>

          <div style={styles.modal}>

            <div style={styles.modalHeader}>
              <div>
                <h3>Record Welfare Expense</h3>
                <p style={styles.modalSubtitle}>
                  Add a new welfare fund expense
                </p>
              </div>

              <button
                style={styles.closeButton}
                onClick={() => setShowExpenseModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddExpense}>

              <label style={styles.label}>
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={styles.input}
              >
                <option>Emergency Assistance</option>
                <option>Training Support</option>
                <option>Worker Support</option>
                <option>Medical Support</option>
                <option>Other</option>
              </select>

              <label style={styles.label}>
                Description
              </label>

              <input
                type="text"
                placeholder="Enter expense description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.input}
              />

              <label style={styles.label}>
                Amount
              </label>

              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={styles.input}
                min="1"
              />

              <div style={styles.formActions}>

                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={() => setShowExpenseModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={styles.primaryButton}
                >
                  Add Expense
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </main>
  );
}


/* STAT CARD */
function StatCard({ title, value, icon }) {
  return (
    <div style={styles.statCard}>

      <div>
        <p style={styles.statTitle}>{title}</p>
        <h2 style={styles.statValue}>{value}</h2>
      </div>

      <div style={styles.statIcon}>
        {icon}
      </div>

    </div>
  );
}


/* ACTIVITY */
function Activity({ title, amount, icon }) {
  return (
    <div style={styles.activityCard}>

      <div style={styles.activityIcon}>
        {icon}
      </div>

      <div>
        <h4 style={styles.activityTitle}>{title}</h4>
        <p style={styles.activityAmount}>{amount}</p>
      </div>

    </div>
  );
}


/* STYLES */
const styles = {

  page: {
    padding: "30px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  title: {
    margin: 0,
    fontSize: "25px",
  },

  subtitle: {
    margin: "6px 0 0",
    color: "#64748b",
    fontSize: "13px",
  },

  primaryButton: {
    border: "none",
    background: "#2563eb",
    color: "white",
    padding: "11px 18px",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
    marginBottom: "25px",
  },

  statCard: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statTitle: {
    margin: 0,
    color: "#64748b",
    fontSize: "13px",
  },

  statValue: {
    margin: "8px 0 0",
    fontSize: "25px",
  },

  statIcon: {
    fontSize: "24px",
    background: "#f1f5f9",
    padding: "10px",
    borderRadius: "9px",
  },

  card: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "22px",
    marginBottom: "25px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  cardTitle: {
    margin: 0,
    fontSize: "18px",
  },

  cardSubtitle: {
    margin: "5px 0 0",
    color: "#64748b",
    fontSize: "12px",
  },

  transparentBadge: {
    background: "#dcfce7",
    color: "#15803d",
    padding: "7px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },

  overviewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
  },

  overviewBox: {
    background: "#f8fafc",
    padding: "20px",
    borderRadius: "10px",
  },

  overviewLabel: {
    margin: 0,
    color: "#64748b",
    fontSize: "13px",
  },

  balance: {
    margin: "8px 0 0",
    fontSize: "25px",
  },

  contribution: {
    margin: "8px 0 0",
    fontSize: "25px",
  },

  expense: {
    margin: "8px 0 0",
    fontSize: "25px",
  },

  select: {
    padding: "9px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    background: "white",
  },

  tableContainer: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "800px",
  },

  th: {
    textAlign: "left",
    padding: "13px 10px",
    borderBottom: "1px solid #e2e8f0",
    color: "#64748b",
    fontSize: "12px",
  },

  td: {
    padding: "15px 10px",
    borderBottom: "1px solid #f1f5f9",
    fontSize: "13px",
  },

  contributionBadge: {
    background: "#dcfce7",
    color: "#15803d",
    padding: "5px 9px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: "600",
  },

  expenseBadge: {
    background: "#fee2e2",
    color: "#dc2626",
    padding: "5px 9px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: "600",
  },

  statusBadge: {
    background: "#dcfce7",
    color: "#15803d",
    padding: "5px 9px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "600",
  },

  viewButton: {
    border: "1px solid #2563eb",
    background: "white",
    color: "#2563eb",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },

  activityGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
    marginTop: "18px",
  },

  activityCard: {
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "18px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  activityIcon: {
    fontSize: "25px",
    background: "#f1f5f9",
    padding: "10px",
    borderRadius: "8px",
  },

  activityTitle: {
    margin: 0,
    fontSize: "14px",
  },

  activityAmount: {
    margin: "5px 0 0",
    color: "#2563eb",
    fontWeight: "700",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  modal: {
    background: "white",
    width: "450px",
    maxWidth: "90%",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "20px",
  },

  modalSubtitle: {
    margin: "5px 0 0",
    color: "#64748b",
    fontSize: "12px",
  },

  closeButton: {
    border: "none",
    background: "#f1f5f9",
    borderRadius: "6px",
    padding: "7px 10px",
    cursor: "pointer",
  },

  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    padding: "12px 0",
    borderBottom: "1px solid #e2e8f0",
    fontSize: "13px",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    marginTop: "15px",
    fontSize: "13px",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "11px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    outline: "none",
    fontSize: "14px",
  },

  formActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "25px",
  },

  cancelButton: {
    border: "1px solid #cbd5e1",
    background: "white",
    padding: "11px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default WelfareFund;