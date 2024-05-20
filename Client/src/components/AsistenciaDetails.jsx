
import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import "./asistenciaDetails.css";
import CerrarIcono from '../img/cancelar.png';
const hostUrl = import.meta.env.VITE_HOST_URL;
function AsistenciaDetails({ asistencia, onClose }) {

  const handleUpdateAssistance = async (estado) => {
    try {
      const { data } = await axios.put(`${hostUrl}/assistance/update-status-assistance/${asistencia._id}`, {
        newAdminStatus: estado// Nuevo estado que deseas asignar a adminStatus
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
      <img
          src={CerrarIcono}
          alt="Cerrar"
          className="cerrar-icono"
          onClick={onClose} // Llama a handleCloseClick cuando se hace clic en el ícono
        />
          <h1><strong>Detalles</strong></h1>
        {/* <p><strong>ID:</strong> {asistencia._id}</p>
        <p><strong>Profesor ID:</strong> {asistencia.proffesorId}</p> */}

        <p><strong>Escuela:</strong> {asistencia.school}</p>
        {/* <p><strong>Profesor:</strong> {asistencia.professorName}</p> */}
        
        <p><strong>Descripción del Curso:</strong> {asistencia.courseDescription}</p>
        <p><strong>Número de Grupo:</strong> {asistencia.groupNumber}</p>
        <p><strong>Código de Curso:</strong> {asistencia.courseCode}</p>
        <p><strong>Horas:</strong> {asistencia.hours}</p>
        
        <div className='buttons'>
          <button className='aceptar-button' onClick={() => handleUpdateAssistance('aceptado')}>Aceptar</button>
          <button className='rechazar-button' onClick={() => handleUpdateAssistance('rechazado')}>Rechazar</button>
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