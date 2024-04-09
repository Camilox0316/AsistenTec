import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import '../css modules/Consent.css'; // Update with the correct path to your CSS file

export const ConsentPopUp = ({ onClose }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = () => {
    if (isChecked) {
      // Handle the submission logic here
      console.log('Consent given.');
      onClose(); // Close the popup after submission
    } else {
      // Handle the case when checkbox is not checked
      console.log('Please accept the conditions.');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>CONSENTIMIENTO INFORMADO</h2>
        <p>Yo en mi calidad de persona solicitante ante el Sistema de Becas Estudiantiles del Instituto Tecnológico de Costa Rica (ITCR), declaro que la información suministrada es veraz, exacta, actualizada y proporcionada libremente. En caso de corroborarse lo contrario, se me aplicará lo estipulado en el Artículo No. 9 del Reglamento de Becas y Préstamos Estudiantiles del Instituto Tecnológico de Costa Rica y sus reformas, el cual estipula que: “Las y los estudiantes que en su solicitud de beca indiquen datos falsos, ocultaren información o notificaren a su debido tiempo las mejoras ocurridas en su situación socioeconómica, perderán todo derecho a los beneficios estipulados en este Reglamento, durante los tres años lectivos consecutivos siguientes al de la comprobación de cualquiera de esos hechos." Además, deberán reintegrar al Instituto lo que se les hubiera concedido según disponga el Departamento Financiero Contable.</p>
        
        <div className="consent-checkbox">
          <input 
            type="checkbox" 
            id="consent" 
            checked={isChecked} 
            onChange={handleCheckboxChange} 
          />
          <label htmlFor="consent">Acepto Condiciones</label>
        </div>

        <button onClick={handleSubmit} disabled={!isChecked}>
          Enviar
        </button>

        <button className="close-btn" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
