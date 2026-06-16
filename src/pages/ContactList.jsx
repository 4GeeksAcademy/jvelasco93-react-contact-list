import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export function Home() {
  const { state, dispatch } = useGlobalReducer();
  return <h1>Hello world</h1>;
}
