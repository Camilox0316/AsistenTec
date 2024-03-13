import logoTec from "../img/logoTECGray.svg";
import { SidebarContent } from "./SidebarContent";
import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <Link to="/home-switch" className="flex justify-center  pl-2.5 mb-5">
            <img src={logoTec} alt="Tec Logo" />
          </Link>
          <ul className="space-y-2 font-medium">
            <SidebarContent />
          </ul>
        </div>
      </aside>
    </>
  );
}
