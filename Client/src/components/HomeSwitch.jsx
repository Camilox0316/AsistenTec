import { useAuth } from "../hooks/useAuth";
import { useLocation, Navigate } from "react-router-dom";

export function HomeSwitch() {
  const { auth } = useAuth();
  const location = useLocation();

  let home;

  if (auth?.roles?.find((role) => [3123].includes(role))) {
    console.log("Entering Admin route");
    home = <Navigate to="/home-student" />;
  } else if (auth?.roles?.find((role) => [1597].includes(role))) {
    console.log("Entering Student route");
    home = <Navigate to="/home-student" />;
  } else if (auth?.roles?.find((role) => [2264].includes(role))) {
    console.log("Entering Professor route");
    home = <Navigate to="/home-professor" />;
  } else if (auth?.email) {
    console.log("User is authenticated but has no role, redirecting to /unauthorized");
    home = <Navigate to="/unauthorized" state={{ from: location }} replace />;
  } else {
    console.log("User is not authenticated, redirecting to /");
    home = <Navigate to="/" state={{ from: location }} replace />;
  }

  return home;
}
