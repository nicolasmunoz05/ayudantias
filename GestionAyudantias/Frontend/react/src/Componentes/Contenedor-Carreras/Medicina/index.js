import React, { useState, useEffect } from "react";
import "./index.css";
import imgbiome from "../../../assets/medi/biomedico.png";
import imgbiomedica from "../../../assets/medi/biome.png";
import imgmedicina from "../../../assets/medi/medico.png";
import imgquimi from "../../../assets/medi/farmacia.png";
import { NavLink } from "react-router-dom";

function Medicina() {
  const carrera = [
    {
      imagen: imgbiome,
      nombre: "BACHILLERATO EN CIENCIAS BIOMÉDICAS",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgbiomedica,
      nombre: "BIOINGENIERÍA MÉDICA",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgmedicina,
      nombre: "MEDICINA",
      descripcion: "Ver Postulantes a Ayudantias",
    },
    {
      imagen: imgquimi,
      nombre: "QUÍMICA Y FARMACIA",
      descripcion: "Ver Postulantes a Ayudantias",
    },
  ];

  const [selectedCarrera, setSelectedCarrera] = useState(null);

  useEffect(() => {   
 }, [selectedCarrera]);

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
          <NavLink to={`/encargado/${item.nombre}`}>
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

// Exporta la variable selectedCarrera


export default Medicina;



// import React, { useState } from "react";
// import "./index.css";
// import imgbiome from "../../../assets/medi/biomedico.png";
// import imgbiomedica from "../../../assets/medi/biome.png";
// import imgmedicina from "../../../assets/medi/medico.png";
// import imgquimi from "../../../assets/medi/farmacia.png";
// import CompShowEstudianteEncargado from "../../../Vistas/Tabla_encargado/ShowEstudianteEncargado"; 
// import { NavLink } from "react-router-dom";

// function Medicina() {
//   const carreras = [
//     {
//       imagen: imgbiome,
//       nombre: "BACHILLERATO EN CIENCIAS BIOMÉDICAS",
//       descripcion: "Ver Postulantes a Ayudantias",
//     },
//     {
//       imagen: imgbiomedica,
//       nombre: "BIOINGENIERÍA MÉDICA",
//       descripcion: "Ver Postulantes a Ayudantias",
//     },
//     {
//       imagen: imgmedicina,
//       nombre: "MEDICINA",
//       descripcion: "Ver Postulantes a Ayudantias",
//     },
//     {
//       imagen: imgquimi,
//       nombre: "QUÍMICA Y FARMACIA",
//       descripcion: "Ver Postulantes a Ayudantias",
//     },
//   ];

//   const [selectedCarrera, setSelectedCarrera] = useState(null);
//   const handleCarreraClick = (nombre) => {
//     setSelectedCarrera(nombre);
//   console.log(selectedCarrera);
//   };

//   return (
//     <div>
//       <section className="contenedor-tarjeta">
//         {carreras.map((item) => (
//           <div key={item.nombre} onClick={() => handleCarreraClick(item.nombre)}>
//             <NavLink to={`/encargado/${item.nombre}`}>
//               <article className="tarjeta" key={item.nombre}>
//                 <img src={item.imagen} alt={item.nombre} className="" />
//                 <h2>{item.nombre}</h2>
//                 <p>{item.descripcion}</p>
//               </article>
//             </NavLink>
//           </div>
//         ))}
//       </section>
//       {selectedCarrera && <CompShowEstudianteEncargado selectedCarrera={selectedCarrera} />}
//     </div>
//   );
// }

// export default Medicina;
