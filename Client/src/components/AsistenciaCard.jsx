import libroIcon from '../img/libro.png'; // Asegúrate de que la ruta es correcta
import boligrafoIcon from '../img/boligrafo.png'; // Si es necesario
import "./cards.css";
import PropTypes from 'prop-types';

function AsistenciaCard({ asistencia }) {
    const {
      name,
      semester,
      year,
      adminStatus,
      studentStatus,   
      // asistente, Esta propiedad ya no se utiliza directamente
      isEditable,
      assistanceType, // Asumiendo que quieres mostrar el tipo de asistencia
      //hours, // Asumiendo que quieres mostrar las horas
      //  groupNumber // Asumiendo que quieres mostrar el número de grupo
    } = asistencia;
  
    const semestreAnio = `Semestre ${semester} ${year}`;
  
    return (
      <div className="asistencia-card">
        <div className="asistencia-header">
          <img src={libroIcon} alt="Icono Libro" className="asistencia-icon" />
          <div className="asistencia-titulo">
            <h3>{name}</h3>
            <p className="asistencia-semestre">{semestreAnio}</p>
          </div>
        </div>
        <div className="asistencia-info">
          <p><strong>Tipo de Asistencia:</strong> {assistanceType}</p>
          <p><strong>Estado de Administrador:</strong> {adminStatus}</p>
          <p><strong>Estado de Estudiante:</strong> {studentStatus}</p>
        </div>
        {isEditable && <img src={boligrafoIcon} alt="Editar" className="edit-icon" />}
      </div>
    );
}

// Actualización de PropTypes
AsistenciaCard.propTypes = {
    asistencia: PropTypes.shape({
      name: PropTypes.string.isRequired,
      semester: PropTypes.number.isRequired,
      year: PropTypes.number.isRequired,
      adminStatus: PropTypes.string.isRequired,
      studentStatus: PropTypes.string.isRequired,
      isEditable: PropTypes.bool.isRequired,
      assistanceType: PropTypes.string.isRequired,
      hours: PropTypes.number.isRequired,
      groupNumber: PropTypes.number.isRequired
    }).isRequired,
};

export default AsistenciaCard;
