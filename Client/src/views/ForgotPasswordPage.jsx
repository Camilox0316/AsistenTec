import React, { useState } from 'react'
import axios from "../api/axios";
import background from "../img/backgroundLogin.jpg";

export function ForgotPasswordPage() {
  
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('/user/updatePassword', {
        usuario: email,
        newPassword,
        confirmPassword
      });

      if (response.data) {
        setSuccess(response.data.msg);
        setError("");
      } else {
        throw new Error('Response data is undefined');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg);
      } else {
        setError(err.message || 'Something went wrong');
      }
      setSuccess("");
    }
  };



  const styles = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundOpacity: "0.5",
  };
  return (
    <section style={styles}>
      <div className="w-screen h-screen grid grid-rows-2 text-white text-4xl md:grid-cols-2">
        <div className=" w-full h-full bg-[backgroundImage] opacity-80 bg-center bg-cover centered md:h-screen"></div>

        {/* page 2 */}
        <div className="w-full h-full bg-gray-800 centered md:h-screen">
          <div className="flex items-center justify-center h-screen">
            <div className="w-full p-8 bg-white rounded-lg md:max-w-md sm:max-w-3xl dark:bg-gray-800 dark:border-gray-800 ">
              <h2 className="mb-1 text-[40px] font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Recordar Contraseña
              </h2>
              <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Correo
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required=""
                    style={{ width: "100%" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="code"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Código enviado al Email
                  </label>
                  <input
                    type="code"
                    name="code"
                    id="code"
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nueva Contraseña
                  </label>
                  <input
                    type="newPassword"
                    name="newPassword"
                    id="newPassword"
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    style={{ width: "100%" }}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirmar contraseña
                  </label>
                  <input
                    type="confirm-password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    style={{ width: "100%" }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-1000 hover:bg-primary-1000 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-00747F dark:hover:bg-00747F dark:focus:ring-primary-800"
                  onClick={() => console.log('Link was clicked')}
                >
                  Continuar
                </button>
                {error && <p>{error}</p>}
                {success && <p>{success}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
