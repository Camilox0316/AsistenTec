import PropTypes from 'prop-types';
import libroIcon from '../../img/libro.png';
import "./Preseleccionar.css";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Preseleccionar = ({ asistencia, onClose }) => {
  const [postulantes, setPostulantes] = useState([]);

  useEffect(() => {
    const fetchPostulantes = async () => {
      try {
        const receivedApplicationsResponse = await axios.get(`http://localhost:3000/received/receivedApplications/${asistencia._id}`);
        const receivedApplications = receivedApplicationsResponse.data;

        const postulantesData = await Promise.all(receivedApplications.map(async (application) => {
          const userResponse = await axios.get(`http://localhost:3000/user/getUserByIdAll/${application.idUser}`);
          const user = userResponse.data;

          return {
            nombre: `${user.name} ${user.lastName1} ${user.lastName2}`,
            carne: user.carnet,
            preseleccionar: application.status ? "Sí" : "No",
            postulaciones: application.idApplication,
            applicationId: application._id
          };
        }));

        setPostulantes(postulantesData);
      } catch (error) {
        console.error("Error fetching postulantes:", error);
      }
    };

    fetchPostulantes();
  }, [asistencia]);

  const handlePreseleccionar = async (index) => {
    const updatedPostulantes = postulantes.map((postulante, i) => ({
      ...postulante,
      preseleccionar: i === index ? (postulante.preseleccionar === "Sí" ? "No" : "Sí") : postulante.preseleccionar
    }));

    setPostulantes(updatedPostulantes);

    try {
      const applicationId = updatedPostulantes[index].applicationId;
      const status = updatedPostulantes[index].preseleccionar === "Sí";
      await axios.patch(`http://localhost:3000/received/updateReceivedApplication/${applicationId}`, { status });
      console.log("Estado actualizado exitosamente en la base de datos.");
    } catch (error) {
      console.error("Error actualizando el estado:", error);
    }
  };

  const handleCarnetClick = (carne) => {
    console.log(`Redirigir al perfil del estudiante con carnet: ${carne}`);
  };

  const handlePostulacionClick = (postulacion) => {
    console.log(`Mostrar la postulación del estudiante: ${postulacion}`);
  };

  const handleNombreClick = (carne) => {
    console.log(`Carnet del estudiante: ${carne}`);
  };

  return (
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
                    <input 
                      type="checkbox" 
                      checked={postulante.preseleccionar === "Sí"} 
                      onChange={() => handlePreseleccionar(index)} 
                    />
                  </td>
                  <td 
                    className="clickable" 
                    onClick={() => handlePostulacionClick(postulante.postulaciones)}
                  >
                    {postulante.postulaciones}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
