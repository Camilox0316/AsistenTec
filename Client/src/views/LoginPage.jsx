import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "../api/axios";
import logoImage from "../img/logoTec.png"; // importar el logo del tec
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import background from "../img/backgroundLogin.jpg";
const LOGIN_URL = "/login/auth";

export function LoginPage() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const userRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      //console.log(JSON.stringify(response));
      // const accessToken = response?.data?.accessToken;
      let roles = response?.data?.roles;
      let name = response?.data?.name;
      let photo = response?.data?.photo;
      let id = response?.data?.id;
      let carnet = response?.data?.carnet;
      setAuth({id,name,photo,email, password, roles: [roles[0]],carnet});
      setEmail("");
      setPassword("");
      navigate("/home-switch");
    } catch (err) {
      if (!err?.response) {
        console.log(err);
        setErrorMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrorMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrorMsg("Unauthorized");
      } else {
        setErrorMsg("Login Failed");
      }
      errorRef.current.focus();
    }
    // let roles = [1597];
    // setAuth({ email : "", password:"", roles });
    // navigate("/home-switch");
  };

  const styles = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",   
   
  };

  return (
    
    <div className="absolute inset-0 bg-cover bg-center"  style={styles} >
      <p
        ref={errorRef}
        className={errorMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errorMsg}
      </p>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-customblue rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800 dark:border-gray-700">
            <div className="p-8 space-y-6 md:space-y-6 sm:p-8 ">
                <h1 className="text-xl bg-white rounded-lg font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-3 flex items-center justify-center">
                  <img src={logoImage} alt="logo" className="w-90 h-10" />
                </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={loginUser}>
              <div>
                <label className="block mb-6 text-[30px] font-medium  text-center text-white ">
                  Iniciar sesión
                </label>
                <label className="block mb-2 text-sm font-medium text-center text-white">
                  Escriba sus credenciales para iniciar!
                </label>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  name="email"
                  id="email"
                  ref={userRef}
                  style={{
                    backgroundColor: "#F0F0F0",
                    borderColor: "black",
                    color: "black",
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-black"
                  placeholder="Dirección de correo electrónico"
                  required
                  value={email}
                />
              </div>
              <div>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  name="password"
                  id="password"
                  style={{
                    backgroundColor: "#F0F0F0",
                    borderColor: "black",
                  }}
                  placeholder="Contraseña"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={password}
                />
              </div>

              <button
                type="submit"
                className="w-full justify-center text-white bg-gradient-to-r from-teal-700 to-cyan-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                      hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-800 hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-1"
              >
                Iniciar Sesión
              </button>

              <p className="text-sm font-light text-002857 ">
                <Link
                  to="/forgot-password"
                  className="font-medium text-white underline"
                >
                  ¿Olvidó su contraseña?
                </Link>
              </p>

              <p className="text-sm font-light text-002857 ">
                <Link
                  to="/register-student"
                  className="font-medium text-white underline"
                >
                  ¿No te has registrado aún?
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
