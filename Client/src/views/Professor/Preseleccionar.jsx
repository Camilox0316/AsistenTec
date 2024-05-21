import PropTypes from 'prop-types';
import libroIcon from '../../img/libro.png';
import "./Preseleccionar.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import VisualizarInfo from './VisualizarInfo'; // Asegúrate de importar el nuevo componente
import { useAuth } from '../../hooks/useAuth';
const hostUrl = import.meta.env.VITE_HOST_URL;

const Preseleccionar = ({ asistencia, onClose ,refrescarAsistencias}) => {
  const [postulantes, setPostulantes] = useState([]);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [selectedReceivedApplicationId, setSelectedReceivedApplicationId] = useState(null); // Add this line
  const { auth } = useAuth(); // Obtener la información de autenticación

  const fetchPostulantes = async () => {
    try {
      const receivedApplicationsResponse = await axios.get(`${hostUrl}/received/receivedApplications/${asistencia._id}`);
      const receivedApplications = receivedApplicationsResponse.data;

      const postulantesData = await Promise.all(receivedApplications.map(async (application) => {
        const userResponse = await axios.get(`${hostUrl}/user/getUserByIdAll/${application.idUser}`);
        const user = userResponse.data;

        return {
          nombre: `${user.name} ${user.lastName1} ${user.lastName2}`,
          carne: user.carnet,
          preseleccionar: application.status ? "Sí" : "No",
          postulaciones: application.idApplication,
          applicationId: application.idApplication, // Adjust this line
          receivedApplicationId: application._id // Add this line
        };
      }));

      setPostulantes(postulantesData);
    } catch (error) {
      console.error("Error fetching postulantes:", error);
    }
  };

  useEffect(() => {

    fetchPostulantes();
  }, [asistencia]);

  const handlePreseleccionar = async (index) => {
    const updatedPostulantes = postulantes.map((postulante, i) => ({
      ...postulante,
      preseleccionar: i === index ? (postulante.preseleccionar === "Sí" ? "No" : "Sí") : postulante.preseleccionar
    }));

    setPostulantes(updatedPostulantes);

    try {
      const receivedApplicationId = updatedPostulantes[index].receivedApplicationId;
      const status = updatedPostulantes[index].preseleccionar === "Sí";
      await axios.patch(`${hostUrl}/received/updateReceivedApplication/${receivedApplicationId}`, { status });
      console.log("Estado actualizado exitosamente en la base de datos.");
    } catch (error) {
      console.error("Error actualizando el estado:", error);
    }
  };

  const handleCarnetClick = (carne) => {
    console.log(`Redirigir al perfil del estudiante con carnet: ${carne}`);
  };

  const handlePostulacionClick = (applicationId, receivedApplicationId) => { // Adjust this line
    setSelectedApplicationId(applicationId);
    setSelectedReceivedApplicationId(receivedApplicationId); // Add this line
  };

  const handleNombreClick = (carne) => {
    console.log(`Carnet del estudiante: ${carne}`);
  };

  const handleClosePopup = () => {
    refrescarAsistencias();
    setSelectedApplicationId(null);
    setSelectedReceivedApplicationId(null); // Add this line
  };

  return (
    <div>
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
                  <th>Carné</th>
                  <th>Preseleccionar</th>
                  <th>Postulaciones</th>
                </tr>
              </thead>
              <tbody>
                {postulantes.map((postulante, index) => (
                  <tr key={index}>
                    <td 
                      className="clickable"
                      onClick={() => handleNombreClick(postulante.carne)}
                    >
                      {postulante.nombre}
                    </td>
                    <td 
                      className="clickable" 
                      onClick={() => handleCarnetClick(postulante.carne)}
                    >
                      {postulante.carne}
                    </td>
                    <td>
                      {auth.roles?.includes(3123) ? ( // Si es Admin, solo mostrar el estado
                        <span>{postulante.preseleccionar}</span>
                      ) : ( // Si no es Admin, permitir edición
                        <input 
                          type="checkbox" 
                          checked={postulante.preseleccionar === "Sí"} 
                          onChange={() => handlePreseleccionar(index)} 
                        />
                      )}
                    </td>
                    <td 
                      className="clickable" 
                      onClick={() => handlePostulacionClick(postulante.applicationId, postulante.receivedApplicationId)} // Adjust this line
                    >
                      {/* {postulante.postulaciones} */}
                          Ver postulación
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedApplicationId && (
        <VisualizarInfo 
          asistencia={asistencia} 
          applicationId={selectedApplicationId} 
          receivedApplicationId={selectedReceivedApplicationId} // Add this line
          onClose={handleClosePopup} 
          refrescarPostulaciones = {fetchPostulantes}
          
        />
      )}
    </div>
  );
};

Preseleccionar.propTypes = {
  asistencia: PropTypes.shape({
    name: PropTypes.string.isRequired,
    semester: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    adminStatus: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Preseleccionar;
