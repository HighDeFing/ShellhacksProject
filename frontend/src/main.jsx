import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import CardContainer from "./components/CardContainer.jsx";
import CardPage from "./components/CardPage.jsx";
import LandingPage from "./components/LandingPage.jsx";
import TutorList from "./components/TutorList.jsx";
import Login from "./components/Login.jsx";
import TutorCard from "./components/TutorCard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/course",
        element: <TutorList />,
      },
      {
        path: "/tutors",
        element: <TutorList />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/teacher/:id",
        element: <TutorCard />,
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
