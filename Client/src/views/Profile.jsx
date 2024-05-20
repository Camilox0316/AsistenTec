import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons @mui
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
  const { auth: activeUser } = useAuth();
  
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate('/edit-profile');
  };

  const hostUrl = import.meta.env.VITE_HOST_URL;
  const [user, setUser] = useState("");
  const iconSize = isSmallScreen ? '200px' : '200px';

  // Calcular nota calificación
  const rating = 3.7;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 > 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  // Tabla
  const [assistanceData, setAssistanceData] = useState([]);
  
  useEffect(() => {
    const fetchUserAndAssistances = async () => {
      try {
        const userResponse = await axios.get(`${hostUrl}/user/getUserByIdAll/${activeUser.id}`);
        setUser(userResponse.data);

        const assistanceResponse = await axios.get(`${hostUrl}/received/getStudentAssistances/${activeUser.id}`);
        setAssistanceData(assistanceResponse.data);
      } catch (error) {
        console.error("Error fetching user or assistances:", error);
      }
    };

    fetchUserAndAssistances();
  }, [activeUser.id, hostUrl]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  const photoUrl = user?.photo ? `${axiosInstance.defaults.baseURL}${user.photo}` : "";
  console.log(assistanceData);
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      height: '100vh'
    }}>
      {user?.photo ? (
        <img 
          src={photoUrl} 
          alt={`${user.name}'s profile`} 
          style={{ width: iconSize, height: iconSize, borderRadius: '50%' }} 
        />
      ) : (
        <AccountCircleIcon style={{ fontSize: iconSize, color: 'lightblue' }} />
      )}
  
      <h1 style={{ margin: '10px 0', fontWeight:'bold', fontSize:35 }}>{user?.name}</h1>
      <p style={{ margin: '5px 0', fontSize:25 }}>{user?.email}</p>
      
      {user?.roles === 1597 && (
        <>
          <p style={{ margin: '5px 0', fontSize:30 }}>{user?.carnet}</p>
          <div className="rating-container">
            {[...Array(fullStars)].map((_, index) => (
              <StarIcon className="star" style={{ fontSize: '64px' }} key={index} />
            ))}
            {halfStar === 1 && <StarHalfIcon className="star" style={{ fontSize: '64px' }} />}
            {[...Array(emptyStars)].map((_, index) => (
              <StarBorderIcon className="star" key={index} style={{ fontSize: '64px' }} />
            ))}
          </div>
        </>
      )}
      <div className="description-title">Descripción</div>
      <div className="description-text">{user.description}</div>

      {user?.roles === 1597 && (
        <>
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
                    <td>{capitalizeFirstLetter(row.assistanceDetails.assistanceType)}</td>
                    <td>{row.assistanceDetails.name}</td>
                    <td>{row.score}</td>
                    <td>{row.assistanceDetails.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <EditIcon onClick={handleEditClick} style={{ cursor: 'pointer', color: '#101828', fontSize: '4rem' }} />
      </div>
    </div>
  );
};

export default Profile;
