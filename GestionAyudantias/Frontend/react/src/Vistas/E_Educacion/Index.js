import React from 'react';
import Navbar from  "../../Componentes/Navbar";
import Foooter from '../../Componentes/Footer/index.js';
import CienciasEducacion from '../../Componentes/Contenedor-Carreras/CienciasEducacion/index.js';

function Educacion() {
  return (
    <div>
      <Navbar/>
      <p>Encargado Ciencias de la Educación</p>
      <CienciasEducacion/>
      <Foooter/>
    </div>
  );
}

export default Educacion;