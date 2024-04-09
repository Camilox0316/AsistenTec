import React from 'react';
import BookIcon from '@mui/icons-material/Book'; // Icono para asistencia
import SchoolIcon from '@mui/icons-material/School'; // Icono para tutoría
import BlockIcon from '@mui/icons-material/Block';
import { Link } from 'react-router-dom';
import '../css modules/MyAssistanceCard.css'; // Asegúrate de que el archivo CSS está en la misma carpeta y de nombrarlo correctamente

export const MyAssistanceCard = ({ courseName, semester, type, courseCode }) => {
  // Función para obtener el ícono basado en el tipo de asistencia
  const getIcon = (type) => {
    switch (type) {
      case "horas asistente":
        return <BookIcon />;
      case "horas estudiante":
        return <BookIcon />;
      case "asistencia especial":
        return <BookIcon />;
      case "tutoría":
        return <SchoolIcon />;
      default:
        return <BlockIcon />; // O un ícono por defecto
    }
  };

  return (
    <div className="assistance-card">
      <div className="icon-circle">
        {getIcon(type)}
      </div>
      <div className="course-details">
        <h3>{courseName}</h3>
        <p>{semester}</p>
      </div>
      <Link to={`/assistance-details/${courseCode}`} className="details-link">Detalles</Link>
    </div>
  );
};
