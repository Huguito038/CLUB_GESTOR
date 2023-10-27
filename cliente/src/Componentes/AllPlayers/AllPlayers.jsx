import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlayers } from "../Redux/actions";
import stilo from "../AllPlayers/AllPlayers.module.css";
import { Table } from "reactstrap";
import { Button} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Deportes_list} from "../extras";
import { SelectSport } from "../Redux/actions";
import { SelectCat } from "../Redux/actions";
import { FiX } from "react-icons/fi";



export const AllPlayers = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.jugadores)
  const sport = useSelector((state)=> state.selectSport)
  const cat = useSelector((state)=>state.selectCat)
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
  const categorias = [
    { label: "Primera Masculina", value: "1M" },
    { label: "Primera Femenina", value: "1F" },
    { label: "Reserva Masculina", value: "2M" },
    { label: "Reserva Femenina", value: "2F" },
    { label: "Cuarta Categoria", value: "4" },
    { label: "Quinta Categoria", value: "5" },
    { label: "Sexta Categoria", value: "6" },
    { label: "Septima Categoria", value: "7" },
    { label: "Octava Categoria", value: "8" },
    { label: "Novena Categoria", value: "9" },
  ];
  const handleSportChange = async(event) => {
    await dispatch(SelectSport(event.target.value))
  };
  const handleCatChange = async(event) => {
    await dispatch(SelectCat(event.target.value));
  
  };

  const filteredPlayers = jugadores.filter((player) => {
    if (!sport) {
      return true;
    }
    
    if(cat){
      return player.categoria === cat
    }

    if(sport==="TODOS"){
      return player.deporte
    }
    return player.deporte === sport;
  });

  useEffect(() => {
    setJugadores(players.sort((a, b) => {
      const nombreA = a.nombre.toLowerCase();
      const nombreB = b.nombre.toLowerCase();
      
      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1;
      }
      return 0;
    }))
    setJugadores(players.filter(e=>e.deporte!=="COMISION DIRECTIVA"))
  }, [players]);



  
  
  return (
    <div className={stilo.contenedor}>
        <div className={stilo.filtrado}>
        
        <input
            placeholder="Busqueda por Nombre..."
            type="text"
            onChange={(e) => setTermino(e.target.value)}
          />
          <select value={sport} onChange={handleSportChange}>
            <option value="" disabled>Seleccion por deporte...</option>
            <option value="TODOS">TODOS</option>
          {Deportes_list.map((cat) => (
                <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
          </select>
          {sport === "Futbol" && (
              <div>
              
           
            <select value={cat} onChange={handleCatChange}>
              <option value="" disabled>
                Selecciona una categoría
              </option>
              {categorias.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            </div>
            )}
        </div>
      
     
      <div
        className={stilo.contenedor_tabla}
        style={{ maxHeight: "700px", overflowY: "scroll" }}
      >
        <Table size="sm" responsive hover striped className={stilo.tabla}>
          <thead className={stilo.thead}>
            <tr className={stilo.titulos2}>
              <th>Nombre</th>
              <th>CUOTAS</th>
              <th>Deporte</th>
              <th>CARNET IMPRESO</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers &&
              filteredPlayers
                .filter(SearchTerm(termino.toLowerCase()))
                .map((player) => (
                  <tr key={player._id}>
                    <td className={stilo.nombre}>{player.nombre}</td>
                    <td> {Object.entries(player.cuotas).map(([mes, valor]) => (
                      <div key={mes} style={{ display: 'inline-block', marginRight: '10px' }}>
                        {valor ? (
                          <div className={stilo.circulo_verde}></div>
                        ) : (
                          <div className={stilo.circulo_rojo}></div>
                        )}
                      </div>
                    ))}</td>
                    <td className={stilo.nombre}>{player.deporte}</td>
                    
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
        {filteredPlayers.filter(SearchTerm(termino.toLowerCase())).length === 0 && (
          <h5 className={stilo.not}>NO HAY JUGADORES...</h5>
        )}
      </div>
    </div>
  );
};
