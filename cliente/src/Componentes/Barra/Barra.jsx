import stilo from "../Barra/Barra.module.css"
import { Link} from "react-router-dom"
import React from 'react';
import { useDispatch} from "react-redux";
import { logout } from "../Redux/actions";
import ajustes from "./ajustes.png"



export default function Barra() {
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
            ClubPro Manager
        </div>
        
        <ul className={stilo.cont_links}>
            <Link to="/home" style={{ textDecoration: 'none' }}><li><h2>DASHBOARDS</h2></li></Link>
            <Link to="/allplayers"style={{ textDecoration: 'none' }}><li><h2>JUGADORES</h2></li></Link>
            <Link to="/newPlayer"style={{ textDecoration: 'none' }}><li><h2>AÑADIR JUGADOR</h2></li></Link>
            <Link to="/comisionD"style={{ textDecoration: 'none' }}><li><h2>COMISION</h2></li></Link>
        </ul>
        <div className={stilo.usuario}>
            <button onClick={onSubmit} className={stilo.boton}>SALIR</button>
            <Link to="/ajustes"><img src={ajustes} alt="" className={stilo.ajustes} /></Link>
        </div>
        

            
    </div>)}


