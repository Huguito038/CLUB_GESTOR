import axios from "axios";

const instanceAxios= axios.create({
    baseURL : "https://clubpro-gestor.onrender.com/api",
    withCredentials: true,
})

export default instanceAxios