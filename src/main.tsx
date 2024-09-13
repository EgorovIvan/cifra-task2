import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import './scss/style.scss'
import Tasks from "./pages/Tasks.tsx";
import Accounting from "./pages/Accounting.tsx";
import Settings from "./pages/Settings.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/tasks",
    element: <Tasks/>,
  },
  {
    path: "/accounting",
    element: <Accounting/>,
  },
  {
    path: "/settings",
    element: <Settings/>,
  },
]);

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>,
)
