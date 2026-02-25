import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function useAuth() {
  const { state, dispatch } = useContext(AppContext);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!existingUser) return false;

    localStorage.setItem("currentUser", JSON.stringify(existingUser));
    dispatch({ type: "LOGIN", payload: existingUser });
    return true;
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some((u) => u.email === userData.email);
    if (userExists) return false;

    const newUser = {
      ...userData,
      id: Date.now(),
      friends: [],
      expenses: [],
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    return true;
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    dispatch({ type: "LOGOUT" });
  };

  return { user: state.user, login, logout, register };
}