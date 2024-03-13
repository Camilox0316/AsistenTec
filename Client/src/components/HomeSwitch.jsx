import { useAuth } from "../hooks/useAuth";
import { useLocation, Navigate } from "react-router-dom";

export function HomeSwitch() {
  const { auth } = useAuth();
  const location = useLocation();

  let home;
  home = auth?.roles?.find((role) => [1597].includes(role)) ? (
    <Navigate to="/home-student" />
  ) : auth?.roles?.find((role) => [3123,2264].includes(role)) ? (
    <Navigate to="/home-student" />
  ) : auth?.roles?.find((role) => [3123, 4478].includes(role)) ? (
    <Navigate to="/home-assistant" />
  ) : auth?.email ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
  return home;
}
