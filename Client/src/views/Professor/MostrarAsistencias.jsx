import AsistenciaCard from "../../components/AsistenciaCard";
import "./MostrarAsistencias.css";
import { useState, useEffect } from "react";
import axios from "axios";
import SolicitarAsistencia from "./SolicitarAsistencia";
import { Sidebar } from "../../components/Sidebar";
import { useAuth } from "../../hooks/useAuth";
import ConfirmDeletePopup from "../../components/ConfirmDeletePopup.jsx"
import AsistenciaDetails from "../../components/AsistenciaDetails.jsx";
import Preseleccionar from "./Preseleccionar.jsx"
import Calificar from "./Calificar.jsx"


export function MostrarAsistencias() {
  const [isSolicitarAsistenciaVisible, setIsSolicitarAsistenciaVisible] =
    useState(false);
  const [asistenciaParaEditar, setAsistenciaParaEditar] = useState(null);
  const [asistencias, setAsistencias] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [orden, setOrden] = useState("más reciente");
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [asistenciaParaEliminar, setAsistenciaParaEliminar] = useState(null);
  const { auth } = useAuth();

  const [showDetails, setShowDetails] = useState(false);
  const [showPreseleccionar, setShowPreseleccionar] = useState(false);
  const [showCalificarPopup, setShowCalificarPopup] = useState(false);

  const closeDetails = () => {
    console.log("cerrando..");
    setShowDetails(false);
    fetchAsistencias();
  };

  const [asistenciaActual, setAsistenciaActual] = useState(Object);

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

  const handleDelete = (asistencia) => {
    // Lógica para mostrar el popup de confirmación de eliminación
    setAsistenciaParaEliminar(asistencia); // Guarda la asistencia a editar
    setShowConfirmDelete(true);
  };
  const confirmDelete = async () => {
    if (!asistenciaParaEliminar) return;

    try {
      // Hace la llamada DELETE a tu API
      await axios.delete(`http://localhost:3000/assistance/deleteAssistance/${asistenciaParaEliminar._id}`);
      
      // Actualiza el estado para reflejar el cambio
      setAsistencias(asistencias.filter((item) => item._id !== asistenciaParaEliminar._id));
      
      // Oculta el popup de confirmación
      setShowConfirmDelete(false);
    } catch (error) {
      console.error("Error deleting assistance:", error);
      // Aquí puedes manejar errores, por ejemplo, mostrar un mensaje al usuario.
    }
  };
  const handleEdit = (asistencia) => {
    setAsistenciaParaEditar(asistencia); // Guarda la asistencia a editar
    setIsSolicitarAsistenciaVisible(true); // Abre el popup
  };

  useEffect(() => {
    fetchAsistencias();
  }, [orden]); // Agregar 'orden' como dependencia para refetch cuando cambie

  const asistenciasFiltradas = asistencias.filter((asistencia) =>
    asistencia.name.toLowerCase().includes(filtro.toLowerCase())
  );

  // Función para abrir el modal
  const abrirDetallesAsistencia = (asistencia) => {
    console.log("verificando roles")
    console.log("rol:", auth.roles)
    if (auth?.roles?.find((role) => [3123].includes(role))) {//Admin 
      console.log("Admin")
      setShowDetails(true);
      setAsistenciaActual(asistencia);
      console.log("detalles asistencias")
    }
    else if (auth?.roles?.includes(2264)) { // Professor role
      console.log("Entra a Profe")
        if (asistencia.adminStatus === 'aceptado' && asistencia.studentStatus !== 'aceptado') {
          setShowPreseleccionar(true);
          setAsistenciaActual(asistencia);
        } else if (asistencia.adminStatus === 'aceptado' && asistencia.studentStatus === 'aceptado') {
          setShowCalificarPopup(true);
          setAsistenciaActual(asistencia);
      }
    }

  };

  // Función para abrir el modal
  const handleAgregarClick = () => {
    setIsSolicitarAsistenciaVisible(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsSolicitarAsistenciaVisible(false);
    setAsistenciaParaEditar(null); // Limpia la asistencia a editar al cerrar
    fetchAsistencias(); // Recarga las asistencias
  };

  const actualizarAsistencias = () => {
    console.log("actualizando..");
    fetchAsistencias(); // Recarga las asistencias
  }

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
          {asistenciasFiltradas        
          //.filter(asistencia => asistencia.adminStatus === "pendiente" || asistencia.adminStatus === "rechazado")
            .map(asistencia => ( 
            <AsistenciaCard key={asistencia.id} asistencia={asistencia} onEdit={handleEdit} 
            onDelete={() => handleDelete(asistencia)} auth={auth} _onClick={() => abrirDetallesAsistencia(asistencia)} actualizarAsistencias={actualizarAsistencias}/>
          ))}
        </div>
      </div>
      {isSolicitarAsistenciaVisible && (
        <SolicitarAsistencia
          onClose={handleCloseModal}
          asistenciaTipos={tiposAsistencia}
          asistencia={asistenciaParaEditar} 
        />
      )}
      {showConfirmDelete && (
        <ConfirmDeletePopup
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmDelete(false)}
        />
      )}
      {showDetails && (
        <AsistenciaDetails
          asistencia={asistenciaActual}
          onClose={closeDetails}

        />
      )}
   {showPreseleccionar && (
        <Preseleccionar
          asistencia={asistenciaActual}
          onClose={() => setShowPreseleccionar(false)}
        />
      )}
      {showCalificarPopup && (
        <Calificar
          asistencia={asistenciaActual}
          onClose={() => setShowCalificarPopup(false)}
        />
      )}
      
    </div>
  );
}
