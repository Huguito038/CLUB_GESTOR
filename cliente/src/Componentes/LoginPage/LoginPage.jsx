import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { loginUser } from "../Redux/actions";
import { useNavigate } from "react-router";
import 'aos/dist/aos.css';
import { useSelector } from "react-redux/es/hooks/useSelector";
import stilo from "../LoginPage/LoginPage.module.css";
import { Link } from "react-router-dom";
import { FaUserAlt, FaUnlockAlt } from "react-icons/fa";
import AOS from 'aos';


export default function LoginPage() {
  AOS.init();
  const LogErrors = useSelector((state) => state.error);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await dispatch(loginUser(data));
      navigate("/home")
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  });

  return (
    <div className={stilo.contenedor}>
      <div className={stilo.formulario}>
        <div className={stilo.img_form}>
          <div className={stilo.cont}>
            <h2 data-aos="fade-left" data-aos-duration="1000" className={stilo.titulo}>ClubPro</h2>
            <h2 data-aos="fade-left" data-aos-duration="2000" className={stilo.titulo_2}>Manager.</h2>
            <h3 className={stilo.subtitulo}>
              Tu Herramienta de Gestión Deportiva
            </h3>
          </div>
        </div>
        <div className={stilo.form}>
          <form onSubmit={onSubmit}>
            <h1 className={stilo.login}>Inicia Sesion</h1>
            {LogErrors.map((error, i) => (
              <div className={stilo.error} key={i}>{error.message}</div>
            ))}
            <div>
              <input
                className={stilo.input}
                type="email"
                placeholder="E-mail"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className={stilo.errors}>Email is required</p>
              )}
            </div>
            <div>
              <input
                className={stilo.input}
                type="password"
                placeholder="Contraseña"
                {...register("contraseña", { required: true })}
              />
              {errors.contraseña && (
                <p className={stilo.errors}>Password is required</p>
              )}
            </div>
            <div className={stilo.cont_buttom}>
              <button type="submit">Iniciar Sesion</button>
              <Link to="/register">
                <h2>No tenes cuenta? Registrate</h2>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
