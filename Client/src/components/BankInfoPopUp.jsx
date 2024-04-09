import React from 'react';

import CloseIcon from '@mui/icons-material/Close'; // Importa el ícono de cerrar
import '../css modules/PopupInfo.css'; // Asegúrate de que el archivo CSS está en la misma carpeta y de nombrarlo correctamente

export const BankInfoPopUp = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content bg-gray-800 text-white p-5 rounded-md">
        <h2 className="text-lg font-bold mb-3 text-center">Detalles Cuenta Bancaria</h2>
        <ul>
          <li>•	Todo estudiante que realiza una asistencia debe tener una cuentabancaria activa en colones y a nombre del asistente.</li>
          <li>•	Solamente se pueden anotar las cuentas con los prefijos indicados. Lacuenta se digita sin guiones ni espacios.
              Banco Nacional: 200012450075550 </li>
          </ul>
        <button className="close-btn" onClick={onClose}>
          <CloseIcon /> {/* Renderiza el ícono de cerrar */}
        </button>
      </div>
    </div>
  );
};

