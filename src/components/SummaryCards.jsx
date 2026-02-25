export default function SummaryCards({
  expenses,
  thisMonthTotal,
  friendCount,
}) {
  const total = expenses.reduce(
    (acc, e) => acc + e.amount,
    0
  );

  return (
    <div className="grid grid-3">
      <div className="card highlight">
        <h4>Total Expenses</h4>
        <h2>₹{total}</h2>
      </div>

      <div className="card">
        <h4>This Month</h4>
        <h2>₹{thisMonthTotal}</h2>
      </div>

      <div className="card">
        <h4>Total Friends</h4>
        <h2>{friendCount}</h2>
      </div>
    </div>
  );
}