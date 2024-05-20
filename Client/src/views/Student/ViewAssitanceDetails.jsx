// AssistanceDetails.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { AssistanceInfoPopUp } from '../../components/AssistanceInfoPopUp';

import Button from '@mui/material/Button';

import BookIcon from '@mui/icons-material/Book';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import '../../css modules/AssitanceDetails.css';

export const ViewAssistanceDetails = () => {
    const { auth } = useAuth();
    const [courseDetails, setCourseDetails] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const { courseCode } = useParams();
    const hostUrl = import.meta.env.VITE_HOST_URL;
    const [assistanceStatus, setAssistanceStatus] = useState(false);

    useEffect(() => {
      if (courseCode) {
        const fetchCourseDetails = async () => {
          try {
            const response = await axios.get(`${hostUrl}/assistance/getAssistanceById/${courseCode}`);
            setCourseDetails(response.data);
          } catch (error) {
            console.error("Error fetching course details:", error);
          }
        };

        const fetchAssistanceStatus = async () => {
          try {
            const response = await axios.get(`${hostUrl}/received/getAssistanceStatus/${courseCode}/${auth.id}`);
            setAssistanceStatus(response.data.hasApplied);
          } catch (error) {
            console.error("Error fetching assistance status:", error);
          }
        };

        fetchCourseDetails();
        fetchAssistanceStatus();
      }
    }, [courseCode, hostUrl, auth.id]);

    if (!courseDetails) {
      return <div>Loading...</div>;
    }

    const applied = assistanceStatus;
    const terminated = courseDetails.studentStatus !== 'pendiente';
    const status = courseDetails.studentStatus;

    const handleApply = () => {
      navigate(`/form/${courseCode}`);
    };

    const handleRemove = async () => {
      const confirmRemove = window.confirm("Are you sure you want to remove your application?");
      if (confirmRemove) {
        try {
          const response = await axios.delete(`${hostUrl}/received/removeApplication/${courseDetails._id}/${auth.id}`);
          if (response.status === 200) {
            navigate('/my-assists');
            alert('Application removed successfully');
          }
        } catch (error) {
          console.error("Error removing application:", error);
          alert('Failed to remove application');
        }
      }
    };

    const handleOpenPopup = () => {
      setShowPopup(true);
    };

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
          color = 'grey';
      }
      if (applied) {
        return <Button variant="contained" style={{ backgroundColor: color, color: 'black' }}>Estado: {status.charAt(0).toUpperCase() + status.slice(1)}</Button>;
      }
    };

    const getRequirements = () => {
      switch (courseDetails.assistanceType) {
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
        case 'tutoría':
          return [
            "Ser estudiante activo del TEC",
            "Tener un rendimiento académico no inferior a 70 en el último semestre cursado.",
            "Haber obtenido una nota superior o igual a 80 en el curso en que se nombra tutor."
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
            <div className="icon-circle"><BookIcon style={{ fontSize: '8.5rem' }} /></div>
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
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
          <div className="actions">
            {!terminated && applied && (
              <Button variant="contained" color="error" style={{ marginRight: '10px' }} onClick={handleRemove}>
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
