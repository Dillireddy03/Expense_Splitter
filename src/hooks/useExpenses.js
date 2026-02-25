import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function useExpenses() {
  const { state, dispatch } = useContext(AppContext);

  const addExpense = (expense) =>
    dispatch({ type: "ADD_EXPENSE", payload: expense });

  const deleteExpense = (id) =>
    dispatch({ type: "DELETE_EXPENSE", payload: id });

  return { expenses: state.expenses, addExpense, deleteExpense };
}