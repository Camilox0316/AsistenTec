
import React from 'react';
import PropTypes from 'prop-types';

import "./asistenciaDetails.css";

function AsistenciaDetails({ asistencia, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="asistencia-details">
        {/* <p><strong>ID:</strong> {asistencia._id}</p>
        <p><strong>Profesor ID:</strong> {asistencia.proffesorId}</p> */}
        <p><strong>Escuela:</strong> {asistencia.school}</p>
        <p><strong>Descripción del Curso:</strong> {asistencia.courseDescription}</p>
        <p><strong>Número de Grupo:</strong> {asistencia.groupNumber}</p>
        <p><strong>Código de Curso:</strong> {asistencia.courseCode}</p>
        <p><strong>Horas:</strong> {asistencia.hours}</p>
        
        <div className='buttons'>
          <button className='aceptar-button'>Aceptar</button>
          <button className='rechazar-button' onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

AsistenciaDetails.propTypes = {
  asistencia: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AsistenciaDetails;