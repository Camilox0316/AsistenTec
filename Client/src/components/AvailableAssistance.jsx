import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import BookIcon from '@mui/icons-material/Book';
import SchoolIcon from '@mui/icons-material/School';
import BlockIcon from '@mui/icons-material/Block';
import '../css modules/AvailableAssistance.css'; // Asegúrate de que la ruta del CSS es correcta

export const AvailableAssistance = ({ title, semester, professor, type, status, superType, courseCode }) => {

  const navigate = useNavigate();

  const iconStyle = {
    fontSize: '50px', // Ajusta el tamaño del ícono aquí
    color: '#4f46e5', // Ajusta el color del ícono aquí
  };

  const handleViewDetails = () => {
    navigate(`/assistance-details/${courseCode}`); // Cambia a la ruta de detalles con el código del curso
  };

  const getIcon = (superType) => {
    switch (superType) {
      case 'Assistance':
        return <BookIcon style={iconStyle} />;
      case 'Tutorship':
        return <SchoolIcon style={iconStyle} />;
      default:
        return <BlockIcon style={iconStyle} />;
    }
  };

  return (
    <div className="cointainerStyle">
        <div className="min-w-[420px] max-h-72 h-full p-6 bg-white border border-gray-200 rounded-lg shadow">
        <div className="flex justify-between items-center">
            <div className="icon-container flex items-center place-content-center h-20 w-20 rounded-full bg-indigo-100">
            {getIcon(superType)}
            </div>
            <div className="card-header text-center">
            <div>{title}</div>
            <div>{semester}</div>
            </div>
        </div>
        <div className="card-body mt-4">
            <div className="professor">Profesor: {professor}</div>
            <div className="type">Tipo: {type}</div>
            <div className={`status ${status.toLowerCase()}`}>Estatus: {status}</div>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleViewDetails} // Cambia el Link por un botón con evento onClick
            className="max-h-[36px] inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-indigo-400 rounded-lg hover:bg-indigo-800 hover:text-white"
          >
            Ver
        </button>
        </div>
        </div>
    </div>
  );
};