import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useExpenses } from "../hooks/useExpenses";

export default function Analytics() {
  const { expenses } = useExpenses();

  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let filteredExpenses = expenses;

    if (filter === "month") {
      const currentMonth = new Date().getMonth();
      filteredExpenses = expenses.filter(
        (e) => new Date(e.date).getMonth() === currentMonth
      );
    }

    const categoryMap = {};
    const monthMap = {};

    filteredExpenses.forEach((e) => {
      categoryMap[e.category] =
        (categoryMap[e.category] || 0) + e.amount;

      const month = new Date(e.date).toLocaleString("default", {
        month: "short",
      });

      monthMap[month] =
        (monthMap[month] || 0) + e.amount;
    });

    setCategoryData(
      Object.entries(categoryMap).map(([name, value]) => ({
        name,
        value,
      }))
    );

    setMonthlyData(
      Object.entries(monthMap).map(([month, amount]) => ({
        month,
        amount,
      }))
    );
  }, [expenses, filter]);

  return (
    <div className="container">
      <div className="card">
        <h2>Analytics</h2>

        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Time</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="card">
        <h3>Category Breakdown</h3>
        <PieChart width={400} height={300}>
          <Pie data={categoryData} dataKey="value" outerRadius={100} />
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <div className="card">
        <h3>Monthly Spending</h3>
        <BarChart width={500} height={300} data={monthlyData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" />
        </BarChart>
      </div>

      <div className="card">
        <h3>Expense Details</h3>
        {expenses.map((e) => (
          <div key={e.id} style={{ marginBottom: "8px" }}>
            ₹{e.amount} | {e.category} |{" "}
            {new Date(e.date).toLocaleDateString()}
          </div>
        ))}
      </div>
    </div>
  );
}