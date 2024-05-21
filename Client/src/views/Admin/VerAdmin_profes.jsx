import AdminProfeCard from "../../components/AdminProfeCard";
import "./VerAdmin_profes.css";
import { useState,useEffect} from "react";
//import IngresarAdmin_prof from "./IngresarAdmin_prof";
import { Sidebar } from "../../components/Sidebar";
// Datos simulados para las tarjetas de asistencia
import IngresarAdmin_prof from "./IngresarAdmin_prof";
import axios from "axios";
import ConfirmDeletePopup from "../../components/ConfirmDeletePopup";
import { any } from "prop-types";
const hostUrl = import.meta.env.VITE_HOST_URL;
//Imagenes
//import iconoFiltro from "../../img/lupa.png";
const URI = `${hostUrl}/user/getAdmins`
// let response = await axios.get(URI);
// console.log("response:", response.data);
// setAdmin_profes(response.data);


 

export function VerAdmin_profes() {
const [adminParaEliminar, setadminParaEliminar] = useState(null);
const [showConfirmDelete, setShowConfirmDelete] = useState(false);
const [admin_profes, setAdmin_profes] = useState([]);
  const [isSolicitarAsistenciaVisible, setIsSolicitarAsistenciaVisible] = useState(false);
  const [admins_profesData, setAdmins_profesData] = useState([]);
  const [orden, setOrden] = useState("más reciente");

  const cargarDatos = async () => {
    let response = await axios.get(URI);

    console.log("response:", response.data);
    setAdmin_profes(response.data);
  };

  const handleDelete = (admin_profe) => {
    // Lógica para mostrar el popup de confirmación de eliminación
    setadminParaEliminar(admin_profe); // Guarda la asistencia a eliminar
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    if (!adminParaEliminar) return;

    try {
      // Hace la llamada DELETE a tu API
      await axios.delete(`${hostUrl}/login/deleteAdmin_profe/${adminParaEliminar._id}`);
      
      // Actualiza el estado para reflejar el cambio
      setAdmin_profes(admin_profes.filter((item) => item._id !== adminParaEliminar._id));
      
      // Oculta el popup de confirmación
      setShowConfirmDelete(false);
    } catch (error) {
      console.error("Error deleting assistance:", error);
      // Aquí puedes manejar errores, por ejemplo, mostrar un mensaje al usuario.
    }
  };
  const handleAgregarClick = () => {
    setIsSolicitarAsistenciaVisible(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsSolicitarAsistenciaVisible(false);
  };

  useEffect(() => {
    cargarDatos();
  }, [orden]); // Agregar 'orden' como dependencia para refetch cuando cambie

  // Puedes usar el estado para manejar los filtrosß
  const [filtro, setFiltro] = useState("");

  const admins_profesFiltrados = filtro
    ? admin_profes.filter((admin_profe) =>
      admin_profe.name.toLowerCase().includes(filtro.toLowerCase())
      )
    : admin_profes; // si no hay filtro, muestra todas las asistencias

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
              {admin_profes.map((admin_profe) => (
                <option key={admin_profe._id} value={admin_profe._id} />
              ))}
            </datalist>
          </div>
        </div>
        <div className="cards-alineadas">
        {admins_profesFiltrados.map((admin_profe) => (
          <AdminProfeCard key={admin_profe._id} admin_profe={admin_profe} onDelete={() => handleDelete(admin_profe)}/>
        ))}
        </div>
      </div>
       {isSolicitarAsistenciaVisible && (
        <IngresarAdmin_prof onClose={handleCloseModal} onAgregarAdmin={cargarDatos}/>
      )}
      {showConfirmDelete && (
        <ConfirmDeletePopup
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmDelete(false)}
        />
      )}
    </div>
       
  );
}