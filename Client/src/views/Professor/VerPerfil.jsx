import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from "../../api/axios";
import axios from 'axios';

import '../../css modules/Profile.css';

const VerPerfil = ({ user, onClose }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const hostUrl = import.meta.env.VITE_HOST_URL;
  
  const iconSize = isSmallScreen ? '200px' : '200px';
  const [assistanceData, setAssistanceData] = useState([]);
  const [rating, setRating] = useState(0); // Initialize rating state

  useEffect(() => {
    const fetchAssistances = async () => {
      try {
        const assistanceResponse = await axios.get(`${hostUrl}/received/getStudentAssistances/${user._id}`);
        setAssistanceData(assistanceResponse.data);
      } catch (error) {
        console.error("Error fetching assistances:", error);
      }
    };

    fetchAssistances();
  }, [user._id, hostUrl]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    if (assistanceData.length > 0) {
      const totalScore = assistanceData.reduce((sum, row) => sum + row.score, 0);
      const averageScore = totalScore / assistanceData.length;
      setRating(averageScore);
    }
  }, [assistanceData])

  const photoUrl = user?.photo ? `${axiosInstance.defaults.baseURL}${user.photo}` : "";
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 > 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}><CloseIcon /></button>
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
      
          <h1 style={{ margin: '10px 0', fontWeight: 'bold', fontSize: 35 }}>{user?.name}</h1>
          <p style={{ margin: '5px 0', fontSize: 25 }}>{user?.email}</p>
          
          {user?.roles === 1597 && (
            <>
              <p style={{ margin: '5px 0', fontSize: 30 }}>{user?.carnet}</p>
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
        </div>
      </div>
    </div>
  );
};

VerPerfil.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    carnet: PropTypes.string,
    lastName1: PropTypes.string,
    lastName2: PropTypes.string,
    photo: PropTypes.string,
    roles: PropTypes.number.isRequired,
    description: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default VerPerfil;
