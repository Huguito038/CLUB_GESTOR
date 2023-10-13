import axios from "axios"

// Configuración global de Axios (puedes personalizarla según tus necesidades)
const instance = axios.create({
  withCredentials: true,
  baseURL:"http://localhost:4000/api"
});

export default instance