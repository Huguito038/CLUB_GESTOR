import axios from "./DefaultAxios"


export const loginUser = (userData) => async (dispatch) => {
    try {
        const response = await axios.post('/login', userData); 
        if(response.data.id){
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: response.data, 
            });
        }      
    } catch (error) {
        dispatch({
            type:"LOGIN_DENIED",
            payload:error.response.data
        })
    }
};
export const logout = () => async (dispatch) => {
    try {
        await axios.post('/logout')
        dispatch({
            type: "LOGOUT",
        })
        
    } catch (error) {
        console.log("errorrrrrrr")
    }

}
export const registerUser = (userData) =>async(dispatch)=>{
    try{
        const response = await axios.post('/newuser', userData); 
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
        const users =  await axios.get('/all')
        dispatch({
            type:"GETALLPLAYERS",
            payload:users.data
        })
    } catch (error) {
        
    }
}
export const verifyToken= ()=> async(dispatch)=>{
    try{
        const res = await axios.get("/verify")
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
        const res = await axios.post('/registrar',data)
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
        const res = await axios.get("/find/"+id)
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
        await axios.put("/update/"+data._id, data)
    } catch (error) {
        console.log(error)
        
    }

}
export const updateAll= (data)=>async()=>{
    try {
        await axios.put("/updateAll",data)
    } catch (error) {
        console.log(error)
        
    }

}
export const deletePlayer = (id) => async()=>{
    try {
        console.log(id)
        await axios.delete("/delete/"+id)
    } catch (error) {
        console.log(error)
    }
}
export const SelectSport = (deporte) => async(dispatch)=>{
    try {
        if(deporte!="Futbol"){
            dispatch({
                type:"CLEAN_CAT"
            })
        }
        dispatch({
            type:"SELECT_SPORT",
            payload:deporte
        })
    } catch (error) {
        console.log(error)
    }
}
export const SelectCat = (categoria) => async(dispatch)=>{
    try {
        dispatch({
            type:"SELECT_CAT",
            payload:categoria
        })
    } catch (error) {
        console.log(error)
    }
}

