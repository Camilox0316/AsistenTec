import React, { useEffect, useState } from "react";
import axios from "axios";

import { AvailableAssistance } from "../components/AvailableAssistance";
import '../css modules/AvailableAssistance.css'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas

export function ViewHomeStudent() {

  const [assistances, setAssistances] = useState([]);
  const [tutorings, setTutorings] = useState([]);

  const hostUrl = import.meta.env.VITE_HOST_URL;

  useEffect(() => {
    const fetchAssistances = async () => {
      const response = await axios.get(`${hostUrl}/assistance/getAssistances`);
      setAssistances(response.data); // Asumiendo que la respuesta es un array de asistencias
    };

    const fetchTutorings = async () => {
      const response = await axios.get(`${hostUrl}/assistance/getTutoring`);
      setTutorings(response.data); // Asumiendo que la respuesta es un array de tutorías
    };

    fetchAssistances();
    fetchTutorings();
  }, [hostUrl]);

  return (
    <div className="view-home-student-container">
      <h2 className="section-title">Asistencias</h2>
      <div className="assistance-container">
        {assistances.slice(0, 2).map(assistance => (
          <AvailableAssistance
            key={assistance._id} // Asume que cada asistencia tiene un 'id' único
            title={assistance.name}
            semester={assistance.semester}
            professor={assistance.professor}
            type={assistance.type}
            status={assistance.status}
            superType="Assistance"
            courseCode={assistance.courseCode}
          />
        ))}
      </div>

      <h2 className="section-title">Tutorías</h2>
      <div className="tutorship-container">
        {tutorings.slice(0, 2).map(tutoring => (
          <AvailableAssistance
            key={tutoring._id} // Asume que cada tutoría tiene un 'id' único
            title={tutoring.title}
            semester={tutoring.semester}
            professor={tutoring.professor}
            type={tutoring.type}
            status={tutoring.status}
            superType="Tutorship"
            courseCode={tutoring.courseCode}
          />
        ))}
      </div>
    </div>
  );
}
