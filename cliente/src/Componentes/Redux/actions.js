import axios from "axios"

export const loginUser = (userData) => async (dispatch) => {
    
    try {
        const response = await axios.post('https://clubpro-gestor.onrender.com/api/login', userData); // Ajusta la ruta según tu backend
        if(response.data.id){
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: response.data, // Suponiendo que el backend devuelve los datos del usuario
            });
        }      
    } catch (error) {
        console.log(error.response.data.message)
        dispatch({
            type:"LOGIN_DENIED",
            payload:error.response.data
        })
    }
};
export const logout = ()=>async(dispatch)=>{
    try {
        await axios.post('https://clubpro-gestor.onrender.com/api/logout')
        dispatch({
            type: "LOGOUT",
        })
        
    } catch (error) {
        
    }

}
export const registerUser = (userData) =>async(dispatch)=>{
    try{
        const response = await axios.post('https://clubpro-gestor.onrender.com/api/newuser', userData); 
        console.log(response.data)
        if(response.data){
        dispatch({
            type: 'REGISTER_SUCCESS',
            payload: response.data,
        });
    }  
    }catch (error) {
        console.log(error.response.data.message)
        dispatch({
            type:"REGISTER_DENIED",
            payload:error.response.data
        })
    }
}
export const getAllPlayers = () => async(dispatch)=>{
    try {
        const users =  await axios.get('https://clubpro-gestor.onrender.com/api/all')
        dispatch({
            type:"GETALLPLAYERS",
            payload:users.data
        })
    } catch (error) {
        console.log(error.message)
    }
}
export const verifyToken= ()=> async(dispatch)=>{
    try{
        const res = await axios.get("https://clubpro-gestor.onrender.com/api/verify")
        if(!res.data){
            dispatch({
                type:"AUTH_DENIED"
            })
        }
        dispatch({
            type:"AUTH_SUCCES",
            payload:res.data
        })
        
    }catch (error) {
        dispatch({
            type:"AUTH_DENIED"
        })
    }
}
export const tokenNotExist = ()=> async(dispatch)=>{
    dispatch({
        type:"TOKEN_NOT_EXIST"
    })
}
export const createPlayer = (data)=> async(dispatch)=>{
    try {
        const res = await axios.post('https://clubpro-gestor.onrender.com/api/registrar',data)
        if(res.status === 200){
            console.log("NO-REPETIDO")
           dispatch({
            type:"CREATE_SUCCESFULL",
        })
        }     
    } catch (error) {
        dispatch({
        type:"CREATE_UNSUCCESFULL",
        })
            
        }
        
        
}
export const SetDefault = ()=> async(dispatch)=>{
    dispatch({
        type:"SETDEFAULT"
    })
}
export const infoPlayer = (id)=> async(dispatch)=>{
    try {
        const res = await axios.get("https://clubpro-gestor.onrender.com/api/find/"+id)
        if(res){
            dispatch({
                type:"PLAYER_INFO",
                payload:res.data
            })
        } 
    } catch (error) {
        console.log(error)
    }
}
export const cleanInfoPlayer = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"CLEAN_PERFIL",
        })
    } catch (error) {
        console.log(error)
    }
}
export const updatePlayer = (data)=>async()=>{
    console.log(data)
    try {
        await axios.put("https://clubpro-gestor.onrender.com/api/update/"+data._id, data)
    } catch (error) {
        console.log(error)
        
    }

}
export const deletePlayer = (id) => async()=>{
    try {
        console.log(id)
        await axios.delete("https://clubpro-gestor.onrender.com/api/delete/"+id)
    } catch (error) {
        console.log(error)
    }
}