export const initialState = {
  user: null,
  friends: [],
  expenses: [],
};

export function appReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return initialState;

    case "ADD_FRIEND":
      return { ...state, friends: [...state.friends, action.payload] };

    case "DELETE_FRIEND":
      return {
        ...state,
        friends: state.friends.filter((f) => f.id !== action.payload),
      };

    case "ADD_EXPENSE":
      return { ...state, expenses: [...state.expenses, action.payload] };

    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter((e) => e.id !== action.payload),
      };

    case "UPDATE_PROFILE":
      return { ...state, user: { ...state.user, ...action.payload }, };

    default:
      return state;
  }
}