import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Icons @mui
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EditIcon from '@mui/icons-material/Edit';

import axiosInstance from "../api/axios";
import axios from 'axios'

import '../css modules/Profile.css';

export const Profile = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { auth: activeUser } = useAuth(); // Destructure user from the auth object, if that's how your hook is structured.
  
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate('/edit-profile'); // Use the correct path for your edit profile page
  };

  const hostUrl = import.meta.env.VITE_HOST_URL;
  const [user, setUser] = useState("");
  const iconSize = isSmallScreen ? '200px' : '200px'; // Adjust size for different screens
  const photoUrl = activeUser?.photo ? `${axiosInstance.defaults.baseURL}${activeUser.photo}` : "";


  //Calcular nota calificacion
  const rating = 3.7;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 > 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  //Tabla
  const assistanceData = [
    { type: 'Asistente', name: 'Bases de Datos II', score: 100, year: 2023 },
    { type: 'Asistente', name: 'Poo', score: 95, year: 2023 }
  ];

  const description = "Estudiante de Ingeniería en Computación, me gusta la programación y el desarrollo de software. asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdas";

  useEffect(() => {
    try{
        const fetchUser = async () => {
            const response = await axios.get(`${hostUrl}/user/getUserByIdAll/${activeUser.id}`)
            setUser(response.data)
        }
        fetchUser();
    }catch(error){
        console.error("Error fetching user:", error);
    }
  });

  return (
    <div style={{
      display: 'flex', // This will apply flexbox
      flexDirection: 'column', // Stack children vertically
      alignItems: 'center', // Center children horizontally
      justifyContent: 'center', // Center children vertically
      padding: '20px',
      height: '100vh' // Use full screen height to center vertically on the whole page
    }}>
      {activeUser?.photo ? (
        <img 
          src={photoUrl} 
          alt={`${activeUser.name}'s profile`} 
          style={{ width: iconSize, height: iconSize, borderRadius: '50%' }} 
        />
      ) : (
        <AccountCircleIcon style={{ fontSize: iconSize, color: 'lightblue' }} />
      )}
      <h1 style={{ margin: '10px 0', fontWeight:'bold', fontSize:35 }}>{activeUser?.name}</h1>
      <p style={{ margin: '5px 0', fontSize:25 }}>{activeUser?.email}</p>
      <p style={{ margin: '5px 0', fontSize:30 }}>{user?.carnet}</p>

      <div className="profile-section">
        <div className="rating-container">
            {[...Array(fullStars)].map((_, index) => (
            <StarIcon className="star" style={{fontSize:'64px'}} key={index} />
            ))}
            {halfStar === 1 && <StarHalfIcon className="star" style={{fontSize:'64px'}}/>}
            {[...Array(emptyStars)].map((_, index) => (
            <StarBorderIcon className="star" key={index} style={{fontSize:'64px'}} />
            ))}
        </div>
        <div className="description-title">Descripción</div>
        <div className="description-text">{description}</div>
        </div>
        <div className="description-title">Asistencias y Tutorías</div>

        <div className="profile-table-container">
        <table className="profile-table">
            <thead>
            <tr>
                <th>Tipo</th>
                <th>Nombre</th>
                <th>Calificación</th>
                <th>Año</th>
            </tr>
            </thead>
            <tbody>
            {assistanceData.map((row, index) => (
                <tr key={index}>
                <td>{row.type}</td>
                <td>{row.name}</td>
                <td>{row.score}</td>
                <td>{row.year}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
            <EditIcon onClick={handleEditClick} style={{ cursor: 'pointer', color: '#101828', fontSize:'4rem' }} />
        </div>
    </div>
  );
};

export default Profile;
