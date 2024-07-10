// import { useAuth0 } from "@auth0/auth0-react";
// import { Navigate, Outlet } from "react-router-dom";

// export default function ProtectedRoute() {
//   const { isAuthenticated } = useAuth0();
//   return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
// }
// // 

import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
