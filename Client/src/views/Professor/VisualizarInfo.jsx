import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './VisualizarInfo.css';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

const VisualizarInfo = ({ asistencia, applicationId, onClose }) => {
  const [application, setApplication] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/application/getById/${applicationId}`);
        setApplication(response.data);
      } catch (error) {
        console.error('Error fetching application:', error);
      }
    };

    fetchApplication();
  }, [applicationId]);

  if (!application) {
    return <div>Loading...</div>;
  }

  return (
    <div className="visualizar-info-popup">
      <button className="close-button" onClick={onClose}>X</button>
      <div className="popup-content">
        <h1>Formulario-estudiante</h1>
        <div className="info-grid">
          <div className="info-item">
            <strong>Año</strong>
            <span>{asistencia.year}</span>
          </div>
          <div className="info-item">
            <strong>Semestre</strong>
            <span>{asistencia.semester}</span>
          </div>
          <div className="info-item">
            <strong>Nombre de Asistencia</strong>
            <span>{asistencia.name}</span>
          </div>
          <div className="info-item">
            <strong>Código de Curso</strong>
            <span>{asistencia.courseCode}</span>
          </div>
          <div className="info-item">
            <strong>No. de cuenta</strong>
            <span>{application.bankAccount}</span>
          </div>
          <div className="info-item">
            <strong>Beca</strong>
            <span>{application.scholarship}</span>
          </div>
          <div className="info-item">
            <strong>Promedio ponderado</strong>
            <span>{application.avgLastGrade}</span>
          </div>
          <div className="info-item">
            <strong>Nota del curso</strong>
            <span>{application.avgLastGrade}</span>
          </div>
          <div className="info-item">
            <strong>carnet</strong>
            <span>{application.carnet}</span>
          </div>
          <div className="info-item">
            <strong>correo</strong>
            <span>{application.email}</span>
          </div>
          <div className="info-item">
            <strong>Tipo de Asistencia</strong>
            <span>{application.hours}</span>
          </div>
        </div>
        <h3>Informacion adicional</h3>
        <div className="info-grid">
          <div className="info-item">
            <strong>¿Tiene asistencia en otro departamento?</strong>
            <span>{application.otherAssistance ? 'Sí' : 'No'}</span>
          </div>
          <div className="info-item">
            <strong>Horas solicitadas</strong>
            <span>{application.otherHours}</span>
          </div>
          <div className="info-item">
            <strong>Nombre del departamento</strong>
            <span>{application.otherDepartment}</span>
          </div>
        </div>
        {auth?.roles?.includes(3123) && (
          <div className="button-group">
            <button className="reject-button">Rechazar</button>
            <button className="accept-button">Aceptar</button>
          </div>
        )}
      </div>
    </div>
  );
};

VisualizarInfo.propTypes = {
  asistencia: PropTypes.shape({
    year: PropTypes.number.isRequired,
    semester: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    courseCode: PropTypes.string.isRequired,
  }).isRequired,
  applicationId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default VisualizarInfo;
