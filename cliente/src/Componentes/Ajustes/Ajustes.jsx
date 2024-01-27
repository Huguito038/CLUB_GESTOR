import React from "react";
import stilo from "./Ajustes.module.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState } from "react";
import { updateAll } from "../Redux/actions";
import { useDispatch } from "react-redux";
import image from "./ajustes2.svg"

const Ajustes = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);
  const updateCarnets = async () => {
    await dispatch(updateAll({ carnet_impreso: false }));
    toggle2();
  };
  const updateCuotas = async () => {
    await dispatch(
      updateAll({
        cuotas: {
          enero: false,
          febrero: false,
          marzo: false,
          abril: false,
          mayo: false,
          junio: false,
          julio: false,
          agosto: false,
          septiembre: false,
          octubre: false,
          noviembre: false,
          diciembre: false,
        },
      })
    );
    toggle();
  };

  return (
    <div className={stilo.contenedor}>
      <div className={stilo.titulo}>
        <h2>Ajustes</h2>
      </div>
      <ul>
        <li>
          <button className={stilo.button2} onClick={toggle}><span>Restaurar cuotas jugadores</span>
          </button>{" "}
        </li>
        <li>
          <button className={stilo.button2} onClick={toggle2}><span>Restaurar carnets impresos jugadores</span>
          </button>{" "}
        </li>
      </ul>
      <div>
        {modal && (
          <div className={stilo.card}>
            <div className={stilo.header}>
              <div className={stilo.image}>
                <svg
                  aria-hidden="true"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </div>
              <div className={stilo.content}>
                <span className={stilo.title}>Resetear Cuotas</span>
                <p className={stilo.message}>
                  Estas seguro que deseas resetar las cuotas de todos los jugadores, esta accion no se puede deshacer.
                </p>
              </div>
              <div className={stilo.actions}>
                <button
                  className={stilo.desactivate}
                  type="button"
                  onClick={() => updateCuotas()}
                >
                  ACEPTAR
                </button>
                <button className={stilo.cancel} type="button" onClick={toggle}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

{modal2 && (
          <div className={stilo.card}>
            <div className={stilo.header}>
              <div className={stilo.image}>
                <svg
                  aria-hidden="true"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </div>
              <div className={stilo.content}>
                <span className={stilo.title}>Resetear Carnets</span>
                <p className={stilo.message}>
                  Estas seguro que deseas resetar los carnets de todos los jugadores, esta accion no se puede deshacer.
                </p>
              </div>
              <div className={stilo.actions}>
                <button
                  className={stilo.desactivate}
                  type="button"
                  onClick={() => updateCarnets()}
                >
                  ACEPTAR
                </button>
                <button className={stilo.cancel} type="button" onClick={toggle2}>
                  Cancelar
                </button>
              </div>
            </div>
      
          </div>
)}
</div>
<img src={image} alt="" />
</div>)}

export default Ajustes;
