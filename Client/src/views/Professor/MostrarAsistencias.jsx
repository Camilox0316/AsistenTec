import AsistenciaCard from "../../components/AsistenciaCard";
import "./MostrarAsistencias.css";
import { useState } from "react";
import SolicitarAsistencia from "./SolicitarAsistencia";
import { Sidebar } from "../../components/Sidebar";
// Datos simulados para las tarjetas de asistencia


//Imagenes
//import iconoFiltro from "../../img/lupa.png";
const asistenciasData = [
  {
    id: 1,
    tipoAsistencia: "Horas Estudiante",
    anio: 2022,
    semestre: 1,
    nombre: "POO GR 2",
    descripcionCurso: "Programación Orientada a Objetos Grupo 2",
    estadoAdmin: "Aceptado",
    estadoEstudiante: "Aceptado",
    asistente: "Mario Barboza Artavia",
    editable: false,
  },
  {
    id: 2,
    tipoAsistencia: "Horas Asistente",
    anio: 2022,
    semestre: 2,
    nombre: "Algoritmos",
    descripcionCurso: "Fundamentos de Algoritmos",
    estadoAdmin: "Pendiente",
    estadoEstudiante: "Aceptado",
    asistente: "Lucía Quesada Solano",
    editable: true,
  },
  {
    id: 3,
    tipoAsistencia: "Investigación",
    anio: 2023,
    semestre: 1,
    nombre: "Inteligencia Artificial",
    descripcionCurso: "Técnicas Avanzadas de IA",
    estadoAdmin: "Rechazado",
    estadoEstudiante: "Pendiente",
    asistente: "Carmen Larios Navarro",
    editable: true,
  },
  {
    id: 4,
    tipoAsistencia: "Proyecto",
    anio: 2023,
    semestre: 2,
    nombre: "Desarrollo de Software",
    descripcionCurso: "Metodologías Ágiles",
    estadoAdmin: "Aceptado",
    estadoEstudiante: "Pendiente",
    asistente: "Andrés Vargas",
    editable: false,
  },
 
];
export function MostrarAsistencias() {
  const [isSolicitarAsistenciaVisible, setIsSolicitarAsistenciaVisible] = useState(false);
  const [asistencias, setAsistencias] = useState(asistenciasData);
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
    ? asistenciasData.filter((asistencia) =>
        asistencia.nombre.toLowerCase().includes(filtro.toLowerCase())
      )
    : asistenciasData; // si no hay filtro, muestra todas las asistencias

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
            <input
              type="search"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              list="asistencias-nombres"
              className="filtro-input"
              placeholder="Buscar o filtrar..."
            />
            <datalist id="asistencias-nombres">
              {asistenciasData.map((asistencia) => (
                <option key={asistencia.id} value={asistencia.nombre} />
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
        <SolicitarAsistencia onClose={handleCloseModal}  onAgregarAsistencia={agregarAsistencia} asistenciaTipos={TIPOS_ASISTENCIA}  />
      )}
    </div>
       
  );
}
