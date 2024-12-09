import React, { useState, useEffect } from "react";
import "./index.css";
import imggeologia from "../../../assets/cienbasi/geologia.png";
import imgestadistica from "../../../assets/cienbasi/estadisticas.png";
import imgmatematica from "../../../assets/cienbasi/matematica.png";
import imgciencias from "../../../assets/cienbasi/ciencias.png";
import imgmatecompu from "../../../assets/cienbasi/matemacompu.png";
import { NavLink } from "react-router-dom";
function CienciasBasicas() {
  const carrera = [
    {
      imagen: imggeologia,
      nombre: "Geología",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgestadistica,
      nombre: "Ingeniería en Estadística",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgmatematica,
      nombre: "Ingeniería Matemática",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgciencias,
      nombre: "Pedagogía en Ciencias",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgmatecompu,
      nombre: "Pedagogía en Matemática y Computación",
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
        <NavLink to="/encargado/122956847">
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
export default CienciasBasicas;
