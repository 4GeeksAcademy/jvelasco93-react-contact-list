import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export function Home() {
  const { store, dispatch } = useGlobalReducer();
  return <h1>Hello world</h1>;
}
