// AssistanceDetails.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { AssistanceInfoPopUp } from '../../components/AssistanceInfoPopUp'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas

import Button from '@mui/material/Button';

import BookIcon from '@mui/icons-material/Book'; // Asumiendo que estás usando Material-UI para los íconos
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import '../../css modules/AssitanceDetails.css'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas


export const ViewAssistanceDetails = () => {
    // Asumiendo que tendrás los datos disponibles aquí o los obtendrás de alguna API.
    // const { courseCode } = useParams();
    const {auth} = useAuth();

    const [courseDetails, setCourseDetails] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const { courseCode } = useParams();
    const hostUrl = import.meta.env.VITE_HOST_URL;
    const [assistanceStatus, setAssistanceStatus] = useState(false);

    useEffect(() => {
      // Make sure you handle the courseCode accordingly if it's undefined or null
      if (courseCode) {
        const fetchCourseDetails = async () => {
          try {
            const response = await axios.get(`${hostUrl}/assistance/getAssistanceById/${courseCode}`);
            setCourseDetails(response.data);
          } catch (error) {
            console.error("Error fetching course details:", error);
            // Handle the error, possibly navigate back or show an error message
          }
        };

        const fetchAssistanceStatus = async () => {
          try {
            const response = await axios.get(`${hostUrl}/received/getAssistanceStatus/${courseDetails._id}/${auth.id}`);
            setAssistanceStatus(response.data.hasApplied);
          } catch (error) {
            console.error("Error fetching course details:", error);
            // Handle the error, possibly navigate back or show an error message
          }
        };
        fetchAssistanceStatus();
        fetchCourseDetails();
      }
    }, [courseCode, hostUrl, auth, courseDetails]);

    if (!courseDetails) {
      return <div>Loading...</div>; // Or some loading spinner
    }

    const applied = assistanceStatus  
    const terminated = courseDetails.studentStatus !== 'pendiente'
    const status = courseDetails.studentStatus

    const handleApply = () => {
      // Redirecciona al formulario con el código del curso
      navigate(`/form/${courseCode}`);
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

    const getRequirements = () => {
      switch(courseDetails.assistanceType) {
        case 'horas estudiante':
            return [
                "Ser estudiante activo del TEC",
                "Promedio ponderado igual o superior a 70 en el último semestre cursado"
            ];
        case 'horas asistente':
            return [
                "Ser estudiante activo del TEC",
                "Promedio ponderado igual o superior a 70 en el último semestre cursado.",
                "Nota igual o superior a 80 en el curso de asistencia."
            ];
        case 'asistencia especial':
          return [  
            "Tener un año de ser un estudiante activo del TEC y haber aprobado 25 créditos.",
            "Aprobar 12 créditos en el último semestre cursado."
          ];
        case 'tutoría' :
          return [
            "Ser estudiante activo del TEC",
            "Tener un rendimiento académico no inferior a 70 en el último semestre cursado.",
            "Haber obtenido una nota superior o igual a 80 en el curso en que se nombra tutor. "
          ];
        default:
            return [];
      }
    };

    return (
      <div className="assistance-details">
      <div className="assistance-header">
        <div className="assistance-title">
          {courseDetails.name}
          <div className="icon-circle"><BookIcon style={{ fontSize: '8.5rem'}} /></div>
        </div>
        <div className="help-circle" onClick={handleOpenPopup}>
          <HelpOutlineIcon />
        </div>
        {showPopup && <AssistanceInfoPopUp onClose={handleClosePopup} />}
      </div>
      <div className="assistance-body">
          <div className="course-info">
            <p className="course-info__item"><strong>Código de curso:</strong> {courseDetails.courseCode}</p>
          </div>
          <div className="course-info">
            <p className="course-info__item"><strong>Profesor de curso:</strong> {courseDetails.professorName}</p>
          </div>
          <div className="course-info">
            <p className="course-info__item"><strong>Horas:</strong> {courseDetails.hours}</p>
          </div>
          <div className="requirements">
            <p><strong>Requisitos:</strong></p>
            <ul>
              {getRequirements().map((req, index) => (
                <li key={index}>{req}</li> // Continúa usando el índice como clave para elementos de lista simples
              ))}
            </ul>
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
