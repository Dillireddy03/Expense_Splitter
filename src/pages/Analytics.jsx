import { useEffect, useState, useMemo } from "react";
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
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Analytics() {
  const { expenses } = useExpenses();
  const { state } = useContext(AppContext);

  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [friendData, setFriendData] = useState([]);
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
    const friendMap = {};

    filteredExpenses.forEach((e) => {
      categoryMap[e.category] =
        (categoryMap[e.category] || 0) + e.amount;

      const month = new Date(e.date).toLocaleString("default", {
        month: "short",
      });

      monthMap[month] =
        (monthMap[month] || 0) + e.amount;

      friendMap[e.paidBy] =
        (friendMap[e.paidBy] || 0) + e.amount;
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

    setFriendData(
      Object.entries(friendMap).map(([name, amount]) => ({
        name,
        amount,
      }))
    );
  }, [expenses, filter]);

  const totalSpent = useMemo(() => {
    return expenses.reduce((acc, e) => acc + e.amount, 0);
  }, [expenses]);

  const highestCategory = useMemo(() => {
    if (!categoryData.length) return null;

    return categoryData.reduce((max, curr) =>
      curr.value > max.value ? curr : max
    );
  }, [categoryData]);

  const topSpender = useMemo(() => {
    if (!friendData.length) return null;

    return friendData.reduce((max, curr) =>
      curr.amount > max.amount ? curr : max
    );
  }, [friendData]);

  return (
    <div className="container">
      <div className="card">
        <h2>Analytics Overview</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* 🔥 Summary Insights */}
      <div className="card">
        <h3>Insights</h3>
        <p>Total Spent: ₹{totalSpent}</p>

        {highestCategory && (
          <p>
            Highest Category: {highestCategory.name} (
            ₹{highestCategory.value})
          </p>
        )}

        {topSpender && (
          <p>
            Top Spender: {topSpender.name} (
            ₹{topSpender.amount})
          </p>
        )}
      </div>

      {/* Category Chart */}
      <div className="card">
        <h3>Category Breakdown</h3>
        {categoryData.length === 0 ? (
          <p>No data available</p>
        ) : (
          <PieChart width={400} height={300}>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </div>

      {/* Monthly Chart */}
      <div className="card">
        <h3>Monthly Spending</h3>
        {monthlyData.length === 0 ? (
          <p>No data available</p>
        ) : (
          <BarChart width={500} height={300} data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" />
          </BarChart>
        )}
      </div>

      {/* Friend-wise Chart */}
      {/* <div className="card">
        <h3>Friend-wise Spending</h3>
        {friendData.length === 0 ? (
          <p>No data available</p>
        ) : (
          <BarChart width={500} height={300} data={friendData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" />
          </BarChart>
        )}
      </div> */}
    </div>
  );
}