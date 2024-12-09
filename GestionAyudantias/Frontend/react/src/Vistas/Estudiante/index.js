import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Momentaneo/Axios";
import "./estudiante.css";
import Navbar from "../../Componentes/Navbar";
import Footer from "../../Componentes/Footer";
import Carousel from "../../Componentes/componentes-estudiantes/Carrusel/Carousel";

// Función para capitalizar la primera letra de cada palabra
const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const VistaEstudiantes = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const [nombreEstudiante, setNombreEstudiante] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      axios.get(`http://localhost:8000/estudiante2/${username}`)
        .then((response) => {
          const data = response.data;
          console.log(response.data);
          const nombreCompleto = `${data.estudiante.nombres_estudiante} ${data.estudiante.apellido1_estudiante}`;
          const nombreEnMayusculas = capitalizeWords(nombreCompleto);
          setNombreEstudiante(nombreEnMayusculas);
        })
        .catch((error) => {
          console.error('Error al obtener los datos del servidor:', error);
        });
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="vista-estudiantes">
        <div className="contenido">
          <p style={{ fontSize: "25px", textAlign: "center" }}>
            {username ? `Bienvenido ${nombreEstudiante}` : "Bienvenido estudiante"}
          </p>
        </div>
        <Carousel />
        <Footer />
      </div>
    </>
  );
};

export default VistaEstudiantes;

