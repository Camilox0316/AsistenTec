
import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import "./asistenciaDetails.css";

function AsistenciaDetails({ asistencia, onClose }) {

  const handleUpdateAssistance = async () => {
    try {
      const { data } = await axios.put(`http://localhost:3000/assistance/update-status-assistance/${asistencia._id}`, {
        newAdminStatus: 'aceptado' // Nuevo estado que deseas asignar a adminStatus
      });
      //setResponse(data);
    } catch (error) {
      console.error('Hubo un error al actualizar la asistencia:', error);
    }
    onClose();
  };

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
          <button className='aceptar-button' onClick={handleUpdateAssistance}>Aceptar</button>
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