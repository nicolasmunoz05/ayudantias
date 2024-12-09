import React, { useState, useEffect } from "react";
import "./index.css";
import imgreligion from "../../../assets/religion/religiones.png";
import { NavLink } from "react-router-dom";
function CienciasReligiosas() {
  const carrera = [
    {
      imagen: imgreligion,
      nombre: "Pedagogía en Religión y Filosofía",
      descripcion: "Ver Postulantes a Ayudantias",
    },
  ];
  const [selectedCarrera, setSelectedCarrera] = useState(null);

  useEffect(() => {}, [selectedCarrera]);
  const handleCarreraClick = (nombre) => {
    setSelectedCarrera(() => {
      localStorage.setItem("nombreCarrera", nombre);
      console.log(nombre);
      return nombre;
    });
  };
  return (
    <section className="contenedor-tarjeta">
      {carrera.map((item) => (
        <NavLink to="/encargado/207892351">
          <article
            className="tarjeta"
            key={item.nombre}
            onClick={() => handleCarreraClick(item.nombre)}
          >
            <img src={item.imagen} alt={item.nombre} className="" />
            <h2>{item.nombre}</h2>
            <p>{item.descripcion}</p>
          </article>
        </NavLink>
      ))}
    </section>
  );
}
export default CienciasReligiosas;
