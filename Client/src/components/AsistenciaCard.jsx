import  { useState } from 'react';
import libroIcon from '../img/libro.png'; 
import boligrafoIcon from '../img/boligrafo.png'; 
import trash from '../img/trash.png';
import AsistenciaDetails from './AsistenciaDetails';
import "./cards.css";
import PropTypes from 'prop-types';

function AsistenciaCard({ asistencia, onEdit, onDelete , _onClick, actualizarAsistencias}) {

 

  const [showDetails, setShowDetails] = useState(false);

  const semestreAnio = `Semestre ${asistencia.semester} ${asistencia.year}`;
  

  const closeDetails = () => {
    
    setShowDetails(false);
    console.log("actualizando..");
    actualizarAsistencias();
  };

  return (
    <div className={`asistencia-card`} onClick={() => _onClick(asistencia)}>
      <div className="asistencia-header">
        <img src={libroIcon} alt="Icono Libro" className="asistencia-icon" />
        <div className="asistencia-titulo">
          <h3>{asistencia.name}</h3>
          <p className="asistencia-semestre">{semestreAnio}</p>
        </div>
      </div>
      <div className="asistencia-info">
        <p><strong>Tipo de Asistencia:</strong> {asistencia.assistanceType}</p>
        <p><strong>Estado de Aprobación:</strong> {asistencia.adminStatus}</p>
        <p><strong>Estado de Aprobación Estudiante:</strong> {asistencia.studentStatus}</p>
      </div>
      <div className="icon-container">
        {asistencia.isEditable && asistencia.adminStatus === 'pendiente' && (
          <img src={boligrafoIcon} alt="Editar" className="edit-icon" onClick={() => onEdit(asistencia)} />
        )}
        {asistencia.isEditable && asistencia.adminStatus === 'pendiente' &&(
          <img src={trash} alt="Eliminar" className="delete-icon" onClick={() => onDelete(asistencia)} />
        )}
      </div>
      {showDetails && (
        <AsistenciaDetails asistencia = {asistencia} onClose={closeDetails}/>

      )}
    </div>
  );
}

// PropTypes
AsistenciaCard.propTypes = {
  asistencia: PropTypes.shape({
    _id: PropTypes.string, 
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
    courseCode: PropTypes.string,
    isActive: PropTypes.bool.isRequired,
  }),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired, // Asegúrate de pasar el objeto de autenticación como prop
  _onClick:PropTypes.func.isRequired,
  actualizarAsistencias: PropTypes.func
};

export default AsistenciaCard;
