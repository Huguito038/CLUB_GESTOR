import axios from "axios"

// Configuración global de Axios (puedes personalizarla según tus necesidades)
const instance = axios.create({
  withCredentials: true,
  baseURL:"https://clubpro-gestor.onrender.com/api"
});

export default instance