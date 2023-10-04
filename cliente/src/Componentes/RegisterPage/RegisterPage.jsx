import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { registerUser } from "../Redux/actions";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux/es/hooks/useSelector"
import stilo from "../RegisterPage/RegisterPage.module.css"
import { Link } from "react-router-dom";
import { FaUserAlt, FaUnlockAlt } from "react-icons/fa";

export default function RegisterPage() {
    const auth = useSelector(state=>state.isAuthenticated)
    const RegErrors = useSelector(state=>state.error)
    const user = useSelector(state=>state.user)
    const navigate = useNavigate()
    const { register, handleSubmit,formState:{errors}} = useForm();
    const dispatch = useDispatch();
    const onSubmit = handleSubmit(async(data) => {
        try {
            await dispatch(registerUser(data))
            if(auth){
                console.log(user)
                navigate("/homeles")}
        } catch (error) {
            console.error("Error al registrate:", error);
        }
    });

    return (
        <div className={stilo.contenedor}>
        <div className={stilo.formulario}>
          <div className={stilo.form}>
            <h2>Pagina de uso privado</h2>
            <h4>Para obtener acceso comunicarse a <br></br>hugosoler@hotmail.com</h4>
            <Link to="/"><h5 >Ir al Login</h5></Link>
          </div>
          <div className={stilo.img_form}>
            <div className={stilo.cont}>
                <h2 data-aos="fade-left"  className={stilo.titulo}>ClubPro</h2>
                <h2 data-aos="fade-left"  className={stilo.titulo_2}>Manager.</h2>
              <h3 className={stilo.subtitulo}>
                Tu Herramienta de Gestión Deportiva
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
}
