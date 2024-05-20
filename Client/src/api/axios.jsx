import axios from "axios";
const hostUrl = import.meta.env.VITE_HOST_URL;
// eslint-disable-next-line react-refresh/only-export-components
const instance = axios.create({
  baseURL: `${hostUrl}`,
  withCredentials: true,
});

export default instance;