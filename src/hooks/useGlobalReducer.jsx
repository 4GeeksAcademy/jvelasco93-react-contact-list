import { useContext, useReducer, createContext } from "react";
import reducer, { getInitialState } from "../reducer";

const AppStateContext = createContext(undefined);

export function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

export default function useGlobalReducer() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error(
      "useGlobalReducer debe ser usado dentro de un StateProvider",
    );
  }
  const { state, dispatch } = context;

  return { state, dispatch };
}
