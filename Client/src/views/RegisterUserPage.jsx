import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
//import { ProfessorCard } from "../components/ProfessorCard";

const LOGIN_URL = "http://localhost:3500/login/register";

export function RegisterUserPage() {
  const navigate = useNavigate();

  const [firstName, setfirstName] = useState("");
  const [lastName1, setlastName1] = useState("");
  const [lastName2, setlastName2] = useState("");
  const [carnet, setCarnet] = useState("");
 
  const [email, setEmail] = useState("");
  const [photo, setphoto] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [consultProfessors, setConsultProfessors] = useState([]);

  const [professorId, setProfessorId] = useState("");

  const errorRef = useRef();

  const [errorMsg, setErrorMsg] = useState("");

  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    setErrorMsg("");
  }, [
    firstName,
    lastName1,
    lastName2,
    carnet,
    password,
    email,
    photo,
  ]);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await axios.get('http://localhost:3500/routes/api/professorRouter/');
        console.log("Response data:", response.data.professorsFounds);
        setProfessors(response.data.professorsFounds);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfessors();
  }, []);

  const registerProfessor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          firstName,
          lastName1,
          lastName2,
          carnet,
          password,
          email,
          photo,
          roles:1597
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      // const accessToken = response?.data?.accessToken;
      const roles = response?.data?.status;
      alert("Successfully registered" + response?.data?.password);
      setfirstName("");
      setlastName1("");
      setlastName2("");
      setCarnet(""),
      setPassword(""),
      setConfirmPassword("");
      setEmail("");
      setphoto("");
      navigate("../");
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("No Server Response" + err);
      } else if (err.response?.status === 400) {
        setErrorMsg("Missing Username or Password" + err.response?.data);
      } else if (err.response?.status === 401) {
        setErrorMsg("Unauthorized");
      } else {
        console.log(err.response?.data);
        setErrorMsg("Login Failed" + err);
      }
      errRef.current.focus();
    }
  };

  // const consult = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log("professorId:", professorId);

  //     const response = await axios.get(`http://localhost:3500/routes/api/professorRouter/id/${professorId}`);
  //     const professor = response.data.professor;

  //     if (professor) {
  //       navigate("/viewProfile", { state: { consultProfessors: professor } });
  //     } else {
  //       setErrorMsg("Professor not found");
  //     }
  //   } catch (err) {
  //     setErrorMsg("No Server Response" + err);
  //   }
  // };
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
                  registerProfessor(e);
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

                    <div className="flex justify-between items-center ">
                      <div class="relative">
                        <label
                          title="Click to upload"
                          for="photoFile"
                          class="cursor-pointer flex items-center gap-4 px-6 py-4 before:border-gray-400/60 hover:before:border-gray-300 group dark:before:border-gray-600 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                        >
                          <div class="w-max relative">
                            <img
                              class="w-12"
                              src="https://www.svgrepo.com/show/485545/upload-cicle.svg"
                              alt="file upload icon"
                              width="512"
                              height="512"
                            />
                          </div>
                          <div class="relative">
                            <span class="block relative text-blue-500 group-hover:text-blue-500">
                              Subir archivo
                            </span>
                            <span class="mt-0.5 block text-sm text-gray-500 dark:text-gray-400">
                              Max 2 MB
                            </span>
                          </div>
                        </label>
                        <input
                          hidden="false"
                          type="file"
                          name="button2"
                          id="photoFile"
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
                      onChange={(e) => {
                        setfirstName(e.target.value);
                     }}
                      className="appearance-none block w-full bg-white-200 text-black border rounded-2xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow-xl"
                      id="grid-first-name"
                      type="text"
                      placeholder=""
                      value={firstName}
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
                      onChange={(e) => {
                        setlastName1(e.target.value);
                      }}
                      className="appearance-none block w-full bg-white-200 text-black border rounded-2xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow-xl"
                      id="grid-last-name"
                      type="text"
                      placeholder=""
                      value={lastName1}
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
                      onChange={(e) => {
                        setlastName2(e.target.value);
                      }}
                      className="appearance-none block w-full bg-white-200 text-black border rounded-2xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow-xl"
                      id="grid-last-name"
                      type="text"
                      placeholder=""
                      value={lastName2}
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
                      onChange={(e) => {
                        setCarnet(e.target.value);
                      }}
                      className="appearance-none block w-full bg-white-200 text-black border rounded-2xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow-xl"
                      id="grid-last-name"
                      type="text"
                      placeholder=""
                      value={carnet}
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
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className="appearance-none block w-full bg-white-200 text-black border rounded-2xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow-xl"
                      id="grid-last-name"
                      type="text"
                      placeholder=""
                      value={email}
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
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      className="appearance-none block w-full bg-white-200 text-black border rounded-2xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow-xl"
                      id="grid-first-name"
                      type="text"
                      placeholder=""
                      value={password}
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
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      className="appearance-none block w-full bg-white-200 text-black border rounded-2xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow-xl"
                      id="grid-first-name"
                      type="text"
                      placeholder=""
                      value={confirmPassword}
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
