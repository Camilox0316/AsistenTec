import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CoPresentIcon from '@mui/icons-material/CoPresent';
import GroupIcon from "@mui/icons-material/Group";
import { useAuth } from "../hooks/useAuth";
import { useLocation, Navigate } from "react-router-dom";
import { Logout } from "./Logout";
import fotoPerfilDefault from '../img/fotoPerfilDefault.webp';
import axiosInstance from "../api/axios";

function Item({ children }) {
  return (
    <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
      {children}
    </li>
  );
}

export function SidebarContent() {
  const { auth, logout } = useAuth();
  const location = useLocation();

  const photoUrl = auth?.photo ? `${axiosInstance.defaults.baseURL}${auth.photo}` : fotoPerfilDefault;
  const name = auth?.name || "Nombre no disponible"; // Cambia "Nombre no disponible" por lo que prefieras
  const email = auth?.email || "Correo no disponible"; // Cambia "Correo no disponible" por lo que prefieras

  let options;
  options = auth?.roles?.find((role) => role === 1597) ? ( //Student
    <>
      <Item>
        <Link to="/home-switch" className="flex items-center space-x-2">
          <HomeIcon />
          <span>Inicio</span>
        </Link>
      </Item>
      <Item>
        <Link to="/my-assists" className="flex items-center space-x-2">
          <PersonIcon />
          <span>Mis Asistencias</span>
        </Link>
      </Item>
      <Item>
        <Link to="/profile" className="flex items-center space-x-2">
          <EventNoteIcon />
          <span>Mi Perfil</span>
        </Link>
      </Item>
    </>
  ) : auth?.roles?.find((role) => role === 2264) ? ( //Profesor
    <>
      <Item>
        <Link to="/home-professor" className="flex items-center space-x-2">
          <GroupIcon />
          <span >Asistencias Pendientes</span>
        </Link>
      </Item>
      <Item>
        <Link to="/home-professor-aprobadas" className="flex items-center space-x-2">
          <GroupIcon />
          <span >Asistencias Activas</span>
        </Link>
      </Item>
      <Item>
        <Link to="/home-professor-rechazadas" className="flex items-center space-x-2">
          <GroupIcon />
          <span >Asistencias Rechazadas</span>
        </Link>
      </Item>
      <Item>
        <Link to="/profile" className="flex items-center space-x-2">
          <PersonIcon />
          <span>Mi perfil</span>
        </Link>
      </Item>
    </>
  ) : auth?.roles?.find((role) => role === 3123) ? ( //Admin
    <>
      <Item>
        <Link to="/asistencias-aprobadas" className="flex items-center space-x-2">
          <HomeIcon />
          <span>Asistencias aprobadas</span>
        </Link>
      </Item>
      <Item>
        <Link to="/home-switch" className="flex items-center space-x-2">
          <GroupIcon />
          <span>Consultar Estudiantes</span>
        </Link>
      </Item>
      <Item>
        <Link to="/mostrar-solicitudes" className="flex items-center space-x-2">
          <GroupIcon />
          <span>Consultar Solicitudes</span>
        </Link>
      </Item>
      <Item>
        <Link to="/asistencias-activas" className="flex items-center space-x-2">
          <GroupIcon />
          <span>Consultar Asistencias Activas</span>
        </Link>
      </Item>
      <Item>
        <Link to="/administradores_profes" className="flex items-center space-x-2">
          <GroupIcon />
          <span>Administradores y profesores</span>
        </Link>
      </Item>
    </>
  ) : auth?.email ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );

  return (
    <>
      {options}
      <div className="fixed bottom-0">
        <Logout
          photoUrl={photoUrl}
          name={name}
          email={email}
          logout={logout}
        />
        <Link to="/" className="flex justify-center items-center space-x-2">
          <span className="text-red-500">Cerrar sesión</span>
        </Link>
      </div>
    </>
  );
}
