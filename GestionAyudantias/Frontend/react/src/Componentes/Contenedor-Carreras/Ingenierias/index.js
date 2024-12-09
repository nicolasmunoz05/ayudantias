import React, { useState, useEffect } from "react";
import "./index.css";
import imgarquitectura from "../../../assets/ing/arquitectura.png";
import imginfonrmatica from "../../../assets/ing/inf.png";
import imgconstruccion from "../../../assets/ing/construccion.png";
import Imgelectronica from "../../../assets/ing/electronica.png";
import imgcivil from "../../../assets/ing/civil.png";
import imgindustrial from "../../../assets/ing/civilindustrial.png";
import imgautomatizacion from "../../../assets/ing/automatizacion.png";
import imgcomputacion from "../../../assets/ing/ejecomputacion.png";
import imggeomensura from "../../../assets/ing/geomesura.png";
import imgejeindustrial from "../../../assets/ing/ejeindustrial.png";
import { NavLink } from "react-router-dom";
function Ingenierias() {
  const carrera = [
    {
      imagen: imgarquitectura,
      nombre: "Arquitectura",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imginfonrmatica,
      nombre: "Ingeniería Civil en Informática",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgconstruccion,
      nombre: "Ingenieria en Construcción",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: Imgelectronica,
      nombre: "Ingeniería Civil Electrónica",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgcivil,
      nombre: "Ingeniería Civil",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgcivil,
      nombre: "Construcción Civil (Vespertino)",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgindustrial,
      nombre: "Ingeniería Civil Industrial",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgautomatizacion,
      nombre: "Ingenieria en Automatización y Control(Vespertino)",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgcomputacion,
      nombre: "Ingeniería Ejecución En Computación E Informática",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imggeomensura,
      nombre: "Ingeniería Ejecución en Geomensura (Vespertino)",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgejeindustrial,
      nombre: "Ingeniería En Ejecución Industrial (Vespertino)",
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
        <div key={item.nombre} onClick={() => handleCarreraClick(item.nombre)}>
          <NavLink to="/encargado/623545233">
            <article className="tarjeta" key={item.nombre}>
              <img src={item.imagen} alt={item.nombre} className="" />
              <h2>{item.nombre}</h2>
              <p>{item.descripcion}</p>
            </article>
          </NavLink>
        </div>
      ))}
    </section>
  );
}

export default Ingenierias;
