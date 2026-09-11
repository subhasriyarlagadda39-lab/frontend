import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";

function ProtectedRoute({ children }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  if (user && user.role !== "ADMIN") {
    return <Login />;
  }

  return children;
}

export default ProtectedRoute;