import React, { useState } from 'react';
import '../css modules/StudentForm.css';

export const ApplyForm = ({ courseName, professorName, requestType }) => { 
  const [scholarships, setScholarships] = useState(["Ninguna", "Parcial", "Completa"]);
  
  return (
    <div className="request-form-container">
      <h2 className="form-title">Solicitud de {requestType}</h2>
      <div className="course-info">
        <p className="course-name">Curso: {courseName}</p>
        <p className="professor-name">Profesor: {professorName}</p>
      </div>
      <form className="request-form">
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
            {scholarships.map(scholarship => <option value={scholarship}>{scholarship}</option>)}
          </select>
        </div>

        <div className="input-row">
          <label htmlFor="accountNumber">Número de cuenta</label>
          <input type="text" id="accountNumber" name="accountNumber" />
        </div>

        <div className="input-row optional">
          <label htmlFor="otherSchool">¿Tiene asistencias en otra escuela o departamento?</label>
          <div className="toggle-switch">
            <input type="checkbox" id="otherSchool" name="otherSchool" />
            <label htmlFor="otherSchool">Sí</label>
            <input type="checkbox" id="otherSchoolNo" name="otherSchool" />
            <label htmlFor="otherSchoolNo">No</label>
          </div>

          <label htmlFor="requestedHours">Horas Solicitadas</label>
          <input type="number" id="requestedHours" name="requestedHours" min="0" />

          <label htmlFor="departmentNumber">Número Departamento</label>
          <input type="text" id="departmentNumber" name="departmentNumber" />
        </div>

        <div className="submit-row">
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
}
