import { useState ,useRef,useEffect,styles} from "react";
import "./IngresarAdmin_prof.css"; // Make sure you have the CSS for styling
import Libro from "../../img/libro.png";
import CerrarIcono from '../../img/cancelar.png'; // Asegúrate de tener un ícono de cierre
import PropTypes from 'prop-types';
import UserIcon from "../../img/userLogo.png";
import axios from "../../api/axios";

const IngresarAdmin_prof = ({onClose ,onAgregarAsistencia, asistenciaTipos}) => {
  
  IngresarAdmin_prof.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAgregarAsistencia: PropTypes.func.isRequired,
  
};

const adminTipos = [{'Administrador':3123},{'Profesor':2264}];
const [tipoAdministrador, setTipoAdministrador] = useState(Object.keys(adminTipos[0])[0]); 
  const [anio, setAnio] = useState(new Date().getFullYear());
  const [semestre, setSemestre] = useState("1");

  const [nombre, setNombre] = useState("");

  const [apellido1, setApellido1] = useState("");
  const [apellido2, setApellido2] = useState("");

  const [correo, setCorreo] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [descripcion, setDescripcion] = useState("");

  const [formData, setFormData] = useState({
		firstName: '',
		email: '',
		telefono: '',
		password: '',
		confirmPassword: '',
    lastName1: '',
    lastName2: '',
    carnet: '',
    roles: Object.values(adminTipos[0])[0],
    photoFile: null,
	});

  const errorRef = useRef();

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setErrorMsg("");
  }, [formData]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (!formData.email.endsWith('@itcr.cr')) {
      setErrorMsg("El correo electrónico ser una cuenta '@itcr.cr'");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("La contraseña no coincide");
      return;
    }
    console.log("Tipo admin: ",tipoAdministrador);

    const data = new FormData();

    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    
    try {
      // Aquí debes ajustar la URL según tu configuración de backend
      const response = await axios.post('/user/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log(response.data); // O manejar la respuesta como necesites
      //navigate('/'); // Redirige al usuario a la página de inicio de sesión
      setErrorMsg("Perfil ingresado exitosamente!!");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        // Verifica específicamente si el mensaje es por un usuario duplicado
        if (error.response.data.msg === 'User already exists') {
          setErrorMsg("El usuario ya existe. Por favor, intenta con otro correo electrónico.");
        } else {
          setErrorMsg(error.response.data.msg); // Otros mensajes de error del backend
        }
      } else {
        setErrorMsg("Error al registrar el usuario. Por favor, intenta de nuevo más tarde.");
      }
      console.error(error);
    }
  };
  // Función para manejar los cambios en el select
  const handleTipoAdministradorChange = (event) => {
    const selectedType = event.target.value;
    setTipoAdministrador(selectedType);
    const selectedRole = adminTipos.find((item) => Object.keys(item)[0] === selectedType);
    const selectedRoleId = selectedRole ? Object.values(selectedRole)[0] : ''; // Obtener el ID del rol seleccionado
    setFormData({
      ...formData,
      roles: selectedRoleId, // Actualizar el estado con el ID del rol seleccionado
    });
  };

  const handleInputChange = event => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

 // Asegúrate de que el componente no se renderice si no debería ser visible
  return (

    <div className="modal-overlay">
 
   
      <div className="solicitar-asistencia-container">

        
      <img
          src={CerrarIcono}
          alt="Cerrar"
          className="cerrar-icono"
          onClick={onClose} // Llama a handleCloseClick cuando se hace clic en el ícono
        />
          <h1>Ingresar Administrador o Profesor</h1>

          <img src={UserIcon} alt="Icon" className="asistencia-icon" />
        <div className="solicitar-asistencia-form">
          <form onSubmit={handleSubmit}>
            <label>
              Tipo Administrador
              <select
                value={tipoAdministrador}
                onChange={handleTipoAdministradorChange}
              >
                {adminTipos.map((tipo, index) => (
                  <option key={index} value={Object.keys(tipo)[0]}>
                    {Object.keys(tipo)[0]}
                  </option>
                ))}
            </select>
            </label>

            <label>
              Nombre
              <input
                
                type="text"
                //value={nombre}
                name='firstName'
                onChange={ handleInputChange}
                defaultValue={formData.firstName}
              />
            </label>
            <label>
              Apellido 1
              <input
                type="text"
                //value={apellido1}
                name='lastName1'
                onChange={ handleInputChange}
                defaultValue={formData.lastName1}
              />
            </label>
            <label>
              Apellido 2
              <input
                type="text"
                //value={apellido2}
                name='lastName2'
                onChange={ handleInputChange}
                defaultValue={formData.lastName2}
              />
            </label>
            <label>
              Correo
              <input
                type="text"
               // value={correo}
                name='email'
                onChange={ handleInputChange}
                defaultValue={formData.email}
              />
            </label>
            <label>
              Contraseña
              <input
                type="text"
                //value={password}
                name='password'
                onChange={ handleInputChange}
                defaultValue={formData.password}
              />
            </label>
            <label>
              Confirmar Contraseña
              <input
                type="text"
               // value={confirmPassword}
               name='confirmPassword'
                onChange={ handleInputChange}
                defaultValue={formData.confirmPassword}
              />
            </label>
            <label>
              Descripción
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              ></textarea>
            </label>
            <div className="guardar-button-container">
              <button type="submit">Guardar</button>
            </div>
          </form>
        </div>
      </div>
      <div className="absolute bottom-0 bg-cover bg-center" style={styles}>
        <p
          ref={errorRef}
          className={errorMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        
        >
          {errorMsg}
        </p>
      </div>

      </div>
 
  );
};

export default IngresarAdmin_prof;
