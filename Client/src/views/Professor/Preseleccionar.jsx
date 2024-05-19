import PropTypes from 'prop-types';
import libroIcon from '../../img/libro.png';
import "./Preseleccionar.css";
import { useState } from 'react';

const Preseleccionar = ({ asistencia, onClose }) => {
  // JSON de ejemplo incluido directamente en el componente
  const [postulantes, setPostulantes] = useState([
    { nombre: "Mario Barboza", carne: "2021075241", preseleccionar: "Sí", postulaciones: "Postulación" },
    { nombre: "Sebastian Chavez", carne: "2021075242", preseleccionar: "No", postulaciones: "Postulación" },
    { nombre: "Camilo Sanchez", carne: "2021075243", preseleccionar: "No", postulaciones: "Postulación" }
  ]);

  const handlePreseleccionar = (index) => {
    const updatedPostulantes = postulantes.map((postulante, i) => ({
      ...postulante,
      preseleccionar: i === index ? "Sí" : "No"
    }));
    setPostulantes(updatedPostulantes);
  };

  const handleCarnetClick = (carne) => {
    // Redirigir al perfil del estudiante
    console.log(`Redirigir al perfil del estudiante con carnet: ${carne}`);
  };

  const handlePostulacionClick = (postulacion) => {
    // Mostrar la postulación del estudiante
    console.log(`Mostrar la postulación del estudiante: ${postulacion}`);
  };

  const handleNombreClick = (carne) => {
    // Imprimir el carnet del estudiante
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
                      type="radio" 
                      name="preseleccionar" 
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
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Preseleccionar;
