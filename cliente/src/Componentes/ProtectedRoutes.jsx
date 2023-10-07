
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { useEffect } from "react"
import Cookies from "js-cookie"
import { verifyToken,tokenNotExist } from "./Redux/actions"


export default function ProtectedRoutes (){
    const dispatch = useDispatch()
    const auth = useSelector(state=>state.isAuthenticated)
    const loading = useSelector(state=>state.loading)

    useEffect(()=>{
        async function CheckAuth (){
        const cookies = Cookies.get()
        console.log(auth)
        console.log(cookies.token)
        if(cookies.token){
            await dispatch(verifyToken())
        }else{
           await dispatch(tokenNotExist())
        }
    }
    CheckAuth()
},[])
    
    if(loading) return <h1>Loading</h1>
    if(!auth && !loading) return <Navigate to="/" replace></Navigate>
    return <Outlet></Outlet>


}