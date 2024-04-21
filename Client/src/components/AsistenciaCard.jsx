import libroIcon from '../img/libro.png'; 
import boligrafoIcon from '../img/boligrafo.png'; 
import trash from '../img/trash.png';

import "./cards.css";
import PropTypes from 'prop-types';

function AsistenciaCard({ asistencia , onEdit, onDelete}) {

  
    const semestreAnio = `Semestre ${asistencia.semester} ${asistencia.year}`;
  
    return (
      <div className="asistencia-card">
        <div className="asistencia-header">
          <img src={libroIcon} alt="Icono Libro" className="asistencia-icon" />
          <div className="asistencia-titulo">
            <h3>{asistencia.name}</h3>
            <p className="asistencia-semestre">{semestreAnio}</p>
          </div>
        </div>
        <div className="asistencia-info">
          <p><strong>Tipo de Asistencia:</strong> {asistencia.assistanceType}</p>
          <p><strong>Estado de Administrador:</strong> {asistencia.adminStatus}</p>
          <p><strong>Estado de Estudiante:</strong> {asistencia.studentStatus}</p>
        </div>
        <div className="icon-container">
  {asistencia.isEditable && (
    <img src={boligrafoIcon} alt="Editar" className="edit-icon" onClick={() => onEdit(asistencia)} />
  )}
  {asistencia.isEditable && (
    <img src={trash} alt="Eliminar" className="delete-icon" onClick={() => onDelete(asistencia)} />
  )}
</div>
      </div>
    );
}

// Actualización de PropTypes
AsistenciaCard.propTypes = {
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
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default AsistenciaCard;
