import axios from "axios"

const instance = axios.create({
  withCredentials: true,
  baseURL:"https://clubpro-gestor.onrender.com/api"
});

export default instance