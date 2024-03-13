import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";


// export const handleRegister = async formData => {
//   event.preventDefault();
//   console.log(formData);
//    if (formData.password !== formData.confirmPassword) {
//     alert("La contraseña no coincide");
//     return;
//   }

//  }; 

function RegisterUserPage() {

  const [fileName, setFileName] = useState('Max 2 MB');

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
		firstName: '',
		email: '',
		telefono: '',
		password: '',
		confirmPassword: '',
    lastName1: '',
    lastName2: '',
    carnet: '',
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

    if (!formData.email.endsWith('@estudiantec.cr')) {
      setErrorMsg("El correo electrónico ser una cuenta '@estudiantec'");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("La contraseña no coincide");
      return;
    }

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
      navigate('/login'); // Redirige al usuario a la página de inicio de sesión
    } catch (error) {
      setErrorMsg("Error al registrar el usuario");
      console.error(error);
    }
  };

  const handleInputChange = event => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

  const handleFileChange = event => {
    const { name, files } = event.target;
    if (files.length > 0) {
      const file = files[0]; // Siempre toma el primer archivo, asegurando que solo se procesa uno
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: file
      }));
      setFileName(file.name); // Actualiza el estado con el nombre del archivo
    }
  };
  

  

  const styles = {
    backgroundImage: "url(/src/img/backgroundLogin.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="absolute inset-0 bg-cover bg-center" style={styles}>
      <p
        ref={errorRef}
        className={errorMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errorMsg}
      </p>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

        <div className="w-full bg-customblue rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800 dark:border-gray-700" >
          <div className="flex flex-col items-center justify-center ">
            <div className="w-6/12 ">
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                  //onsult(e);
                }}
              >
                <h2 className="mb-9 text-[40px] font-medium  text-center  leading-tight tracking-tight text-white md:text-2xl ">
                  Registro
                </h2>
                <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="flex justify-center uppercase tracking-wide text-white text-xs font-bold mb-2"
                      htmlFor="grid-foto"
                    >
                      Foto
                    </label>

                    <div className="flex justify-center items-center ">
                      <div className="relative">
                        <label
                          title="Click to upload"
                          htmlFor ="photoFile"
                          className="cursor-pointer flex items-center gap-4 px-6 py-4 before:border-gray-400/60 hover:before:border-gray-300 group dark:before:border-gray-600 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                        >
                          <div className="w-max relative">
                            <img
                              className="w-12"
                              src="https://www.svgrepo.com/show/485545/upload-cicle.svg"
                              alt="file upload icon"
                              width="512"
                              height="512"
                            />
                          </div>
                          <div className="relative items-center">
                            <span className="block relative text-blue-500 group-hover:text-blue-500">
                              Subir archivo
                            </span>
                            <span className="mt-0.5 block text-sm text-gray-500 dark:text-gray-400">
                              {fileName}
                            </span>
                          </div>
                        </label>
                        <input
                          hidden={true}
                          type="file"
                          name="photoFile"
                          id="photoFile"
                          onChange={handleFileChange}
                        />
                      </div>

                    </div>

                <div className="flex flex-wrap -mx-20 mb-6">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                      htmlFor="grid-firstName"
                    >
                      Nombre
                    </label>
                    <input
                      onChange={ handleInputChange}
                      className="appearance-none block w-full bg-white-200 text-black border rounded-2xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow-xl"
                      id="grid-first-name"
                      type="text"
                      placeholder=""
                      name='firstName'
                      defaultValue={formData.firstName}
                    />
                  </div>
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                      htmlFor="grid-lastName1"
                    >
                      Apellido 1
                    </label>
                    <input
                      onChange={ handleInputChange}
                      className="appearance-none block w-full bg-white-200 text-black border rounded-2xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow-xl"
                      id="grid-last-name"
                      type="text"
                      placeholder=""
                      name='lastName1'
                      defaultValue={formData.lastName1}
                    />
                  </div>
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                      htmlFor="grid-lastName2"
                    >
                      Apellido 2
                    </label>
                    <input
                      onChange={ handleInputChange}
                      className="appearance-none block w-full bg-white-200 text-black border rounded-2xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow-xl"
                      id="grid-last-name"
                      type="text"
                      name='lastName2'
                      placeholder=""
                      defaultValue={formData.lastName2}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-20 mb-6">

                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                      htmlFor="grid-celular"
                    >
                      Número de Carnet
                    </label>
                    <input
                      onChange={ handleInputChange}
                      className="appearance-none block w-full bg-white-200 text-black border rounded-2xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow-xl"
                      id="grid-last-name"
                      type="text"
                      placeholder=""
                      name='carnet'
                      defaultValue={formData.carnet}
                    />
                  </div>
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                      htmlFor="grid-celular"
                    >
                      Correo
                    </label>
                    <input
                      onChange={ handleInputChange}
                      className="appearance-none block w-full bg-white-200 text-black border rounded-2xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow-xl"
                      id="grid-last-name"
                      type="text"
                      placeholder=""
                      name='email'
                      defaultValue={formData.email}
                    />
                  </div>         
                </div>

                <div className="flex flex-wrap -mx-20 mb-2">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                      htmlFor="grid-descripcion"
                    >
                      Contraseña
                    </label>
                    <input
                      onChange={ handleInputChange}
                      className="appearance-none block w-full bg-white-200 text-black border rounded-2xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow-xl"
                      id="grid-first-name"
                      type="text"
                      placeholder=""
                      name='password'
                      defaultValue={formData.password}
                    />
                  </div>
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                      htmlFor="grid-descripcion"
                    >
                      Confirmar contraseña
                    </label>
                    <input
                      onChange={ handleInputChange}
                      className="appearance-none block w-full bg-white-200 text-black border rounded-2xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow-xl"
                      id="grid-first-name"
                      type="text"
                      placeholder=""
                      name='confirmPassword'
                      defaultValue={formData.confirmPassword}
                    />
                  </div>
                </div>
                
              
                <div className="flex justify-center flex-wrap -mx-20 mb-2">

                      <div className="max-w-full w-3/12 h-full ">
                        <button
                          type="submit"
                          className="justify-center text-white bg-gradient-to-r from-teal-700 to-cyan-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                    hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-800 hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-1"
                        >
                          Registrar
                        </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterUserPage;
