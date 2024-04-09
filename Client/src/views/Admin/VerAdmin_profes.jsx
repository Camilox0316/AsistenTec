import AdminProfeCard from "../../components/AdminProfeCard";
import "./VerAdmin_profes.css";
import { useState, useEffect } from "react";
import IngresarAdmin_prof from "./IngresarAdmin_prof";
import { Sidebar } from "../../components/Sidebar";
import axios from "axios";

const URI = 'http://localhost:3000/user/getAdmins';

export function VerAdmin_profes() {
  const [isSolicitarAsistenciaVisible, setIsSolicitarAsistenciaVisible] = useState(false);
  const [admins_profes, setAdmin_profes] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URI);
        setAdmin_profes(response.data);
      } catch (error) {
        console.error("Error fetching admins/profes:", error);
      }
    };

    fetchData();
  }, []);

  const recargarDatos = async () => {
    try {
      const response = await axios.get(URI);
      setAdmin_profes(response.data);
    } catch (error) {
      console.error("Error fetching admins/profes:", error);
    }
  };

  const handleAgregarClick = () => {
    setIsSolicitarAsistenciaVisible(true);
  };

  const handleCloseModal = () => {
    setIsSolicitarAsistenciaVisible(false);
  };

  const admins_profesFiltrados = filtro
    ? admins_profes.filter((admin_profe) =>
        admin_profe.name.toLowerCase().includes(filtro.toLowerCase())
      )
    : admins_profes;

  return (
    <div className="mostrar-asistencias-container">
      <Sidebar></Sidebar>
      <div className="asistencias-cards-container">
        <div className="filtros-y-titulo">
          <button onClick={handleAgregarClick} className="btn-filtro">
            Agregar Nuevo +
          </button>
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
              {admins_profes.map((admin_profe) => (
                <option key={admin_profe._id} value={admin_profe.name} />
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
        <IngresarAdmin_prof onClose={handleCloseModal} onAgregarAdmin={recargarDatos} />
      )}
    </div>
  );
}