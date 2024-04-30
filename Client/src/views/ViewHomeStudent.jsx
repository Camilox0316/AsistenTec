import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import { AvailableAssistance } from "../components/AvailableAssistance";
import '../css modules/AvailableAssistance.css'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas
import { useAuth } from "../hooks/useAuth";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export function ViewHomeStudent() {

  const [assistances, setAssistances] = useState([]);
  const [tutorings, setTutorings] = useState([]);

  const hostUrl = import.meta.env.VITE_HOST_URL || 'http://localhost:3000';
  console.log("varaible de entorno",hostUrl)

  const [isLoading, setIsLoading] = useState(true);
  
  const {auth} = useAuth();

  useEffect(() => {
    const fetchTutorings = async () => {
      const response = await axios.get(`${hostUrl}/assistance/getAllAssistances`);

      setAssistances(response.data);

    };

    const fetchAssistances = async () => {
      const response = await axios.get(`${hostUrl}/assistance/getTutoring`);
      setTutorings(response.data);

    };

    fetchAssistances();
    fetchTutorings();
  }, [hostUrl]);

  function capitalizeEachWord(str) {
    if (typeof str !== 'string') return ''; // Return an empty string or some default string if `str` is not a string
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  const assistanceScrollRef = useRef(null);
  const tutoringsScrollRef = useRef(null);

  const scroll = (ref, direction) => {
    const scrollAmount = ref.current.offsetWidth; // Adjust this value if needed
    if (direction === 'left') {
      ref.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="view-home-student-container">
    <h2 className="section-title">Asistencias</h2>
    <div className="carousel-container">
      <div className="assistance-container" ref={assistanceScrollRef}>
        {assistances  
        .filter(assistance => assistance.adminStatus === "aceptado")
        .map(assistance => (
        <AvailableAssistance
          id={assistance._id}
          title={assistance.name}
          semester={`Semestre ${assistance.semester}`}
          professor={assistance.professorName} // Make sure to adjust this to display the professor's name correctly
          type={capitalizeEachWord(assistance.assistanceType)}
          status={"Disponible"}
          superType="Assistance"
          courseCode={assistance.courseCode}
          auth={auth}
        />
      ))}
    </div>
      <div className="carousel-controls">
        <ChevronLeftIcon onClick={() => scroll(assistanceScrollRef, 'left')} />
        <ChevronRightIcon onClick={() => scroll(assistanceScrollRef, 'right')} />
      </div>
    </div>

    <h2 className="section-title">Tutorías</h2>
    <div className="carousel-container">
      <div className="tutorship-container" ref={tutoringsScrollRef}>
        {tutorings        
        .filter(tutoring => tutoring.adminStatus === "aceptado")
        .map(tutoring => (
        <AvailableAssistance
          id={tutoring._id}
          title={tutoring.name}
          semester={`Semestre ${tutoring.semester}`}
          professor={tutoring.professorName} // Adjust as needed
          type={capitalizeEachWord(tutoring.assistanceType)}
          status={tutoring.adminStatus === "aceptado" ? "Disponible" : tutoring.adminStatus.charAt(0).toUpperCase() + tutoring.adminStatus.slice(1)}
          superType="Tutorship"
          courseCode={tutoring.courseCode}
          auth={auth}
        />
      ))}
    </div>
      <div className="carousel-controls">
        <ChevronLeftIcon onClick={() => scroll(tutoringsScrollRef, 'left')} />
        <ChevronRightIcon onClick={() => scroll(tutoringsScrollRef, 'right')} />
      </div>
    </div>
  </div>
  );
}
