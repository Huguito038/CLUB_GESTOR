import { useParams } from "react-router";
import stilo from "../Jugador/jugador.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { infoPlayer } from "../Redux/actions";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updatePlayer } from "../Redux/actions";
import { deletePlayer } from "../Redux/actions";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import { Alert, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrashAlt, FaPrint} from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import { cleanInfoPlayer } from "../Redux/actions";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import React from "react";
import QRCode from "react-qr-code";
import logo from "../Jugador/escudo.png"
import { Deportes } from "../extras";
import { cuotas } from "../extras";
import plus from "./plus.png"

export const Jugador = () => {
  const componentRef = useRef();
  const componentRef2 = useRef();
  const [modal2, setModal2] = useState(false);
  const [selectedDeporte, setSelectedDeporte] = useState("");
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "carnet_tiro",
    onAfterPrint: () => {
      window.location.reload();
    },
  });
  const toogleOtros = ()=> setOtros(!otros)
  const toggles = () => setModal2(!modal2);
  const handlePrint2 = useReactToPrint({
    content: () => componentRef2.current,
    documentTitle: "carnet_tiro",
  });
  const ClikUpdate = async () => {
    handlePrint();
    await dispatch(
      updatePlayer({
        _id: info._id,
        carnet_impreso: true,
        carnet_pago: true,
      })
    );
  };
  const handleCuotaChange = (event) => {
    const cuota = event.target.name;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedCuotas([...selectedCuotas, cuota]);
    } else {
      setSelectedCuotas(selectedCuotas.filter((item) => item !== cuota));
    }
  };
  

  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const [modal, setModal] = useState(false);
  const [otros, setOtros] = useState(false);
  const [selectedCuotas, setSelectedCuotas] = useState([]);
  const [valorCuota, SetValorCuota] = useState("");
  const [alertDelete, setAlertD] = useState(false);
  const [comision, setComision] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const dispatch = useDispatch();
  const { id } = useParams();
  const info = useSelector((state) => state.perfil);
  

  useEffect(() => {
    dispatch(infoPlayer(id));
    return () => {
      dispatch(cleanInfoPlayer());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!modal2) setSelectedCuotas([]);
  }, [modal2]);

  useEffect(() => {
    if (info) {
      setValue("_id", info._id);
      setValue("nombre", info.nombre);
      setValue("direccion", info.direccion);
      setValue("telefono", info.telefono);
      setValue("documento", info.documento);
      setValue("fecha_nacimiento", info.fecha_nacimiento);
      setValue("categoria", info.categoria);
      setValue("deporte", info.deporte);
      setSelectedDeporte(info.deporte);
      setValue("otros",info.otros);
      if (info.deporte === "COMISION DIRECTIVA") {
        setComision(true);
      }
      setValue("carnet_pago", info.carnet_pago);
      if (info.cuotas) {
        Object.keys(info.cuotas).forEach((cuota) => {
          setValue(`cuotas.${cuota}`, info.cuotas[cuota]);
        });
      }
    }
  }, [info, setValue]);

  const Habilitado = watch("carnet_pago");

  const onSubmit = handleSubmit(async (data) => {
    if (data.deporte !== "Futbol") {
      data.categoria = "";
    }
    await dispatch(updatePlayer(data));
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 1500);
  });

  const DeleteF = async () => {
    try {
      await dispatch(deletePlayer(info._id));
      setAlertD(true);
      setModal(!modal);
      setTimeout(() => {
        setAlert(false);
        if (comision) navigate("/comisionD");
        if (!comision) navigate("/allplayers");
      }, 1200);
    } catch (error) {}
  };

  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);
  const fecha = hoy.toLocaleDateString();

  const toggle = () => setModal(!modal);
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

  const goBack = () => {
    window.history.back();
  };

  const valor = valorCuota * selectedCuotas.length;

  return (
    <div className={stilo.contenedor}>
      <div ref={componentRef2} className={stilo.cont}>
        <div className={stilo.parte_tiro}>
          <h2>RECIBO DE</h2>
          <h4>{info.nombre}</h4>
          <h2>UN TOTAL DE</h2>
          <h4>${valor}.00</h4>
          <h2>PERTENECE A</h2>
          <h4>{info?.deporte}</h4>
        </div>
        <div className={stilo.parte_jugador}>
          <div className={stilo.titu}>
            <h2>RECIBO</h2>
            <h4>COSQUIN {fecha}</h4>
          </div>
          <div className={stilo.reciv}>
            <h3>RECIBI DE</h3>
            <h4>{info.nombre}</h4>
            <h3>UN TOTAL DE</h3>
            <h4>${valor}.00</h4>
          </div>

          <h3>PERTENECE A {info?.deporte?.toUpperCase()}</h3>
          <h4>EN CONCEPTO DE CUOTA/S </h4>
          <h5>({selectedCuotas.join("/")})</h5>
          <img
            src={logo}
            alt=""
          />
        </div>
      </div>
      <FaArrowAltCircleLeft onClick={goBack} className={stilo.arrow}></FaArrowAltCircleLeft>
      <div className={stilo.contendor_carnet}>
        <div ref={componentRef} className={stilo.contenedor_info_carnet}>
          <h4>{info.nombre}</h4>
          <h5>{info.documento}</h5>
          <div>
            <QRCode
              fgColor="#000000"
              bgColor="#00FF0000"
              className={stilo.qr_carnet}
              value={"https://club-gestor.vercel.app/datos/" + info._id}
            ></QRCode>
          </div>
        </div>
      </div>
      {alert && (
        <Alert className={stilo.alert}>
          <h4 className="alert-heading">¡JUGADOR MODIFICADO CON EXITO!</h4>
          <p>
            Se ha completado la modificacion de este jugador en la base de
            datos.
          </p>
        </Alert>
      )}
      {alertDelete && (
        <Alert color="danger" className={stilo.alert}>
          <h4 className="alert-heading">HAS BORRADO CON EXITO...</h4>
          <p>Se ha borrado con exito el jugador de la base de datos.</p>
        </Alert>
      )}
      {otros && (
         <div className={stilo.card}>
         <div className={stilo.header}>
           
           <div className={stilo.content}>
             <span className={stilo.title}>OTROS DATOS</span>
             <p className={stilo.message}>
              <textarea
              {...register("otros", { required: false })}>
              </textarea>
             </p>
           </div>
           <div className={stilo.actions}>
             <button
               className={stilo.desactivate}
               type="button"
               onClick={toogleOtros}
             >
               CERRAR
             </button>
             
           </div>
         </div>
   
       </div>
        )}

      <div className={stilo.cont_centr}>
        <form onSubmit={onSubmit} autoComplete="off" spellCheck="false">
          <input style={{ display: "none" }} type="text" {...register("_id")} />

          <input
            className={stilo.input_name}
            type="text"
            {...register("nombre")}
          />
          <div className={stilo.info_second}>
            {selectedDeporte === "Futbol" && (
              <div>
                <h2>Categoria:</h2>

                <select
                  className={stilo.input_secondari}
                  {...register("categoria", { required: true })}
                >
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
            {!comision && (
              <div>
                <h2>Documento:</h2>
                <input
                  className={stilo.input_secondari}
                  type="text"
                  {...register("documento")}
                />
              </div>
            )}

            {!comision && (
              <div>
                <h2>Carnet Pago:</h2>
                <label className={stilo.switch}>
                <input
                  type="checkbox"
                  className={stilo.checkbox}
                  {...register("carnet_pago")}
                />
                 <span className={stilo.slider}></span>
             </label>
              </div>
            )}
            <div>
              {!comision && info.carnet_impreso && (
                <div className={stilo.carnet_impre}>
                  <h2>Carnet Impreso: </h2>
                  <img
                    className={stilo.imge}
                    src="https://cdn.icon-icons.com/icons2/317/PNG/512/sign-check-icon_34365.png"
                    alt=""
                  />
                </div>
                
              )}
              {!comision && !info.carnet_impreso && (
                <div className={stilo.carnet_impre}>
                  <h2>Carnet Impreso: </h2>
                  <img
                    className={stilo.imge}
                    src="https://cdn.icon-icons.com/icons2/317/PNG/512/sign-error-icon_34362.png"
                    alt=""
                  />
                </div>
              )}
            </div>
            <button type="button" className={stilo.boton_otros} onClick={toogleOtros}>OTROS</button>
          </div>
          {!comision && (
            <div className={stilo.info_secundaria}>
              <div>
                <h2>Deporte:</h2>
                <select
                  className={stilo.input_secondari}
                  {...register("deporte", { required: true })}
                  onChange={(e) => setSelectedDeporte(e.target.value)}
                >
                  <option value="" disabled>
                    Selecciona un deporte...
                  </option>
                  {Deportes.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {comision && (
            <h4 className={stilo.comision_t}>COMISION DIRECCTIVA</h4>
          )}
          <div className={stilo.info_secundaria}>
            <div>
              <h2>Telefono:</h2>
              <input
                className={stilo.input_secondari}
                type="text"
                {...register("telefono")}
              />
            </div>
          </div>
         
          <div className={stilo.info_secundaria}>
            <div>
              <h2>Direccion:</h2>
              <input
                className={stilo.input_secondari}
                type="text"
                {...register("direccion")}
              />
            </div>
          </div>
          <div className={stilo.info_secundaria}>
            <div>
              <h2>Fecha de Nacimiento:</h2>
              <input
                className={stilo.input_secondari}
                type="date"
                {...register("fecha_nacimiento")}
              />
            </div>
          </div>
          {comision && (
            <div className={stilo.info_secundaria}>
              <div>
                <h2>Documento:</h2>
                <input
                  className={stilo.input_secondari}
                  type="text"
                  {...register("documento")}
                />
              </div>
            </div>
          )}

          {!comision && (
            <div className={stilo.info_secundaria}>
              <div className={stilo.couter}>
                <h2>Cuotas:</h2>
                {info.cuotas &&
                  Object.keys(info.cuotas).map((cuota) => (
                    <label className={stilo.cuota} key={cuota}>
                      {cuota.charAt(0).toUpperCase() + cuota.slice(1)}
                      <input
                        className={stilo.mycheck}
                        type="checkbox"
                        {...register(`cuotas.${cuota}`)}
                      />
                    </label>
                  ))}
              </div>
            </div>
          )}
          
          <div className={stilo.alin_bot}>
            {!comision && (
              <Button
                className={stilo.imprimir2}
                color="secondary"
                onClick={toggles}
              >
                <FaPrint></FaPrint>
                IMPRIMIR RECIBO
              </Button>
            )}
            <Button className={stilo.succes} type="submit" color="success">
              GUARDAR
            </Button>
            <Button className={stilo.clear} color="danger" onClick={toggle}>
              <FaTrashAlt className={stilo.basura}></FaTrashAlt>
            </Button>
            {!comision && (
              <Button
                className={stilo.imprimir}
                onClick={ClikUpdate}
                color="secondary"
                disabled={!Habilitado}
              >
                <FaPrint></FaPrint>
                IMPRIMIR CARNET
              </Button>
            )}
            {comision && (
              <Button
                className={stilo.imprimir}
                onClick={ClikUpdate}
                color="secondary"
              >
                <FaPrint></FaPrint>
                IMPRIMIR CARNET
              </Button>
            )}
          </div>
        </form>
        
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader className={stilo.modalheader} toggle={toggle}>
            ¡AVISO!
          </ModalHeader>
          <ModalBody className={stilo.modalbody}>
            ESTAS SEGURO QUE DESEAS ELIMINAR DE MANERA DEFINITAIVAMENTE A
            <h6 className={stilo.nombre_delete}>{info.nombre}</h6> DE LA BASE DE
            DATOS?
          </ModalBody>
          <ModalFooter className={stilo.modalfooter}>
            <Button color="danger" onClick={DeleteF}>
              <FaTrashAlt></FaTrashAlt>
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modal2} toggle={toggles}>
          <ModalHeader className={stilo.modalheader2} toggle={toggles}>
            GENERAR RECIBO 
          </ModalHeader>
          <ModalBody className={stilo.modalbody}>
          <div className={stilo.inputGroup}>
      <input
        type="text"
        required
        autoComplete="off"
        onChange={(e) => SetValorCuota(e.target.value)}
        id="name"
        value={valorCuota}
        className={stilo.inputField}
      />
      <label htmlFor="name" className={stilo.inputLabel}>
        Valor Cuota $
      </label>
    </div>
            <div>
              <Table className={stilo.tablo}>
                <thead>
                  <tr>
                    <th>Mes</th>
                    <th>Paga</th>
                  </tr>
                </thead>
                {cuotas.map((cuota) => (
                  <tbody key={cuota}>
                    <tr>
                      <td>{cuota}</td>
                      <td>
                      <label className={stilo.container2}>
                        <input
                          type="checkbox"
                          name={cuota}
                          className={stilo.checka}
                          checked={selectedCuotas.includes(cuota)}
                          onChange={handleCuotaChange}
                        />
                        <div className={stilo.checkmark}></div>
                        </label>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            </div>
          </ModalBody>
          <ModalFooter className={stilo.modalfooter}>
            <Button color="secondary" onClick={handlePrint2}>
              IMPRIMIR RECIBO
            </Button>
          </ModalFooter>
        </Modal>
        
      </div>
    </div>
  );
};
