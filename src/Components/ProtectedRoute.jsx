// Components/RoleProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/authcontext";
import NotAuthorized from "./NotAuthorized";

function ProtectedRoute({ allowedRoles, children }) {
  const { user, role } = useUserAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <NotAuthorized />;
  }

  return children;
}

export default ProtectedRoute;
