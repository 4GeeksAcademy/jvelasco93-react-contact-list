import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { StateProvider } from "./hooks/useGlobalReducer.jsx";

function Main() {
  return (
    <React.StrictMode>
      <StateProvider>
        <RouterProvider router={router}></RouterProvider>
      </StateProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
