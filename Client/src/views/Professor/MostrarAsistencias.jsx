import AsistenciaCard from "../../components/AsistenciaCard";
import "./MostrarAsistencias.css";
import { useState, useEffect } from "react";
import axios from "axios";
import SolicitarAsistencia from "./SolicitarAsistencia";
import { Sidebar } from "../../components/Sidebar";
import { useAuth } from "../../hooks/useAuth";
// Datos simulados para las tarjetas de asistencia

//Imagenes
//import iconoFiltro from "../../img/lupa.png";

export function MostrarAsistencias() {
  const [isSolicitarAsistenciaVisible, setIsSolicitarAsistenciaVisible] =
    useState(false);
  const [asistencias, setAsistencias] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [orden, setOrden] = useState("más reciente");
  const { auth } = useAuth();

  const TIPOS_ASISTENCIA = ["horas estudiante", "horas asistente"];
  const TIPOS_ASISTENCIA_ADMIN = [
    "horas estudiante",
    "asistencia especial",
    "horas asistente",
    "tutoría",
  ];
  const tiposAsistencia = auth.roles?.includes(2264)
    ? TIPOS_ASISTENCIA
    : TIPOS_ASISTENCIA_ADMIN;

  const fetchAsistencias = async () => {
    try {
      const endpoint = auth.roles?.includes(2264)
        ? `http://localhost:3000/assistance/getProfAssistances/${auth.id}`
        : `http://localhost:3000/assistance/getAssistances`;
      const response = await axios.get(endpoint);
      let asistenciasOrdenadas = response.data;
      // Ordenar por fecha de creación, de más reciente a menos reciente o viceversa
      asistenciasOrdenadas = asistenciasOrdenadas.sort((a, b) => {
        return orden === "más reciente"
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt);
      });
      setAsistencias(asistenciasOrdenadas);
    } catch (error) {
      console.error("Error fetching assistances:", error);
    }
  };

  useEffect(() => {
    fetchAsistencias();
  }, [orden]); // Agregar 'orden' como dependencia para refetch cuando cambie

  const asistenciasFiltradas = asistencias.filter((asistencia) =>
    asistencia.name.toLowerCase().includes(filtro.toLowerCase())
  );

  // Función para abrir el modal
  const handleAgregarClick = () => {
    setIsSolicitarAsistenciaVisible(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsSolicitarAsistenciaVisible(false);
    fetchAsistencias(); // Esto recargará las asistencias después de cerrar el modal
  };

  return (
    <div className="mostrar-asistencias-container">
      <Sidebar></Sidebar>
      <div className="asistencias-cards-container">
        <div className="filtros-y-titulo">
          <button onClick={handleAgregarClick} className="btn-filtro">
            Agregar Nuevo +
          </button>
          <h1>Asistencias</h1>
          <div className="filtro-combobox">
            <select onChange={(e) => setOrden(e.target.value)} value={orden}>
              <option value="más reciente">Más Reciente</option>
              <option value="menos reciente">Menos Reciente</option>
            </select>
          </div>
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
              {asistencias.map((asistencia) => (
                <option key={asistencia.id} value={asistencia.name} />
              ))}
            </datalist>
          </div>
        </div>
        <div className="cards-alineadas">
          {asistenciasFiltradas.map((asistencia) => (
            <AsistenciaCard key={asistencia.id} asistencia={asistencia} />
          ))}
        </div>
      </div>
      {isSolicitarAsistenciaVisible && (
        <SolicitarAsistencia
          onClose={handleCloseModal}
          asistenciaTipos={tiposAsistencia}
        />
      )}
    </div>
  );
}
