import axios from './axios.js';

export const verifyTokenRequest = () => axios.get('/login/verifyToken');