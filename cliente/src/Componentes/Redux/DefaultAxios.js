import axios from "axios"

const instance = axios.create({
  withCredentials: true,
  baseURL:"https://club-gestor-woyp.vercel.app/api"
});

export default instance