import React, { useState, useEffect } from "react";
import "./index.css";
import imgagronomia from "../../../assets/agra/agronomia.png";
import imgbiotecnologia from "../../../assets/agra/biotecnologia.png";
import imgrecursosnaturales from "../../../assets/agra/recursosnaturales.png";
import Imgveterinaria from "../../../assets/agra/veterinaria.png";
import { NavLink } from "react-router-dom";
function Agrarias() {
  const carrera = [
    {
      imagen: imgagronomia,
      nombre: "Agronomía",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgbiotecnologia,
      nombre: "Ingeniería en Biotecnología",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgrecursosnaturales,
      nombre: "Ingeniería en Recursos Naturales",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: Imgveterinaria,
      nombre: "Medicina Veterinaria",
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
        <NavLink to="/encargado/207410935">
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
export default Agrarias;
