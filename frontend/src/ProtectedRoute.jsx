import { useContext } from "react";
import { AuthContext } from "./auth.context";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);

  // ⏳ wait until loading complete
  if (loading) {
    return <div>Loading...</div>;
  }

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ❌ wrong role
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  // ✅ allow
  return children;
};

export default ProtectedRoute;
