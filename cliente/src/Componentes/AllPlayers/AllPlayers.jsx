import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlayers } from "../Redux/actions";
import stilo from "../AllPlayers/AllPlayers.module.css";
import { Table } from "reactstrap";
import { Button} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Deportes_list} from "../extras";
import { FiX } from "react-icons/fi";



export const AllPlayers = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.jugadores);
  const [termino, setTermino] = useState("");
  const [selectedSport, setSelectedSport] = useState('')
  const [selectedCat, setSelectedCat] = useState('')
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
  const handleSportChange = (event) => {
    setSelectedSport(event.target.value);
  };
  const handleCatChange = (event) => {
    setSelectedCat(event.target.value);
  
  };

  const filteredPlayers = jugadores.filter((player) => {
    if (!selectedSport) {
      return true;
    }
    
    if(selectedCat){
      return player.categoria === selectedCat
    }

    if(selectedSport==="TODOS"){
      return player.deporte
    }
    return player.deporte === selectedSport;
  });

  useEffect(() => {
    setJugadores(players.filter(e=>e.deporte!=="COMISION DIRECTIVA"));
  }, [players]);

  useEffect(()=>{
      setSelectedCat("")
  },[selectedSport])

  
  
  return (
    <div className={stilo.contenedor}>
        <div className={stilo.filtrado}>
        
        <input
            placeholder="Busqueda por Nombre..."
            type="text"
            onChange={(e) => setTermino(e.target.value)}
          />
          <select value={selectedSport} onChange={handleSportChange}>
            <option value="" disabled>Seleccion por deporte...</option>
            <option value="TODOS">TODOS</option>
          {Deportes_list.map((cat) => (
                <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
          </select>
          {selectedSport === "Futbol" && (
              <div>
              
           
            <select value={selectedCat} onChange={handleCatChange}>
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
                          <div className={stilo.circulo_verde}>h</div>
                        ) : (
                          <div className={stilo.circulo_rojo}>h</div>
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
