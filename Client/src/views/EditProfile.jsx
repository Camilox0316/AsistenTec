import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../css modules/EditProfile.css'; // Ensure this path matches your CSS file's actual location

export const EditProfile = () => {
  const { auth: activeUser } = useAuth(); 
  const [user, setUser] = useState("");
  const [fileName, setFileName] = useState('Max 2 MB');
  const hostUrl = import.meta.env.VITE_HOST_URL;

  useEffect(() => {
    try {
      const fetchUser = async () => {
        const response = await axios.get(`${hostUrl}/user/getUserByIdAll/${activeUser.id}`);
        setUser(response.data);
        // Initialize formData state with fetched user data
        setFormData({
          name: response.data.name,
          carnet: response.data.carnet,
          lastName1: response.data.lastName1,
          lastName2: response.data.lastName2,
          email: response.data.email,
          newPwd: '',
          confirmPwd: '',
          description: response.data.description,
        });
      }
      fetchUser();
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, [activeUser.id, hostUrl]);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    carnet: '',
    lastName1: '',
    lastName2: '',
    email: '',
    newPwd: '',
    confirmPwd: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: file
      }));
      setFileName(file.name); // Update the file name state
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.newPwd !== formData.confirmPwd) {
      alert("Passwords do not match!");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.put(`${hostUrl}/user/updateUser/${activeUser.id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/profile');
      alert("Profile updated successfully!");
      console.log(response);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-title">Editar Perfil</h2>
      <div className="profile-photo-section">
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" name="photoFile" onChange={handleFileChange} />
          <PhotoCamera />
        </IconButton>
        <span>Nueva foto</span>
        <span className="file-name">{fileName}</span>
      </div>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <TextField
          label="Biografía"
          multiline
          maxRows={4}
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          className="biography-field"
        />
        <div className="input-row">
          <TextField
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="1º Apellido"
            name="lastName1"
            value={formData.lastName1}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div className="input-row">
          <TextField
            label="2º Apellido"
            name="lastName2"
            value={formData.lastName2}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Número de carné"
            name="carnet"
            value={formData.carnet}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div className="input-row">
          <TextField
            label="Nueva Contraseña"
            type="password"
            name="newPwd"
            value={formData.newPwd}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Confirmar Contraseña"
            type="password"
            name="confirmPwd"
            value={formData.confirmPwd}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <Button type="submit" variant="contained" color="primary" className="save-button">
          Guardar datos
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
