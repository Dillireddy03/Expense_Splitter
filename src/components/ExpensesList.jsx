export default function ExpensesList({
  expenses,
  onDelete,
}) {
  if (expenses.length === 0) {
    return (
      <div className="card empty">
        No expenses added yet
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Expense History</h3>

      <table className="expense-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Paid By</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((e) => (
            <tr key={e.id}>
              <td>
                {new Date(e.date).toLocaleDateString()}
              </td>
              <td>{e.paidBy}</td>
              <td>
                <span className="category-badge">
                  {e.category}
                </span>
              </td>
              <td>₹{e.amount}</td>
              <td>
                <button
                  className="danger"
                  onClick={() =>
                    onDelete(e.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

