import React, { useState, useEffect } from "react";
import PPA from "../../../assets/carousel/PPA.png";
import postula from "../../../assets/carousel/postula.png";
import "./Carousel.css";
import { NavLink } from "react-router-dom";

const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [postula, PPA]; // Rutas de las imágenes

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => {
      clearInterval(interval); // Limpieza del temporizador al desmontar el componente
    };
  }, []);

  return (
    <div className="image-slider-container">
      <div className="image-container-first">
        <NavLink to="formularioE">
          <img
            src={images[0]}
            alt="Imagen Carrusel"
            className="carousel-image"
          />
        </NavLink>
      </div>
      <div className="image-container-second">
        <NavLink to="Preguntas">
          <img
            src={images[1]}
            alt="Imagen Carrusel"
            className="carousel-image"
          />
        </NavLink>
      </div>
    </div>
  );
  
};

export default ImageSlider;
