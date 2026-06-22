import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Home } from "./pages/Contacts.jsx";
import AddContact from "./pages/AddContact.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
      <>
    <Route path="/" element={<Home />} errorElement={<h1>Not found!</h1>} />,
          <Route path="/new-contact" element={<AddContact />} />
      </>
  ),
);
