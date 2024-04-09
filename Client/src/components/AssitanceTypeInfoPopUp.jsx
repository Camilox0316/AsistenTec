import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import '../css modules/PopupInfo.css'; // Make sure the path is correct

export const AssistanceTypeInfoPopUp = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content bg-gray-800 text-white p-5 rounded-md">
        <h2 className="text-lg font-bold mb-3 text-center">Requisitos y Beneficios</h2>
        <table className="requirements-table">
          <thead>
            <tr>
              <th>Tipo Asistencia</th>
              <th>Requisitos</th>
              <th>Beneficio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Horas Estudiante (HE)</td>
              <td>Promedioponderado igual o superior a 70 en el último semestre cursado</td>
              <td>Exoneración total del pago de derechos de estudio</td>
            </tr>
            <tr>
              <td>Horas Asistente (HA)</td>
              <td>Promedio ponderado igual o superior a 70 en el último semestre cursado. Nota igual o superior a 80 en el curso de asistencia.</td>
              <td>Exoneración total del pago de derechos de estudio. Remuneración económica de ₡450 por hora realizada al finalizar el semestre.</td>
            </tr>
            <tr>
              <td>Horas Especial (EA)</td>
              <td>Tener un año de ser un estudiante activo del TEC y haber aprobado 25 créditos. Aprobar 12 créditos en el último semestre cursado.</td>
              <td>Un pago mensual, acorde con la cantidad de horas realizadas por estudio en las aéreas de construcción pago mensual, acorde con la cantidad de horas no cubre el pago derechos de matrícula y otros.</td>
            </tr>
            <tr>
              <td>Tutoría (TU)</td>
              <td>Tener un semestre de ser estudiante activo del TEC. Tener un rendimiento académico no inferior a 70 en el último semestre cursado. Haber obtenido una nota superior o igual a 80 en el curso en que se nombra tutor.</td>
              <td>Exoneración total del pago de derechos de estudio. Remuneración económica de ₡900 por hora realizada al finalizar el semestre.</td>
            </tr>
          </tbody>
        </table>
        <button className="close-btn" onClick={onClose}>
          <CloseIcon /> {/* Renderiza el ícono de cerrar */}
        </button>
      </div>
    </div>
  );
};
