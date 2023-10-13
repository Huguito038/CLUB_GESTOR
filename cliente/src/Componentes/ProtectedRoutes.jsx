
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { useEffect } from "react"
import { verifyToken} from "./Redux/actions"


export default function ProtectedRoutes (){
    const dispatch = useDispatch()
    const auth = useSelector(state=>state.isAuthenticated)
    const loading = useSelector(state=>state.loading)
    
    useEffect(()=>{
        async function CheckAuth (){
            await dispatch(verifyToken())
    }
    CheckAuth()
},[])
    
    if(!auth && !loading) return <Navigate to="/" replace></Navigate>
    return <Outlet></Outlet>


}