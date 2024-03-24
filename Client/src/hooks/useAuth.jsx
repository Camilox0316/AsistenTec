import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth is out from provider');
	}
	return context;
};
