import stilo from "../Barra/Barra.module.css"
import { Link} from "react-router-dom"
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/actions";
import { useNavigate } from "react-router-dom";



export default function Barra() {
    const user = useSelector(state=>state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onSubmit = async() => {
        try {
            await dispatch(logout());
        } catch (error) {
            console.error("Error :", error);
        }
    }
    return (
    <div className={stilo.contenedor}>
        <div className={stilo.titulo}>
            <img src="https://w7.pngwing.com/pngs/968/453/png-transparent-black-letter-c-logo-illustration-copyright-symbol-intellectual-property-copyright-infringement-copyright-words-phrases-united-states-copyright.png" alt="" />
            ClubPro Manager
        </div>
        
        <ul className={stilo.cont_links}>
            <Link to="/home" style={{ textDecoration: 'none' }}><li><h2>DASHBOARDS</h2></li></Link>
            <Link to="/allplayers"style={{ textDecoration: 'none' }}><li><h2>JUGADORES</h2></li></Link>
            <Link to="/newPlayer"style={{ textDecoration: 'none' }}><li><h2>AÑADIR JUGADOR</h2></li></Link>
            <Link to="/comisionD"style={{ textDecoration: 'none' }}><li><h2>COMISION</h2></li></Link>
        </ul>
        <div className={stilo.usuario}>
            <img src="https://www.softzone.es/app/uploads/2018/04/guest.png?x=480&quality=40" alt="" />
            <h2>Bienvenido {user.nombre}</h2>
            <button onClick={onSubmit} className={stilo.boton}>SALIR</button>
        </div>
        

            
    </div>)}


