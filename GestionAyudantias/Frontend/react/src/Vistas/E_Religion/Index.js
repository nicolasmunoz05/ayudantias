import React from 'react';
import Navbar from  "../../Componentes/Navbar";
import Foooter from '../../Componentes/Footer/index.js';
import CienciasReligiosas from '../../Componentes/Contenedor-Carreras/CienciasReligiosas/index';

function EReligion() {
  return (
    <div>
      <Navbar/>
      <p>Encargado Ciencias Religiosas y Filosoficas</p>
      <CienciasReligiosas/>
      <Foooter/>
    </div>
  );
}

export default EReligion;