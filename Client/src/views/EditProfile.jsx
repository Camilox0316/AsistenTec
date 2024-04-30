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
  const { auth: user, setAuth: setUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user.name,
    idNumber: user.idNumber,
    firstLastName: user.firstLastName,
    secondLastName: user.secondLastName,
    email: user.email,
    newPwd: '',
    confirmPwd: '',
    bio: user.bio
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.newPwd !== formData.confirmPwd) {
      alert("Passwords do not match!");
      return;
    }
    try {
      // Here you would handle the API request to update the user details
      const response = await axios.post('http://yourapi.com/updateUser', formData);
      setUser(response.data); // Assuming your API returns the updated user object
      navigate('/profile'); // Redirect to the profile page or confirmation page
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-title">Editar Perfil</h2>
      <div className="profile-photo-section">
          <IconButton color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
          <span>Nueva foto</span>
        </div>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <TextField
          label="Biografía"
          multiline
          maxRows={4}
          name="bio"
          value={formData.bio}
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
        </div>
        <div className="input-row">
          <TextField
            label="1º Apellido"
            name="firstLastName"
            value={formData.firstLastName}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div className="input-row">
          <TextField
            label="2º Apellido"
            name="secondLastName"
            value={formData.secondLastName}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div className="input-row">
          <TextField
            label="Número de carné"
            name="idNumber"
            value={formData.idNumber}
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
          </div>
          <div className="input-row">
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
