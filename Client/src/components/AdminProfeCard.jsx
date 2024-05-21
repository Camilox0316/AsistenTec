import UserIcon from '../img/userLogo.png';
//import boligrafoIcon from '../img/boligrafo.png'; // Si es necesario
import "./cards.css"
import PropTypes from 'prop-types';
import trash from '../img/trash.png';
function AdminProfeCard({ admin_profe ,onDelete}) {
    const {
      name,
      carnet,
      lastName1,
      lastName2, 
      email, 
      password,
      roles,
      //estado,
      //description
    } = admin_profe;
  
    //const semestreAnio = `Semestre ${semestre} ${anio}`;
    //const nombreAsistente = asistente !== -1 ? asistente : "Pendiente";
  
    return (
      <div className="asistencia-card">
        <div className="icon-container">
          <img src={trash} alt="Eliminar" className="delete-icon" onClick={() => onDelete(admin_profe)} />
          </div>
        <div className="asistencia-header">
          <img src={UserIcon} alt="Icono User" className="asistencia-icon" />
          <div className="asistencia-titulo">
            <h3>{name} {lastName1} {lastName2}</h3>

          </div>
        </div>
        <div className="asistencia-info">
          <p><strong>Email:</strong> </p>
          <p>{email}</p>
          <p><strong>Escuela:</strong> </p>
          <p>Matematicas</p>
          <p><strong>Rol:</strong></p>
          <p>{roles === 2264 ? 'Profesor' : roles === 3123 ? 'Administrador' : 'Admin'}</p>
          {/* <p><strong>Estado Estudiante:</strong> </p>
          <p>{estadoEstudiante}</p> */}
        </div>
      
      </div>
    );
  }
  AdminProfeCard.propTypes = {
    admin_profe: PropTypes.arrayOf(PropTypes.string).isRequired,
    onDelete: PropTypes.func.isRequired,
  };
  export default AdminProfeCard;
  