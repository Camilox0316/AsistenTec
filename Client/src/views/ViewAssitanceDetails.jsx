// AssistanceDetails.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { AssistanceInfoPopUp } from '../components/AssistanceInfoPopUp'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas

import Button from '@mui/material/Button';

import BookIcon from '@mui/icons-material/Book'; // Asumiendo que estás usando Material-UI para los íconos
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import '../css modules/AssitanceDetails.css'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas


export const ViewAssistanceDetails = () => {
    // Asumiendo que tendrás los datos disponibles aquí o los obtendrás de alguna API.
    // const { courseCode } = useParams();

    const applied = false  
    const terminated = true
    const status = 'pendiente'

    const courseDetails = {
      title: "Programación Orientada a Objetos",
      code: "IC-2345",
      professor: "Isabel Peterson",
      hours: 50,
      requirements: [
        "Ser estudiante activo del TEC",
        "Promedio Ponderado superior a 70",
        "Nota del curso igual o superior a 80"
      ],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra diam erat, quis laoreet libero mattis a. Cras ex ipsum, scelerisque id gravida in, luctus vel sapien."
    };

    // Agrega un estado para manejar la visibilidad del Popup
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleApply = () => {
      // Redirecciona al formulario con el código del curso
      navigate(`/form/${courseDetails.code}`);
  };

    // Función para abrir el Popup
    const handleOpenPopup = () => {
      setShowPopup(true);
    };

    // Función para cerrar el Popup
    const handleClosePopup = () => {
      setShowPopup(false);
    };

    const getStatusButton = () => {
      let color;
      switch (status) {
          case 'aceptado':
              color = 'green';
              break;
          case 'pendiente':
              color = 'yellow';
              break;
          case 'rechazado':
              color = 'red';
              break;
          default:
              color = 'grey'; // Un color por defecto en caso de que no se reconozca el estado
      }
      if (applied) {
        return <Button variant="contained" style={{ backgroundColor: color, color: 'black' }}>Estado: {status.charAt(0).toUpperCase() + status.slice(1)}</Button>;
      } 
    };
  
    return (
      <div className="assistance-details">
      <div className="assistance-header">
        <div className="assistance-title">
          {courseDetails.title}
          <div className="icon-circle"><BookIcon style={{ fontSize: '8.5rem'}} /></div>
        </div>
        <div className="help-circle" onClick={handleOpenPopup}>
          <HelpOutlineIcon />
        </div>
        {showPopup && <AssistanceInfoPopUp onClose={handleClosePopup} />}
      </div>
      <div className="assistance-body">
          <div className="course-info">
            <p className="course-info__item"><strong>Código de curso:</strong> {courseDetails.code}</p>
          </div>
          <div className="course-info">
            <p className="course-info__item"><strong>Profesor de curso:</strong> {courseDetails.professor}</p>
          </div>
          <div className="course-info">
            <p className="course-info__item"><strong>Horas:</strong> {courseDetails.hours}</p>
          </div>
          <div className="requirements">
            <p><strong>Requisitos:</strong></p>
            <ul>
              {courseDetails.requirements.map(req => <li key={req}>{req}</li>)}
            </ul>
          </div>
          <div className="description">
            <p><strong>Descripción:</strong></p>
            <p>{courseDetails.description}</p>
          </div>
          <div className="actions">
                {!terminated && applied && (
                    <Button variant="contained" color="error" style={{ marginRight: '10px' }}>
                        Retirar
                    </Button>
                )}
                {!applied && (
                    <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={handleApply}>
                        Aplicar
                    </Button>
                )}
                {getStatusButton()}
            </div>
        </div>
      </div>
    );
  };
