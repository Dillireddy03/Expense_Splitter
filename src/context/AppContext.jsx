import { createContext, useReducer, useEffect } from "react";
import { appReducer, initialState } from "./reducer";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [persistedState, setPersistedState] =
    useLocalStorage("expenseApp", initialState);

  const [state, dispatch] = useReducer(appReducer, persistedState);

  useEffect(() => {
    setPersistedState(state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}