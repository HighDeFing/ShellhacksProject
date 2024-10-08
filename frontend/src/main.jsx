import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import CardPage from "./components/CardPage.jsx";
import LandingPage from "./components/LandingPage.jsx";
import TutorList from "./components/TutorList.jsx";
import TutorCard from "./components/TutorCard.jsx";
import Profile from "./components/Profile.jsx";


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
        path: "/tutor/:id",
        element: <TutorCard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/course/:id",
        element: <CardPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
