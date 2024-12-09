import React from 'react'
import './encargado.css';
import Navbar from '../../Componentes/Navbar';
import Foooter from '../../Componentes/Footer';
import CompShowEstudianteEncargado from '../../Vistas/Tabla_encargado/ShowEstudianteEncargado';
function TablaPostulantes() {
  // Datos ficticios de los postulantes
  

  return (
    <div className="tabla-postulantes">
    <Navbar />
      <h1>Estudiantes de su Facultad</h1>
      <CompShowEstudianteEncargado></CompShowEstudianteEncargado>
      <Foooter/>
    </div>
  );
}

export default TablaPostulantes;
