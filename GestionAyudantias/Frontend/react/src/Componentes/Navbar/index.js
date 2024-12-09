// Navbar.js
import React, { useState } from "react";
import "./navbar.css";
import Logo from "../../assets/logo_ucm_marca.png";
import { useNavigate, useLocation } from "react-router-dom";
import { opcionesMenu } from "./opcionesMenu"; // Importa el archivo opcionesMenu

const Navbar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuHamburguesaDesplegado, setMenuHamburguesaDesplegado] =
    useState(false);
  const [menuUsuarioDesplegado, setMenuUsuarioDesplegado] = useState(false);

  const toggleMenuHamburguesa = () => {
    setMenuHamburguesaDesplegado(!menuHamburguesaDesplegado);
    setMenuUsuarioDesplegado(false);
  };

  const toggleMenuUsuario = () => {
    setMenuUsuarioDesplegado(!menuUsuarioDesplegado);
    setMenuHamburguesaDesplegado(false);
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
    console.log("Sesión cerrada");
  };

  const handleNavigateTo = (route) => {
    navigate(route);
  };

  const currentView = location.pathname.includes("admin")
    ? "Admin"
    : location.pathname.includes("encargado")
    ? "Encargado"
    : "Estudiante";

  return (
    <div className="header">
      <button onClick={toggleMenuHamburguesa} className="header-toggle2">
        ☰ Opciones
      </button>
      <div
        className={`opciones-admin ${menuHamburguesaDesplegado ? "mostrar" : ""}`}
        style={{ zIndex: 1000 }} // Ajusta el valor según sea necesario
      >
        <ul>
          {opcionesMenu[currentView].map((opcion, index) => (
            <li key={index} onClick={() => (opcion.label === "Cerrar Sesión" ? handleCerrarSesion() : handleNavigateTo(opcion.route))}>
              {opcion.label}
            </li>
          ))}
        </ul>
      </div>
      <img className="logo_ucm" src={Logo} alt="Logo" />
      <div className="header-user-menu">
        <button onClick={toggleMenuUsuario} className="header-toggle">
          ☰ Sesión
        </button>
        <div
          className={`header-menu ${menuUsuarioDesplegado ? "mostrar" : ""}`}
          style={{ zIndex: 1000 }} // Ajusta el valor según sea necesario
        >
          <ul>
            <li>
              <a
                href="https://gestion-clave.ucm.cl/#/actualizar"
                target="_blank"
                rel="noopener noreferrer"
                className="sin-subrayado"
              >
                Cambiar Contraseña
              </a>
            </li>
            <li onClick={handleCerrarSesion}>Cerrar Sesión</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
