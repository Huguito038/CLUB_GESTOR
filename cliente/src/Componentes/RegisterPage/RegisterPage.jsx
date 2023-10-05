import React from "react";
import stilo from "../RegisterPage/RegisterPage.module.css"
import { Link } from "react-router-dom";

export default function RegisterPage() {
   
    

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
