import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { useExpenses } from "../hooks/useExpenses";
import ExpenseForm from "../components/ExpensesForm";
import ExpenseList from "../components/ExpensesList";
import SummaryCards from "../components/SummaryCards";
import { calculateSettlement } from "../utils/calculateSettlement";

export default function Dashboard() {
  const { state } = useContext(AppContext);
  const { expenses, addExpense, deleteExpense } = useExpenses();

  const settlement = useMemo(() => {
    return calculateSettlement(expenses, state.friends);
  }, [expenses, state.friends]);

  const thisMonthTotal = useMemo(() => {
    const month = new Date().getMonth();
    return expenses
      .filter((e) => new Date(e.date).getMonth() === month)
      .reduce((acc, e) => acc + e.amount, 0);
  }, [expenses]);

  return (
    <div className="container">
      <h2 className="dashboard-title">Dashboard Overview</h2>

      <SummaryCards
        expenses={expenses}
        thisMonthTotal={thisMonthTotal}
        friendCount={state.friends.length}
      />

      <ExpenseForm friends={state.friends} onAdd={addExpense} />

      <ExpenseList expenses={expenses} onDelete={deleteExpense} />

      {/* 🔥 Updated Settlement Section */}
      <div className="card">
        <h3>Settlement Summary</h3>

        {Object.keys(settlement).length === 0 ? (
          <div className="empty">No settlement data yet</div>
        ) : (
          Object.entries(settlement).map(([name, balance]) => {
            const friend = state.friends.find(
              (f) => f.name === name
            );

            return (
              <div key={name} className="settlement-row">
                <div>
                  <strong>{name}</strong>
                  <p className="settlement-amount">
                    ₹{balance.toFixed(2)}
                  </p>

                  {/* ✅ Show UPI always */}
                  {friend?.upiId && (
                    <p style={{ fontSize: "12px", color: "#64748b" }}>
                      UPI: {friend.upiId}
                    </p>
                  )}
                </div>

                {balance < 0 && friend?.upiId && (
                  <div className="upi-box">
                    Pay via UPI:
                    <br />
                    <strong>{friend.upiId}</strong>
                  </div>
                )}

                {balance > 0 && (
                  <div className="receive-box">
                    Will Receive
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}