import React from 'react';

import CloseIcon from '@mui/icons-material/Close'; // Importa el ícono de cerrar
import '../css modules/PopupInfo.css'; // Asegúrate de que el archivo CSS está en la misma carpeta y de nombrarlo correctamente

export const AssistanceInfoPopUp = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content bg-gray-800 text-white p-5 rounded-md">
        <h2 className="text-lg font-bold mb-3 text-center">Detalles Asistencia</h2>
        <p>Tenga presente que usted deberá ser informado por la Escuela,Departamento o Dependencia de su nombramiento de asistencia.</p>
        <button className="close-btn" onClick={onClose}>
          <CloseIcon /> {/* Renderiza el ícono de cerrar */}
        </button>
      </div>
    </div>
  );
};

