import PropTypes from 'prop-types';
import libroIcon from '../../img/libro.png';
import "./Preseleccionar.css"; // Reuse the same CSS file
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

const Calificar = ({ asistencia, onClose }) => {
  const [postulantes, setPostulantes] = useState([]);
  const [isAdmin, setisAdmin] = useState(false);
  
  useEffect(() => {
    const fetchPostulantes = async () => {
      verificarSiEsAdmin();
      try {
        const response = await axios.get(`http://localhost:3000/received/receivedApplications/${asistencia._id}`);
        const receivedApplications = response.data;

        const postulantesData = await Promise.all(receivedApplications.map(async (application) => {
          if (application.selected) {
            const userResponse = await axios.get(`http://localhost:3000/user/getUserByIdAll/${application.idUser}`);
            const user = userResponse.data;

            return {
              nombre: `${user.name} ${user.lastName1} ${user.lastName2}`,
              calificacion: application.score,
              applicationId: application._id
            };
          } else {
            return null;
          }
        }));

        // Filter out null values
        setPostulantes(postulantesData.filter(postulante => postulante !== null));
      } catch (error) {
        console.error("Error fetching postulantes:", error);
      }
    };

    fetchPostulantes();
  }, [asistencia]);

  const {auth} = useAuth();

  const verificarSiEsAdmin = () => {
   
    if (auth?.roles?.find((role) => [3123].includes(role))) {
        setisAdmin(true);
     }
    else{
      setisAdmin(false);
    }
  }

  const handleCalificar = async (index, value) => {
    const updatedPostulantes = postulantes.map((postulante, i) => ({
      ...postulante,
      calificacion: i === index ? value : postulante.calificacion
    }));
    setPostulantes(updatedPostulantes);

    try {
      const applicationId = updatedPostulantes[index].applicationId;
      await axios.patch(`http://localhost:3000/received/updateReceivedApplication/${applicationId}`, { score: value });
      console.log("Score updated successfully in the database.");
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  const handleNombreClick = (nombre) => {
    console.log(`Nombre del estudiante: ${nombre}`);
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
                {!isAdmin && (
                <th>Calificar 0 - 5</th>)}
              </tr>
            </thead>
            <tbody>
              {postulantes.map((postulante, index) => (
                <tr key={index}>
                  <td 
                    className="clickable"
                    onClick={() => handleNombreClick(postulante.nombre)}
                  >
                    {postulante.nombre}
                  </td>
                  {!isAdmin && (
                  <td>
                    <select 
                      value={postulante.calificacion} 
                      onChange={(e) => handleCalificar(index, Number(e.target.value))} 
                      className="calificacion-select"
                    >
                      {[...Array(6).keys()].slice(1).map(value => (
                        <option key={value} value={value}>{value}</option>
                      ))}
                    </select>
                  </td>
                )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

Calificar.propTypes = {
  asistencia: PropTypes.shape({
    name: PropTypes.string.isRequired,
    semester: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    adminStatus: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Calificar;
