import {useReactToPrint} from "react-to-print"
import { useEffect, useRef } from "react"
import React from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import stilo from "../CrearImprimida/Print.module.css"


export const Print = ({nombre,documento,Link})=>{
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content:()=>componentRef.current,
        documentTitle:"carnet_tiro",
    })
    useEffect(()=>{
        handlePrint()
    },[])
    return(
        <div className={stilo.contendor_carnet}>
            <div ref={componentRef} className={stilo.contenedor_info_carnet}>
                <h4>{nombre}</h4>
                <h5>{documento}</h5>
                <div>
                    <QRCode fgColor="#000000"
                    bgColor="#00FF0000"className={stilo.qr_carnet}value={Link}></QRCode>
                </div>
             </div>
        </div>

    )
}