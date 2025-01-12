import React from "react";
import { createHashRouter, Navigate } from "react-router-dom";
import Layout from "@layout/Layout";
import ErrorBoundary from "@pages/ErrorBoundary";
import NotFoundPage from "@pages/NotFoundPage";
import { flattenedRoutes } from "./routes";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="overview" replace />,
      },
      ...flattenedRoutes,
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
