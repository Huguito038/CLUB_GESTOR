import stilo from "../NewPlayer/NewPlayer.module.css"
import { useForm } from "react-hook-form";
import { useDispatch,} from "react-redux";
import { SetDefault, createPlayer } from "../Redux/actions";
import { useSelector } from "react-redux";
import {Alert,Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import { useState } from "react";
import { Deportes } from "../extras";




export const NewPlayer= ()=>{
    const successfull = useSelector(state=> state.succesfullmsg)
    const unsuccess = useSelector(state=> state.unsucces)
    const dispatch = useDispatch()
    const [selectedDeporte, setSelectedDeporte] = useState(""); 
    const {
        register,
        reset,
        handleSubmit,
        formState:{errors},
      } = useForm();
    const onSubmit = handleSubmit(async(data) => {
        if(data.deporte!=="Futbol") {
            data.categoria = ""
      
          }
        try {
            await dispatch(createPlayer(data));
            setTimeout(() => {
                dispatch(SetDefault());
              }, 2500); 
           
        } catch (error) {
            console.log("Error en onSubmit:", error.message);
        }
      });

      useEffect(()=>{
        setTimeout(() => {
            reset()
          }, 1500); 
      },[successfull])

   
   

    const categorias = [
        { label: 'Primera Masculina', value: '1M' },
        { label: 'Primera Femenina', value: '1F' },
        { label: 'Reserva Masculina', value: '2M' },
        { label: 'Reserva Femenina', value: '2F' },
        { label: 'Cuarta Categoria', value: "4" },
        { label: 'Quinta Categoria', value: "5" },
        { label: 'Sexta Categoria', value: "6" },
        { label: 'Septima Categoria', value: '7' },
        { label: 'Octava Categoria', value: '8' },
        { label: 'Novena Categoria', value: '9' },
      ];
    
    return(
        <div className={stilo.contenedor}>
            {successfull &&
                <Alert className={stilo.alert}>
                <h4 className="alert-heading">
                    ¡JUGADOR CARGADO EN LA BASE DE DATOS!
                </h4>
                <p>
                 Se ha completado la carga de este jugador puedes ver todos los jugadores en JUGADORES
                </p>
               
              </Alert>
              
            }
            {unsuccess && 
            <Alert className={stilo.alert} color="danger">
            <h4 className="alert-heading">
              ESTE JUGADOR YA SE ENCUENTRA EN LA BASE DE DATOS
            </h4>
            <p>
             Por favor verifica la existencia de este jugador en tu base de datos...
            </p>
           
          </Alert>}
            
            <div className={stilo.formulario}>
                
                
                <h2>Agregar Jugador</h2>
                <form onSubmit={onSubmit} autoComplete="off" spellCheck="false">
                    <div className={stilo.formu}>
                        <div>
                            <h5>Nombre del Jugador</h5>
                            <input type="text" placeholder="Nombre"{...register("nombre", { required: true })}/>  
                            {errors.nombre && (<p className={stilo.errors}>Nombre is required</p>)}    
                        </div>
                        <div>
                            <h5>Deporte</h5>
                            <select {...register("deporte",{required: true})}  onChange={(e) => setSelectedDeporte(e.target.value)}>
                                <option value="" disabled>Selecciona un deporte..</option>
                                {Deportes.map((cat) => (
                                <option key={cat} value={cat}>
                                {cat}
                                </option>
                            ))}
                            </select>
                        </div>
                                    
                    </div>
                
                    
                    <div className={stilo.formu}>
                        <div>
                            <h5>Fecha de Nacimiento</h5>
                            <input type="date" {...register("fecha_nacimiento", { required: true })}/>
                            {errors.fecha_nacimiento && (<p className={stilo.errors}>Fecha is required</p>)}
                        </div>
                        <div>
                            <h5>Email</h5>
                            <input type="text" placeholder="Email" {...register("email", { required: true })}/>
                            {errors.email && (<p className={stilo.errors}>Email is required</p>)}
                        </div>
                        
                    </div>
                    <div className={stilo.formu}>
                        <div>
                            <h5>Direccion</h5>
                            <input type="text" placeholder="Direccion" {...register("direccion", { required: true })}/>
                            {errors.direccion && (<p className={stilo.errors}>Direccion is required</p>)}
                        </div>
                        <div>
                            <h5>Telefono</h5>
                            <input type="text" placeholder="Telefono" {...register("telefono", { required: true })}/>
                            {errors.telefono && (<p className={stilo.errors}>Telefono is required</p>)}
                        </div>
                    </div>
                    <div className={stilo.formu}>
                    <div>
                            <h5>Documento</h5>
                            <input type="text" placeholder="Documento" {...register("documento", { required: true })}/>
                            {errors.documento && (<p className={stilo.errors}>Document is required</p>)}
                        </div>
                        {selectedDeporte === "Futbol" && (
                        
                        <div>
                                <h5>Categoria</h5>
                                <select {...register("categoria", { required: false })}>
                                    <option value="" disabled >Selecciona una categoría</option>
                                    {categorias.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option >))}
                                </select >
            
                                
                           
                        </div>
                    )}
                        
                    </div>
                    <Button  className={stilo.boton}type="submit" color="success">
                        AÑADIR JUGADOR
                    </Button>
                    <div className={stilo.space}></div>
                </form>
            </div>
           
        </div>
    )
}