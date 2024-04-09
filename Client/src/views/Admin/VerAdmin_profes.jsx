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
const URI = 'http://localhost:3000/user/getAdmins'


let response = await axios.get(URI);
console.log("response:", response.data);
let admins_profesData = response.data;

const recargarDatos = async () => {
  response = await axios.get(URI);
  console.log("response:", response.data);
  admins_profesData = response.data;
};
 

export function VerAdmin_profes() {
  const [isSolicitarAsistenciaVisible, setIsSolicitarAsistenciaVisible] = useState(false);
  const [admin_profes, setAdmin_profes] = useState(admins_profesData);

  // Mock data for dropdown
// const TIPOS_ASISTENCIA = [
//   "Horas Estudiante",
//   "Asistencia Especial",
//   "Horas Asistente",
// ];
  // Función para abrir el modal

  // Función para abrir el modal
  const handleAgregarClick = () => {
    setIsSolicitarAsistenciaVisible(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsSolicitarAsistenciaVisible(false);
  };
  // Puedes usar el estado para manejar los filtrosß
  const [filtro, setFiltro] = useState("");

  const admins_profesFiltrados = filtro
    ? admins_profesData.filter((admin_profe) =>
      admin_profe.name.toLowerCase().includes(filtro.toLowerCase())
      )
    : admins_profesData; // si no hay filtro, muestra todas las asistencias

  console.log("filtrado", admins_profesFiltrados);
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
        {admins_profesFiltrados.map((admin_profe) => (
          <AdminProfeCard key={admin_profe._id} admin_profe={admin_profe} />
        ))}
        </div>
      </div>
       {isSolicitarAsistenciaVisible && (
        <IngresarAdmin_prof onClose={handleCloseModal} onAgregarAdmin={recargarDatos}/>
      )}
    </div>
       
  );
}