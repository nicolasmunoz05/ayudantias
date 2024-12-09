import React from 'react';
import Navbar from  "../../Componentes/Navbar";
import Foooter from '../../Componentes/Footer/index.js';
import Agrarias from '../../Componentes/Contenedor-Carreras/Agrarias/index';

function EAgraria() {
  return (
    <div>
      <Navbar/>
      <p>Encargado Ciencias Agrarias y Forestales</p>
      <Agrarias/>
      <Foooter/>
    </div>
  );
}

export default EAgraria;