import React, { useState, useEffect } from "react";
import "./index.css";
import imgempresas from "../../../assets/ciensoci/admempre.png";
import imgpublica from "../../../assets/ciensoci/admpublica.png";
import imgcontador from "../../../assets/ciensoci/contador.png";
import Imgcomercial from "../../../assets/ciensoci/comercial.png";
import imgsociologia from "../../../assets/ciensoci/sociologia.png";
import imgderecho from "../../../assets/ciensoci/dere.png";
import imgtrabajosoci from "../../../assets/ciensoci/trabajosocial.png";
import { NavLink } from "react-router-dom";
function CienciasSociales() {
  const carrera = [
    {
      imagen: imgempresas,
      nombre:
        "Ingeniería de Ejecución en Administración de Empresas (Vespertino)",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgpublica,
      nombre: "Administración Pública",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgcontador,
      nombre: "Contador Público y Auditor - Talca",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: Imgcomercial,
      nombre: "Ingeniería Comercial",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgsociologia,
      nombre: "Sociología",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgtrabajosoci,
      nombre: "Trabajo Social - Talca",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgcontador,
      nombre: "Contador Auditor (Vespertino) [Sin acceso paes]",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgderecho,
      nombre: "Derecho",
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
        <NavLink to="/encargado/201792513">
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

export default CienciasSociales;
