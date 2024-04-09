import React from 'react';

import CloseIcon from '@mui/icons-material/Close'; // Importa el ícono de cerrar
import '../css modules/PopupInfo.css'; // Asegúrate de que el archivo CSS está en la misma carpeta y de nombrarlo correctamente

export const AssistanceInfoPopUp = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content bg-gray-800 text-white p-5 rounded-md">
        <h2 className="text-lg font-bold mb-3 text-center">Detalles Asistencia</h2>
        <ul>
          <li>•	Tenga presente que usted deberá ser informado por la Escuela, Departamento o Dependencia de su nombramiento de asistencia.</li>
          <li>•	Si usted realizó solicitudes en más de una Escuela o Dependencia, tan pronto sea ratificado su nombramiento, deberá presentar de manera inmediata su renuncia en las otras instancias, si no desea tener otro nombramiento.</li>
          <li>•	Debe tener presente que el mínimo de horas requeridos para cubrir derechos de estudio (para HA, HE y TU) es de 50, y el máximo permitido por estudiante de 160 horas. </li>
          <li>•	Si usted es tutor por primera vez, deberá asistir a la reunión de inducción para tutores nuevos, puede consultar las fechas en el Departamento de Orientación y Psicología (DOP).</li>
          <li>•	Las Escuelas, Departamentos o Dependencias, No se recibirán boletas con información incompleta.</li>
          <li>•	Si usted desea completar la solicitud y no cumple con todos los requisitos debe saber que sólo será tomado en cuenta si no existen más oferentes que cumplan con los requisitos. Además, no podrá iniciar sus labores hasta conocer si contará con la aprobación del Comité de Becas. </li>
        </ul>
        <button className="close-btn" onClick={onClose}>
          <CloseIcon /> {/* Renderiza el ícono de cerrar */}
        </button>
      </div>
    </div>
  );
};

