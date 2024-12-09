import React, { useState, useEffect } from 'react';
import axios from '../../../Momentaneo/Axios';
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import "./VerResultados.css";
import { useNavigate } from 'react-router-dom';

const VerResultados = () => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem('token');
  const [postulaciones, setPostulaciones] = useState([]);
  const [ramos, setRamos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      axios.get(`http://localhost:8000/estudiante2/${username}`)
        .then((response) => {
          const data = response.data;
          const postulacionesData = data.postulaciones?.[0]?.postulacions || [];
          const ramosData = data.ramos || [];
          setPostulaciones(postulacionesData);
          setRamos(ramosData);
        })
        .catch((error) => {
          console.error("Error al obtener los datos del servidor:", error);
        });
    }
  }, [username]);

  const obtenerNombreRamo = (idRamo) => {
    const ramoEncontrado = ramos.find((ramo) => ramo.id_ramo === idRamo);
    return ramoEncontrado ? ramoEncontrado.nombre_ramo : "Nombre del Ramo no disponible";
  };

  const renderizarTabla = () => {
    return postulaciones.map((postulacion) => (
      <tr key={postulacion.id_postulacion}>
        <td>{postulacion.id_ramo}</td>
        <td>{obtenerNombreRamo(postulacion.id_ramo)}</td>
        <td>{postulacion.horas_solicitud_ayudantia}</td>
        <td>{postulacion.resultado?.respuesta ? postulacion.resultado.respuesta.toUpperCase() : "PENDIENTE"}</td>
      </tr>
    ));
  };

  return (
    <>
      <Navbar />
      <div className="vista-estudiantes">
        <div className="contenido">
          <p style={{ fontSize: "25px", textAlign: "center" }}>
            BIENVENIDO ESTUDIANTE A LA SECCIÓN DE RESULTADOS
          </p>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID Ramo</th>
                <th scope="col">Nombre Ramo</th>
                <th scope="col">Horas de Ayudantía</th>
                <th scope="col">Estado de Postulación</th>
              </tr>
            </thead>
            <tbody>
              {postulaciones && postulaciones.length > 0 ? (
                renderizarTabla()
              ) : (
                <tr>
                  <td colSpan="4">No hay postulaciones</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerResultados;
