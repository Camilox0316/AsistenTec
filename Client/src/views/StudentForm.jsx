import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import '../css modules/StudentForm.css';
import axios from 'axios';

import {useAuth } from '../hooks/useAuth';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { AssistanceInfoPopUp } from '../components/AssistanceInfoPopUp';

export const ApplyForm = () => { 
  const [scholarships, setScholarships] = useState(["Mauricio Campos", "Parcial", "Completa"]);
  const { courseCode } = useParams();
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [showPopUpAssistance, setShowPopUpAssistance] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const [courseDetails, setCourseDetails] = useState(null);
  const hostUrl = import.meta.env.VITE_HOST_URL;

  const [otherAssistance, setOtherAssistance] = useState(false);

  const handleOtherAssistanceChange = (event) => {
    setOtherAssistance(event.target.checked);
  };

  function capitalizeEachWord(str) {
    if (typeof str !== 'string') return ''; // Return an empty string or some default string if `str` is not a string
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
  
    // Gather the form data into an object
    const applicationData = {
      idAssistance: courseDetails._id, // Assuming you have the assistance ID in the courseDetails
      carnet: event.target.carnet.value,
      phoneNumber: event.target.phone.value,
      email: event.target.email.value,
      avgLastGrade: parseFloat(event.target.previousAverage.value),
      hours: selectedOption, // Assuming this corresponds to the hours in your schema
      scholarship: event.target.scholarship.value,
      bankAccount: event.target.accountNumber.value,
      otherAssistance: otherAssistance, // Assuming this field is a boolean
      otherDepartment: event.target.departmentNumber.value || "N/A",
      otherHours: parseFloat(event.target.requestedHours.value) || 0, // Make sure to parse string to number
      status: false // Assuming this should be set to false initially
    };
    
    console.log(applicationData);

    // You need to validate that email has the domain @estudiantec here
    if (!applicationData.email.endsWith('@estudiantec.cr')) {
      // Handle the error
      console.error("Invalid email domain. It must end with @estudiantec.");
      return;
    }
  
    try {
      // Make the API call to register the application
      const response = await axios.post(`${hostUrl}/application/create`, applicationData);
      // Handle the response, such as navigating to a thank-you page or displaying a success message
      console.log('Application submitted:', response.data);
      // navigate('/thank-you'); // Redirect to a thank-you page, for example
    } catch (error) {
      // Handle errors, such as displaying an error message to the user
      console.error("Error submitting application:", error);
    }
  };
  

  useEffect(() => {
    // Make sure you handle the courseCode accordingly if it's undefined or null
    if (courseCode) {
      const fetchCourseDetails = async () => {
        try {
          const response = await axios.get(`${hostUrl}/assistance/getAssistanceById/${courseCode}`);
          setCourseDetails(response.data);
          if (response.data) {
            setSelectedOption(capitalizeEachWord(response.data.assistanceType)); // Aquí se establece el estado inicial basado en los detalles del curso
          }
          // Handle the error, possibly navigate back or show an error message
        } catch (error) {
          console.error("Error fetching course details:", error);
          // Handle the error, possibly navigate back or show an error message
        }
      };

      fetchCourseDetails();
    }
  }, [courseCode, hostUrl]);


  

  if (!courseDetails) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  const handleQuestionClick = () => {
    setShowPopUpAssistance(true);
  };

  const handleQuestionClickClose = () => {
    setShowPopUpAssistance(false);
  };
  
  

  const options = ['Horas Asistente', 'Horas Estudiante', 'Asistencia Especial', 'Tutoría'];

  const handleSelection = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="request-form-container">
      <h2 className="form-title">Solicitud de {courseDetails.assistanceType == 'tutoría' ? "Tutoría" : "Asistencia"}</h2>
      <div className="course-info">
        <p className="course-name">Curso: {courseDetails.name}</p>
        <p className="professor-name">Profesor: {courseDetails.professorName}</p>
      </div>
      <form className="request-form" onSubmit={handleSubmit}>
        <div className="input-row">
          <label htmlFor="carnet">N° de carnet</label>
          <input type="text" id="carnet" name="carnet" required />

          <label htmlFor="idNumber">N° de cédula</label>
          <input type="text" id="idNumber" name="idNumber" required />
        </div>

        <div className="input-row">
          <label htmlFor="phone">N° de teléfono</label>
          <input type="text" id="phone" name="phone" required />

          <label htmlFor="email">Correo @estudiantec</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className="input-row">
          <label htmlFor="previousAverage">Promedio Semestre Anterior</label>
          <input type="number" id="previousAverage" name="previousAverage" step="0.01" min="0" max="100" />

          <label htmlFor="courseGrade">Nota del Curso</label>
          <input type="number" id="courseGrade" name="courseGrade" step="0.01" min="0" max="100" />

          <label htmlFor="scholarship">Beca</label>
          <select id="scholarship" name="scholarship">
          {scholarships.map(scholarship => (
            <option key={scholarship} value={scholarship}>
              {scholarship}
            </option>
          ))}
        </select>
        </div>

        <div className="input-row">
          <label htmlFor="accountNumber">Número de cuenta</label>
          <input type="text" id="accountNumber" name="accountNumber" />
          {/* Add the button to open the AssistanceInfoPopUp */}
          <div className="help-circle" type="button" onClick={handleOpenPopup}>
            <HelpOutlineIcon />
          </div>
        </div>
        
        {showPopup && <AssistanceInfoPopUp onClose={handleClosePopup} />}

        <div className="animated-selection-container">
          {options.map((option) => (
            <button
              key={option}
              className={`option-button ${selectedOption === option ? 'selected' : ''}`}
              onClick={() => handleSelection(option)}
              type="button"
            >
              {option}
            </button>
          ))}
          <div className="question-button-container">
            <button
              type = "button"
              className="question-button"
              onClick={handleQuestionClick}
            >
              <HelpOutlineIcon />
            </button>
          </div>
        </div>

        {showPopUpAssistance && (
        <AssistanceInfoPopUp onClose={handleQuestionClickClose} />
      )}

        <div className="input-row optional">
          <label htmlFor="otherSchool">¿Tiene asistencias en otra escuela o departamento?</label>
          <div className="toggle-switch">
          <input type="checkbox" id="otherSchool" name="otherSchool" onChange={handleOtherAssistanceChange} />
          <label htmlFor="otherSchool">Sí</label>
            <input type="checkbox" id="otherSchoolNo" name="otherSchool" />
            <label htmlFor="otherSchoolNo">No</label>
          </div>

          <label htmlFor="requestedHours">Horas Solicitadas</label>
          <input type="number" id="requestedHours" name="requestedHours" min="0" />

          <label htmlFor="departmentNumber">Nombre Departamento</label>
          <input type="text" id="departmentNumber" name="departmentNumber" />
        </div>

        <div className="submit-row">
          <button className= "apply-button" type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
}
