import AdminProfeCard from "../../components/AdminProfeCard";
import "./VerAdmin_profes.css";
import { useState } from "react";
//import IngresarAdmin_prof from "./IngresarAdmin_prof";
import { Sidebar } from "../../components/Sidebar";
// Datos simulados para las tarjetas de asistencia
import IngresarAdmin_prof from "./IngresarAdmin_prof";
import axios from "axios";

//Imagenes
//import iconoFiltro from "../../img/lupa.png";
LOGIN_URL = '/user/getAdmins'
 const admins_profes = await axios.get(LOGIN_URL);
 console.log(admins_profes)

const admins_profesData = [
  {
    Objectid : 121231 ,
    name: "Mario",
    carnet: 0,
    lastName1: "Marin",
    lastName2: "Chacon", 
    email: "mario@itcr.com" , 
    password: "1234" ,

    //photo: "Image",
    roles: 2264,
    estado: true,
    description: "Profesor de la escuela de matematicas"
  },
  {
    Objectid : 1212313 ,
    name: "Mario",
    carnet: 0,
    lastName1: "Marin",
    lastName2: "Chacon", 
    email: "mario@itcr.com" , 
    password: "1234" ,

    //photo: "Image",
    roles: 2264,
    estado: true,
    description: "Profesor de la escuela de matematicas"
  },
  {
    Objectid : 12313 ,
    name: "Geovanny",
    carnet: 0,
    lastName1: "Calderon",
    lastName2: "Zuñiga", 
    email: "geo@itcr.com" , 
    password: "1234" ,

    //photo: "Image",
    roles: 2264,
    estado: true,
    description: "Profesor de la escuela de matematicas"
    },
  {
    Objectid : 112313 ,
    name: "Mario",
    carnet: 0,
    lastName1: "Marin",
    lastName2: "Chacon", 
    email: "mario@itcr.com" , 
    password: "1234" ,

    //photo: "Image",
    roles: 2264,
    estado: true,
    description: "Profesor de la escuela de matematicas"
  },

];
export function VerAdmin_profes() {
  const [isSolicitarAsistenciaVisible, setIsSolicitarAsistenciaVisible] = useState(false);
  const [asistencias, setAsistencias] = useState(admins_profesData);
  const agregarAsistencia = (nuevaAsistencia) => {
    setAsistencias([...asistencias, nuevaAsistencia]);  
  };
  // Mock data for dropdown
const TIPOS_ASISTENCIA = [
  "Horas Estudiante",
  "Asistencia Especial",
  "Horas Asistente",
];
  // Función para abrir el modal
  const handleAgregarClick = () => {
    setIsSolicitarAsistenciaVisible(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsSolicitarAsistenciaVisible(false);
  };
  // Puedes usar el estado para manejar los filtros
  const [filtro, setFiltro] = useState("");

  const asistenciasFiltradas = filtro
    ? admins_profesData.filter((admin_profe) =>
      admin_profe.name.toLowerCase().includes(filtro.toLowerCase())
      )
    : admins_profesData; // si no hay filtro, muestra todas las asistencias

  return (
    <div className="mostrar-asistencias-container">
      <Sidebar></Sidebar>
      <div className="asistencias-cards-container">
        <div className="filtros-y-titulo">
          <button onClick={handleAgregarClick} className="btn-filtro">
            Agregar Nuevo +
          </button>
          {/* <h1>Administradores y profesores</h1> */}
          <div className="filtro-combobox">
            <input
              type="search"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              list="asistencias-nombres"
              className="filtro-input"
              placeholder="Buscar o filtrar..."
            />
            <datalist id="asistencias-nombres">
              {admins_profesData.map((admin_profe) => (
                <option key={admin_profe.Objectid} value={admin_profe.Objectid} />
              ))}
            </datalist>
          </div>
        </div>
        <div className="cards-alineadas">
        {asistenciasFiltradas.map((admin_profe) => (
          <AdminProfeCard key={admin_profe.Objectid} admin_profe={admin_profe} />
        ))}
        </div>
      </div>
       {isSolicitarAsistenciaVisible && (
        <IngresarAdmin_prof onClose={handleCloseModal}  onAgregarAsistencia={agregarAsistencia} asistenciaTipos={TIPOS_ASISTENCIA}  />
      )}
    </div>
       
  );
}
