import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import CardContainer from "./components/CardContainer.jsx";
import CardPage from "./components/CardPage.jsx";
import LandingPage from "./components/LandingPage.jsx";
import TutorList from "./components/TutorList.jsx";

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
        element: <CardPage />,
      },
      {
        path: "/tutors",
        element: <TutorList />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
