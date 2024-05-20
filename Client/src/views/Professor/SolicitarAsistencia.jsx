import { useState, useEffect } from "react";
import "./SolicitarAsistencia.css"; // Make sure you have the CSS for styling
import Libro from "../../img/libro.png";
import CerrarIcono from "../../img/cancelar.png"; // Asegúrate de tener un ícono de cierre
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
const hostUrl = import.meta.env.VITE_HOST_URL;
const SolicitarAsistencia = ({
  onClose,
  asistenciaTipos,
  asistencia = null, // asistencia para editar, si es null, se crea una nueva


}) => {
    const { auth } = useAuth();
    SolicitarAsistencia.propTypes = {
    onClose: PropTypes.func.isRequired,
    asistenciaTipos: PropTypes.arrayOf(PropTypes.string).isRequired,
    asistencia: PropTypes.shape({
      _id: PropTypes.string, // Asumiendo que cada asistencia tiene un ID único
      proffesorId: PropTypes.string.isRequired,
      school: PropTypes.string.isRequired,
      assistanceType: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      semester: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      courseDescription: PropTypes.string.isRequired,
      adminStatus: PropTypes.string.isRequired,
      studentStatus: PropTypes.string.isRequired,
      isEditable: PropTypes.bool.isRequired,
      hours: PropTypes.number.isRequired,
      groupNumber: PropTypes.number,
      courseCode: PropTypes.string, // Puede ser no requerido dependiendo de la lógica de tu aplicación
      isActive: PropTypes.bool.isRequired,
    }),
    
  };

  const [tipoAsistencia, setTipoAsistencia] = useState(asistencia ? asistencia.assistanceType : asistenciaTipos[0]);
  const [anio, setAnio] = useState(asistencia ? asistencia.year : new Date().getFullYear());
  const [semestre, setSemestre] = useState(asistencia ? asistencia.semester.toString() : "1");
  const [horas, setHoras] = useState(asistencia ? asistencia.hours : 50);
  const [grupo, setGrupo] = useState(asistencia && asistencia.groupNumber ? asistencia.groupNumber : 0);
  const [nombre, setNombre] = useState(asistencia ? asistencia.name : "");
  const [descripcion, setDescripcion] = useState(asistencia ? asistencia.courseDescription : "");
  const [courseCode, setCourseCode] = useState(
asistencia && asistencia.courseCode ? asistencia.courseCode : ''
  );


  
  const isValidCourseCode = (code) => {
    return /^[A-Z]{2}-\d{4}$/.test(code); // Expresión regular para validar el formato
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!nombre.trim() || !descripcion.trim() || !courseCode.trim()) {
      alert("Por favor, complete todos los campos.");
      return;
    }
      // Verificación adicional para cuando el tipo de asistencia es "horas asistente"
  if (tipoAsistencia === "horas asistente" && !isValidCourseCode(courseCode)) {
    alert("Por favor, ingrese un código de curso válido. 'Dos Letras-4 números' EJ:MA-1010.");
    return;
  }
    const nuevaAsistencia = {
      proffesorId: asistencia ? asistencia.proffesorId : auth.id,
      school: "matemáticas", // Valor por defecto
      assistanceType: tipoAsistencia,
      year: parseInt(anio, 10), // Asegurándonos de que sea un número
      semester: parseInt(semestre, 10),
      name: nombre,
      courseDescription: descripcion,
      adminStatus: "pendiente",
      studentStatus: "pendiente",
      isEditable: true, 
      hours: parseInt(horas, 10),
      groupNumber: grupo,
      courseCode: courseCode,
      isActive: true,
    };

    try {
      if (asistencia) {
        await axios.put(`${hostUrl}/assistance/updateAssistance/${asistencia._id}`, nuevaAsistencia);
      } else {
        await axios.post(`${hostUrl}/assistance/addAssistance`, nuevaAsistencia);
      }
      onClose();
    } catch (error) {
      alert('Error al guardar la asistencia');
    }
  };


  // Actualiza el estado de 'grupo' cada vez que cambia 'tipoAsistencia'
  useEffect(() => {
    // Actualizar solo el estado del curso y grupo cuando el tipo de asistencia es "horas asistente"
    if (tipoAsistencia !== "horas asistente") {
      // Aquí, asegúrate de manejar el cambio a 0 para el grupo si no es "horas asistente"
      setGrupo(0);
      setCourseCode("NA-0000");
    } else {
      // Si es "horas asistente" y la asistencia está definida, entonces usa los valores de la asistencia.
      // Si no, usa un string vacío para courseCode y 0 para grupo para indicar que no está definido.
      if (asistencia) {
        setCourseCode(asistencia.courseCode ? asistencia.courseCode : '');
        setGrupo(asistencia.groupNumber ? asistencia.groupNumber : 0);
      } else {
        setCourseCode('');
        setGrupo(0);
      }
    }
  }, [tipoAsistencia, asistencia]);

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
            {/* Condición para mostrar el campo de Código del Curso */}
            {tipoAsistencia === "horas asistente" && (
              <div className="campo-simple">
                <label>
                  Código del Curso
                  <input
                    type="text"
                    placeholder="Ej: MA-0101"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                  />
                </label>
              </div>
            )}
            <div className="campo-doble">
              {/* Renderizado condicional para el campo Número de Grupo */}
              {tipoAsistencia === "horas asistente" && (
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
                  min={15}
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
