export function calculateSettlement(expenses, friends) {
  const balances = {};

  friends.forEach((f) => (balances[f.name] = 0));

  expenses.forEach((expense) => {
    const share = expense.amount / friends.length;
    friends.forEach((f) => {
      if (f.name === expense.paidBy) {
        balances[f.name] += expense.amount - share;
      } else {
        balances[f.name] -= share;
      }
    });
  });

  return balances;
}