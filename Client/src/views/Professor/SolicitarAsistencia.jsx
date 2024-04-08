import { useState, useEffect } from "react";
import "./SolicitarAsistencia.css"; // Make sure you have the CSS for styling
import Libro from "../../img/libro.png";
import CerrarIcono from "../../img/cancelar.png"; // Asegúrate de tener un ícono de cierre
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";

const SolicitarAsistencia = ({
  onClose,
  asistenciaTipos,
}) => {
    const { auth } = useAuth();
    SolicitarAsistencia.propTypes = {
    onClose: PropTypes.func.isRequired,
    onAgregarAsistencia: PropTypes.func.isRequired,
    asistenciaTipos: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  const [tipoAsistencia, setTipoAsistencia] = useState(asistenciaTipos[0]);
  const [anio, setAnio] = useState(new Date().getFullYear());
  const [semestre, setSemestre] = useState("1");
  const [horas, setHoras] = useState(50);
  const [grupo, setGrupo] = useState(0);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const onAgregarAsistencia = async (nuevaAsistencia) => {
    try {
      await axios.post('http://localhost:3000/assistance/addAssistance', nuevaAsistencia);
      onClose(); // Esto cerrará el modal y debería desencadenar la recarga de asistencias
    } catch (error) {
      alert('Error al crear la asistencia');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!nombre.trim() || !descripcion.trim() ) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    const nuevaAsistencia = {
      proffesorId: auth.id,
      school: "matemáticas", // Valor por defecto
      assistanceType: tipoAsistencia,
      year: parseInt(anio, 10), // Asegurándonos de que sea un número
      semester: parseInt(semestre, 10),
      name: nombre,
      courseDescription: descripcion,
      adminStatus: "pendiente",
      studentStatus: "pendiente",
      isEditable: true, 
      hours: horas,
      groupNumber:grupo,
      isActive: true,
    };

    onAgregarAsistencia(nuevaAsistencia);
  };

  // Actualiza el estado de 'grupo' cada vez que cambia 'tipoAsistencia'
  useEffect(() => {
    if (tipoAsistencia !== "horas asistente") {
      setGrupo(0);
    }
  }, [tipoAsistencia]);

  return (
    <div className="modal-overlay">
      <div className="solicitar-asistencia-container">
        <img
          src={CerrarIcono}
          alt="Cerrar"
          className="cerrar-icono"
          onClick={onClose} // Llama a handleCloseClick cuando se hace clic en el ícono
        />
        <h1>Solicitar Asistencia</h1>

        <img src={Libro} alt="Icon" className="asistencia-icon" />
        <div className="solicitar-asistencia-form">
          <form onSubmit={handleSubmit}>
            <div className="campo-simple">
              <label>
                Tipo Asistencia
                <select
                  value={tipoAsistencia}
                  onChange={(e) => setTipoAsistencia(e.target.value)}
                >
                  {asistenciaTipos.map((tipo, index) => (
                    <option key={index} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="campo-doble">
              <label>
                Año
                <input
                  type="number"
                  value={anio}
                  onChange={(e) => setAnio(e.target.value)}
                  min={new Date().getFullYear()}
                />
              </label>
              <label>
                Semestre
                <select
                  value={semestre}
                  onChange={(e) => setSemestre(e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </label>
            </div>
            <div className="campo-simple">
              <label>
                Nombre
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </label>
            </div>
            <div className="campo-doble">
              {/* Renderizado condicional para el campo Número de Grupo */}
              {tipoAsistencia === "Horas Asistente" && (
                <label>
                  Número de Grupo
                  <input
                    type="number"
                    value={grupo}
                    onChange={(e) => setGrupo(e.target.value)}
                    min={0}
                  />
                </label>
              )}
              <label>
                Horas
                <input
                  type="number"
                  value={horas}
                  onChange={(e) => setHoras(e.target.value)}
                  min={50}
                />
              </label>
            </div>
            <label>
              Descripción del Curso
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              ></textarea>
            </label>
            <div className="guardar-button-container">
              <button type="submit">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SolicitarAsistencia;
