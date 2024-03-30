import { useState } from "react";
import "./SolicitarAsistencia.css"; // Make sure you have the CSS for styling
import Libro from "../../img/libro.png";
import CerrarIcono from '../../img/cancelar.png'; // Asegúrate de tener un ícono de cierre
import PropTypes from 'prop-types';

const SolicitarAsistencia = ({onClose ,onAgregarAsistencia, asistenciaTipos}) => {
  
SolicitarAsistencia.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAgregarAsistencia: PropTypes.func.isRequired,
  asistenciaTipos: PropTypes.arrayOf(PropTypes.string).isRequired,
};

  const [tipoAsistencia, setTipoAsistencia] = useState(asistenciaTipos[0]);
  const [anio, setAnio] = useState(new Date().getFullYear());
  const [semestre, setSemestre] = useState("1");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!nombre.trim() || !descripcion.trim() || !anio.trim()) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    const nuevaAsistencia = {
      
      id: Date.now(), // Solo como ejemplo, aquí necesitarías una ID única
      tipoAsistencia,
      anio,
      semestre,
      nombre,
      descripcionCurso: descripcion,
      // Otros campos que sean necesarios
    };
 
  
    onAgregarAsistencia(nuevaAsistencia);
    console.log( descripcion, tipoAsistencia,anio,semestre,nombre);
    onClose(); // Para cerrar el modal
  };
  

 // Asegúrate de que el componente no se renderice si no debería ser visible
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
            <div className="anio-semestre-container">
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
            <label>
              Nombre
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </label>
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
