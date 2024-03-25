import axios from "./axios.jsx";

export const verifyTokenRequest = () => axios.get('/login/verifyToken');