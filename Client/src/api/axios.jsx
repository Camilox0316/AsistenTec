import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export default instance;