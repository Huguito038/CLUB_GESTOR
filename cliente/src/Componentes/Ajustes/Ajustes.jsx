import React from 'react';
import stilo from "./Ajustes.module.css"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useState } from 'react';
import { updateAll } from '../Redux/actions';
import { useDispatch } from 'react-redux';

const Ajustes = () => {
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);
    const updateCarnets= async()=>{
        await dispatch(updateAll({carnet_impreso:false}))
        toggle2()
    }
    const updateCuotas = async()=>{
        await dispatch(updateAll({cuotas:{
            enero:false,
            febrero:false,
            marzo:false,
            abril:false,
            mayo:false,
            junio:false,
            julio:false,
            agosto:false,
            septiembre:false,
            octubre:false,
            noviembre:false,
            diciembre:false,
        },}))
        toggle()
    }
  
    return (
        <div className={stilo.contenedor}>
            <div className={stilo.titulo}><h2>Ajustes</h2></div>
            <ul>
                <li>Restaurar cuotas jugadores :<Button color="secondary" onClick={toggle}>Click</Button> </li>
                <li>Restaurar carnets impresos jugadores :<Button color="secondary" onClick={toggle2}>Click</Button> </li>
            </ul>
                <div>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>AVISO</ModalHeader>
                        <ModalBody>
                        Estas seguro que deseas resetear las cuotas de todos los jugadores?
                        Esta accion no tiene forma de deshacerse...
                        </ModalBody>
                        <ModalFooter>
                        <Button color="danger" onClick={()=>updateCuotas()}>
                            Si
                        </Button>{' '}
                        <Button color="secondary" onClick={toggle}>
                            Cancelar
                        </Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={modal2} toggle={toggle2}>
                        <ModalHeader toggle={toggle2}>AVISO</ModalHeader>
                        <ModalBody>
                        Estas seguro que deseas resetear la informacion de los carnets impresos?
                        Esta accion no tiene forma de deshacerse...
                        </ModalBody>
                        <ModalFooter>
                        <Button color="danger" onClick={()=>updateCarnets()}>
                            Si
                        </Button>{' '}
                        <Button color="secondary" onClick={toggle2}>
                            Cancelar
                        </Button>
                        </ModalFooter>
                    </Modal>
                </div>
    
        </div>
    );
}

export default Ajustes;
