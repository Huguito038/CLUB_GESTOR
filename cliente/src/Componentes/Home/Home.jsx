import stilo from "../Home/Home.module.css";
import { getAllPlayers } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Deportes_list } from "../extras";
import AOS from "aos";
import {
  FcBusinessman,
  FcPrint,
  FcCalendar,
  FcPortraitMode,
  FcSportsMode,
  FcDribbble,
} from "react-icons/fc";

export default function Home() {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.jugadores);
  const [jugadores, setJugadores] = useState([]);
  const [comision, setComision] = useState([]);
  const [carnet_imp, setCarnetImp] = useState([]);
  const [jugadores_aldia, setJugadoresAlDia] = useState(0);

  useEffect(() => {
    async function getPlayers() {
      await dispatch(getAllPlayers());
    }
    getPlayers();
  }, []);

  useEffect(() => {
    const jugadoresFiltrados = players.filter(
      (e) => e.deporte !== "COMISION DIRECTIVA"
    );
    setJugadores(jugadoresFiltrados);

    const carnetImpFiltrados = players.filter((e) => e.carnet_impreso === true);
    setCarnetImp(carnetImpFiltrados);

    const comisionFiltrada = players.filter(
      (e) => e.deporte === "COMISION DIRECTIVA"
    );
    setComision(comisionFiltrada);

    const hoy = new Date(Date.now());
    const mesActual = hoy.getMonth() + 1;
    const jugadoresAlDia = verificar_alDia(jugadoresFiltrados, mesActual);
    setJugadoresAlDia(jugadoresAlDia);
  }, [players]);

  const verificar_alDia = (jugadores, mesActual) => {
    let contador = 0;

    for (const jugador of jugadores) {
      let cont = 0;

      for (let i = 0; i <= mesActual; i++) {
        const mes = obtenerNombreMes(i);
        if (jugador.cuotas[mes] === true) {
          cont++;
        }
      }

      if (cont >= mesActual - 1) {
        contador++;
      }
    }

    return contador;
  };

  function obtenerNombreMes(numeroMes) {
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    return meses[numeroMes];
  }

  return (
    <div className={stilo.contenedor}>
      <div>
        <div className={stilo.sections}>
          <div>
            <FcPortraitMode className={stilo.fa}></FcPortraitMode>
            <section className={stilo.linea}></section>
            <div>
              <h2>Jugadores en el Club</h2>
              <h2>{jugadores.length}</h2>
            </div>
          </div>
          <div>
            <FcCalendar className={stilo.fa}></FcCalendar>
            <section className={stilo.linea}></section>
            <div>
              <h2>Jugadores al dia</h2>
              <h2>{jugadores_aldia}</h2>
            </div>
          </div>
          <div>
            <FcPrint className={stilo.fa}></FcPrint>
            <section className={stilo.linea}>,</section>
            <div>
              <h2>Carnets Impresos</h2>
              <h2>{carnet_imp.length}</h2>
            </div>
          </div>
          <div>
            <FcSportsMode className={stilo.fa}></FcSportsMode>
            <section className={stilo.linea}>,</section>
            <div>
              <h2>Deportes en el Club</h2>
              <h2>{Deportes_list.length}</h2>
            </div>
          </div>
          <div>
            <FcBusinessman className={stilo.fa}></FcBusinessman>
            <section className={stilo.linea}>,</section>
            <div>
              <h2>Miembros de Comision</h2>
              <h2>{comision.length}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
