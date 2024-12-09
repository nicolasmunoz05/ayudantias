import React from 'react';
import Navbar from  "../../Componentes/Navbar";
import Foooter from '../../Componentes/Footer/index.js';
import CienciasSociales from '../../Componentes/Contenedor-Carreras/CienciasSociales/index.js';

function ESociales() {
  return (
    <div>
      <Navbar/>
      <p>Encargado Ciencias Sociales y Económicas</p>
      <CienciasSociales/>
      <Foooter/>
    </div>
  );
}

export default ESociales;