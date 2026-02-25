import { useRef, useId, useCallback } from "react";

export default function ExpensesForm({ friends, onAdd }) {
  const amountRef = useRef();
  const paidByRef = useRef();
  const categoryRef = useRef();
  const id = useId();

  const handleSubmit = useCallback(() => {
    const amount = Number(amountRef.current.value);
    const paidBy = paidByRef.current.value;
  const category = categoryRef.current.value;

    if (!amount || !paidBy || !category) return;

    onAdd({
      id: Date.now(),
      amount,
      paidBy,
      category,
      date: new Date().toISOString(),
    });

    amountRef.current.value = "";
  }, [onAdd]);

  return (
    <div className="card">
      <h3>Add Expense</h3>
      <label htmlFor={id}>Amount</label>
      <input id={id} ref={amountRef} placeholder="Enter amount" type="number" />

      <select ref={paidByRef}>
        <option value="">Select Friend</option>
        {friends.map((f) => (
          <option key={f.id} value={f.name}>
            {f.name}
          </option>
        ))}
      </select>
    
      <select ref={categoryRef}>
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      <button className="primary" onClick={handleSubmit}>
        Add Expense
      </button>
    </div>
  );
}