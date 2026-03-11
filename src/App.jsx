import MainLayout from "./pages/MainLayout";
import AdminPage from "./pages/AdminPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import AdminRoute from "./components/protect/AdminRoute";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "products",
          element: <ProductsPage />,
        },
        {
          path: "auth/login",
          element: <LoginPage />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <AdminRoute>
          <AdminPage />
        </AdminRoute>
      ),
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
