import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../storeReducer.js";

const StoreContext = createContext(undefined);

export function StateProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialStore());

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export default function StoreProvider() {
  const { state, dispatch } = useContext(StoreContext);
  return { state, dispatch };
}
