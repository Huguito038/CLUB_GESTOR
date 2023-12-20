import React, { useEffect } from 'react';
import stilo from "./qrreader.module.css"
import { useState } from 'react';
import {Html5QrcodeScanner} from "html5-qrcode";


const Qrreader = () => {
    useEffect(() => {
        const qrCodeScanner = new Html5QrcodeScanner(
          'qr-reader', // ID del elemento HTML donde se mostrará la cámara y el resultado del escaneo.
          { fps: 20, qrbox: 250 } // Configuración opcional
        );
    
        qrCodeScanner.render();
    
        // Agregar manejo de eventos, como onScan y onError, según sea necesario
       
    
        
    
        // Limpieza al desmontar el componente
        return () => {
          qrCodeScanner.stop();
        };
      }, []);
    
      return (
        <div id="qr-reader" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}></div>
      );
    };
    

export default Qrreader;
