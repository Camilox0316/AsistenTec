import PropTypes from 'prop-types';
import libroIcon from '../../img/libro.png';
import "./Preseleccionar.css"; // Reuse the same CSS file
import { useState } from 'react';

const Calificar = ({ asistencia, onClose }) => {
  const [postulantes, setPostulantes] = useState([
    { nombre: "Mario Barboza", calificacion: 5 },
  ]);

  const handleCalificar = (index, value) => {
    const updatedPostulantes = postulantes.map((postulante, i) => ({
      ...postulante,
      calificacion: i === index ? value : postulante.calificacion
    }));
    setPostulantes(updatedPostulantes);
  };

  const handleNombreClick = (nombre) => {
    console.log(`Nombre del estudiante: ${nombre}`);
  };

  return (
    <div className="preseleccionar-popup">
      <button className="close-button" onClick={onClose}>X</button>
      <img src={libroIcon} alt="Icono Libro" className="libro-icon" />
      <div className="popup-content">
        <h1>{asistencia.name}</h1>
        <p>{`Semestre ${asistencia.semester} ${asistencia.year}`}</p>
        <p><strong>Estado</strong></p>
        <p>{asistencia.adminStatus}</p>
        <h3>Postulantes</h3>
        <div className="contenedor-tabla-preseleccion">
          <table className="tabla-preseleccion">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Calificar 0 - 5</th>
              </tr>
            </thead>
            <tbody>
              {postulantes.map((postulante, index) => (
                <tr key={index}>
                  <td 
                    className="clickable"
                    onClick={() => handleNombreClick(postulante.nombre)}
                  >
                    {postulante.nombre}
                  </td>
                  <td>
                    <select 
                      value={postulante.calificacion} 
                      onChange={(e) => handleCalificar(index, Number(e.target.value))} 
                      className="calificacion-select"
                    >
                      {[...Array(6).keys()].slice(1).map(value => (
                        <option key={value} value={value}>{value}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

Calificar.propTypes = {
  asistencia: PropTypes.shape({
    name: PropTypes.string.isRequired,
    semester: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    adminStatus: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Calificar;
