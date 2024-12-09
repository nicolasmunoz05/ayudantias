import React from 'react';
import Navbar from  "../../Componentes/Navbar";
import Foooter from '../../Componentes/Footer/index.js';
import Ingenierias from '../../Componentes/Contenedor-Carreras/Ingenierias/index.js';

function EIngenieria() {
  return (
    <div>
      <Navbar/>
      <p>Encargado Ciencias de la Ingenieria</p>
      <Ingenierias/>
      <Foooter/>
    </div>
  );
}

export default EIngenieria;