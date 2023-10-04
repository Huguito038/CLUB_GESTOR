import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlayers } from "../Redux/actions";
import stilo from "../Comision/Comision.module.css";
import { Table } from "reactstrap";
import { Button} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";


export const Comision = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.jugadores);
  const [termino, setTermino] = useState("");
  const [jugadores, setJugadores] = useState([]);
  useEffect(() => {
    async function getPlayers() {
      await dispatch(getAllPlayers());
    }
    getPlayers();
  }, []);
  function SearchTerm(termino) {
    return function (x) {
      return x.nombre.toLowerCase().includes(termino) || !termino;
    };
  }
  const cambiar_fecha = (player)=>{
    const [año, mes, dia] = player.split("-");
    const fechaFormateada = `${dia}/${mes}/${año}`;
    return fechaFormateada
  }

  useEffect(() => {
    setJugadores(players.filter(e=>e.deporte=="COMISION DIRECTIVA"));
  }, [players]);

  
  return (
    <div className={stilo.contenedor}>
      <div className={stilo.search}>
        <input
          placeholder="Busqueda por Nombre..."
          type="text"
          onChange={(e) => setTermino(e.target.value)}
        />
      </div>
      <div
        className={stilo.contenedor_tabla}
        style={{ maxHeight: "700px", overflowY: "scroll" }}
      >
        <Table size="sm" responsive hover striped className={stilo.tabla}>
          <thead className={stilo.thead}>
            <tr className={stilo.titulos2}>
              <th>Nombre</th>
             
              <th>Fecha de Nacimiento</th>
              <th>CARNET IMPRESO</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {jugadores &&
              jugadores
                .filter(SearchTerm(termino.toLowerCase()))
                .map((player) => (
                  <tr key={player._id}>
                    <td className={stilo.nombre}>{player.nombre}</td>
                    <td className={stilo.nombre}>{cambiar_fecha(player.fecha_nacimiento) }</td>
                    {!player.carnet_impreso && <td><img className={stilo.imge} src="https://cdn.icon-icons.com/icons2/317/PNG/512/sign-error-icon_34362.png" alt="" /></td>}
                    {player.carnet_impreso && <td><img className={stilo.imge} src="https://cdn.icon-icons.com/icons2/317/PNG/512/sign-check-icon_34365.png" alt="" /></td> }

                    <td>
                    <Link to={`/perfil/${player._id}`}>
                        <Button
                          className={stilo.boton}
                          size="sm"
                          color="success"
                        >
                          VER
                        </Button>
                      </Link>
                     
                    </td>
                   
                  </tr>
                   
                ))}
               
          </tbody>
          
        </Table>
        {jugadores.filter(SearchTerm(termino.toLowerCase())).length === 0 && (
          <h5 className={stilo.not}>NO HAY JUGADORES...</h5>
        )}
      </div>
    </div>
  );
};
