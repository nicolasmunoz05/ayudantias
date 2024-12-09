import React from 'react';
import Navbar from  "../../Componentes/Navbar";
import Foooter from '../../Componentes/Footer/index.js';
import CienciasBasicas from '../../Componentes/Contenedor-Carreras/CienciasBasicas/index.js';

function EBasicas() {
  return (
    <div>
      <Navbar/>
      <p>Encargado Ciencias Basicas</p>
      <CienciasBasicas/>
      <Foooter/>
    </div>
  );
}

export default EBasicas;