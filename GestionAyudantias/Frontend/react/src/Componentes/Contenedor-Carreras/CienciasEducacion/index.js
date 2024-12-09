import React, { useState, useEffect } from "react";
import "./index.css";
import imgespecial from "../../../assets/ciencedu/eduespecial.png";
import imgedufisica from "../../../assets/ciencedu/edufisica.png";
import imgbasica from "../../../assets/ciencedu/basica.png";
import imgparvulo from "../../../assets/ciencedu/parvulo.png";
import imggeografia from "../../../assets/ciencedu/geografia.png";
import imgingles from "../../../assets/ciencedu/eng.png";
import imglenguaje from "../../../assets/ciencedu/lenguaje.png";
import { NavLink } from "react-router-dom";

function CienciasEducacion() {
  const carrera = [
    {
      imagen: imgespecial,
      nombre: "Pedagogía en Educación Especial - Talca",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgedufisica,
      nombre: "Pedagogía en Educación Física",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgbasica,
      nombre: "Pedagogía en Educación General básica con Mención - Sede Talca",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgparvulo,
      nombre: "Pedagogía en Educación Parvularia con Mención - Talca",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imggeografia,
      nombre: "Pedagogía en Historia, Geografía y Ciencias Sociales",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgingles,
      nombre: "Pedagogía en Inglés",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imglenguaje,
      nombre: "Pedagogía en Lengua Castellana y Comunicación",
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
        <NavLink to="/encargado/201712513">
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

export default CienciasEducacion;
