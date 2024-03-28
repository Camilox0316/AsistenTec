import libroIcon from '../img/libro.png'; // Asegúrate de que la ruta es correcta
import boligrafoIcon from '../img/boligrafo.png'; // Si es necesario
import "./cards.css"
function AsistenciaCard({ asistencia }) {
    const {
      nombre,
      semestre,
      anio,
      estadoAdmin,
      estadoEstudiante,   
      asistente,
      editable
    } = asistencia;
  
    const semestreAnio = `Semestre ${semestre} ${anio}`;
    const nombreAsistente = asistente !== -1 ? asistente : "Pendiente";
  
    return (
      <div className="asistencia-card">
        <div className="asistencia-header">
          <img src={libroIcon} alt="Icono Libro" className="asistencia-icon" />
          <div className="asistencia-titulo">
            <h3>{nombre}</h3>
            <p className="asistencia-semestre">{semestreAnio}</p>
          </div>
        </div>
        <div className="asistencia-info">
          <p><strong>Asistente:</strong> </p>
          <p>{nombreAsistente}</p>
          <p><strong>Estado Administrador:</strong> </p>
          <p>{estadoAdmin}</p>
          <p><strong>Estado Estudiante:</strong> </p>
          <p>{estadoEstudiante}</p>
        </div>
        {editable && <img src={boligrafoIcon} alt="Editar" className="edit-icon" />}
      </div>
    );
  }
  
  export default AsistenciaCard;
  