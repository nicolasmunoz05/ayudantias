
import React, { useState, useEffect } from "react";
import axios from "../../Momentaneo/Axios.js";
import "./index.css";

const CompShowEstudianteEncargado = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const username = localStorage.getItem("username");
  const selectedCarrera = localStorage.getItem("nombreCarrera");

const getFormattedCarrera = (selectedCarrera) => {
      if (selectedCarrera === "MEDICINA") {
        return "Medicina";
      } else if (selectedCarrera === "BACHILLERATO EN CIENCIAS BIOMÉDICAS") {
        return "Bachillerato En Ciencias Biomédicas";
      } else if (selectedCarrera === "BIOINGENIERÍA MÉDICA") {
        return "Bioingeniería Médica";
      } else if (selectedCarrera === "QUÍMICA Y FARMACIA") {
        return "Química Y Farmacia";
      } else if (selectedCarrera === "Arquitectura") {
        return "Arquitectura";
      } else if (selectedCarrera === "Ingeniería Civil en Informática") {
        return "Ingeniería Civil en Informática";
      } else if (selectedCarrera === "Ingenieria en Construcción") {
        return "Ingenieria en Construcción";
      } else if (selectedCarrera === "Ingeniería Civil Electrónica") {
        return "Ingeniería Civil Electrónica";
      } else if (selectedCarrera === "Ingeniería Civil") {
        return "Ingeniería Civil";
      } else if (selectedCarrera === "Construcción Civil (Vespertino)") {
        return "Construcción Civil (Vespertino)";
      } else if (selectedCarrera === "Ingeniería Civil Industrial") {
        return "Ingeniería Civil Industrial";
      } else if (
        selectedCarrera === "Ingenieria en Automatización y Control(Vespertino)"
      ) {
        return "Ingeniería En Automatización Y Control (Vespertino)";
      } else if (
        selectedCarrera === "Ingeniería Ejecución En Computación E Informática"
      ) {
        return "Ingeniería Ejecución En Computación E Informática";
      } else if (
        selectedCarrera === "Ingeniería Ejecución en Geomensura (Vespertino)"
      ) {
        return "Ingeniería Ejecución En Geomensura (Vespertino)";
      } else if (selectedCarrera === "Ingeniería en Ejecución Industrial") {
        return "Ingeniería en Ejecución Industrial";
      } else if (
        selectedCarrera ===
        "Ingeniería de Ejecución en Administración de Empresas (Vespertino)"
      ) {
        return "Ingeniería De Ejecución En Administración De Empresas (Vespertino) [nueva]";
      } else if (selectedCarrera === "Administración Pública") {
        return "Administración Pública";
      } else if (selectedCarrera === "Contador Público y Auditor - Talca") {
        return "Contador Público Y Auditor - Talca";
      } else if (selectedCarrera === "Ingeniería Comercial") {
        return "Ingeniería Comercial";
      } else if (selectedCarrera === "Sociología") {
        return "Sociología";
      } else if (selectedCarrera === "Trabajo Social - Talca") {
        return "Trabajo Social - Talca";
      } else if (
        selectedCarrera === "Contador Auditor (Vespertino) [Sin acceso paes]"
      ) {
        return "Contador Auditor (Vespertino) [sin Acceso Paes]";
      } else if (selectedCarrera === "Pedagogía en Educación Especial - Talca") {
        return "Pedagogía En Educación Especial - Talca";
      } else if (selectedCarrera === "Pedagogía en Educación Física") {
        return "Pedagogía En Educación Física";
      } else if (
        selectedCarrera ===
        "Pedagogía en Educación General básica con Mención - Sede Talca"
      ) {
        return "Pedagogía En Educación General Básica Con Mención - Sede Talca";
      } else if (
        selectedCarrera ===
        "Pedagogía en Educación Parvularia con Mención - Talca"
      ) {
        return "Pedagogía En Educación Parvularia Con Mención - Talca";
      } else if (
        selectedCarrera === "Pedagogía en Historia, Geografía y Ciencias Sociales"
      ) {
        return "Pedagogía En Historia, Geografía Y Ciencias Sociales";
      } else if (selectedCarrera === "Pedagogía en Inglés") {
        return "Pedagogía En Inglés";
      } else if (
        selectedCarrera === "Pedagogía en Lengua Castellana y Comunicación"
      ) {
        return "Pedagogía En Lengua Castellana Y Comunicación";
      } else if (selectedCarrera === "Geología") {
        return "Geología";
      } else if (selectedCarrera === "Ingeniería en Estadística") {
        return "Ingeniería En Estadística";
      } else if (selectedCarrera === "Ingeniería Matemática") {
        return "Ingeniería Matemática";
      } else if (selectedCarrera === "Pedagogía en Ciencias") {
        return "Pedagogía En Ciencias";
      } else if (selectedCarrera === "Pedagogía en Matemática y Computación") {
        return "Pedagogía En Matemática Y Computación";
      } else if (selectedCarrera === "Agronomía") {
        return "Agronomía";
      } else if (selectedCarrera === "Ingeniería en Biotecnología") {
        return "Ingeniería En Biotecnología";
      } else if (selectedCarrera === "Ingeniería en Recursos Naturales") {
        return "Ingeniería En Recursos Naturales";
      } else if (selectedCarrera === "Medicina Veterinaria") {
        return "Medicina Veterinaria";
      } else if (selectedCarrera === "Pedagogía en Religión y Filosofía") {
        return "Pedagogía En Religión Y Filosofia";
      } else if (selectedCarrera === "Obstetricia y Puericultura [Nueva]") {
        return "Obstetricia Y Puericultura [nueva]";
      } else if (selectedCarrera === "Enfermería - Talca") {
        return "Enfermería - Talca";
      } else if (selectedCarrera === "Kinesiología") {
        return "Kinesiología";
      } else if (selectedCarrera === "Nutrición y Dietética") {
        return "Nutrición Y Dietética";
      } else if (selectedCarrera === "Psicología - Talca") {
        return "Psicología - Talca";
      } else if (selectedCarrera === "Psicología - Talca") {
        return "Psicología - Talca";
      } else if (selectedCarrera === "Tecnología Médica") {
        return "Tecnología Médica";
      } else if (selectedCarrera === "Terapia Ocupacional") {
        return "Terapia Ocupacional";
      }
      return selectedCarrera;
    };

const formattedCarrera = getFormattedCarrera(selectedCarrera);

  const getEstudiantes = async () => {
    try {
      const res = await axios.get(`/encargado2/${username}`);
      console.log(res.data);
      if (res.data && typeof res.data === "object") {
        const estudiantesArray = res.data[formattedCarrera] || [];
        setEstudiantes(estudiantesArray);
        console.log(estudiantesArray);
      } else {
        console.error(res.data);
      }
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
    }
  };

  const handlePostData = async (postulacionId, aprobadoRechazoValue, ) => {
    try {
      // Determinar el semestre actual
      const currentMonth = new Date().getMonth() + 1;
      const id_periodo = currentMonth <= 7 ? 1 : 2;

      // Actualizar resultados
      const postData = {
        id_resultados: username + Math.floor(Math.random() * 62),
        id_periodo: id_periodo,
        id_postulacion: postulacionId,
        respuesta: aprobadoRechazoValue,
        fecha_resultados: new Date(),
        
      };
      await axios.post(`http://localhost:8000/Encargado2/${username}`, postData);

      // Actualizar estado_postulacion
      const putData = {
        id_postulacion: postulacionId,
        estado_postulacion: "revisado",
      };
      await axios.put(`http://localhost:8000/Encargado2/${username}`, putData);
      
      // const putHora = {
      //   horas_ayudantia_estudiante: updateHora,
      // };
      // await axios.put(`http://localhost:8000/Encargado2/${username}`, putHora);

      // Actualizar lista de estudiantes después de ambas actualizaciones
      getEstudiantes();
    } catch (error) {
      console.error("Error al guardar resultados o actualizar estado:", error);
    }
  };

  useEffect(() => {
    getEstudiantes();
  }, [username, formattedCarrera]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3>{formattedCarrera}</h3>
          <table className="table">
            <thead className="table-primary">
              <tr>
                <th>Rut</th>
                <th>Nombres</th>
                <th>Apellido</th>
                <th>Ramo</th>
                <th>Horas Ayudantia</th>
                <th>Gestionar</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((estudiante) => (
                <tr key={estudiante.rut_estudiante}>
                  <td>{estudiante.rut_estudiante}</td>
                  <td>{estudiante.nombres_estudiante}</td>
                  <td>{estudiante.apellido1_estudiante}</td>
                  <td>{estudiante.nombre_ramo}</td>
                  <td>{estudiante.horas_ayudantia_estudiante}</td>
                  <td className="contenedor-boton">
                    <button
                      className="btn btn-success"
                      onClick={() => handlePostData(estudiante.id_postulacion, "aprobado")}
                    >
                      Aceptar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handlePostData(estudiante.id_postulacion, "rechazado")}
                    >
                      Rechazar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompShowEstudianteEncargado;