import React from 'react';
import Navbar from  "../../Componentes/Navbar";
import Foooter from '../../Componentes/Footer/index.js';
import Salud from '../../Componentes/Contenedor-Carreras/Salud/index.js';

function ESalud() {
  return (
    <div>
      <Navbar/>
      <p>Encargado Ciencias de la Salud</p>
      <Salud/>
      <Foooter/>
    </div>
  );
}

export default ESalud;