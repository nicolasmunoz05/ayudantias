import React, { useState } from "react";
import "./login.css";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "../../Componentes/Error/index.js";

const URI = "http://localhost:8000/login/";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Estado para controlar el mensaje de error
  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault(); // Evitar submit del formulario
    try {
      let datos = await axios.post(URI, {
        username: username,
        password: password,
      });

      if (datos.data.message.includes("estudiante")) {
        localStorage.setItem("token", datos.data.token);
         localStorage.setItem('username', username); // Guarda el nombre de usuario en localStorage
        navigate("/estudiante/");
      } else if (datos.data.message.includes("encargado")) {
        localStorage.setItem("token", datos.data.token);
        localStorage.setItem("username", username);
        navigate("/encargado" + username);
      } else if (datos.data.message.includes("admin")) {
        localStorage.setItem("token", datos.data.token);
        navigate("/admin/estudiante");
      }
    } catch (error) {
      setError(<Error message="Datos Incorrectos" />);
    }
  };

  return (
    <div className="login-container">
    <form className="form-container" onSubmit={store}>
      <section className="card">
        <h3>Ingrese sus credenciales</h3>

        <div>
          <input
            type="text"
            className="input"
            placeholder="Rut"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            className="input"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="button-container">
          <button type="submit">Acceder</button>

          {error && <p>{error}</p>}
        </div>
        <div>
          <p className="parrafo">
            <a href="https://gestion-clave.ucm.cl/#/">¿Olvidó su contraseña?</a>
          </p>
        </div>
      </section>
    </form>
    </div>
  );
};

export default Login;
