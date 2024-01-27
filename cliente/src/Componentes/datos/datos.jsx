import stilo from "./datos.module.css"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { findPublicData} from "../Redux/actions";
import logo from "../Jugador/escudo.png"
import { CiPhone } from "react-icons/ci";

const Datos = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [info, setInfo] = useState("")
    const [modal, setModal] = useState(false)

    const toggle = () =>setModal(!modal)

  useEffect(() => {
    const fetchData = async () => {
        try {
          const data = await dispatch(findPublicData(id));

          setInfo(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      
      fetchData();
    }, [dispatch, id]);

    const formatear = (number)=>{
        return number?.split(",").join(".")

    }
  
    return (
        <div className={stilo.contenedor}>
            <img src={logo} alt="" />
            <h1>{info.nombre}</h1>
            <h2>{formatear(info.documento)}</h2>
            <h2>{info.direccion}</h2>
            <h2><CiPhone />{info.telefono}</h2>
            <button onClick={toggle} className={stilo.button}>OTROS DATOS</button>
            {modal && (
                 <div className={stilo.card}>
                 <div className={stilo.header}>
                   
                   <div className={stilo.content}>
                     <span className={stilo.title}>OTROS DATOS</span>
                     <p className={stilo.message}>
                        {info.otros && info.otros}
                
                     </p>
                   </div>
                   <div className={stilo.actions}>
                     <button
                       className={stilo.desactivate}
                       type="button"
                       onClick={toggle}
                     >
                       CERRAR
                     </button>
                     
                   </div>
                 </div>
           
                </div>
                
            )}
           
        </div>
    );
}

export default Datos;
