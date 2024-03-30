import React from 'react';
import {MyAssistanceCard} from '../components/MyAssistanceCard';

export const MyAssistancesPage = () => {
  const assistances = [
    {
      courseName: "Programación Orientada a Objetos",
      semester: "I Semestre 2023",
      type: "Tutorship",
      courseCode: "IC-2345"
    },
    // ...otros cursos
  ];

  return (
    <div className="my-assistances">
      <h2 className="section-title">Mis Asistencias</h2>
      {assistances.map((assistance, index) => (
        <MyAssistanceCard
          key={index}
          courseName={assistance.courseName}
          semester={assistance.semester}
          type={assistance.type}
          courseCode={assistance.courseCode}
        />
      ))}
    </div>
  );
};
