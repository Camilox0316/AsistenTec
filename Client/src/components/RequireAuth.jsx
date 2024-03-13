import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Sidebar } from "./Sidebar.jsx";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <>
      <Sidebar />
      <div className="sm:ml-[256px] h-full overflow-hidden">
        <Outlet />
      </div>
    </>
  ) : auth?.email ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
