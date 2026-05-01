import { createBrowserRouter } from "react-router";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Register from "./pages/Register";
import Login from "./pages/login";
import AdminPage from "./admin/AdminPage";
import ProtectedRoute from "./ProtectedRoute";
import CreatBlog from "./admin/CreatBlog";
import UpadetBlog from "./admin/UpadetBlog";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Blog />,
  },
  {
    path: "/blog/:slug",
    element: <BlogDetail />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  // Admin routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/blogs/create",
    element: (
      <ProtectedRoute>
        <CreatBlog />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/blogs/edit/:id",
    element: (
      <ProtectedRoute>
        <UpadetBlog />
      </ProtectedRoute>
    ),
  },
]);
