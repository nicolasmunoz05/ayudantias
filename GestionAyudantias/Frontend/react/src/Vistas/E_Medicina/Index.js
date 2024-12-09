import React from 'react';
import Navbar from  "../../Componentes/Navbar";
import Foooter from '../../Componentes/Footer/index.js';
import Medicina from '../../Componentes/Contenedor-Carreras/Medicina/index.js';

function EMedicina() {
  return (
    <div>
      <Navbar/>
      <p>Encargado Medicina</p>
      <Medicina/>
      <Foooter/>
    </div>
  );
}

export default EMedicina;