import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Vpostulacion.css";
import Navbar from "../../Componentes/Navbar";
import Footer from "../../Componentes/Footer";
import FormularioE from "../../Componentes/componentes-estudiantes/FormularioE/FormularioE";

const VistaEstudiantes = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="vista-estudiantes">
        <div className="contenido">
          {
            <p style={{ fontSize: "25px", textAlign: "center" }}>
              {" "}
              Bienvenido estudiante
            </p>
          }
        </div>
        <FormularioE/>
        <Footer />
      </div>
    </>
  );
}

export default VistaEstudiantes;