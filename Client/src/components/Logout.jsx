
//import { useNavigate} from "react-router-dom";


export const Logout = ({ photoUrl, name, email,logout }) => {
  return (
    <div className="mt-auto px-4 py-3 border-t border-gray-200">
      <div className="flex items-center space-x-4">
        <img
          className="h-8 w-8 rounded-full"
          src={photoUrl}
          alt="User Avatar"
        />
        <div>
          <p className="text-sm font-bold text-white">{name}</p>
          <p className="text-xs text-white">{email}</p>
        </div>
      </div>
      {/* <button
        onClick= {logout}
        className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Cerrar sesión
      </button> */}
    </div>
  );
};

//export default Logout;
