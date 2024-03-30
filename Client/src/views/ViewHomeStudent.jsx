import React from "react";
import { AvailableAssistance } from "../components/AvailableAssistance";
import '../css modules/AvailableAssistance.css'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas

export function ViewHomeStudent() {
  return (
    <div className="view-home-student-container">
      <h2 className="section-title">Asistencias</h2>
      <div className="assistance-container">
        <AvailableAssistance
          title="POO GR 2"
          semester="I Semestre 2022"
          professor="Mario Barboza Artavia"
          type="Horas Estudiante"
          status="Disponible"
          superType="Assistance"
          courseCode="IC-8712"
        />
        <AvailableAssistance
          title="Calculo Dif GR 1"
          semester="I Semestre 2022"
          professor="Laura Ramirez"
          type="Horas Asistente"
          status="Disponible"
          superType="Assistance"
          courseCode="IC-8712"
        />
      </div>

      <h2 className="section-title">Tutorías</h2>
      <div className="tutorship-container">
        <AvailableAssistance
          title="Algebra Lineal GR 4"
          semester="II Semestre 2022"
          professor="Pedro Mendez"
          type="Horas Tutoría"
          status="Disponible"
          superType="Tutorship"
          courseCode="IC-8712"
        />
        <AvailableAssistance
          title="Programación GR 3"
          semester="II Semestre 2022"
          professor="Ana Castillo"
          type="Horas Tutoría"
          status="Disponible"
          superType="Tutorship"
          courseCode="IC-8712"
        />
      </div>
    </div>
  );
}
